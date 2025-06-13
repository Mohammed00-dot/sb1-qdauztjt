import React from 'react';
import { Sparkles, BookOpen, Target, ArrowRight, Play, AlertCircle } from 'lucide-react';

interface HeroProps {
  onShowAuth: (mode: 'login' | 'register') => void;
}

const Hero: React.FC<HeroProps> = ({ onShowAuth }) => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
      
      <div className="relative max-w-7xl mx-auto text-center">
        <div className="mb-8">
          {/* Development Notice */}
          <div className="inline-flex items-center space-x-2 bg-orange-100 border border-orange-300 text-orange-800 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg">
            <AlertCircle className="w-5 h-5" />
            <span>🚧 Development Preview - Features are being built!</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-purple-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span>🎉 Learning Made Fun & Easy!</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Discover Big Ideas in
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent animate-gradient">
              Simple Words
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
            Welcome to BizzyBrain! We help kids and curious minds understand complex social and economic concepts 
            through <span className="text-purple-600 font-semibold">fun explanations</span>, 
            <span className="text-blue-600 font-semibold"> real-world examples</span>, and 
            <span className="text-teal-600 font-semibold"> interactive learning</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button 
              onClick={() => alert('Browse feature is working! Scroll down to explore terms.')}
              className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 text-white rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-300 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Start Exploring</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => alert('Categories are working! Scroll down to see all 4 categories.')}
              className="flex items-center space-x-3 px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-2xl font-semibold text-lg border-2 border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <BookOpen className="w-6 h-6" />
              <span>Browse Topics</span>
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-purple-100 hover:shadow-2xl hover:shadow-purple-100 transition-all duration-500 hover:-translate-y-2 hover:border-purple-200">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">Easy Learning</h3>
            <p className="text-gray-600 leading-relaxed">Complex topics explained in simple, kid-friendly language with fun examples that make learning enjoyable.</p>
            <div className="mt-4 text-sm text-purple-600 font-medium">✅ Working: Browse terms below!</div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-100 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 hover:-translate-y-2 hover:border-blue-200">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">Real Examples</h3>
            <p className="text-gray-600 leading-relaxed">Learn through everyday situations and relatable analogies that connect abstract concepts to real life.</p>
            <div className="mt-4 text-sm text-blue-600 font-medium">✅ Working: See examples in terms!</div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-teal-100 hover:shadow-2xl hover:shadow-teal-100 transition-all duration-500 hover:-translate-y-2 hover:border-teal-200">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">Track Progress</h3>
            <p className="text-gray-600 leading-relaxed">Earn badges, unlock achievements, and track your learning journey as you master new concepts.</p>
            <div className="mt-4 text-sm text-orange-600 font-medium">🚧 Coming Soon: Full tracking system!</div>
          </div>
        </div>

        {/* Development Status */}
        <div className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 border border-gray-200 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🛠️ Development Status</h3>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h4 className="font-semibold text-green-700 mb-2">✅ Currently Working:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Beautiful UI design and animations</li>
                <li>• Term browsing and search</li>
                <li>• Category filtering</li>
                <li>• Responsive mobile design</li>
                <li>• Quiz interface (visual only)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-700 mb-2">🚧 In Development:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• User authentication system</li>
                <li>• Database integration</li>
                <li>• Functional quiz system</li>
                <li>• Progress tracking</li>
                <li>• Achievement system</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;