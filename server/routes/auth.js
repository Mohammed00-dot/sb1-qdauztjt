import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../index.js';
import { validateRequest, schemas } from '../middleware/validation.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Register new user
router.post('/register', validateRequest(schemas.register), async (req, res) => {
  try {
    const { email, password, firstName, lastName, age, parentEmail } = req.body;

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(409).json({
        error: {
          message: 'User already exists with this email',
          code: 'USER_EXISTS'
        }
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const userId = uuidv4();
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        id: userId,
        email,
        password_hash: hashedPassword,
        first_name: firstName,
        last_name: lastName,
        age,
        parent_email: parentEmail,
        created_at: new Date().toISOString()
      })
      .select('id, email, first_name, last_name, age, created_at')
      .single();

    if (error) {
      throw error;
    }

    // Create initial user progress record
    await supabase
      .from('user_progress')
      .insert({
        user_id: userId,
        level: 1,
        total_xp: 0,
        terms_learned: 0,
        quizzes_completed: 0,
        current_streak: 0,
        longest_streak: 0
      });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: 'User registered successfully',
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
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: {
        message: 'Registration failed',
        code: 'REGISTRATION_ERROR'
      }
    });
  }
});

// Login user
router.post('/login', validateRequest(schemas.login), async (req, res) => {
  try {
    const { email, password } = req.body;

    // Get user from database
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({
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
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Login successful',
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
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: {
        message: 'Login failed',
        code: 'LOGIN_ERROR'
      }
    });
  }
});

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const { data: userProgress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', req.user.id)
      .single();

    res.json({
      user: {
        id: req.user.id,
        email: req.user.email,
        firstName: req.user.first_name,
        lastName: req.user.last_name,
        age: req.user.age,
        createdAt: req.user.created_at,
        lastLogin: req.user.last_login
      },
      progress: userProgress
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to fetch profile',
        code: 'PROFILE_FETCH_ERROR'
      }
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, validateRequest(schemas.updateProfile), async (req, res) => {
  try {
    const updates = {};
    const { firstName, lastName, age, favoriteSubjects, learningGoals } = req.body;

    if (firstName) updates.first_name = firstName;
    if (lastName) updates.last_name = lastName;
    if (age) updates.age = age;
    if (favoriteSubjects) updates.favorite_subjects = favoriteSubjects;
    if (learningGoals) updates.learning_goals = learningGoals;

    const { data: user, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', req.user.id)
      .select('id, email, first_name, last_name, age, favorite_subjects, learning_goals')
      .single();

    if (error) {
      throw error;
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        age: user.age,
        favoriteSubjects: user.favorite_subjects,
        learningGoals: user.learning_goals
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to update profile',
        code: 'PROFILE_UPDATE_ERROR'
      }
    });
  }
});

export default router;