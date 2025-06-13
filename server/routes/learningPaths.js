import express from 'express';
import { supabase } from '../config/database.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all learning paths
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { data: paths, error } = await supabase
      .from('learning_paths')
      .select(`
        *,
        learning_path_steps(
          id,
          title,
          description,
          order_index,
          estimated_time,
          difficulty,
          term_ids
        )
      `)
      .order('order_index');

    if (error) {
      throw error;
    }

    // Get user progress if authenticated
    let userProgress = {};
    if (req.user) {
      const { data: progressData } = await supabase
        .from('user_learning_path_progress')
        .select('*')
        .eq('user_id', req.user.id);

      userProgress = progressData?.reduce((acc, progress) => {
        acc[progress.learning_path_id] = progress;
        return acc;
      }, {}) || {};
    }

    const processedPaths = paths.map(path => {
      const userPathProgress = userProgress[path.id];
      const completedSteps = userPathProgress?.completed_steps || [];
      
      return {
        id: path.id,
        title: path.title,
        description: path.description,
        category: path.category,
        difficulty: path.difficulty,
        estimatedTime: path.estimated_time,
        icon: path.icon,
        color: path.color,
        totalSteps: path.learning_path_steps.length,
        completedSteps: completedSteps.length,
        currentStep: userPathProgress?.current_step || 1,
        isCompleted: userPathProgress?.is_completed || false,
        steps: path.learning_path_steps.map(step => ({
          id: step.id,
          title: step.title,
          description: step.description,
          orderIndex: step.order_index,
          estimatedTime: step.estimated_time,
          difficulty: step.difficulty,
          termIds: step.term_ids,
          status: getStepStatus(step.order_index, userPathProgress)
        }))
      };
    });

    res.json({ learningPaths: processedPaths });
  } catch (error) {
    console.error('Learning paths fetch error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to fetch learning paths',
        code: 'LEARNING_PATHS_FETCH_ERROR'
      }
    });
  }
});

// Get single learning path
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const { data: path, error } = await supabase
      .from('learning_paths')
      .select(`
        *,
        learning_path_steps(
          id,
          title,
          description,
          order_index,
          estimated_time,
          difficulty,
          term_ids,
          content
        )
      `)
      .eq('id', id)
      .single();

    if (error || !path) {
      return res.status(404).json({
        error: {
          message: 'Learning path not found',
          code: 'LEARNING_PATH_NOT_FOUND'
        }
      });
    }

    // Get user progress if authenticated
    let userProgress = null;
    if (req.user) {
      const { data: progressData } = await supabase
        .from('user_learning_path_progress')
        .select('*')
        .eq('user_id', req.user.id)
        .eq('learning_path_id', id)
        .single();

      userProgress = progressData;
    }

    const completedSteps = userProgress?.completed_steps || [];
    
    const processedPath = {
      id: path.id,
      title: path.title,
      description: path.description,
      category: path.category,
      difficulty: path.difficulty,
      estimatedTime: path.estimated_time,
      icon: path.icon,
      color: path.color,
      totalSteps: path.learning_path_steps.length,
      completedSteps: completedSteps.length,
      currentStep: userProgress?.current_step || 1,
      isCompleted: userProgress?.is_completed || false,
      steps: path.learning_path_steps
        .sort((a, b) => a.order_index - b.order_index)
        .map(step => ({
          id: step.id,
          title: step.title,
          description: step.description,
          orderIndex: step.order_index,
          estimatedTime: step.estimated_time,
          difficulty: step.difficulty,
          termIds: step.term_ids,
          content: step.content,
          status: getStepStatus(step.order_index, userProgress)
        }))
    };

    res.json({ learningPath: processedPath });
  } catch (error) {
    console.error('Learning path fetch error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to fetch learning path',
        code: 'LEARNING_PATH_FETCH_ERROR'
      }
    });
  }
});

// Start or continue a learning path
router.post('/:id/start', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if path exists
    const { data: path, error: pathError } = await supabase
      .from('learning_paths')
      .select('id, title')
      .eq('id', id)
      .single();

    if (pathError || !path) {
      return res.status(404).json({
        error: {
          message: 'Learning path not found',
          code: 'LEARNING_PATH_NOT_FOUND'
        }
      });
    }

    // Check if user already has progress
    const { data: existingProgress } = await supabase
      .from('user_learning_path_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('learning_path_id', id)
      .single();

    if (existingProgress) {
      return res.json({
        message: 'Learning path already started',
        progress: existingProgress
      });
    }

    // Create new progress record
    const { data: newProgress, error } = await supabase
      .from('user_learning_path_progress')
      .insert({
        user_id: userId,
        learning_path_id: id,
        current_step: 1,
        completed_steps: [],
        started_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.json({
      message: 'Learning path started successfully',
      progress: newProgress
    });
  } catch (error) {
    console.error('Learning path start error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to start learning path',
        code: 'LEARNING_PATH_START_ERROR'
      }
    });
  }
});

