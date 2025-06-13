import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { apiService } from '../services/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age?: number;
  createdAt: string;
  lastLogin?: string;
}

interface UserProgress {
  level: number;
  totalXP: number;
  xpToNextLevel: number;
  termsLearned: number;
  quizzesCompleted: number;
  currentStreak: number;
  longestStreak: number;
  categoriesExplored: number;
  totalStudyTime: number;
}

interface AuthContextType {
  user: User | null;
  progress: UserProgress | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    age?: number;
    parentEmail?: string;
  }) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      refreshProfile();
    } else {
      setIsLoading(false);
    }
  }, []);

  const refreshProfile = async () => {
    try {
      const response = await apiService.getProfile();
      setUser(response.user);
      setProgress(response.progress);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      // Clear invalid token
      apiService.clearToken();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login(email, password);
      setUser(response.user);
      // Fetch full profile data including progress
      await refreshProfile();
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    age?: number;
    parentEmail?: string;
  }) => {
    try {
      const response = await apiService.register(userData);
      setUser(response.user);
      // Fetch full profile data including progress
      await refreshProfile();
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    apiService.clearToken();
    setUser(null);
    setProgress(null);
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      const response = await apiService.updateProfile(updates);
      setUser(response.user);
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    progress,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;