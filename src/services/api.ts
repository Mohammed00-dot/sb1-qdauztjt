const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth methods
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    age?: number;
    parentEmail?: string;
  }) {
    const response = await this.request<{
      user: any;
      token: string;
      message: string;
    }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    this.setToken(response.token);
    return response;
  }

  async login(email: string, password: string) {
    const response = await this.request<{
      user: any;
      token: string;
      message: string;
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    this.setToken(response.token);
    return response;
  }

  async getProfile() {
    return this.request<{
      user: any;
      progress: any;
    }>('/auth/profile');
  }

  async updateProfile(updates: {
    firstName?: string;
    lastName?: string;
    age?: number;
    favoriteSubjects?: string[];
    learningGoals?: string[];
  }) {
    return this.request<{
      user: any;
      message: string;
    }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Terms methods
  async getTerms(params: {
    category?: string;
    difficulty?: string;
    search?: string;
    limit?: number;
    offset?: number;
  } = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    return this.request<{
      terms: any[];
      pagination: any;
    }>(`/terms?${queryParams}`);
  }

  async getTerm(id: number) {
    return this.request<{
      term: any;
    }>(`/terms/${id}`);
  }

  async getCategoryStats() {
    return this.request<{
      categories: Array<{ category: string; count: number }>;
    }>('/terms/categories/stats');
  }

  async searchTerms(params: {
    q?: string;
    categories?: string;
    difficulties?: string;
    minRating?: number;
    maxReadTime?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    return this.request<{
      terms: any[];
      searchQuery: string;
      resultsCount: number;
    }>(`/terms/search/advanced?${queryParams}`);
  }

  // Quiz methods
  async getQuiz(termId: number) {
    return this.request<{
      term: { id: number; title: string };
      questions: any[];
    }>(`/quiz/term/${termId}`);
  }

  async submitQuiz(submission: {
    termId: number;
    answers: Array<{
      questionId: number;
      selectedAnswer: number;
      timeSpent?: number;
    }>;
    totalTimeSpent: number;
  }) {
    return this.request<{
      results: any;
      achievements: any[];
      message: string;
    }>('/quiz/submit', {
      method: 'POST',
      body: JSON.stringify(submission),
    });
  }

  async getQuizHistory(params: { limit?: number; offset?: number } = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    return this.request<{
      attempts: any[];
      pagination: any;
    }>(`/quiz/history?${queryParams}`);
  }

  async getQuizStats() {
    return this.request<{
      stats: any;
    }>('/quiz/stats');
  }

  // Progress methods
  async getProgress() {
    return this.request<{
      progress: any;
      termProgress: any[];
      favorites: any[];
      recentAchievements: any[];
    }>('/progress');
  }

  async updateTermProgress(data: {
    termId: number;
    action: 'viewed' | 'completed' | 'favorited' | 'unfavorited';
    timeSpent?: number;
    difficulty?: 'easy' | 'medium' | 'hard';
  }) {
    return this.request<{
      message: string;
      action: string;
      termId: number;
    }>('/progress/term', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getStreak() {
    return this.request<{
      currentStreak: number;
      activityDates: string[];
      streakTarget: number;
    }>('/progress/streak');
  }

  async getAchievements() {
    return this.request<{
      achievements: any[];
      totalEarned: number;
      totalAvailable: number;
    }>('/progress/achievements');
  }

  // Learning Paths methods
  async getLearningPaths() {
    return this.request<{
      learningPaths: any[];
    }>('/learning-paths');
  }

  async getLearningPath(id: number) {
    return this.request<{
      learningPath: any;
    }>(`/learning-paths/${id}`);
  }

  async startLearningPath(id: number) {
    return this.request<{
      message: string;
      progress: any;
    }>(`/learning-paths/${id}/start`, {
      method: 'POST',
    });
  }

  async completeStep(pathId: number, stepId: number, data: {
    timeSpent?: number;
    difficulty?: 'easy' | 'medium' | 'hard';
  } = {}) {
    return this.request<{
      message: string;
      progress: any;
      xpAwarded: number;
      achievements: any[];
      isPathCompleted: boolean;
    }>(`/learning-paths/${pathId}/steps/${stepId}/complete`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getUserLearningPathProgress() {
    return this.request<{
      userProgress: any[];
    }>('/learning-paths/user/progress');
  }

  // User methods
  async getFavorites() {
    return this.request<{
      favorites: any[];
    }>('/users/favorites');
  }

  async toggleFavorite(termId: number) {
    return this.request<{
      message: string;
      isFavorited: boolean;
    }>(`/users/favorites/${termId}`, {
      method: 'POST',
    });
  }

  async getDashboard() {
    return this.request<{
      progress: any;
      recentActivity: any;
      activeLearningPaths: any[];
      achievementsCount: number;
    }>('/users/dashboard');
  }

  async updatePreferences(preferences: {
    favoriteSubjects?: string[];
    learningGoals?: string[];
    studyReminders?: boolean;
    difficultyPreference?: string;
    parentNotifications?: boolean;
  }) {
    return this.request<{
      message: string;
      preferences: any;
    }>('/users/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  }
}

export const apiService = new ApiService();
export default apiService;