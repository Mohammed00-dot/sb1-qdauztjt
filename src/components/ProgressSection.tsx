import React from 'react';
import { Trophy, Target, Star, TrendingUp, Award, Zap, Users, BookOpen } from 'lucide-react';

const ProgressSection = () => {
  const achievements = [
    { 
      icon: Star, 
      title: 'First Term Learned', 
      description: 'You learned your first term!', 
      earned: true,
      rarity: 'common'
    },
    { 
      icon: Target, 
      title: 'Category Explorer', 
      description: 'Explored all 4 categories', 
      earned: true,
      rarity: 'rare'
    },
    { 
      icon: TrendingUp, 
      title: 'Quick Learner', 
      description: 'Learned 10 terms in one day', 
      earned: false,
      rarity: 'epic'
    },
    { 
      icon: Trophy, 
      title: 'Master Student', 
      description: 'Learned 50+ terms', 
      earned: false,
      rarity: 'legendary'
    },
  ];

  const stats = [
    { label: 'Terms Learned', value: '23', color: 'purple', icon: BookOpen },
    { label: 'Categories Explored', value: '4', color: 'blue', icon: Target },
    { label: 'Days Learning', value: '7', color: 'teal', icon: TrendingUp },
    { label: 'Badges Earned', value: '2', color: 'orange', icon: Award },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-slate-400 to-slate-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-amber-400 to-amber-600';
      default: return 'from-slate-400 to-slate-600';
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-100 to-green-100 px-6 py-3 rounded-full text-teal-700 font-medium mb-6">
            <Zap className="w-5 h-5" />
            <span>Track Your Growth</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
            Your Learning <span className="bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">Journey</span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Celebrate your progress, unlock achievements, and watch your knowledge grow with every step you take.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Progress Stats */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900">Learning Statistics</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div 
                    key={index} 
                    className={`group relative bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 rounded-3xl p-8 border-2 border-${stat.color}-200 hover:shadow-2xl hover:shadow-${stat.color}-200/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full -translate-y-10 translate-x-10"></div>
                    
                    <div className="relative">
                      <div className={`w-12 h-12 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className={`text-4xl font-bold text-${stat.color}-700 mb-2 group-hover:scale-110 transition-transform duration-300`}>
                        {stat.value}
                      </div>
                      <div className={`text-${stat.color}-600 font-semibold`}>
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Weekly Goal */}
            <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Weekly Goal</h4>
                </div>
                <span className="text-sm text-slate-500 font-medium">5/7 days</span>
              </div>
              
              <div className="relative w-full bg-slate-200 rounded-full h-4 mb-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out" 
                     style={{ width: '71%' }}>
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              
              <p className="text-slate-600 font-medium">
                Outstanding progress! You're almost at your weekly goal. Keep up the amazing work! 🎉
              </p>
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900">Achievements</h3>
            </div>
            
            <div className="space-y-6">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div
                    key={index}
                    className={`group relative flex items-center space-x-6 p-6 rounded-3xl border-2 transition-all duration-500 hover:-translate-y-1 cursor-pointer overflow-hidden ${
                      achievement.earned
                        ? 'bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-amber-200 hover:shadow-2xl hover:shadow-amber-200/50'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {/* Background Glow */}
                    {achievement.earned && (
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-orange-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    )}
                    
                    <div className="relative">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                        achievement.earned
                          ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)} shadow-lg`
                          : 'bg-slate-200'
                      }`}>
                        <IconComponent className={`w-8 h-8 ${
                          achievement.earned ? 'text-white' : 'text-slate-400'
                        }`} />
                      </div>
                      
                      {/* Rarity Indicator */}
                      {achievement.earned && (
                        <div className={`absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r ${getRarityColor(achievement.rarity)} rounded-full flex items-center justify-center`}>
                          <Star className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 relative">
                      <h4 className={`text-lg font-bold mb-2 ${
                        achievement.earned ? 'text-slate-900' : 'text-slate-500'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm leading-relaxed ${
                        achievement.earned ? 'text-slate-600' : 'text-slate-400'
                      }`}>
                        {achievement.description}
                      </p>
                      
                      {/* Rarity Badge */}
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                        achievement.earned 
                          ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`
                          : 'bg-slate-200 text-slate-500'
                      }`}>
                        {achievement.rarity}
                      </div>
                    </div>
                    
                    {achievement.earned && (
                      <div className="relative">
                        <Trophy className="w-6 h-6 text-amber-500 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-blue-900 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-progress-grid-pattern opacity-30"></div>
            
            <div className="relative">
              <h3 className="text-3xl font-bold mb-4">Ready to unlock more achievements?</h3>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Continue your learning journey and discover new concepts that will expand your understanding of the world.
              </p>
              
              <button className="group px-8 py-4 bg-white text-slate-900 rounded-2xl font-semibold hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center space-x-2">
                  <span>Continue Learning</span>
                  <Users className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressSection;