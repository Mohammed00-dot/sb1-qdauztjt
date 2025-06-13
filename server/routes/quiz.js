import express from 'express';
import { supabase } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateRequest, schemas } from '../middleware/validation.js';

const router = express.Router();

// Get quiz questions for a term
router.get('/term/:termId', authenticateToken, async (req, res) => {
  try {
    const { termId } = req.params;

    // Verify term exists
    const { data: term, error: termError } = await supabase
      .from('terms')
      .select('id, title')
      .eq('id', termId)
      .single();

    if (termError || !term) {
      return res.status(404).json({
        error: {
          message: 'Term not found',
          code: 'TERM_NOT_FOUND'
        }
      });
    }

    // Get quiz questions for the term
    const { data: questions, error } = await supabase
      .from('quiz_questions')
      .select('id, question, options, correct_answer, explanation, difficulty')
      .eq('term_id', termId)
      .order('order_index');

    if (error) {
      throw error;
    }

    res.json({
      term: {
        id: term.id,
        title: term.title
      },
      questions: questions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options,
        difficulty: q.difficulty,
        // Don't send correct_answer and explanation until submission
      }))
    });
  } catch (error) {
    console.error('Quiz fetch error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to fetch quiz',
        code: 'QUIZ_FETCH_ERROR'
      }
    });
  }
});

// Submit quiz answers
router.post('/submit', authenticateToken, validateRequest(schemas.quizSubmission), async (req, res) => {
  try {
    const { termId, answers, totalTimeSpent } = req.body;
    const userId = req.user.id;

    // Get quiz questions with correct answers
    const { data: questions, error: questionsError } = await supabase
      .from('quiz_questions')
      .select('id, correct_answer, explanation')
      .eq('term_id', termId);

    if (questionsError || !questions.length) {
      return res.status(404).json({
        error: {
          message: 'Quiz questions not found',
          code: 'QUIZ_NOT_FOUND'
        }
      });
    }

    // Calculate score
    let correctAnswers = 0;
    const results = answers.map(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      const isCorrect = question && question.correct_answer === answer.selectedAnswer;
      
      if (isCorrect) correctAnswers++;

      return {
        questionId: answer.questionId,
        selectedAnswer: answer.selectedAnswer,
        correctAnswer: question?.correct_answer,
        isCorrect,
        explanation: question?.explanation,
        timeSpent: answer.timeSpent || 0
      };
    });

    const score = Math.round((correctAnswers / questions.length) * 100);
    const xpEarned = calculateXP(score, questions.length);

    // Save quiz attempt
    const { data: quizAttempt, error: attemptError } = await supabase
      .from('quiz_attempts')
      .insert({
        user_id: userId,
        term_id: termId,
        score,
        correct_answers: correctAnswers,
        total_questions: questions.length,
        time_spent: totalTimeSpent,
        xp_earned: xpEarned,
        answers: results,
        completed_at: new Date().toISOString()
      })
      .select()
      .single();

    if (attemptError) {
      throw attemptError;
    }

    // Update user progress
    await updateUserProgress(userId, {
      xpGained: xpEarned,
      quizCompleted: true,
      termId
    });

    // Check for achievements
    const achievements = await checkQuizAchievements(userId, score, correctAnswers);

    res.json({
      message: 'Quiz submitted successfully',
      results: {
        score,
        correctAnswers,
        totalQuestions: questions.length,
        percentage: score,
        xpEarned,
        timeSpent: totalTimeSpent,
        questionResults: results
      },
      achievements
    });
  } catch (error) {
    console.error('Quiz submission error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to submit quiz',
        code: 'QUIZ_SUBMISSION_ERROR'
      }
    });
  }
});

// Get user's quiz history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const { limit = 20, offset = 0 } = req.query;
    const userId = req.user.id;

    const { data: attempts, error } = await supabase
      .from('quiz_attempts')
      .select(`
        *,
        terms(id, title, category)
      `)
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    if (error) {
      throw error;
    }

    const processedAttempts = attempts.map(attempt => ({
      id: attempt.id,
      termId: attempt.term_id,
      termTitle: attempt.terms.title,
      termCategory: attempt.terms.category,
      score: attempt.score,
      correctAnswers: attempt.correct_answers,
      totalQuestions: attempt.total_questions,
      timeSpent: attempt.time_spent,
      xpEarned: attempt.xp_earned,
      completedAt: attempt.completed_at
    }));

    res.json({
      attempts: processedAttempts,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    console.error('Quiz history error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to fetch quiz history',
        code: 'QUIZ_HISTORY_ERROR'
      }
    });
  }
});

