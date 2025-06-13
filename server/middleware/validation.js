import Joi from 'joi';

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        error: {
          message: 'Validation failed',
          details: error.details.map(detail => ({
            field: detail.path.join('.'),
            message: detail.message
          }))
        }
      });
    }
    
    next();
  };
};

// Common validation schemas
export const schemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    age: Joi.number().integer().min(5).max(18).optional(),
    parentEmail: Joi.string().email().optional()
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  updateProfile: Joi.object({
    firstName: Joi.string().min(2).max(50).optional(),
    lastName: Joi.string().min(2).max(50).optional(),
    age: Joi.number().integer().min(5).max(18).optional(),
    favoriteSubjects: Joi.array().items(Joi.string()).optional(),
    learningGoals: Joi.array().items(Joi.string()).optional()
  }),

  quizSubmission: Joi.object({
    termId: Joi.number().integer().required(),
    answers: Joi.array().items(Joi.object({
      questionId: Joi.number().integer().required(),
      selectedAnswer: Joi.number().integer().required(),
      timeSpent: Joi.number().integer().min(0).optional()
    })).required(),
    totalTimeSpent: Joi.number().integer().min(0).required()
  }),

  progressUpdate: Joi.object({
    termId: Joi.number().integer().required(),
    action: Joi.string().valid('viewed', 'completed', 'favorited', 'unfavorited').required(),
    timeSpent: Joi.number().integer().min(0).optional(),
    difficulty: Joi.string().valid('easy', 'medium', 'hard').optional()
  })
};