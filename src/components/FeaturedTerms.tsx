import React, { useState } from 'react';
import { Heart, BookOpen, Star, Play, ChevronDown, ChevronUp, Clock, Award, Sparkles, TrendingUp } from 'lucide-react';
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

  const toggleFavorite = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
    
    const action = newFavorites.has(id) ? 'added to' : 'removed from';
    // Create a toast-like notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300';
    notification.textContent = `Term ${action} favorites!`;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 2000);
  };

  const handleExpandTerm = (termId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedTerm(expandedTerm === termId ? null : termId);
  };

  const handleQuizStart = (termId: number, termTitle: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (onStartQuiz) {
      onStartQuiz(termId, termTitle);
    } else {
      alert(`Quiz for "${termTitle}" will be available when backend is connected!`);
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'intermediate': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'advanced': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'economics': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'social': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'government': return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'money': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-full text-blue-700 font-medium mb-6">
            <TrendingUp className="w-5 h-5" />
            <span>
              {searchTerm ? `Search Results` : 'Featured Learning Content'}
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
            {searchTerm ? (
              <>
                Results for <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">"{searchTerm}"</span>
              </>
            ) : (
              <>
                Discover <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Big Ideas</span>
              </>
            )}
          </h2>
          
          <div className="flex items-center justify-center space-x-6 text-slate-600 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">{filteredTerms.length} {filteredTerms.length === 1 ? 'term' : 'terms'} found</span>
            </div>
            {filteredTerms.length > 0 && (
              <div className="flex items-center space-x-2 text-purple-600">
                <Award className="w-4 h-4" />
                <span className="font-medium">Click any term to explore!</span>
              </div>
            )}
          </div>
        </div>

        {/* Terms Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredTerms.map((term) => (
            <div
              key={term.id}
              className="group bg-white rounded-3xl border-2 border-slate-100 hover:border-purple-200 transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl hover:shadow-purple-100/50 cursor-pointer overflow-hidden"
              onClick={() => setExpandedTerm(expandedTerm === term.id ? null : term.id)}
            >
              {/* Card Header */}
              <div className="p-8 pb-6">
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
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-purple-600 transition-colors leading-tight">
                      {term.title}
                    </h3>
                  </div>
                  
                  <button
                    onClick={(e) => toggleFavorite(term.id, e)}
                    className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                      favorites.has(term.id)
                        ? 'bg-rose-100 text-rose-500 hover:bg-rose-200 shadow-lg shadow-rose-100'
                        : 'bg-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${favorites.has(term.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Definition */}
                <p className="text-slate-700 mb-6 leading-relaxed text-lg">
                  {term.simpleDefinition}
                </p>

                {/* Example Box */}
                <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 rounded-2xl p-6 mb-6 border border-purple-100/50">
                  <h4 className="font-bold text-purple-700 mb-3 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-amber-500" />
                    Real-World Example:
                  </h4>
                  <p className="text-purple-600 leading-relaxed">
                    {term.example}
                  </p>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span>{getReadingTime(term.detailedExplanation)} min read</span>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < term.rating ? 'text-amber-400 fill-current' : 'text-slate-300'}`} />
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => handleExpandTerm(term.id, e)}
                    className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors group/expand"
                  >
                    <BookOpen className="w-4 h-4 group-hover/expand:scale-110 transition-transform duration-300" />
                    <span>{expandedTerm === term.id ? 'Show Less' : 'Learn More'}</span>
                    {expandedTerm === term.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Quiz Button */}
              <div className="px-8 pb-6">
                <button
                  onClick={(e) => handleQuizStart(term.id, term.title, e)}
                  className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-2xl hover:from-teal-600 hover:to-blue-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 group/quiz"
                >
                  <Play className="w-5 h-5 group-hover/quiz:scale-110 transition-transform duration-300" />
                  <span>Take Interactive Quiz</span>
                </button>
              </div>

              {/* Expanded Content */}
              {expandedTerm === term.id && (
                <div className="px-8 pb-8 border-t border-slate-100 pt-6 space-y-6 animate-in slide-in-from-top duration-500">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-4 text-lg flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                      Detailed Explanation
                    </h4>
                    <p className="text-slate-700 leading-relaxed">
                      {term.detailedExplanation}
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200/50">
                    <h5 className="font-bold text-amber-700 mb-3 flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Why This Matters
                    </h5>
                    <p className="text-amber-600 leading-relaxed">
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
            <h3 className="text-3xl font-bold text-slate-600 mb-6">No terms found</h3>
            <p className="text-slate-500 text-xl mb-8 max-w-md mx-auto leading-relaxed">
              Try adjusting your search or selecting a different category to discover new learning opportunities.
            </p>
            <button 
              onClick={() => {
                window.location.reload();
              }}
              className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center space-x-2">
                <span>Show All Terms</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedTerms;