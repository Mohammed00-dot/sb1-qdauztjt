import React from 'react';
import { TrendingUp, Users, Building, DollarSign, ArrowRight, CheckCircle } from 'lucide-react';

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
      description: 'How money and trade work',
      termCount: 3,
      gradient: 'from-purple-400 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      hoverBorder: 'hover:border-purple-300',
      hoverShadow: 'hover:shadow-purple-100'
    },
    {
      id: 'social',
      name: 'Social Studies',
      icon: Users,
      color: 'blue',
      description: 'How people live together',
      termCount: 3,
      gradient: 'from-blue-400 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      hoverBorder: 'hover:border-blue-300',
      hoverShadow: 'hover:shadow-blue-100'
    },
    {
      id: 'government',
      name: 'Government',
      icon: Building,
      color: 'teal',
      description: 'How countries are run',
      termCount: 3,
      gradient: 'from-teal-400 to-teal-600',
      bgGradient: 'from-teal-50 to-teal-100',
      borderColor: 'border-teal-200',
      textColor: 'text-teal-700',
      hoverBorder: 'hover:border-teal-300',
      hoverShadow: 'hover:shadow-teal-100'
    },
    {
      id: 'money',
      name: 'Money & Finance',
      icon: DollarSign,
      color: 'orange',
      description: 'Understanding money basics',
      termCount: 3,
      gradient: 'from-orange-400 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      hoverBorder: 'hover:border-orange-300',
      hoverShadow: 'hover:shadow-orange-100'
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    
    // Scroll to results
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
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Explore by Category</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Choose a topic to start your learning adventure! Each category is packed with engaging content designed just for you.</p>
          
          {/* Show All Button */}
          <div className="mt-8">
            <button
              onClick={handleShowAll}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {selectedCategory === 'all' && <CheckCircle className="w-5 h-5 inline mr-2" />}
              Show All Categories
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`group relative p-8 rounded-3xl cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${
                  isSelected 
                    ? `bg-gradient-to-br ${category.gradient} text-white shadow-2xl scale-105` 
                    : `bg-gradient-to-br ${category.bgGradient} border-2 ${category.borderColor} ${category.hoverBorder} hover:shadow-xl ${category.hoverShadow}`
                }`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative text-center">
                  {/* Icon Container */}
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                    isSelected 
                      ? 'bg-white/20 shadow-lg' 
                      : `bg-gradient-to-br ${category.gradient} shadow-lg`
                  }`}>
                    <IconComponent className={`w-10 h-10 ${
                      isSelected 
                        ? 'text-white' 
                        : 'text-white'
                    }`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className={`text-2xl font-bold mb-3 ${
                    isSelected ? 'text-white' : category.textColor
                  }`}>
                    {category.name}
                  </h3>
                  
                  <p className={`text-base mb-4 leading-relaxed ${
                    isSelected 
                      ? 'text-white/90' 
                      : 'text-gray-600'
                  }`}>
                    {category.description}
                  </p>

                  {/* Term Count */}
                  <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
                    isSelected 
                      ? 'bg-white/20 text-white' 
                      : `bg-white ${category.textColor} shadow-sm`
                  }`}>
                    <span>{category.termCount} terms</span>
                  </div>

                  {/* Action Indicator */}
                  <div className={`flex items-center justify-center space-x-2 font-semibold transition-all duration-300 ${
                    isSelected 
                      ? 'text-white' 
                      : `${category.textColor} group-hover:translate-x-1`
                  }`}>
                    <span>{isSelected ? 'Selected' : 'Explore'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Category Stats */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
              <div className="text-gray-600 font-medium">Total Terms</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
              <div className="text-gray-600 font-medium">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Working Features</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">3</div>
              <div className="text-gray-600 font-medium">Difficulty Levels</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;