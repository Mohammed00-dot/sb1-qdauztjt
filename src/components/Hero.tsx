import React from 'react';
import { Sparkles, BookOpen, Target, ArrowRight, Play, AlertCircle, Star, Users, TrendingUp } from 'lucide-react';

interface HeroProps {
  onShowAuth: (mode: 'login' | 'register') => void;
}

const Hero: React.FC<HeroProps> = ({ onShowAuth }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Sophisticated Background */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
        
        {/* Animated Geometric Shapes */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-100/30 to-blue-100/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-teal-100/30 to-green-100/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-orange-100/20 to-pink-100/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-hero-grid-pattern opacity-40"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Development Badge */}
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm border border-orange-200/50 text-orange-700 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
          <AlertCircle className="w-4 h-4" />
          <span>🚧 Development Preview - Experience the Future of Learning</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-8 mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight">
            <span className="block text-slate-900 mb-4">
              Learn Big Ideas
            </span>
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
             Presented Concisely
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl lg:text-3xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
            Transform complex concepts into engaging learning experiences. 
            <span className="font-medium text-slate-800"> BizzyBrain makes economics, government, and social studies accessible to curious minds everywhere.</span>
          </p>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <button 
            onClick={() => {
              const element = document.querySelector('[data-search-results]');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-3">
              <Play className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span>Start Learning Today</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </button>
          
          <button 
            onClick={() => {
              const element = document.querySelector('[data-categories]');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 rounded-2xl font-semibold text-lg border-2 border-slate-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center space-x-3">
              <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span>Explore Topics</span>
            </div>
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: BookOpen,
              title: "Simplified Learning",
              description: "Complex topics explained in clear, engaging language that makes sense to young minds",
              color: "purple",
              status: "✅ Live & Working"
            },
            {
              icon: Target,
              title: "Real-World Examples",
              description: "Connect abstract concepts to everyday situations through relatable stories and analogies",
              color: "blue", 
              status: "✅ Live & Working"
            },
            {
              icon: TrendingUp,
              title: "Progress Tracking",
              description: "Gamified learning with achievements, streaks, and personalized progress insights",
              color: "teal",
              status: "🚧 Coming Soon"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 hover:shadow-2xl hover:shadow-purple-100/50 transition-all duration-700 hover:-translate-y-4 hover:border-purple-200"
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-50/50 to-${feature.color}-100/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className={`text-xl font-bold text-slate-900 mb-4 group-hover:text-${feature.color}-700 transition-colors duration-300`}>
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                {/* Status Badge */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  feature.status.includes('✅') 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-orange-100 text-orange-700 border border-orange-200'
                }`}>
                  {feature.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-slate-50 to-blue-50 rounded-3xl p-8 border border-slate-200/50 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "12", label: "Learning Terms", icon: BookOpen },
              { number: "4", label: "Subject Areas", icon: Target },
              { number: "100%", label: "Interactive", icon: Sparkles },
              { number: "∞", label: "Possibilities", icon: Star }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex items-center justify-center mb-3">
                  <stat.icon className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;