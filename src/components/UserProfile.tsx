import React, { useState } from 'react';
import { User, Trophy, Target, Calendar, Star, BookOpen, Award, TrendingUp } from 'lucide-react';

interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  termsLearned: number;
  quizzesCompleted: number;
  currentStreak: number;
  longestStreak: number;
  favoriteCategory: string;
  totalStudyTime: number; // in minutes
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  earned: boolean;
  earnedDate?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'stats'>('overview');

  const userStats: UserStats = {
    level: 5,
    xp: 1250,
    xpToNextLevel: 1500,
    termsLearned: 23,
    quizzesCompleted: 15,
    currentStreak: 7,
    longestStreak: 12,
    favoriteCategory: 'Economics',
    totalStudyTime: 180
  };

  const achievements: Achievement[] = [
    {
      id: 'first-term',
      title: 'First Steps',
      description: 'Learned your first term',
      icon: BookOpen,
      earned: true,
      earnedDate: '2024-01-15',
      rarity: 'common'
    },
    {
      id: 'quiz-master',
      title: 'Quiz Master',
      description: 'Completed 10 quizzes',
      icon: Target,
      earned: true,
      earnedDate: '2024-01-20',
      rarity: 'rare'
    },
    {
      id: 'week-streak',
      title: 'Week Warrior',
      description: 'Maintained a 7-day learning streak',
      icon: Calendar,
      earned: true,
      earnedDate: '2024-01-22',
      rarity: 'rare'
    },
    {
      id: 'category-explorer',
      title: 'Category Explorer',
      description: 'Explored all 4 categories',
      icon: Star,
      earned: true,
      earnedDate: '2024-01-18',
      rarity: 'epic'
    },
    {
      id: 'perfect-score',
      title: 'Perfect Scholar',
      description: 'Got 100% on a quiz',
      icon: Trophy,
      earned: false,
      rarity: 'epic'
    },
    {
      id: 'speed-learner',
      title: 'Speed Learner',
      description: 'Learned 10 terms in one day',
      icon: TrendingUp,
      earned: false,
      rarity: 'legendary'
    }
  ];

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
    }
  };

  const getRarityTextColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-700';
      case 'rare': return 'text-blue-700';
      case 'epic': return 'text-purple-700';
      case 'legendary': return 'text-yellow-700';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-teal-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Alex the Explorer</h2>
                <p className="text-white/80">Level {userStats.level} • {userStats.termsLearned} terms learned</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              ×
            </button>
          </div>
          
          {/* XP Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Level {userStats.level}</span>
              <span>{userStats.xp} / {userStats.xpToNextLevel} XP</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-white h-3 rounded-full transition-all duration-300"
                style={{ width: `${(userStats.xp / userStats.xpToNextLevel) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'achievements', label: 'Achievements', icon: Trophy },
              { id: 'stats', label: 'Statistics', icon: TrendingUp }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{userStats.termsLearned}</div>
                  <div className="text-sm text-purple-700">Terms Learned</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{userStats.currentStreak}</div>
                  <div className="text-sm text-blue-700">Day Streak</div>
                </div>
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-teal-600">{userStats.quizzesCompleted}</div>
                  <div className="text-sm text-teal-700">Quizzes Done</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{Math.floor(userStats.totalStudyTime / 60)}h</div>
                  <div className="text-sm text-orange-700">Study Time</div>
                </div>
              </div>

              {/* Recent Achievements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
                <div className="space-y-3">
                  {achievements.filter(a => a.earned).slice(0, 3).map((achievement) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div key={achievement.id} className={`flex items-center space-x-3 p-3 rounded-xl border ${getRarityColor(achievement.rarity)}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRarityTextColor(achievement.rarity)}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${getRarityTextColor(achievement.rarity)}`}>{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                        <div className="text-xs text-gray-500">
                          {achievement.earnedDate}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">All Achievements</h3>
                <div className="text-sm text-gray-600">
                  {achievements.filter(a => a.earned).length} of {achievements.length} earned
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div 
                      key={achievement.id} 
                      className={`p-4 rounded-xl border-2 transition-all ${
                        achievement.earned 
                          ? getRarityColor(achievement.rarity)
                          : 'border-gray-200 bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          achievement.earned 
                            ? getRarityTextColor(achievement.rarity)
                            : 'text-gray-400'
                        }`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`font-semibold ${
                              achievement.earned 
                                ? getRarityTextColor(achievement.rarity)
                                : 'text-gray-500'
                            }`}>
                              {achievement.title}
                            </h4>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              achievement.earned 
                                ? getRarityColor(achievement.rarity)
                                : 'bg-gray-200 text-gray-500'
                            }`}>
                              {achievement.rarity}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                          {achievement.earned && achievement.earnedDate && (
                            <p className="text-xs text-gray-500">Earned on {achievement.earnedDate}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Learning Progress</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Level</span>
                      <span className="font-medium">{userStats.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total XP</span>
                      <span className="font-medium">{userStats.xp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Terms Mastered</span>
                      <span className="font-medium">{userStats.termsLearned}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Favorite Category</span>
                      <span className="font-medium">{userStats.favoriteCategory}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Activity Stats</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Streak</span>
                      <span className="font-medium">{userStats.currentStreak} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Longest Streak</span>
                      <span className="font-medium">{userStats.longestStreak} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quizzes Completed</span>
                      <span className="font-medium">{userStats.quizzesCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Study Time</span>
                      <span className="font-medium">{Math.floor(userStats.totalStudyTime / 60)}h {userStats.totalStudyTime % 60}m</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Activity Chart Placeholder */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Weekly Activity</h4>
                <div className="flex items-end justify-between h-32 space-x-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                    const height = Math.random() * 80 + 20; // Random height for demo
                    return (
                      <div key={day} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-gradient-to-t from-purple-500 to-teal-500 rounded-t"
                          style={{ height: `${height}%` }}
                        ></div>
                        <span className="text-xs text-gray-600 mt-2">{day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;