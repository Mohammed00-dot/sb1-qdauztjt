import express from 'express';
import { supabase } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user favorites
router.get('/favorites', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: favorites, error } = await supabase
      .from('term_favorites')
      .select(`
        *,
        terms(
          id,
          title,
          category,
          difficulty,
          simple_definition,
          rating,
          estimated_read_time
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    const processedFavorites = favorites.map(fav => ({
      id: fav.id,
      favoritedAt: fav.created_at,
      term: {
        id: fav.terms.id,
        title: fav.terms.title,
        category: fav.terms.category,
        difficulty: fav.terms.difficulty,
        simpleDefinition: fav.terms.simple_definition,
        rating: fav.terms.rating,
        estimatedReadTime: fav.terms.estimated_read_time
      }
    }));

    res.json({ favorites: processedFavorites });
  } catch (error) {
    console.error('Favorites fetch error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to fetch favorites',
        code: 'FAVORITES_FETCH_ERROR'
      }
    });
  }
});

// Toggle term favorite
router.post('/favorites/:termId', authenticateToken, async (req, res) => {
  try {
    const { termId } = req.params;
    const userId = req.user.id;

    // Check if already favorited
    const { data: existing, error: checkError } = await supabase
      .from('term_favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('term_id', termId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existing) {
      // Remove from favorites
      const { error: deleteError } = await supabase
        .from('term_favorites')
        .delete()
        .eq('user_id', userId)
        .eq('term_id', termId);

      if (deleteError) {
        throw deleteError;
      }

      res.json({
        message: 'Term removed from favorites',
        isFavorited: false
      });
    } else {
      // Add to favorites
      const { error: insertError } = await supabase
        .from('term_favorites')
        .insert({
          user_id: userId,
          term_id: termId,
          created_at: new Date().toISOString()
        });

      if (insertError) {
        throw insertError;
      }

      res.json({
        message: 'Term added to favorites',
        isFavorited: true
      });
    }
  } catch (error) {
    console.error('Favorite toggle error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to toggle favorite',
        code: 'FAVORITE_TOGGLE_ERROR'
      }
    });
  }
});

// Get user dashboard data
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user progress
    const { data: progress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    // Get recent activity
    const { data: recentTerms } = await supabase
      .from('term_progress')
      .select(`
        *,
        terms(id, title, category)
      `)
      .eq('user_id', userId)
      .order('last_accessed', { ascending: false })
      .limit(5);

    // Get recent quiz attempts
    const { data: recentQuizzes } = await supabase
      .from('quiz_attempts')
      .select(`
        *,
        terms(id, title, category)
      `)
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .limit(5);

    // Get learning path progress
    const { data: pathProgress } = await supabase
      .from('user_learning_path_progress')
      .select(`
        *,
        learning_paths(id, title, icon, color)
      `)
      .eq('user_id', userId)
      .eq('is_completed', false)
      .order('updated_at', { ascending: false })
      .limit(3);

    // Get achievements count
    const { data: achievements } = await supabase
      .from('user_achievements')
      .select('id')
      .eq('user_id', userId);

    res.json({
      progress: progress || {
        level: 1,
        total_xp: 0,
        terms_learned: 0,
        quizzes_completed: 0,
        current_streak: 0
      },
      recentActivity: {
        terms: recentTerms || [],
        quizzes: recentQuizzes || []
      },
      activeLearningPaths: pathProgress || [],
      achievementsCount: achievements?.length || 0
    });
  } catch (error) {
    console.error('Dashboard fetch error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to fetch dashboard data',
        code: 'DASHBOARD_FETCH_ERROR'
      }
    });
  }
});

// Update user preferences
router.put('/preferences', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      favoriteSubjects, 
      learningGoals, 
      studyReminders, 
      difficultyPreference,
      parentNotifications 
    } = req.body;

    const { data: user, error } = await supabase
      .from('users')
      .update({
        favorite_subjects: favoriteSubjects,
        learning_goals: learningGoals,
        study_reminders: studyReminders,
        difficulty_preference: difficultyPreference,
        parent_notifications: parentNotifications,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select('favorite_subjects, learning_goals, study_reminders, difficulty_preference, parent_notifications')
      .single();

    if (error) {
      throw error;
    }

    res.json({
      message: 'Preferences updated successfully',
      preferences: user
    });
  } catch (error) {
    console.error('Preferences update error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to update preferences',
        code: 'PREFERENCES_UPDATE_ERROR'
      }
    });
  }
});

export default router;