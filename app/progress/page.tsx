'use client';

import React from 'react';
import Navbar from '@/app/components/Navbar';
import ProgressTracker from '@/app/components/ProgressTracker';
import { useStudy } from '@/app/context/StudyContext';

export default function ProgressPage() {
  const { progress } = useStudy();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        {progress.length > 0 ? (
          <ProgressTracker progressData={progress} />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-96">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              No progress yet. Start studying to track your progress!
            </p>
            <a
              href="/"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Go to Home
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
