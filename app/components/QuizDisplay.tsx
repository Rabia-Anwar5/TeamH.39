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
      <div className="w-full max-w-2xl mx-auto text-center py-12">
        <h3 className="text-3xl font-bold mb-6 text-black dark:text-white">Quiz Complete!</h3>
        <div className="text-6xl font-bold text-blue-600 mb-4">{percentage}%</div>
        <p className="text-2xl text-gray-700 dark:text-gray-300 mb-6">
          You got {score} out of {quiz.questions.length} questions correct
        </p>
        <button
          onClick={() => {
            setCurrentIndex(0);
            setSelectedAnswers({});
            setShowResults(false);
            setScore(0);
          }}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md transition-colors"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* 2. Added defensive title tracking using optional parameter or fallback text */}
      <h3 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">
        {topicName ? `${topicName} Quiz` : 'Active Recall Quiz'}
      </h3>

      <div className="mb-6 text-center text-gray-600 dark:text-gray-400 font-medium">
        Question {currentIndex + 1} of {quiz.questions.length}
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
        <p className="text-xl font-semibold text-black dark:text-white mb-6 leading-snug">
          {current.question}
        </p>

        <div className="space-y-3">
          {current.options.map((option, idx) => {
            const isChecked = selectedAnswers[currentIndex] === option;
            return (
              <label
                key={idx}
                className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  isChecked
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
                    : 'border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                <input
                  type="radio"
                  name={`answer-${currentIndex}`}
                  value={option}
                  checked={isChecked}
                  onChange={() => handleSelectAnswer(option)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-3 text-black dark:text-white font-medium">{option}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between gap-4 mb-6">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-6 py-2.5 bg-gray-200 dark:bg-gray-800 text-black dark:text-white font-medium rounded-xl hover:bg-gray-300 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>
        {currentIndex < quiz.questions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={!selectedAnswers[currentIndex]}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswers[currentIndex]}
            className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}