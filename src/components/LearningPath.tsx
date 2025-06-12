import React, { useState } from 'react';
import { CheckCircle, Lock, Play, Star, Trophy, ArrowRight } from 'lucide-react';

interface PathStep {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'locked';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  termIds: number[];
}

interface LearningPathData {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  totalSteps: number;
  completedSteps: number;
  steps: PathStep[];
}

interface LearningPathProps {
  onStartStep: (stepId: number) => void;
}

const LearningPath: React.FC<LearningPathProps> = ({ onStartStep }) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const learningPaths: LearningPathData[] = [
    {
      id: 'money-basics',
      title: 'Money Basics',
      description: 'Learn the fundamentals of money, saving, and spending wisely',
      icon: '💰',
      color: 'green',
      totalSteps: 4,
      completedSteps: 2,
      steps: [
        {
          id: 1,
          title: 'What is Money?',
          description: 'Understanding what money is and why we use it',
          status: 'completed',
          difficulty: 'beginner',
          estimatedTime: '5 min',
          termIds: [6]
        },
        {
          id: 2,
          title: 'Making a Budget',
          description: 'Learn how to plan your spending and saving',
          status: 'completed',
          difficulty: 'beginner',
          estimatedTime: '8 min',
          termIds: [6]
        },
        {
          id: 3,
          title: 'Saving Money',
          description: 'Why saving is important and how to do it',
          status: 'current',
          difficulty: 'beginner',
          estimatedTime: '6 min',
          termIds: [10]
        },
        {
          id: 4,
          title: 'Understanding Interest',
          description: 'How your money can grow when you save it',
          status: 'locked',
          difficulty: 'intermediate',
          estimatedTime: '10 min',
          termIds: [10]
        }
      ]
    },
    {
      id: 'government-basics',
      title: 'How Government Works',
      description: 'Discover how countries are organized and run',
      icon: '🏛️',
      color: 'blue',
      totalSteps: 5,
      completedSteps: 1,
      steps: [
        {
          id: 5,
          title: 'What is Democracy?',
          description: 'Understanding how people choose their leaders',
          status: 'completed',
          difficulty: 'beginner',
          estimatedTime: '7 min',
          termIds: [2]
        },
        {
          id: 6,
          title: 'The Constitution',
          description: 'The rules that guide how government works',
          status: 'current',
          difficulty: 'intermediate',
          estimatedTime: '12 min',
          termIds: [7]
        },
        {
          id: 7,
          title: 'Voting and Elections',
          description: 'How people choose their representatives',
          status: 'locked',
          difficulty: 'beginner',
          estimatedTime: '8 min',
          termIds: [2, 9]
        },
        {
          id: 8,
          title: 'Laws and Rules',
          description: 'Why we have laws and how they are made',
          status: 'locked',
          difficulty: 'intermediate',
          estimatedTime: '10 min',
          termIds: [7, 11]
        },
        {
          id: 9,
          title: 'Citizenship',
          description: 'What it means to be a citizen',
          status: 'locked',
          difficulty: 'beginner',
          estimatedTime: '6 min',
          termIds: [9]
        }
      ]
    },
    {
      id: 'economics-intro',
      title: 'Economics for Kids',
      description: 'Explore how the economy works in simple terms',
      icon: '📈',
      color: 'purple',
      totalSteps: 4,
      completedSteps: 0,
      steps: [
        {
          id: 10,
          title: 'What is an Economy?',
          description: 'Understanding how people trade and work together',
          status: 'current',
          difficulty: 'beginner',
          estimatedTime: '8 min',
          termIds: [1]
        },
        {
          id: 11,
          title: 'Supply and Demand',
          description: 'Why prices go up and down',
          status: 'locked',
          difficulty: 'intermediate',
          estimatedTime: '12 min',
          termIds: [4]
        },
        {
          id: 12,
          title: 'Starting a Business',
          description: 'How people create new businesses',
          status: 'locked',
          difficulty: 'intermediate',
          estimatedTime: '15 min',
          termIds: [8]
        },
        {
          id: 13,
          title: 'Global Economy',
          description: 'How countries trade with each other',
          status: 'locked',
          difficulty: 'advanced',
          estimatedTime: '18 min',
          termIds: [12]
        }
      ]
    }
  ];

  const getStatusIcon = (status: PathStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'current':
        return <Play className="w-5 h-5 text-blue-600" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: PathStep['status']) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'current':
        return 'border-blue-200 bg-blue-50';
      case 'locked':
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getDifficultyColor = (difficulty: PathStep['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
    }
  };

  const getPathColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'from-green-500 to-emerald-500';
      case 'blue':
        return 'from-blue-500 to-cyan-500';
      case 'purple':
        return 'from-purple-500 to-violet-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  if (selectedPath) {
    const path = learningPaths.find(p => p.id === selectedPath);
    if (!path) return null;

    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => setSelectedPath(null)}
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 mb-4"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back to Learning Paths</span>
          </button>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${getPathColor(path.color)} rounded-2xl flex items-center justify-center text-2xl`}>
                {path.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{path.title}</h1>
                <p className="text-gray-600">{path.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span>{path.completedSteps} of {path.totalSteps} completed</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r ${getPathColor(path.color)} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${(path.completedSteps / path.totalSteps) * 100}%` }}
                ></div>
              </div>
              <span>{Math.round((path.completedSteps / path.totalSteps) * 100)}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {path.steps.map((step, index) => (
            <div key={step.id} className="relative">
              {index < path.steps.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-8 bg-gray-200"></div>
              )}
              
              <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 ${getStatusColor(step.status)} transition-all duration-200 hover:shadow-lg`}>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(step.status)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(step.difficulty)}`}>
                          {step.difficulty}
                        </span>
                        <span className="text-sm text-gray-500">{step.estimatedTime}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {step.status === 'completed' && (
                          <div className="flex items-center space-x-1 text-green-600">
                            <Trophy className="w-4 h-4" />
                            <span className="text-sm font-medium">Completed</span>
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => onStartStep(step.id)}
                        disabled={step.status === 'locked'}
                        className={`px-4 py-2 rounded-xl font-medium transition-all ${
                          step.status === 'locked'
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : step.status === 'completed'
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        {step.status === 'locked' ? 'Locked' : 
                         step.status === 'completed' ? 'Review' : 'Start'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Learning Paths</h2>
          <p className="text-lg text-gray-600">Follow guided paths to master important concepts step by step</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningPaths.map((path) => (
            <div
              key={path.id}
              onClick={() => setSelectedPath(path.id)}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${getPathColor(path.color)} rounded-xl flex items-center justify-center text-xl`}>
                  {path.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {path.title}
                  </h3>
                  <p className="text-sm text-gray-500">{path.totalSteps} steps</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{path.description}</p>
              
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{path.completedSteps}/{path.totalSteps}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${getPathColor(path.color)} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${(path.completedSteps / path.totalSteps) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium text-purple-600 group-hover:text-purple-700">
                  Start Learning →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPath;