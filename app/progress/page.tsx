'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import ProgressTracker from '@/app/components/ProgressTracker';
import { useStudy } from '@/app/context/StudyContext';

export default function ProgressPage() {
  const { progress } = useStudy();

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-b from-girly-pink-50 via-white to-girly-lavender-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-[-5%] left-[-10%] w-[550px] h-[550px] rounded-full bg-girly-pink-300/10 dark:bg-girly-pink-900/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-5%] right-[-10%] w-[550px] h-[550px] rounded-full bg-girly-lavender-350/10 dark:bg-girly-lavender-900/5 blur-3xl pointer-events-none"></div>

      <Navbar />
      
      <main className="flex-1 py-12 px-4 relative z-10 w-full">
        {progress.length > 0 ? (
          <ProgressTracker progressData={progress} />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center max-w-md mx-auto space-y-6">
            <span className="text-6xl animate-bounce">🦄</span>
            <div className="space-y-2">
              <p className="text-xl font-bold text-neutral-800 dark:text-neutral-205 font-display">
                No progress tracked yet 🌸
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                You haven't completed any flashcards or taken quizzes yet. Let's start studying together to track your milestones!
              </p>
            </div>
            <Link
              href="/"
              className="inline-block px-7 py-3 bg-gradient-to-r from-girly-pink-500 to-girly-pink-650 hover:shadow-[0_4px_15px_rgba(236,72,153,0.25)] text-white font-bold rounded-2xl transition-all duration-300 cursor-pointer font-display text-sm"
            >
              Start Studying ✨
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