// Complete a learning path step
router.post('/:pathId/steps/:stepId/complete', authenticateToken, async (req, res) => {
  try {
    const { pathId, stepId } = req.params;
    const { timeSpent, difficulty } = req.body;
    const userId = req.user.id;

    // Get current progress
    const { data: progress, error: progressError } = await supabase
      .from('user_learning_path_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('learning_path_id', pathId)
      .single();

    if (progressError || !progress) {
      return res.status(404).json({
        error: {
          message: 'Learning path progress not found',
          code: 'PROGRESS_NOT_FOUND'
        }
      });
    }

    // Get step info
    const { data: step, error: stepError } = await supabase
      .from('learning_path_steps')
      .select('order_index')
      .eq('id', stepId)
      .single();

    if (stepError || !step) {
      return res.status(404).json({
        error: {
          message: 'Learning path step not found',
          code: 'STEP_NOT_FOUND'
        }
      });
    }

    // Update progress
    const completedSteps = [...(progress.completed_steps || [])];
    if (!completedSteps.includes(parseInt(stepId))) {
      completedSteps.push(parseInt(stepId));
    }

    const nextStep = step.order_index + 1;
    
    // Get total steps in path
    const { data: pathSteps } = await supabase
      .from('learning_path_steps')
      .select('id')
      .eq('learning_path_id', pathId);

    const isPathCompleted = completedSteps.length >= pathSteps.length;

    const { data: updatedProgress, error: updateError } = await supabase
      .from('user_learning_path_progress')
      .update({
        current_step: isPathCompleted ? step.order_index : nextStep,
        completed_steps: completedSteps,
        is_completed: isPathCompleted,
        completed_at: isPathCompleted ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('learning_path_id', pathId)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    // Record step completion
    await supabase
      .from('learning_path_step_completions')
      .insert({
        user_id: userId,
        learning_path_id: pathId,
        step_id: stepId,
        time_spent: timeSpent || 0,
        difficulty_rating: difficulty,
        completed_at: new Date().toISOString()
      });

    // Award XP
    const xpAwarded = 75; // Base XP for completing a step
    await awardXP(userId, xpAwarded);

    // Check for achievements
    const achievements = await checkLearningPathAchievements(userId, pathId, isPathCompleted);

    res.json({
      message: 'Step completed successfully',
      progress: updatedProgress,
      xpAwarded,
      achievements,
      isPathCompleted
    });
  } catch (error) {
    console.error('Step completion error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to complete step',
        code: 'STEP_COMPLETION_ERROR'
      }
    });
  }
});

// Get user's learning path progress
router.get('/user/progress', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: userProgress, error } = await supabase
      .from('user_learning_path_progress')
      .select(`
        *,
        learning_paths(id, title, category, icon, color)
      `)
      .eq('user_id', userId)
      .order('started_at', { ascending: false });

    if (error) {
      throw error;
    }

    const processedProgress = userProgress.map(progress => ({
      pathId: progress.learning_path_id,
      pathTitle: progress.learning_paths.title,
      pathCategory: progress.learning_paths.category,
      pathIcon: progress.learning_paths.icon,
      pathColor: progress.learning_paths.color,
      currentStep: progress.current_step,
      completedSteps: progress.completed_steps?.length || 0,
      isCompleted: progress.is_completed,
      startedAt: progress.started_at,
      completedAt: progress.completed_at,
      lastAccessed: progress.updated_at
    }));

    res.json({ userProgress: processedProgress });
  } catch (error) {
    console.error('User progress fetch error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to fetch user progress',
        code: 'USER_PROGRESS_FETCH_ERROR'
      }
    });
  }
});

// Helper functions
function getStepStatus(stepOrder, userProgress) {
  if (!userProgress) return 'locked';
  
  const completedSteps = userProgress.completed_steps || [];
  const currentStep = userProgress.current_step || 1;
  
  if (completedSteps.includes(stepOrder)) return 'completed';
  if (stepOrder === currentStep) return 'current';
  if (stepOrder < currentStep) return 'completed';
  return 'locked';
}

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

async function checkLearningPathAchievements(userId, pathId, isPathCompleted) {
  const achievements = [];

  try {
    if (isPathCompleted) {
      // Check for path completion achievement
      const { data: existing } = await supabase
        .from('user_achievements')
        .select('id')
        .eq('user_id', userId)
        .eq('achievement_type', 'path_completed')
        .single();

      if (!existing) {
        await supabase
          .from('user_achievements')
          .insert({
            user_id: userId,
            achievement_type: 'path_completed',
            title: 'Path Master',
            description: 'Completed your first learning path',
            earned_at: new Date().toISOString()
          });
        
        achievements.push({
          type: 'path_completed',
          title: 'Path Master',
          description: 'Completed your first learning path'
        });
      }
    }
  } catch (error) {
    console.error('Achievement check error:', error);
  }

  return achievements;
}

export default router;