// app/components/QuizDisplay.tsx
'use client';

import React, { useState } from 'react';
// 1. Swapped path alias out for a direct relative path to resolve Module Not Found
import { Quiz } from '../types';

interface QuizDisplayProps {
  quiz: Quiz;
  // Optional string to display if fallback name handling is preferred
  topicName?: string; 
  onComplete: (score: number, total: number) => void;
}

export default function QuizDisplay({ quiz, topicName, onComplete }: QuizDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  if (!quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-12">
        No quiz questions available
      </div>
    );
  }

  const current = quiz.questions[currentIndex];

  const handleSelectAnswer = (option: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: option,
    });
  };

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
    onComplete(correctCount, quiz.questions.length);
  };

  const percentage = Math.round((score / quiz.questions.length) * 100);

  if (showResults) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center py-12 space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <span className="text-6xl animate-bounce inline-block">🧁</span>
        <h3 className="text-3xl font-extrabold text-neutral-850 dark:text-neutral-50 font-display">
          ✨ Quiz Completed! 💖
        </h3>
        
        <div className="inline-block px-10 py-6 bg-gradient-to-r from-girly-pink-50 to-girly-lavender-50 dark:from-girly-pink-950/20 dark:to-neutral-900 border border-girly-pink-200 dark:border-neutral-800 rounded-3xl shadow-md">
          <div className="text-7xl font-black bg-gradient-to-r from-girly-pink-500 to-girly-pink-650 bg-clip-text text-transparent drop-shadow-sm font-display">
            {percentage}%
          </div>
          <p className="text-sm font-bold text-girly-pink-650 dark:text-girly-pink-400 mt-2 uppercase tracking-widest font-display">
            🍭 Amazing Job! 🍭
          </p>
        </div>
        
        <p className="text-lg md:text-xl font-bold text-neutral-600 dark:text-neutral-350 max-w-md mx-auto leading-relaxed">
          You got <span className="text-girly-pink-500 font-extrabold">{score}</span> out of <span className="font-extrabold">{quiz.questions.length}</span> questions correct!
        </p>

        <div className="pt-4">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setSelectedAnswers({});
              setShowResults(false);
              setScore(0);
            }}
            className="px-8 py-3.5 bg-gradient-to-r from-girly-pink-500 to-girly-pink-650 hover:shadow-[0_4px_20px_rgba(236,72,153,0.3)] text-white font-bold rounded-2xl transition-all duration-300 transform active:scale-95 hover:scale-[1.02] cursor-pointer font-display text-sm"
          >
            Retake Quiz 🍰
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-2">
      {/* Defensive title tracking */}
      <h3 className="text-2xl font-black text-center mb-5 text-neutral-800 dark:text-neutral-100 font-display flex items-center justify-center gap-1.5 bg-gradient-to-r from-girly-pink-600 to-girly-lavender-550 bg-clip-text text-transparent">
        <span>📝</span> {topicName ? `${topicName} Quiz` : 'Active Recall Quiz'}
      </h3>

      <div className="mb-5 text-center text-xs font-bold text-girly-pink-650 dark:text-girly-pink-400 uppercase tracking-widest bg-girly-pink-100/70 dark:bg-girly-pink-950/30 px-3.5 py-1.5 rounded-full inline-block mx-auto relative left-1/2 -translate-x-1/2 font-display">
        🧁 Question {currentIndex + 1} of {quiz.questions.length} 🧁
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-girly-pink-100 dark:border-neutral-800 rounded-3xl shadow-[0_8px_30px_rgba(251,113,135,0.06)] p-6 sm:p-8 mb-6">
        <p className="text-lg md:text-xl font-bold text-neutral-800 dark:text-neutral-50 mb-6 leading-relaxed font-sans border-b border-girly-pink-50 dark:border-neutral-800/80 pb-4">
          {current.question}
        </p>

        <div className="space-y-3">
          {current.options.map((option, idx) => {
            const isChecked = selectedAnswers[currentIndex] === option;
            return (
              <label
                key={idx}
                className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                  isChecked
                    ? 'border-girly-pink-400 bg-girly-pink-50/50 dark:bg-girly-pink-950/20 shadow-sm transform scale-[1.01]'
                    : 'border-neutral-150 dark:border-neutral-800 hover:border-girly-pink-200/50 dark:hover:border-neutral-700 hover:bg-girly-pink-50/20 dark:hover:bg-neutral-900/40'
                }`}
              >
                <input
                  type="radio"
                  name={`answer-${currentIndex}`}
                  value={option}
                  checked={isChecked}
                  onChange={() => handleSelectAnswer(option)}
                  className="w-4 h-4 text-girly-pink-500 focus:ring-girly-pink-400 border-neutral-300 dark:border-neutral-700 cursor-pointer"
                />
                <span className="ml-3.5 text-neutral-800 dark:text-neutral-100 font-bold font-sans text-sm flex-1 flex items-center justify-between">
                  <span>{option}</span>
                  {isChecked && <span className="text-girly-pink-500 animate-pulse text-sm">✨</span>}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between gap-4 mb-6">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-5 py-2.5 border border-girly-pink-200 dark:border-neutral-800 hover:bg-girly-pink-100/30 dark:hover:bg-neutral-900/60 text-neutral-700 dark:text-neutral-300 rounded-2xl text-xs font-bold transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed font-display cursor-pointer"
        >
          🌸 Previous
        </button>
        {currentIndex < quiz.questions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={!selectedAnswers[currentIndex]}
            className="px-6 py-2.5 bg-gradient-to-r from-girly-pink-500 to-girly-pink-650 text-white rounded-2xl text-xs font-bold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md cursor-pointer font-display"
          >
            Next 🍭
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswers[currentIndex]}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl text-xs font-bold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md cursor-pointer font-display"
          >
            Submit Quiz 👑
          </button>
        )}
      </div>
    </div>
  );
}