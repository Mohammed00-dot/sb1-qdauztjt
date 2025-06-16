import React, { useState, useEffect } from 'react';
import { Brain, Star, User, BookOpen, Home, Menu, X, AlertTriangle } from 'lucide-react';

interface HeaderProps {
  onShowProfile: () => void;
  onShowAuth: (mode: 'login' | 'register') => void;
  onNavigate: (view: 'home' | 'learning-paths') => void;
  currentView: 'home' | 'learning-paths';
}

const Header: React.FC<HeaderProps> = ({ onShowProfile, onShowAuth, onNavigate, currentView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Development Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M0 0h20v20H0z"/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 text-sm font-medium relative">
          <AlertTriangle className="w-4 h-4 animate-pulse" />
          <span>🚧 Development Preview - Building the Future of Education 🚧</span>
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-lg shadow-slate-900/5' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4 group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-purple-700 to-blue-700 bg-clip-text text-transparent">
                  BizzyBrain
                </h1>
                <p className="text-xs text-slate-500 font-medium tracking-wide">
                  Learn • Discover • Grow
                </p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {[
                { id: 'home', label: 'Home', icon: Home },
                { id: 'learning-paths', label: 'Learning Paths', icon: BookOpen }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as any)}
                  className={`group flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                    currentView === item.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-200/50 scale-105'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 hover:scale-105'
                  }`}
                >
                  <item.icon className={`w-4 h-4 transition-transform duration-300 ${
                    currentView === item.id ? 'scale-110' : 'group-hover:scale-110'
                  }`} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => alert('Favorites feature coming soon!')}
                className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium hover:scale-105"
              >
                <Star className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>Favorites</span>
              </button>
              
              <button 
                onClick={() => onShowAuth('login')}
                className="group w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center hover:from-purple-100 hover:to-blue-100 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
              >
                <User className="w-5 h-5 text-slate-600 group-hover:text-purple-600 transition-colors duration-300" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center hover:bg-slate-200 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-xl">
              <div className="p-6 space-y-4">
                {[
                  { id: 'home', label: 'Home', icon: Home },
                  { id: 'learning-paths', label: 'Learning Paths', icon: BookOpen }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id as any);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-6 py-4 rounded-2xl font-medium transition-all duration-300 ${
                      currentView === item.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
                
                <div className="border-t border-slate-200 pt-4 space-y-3">
                  <button 
                    onClick={() => {
                      alert('Favorites feature coming soon!');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl font-medium shadow-lg"
                  >
                    <Star className="w-5 h-5" />
                    <span>My Favorites</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      onShowAuth('login');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-6 py-4 text-slate-600 hover:bg-slate-100 rounded-2xl transition-colors duration-300"
                  >
                    <User className="w-5 h-5" />
                    <span>Sign In</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;