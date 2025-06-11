import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchSection from './components/SearchSection';
import Categories from './components/Categories';
import FeaturedTerms from './components/FeaturedTerms';
import ProgressSection from './components/ProgressSection';
import Footer from './components/Footer';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      <Header />
      <Hero />
      <SearchSection 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Categories 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <FeaturedTerms 
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
      />
      <ProgressSection />
      <Footer />
    </div>
  );
}

export default App;