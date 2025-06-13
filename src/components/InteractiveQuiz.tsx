import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface InteractiveQuizProps {
  termId: number;
  termTitle: string;
  onClose: () => void;
  onComplete: (score: number) => void;
}

const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ 
  termId, 
  termTitle, 
  onClose, 
  onComplete 
}) => {
  // Sample quiz questions - in a real app, these would come from props or API
  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: `What is the main idea behind ${termTitle}?`,
      options: [
        "It's only about money",
        "It affects how people live and work together",
        "It's too complicated for kids",
        "It only matters to adults"
      ],
      correctAnswer: 1,
      explanation: "Great! This concept affects how people interact and make decisions in their daily lives."
    },
    {
      id: 2,
      question: "Which example best shows this concept in real life?",
      options: [
        "Playing video games alone",
        "Choosing what to have for breakfast",
        "Making decisions that affect your community",
        "Watching TV"
      ],
      correctAnswer: 2,
      explanation: "Exactly! This concept is most visible when we see its effects on communities and groups of people."
    },
    {
      id: 3,
      question: "Why is it important to understand this concept?",
      options: [
        "It's not really important",
        "It helps us make better decisions",
        "Only teachers need to know it",
        "It's just for tests"
      ],
      correctAnswer: 1,
      explanation: "Perfect! Understanding these concepts helps us become better citizens and decision-makers."
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers([...answers, selectedAnswer]);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
      onComplete(score);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
      setShowExplanation(false);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
    setAnswers([]);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 80) return "Excellent work! You really understand this concept!";
    if (percentage >= 60) return "Good job! You're getting the hang of it!";
    return "Keep practicing! You'll get it with more study!";
  };

  if (quizComplete) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
            <p className="text-gray-600 mb-6">You finished the quiz on {termTitle}</p>
            
            <div className="bg-gradient-to-r from-purple-50 to-teal-50 rounded-xl p-6 mb-6">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(percentage)}`}>
                {score}/{quizQuestions.length}
              </div>
              <div className={`text-lg font-semibold mb-2 ${getScoreColor(percentage)}`}>
                {percentage}%
              </div>
              <p className="text-gray-600 text-sm">
                {getScoreMessage(percentage)}
              </p>
            </div>
            
            {/* Development Notice */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-2 text-orange-700">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Development Mode</span>
              </div>
              <p className="text-sm text-orange-600 mt-1">
                Quiz results will be saved to your profile when backend is connected!
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleRetakeQuiz}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-xl hover:from-purple-600 hover:to-teal-600 transition-all"
              >
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quizQuestions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correctAnswer;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Quiz: {termTitle}</h2>
            <p className="text-gray-600">Question {currentQuestion + 1} of {quizQuestions.length}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Development Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-2 text-blue-700">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Demo Quiz</span>
          </div>
          <p className="text-sm text-blue-600 mt-1">
            This is a working demo! Real quizzes will be loaded from the database.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div 
            className="bg-gradient-to-r from-purple-500 to-teal-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {currentQ.question}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left border-2 rounded-xl transition-all duration-200 ";
              
              if (showExplanation) {
                if (index === currentQ.correctAnswer) {
                  buttonClass += "border-green-500 bg-green-50 text-green-700";
                } else if (index === selectedAnswer && selectedAnswer !== currentQ.correctAnswer) {
                  buttonClass += "border-red-500 bg-red-50 text-red-700";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
                }
              } else {
                if (selectedAnswer === index) {
                  buttonClass += "border-purple-500 bg-purple-50 text-purple-700";
                } else {
                  buttonClass += "border-gray-200 hover:border-purple-300 hover:bg-purple-50 cursor-pointer";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={showExplanation}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showExplanation && (
                      <div>
                        {index === currentQ.correctAnswer && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        {index === selectedAnswer && selectedAnswer !== currentQ.correctAnswer && (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`p-4 rounded-xl mb-6 ${
            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-start space-x-3">
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
              )}
              <div>
                <p className={`font-medium mb-1 ${
                  isCorrect ? 'text-green-700' : 'text-red-700'
                }`}>
                  {isCorrect ? 'Correct!' : 'Not quite right.'}
                </p>
                <p className={`text-sm ${
                  isCorrect ? 'text-green-600' : 'text-red-600'
                }`}>
                  {currentQ.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex space-x-3">
            {!showExplanation ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-xl hover:from-purple-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-xl hover:from-purple-600 hover:to-teal-600 transition-all"
              >
                <span>{currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveQuiz;