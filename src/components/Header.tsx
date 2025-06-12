import React, { useState } from 'react';
import { Brain, Star, User, BookOpen, Home, Menu, X } from 'lucide-react';

interface HeaderProps {
  onShowProfile: () => void;
  onNavigate: (view: 'home' | 'learning-paths') => void;
  currentView: 'home' | 'learning-paths';
}

const Header: React.FC<HeaderProps> = ({ onShowProfile, onNavigate, currentView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                BizzyBrain
              </h1>
              <p className="text-xs text-gray-500 font-medium">Learn. Discover. Grow.</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                currentView === 'home'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-200'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button
              onClick={() => onNavigate('learning-paths')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                currentView === 'learning-paths'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-200'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Learning Paths</span>
            </button>
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-xl hover:from-orange-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-orange-200 font-medium">
              <Star className="w-4 h-4" />
              <span>Favorites</span>
            </button>
            <button 
              onClick={onShowProfile}
              className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl flex items-center justify-center hover:from-purple-200 hover:to-blue-200 transition-all duration-200 shadow-md"
            >
              <User className="w-5 h-5 text-purple-600" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white/95 backdrop-blur-sm">
            <div className="space-y-2">
              <button
                onClick={() => {
                  onNavigate('home');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  currentView === 'home'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('learning-paths');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  currentView === 'learning-paths'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span>Learning Paths</span>
              </button>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <button className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-xl font-medium">
                  <Star className="w-5 h-5" />
                  <span>My Favorites</span>
                </button>
                <button 
                  onClick={() => {
                    onShowProfile();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl mt-2"
                >
                  <User className="w-5 h-5" />
                  <span>My Profile</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;