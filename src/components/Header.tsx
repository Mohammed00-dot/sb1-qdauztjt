import React from 'react';
import { Brain, Star, User, BookOpen, Home } from 'lucide-react';

interface HeaderProps {
  onShowProfile: () => void;
  onNavigate: (view: 'home' | 'learning-paths') => void;
  currentView: 'home' | 'learning-paths';
}

const Header: React.FC<HeaderProps> = ({ onShowProfile, onNavigate, currentView }) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                BizzyBrain
              </h1>
              <p className="text-xs text-gray-500">Learn. Discover. Grow.</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'home'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button
              onClick={() => onNavigate('learning-paths')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'learning-paths'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Learning Paths</span>
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-colors">
              <Star className="w-4 h-4" />
              <span className="font-medium">My Favorites</span>
            </button>
            <button 
              onClick={onShowProfile}
              className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors"
            >
              <User className="w-5 h-5 text-purple-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;