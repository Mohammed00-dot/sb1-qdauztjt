import React, { useState } from 'react';
import { Heart, BookOpen, ExternalLink, Star } from 'lucide-react';
import { terms } from '../data/terms';

interface FeaturedTermsProps {
  searchTerm: string;
  selectedCategory: string;
}

const FeaturedTerms: React.FC<FeaturedTermsProps> = ({ searchTerm, selectedCategory }) => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [expandedTerm, setExpandedTerm] = useState<number | null>(null);

  const filteredTerms = terms.filter(term => {
    const matchesSearch = searchTerm === '' || 
      term.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.simpleDefinition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'economics': return 'bg-purple-100 text-purple-700';
      case 'social': return 'bg-blue-100 text-blue-700';
      case 'government': return 'bg-teal-100 text-teal-700';
      case 'money': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {searchTerm ? `Search Results for "${searchTerm}"` : 'Featured Terms'}
          </h2>
          <p className="text-lg text-gray-600">
            {filteredTerms.length} {filteredTerms.length === 1 ? 'term' : 'terms'} found
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms.map((term) => (
            <div
              key={term.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(term.category)}`}>
                      {term.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(term.difficulty)}`}>
                      {term.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {term.title}
                  </h3>
                </div>
                
                <button
                  onClick={() => toggleFavorite(term.id)}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    favorites.has(term.id)
                      ? 'bg-red-100 text-red-500 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorites.has(term.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {term.simpleDefinition}
              </p>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-4">
                <h4 className="font-semibold text-purple-700 mb-2 flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  Example:
                </h4>
                <p className="text-purple-600 text-sm">
                  {term.example}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setExpandedTerm(expandedTerm === term.id ? null : term.id)}
                  className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{expandedTerm === term.id ? 'Show Less' : 'Learn More'}</span>
                </button>
                
                <div className="flex items-center text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < term.rating ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>

              {expandedTerm === term.id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-2">Detailed Explanation:</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {term.detailedExplanation}
                  </p>
                  <div className="bg-orange-50 rounded-lg p-3">
                    <h5 className="font-medium text-orange-700 mb-1">Why It Matters:</h5>
                    <p className="text-orange-600 text-sm">
                      {term.whyItMatters}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No terms found</h3>
            <p className="text-gray-500">Try adjusting your search or selecting a different category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedTerms;