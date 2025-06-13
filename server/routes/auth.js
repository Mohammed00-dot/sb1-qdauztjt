import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { supabase, handleDatabaseError } from '../config/database.js';
import { validateRequest, schemas } from '../utils/validation.js';
import { authenticateToken } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Apply auth rate limiter to all auth routes
router.use(authLimiter);

// Register new user
router.post('/register', validateRequest(schemas.register), asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, age, parentEmail } = req.body;

  // Check if user already exists
  const { data: existingUser, error: checkError } = await supabase
    .from('users')
    .select('id')
    .eq('email', email.toLowerCase())
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    return res.status(500).json(handleDatabaseError(checkError, 'checking existing user'));
  }

  if (existingUser) {
    return res.status(409).json({
      success: false,
      error: {
        message: 'An account with this email already exists',
        code: 'USER_EXISTS'
      }
    });
  }

  // Hash password
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create user
  const userId = uuidv4();
  const { data: user, error: createError } = await supabase
    .from('users')
    .insert({
      id: userId,
      email: email.toLowerCase(),
      password_hash: hashedPassword,
      first_name: firstName,
      last_name: lastName,
      age,
      parent_email: parentEmail?.toLowerCase(),
      created_at: new Date().toISOString()
    })
    .select('id, email, first_name, last_name, age, created_at')
    .single();

  if (createError) {
    return res.status(500).json(handleDatabaseError(createError, 'creating user'));
  }

  // Create initial user progress record
  const { error: progressError } = await supabase
    .from('user_progress')
    .insert({
      user_id: userId,
      level: 1,
      total_xp: 0,
      terms_learned: 0,
      quizzes_completed: 0,
      current_streak: 0,
      longest_streak: 0,
      total_study_time: 0
    });

  if (progressError) {
    console.error('Failed to create user progress:', progressError);
    // Don't fail registration if progress creation fails
  }

  // Generate JWT token
  const token = jwt.sign(
    { 
      userId: user.id, 
      email: user.email,
      iat: Math.floor(Date.now() / 1000)
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.status(201).json({
    success: true,
    message: 'Account created successfully! Welcome to BizzyBrain!',
    user: {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      age: user.age,
      createdAt: user.created_at
    },
    token
  });
}));

// Login user
router.post('/login', validateRequest(schemas.login), asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Get user from database
  const { data: user, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase())
    .single();

  if (fetchError || !user) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      }
    });
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password_hash);
  if (!isValidPassword) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      }
    });
  }

  // Update last login
  await supabase
    .from('users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', user.id);

  // Generate JWT token
  const token = jwt.sign(
    { 
      userId: user.id, 
      email: user.email,
      iat: Math.floor(Date.now() / 1000)
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({
    success: true,
    message: 'Welcome back to BizzyBrain!',
    user: {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      age: user.age,
      lastLogin: user.last_login
    },
    token
  });
}));

// Get current user profile
router.get('/profile', authenticateToken, asyncHandler(async (req, res) => {
  // Get user progress
  const { data: userProgress, error: progressError } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', req.user.id)
    .single();

  if (progressError && progressError.code !== 'PGRST116') {
    console.error('Failed to fetch user progress:', progressError);
  }

  // Calculate XP to next level
  const currentLevel = userProgress?.level || 1;
  const currentXP = userProgress?.total_xp || 0;
  const xpForNextLevel = currentLevel * 1000; // 1000 XP per level
  const xpToNextLevel = Math.max(0, xpForNextLevel - currentXP);

  res.json({
    success: true,
    user: {
      id: req.user.id,
      email: req.user.email,
      firstName: req.user.first_name,
      lastName: req.user.last_name,
      age: req.user.age,
      createdAt: req.user.created_at,
      lastLogin: req.user.last_login
    },
    progress: userProgress ? {
      level: userProgress.level,
      totalXP: userProgress.total_xp,
      xpToNextLevel,
      termsLearned: userProgress.terms_learned,
      quizzesCompleted: userProgress.quizzes_completed,
      currentStreak: userProgress.current_streak,
      longestStreak: userProgress.longest_streak,
      totalStudyTime: userProgress.total_study_time
    } : null
  });
}));

// Update user profile
router.put('/profile', authenticateToken, validateRequest(schemas.updateProfile), asyncHandler(async (req, res) => {
  const updates = {};
  const { firstName, lastName, age, favoriteSubjects, learningGoals } = req.body;

  if (firstName) updates.first_name = firstName;
  if (lastName) updates.last_name = lastName;
  if (age !== undefined) updates.age = age;
  if (favoriteSubjects) updates.favorite_subjects = favoriteSubjects;
  if (learningGoals) updates.learning_goals = learningGoals;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'No valid fields provided for update',
        code: 'NO_UPDATE_FIELDS'
      }
    });
  }

  updates.updated_at = new Date().toISOString();

  const { data: user, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', req.user.id)
    .select('id, email, first_name, last_name, age, favorite_subjects, learning_goals, updated_at')
    .single();

  if (error) {
    return res.status(500).json(handleDatabaseError(error, 'updating profile'));
  }

  res.json({
    success: true,
    message: 'Profile updated successfully',
    user: {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      age: user.age,
      favoriteSubjects: user.favorite_subjects,
      learningGoals: user.learning_goals,
      updatedAt: user.updated_at
    }
  });
}));

// Logout (client-side token removal, but we can track it)
router.post('/logout', authenticateToken, asyncHandler(async (req, res) => {
  // In a more advanced implementation, you might want to blacklist the token
  // For now, we'll just return a success response
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
}));

// Refresh token
router.post('/refresh', authenticateToken, asyncHandler(async (req, res) => {
  // Generate new token
  const token = jwt.sign(
    { 
      userId: req.user.id, 
      email: req.user.email,
      iat: Math.floor(Date.now() / 1000)
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({
    success: true,
    message: 'Token refreshed successfully',
    token
  });
}));

export default router;