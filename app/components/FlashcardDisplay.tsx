// app/components/FlashcardDisplay.tsx
'use client';

import React, { useState } from 'react';
import { Flashcard } from '../types';
import { useStudy } from '../context/StudyContext';

interface FlashcardDisplayProps {
  flashcards: Flashcard[];
}

export default function FlashcardDisplay({ flashcards }: FlashcardDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { toggleFlashcardLearned } = useStudy();

  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        No flashcards available for this topic.
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 150);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center min-h-[350px]">
      {/* Progress Pill Indicator */}
      <div className="mb-4 text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full">
        Card {currentIndex + 1} of {flashcards.length}
      </div>

      {/* Flipping Card Container */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-56 cursor-pointer perspective-1000 group outline-none animate-in fade-in zoom-in-95 duration-300"
      >
        <div className={`relative w-full h-full duration-500 transform-style-3d shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-800 rounded-2xl transition-all ${
          isFlipped ? 'rotate-y-180 bg-blue-50/20 dark:bg-gray-850' : 'bg-white dark:bg-gray-900'
        }`}>
          {/* FRONT Side */}
          <div className="absolute inset-0 w-full h-full p-6 flex flex-col justify-center items-center backface-hidden">
            {currentCard.id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFlashcardLearned(currentCard.id!);
                }}
                className={`absolute top-4 right-4 z-20 px-3 py-1 text-xs font-semibold rounded-full border transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  currentCard.isLearned
                    ? 'bg-emerald-500/10 border-emerald-500/35 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-blue-500/35 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <span>{currentCard.isLearned ? '✓' : '○'}</span>
                <span>{currentCard.isLearned ? 'Learned' : 'Mark Learned'}</span>
              </button>
            )}
            <span className="text-xs uppercase text-gray-400 tracking-widest font-bold mb-3 block">Concept / Question</span>
            <p className="text-xl font-semibold text-center text-black dark:text-white max-w-md balance leading-relaxed px-4">
              {currentCard.front}
            </p>
            <span className="text-xs text-gray-400 mt-6 group-hover:text-blue-500 transition-colors">
              Click card to reveal answer 🔄
            </span>
          </div>

          {/* BACK Side */}
          <div className="absolute inset-0 w-full h-full p-6 flex flex-col justify-center items-center backface-hidden rotate-y-180 bg-blue-50/10 dark:bg-blue-950/10">
            {currentCard.id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFlashcardLearned(currentCard.id!);
                }}
                className={`absolute top-4 right-4 z-20 px-3 py-1 text-xs font-semibold rounded-full border transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  currentCard.isLearned
                    ? 'bg-emerald-500/10 border-emerald-500/35 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-blue-500/35 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <span>{currentCard.isLearned ? '✓' : '○'}</span>
                <span>{currentCard.isLearned ? 'Learned' : 'Mark Learned'}</span>
              </button>
            )}
            <span className="text-xs uppercase text-blue-500 dark:text-blue-400 tracking-widest font-bold mb-3 block">Answer / Insight</span>
            <p className="text-lg text-center text-gray-800 dark:text-gray-200 max-w-md leading-relaxed px-4">
              {currentCard.back}
            </p>
            <span className="text-xs text-gray-400 mt-6">
              Click to flip back 🔄
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Toolbar */}
      <div className="flex gap-4 mt-8 w-full justify-between items-center px-2">
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="px-4 py-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white rounded-xl text-sm font-medium transition-colors cursor-pointer"
        >
          ← Previous
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm cursor-pointer"
        >
          Next Card →
        </button>
      </div>
    </div>
  );
}