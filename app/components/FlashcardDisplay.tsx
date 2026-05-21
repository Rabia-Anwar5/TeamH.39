// Flashcard component
'use client';

import React, { useState } from 'react';
import { Flashcard } from '@/app/types';

interface FlashcardDisplayProps {
  flashcards: Flashcard[];
}

export default function FlashcardDisplay({ flashcards }: FlashcardDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        No flashcards available
      </div>
    );
  }

  const current = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-center mb-6">Flashcards</h3>
      
      <div className="mb-6 text-center text-gray-600 dark:text-gray-400">
        Card {currentIndex + 1} of {flashcards.length}
      </div>

      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative h-64 cursor-pointer mb-6"
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg p-8 flex items-center justify-center transition-all duration-300 ${
            isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="text-center text-white">
            <p className="text-sm text-blue-100 mb-2">Question</p>
            <p className="text-2xl font-semibold">{current.question}</p>
          </div>
        </div>

        <div
          className={`absolute inset-0 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg shadow-lg p-8 flex items-center justify-center transition-all duration-300 ${
            !isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="text-center text-white">
            <p className="text-sm text-green-100 mb-2">Answer</p>
            <p className="text-2xl font-semibold">{current.answer}</p>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
        Click card to flip • {isFlipped ? 'Showing answer' : 'Showing question'}
      </div>

      <div className="flex justify-between gap-4">
        <button
          onClick={handlePrevious}
          className="px-6 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-medium rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
        >
          ← Previous
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-medium rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
