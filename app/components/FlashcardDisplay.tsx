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
      {/* Pretty Progress Pill Indicator */}
      <div className="mb-5 text-xs font-bold tracking-widest text-girly-pink-650 dark:text-girly-pink-300 uppercase bg-girly-pink-100/80 dark:bg-girly-pink-950/40 border border-girly-pink-200/50 px-4 py-1.5 rounded-full font-display flex items-center gap-1.5">
        <span>🧸</span> Card {currentIndex + 1} of {flashcards.length}
      </div>

      {/* Flipping Card Container */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-64 cursor-pointer perspective-1000 group outline-none animate-in fade-in zoom-in-95 duration-300"
      >
        <div className={`relative w-full h-full duration-500 transform-style-3d shadow-[0_10px_35px_rgba(251,113,133,0.12)] hover:shadow-[0_12px_45px_rgba(251,113,133,0.22)] rounded-[32px] border-4 border-dashed transition-all ${
          isFlipped 
            ? 'rotate-y-180 bg-girly-pink-50/40 dark:bg-neutral-900 border-girly-lavender-200 dark:border-girly-lavender-900/60' 
            : 'bg-white dark:bg-neutral-900 border-girly-pink-200 dark:border-neutral-800'
        }`}>
          
          {/* FRONT Side */}
          <div className="absolute inset-0 w-full h-full p-8 flex flex-col justify-between items-center backface-hidden">
            <div className="w-full flex justify-between items-start">
              <span className="text-xs uppercase text-girly-pink-400 dark:text-girly-pink-500 tracking-widest font-bold mt-1 font-display">Concept 🌸</span>
              {currentCard.id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFlashcardLearned(currentCard.id!);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all duration-300 flex items-center gap-1 cursor-pointer font-display ${
                    currentCard.isLearned
                      ? 'bg-girly-pink-100 border-girly-pink-300 text-girly-pink-650 hover:bg-girly-pink-200/50 shadow-sm'
                      : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:text-girly-pink-600 hover:border-girly-pink-300 dark:hover:border-girly-pink-850'
                  }`}
                >
                  <span>{currentCard.isLearned ? '🎀' : '○'}</span>
                  <span>{currentCard.isLearned ? 'Learned' : 'Study Me'}</span>
                </button>
              )}
            </div>
            
            <p className="text-lg md:text-xl font-bold text-center text-neutral-800 dark:text-neutral-50 max-w-md balance leading-relaxed px-4 font-sans">
              {currentCard.front}
            </p>
            
            <span className="text-xs text-neutral-400 dark:text-neutral-500 font-semibold group-hover:text-girly-pink-500 transition-colors flex items-center gap-1">
              Tap card to reveal answer 🔄
            </span>
          </div>

          {/* BACK Side */}
          <div className="absolute inset-0 w-full h-full p-8 flex flex-col justify-between items-center backface-hidden rotate-y-180 bg-girly-pink-50/20 dark:bg-neutral-900/30">
            <div className="w-full flex justify-between items-start">
              <span className="text-xs uppercase text-girly-lavender-550 dark:text-girly-lavender-450 tracking-widest font-bold mt-1 font-display">Answer 🍬</span>
              {currentCard.id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFlashcardLearned(currentCard.id!);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all duration-300 flex items-center gap-1 cursor-pointer font-display ${
                    currentCard.isLearned
                      ? 'bg-girly-pink-100 border-girly-pink-300 text-girly-pink-650 hover:bg-girly-pink-200/50 shadow-sm'
                      : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:text-girly-pink-600 hover:border-girly-pink-300 dark:hover:border-girly-pink-850'
                  }`}
                >
                  <span>{currentCard.isLearned ? '🎀' : '○'}</span>
                  <span>{currentCard.isLearned ? 'Learned' : 'Study Me'}</span>
                </button>
              )}
            </div>
            
            <p className="text-base md:text-lg font-semibold text-center text-neutral-700 dark:text-neutral-200 max-w-md leading-relaxed px-4 font-sans">
              {currentCard.back}
            </p>
            
            <span className="text-xs text-neutral-400 dark:text-neutral-500 font-semibold flex items-center gap-1">
              Tap to flip back 🔄
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Toolbar */}
      <div className="flex gap-4 mt-8 w-full justify-between items-center px-1">
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="px-5 py-2.5 border border-girly-pink-200 dark:border-neutral-800 hover:bg-girly-pink-100/30 dark:hover:bg-neutral-900/60 text-neutral-700 dark:text-neutral-300 rounded-2xl text-xs font-bold transition-all duration-300 transform active:scale-95 hover:scale-[1.03] cursor-pointer font-display"
        >
          🌸 Previous
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="px-6 py-2.5 bg-gradient-to-r from-girly-pink-500 to-girly-pink-650 dark:from-girly-pink-600 dark:to-girly-pink-700 hover:shadow-[0_4px_15px_rgba(236,72,153,0.25)] text-white rounded-2xl text-xs font-bold transition-all duration-300 transform active:scale-95 hover:scale-[1.03] cursor-pointer font-display"
        >
          Next Card 🍭
        </button>
      </div>
    </div>
  );
}