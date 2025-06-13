import express from 'express';
import { supabase } from '../index.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all terms with optional filtering
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { 
      category, 
      difficulty, 
      search, 
      limit = 50, 
      offset = 0,
      sortBy = 'title',
      sortOrder = 'asc'
    } = req.query;

    let query = supabase
      .from('terms')
      .select(`
        *,
        term_favorites!left(user_id),
        term_progress!left(user_id, status, last_accessed)
      `);

    // Apply filters
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    if (difficulty) {
      query = query.eq('difficulty', difficulty);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,simple_definition.ilike.%${search}%`);
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    // Apply pagination
    query = query.range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    const { data: terms, error } = await query;

    if (error) {
      throw error;
    }

    // Process terms to include user-specific data
    const processedTerms = terms.map(term => ({
      id: term.id,
      title: term.title,
      category: term.category,
      difficulty: term.difficulty,
      simpleDefinition: term.simple_definition,
      example: term.example,
      detailedExplanation: term.detailed_explanation,
      whyItMatters: term.why_it_matters,
      rating: term.rating,
      estimatedReadTime: term.estimated_read_time,
      createdAt: term.created_at,
      updatedAt: term.updated_at,
      // User-specific data
      isFavorited: req.user ? term.term_favorites.some(fav => fav.user_id === req.user.id) : false,
      userProgress: req.user ? term.term_progress.find(prog => prog.user_id === req.user.id) : null
    }));

    res.json({
      terms: processedTerms,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: processedTerms.length
      }
    });
  } catch (error) {
    console.error('Terms fetch error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to fetch terms',
        code: 'TERMS_FETCH_ERROR'
      }
    });
  }
});

// Get single term by ID
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const { data: term, error } = await supabase
      .from('terms')
      .select(`
        *,
        term_favorites!left(user_id),
        term_progress!left(user_id, status, last_accessed, time_spent)
      `)
      .eq('id', id)
      .single();

    if (error || !term) {
      return res.status(404).json({
        error: {
          message: 'Term not found',
          code: 'TERM_NOT_FOUND'
        }
      });
    }

    const processedTerm = {
      id: term.id,
      title: term.title,
      category: term.category,
      difficulty: term.difficulty,
      simpleDefinition: term.simple_definition,
      example: term.example,
      detailedExplanation: term.detailed_explanation,
      whyItMatters: term.why_it_matters,
      rating: term.rating,
      estimatedReadTime: term.estimated_read_time,
      createdAt: term.created_at,
      updatedAt: term.updated_at,
      // User-specific data
      isFavorited: req.user ? term.term_favorites.some(fav => fav.user_id === req.user.id) : false,
      userProgress: req.user ? term.term_progress.find(prog => prog.user_id === req.user.id) : null
    };

    res.json({ term: processedTerm });
  } catch (error) {
    console.error('Term fetch error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to fetch term',
        code: 'TERM_FETCH_ERROR'
      }
    });
  }
});

// Get categories with term counts
router.get('/categories/stats', async (req, res) => {
  try {
    const { data: categories, error } = await supabase
      .from('terms')
      .select('category')
      .then(({ data, error }) => {
        if (error) throw error;
        
        const categoryCounts = data.reduce((acc, term) => {
          acc[term.category] = (acc[term.category] || 0) + 1;
          return acc;
        }, {});

        return { 
          data: Object.entries(categoryCounts).map(([category, count]) => ({
            category,
            count
          })),
          error: null
        };
      });

    if (error) {
      throw error;
    }

    res.json({ categories });
  } catch (error) {
    console.error('Categories stats error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to fetch category statistics',
        code: 'CATEGORIES_STATS_ERROR'
      }
    });
  }
});

// Search terms with advanced filtering
router.get('/search/advanced', optionalAuth, async (req, res) => {
  try {
    const { 
      q: searchQuery,
      categories,
      difficulties,
      minRating,
      maxReadTime,
      limit = 20
    } = req.query;

    let query = supabase
      .from('terms')
      .select(`
        *,
        term_favorites!left(user_id)
      `);

    // Text search
    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,simple_definition.ilike.%${searchQuery}%,example.ilike.%${searchQuery}%`);
    }

    // Category filter
    if (categories) {
      const categoryList = categories.split(',');
      query = query.in('category', categoryList);
    }

    // Difficulty filter
    if (difficulties) {
      const difficultyList = difficulties.split(',');
      query = query.in('difficulty', difficultyList);
    }

    // Rating filter
    if (minRating) {
      query = query.gte('rating', parseFloat(minRating));
    }

    // Read time filter
    if (maxReadTime) {
      query = query.lte('estimated_read_time', parseInt(maxReadTime));
    }

    query = query.limit(parseInt(limit));

    const { data: terms, error } = await query;

    if (error) {
      throw error;
    }

    const processedTerms = terms.map(term => ({
      id: term.id,
      title: term.title,
      category: term.category,
      difficulty: term.difficulty,
      simpleDefinition: term.simple_definition,
      rating: term.rating,
      estimatedReadTime: term.estimated_read_time,
      isFavorited: req.user ? term.term_favorites.some(fav => fav.user_id === req.user.id) : false
    }));

    res.json({
      terms: processedTerms,
      searchQuery,
      resultsCount: processedTerms.length
    });
  } catch (error) {
    console.error('Advanced search error:', error);
    res.status(500).json({
      error: {
        message: 'Search failed',
        code: 'SEARCH_ERROR'
      }
    });
  }
});

export default router;