// Get quiz statistics for a user
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: stats, error } = await supabase
      .from('quiz_attempts')
      .select('score, correct_answers, total_questions, xp_earned, completed_at')
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    const totalAttempts = stats.length;
    const averageScore = totalAttempts > 0 
      ? Math.round(stats.reduce((sum, attempt) => sum + attempt.score, 0) / totalAttempts)
      : 0;
    const totalXP = stats.reduce((sum, attempt) => sum + attempt.xp_earned, 0);
    const perfectScores = stats.filter(attempt => attempt.score === 100).length;

    // Calculate streak (consecutive days with quiz attempts)
    const attemptDates = stats.map(attempt => 
      new Date(attempt.completed_at).toDateString()
    );
    const uniqueDates = [...new Set(attemptDates)].sort();
    
    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;

    for (let i = uniqueDates.length - 1; i >= 0; i--) {
      const currentDate = new Date(uniqueDates[i]);
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - (uniqueDates.length - 1 - i));

      if (currentDate.toDateString() === expectedDate.toDateString()) {
        tempStreak++;
        if (i === uniqueDates.length - 1) currentStreak = tempStreak;
      } else {
        maxStreak = Math.max(maxStreak, tempStreak);
        tempStreak = 0;
      }
    }
    maxStreak = Math.max(maxStreak, tempStreak);

    res.json({
      stats: {
        totalAttempts,
        averageScore,
        totalXP,
        perfectScores,
        currentStreak,
        maxStreak,
        categoryBreakdown: getCategoryBreakdown(stats)
      }
    });
  } catch (error) {
    console.error('Quiz stats error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to fetch quiz statistics',
        code: 'QUIZ_STATS_ERROR'
      }
    });
  }
});

// Helper functions
function calculateXP(score, questionCount) {
  const baseXP = questionCount * 10;
  const bonusMultiplier = score / 100;
  return Math.round(baseXP * bonusMultiplier);
}

async function updateUserProgress(userId, { xpGained, quizCompleted, termId }) {
  try {
    // Get current progress
    const { data: currentProgress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!currentProgress) return;

    const newXP = currentProgress.total_xp + xpGained;
    const newLevel = Math.floor(newXP / 1000) + 1; // 1000 XP per level
    const newQuizCount = quizCompleted ? currentProgress.quizzes_completed + 1 : currentProgress.quizzes_completed;

    // Update progress
    await supabase
      .from('user_progress')
      .update({
        total_xp: newXP,
        level: newLevel,
        quizzes_completed: newQuizCount,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    // Update term progress
    if (termId) {
      await supabase
        .from('term_progress')
        .upsert({
          user_id: userId,
          term_id: termId,
          status: 'completed',
          last_accessed: new Date().toISOString()
        });
    }
  } catch (error) {
    console.error('Progress update error:', error);
  }
}

async function checkQuizAchievements(userId, score, correctAnswers) {
  const achievements = [];

  try {
    // Check for perfect score achievement
    if (score === 100) {
      const { data: existing } = await supabase
        .from('user_achievements')
        .select('id')
        .eq('user_id', userId)
        .eq('achievement_type', 'perfect_quiz')
        .single();

      if (!existing) {
        await supabase
          .from('user_achievements')
          .insert({
            user_id: userId,
            achievement_type: 'perfect_quiz',
            title: 'Perfect Scholar',
            description: 'Got 100% on a quiz',
            earned_at: new Date().toISOString()
          });
        
        achievements.push({
          type: 'perfect_quiz',
          title: 'Perfect Scholar',
          description: 'Got 100% on a quiz'
        });
      }
    }

    // Check for quiz master achievement (10 quizzes completed)
    const { data: quizCount } = await supabase
      .from('quiz_attempts')
      .select('id')
      .eq('user_id', userId);

    if (quizCount && quizCount.length >= 10) {
      const { data: existing } = await supabase
        .from('user_achievements')
        .select('id')
        .eq('user_id', userId)
        .eq('achievement_type', 'quiz_master')
        .single();

      if (!existing) {
        await supabase
          .from('user_achievements')
          .insert({
            user_id: userId,
            achievement_type: 'quiz_master',
            title: 'Quiz Master',
            description: 'Completed 10 quizzes',
            earned_at: new Date().toISOString()
          });
        
        achievements.push({
          type: 'quiz_master',
          title: 'Quiz Master',
          description: 'Completed 10 quizzes'
        });
      }
    }
  } catch (error) {
    console.error('Achievement check error:', error);
  }

  return achievements;
}

function getCategoryBreakdown(attempts) {
  // This would need to join with terms table to get category info
  // For now, return empty object
  return {};
}

export default router;