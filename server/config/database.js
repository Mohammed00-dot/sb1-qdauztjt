import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingVars.forEach(varName => {
    console.error(`   - ${varName}`);
  });
  console.error('\n📝 Please check your .env file and add the missing variables.');
  console.error('🔗 Get your Supabase credentials from: https://app.supabase.com/project/_/settings/api');
  process.exit(1);
}

// Create Supabase client with service role key for server-side operations
export const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Test database connection
export const testConnection = async () => {
  try {
    console.log('🔄 Testing database connection...');
    
    const { data, error } = await supabase
      .from('terms')
      .select('count(*)')
      .limit(1);
    
    if (error) {
      throw error;
    }
    
    console.log('✅ Database connection successful!');
    console.log(`📊 Database contains ${data?.[0]?.count || 0} terms`);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('\n🔧 Troubleshooting steps:');
    console.error('   1. Check your Supabase URL and service role key');
    console.error('   2. Ensure your Supabase project is active');
    console.error('   3. Verify your database migrations have run');
    console.error('   4. Check your internet connection');
    return false;
  }
};

// Helper function to handle database errors
export const handleDatabaseError = (error, operation = 'database operation') => {
  console.error(`Database error during ${operation}:`, error);
  
  // Common error types and user-friendly messages
  const errorMessages = {
    '23505': 'This record already exists',
    '23503': 'Referenced record does not exist',
    '42P01': 'Database table not found - please run migrations',
    'PGRST116': 'No records found',
    'PGRST301': 'Row Level Security policy violation'
  };
  
  const userMessage = errorMessages[error.code] || 'An unexpected database error occurred';
  
  return {
    success: false,
    error: {
      message: userMessage,
      code: error.code || 'UNKNOWN_ERROR',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }
  };
};

// Database health check endpoint data
export const getDatabaseHealth = async () => {
  try {
    const checks = [];
    
    // Check terms table
    const { data: termsData, error: termsError } = await supabase
      .from('terms')
      .select('count(*)')
      .limit(1);
    
    checks.push({
      table: 'terms',
      status: termsError ? 'error' : 'ok',
      count: termsData?.[0]?.count || 0,
      error: termsError?.message
    });
    
    // Check users table
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('count(*)')
      .limit(1);
    
    checks.push({
      table: 'users',
      status: usersError ? 'error' : 'ok',
      count: usersData?.[0]?.count || 0,
      error: usersError?.message
    });
    
    // Check learning_paths table
    const { data: pathsData, error: pathsError } = await supabase
      .from('learning_paths')
      .select('count(*)')
      .limit(1);
    
    checks.push({
      table: 'learning_paths',
      status: pathsError ? 'error' : 'ok',
      count: pathsData?.[0]?.count || 0,
      error: pathsError?.message
    });
    
    const overallStatus = checks.every(check => check.status === 'ok') ? 'healthy' : 'degraded';
    
    return {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      checks
    };
  } catch (error) {
    return {
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error.message
    };
  }
};

export default supabase;