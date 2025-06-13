import Joi from 'joi';

// Enhanced validation schemas with better error messages
export const schemas = {
  register: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
      }),
    password: Joi.string()
      .min(6)
      .max(128)
      .required()
      .messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.max': 'Password must be less than 128 characters',
        'any.required': 'Password is required'
      }),
    firstName: Joi.string()
      .min(2)
      .max(50)
      .required()
      .messages({
        'string.min': 'First name must be at least 2 characters',
        'string.max': 'First name must be less than 50 characters',
        'any.required': 'First name is required'
      }),
    lastName: Joi.string()
      .min(2)
      .max(50)
      .required()
      .messages({
        'string.min': 'Last name must be at least 2 characters',
        'string.max': 'Last name must be less than 50 characters',
        'any.required': 'Last name is required'
      }),
    age: Joi.number()
      .integer()
      .min(5)
      .max(18)
      .optional()
      .messages({
        'number.min': 'Age must be at least 5',
        'number.max': 'Age must be 18 or younger',
        'number.integer': 'Age must be a whole number'
      }),
    parentEmail: Joi.string()
      .email()
      .optional()
      .messages({
        'string.email': 'Please enter a valid parent email address'
      })
  }),

  login: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
      }),
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Password is required'
      })
  }),

  updateProfile: Joi.object({
    firstName: Joi.string().min(2).max(50).optional(),
    lastName: Joi.string().min(2).max(50).optional(),
    age: Joi.number().integer().min(5).max(18).optional(),
    favoriteSubjects: Joi.array().items(Joi.string()).optional(),
    learningGoals: Joi.array().items(Joi.string()).optional()
  }),

  quizSubmission: Joi.object({
    termId: Joi.number()
      .integer()
      .positive()
      .required()
      .messages({
        'number.positive': 'Term ID must be a positive number',
        'any.required': 'Term ID is required'
      }),
    answers: Joi.array()
      .items(
        Joi.object({
          questionId: Joi.number().integer().positive().required(),
          selectedAnswer: Joi.number().integer().min(0).required(),
          timeSpent: Joi.number().integer().min(0).optional()
        })
      )
      .min(1)
      .required()
      .messages({
        'array.min': 'At least one answer is required',
        'any.required': 'Answers are required'
      }),
    totalTimeSpent: Joi.number()
      .integer()
      .min(0)
      .required()
      .messages({
        'number.min': 'Time spent cannot be negative',
        'any.required': 'Total time spent is required'
      })
  }),

  progressUpdate: Joi.object({
    termId: Joi.number().integer().positive().required(),
    action: Joi.string()
      .valid('viewed', 'completed', 'favorited', 'unfavorited')
      .required()
      .messages({
        'any.only': 'Action must be one of: viewed, completed, favorited, unfavorited'
      }),
    timeSpent: Joi.number().integer().min(0).optional(),
    difficulty: Joi.string()
      .valid('easy', 'medium', 'hard')
      .optional()
      .messages({
        'any.only': 'Difficulty must be one of: easy, medium, hard'
      })
  }),

  searchTerms: Joi.object({
    q: Joi.string().max(100).optional(),
    category: Joi.string()
      .valid('all', 'economics', 'social', 'government', 'money')
      .optional(),
    difficulty: Joi.string()
      .valid('beginner', 'intermediate', 'advanced')
      .optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    offset: Joi.number().integer().min(0).optional()
  })
};

// Enhanced validation middleware with better error formatting
export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Return all errors, not just the first one
      stripUnknown: true // Remove unknown fields
    });
    
    if (error) {
      const formattedErrors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context?.value
      }));

      return res.status(400).json({
        success: false,
        error: {
          message: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: formattedErrors
        }
      });
    }
    
    // Replace req.body with validated and sanitized data
    req.body = value;
    next();
  };
};

// Query parameter validation
export const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true
    });
    
    if (error) {
      const formattedErrors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context?.value
      }));

      return res.status(400).json({
        success: false,
        error: {
          message: 'Invalid query parameters',
          code: 'QUERY_VALIDATION_ERROR',
          details: formattedErrors
        }
      });
    }
    
    req.query = value;
    next();
  };
};

// Sanitize user input to prevent XSS
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim() // Remove whitespace
    .substring(0, 1000); // Limit length
};

// Validate email format more strictly
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password strength validation
export const validatePasswordStrength = (password) => {
  const checks = {
    length: password.length >= 6,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
  
  const score = Object.values(checks).filter(Boolean).length;
  
  return {
    isValid: checks.length && checks.hasLetter,
    score,
    checks,
    strength: score < 2 ? 'weak' : score < 3 ? 'medium' : 'strong'
  };
};

export default {
  schemas,
  validateRequest,
  validateQuery,
  sanitizeInput,
  isValidEmail,
  validatePasswordStrength
};