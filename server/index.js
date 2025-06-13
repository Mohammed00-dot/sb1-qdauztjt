import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { testConnection } from './config/database.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { generalLimiter } from './middleware/rateLimiter.js';

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import termsRoutes from './routes/terms.js';
import quizRoutes from './routes/quiz.js';
import progressRoutes from './routes/progress.js';
import learningPathRoutes from './routes/learningPaths.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false, // Disable for development
  contentSecurityPolicy: false // Disable for development
}));

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting (only in production or when enabled)
if (process.env.NODE_ENV === 'production' || process.env.ENABLE_RATE_LIMITING === 'true') {
  app.use(generalLimiter);
}

// Request logging middleware (development only)
if (process.env.NODE_ENV === 'development' && process.env.ENABLE_LOGGING === 'true') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });
}

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const dbHealth = await testConnection();
    
    res.status(200).json({
      success: true,
      status: 'OK',
      message: 'BizzyBrain API is running',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: process.env.NODE_ENV,
      database: dbHealth ? 'connected' : 'disconnected'
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: 'Service Unavailable',
      message: 'Health check failed',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// Database health endpoint
app.get('/health/database', async (req, res) => {
  try {
    const { getDatabaseHealth } = await import('./config/database.js');
    const health = await getDatabaseHealth();
    
    const statusCode = health.status === 'healthy' ? 200 : 
                      health.status === 'degraded' ? 206 : 503;
    
    res.status(statusCode).json({
      success: health.status !== 'error',
      ...health
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/terms', termsRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/learning-paths', learningPathRoutes);

// 404 handler for undefined routes
app.use('*', notFoundHandler);

// Global error handling middleware
app.use(errorHandler);

// Graceful shutdown handling
const gracefulShutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
  
  server.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
  
  // Force close after 10 seconds
  setTimeout(() => {
    console.log('⚠️  Forcing shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start server
const server = app.listen(PORT, async () => {
  console.log('\n🚀 BizzyBrain API Server Starting...\n');
  
  // Test database connection on startup
  const dbConnected = await testConnection();
  
  console.log('📊 Server Information:');
  console.log(`   Port: ${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV}`);
  console.log(`   Database: ${dbConnected ? '✅ Connected' : '❌ Disconnected'}`);
  console.log(`   CORS Origin: ${process.env.CLIENT_URL}`);
  console.log(`   Rate Limiting: ${process.env.ENABLE_RATE_LIMITING === 'true' ? 'Enabled' : 'Disabled'}`);
  
  console.log('\n🔗 Available Endpoints:');
  console.log(`   Health Check: http://localhost:${PORT}/health`);
  console.log(`   Database Health: http://localhost:${PORT}/health/database`);
  console.log(`   API Base: http://localhost:${PORT}/api`);
  
  if (!dbConnected) {
    console.log('\n⚠️  Warning: Database connection failed!');
    console.log('   Please check your Supabase configuration in .env file');
  }
  
  console.log('\n✅ Server is ready to accept connections!\n');
});

export default app;