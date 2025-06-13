import express from 'express';
import { supabase } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateRequest, schemas } from '../middleware/validation.js';

const router = express.Router();

// Get user's overall progress
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user progress
    const { data: progress, error: progressError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (progressError) {
      throw progressError;
    }

    // Get term progress
    const { data: termProgress, error: termError } = await supabase
      .from('term_progress')
      .select(`
        *,
        terms(id, title, category, difficulty)
      `)
      .eq('user_id', userId);

    if (termError) {
      throw termError;
    }

    // Get favorites
    const { data: favorites, error: favError } = await supabase
      .from('term_favorites')
      .select(`
        *,
        terms(id, title, category, difficulty)
      `)
      .eq('user_id', userId);

    if (favError) {
      throw favError;
    }

    // Get recent achievements
    const { data: achievements, error: achieveError } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false })
      .limit(5);

    if (achieveError) {
      throw achieveError;
    }

    // Calculate additional stats
    const categoriesExplored = [...new Set(termProgress.map(tp => tp.terms.category))].length;
    const completedTerms = termProgress.filter(tp => tp.status === 'completed').length;

    res.json({
      progress: {
        level: progress.level,
        totalXP: progress.total_xp,
        xpToNextLevel: (progress.level * 1000) - progress.total_xp,
        termsLearned: completedTerms,
        quizzesCompleted: progress.quizzes_completed,
        currentStreak: progress.current_streak,
        longestStreak: progress.longest_streak,
        categoriesExplored,
        totalStudyTime: progress.total_study_time || 0
      },
      termProgress: termProgress.map(tp => ({
        termId: tp.term_id,
        termTitle: tp.terms.title,
        category: tp.terms.category,
        difficulty: tp.terms.difficulty,
        status: tp.status,
        timeSpent: tp.time_spent,
        lastAccessed: tp.last_accessed
      })),
      favorites: favorites.map(fav => ({
        termId: fav.term_id,
        termTitle: fav.terms.title,
        category: fav.terms.category,
        difficulty: fav.terms.difficulty,
        favoritedAt: fav.created_at
      })),
      recentAchievements: achievements
    });
  } catch (error) {
    console.error('Progress fetch error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to fetch progress',
        code: 'PROGRESS_FETCH_ERROR'
      }
    });
  }
});

// Update term progress
router.post('/term', authenticateToken, validateRequest(schemas.progressUpdate), async (req, res) => {
  try {
    const { termId, action, timeSpent, difficulty } = req.body;
    const userId = req.user.id;

    switch (action) {
      case 'viewed':
        await supabase
          .from('term_progress')
          .upsert({
            user_id: userId,
            term_id: termId,
            status: 'viewed',
            time_spent: timeSpent || 0,
            last_accessed: new Date().toISOString()
          });
        break;

      case 'completed':
        await supabase
          .from('term_progress')
          .upsert({
            user_id: userId,
            term_id: termId,
            status: 'completed',
            time_spent: timeSpent || 0,
            difficulty_rating: difficulty,
            last_accessed: new Date().toISOString()
          });

        // Award XP for completion
        await awardXP(userId, 50);
        break;

      case 'favorited':
        await supabase
          .from('term_favorites')
          .upsert({
            user_id: userId,
            term_id: termId,
            created_at: new Date().toISOString()
          });
        break;

      case 'unfavorited':
        await supabase
          .from('term_favorites')
          .delete()
          .eq('user_id', userId)
          .eq('term_id', termId);
        break;
    }

    res.json({
      message: 'Progress updated successfully',
      action,
      termId
    });
  } catch (error) {
    console.error('Progress update error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to update progress',
        code: 'PROGRESS_UPDATE_ERROR'
      }
    });
  }
});

