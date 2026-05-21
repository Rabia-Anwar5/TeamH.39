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
        <h3 className="text-4xl font-extrabold tracking-tight text-neutral-850 dark:text-neutral-50 font-display bg-gradient-to-r from-girly-pink-600 via-girly-pink-500 to-girly-lavender-550 bg-clip-text text-transparent">
          💖 Your Magical Analytics ✨
        </h3>
        <p className="text-neutral-500 dark:text-neutral-400 max-w-md mx-auto font-medium text-sm">
          Keep track of your study achievements, check your quiz scores, and celebrate your incredible growth! 🌸
        </p>
      </div>

      {/* Analytics Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards with Hover Lift and Pink Gradients */}
        <div className="relative group overflow-hidden bg-gradient-to-br from-girly-pink-400 to-girly-pink-600 rounded-3xl shadow-[0_10px_25px_rgba(236,72,153,0.2)] hover:shadow-[0_12px_35px_rgba(236,72,153,0.35)] transition-all duration-300 p-6 text-white hover:-translate-y-1">
          <div className="absolute -right-4 -bottom-4 opacity-15 group-hover:scale-110 transition-transform duration-300 text-9xl pointer-events-none select-none">
            🧸
          </div>
          <span className="text-xs font-bold tracking-widest uppercase opacity-90 font-display">Flashcards Learned</span>
          <p className="text-5xl font-black mt-4 font-display">{totalFlashcardsLearned}</p>
          <p className="text-xs mt-3.5 opacity-90 flex items-center gap-1 font-medium">
            <span>✨ Doing amazing, keep it up!</span>
          </p>
        </div>

        <div className="relative group overflow-hidden bg-gradient-to-br from-girly-lavender-450 to-girly-lavender-550 rounded-3xl shadow-[0_10px_25px_rgba(139,92,246,0.2)] hover:shadow-[0_12px_35px_rgba(139,92,246,0.35)] transition-all duration-300 p-6 text-white hover:-translate-y-1">
          <div className="absolute -right-4 -bottom-4 opacity-15 group-hover:scale-110 transition-transform duration-300 text-9xl pointer-events-none select-none">
            🍰
          </div>
          <span className="text-xs font-bold tracking-widest uppercase opacity-90 font-display">Quizzes Completed</span>
          <p className="text-5xl font-black mt-4 font-display">{totalQuizzesCompleted}</p>
          <p className="text-xs mt-3.5 opacity-90 flex items-center gap-1 font-medium">
            <span>🍬 Active recall is your superpower!</span>
          </p>
        </div>

        <div className="relative group overflow-hidden bg-gradient-to-br from-girly-peach-300 to-girly-pink-400 rounded-3xl shadow-[0_10px_25px_rgba(251,113,133,0.18)] hover:shadow-[0_12px_35px_rgba(251,113,133,0.3)] transition-all duration-300 p-6 text-white hover:-translate-y-1">
          <div className="absolute -right-4 -bottom-4 opacity-15 group-hover:scale-110 transition-transform duration-300 text-9xl pointer-events-none select-none">
            🦄
          </div>
          <span className="text-xs font-bold tracking-widest uppercase opacity-90 font-display">Average Score</span>
          <p className="text-5xl font-black mt-4 font-display">{averageScore.toFixed(1)}%</p>
          <p className="text-xs mt-3.5 opacity-90 flex items-center gap-1 font-medium">
            <span>🌟 Queen of spaced repetition!</span>
          </p>
        </div>
      </div>

      {/* Magical Milestone Badges */}
      <div className="bg-white/60 dark:bg-neutral-900/50 backdrop-blur-md rounded-3xl border border-girly-pink-100 dark:border-neutral-800 p-6 shadow-sm">
        <h4 className="text-lg font-bold text-neutral-850 dark:text-neutral-50 font-display mb-4 flex items-center gap-1.5 justify-center md:justify-start">
          <span>🏆</span> Your Magical Milestones 🌸
        </h4>
        <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
          {/* Badge 1: Study Princess */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-bold font-display ${
            totalFlashcardsLearned >= 1
              ? 'bg-girly-pink-100/80 border-girly-pink-200 text-girly-pink-650'
              : 'bg-neutral-100/50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700 text-neutral-450 opacity-50'
          }`}>
            <span>🎀</span>
            <span>Study Princess</span>
          </div>

          {/* Badge 2: Quiz Queen */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-bold font-display ${
            averageScore >= 80
              ? 'bg-girly-lavender-100/80 border-girly-lavender-200 text-girly-lavender-550'
              : 'bg-neutral-100/50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700 text-neutral-450 opacity-50'
          }`}>
            <span>🧁</span>
            <span>Recall Queen</span>
          </div>

          {/* Badge 3: Magical Scholar */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-bold font-display ${
            totalQuizzesCompleted >= 3
              ? 'bg-girly-peach-100/80 border-girly-peach-200 text-amber-600 dark:text-girly-peach-300'
              : 'bg-neutral-100/50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700 text-neutral-450 opacity-50'
          }`}>
            <span>🦄</span>
            <span>Magical Scholar</span>
          </div>
        </div>
      </div>

      {/* Topics Progress List */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-[0_8px_30px_rgba(251,113,135,0.05)] border border-girly-pink-100 dark:border-neutral-800 overflow-hidden">
        <div className="px-8 py-5 bg-girly-pink-50/50 dark:bg-neutral-950/20 border-b border-girly-pink-100 dark:border-neutral-800 flex justify-between items-center">
          <h4 className="text-lg font-bold text-neutral-850 dark:text-neutral-50 font-display">Subject Breakdown</h4>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-girly-pink-100/80 dark:bg-girly-pink-950/50 text-girly-pink-650 dark:text-girly-pink-300 font-display">
            ✨ {progressData.length} active {progressData.length === 1 ? 'topic' : 'topics'} ✨
          </span>
        </div>

        <div className="divide-y divide-girly-pink-50 dark:divide-neutral-800/80">
          {progressData.map((progress, idx) => {
            const topic = topics.find((t) => t.id === progress.topicId);
            const topicName = topic ? topic.name : `Topic ${progress.topicId}`;
            return (
              <div key={idx} className="px-8 py-6 hover:bg-girly-pink-50/20 dark:hover:bg-neutral-900/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                  <div>
                    <h5 className="text-base font-bold text-neutral-800 dark:text-neutral-100 font-display">{topicName}</h5>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 font-medium">
                      Last reviewed on {progress.lastReviewDate
                        ? new Date(progress.lastReviewDate).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : 'Not started yet 🌸'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-sans">
                      🧸 {progress.flashcardsLearned} cards
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-sans">
                      🍰 {progress.quizzesCompleted} quizzes
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full font-display ${
                      progress.averageScore >= 80
                        ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450'
                        : progress.averageScore >= 50
                        ? 'bg-girly-peach-100 dark:bg-amber-950/20 text-amber-700 dark:text-girly-peach-350'
                        : 'bg-girly-pink-100 dark:bg-rose-950/20 text-girly-pink-650 dark:text-girly-pink-300'
                    }`}>
                      {progress.averageScore.toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* Progress bar container: bubbly candy stick */}
                <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-3.5 overflow-hidden p-0.5 border border-neutral-200/40 dark:border-neutral-750">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${
                      progress.averageScore >= 80
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                        : progress.averageScore >= 50
                        ? 'bg-gradient-to-r from-girly-peach-300 to-girly-pink-400'
                        : 'bg-gradient-to-r from-girly-pink-400 to-girly-pink-650'
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