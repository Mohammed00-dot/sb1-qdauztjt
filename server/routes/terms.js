import express from 'express';
import { supabase, handleDatabaseError } from '../config/database.js';
import { optionalAuth } from '../middleware/auth.js';
import { validateQuery, schemas } from '../utils/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Get all terms with optional filtering
router.get('/', optionalAuth, validateQuery(schemas.searchTerms), asyncHandler(async (req, res) => {
  const { 
    category, 
    difficulty, 
    q: search, 
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
  const validSortFields = ['title', 'category', 'difficulty', 'rating', 'created_at'];
  const sortField = validSortFields.includes(sortBy) ? sortBy : 'title';
  query = query.order(sortField, { ascending: sortOrder === 'asc' });

  // Apply pagination
  const limitNum = Math.min(parseInt(limit), 100); // Max 100 items
  const offsetNum = Math.max(parseInt(offset), 0);
  query = query.range(offsetNum, offsetNum + limitNum - 1);

  const { data: terms, error, count } = await query;

  if (error) {
    return res.status(500).json(handleDatabaseError(error, 'fetching terms'));
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
    success: true,
    terms: processedTerms,
    pagination: {
      limit: limitNum,
      offset: offsetNum,
      total: processedTerms.length,
      hasMore: processedTerms.length === limitNum
    },
    filters: {
      category: category || 'all',
      difficulty,
      search,
      sortBy: sortField,
      sortOrder
    }
  });
}));

// Get single term by ID
router.get('/:id', optionalAuth, asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Invalid term ID',
        code: 'INVALID_TERM_ID'
      }
    });
  }

  const { data: term, error } = await supabase
    .from('terms')
    .select(`
      *,
      term_favorites!left(user_id),
      term_progress!left(user_id, status, last_accessed, time_spent)
    `)
    .eq('id', parseInt(id))
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Term not found',
          code: 'TERM_NOT_FOUND'
        }
      });
    }
    return res.status(500).json(handleDatabaseError(error, 'fetching term'));
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

  res.json({ 
    success: true,
    term: processedTerm 
  });
}));

// Get categories with term counts
router.get('/categories/stats', asyncHandler(async (req, res) => {
  const { data: categoryStats, error } = await supabase
    .from('terms')
    .select('category')
    .then(async ({ data, error }) => {
      if (error) throw error;
      
      const categoryCounts = data.reduce((acc, term) => {
        acc[term.category] = (acc[term.category] || 0) + 1;
        return acc;
      }, {});

      return { 
        data: Object.entries(categoryCounts).map(([category, count]) => ({
          category,
          count,
          displayName: getCategoryDisplayName(category)
        })),
        error: null
      };
    });

  if (error) {
    return res.status(500).json(handleDatabaseError(error, 'fetching category statistics'));
  }

  res.json({ 
    success: true,
    categories: categoryStats.data 
  });
}));

// Search terms with advanced filtering
router.get('/search/advanced', optionalAuth, asyncHandler(async (req, res) => {
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
    const categoryList = categories.split(',').filter(cat => 
      ['economics', 'social', 'government', 'money'].includes(cat)
    );
    if (categoryList.length > 0) {
      query = query.in('category', categoryList);
    }
  }

  // Difficulty filter
  if (difficulties) {
    const difficultyList = difficulties.split(',').filter(diff => 
      ['beginner', 'intermediate', 'advanced'].includes(diff)
    );
    if (difficultyList.length > 0) {
      query = query.in('difficulty', difficultyList);
    }
  }

  // Rating filter
  if (minRating && !isNaN(parseFloat(minRating))) {
    query = query.gte('rating', parseFloat(minRating));
  }

  // Read time filter
  if (maxReadTime && !isNaN(parseInt(maxReadTime))) {
    query = query.lte('estimated_read_time', parseInt(maxReadTime));
  }

  query = query.limit(Math.min(parseInt(limit), 50));

  const { data: terms, error } = await query;

  if (error) {
    return res.status(500).json(handleDatabaseError(error, 'searching terms'));
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
    success: true,
    terms: processedTerms,
    searchQuery,
    resultsCount: processedTerms.length,
    filters: {
      categories: categories?.split(',') || [],
      difficulties: difficulties?.split(',') || [],
      minRating: minRating ? parseFloat(minRating) : null,
      maxReadTime: maxReadTime ? parseInt(maxReadTime) : null
    }
  });
}));

// Helper function to get display names for categories
function getCategoryDisplayName(category) {
  const displayNames = {
    economics: 'Economics',
    social: 'Social Studies',
    government: 'Government',
    money: 'Money & Finance'
  };
  return displayNames[category] || category;
}

export default router;