// Get learning streak information
router.get('/streak', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's activity for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: activities, error } = await supabase
      .from('term_progress')
      .select('last_accessed')
      .eq('user_id', userId)
      .gte('last_accessed', thirtyDaysAgo.toISOString())
      .order('last_accessed', { ascending: false });

    if (error) {
      throw error;
    }

    // Calculate streak
    const activityDates = activities.map(activity => 
      new Date(activity.last_accessed).toDateString()
    );
    const uniqueDates = [...new Set(activityDates)].sort().reverse();

    let currentStreak = 0;
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if user was active today or yesterday
    if (uniqueDates.includes(today)) {
      currentStreak = 1;
      
      // Count consecutive days
      for (let i = 1; i < uniqueDates.length; i++) {
        const currentDate = new Date(uniqueDates[i]);
        const expectedDate = new Date();
        expectedDate.setDate(expectedDate.getDate() - i);
        
        if (currentDate.toDateString() === expectedDate.toDateString()) {
          currentStreak++;
        } else {
          break;
        }
      }
    } else if (uniqueDates.includes(yesterday.toDateString())) {
      // Streak continues from yesterday
      currentStreak = 1;
      
      for (let i = 1; i < uniqueDates.length; i++) {
        const currentDate = new Date(uniqueDates[i]);
        const expectedDate = new Date();
        expectedDate.setDate(expectedDate.getDate() - (i + 1));
        
        if (currentDate.toDateString() === expectedDate.toDateString()) {
          currentStreak++;
        } else {
          break;
        }
      }
    }

    // Update streak in database
    await supabase
      .from('user_progress')
      .update({
        current_streak: currentStreak,
        longest_streak: Math.max(currentStreak, 0) // Would need to track this properly
      })
      .eq('user_id', userId);

    res.json({
      currentStreak,
      activityDates: uniqueDates.slice(0, 7), // Last 7 days
      streakTarget: 7 // Weekly goal
    });
  } catch (error) {
    console.error('Streak fetch error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to fetch streak information',
        code: 'STREAK_FETCH_ERROR'
      }
    });
  }
});

// Get achievements
router.get('/achievements', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: userAchievements, error } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Define all possible achievements
    const allAchievements = [
      {
        id: 'first_term',
        title: 'First Steps',
        description: 'Learned your first term',
        type: 'first_term',
        rarity: 'common'
      },
      {
        id: 'quiz_master',
        title: 'Quiz Master',
        description: 'Completed 10 quizzes',
        type: 'quiz_master',
        rarity: 'rare'
      },
      {
        id: 'perfect_quiz',
        title: 'Perfect Scholar',
        description: 'Got 100% on a quiz',
        type: 'perfect_quiz',
        rarity: 'epic'
      },
      {
        id: 'week_streak',
        title: 'Week Warrior',
        description: 'Maintained a 7-day learning streak',
        type: 'week_streak',
        rarity: 'rare'
      },
      {
        id: 'category_explorer',
        title: 'Category Explorer',
        description: 'Explored all 4 categories',
        type: 'category_explorer',
        rarity: 'epic'
      },
      {
        id: 'speed_learner',
        title: 'Speed Learner',
        description: 'Learned 10 terms in one day',
        type: 'speed_learner',
        rarity: 'legendary'
      }
    ];

    const achievementsWithStatus = allAchievements.map(achievement => {
      const userAchievement = userAchievements.find(ua => ua.achievement_type === achievement.type);
      return {
        ...achievement,
        earned: !!userAchievement,
        earnedAt: userAchievement?.earned_at || null
      };
    });

    res.json({
      achievements: achievementsWithStatus,
      totalEarned: userAchievements.length,
      totalAvailable: allAchievements.length
    });
  } catch (error) {
    console.error('Achievements fetch error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to fetch achievements',
        code: 'ACHIEVEMENTS_FETCH_ERROR'
      }
    });
  }
});

// Helper function to award XP
async function awardXP(userId, xpAmount) {
  try {
    const { data: currentProgress } = await supabase
      .from('user_progress')
      .select('total_xp, level')
      .eq('user_id', userId)
      .single();

    if (currentProgress) {
      const newXP = currentProgress.total_xp + xpAmount;
      const newLevel = Math.floor(newXP / 1000) + 1;

      await supabase
        .from('user_progress')
        .update({
          total_xp: newXP,
          level: newLevel
        })
        .eq('user_id', userId);
    }
  } catch (error) {
    console.error('XP award error:', error);
  }
}

export default router;