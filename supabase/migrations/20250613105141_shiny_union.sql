/*
  # BizzyBrain Database Schema

  1. New Tables
    - `users` - User accounts and profiles
    - `terms` - Learning terms and definitions
    - `quiz_questions` - Quiz questions for each term
    - `quiz_attempts` - User quiz attempt records
    - `user_progress` - Overall user learning progress
    - `term_progress` - User progress on individual terms
    - `term_favorites` - User's favorited terms
    - `learning_paths` - Structured learning sequences
    - `learning_path_steps` - Individual steps in learning paths
    - `user_learning_path_progress` - User progress on learning paths
    - `learning_path_step_completions` - Completed learning path steps
    - `user_achievements` - User earned achievements

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Add policies for public read access where appropriate

  3. Indexes
    - Add performance indexes for common queries
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  age integer,
  parent_email text,
  favorite_subjects text[],
  learning_goals text[],
  study_reminders boolean DEFAULT true,
  difficulty_preference text DEFAULT 'beginner',
  parent_notifications boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Terms table
CREATE TABLE IF NOT EXISTS terms (
  id serial PRIMARY KEY,
  title text NOT NULL,
  category text NOT NULL CHECK (category IN ('economics', 'social', 'government', 'money')),
  difficulty text NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  simple_definition text NOT NULL,
  example text NOT NULL,
  detailed_explanation text NOT NULL,
  why_it_matters text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  estimated_read_time integer DEFAULT 5,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Quiz questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id serial PRIMARY KEY,
  term_id integer REFERENCES terms(id) ON DELETE CASCADE,
  question text NOT NULL,
  options jsonb NOT NULL,
  correct_answer integer NOT NULL,
  explanation text NOT NULL,
  difficulty text DEFAULT 'beginner',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Quiz attempts table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  term_id integer REFERENCES terms(id) ON DELETE CASCADE,
  score integer NOT NULL CHECK (score >= 0 AND score <= 100),
  correct_answers integer NOT NULL,
  total_questions integer NOT NULL,
  time_spent integer DEFAULT 0,
  xp_earned integer DEFAULT 0,
  answers jsonb,
  completed_at timestamptz DEFAULT now()
);

-- User progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  level integer DEFAULT 1,
  total_xp integer DEFAULT 0,
  terms_learned integer DEFAULT 0,
  quizzes_completed integer DEFAULT 0,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  total_study_time integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Term progress table
CREATE TABLE IF NOT EXISTS term_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  term_id integer REFERENCES terms(id) ON DELETE CASCADE,
  status text DEFAULT 'viewed' CHECK (status IN ('viewed', 'completed')),
  time_spent integer DEFAULT 0,
  difficulty_rating text CHECK (difficulty_rating IN ('easy', 'medium', 'hard')),
  last_accessed timestamptz DEFAULT now(),
  UNIQUE(user_id, term_id)
);

-- Term favorites table
CREATE TABLE IF NOT EXISTS term_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  term_id integer REFERENCES terms(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, term_id)
);

-- Learning paths table
CREATE TABLE IF NOT EXISTS learning_paths (
  id serial PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  difficulty text DEFAULT 'beginner',
  estimated_time text DEFAULT '30 min',
  icon text DEFAULT '📚',
  color text DEFAULT 'blue',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Learning path steps table
CREATE TABLE IF NOT EXISTS learning_path_steps (
  id serial PRIMARY KEY,
  learning_path_id integer REFERENCES learning_paths(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  order_index integer NOT NULL,
  estimated_time text DEFAULT '5 min',
  difficulty text DEFAULT 'beginner',
  term_ids integer[],
  content jsonb,
  created_at timestamptz DEFAULT now()
);

-- User learning path progress table
CREATE TABLE IF NOT EXISTS user_learning_path_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  learning_path_id integer REFERENCES learning_paths(id) ON DELETE CASCADE,
  current_step integer DEFAULT 1,
  completed_steps integer[],
  is_completed boolean DEFAULT false,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, learning_path_id)
);

-- Learning path step completions table
CREATE TABLE IF NOT EXISTS learning_path_step_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  learning_path_id integer REFERENCES learning_paths(id) ON DELETE CASCADE,
  step_id integer REFERENCES learning_path_steps(id) ON DELETE CASCADE,
  time_spent integer DEFAULT 0,
  difficulty_rating text CHECK (difficulty_rating IN ('easy', 'medium', 'hard')),
  completed_at timestamptz DEFAULT now(),
  UNIQUE(user_id, step_id)
);

-- User achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  achievement_type text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  earned_at timestamptz DEFAULT now(),
  UNIQUE(user_id, achievement_type)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE term_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE term_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_path_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_learning_path_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_path_step_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users: Users can read and update their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- Terms: Public read access
CREATE POLICY "Terms are publicly readable" ON terms
  FOR SELECT TO anon, authenticated
  USING (true);

-- Quiz questions: Public read access
CREATE POLICY "Quiz questions are publicly readable" ON quiz_questions
  FOR SELECT TO anon, authenticated
  USING (true);

-- Quiz attempts: Users can read and create their own attempts
CREATE POLICY "Users can read own quiz attempts" ON quiz_attempts
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own quiz attempts" ON quiz_attempts
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- User progress: Users can read and update their own progress
CREATE POLICY "Users can read own progress" ON user_progress
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own progress" ON user_progress
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Term progress: Users can manage their own term progress
CREATE POLICY "Users can manage own term progress" ON term_progress
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Term favorites: Users can manage their own favorites
CREATE POLICY "Users can manage own favorites" ON term_favorites
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Learning paths: Public read access
CREATE POLICY "Learning paths are publicly readable" ON learning_paths
  FOR SELECT TO anon, authenticated
  USING (true);

-- Learning path steps: Public read access
CREATE POLICY "Learning path steps are publicly readable" ON learning_path_steps
  FOR SELECT TO anon, authenticated
  USING (true);

-- User learning path progress: Users can manage their own progress
CREATE POLICY "Users can manage own learning path progress" ON user_learning_path_progress
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Learning path step completions: Users can manage their own completions
CREATE POLICY "Users can manage own step completions" ON learning_path_step_completions
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- User achievements: Users can read their own achievements
CREATE POLICY "Users can read own achievements" ON user_achievements
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can create achievements" ON user_achievements
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_terms_category ON terms(category);
CREATE INDEX IF NOT EXISTS idx_terms_difficulty ON terms(difficulty);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_term_id ON quiz_questions(term_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_term_id ON quiz_attempts(term_id);
CREATE INDEX IF NOT EXISTS idx_term_progress_user_id ON term_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_term_favorites_user_id ON term_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_path_steps_path_id ON learning_path_steps(learning_path_id);
CREATE INDEX IF NOT EXISTS idx_user_learning_path_progress_user_id ON user_learning_path_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);