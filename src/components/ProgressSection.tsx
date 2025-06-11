import React from 'react';
import { Trophy, Target, Star, TrendingUp } from 'lucide-react';

const ProgressSection = () => {
  const achievements = [
    { icon: Star, title: 'First Term Learned', description: 'You learned your first term!', earned: true },
    { icon: Target, title: 'Category Explorer', description: 'Explored all 4 categories', earned: true },
    { icon: TrendingUp, title: 'Quick Learner', description: 'Learned 10 terms in one day', earned: false },
    { icon: Trophy, title: 'Master Student', description: 'Learned 50+ terms', earned: false },
  ];

  const stats = [
    { label: 'Terms Learned', value: '23', color: 'purple' },
    { label: 'Categories Explored', value: '4', color: 'blue' },
    { label: 'Days Learning', value: '7', color: 'teal' },
    { label: 'Badges Earned', value: '2', color: 'orange' },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Learning Journey</h2>
          <p className="text-lg text-gray-600">Track your progress and celebrate your achievements!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Progress Stats */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Learning Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 rounded-2xl p-6 border border-${stat.color}-200`}>
                  <div className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>{stat.value}</div>
                  <div className={`text-${stat.color}-700 font-medium`}>{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 bg-white/80 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Weekly Goal</h4>
                <span className="text-sm text-gray-500">5/7 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div className="bg-gradient-to-r from-purple-500 to-teal-500 h-3 rounded-full" style={{ width: '71%' }}></div>
              </div>
              <p className="text-sm text-gray-600">Great job! You're almost at your weekly goal.</p>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h3>
            <div className="space-y-4">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-center space-x-4 p-4 rounded-2xl border transition-all duration-200 ${
                      achievement.earned
                        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      achievement.earned
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && (
                      <div className="text-yellow-500">
                        <Trophy className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressSection;