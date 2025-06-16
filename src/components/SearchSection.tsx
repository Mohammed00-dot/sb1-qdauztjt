import React, { useState } from 'react';
import { Search, Filter, Sparkles, TrendingUp, X, Zap } from 'lucide-react';

interface SearchSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const popularSearches = ['democracy', 'economy', 'inflation', 'budget', 'citizenship'];

  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  const handlePopularSearch = (term: string) => {
    setSearchTerm(term);
    setTimeout(() => {
      const element = document.querySelector('[data-search-results]');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white"></div>
      
      <div className="relative max-w-5xl mx-auto">
        {/* Search Container */}
        <div className={`relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 border-2 shadow-2xl transition-all duration-500 ${
          isFocused ? 'border-purple-300 shadow-purple-200/50 scale-105' : 'border-slate-200 hover:border-purple-200'
        }`}>
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 px-6 py-3 rounded-full text-purple-700 font-medium mb-6">
              <Zap className="w-5 h-5" />
              <span>Instant Knowledge Discovery</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              What sparks your <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">curiosity</span> today?
            </h2>
            <p className="text-slate-600 text-lg">Search for any concept or browse by category to begin your learning journey</p>
          </div>

          {/* Search Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search Input */}
            <div className="flex-1 relative group">
              <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                isFocused ? 'text-purple-500' : 'text-slate-400'
              }`}>
                <Search className="w-6 h-6" />
              </div>
              
              <input
                type="text"
                placeholder="Search for any term... (try 'economy', 'democracy', 'inflation')"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full pl-14 pr-14 py-5 border-2 border-slate-200 rounded-2xl focus:ring-0 focus:border-purple-400 transition-all duration-300 text-slate-900 placeholder-slate-500 text-lg font-medium bg-white/90 backdrop-blur-sm hover:border-purple-300 shadow-lg focus:shadow-xl"
              />
              
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400 hover:text-slate-600 transition-colors duration-300 hover:scale-110"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-12 pr-8 py-5 border-2 border-slate-200 rounded-2xl focus:ring-0 focus:border-purple-400 transition-all duration-300 text-slate-900 bg-white/90 backdrop-blur-sm appearance-none cursor-pointer text-lg font-medium hover:border-purple-300 min-w-[220px] shadow-lg focus:shadow-xl"
              >
                <option value="all">All Topics</option>
                <option value="economics">📈 Economics</option>
                <option value="social">👥 Social Studies</option>
                <option value="government">🏛️ Government</option>
                <option value="money">💰 Money & Finance</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedCategory !== 'all') && (
            <div className="flex items-center gap-3 mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-200/50">
              <span className="text-sm font-semibold text-purple-700">Active filters:</span>
              {searchTerm && (
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium border border-purple-200">
                  Search: "{searchTerm}"
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium border border-purple-200">
                  Category: {selectedCategory}
                </span>
              )}
              <button
                onClick={handleClearSearch}
                className="px-4 py-2 bg-purple-200 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-300 transition-colors duration-300"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center space-x-2 text-slate-600">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">Trending:</span>
            </div>
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => handlePopularSearch(term)}
                className="group px-5 py-2 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-full text-sm font-medium hover:from-purple-100 hover:to-blue-100 hover:text-purple-700 transition-all duration-300 border border-slate-200 hover:border-purple-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <span className="group-hover:scale-105 transition-transform duration-300 inline-block">
                  {term}
                </span>
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-200">
            {[
              { number: "12", label: "Terms Available", icon: "📚" },
              { number: "4", label: "Categories", icon: "🎯" },
              { number: "100%", label: "Interactive", icon: "⚡" },
              { number: "∞", label: "Possibilities", icon: "🚀" }
            ].map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-purple-600 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;