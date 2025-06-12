import React, { useState } from 'react';
import { Heart, BookOpen, Star, Play, ChevronDown, ChevronUp, Clock, Award } from 'lucide-react';
import { terms } from '../data/terms';

interface FeaturedTermsProps {
  searchTerm: string;
  selectedCategory: string;
  onStartQuiz?: (termId: number, termTitle: string) => void;
}

const FeaturedTerms: React.FC<FeaturedTermsProps> = ({ 
  searchTerm, 
  selectedCategory, 
  onStartQuiz 
}) => {
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
      case 'beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'economics': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'social': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'government': return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'money': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {searchTerm ? `Search Results for "${searchTerm}"` : 'Featured Learning Terms'}
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            {filteredTerms.length} {filteredTerms.length === 1 ? 'term' : 'terms'} found
          </p>
          {filteredTerms.length > 0 && (
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full text-purple-700 font-medium">
              <Award className="w-4 h-4" />
              <span>Ready to boost your knowledge?</span>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredTerms.map((term) => (
            <div
              key={term.id}
              className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-100 hover:shadow-2xl hover:shadow-purple-100 transition-all duration-500 hover:-translate-y-2 hover:border-purple-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(term.category)}`}>
                      {term.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(term.difficulty)}`}>
                      {term.difficulty}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors leading-tight">
                    {term.title}
                  </h3>
                </div>
                
                <button
                  onClick={() => toggleFavorite(term.id)}
                  className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                    favorites.has(term.id)
                      ? 'bg-red-100 text-red-500 hover:bg-red-200 shadow-lg shadow-red-100'
                      : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${favorites.has(term.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Definition */}
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                {term.simpleDefinition}
              </p>

              {/* Example Box */}
              <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-teal-50 rounded-2xl p-6 mb-6 border border-purple-100">
                <h4 className="font-bold text-purple-700 mb-3 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Real-World Example:
                </h4>
                <p className="text-purple-600 leading-relaxed">
                  {term.example}
                </p>
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{getReadingTime(term.detailedExplanation)} min read</span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < term.rating ? 'fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => setExpandedTerm(expandedTerm === term.id ? null : term.id)}
                  className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{expandedTerm === term.id ? 'Show Less' : 'Learn More'}</span>
                  {expandedTerm === term.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Quiz Button */}
              {onStartQuiz && (
                <button
                  onClick={() => onStartQuiz(term.id, term.title)}
                  className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-2xl hover:from-teal-600 hover:to-blue-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 mb-6"
                >
                  <Play className="w-5 h-5" />
                  <span>Take Quiz</span>
                </button>
              )}

              {/* Expanded Content */}
              {expandedTerm === term.id && (
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-6 animate-in slide-in-from-top duration-300">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Detailed Explanation:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {term.detailedExplanation}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-200">
                    <h5 className="font-bold text-orange-700 mb-3 flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Why It Matters:
                    </h5>
                    <p className="text-orange-600 leading-relaxed">
                      {term.whyItMatters}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTerms.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <BookOpen className="w-16 h-16 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">No terms found</h3>
            <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
              Try adjusting your search or selecting a different category to discover new learning opportunities.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Show All Terms
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedTerms;