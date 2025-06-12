import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchSection from './components/SearchSection';
import Categories from './components/Categories';
import FeaturedTerms from './components/FeaturedTerms';
import ProgressSection from './components/ProgressSection';
import LearningPath from './components/LearningPath';
import InteractiveQuiz from './components/InteractiveQuiz';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentView, setCurrentView] = useState<'home' | 'learning-paths'>('home');
  const [showQuiz, setShowQuiz] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [quizTerm, setQuizTerm] = useState<{ id: number; title: string } | null>(null);

  const handleStartQuiz = (termId: number, termTitle: string) => {
    setQuizTerm({ id: termId, title: termTitle });
    setShowQuiz(true);
  };

  const handleQuizComplete = (score: number) => {
    console.log('Quiz completed with score:', score);
    // Here you would typically update user progress, add XP, etc.
  };

  const handleStartLearningStep = (stepId: number) => {
    console.log('Starting learning step:', stepId);
    // Here you would navigate to the specific learning content
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      <Header 
        onShowProfile={() => setShowProfile(true)}
        onNavigate={setCurrentView}
        currentView={currentView}
      />
      
      {currentView === 'home' ? (
        <>
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
            onStartQuiz={handleStartQuiz}
          />
          <ProgressSection />
        </>
      ) : (
        <div className="py-8">
          <LearningPath onStartStep={handleStartLearningStep} />
        </div>
      )}
      
      <Footer />

      {/* Modals */}
      {showQuiz && quizTerm && (
        <InteractiveQuiz
          termId={quizTerm.id}
          termTitle={quizTerm.title}
          onClose={() => setShowQuiz(false)}
          onComplete={handleQuizComplete}
        />
      )}

      <UserProfile
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </div>
  );
}

export default App;