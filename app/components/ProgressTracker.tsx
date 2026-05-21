// app/components/ProgressTracker.tsx
'use client';

import React from 'react';
import { TopicProgress } from '../types';
import { useStudy } from '../context/StudyContext';

interface ProgressTrackerProps {
  progressData: TopicProgress[];
}

export default function ProgressTracker({ progressData }: ProgressTrackerProps) {
  const { topics } = useStudy();

  if (!progressData || progressData.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-12">
        No progress data yet. Start studying to track your progress!
      </div>
    );
  }

  // Safely calculates aggregated metrics from individual data rows
  const totalFlashcardsLearned = progressData.reduce((sum, p) => sum + p.flashcardsLearned, 0);
  const totalQuizzesCompleted = progressData.reduce((sum, p) => sum + p.quizzesCompleted, 0);
  const averageScore =
    progressData.reduce((sum, p) => sum + p.averageScore, 0) / progressData.length;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-12">
      <div className="text-center space-y-2">
        <h3 className="text-4xl font-extrabold tracking-tight text-black dark:text-white">
          📊 Your Learning Analytics
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Monitor your study achievements, check quiz performance, and review progress.
        </p>
      </div>

      {/* Analytics Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards with Hover Lift and Gradients */}
        <div className="relative group overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-white hover:-translate-y-1">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-300 text-9xl pointer-events-none select-none">
            🎯
          </div>
          <span className="text-sm font-semibold tracking-wider uppercase opacity-80">Flashcards Learned</span>
          <p className="text-5xl font-black mt-4">{totalFlashcardsLearned}</p>
          <p className="text-xs mt-3 opacity-90 flex items-center gap-1">
            <span>⚡ Keep practicing key concepts</span>
          </p>
        </div>

        <div className="relative group overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-white hover:-translate-y-1">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-300 text-9xl pointer-events-none select-none">
            📝
          </div>
          <span className="text-sm font-semibold tracking-wider uppercase opacity-80">Quizzes Completed</span>
          <p className="text-5xl font-black mt-4">{totalQuizzesCompleted}</p>
          <p className="text-xs mt-3 opacity-90 flex items-center gap-1">
            <span>🔥 Active recall boosts retention</span>
          </p>
        </div>

        <div className="relative group overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-white hover:-translate-y-1">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-300 text-9xl pointer-events-none select-none">
            📊
          </div>
          <span className="text-sm font-semibold tracking-wider uppercase opacity-80">Average Quiz Score</span>
          <p className="text-5xl font-black mt-4">{averageScore.toFixed(1)}%</p>
          <p className="text-xs mt-3 opacity-90 flex items-center gap-1">
            <span>🏆 Aim for 80% or higher!</span>
          </p>
        </div>
      </div>

      {/* Topics Progress List */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="px-8 py-5 bg-gray-50/50 dark:bg-gray-950/20 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h4 className="text-xl font-bold text-black dark:text-white">Subject Breakdown</h4>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
            {progressData.length} active {progressData.length === 1 ? 'topic' : 'topics'}
          </span>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {progressData.map((progress, idx) => {
            const topic = topics.find((t) => t.id === progress.topicId);
            const topicName = topic ? topic.name : `Topic ${progress.topicId}`;
            return (
              <div key={idx} className="px-8 py-6 hover:bg-gray-50/30 dark:hover:bg-gray-800/10 transition-all duration-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                  <div>
                    <h5 className="text-lg font-bold text-black dark:text-white">{topicName}</h5>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      Last reviewed on {progress.lastReviewDate
                        ? new Date(progress.lastReviewDate).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : 'Not started yet'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      📚 {progress.flashcardsLearned} cards
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      📝 {progress.quizzesCompleted} quizzes
                    </span>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                      progress.averageScore >= 80
                        ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600'
                        : progress.averageScore >= 50
                        ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-600'
                        : 'bg-rose-50 dark:bg-rose-950/20 text-rose-600'
                    }`}>
                      {progress.averageScore.toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* Progress bar container */}
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-700 ease-out ${
                      progress.averageScore >= 80
                        ? 'bg-gradient-to-r from-emerald-450 to-teal-500'
                        : progress.averageScore >= 50
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                        : 'bg-gradient-to-r from-rose-500 to-red-650'
                    }`}
                    style={{ width: `${Math.min(Math.max(progress.averageScore, 0), 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}