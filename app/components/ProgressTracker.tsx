// Progress tracking component
'use client';

import React from 'react';
import { UserProgress } from '@/app/types';

interface ProgressTrackerProps {
  progressData: UserProgress[];
}

export default function ProgressTracker({ progressData }: ProgressTrackerProps) {
  if (!progressData || progressData.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        No progress data yet. Start studying to track your progress!
      </div>
    );
  }

  const totalFlashcardsLearned = progressData.reduce((sum, p) => sum + p.flashcardsLearned, 0);
  const totalQuizzesCompleted = progressData.reduce((sum, p) => sum + p.quizzesCompleted, 0);
  const averageScore =
    progressData.reduce((sum, p) => sum + p.averageScore, 0) / progressData.length;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-3xl font-bold text-center mb-12">Your Progress</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Stats Cards */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <p className="text-sm font-medium opacity-90">Flashcards Learned</p>
          <p className="text-4xl font-bold mt-2">{totalFlashcardsLearned}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <p className="text-sm font-medium opacity-90">Quizzes Completed</p>
          <p className="text-4xl font-bold mt-2">{totalQuizzesCompleted}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <p className="text-sm font-medium opacity-90">Average Score</p>
          <p className="text-4xl font-bold mt-2">{averageScore.toFixed(1)}%</p>
        </div>
      </div>

      {/* Topics Progress List */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h4 className="text-xl font-semibold text-black dark:text-white">Topics Progress</h4>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {progressData.map((progress, idx) => (
            <div key={idx} className="px-6 py-4">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold text-black dark:text-white">Topic {progress.topicId}</h5>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {progress.averageScore.toFixed(1)}%
                </span>
              </div>
              <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>📚 {progress.flashcardsLearned} flashcards</span>
                <span>📝 {progress.quizzesCompleted} quizzes</span>
                <span>
                  ⏱️ {progress.lastReviewDate
                    ? new Date(progress.lastReviewDate).toLocaleDateString()
                    : 'Not started'}
                </span>
              </div>
              <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${progress.averageScore}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
