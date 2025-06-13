import React, { useState } from 'react';
import { Search, Filter, Sparkles, TrendingUp, X } from 'lucide-react';

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
    // Show feedback
    setTimeout(() => {
      const element = document.querySelector('[data-search-results]');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Search Container */}
        <div className={`bg-white/90 backdrop-blur-md rounded-3xl p-8 border-2 shadow-xl transition-all duration-300 ${
          isFocused ? 'border-purple-300 shadow-2xl shadow-purple-100' : 'border-purple-100'
        }`}>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">What would you like to learn today?</h2>
            <p className="text-gray-600">Search for any concept or browse by category</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="flex-1 relative group">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                isFocused ? 'text-purple-500' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search for any term... (try 'economy', 'democracy', 'inflation')"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:ring-0 focus:border-purple-400 transition-all duration-200 text-gray-900 placeholder-gray-500 text-lg font-medium bg-white/80 backdrop-blur-sm hover:border-purple-300"
              />
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-12 pr-8 py-4 border-2 border-gray-200 rounded-2xl focus:ring-0 focus:border-purple-400 transition-all duration-200 text-gray-900 bg-white/80 backdrop-blur-sm appearance-none cursor-pointer text-lg font-medium hover:border-purple-300 min-w-[200px]"
              >
                <option value="all">All Topics</option>
                <option value="economics">📈 Economics</option>
                <option value="social">👥 Social Studies</option>
                <option value="government">🏛️ Government</option>
                <option value="money">💰 Money & Finance</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || selectedCategory !== 'all') && (
            <div className="flex items-center gap-3 mb-6 p-4 bg-purple-50 rounded-2xl border border-purple-200">
              <span className="text-sm font-medium text-purple-700">Active filters:</span>
              {searchTerm && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  Search: "{searchTerm}"
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  Category: {selectedCategory}
                </span>
              )}
              <button
                onClick={handleClearSearch}
                className="px-3 py-1 bg-purple-200 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-300 transition-colors"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2 text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">Popular:</span>
            </div>
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => handlePopularSearch(term)}
                className="px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 rounded-full text-sm font-medium hover:from-purple-100 hover:to-blue-100 transition-all duration-200 border border-purple-200 hover:border-purple-300 hover:shadow-md hover:-translate-y-0.5"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="flex items-center justify-center space-x-8 mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm text-gray-600">Terms Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">4</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600">100%</div>
              <div className="text-sm text-gray-600">Working Search</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;