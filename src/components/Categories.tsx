import React from 'react';
import { TrendingUp, Users, Building, DollarSign } from 'lucide-react';

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
      description: 'How money and trade work'
    },
    {
      id: 'social',
      name: 'Social Studies',
      icon: Users,
      color: 'blue',
      description: 'How people live together'
    },
    {
      id: 'government',
      name: 'Government',
      icon: Building,
      color: 'teal',
      description: 'How countries are run'
    },
    {
      id: 'money',
      name: 'Money & Finance',
      icon: DollarSign,
      color: 'orange',
      description: 'Understanding money basics'
    }
  ];

  const getColorClasses = (color: string, isSelected: boolean) => {
    const baseClasses = 'transition-all duration-300 hover:-translate-y-1 cursor-pointer';
    if (isSelected) {
      switch (color) {
        case 'purple': return `${baseClasses} bg-purple-500 text-white shadow-lg shadow-purple-200`;
        case 'blue': return `${baseClasses} bg-blue-500 text-white shadow-lg shadow-blue-200`;
        case 'teal': return `${baseClasses} bg-teal-500 text-white shadow-lg shadow-teal-200`;
        case 'orange': return `${baseClasses} bg-orange-500 text-white shadow-lg shadow-orange-200`;
      }
    }
    switch (color) {
      case 'purple': return `${baseClasses} bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100`;
      case 'blue': return `${baseClasses} bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100`;
      case 'teal': return `${baseClasses} bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100`;
      case 'orange': return `${baseClasses} bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100`;
      default: return baseClasses;
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore by Category</h2>
          <p className="text-lg text-gray-600">Choose a topic to start your learning adventure!</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-2xl ${getColorClasses(category.color, isSelected)}`}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                    isSelected 
                      ? 'bg-white/20' 
                      : `bg-${category.color}-100`
                  }`}>
                    <IconComponent className={`w-8 h-8 ${
                      isSelected 
                        ? 'text-white' 
                        : `text-${category.color}-600`
                    }`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className={`text-sm ${
                    isSelected 
                      ? 'text-white/80' 
                      : 'text-gray-600'
                  }`}>
                    {category.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;