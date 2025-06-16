import React from 'react';
import { TrendingUp, Users, Building, DollarSign, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

interface CategoriesProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    {
      id: 'economics',
      name: 'Economics',
      icon: TrendingUp,
      color: 'purple',
      description: 'How money and trade shape our world',
      termCount: 3,
      gradient: 'from-purple-500 to-purple-700',
      bgGradient: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      hoverBorder: 'hover:border-purple-300',
      hoverShadow: 'hover:shadow-purple-200/50'
    },
    {
      id: 'social',
      name: 'Social Studies',
      icon: Users,
      color: 'blue',
      description: 'Understanding communities and cultures',
      termCount: 3,
      gradient: 'from-blue-500 to-blue-700',
      bgGradient: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      hoverBorder: 'hover:border-blue-300',
      hoverShadow: 'hover:shadow-blue-200/50'
    },
    {
      id: 'government',
      name: 'Government',
      icon: Building,
      color: 'teal',
      description: 'How societies organize and govern',
      termCount: 3,
      gradient: 'from-teal-500 to-teal-700',
      bgGradient: 'from-teal-50 to-teal-100',
      borderColor: 'border-teal-200',
      textColor: 'text-teal-700',
      hoverBorder: 'hover:border-teal-300',
      hoverShadow: 'hover:shadow-teal-200/50'
    },
    {
      id: 'money',
      name: 'Money & Finance',
      icon: DollarSign,
      color: 'orange',
      description: 'Smart financial decisions for life',
      termCount: 3,
      gradient: 'from-orange-500 to-orange-700',
      bgGradient: 'from-orange-50 to-orange-100',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      hoverBorder: 'hover:border-orange-300',
      hoverShadow: 'hover:shadow-orange-200/50'
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    
    setTimeout(() => {
      const element = document.querySelector('[data-search-results]');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleShowAll = () => {
    setSelectedCategory('all');
    setTimeout(() => {
      const element = document.querySelector('[data-search-results]');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50" data-categories>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 px-6 py-3 rounded-full text-purple-700 font-medium mb-6">
            <Sparkles className="w-5 h-5" />
            <span>Choose Your Learning Adventure</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
            Explore by <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Category</span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Dive deep into the subjects that fascinate you. Each category is carefully crafted with engaging content designed to spark curiosity and build understanding.
          </p>
          
          {/* Show All Button */}
          <div className="mt-10">
            <button
              onClick={handleShowAll}
              className={`group px-8 py-4 rounded-2xl font-semibold transition-all duration-500 hover:scale-105 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-xl shadow-slate-300/50'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="flex items-center space-x-3">
                {selectedCategory === 'all' && <CheckCircle className="w-5 h-5" />}
                <span>Show All Categories</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`group relative cursor-pointer transition-all duration-700 hover:-translate-y-6 ${
                  isSelected ? 'scale-105' : 'hover:scale-105'
                }`}
              >
                {/* Card */}
                <div className={`relative p-8 rounded-3xl transition-all duration-700 overflow-hidden ${
                  isSelected 
                    ? `bg-gradient-to-br ${category.gradient} text-white shadow-2xl shadow-${category.color}-300/50` 
                    : `bg-white border-2 ${category.borderColor} ${category.hoverBorder} hover:shadow-2xl ${category.hoverShadow}`
                }`}>
                  
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                  </div>
                  
                  <div className="relative">
                    {/* Icon Container */}
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                      isSelected 
                        ? 'bg-white/20 shadow-xl' 
                        : `bg-gradient-to-br ${category.gradient} shadow-lg`
                    }`}>
                      <IconComponent className={`w-10 h-10 ${
                        isSelected 
                          ? 'text-white' 
                          : 'text-white'
                      }`} />
                    </div>
                    
                    {/* Content */}
                    <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                      isSelected ? 'text-white' : category.textColor
                    }`}>
                      {category.name}
                    </h3>
                    
                    <p className={`text-base mb-6 leading-relaxed ${
                      isSelected 
                        ? 'text-white/90' 
                        : 'text-slate-600'
                    }`}>
                      {category.description}
                    </p>

                    {/* Term Count Badge */}
                    <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 ${
                      isSelected 
                        ? 'bg-white/20 text-white' 
                        : `bg-${category.color}-50 ${category.textColor} border border-${category.color}-200`
                    }`}>
                      <span>{category.termCount} terms available</span>
                    </div>

                    {/* Action Indicator */}
                    <div className={`flex items-center justify-center space-x-2 font-semibold transition-all duration-300 ${
                      isSelected 
                        ? 'text-white' 
                        : `${category.textColor} group-hover:translate-x-1`
                    }`}>
                      <span>{isSelected ? 'Selected' : 'Explore Now'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Stats Section */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-blue-900 rounded-3xl p-12 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
          
          <div className="relative">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Learning by the Numbers</h3>
              <p className="text-white/80 text-lg">Real progress, real engagement, real results</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "12", label: "Expert-Crafted Terms", icon: "📚" },
                { number: "4", label: "Core Subject Areas", icon: "🎯" },
                { number: "100%", label: "Interactive Content", icon: "⚡" },
                { number: "∞", label: "Learning Potential", icon: "🚀" }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-white/80 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;