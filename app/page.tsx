'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import TopicInput from '@/app/components/TopicInput';
import { useStudy } from '@/app/context/StudyContext';

export default function Home() {
  const { topics } = useStudy();

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-50 dark:bg-black overflow-hidden">
      {/* Background ambient glow shapes for high-end aesthetics */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/10 dark:bg-blue-600/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-400/10 dark:bg-purple-600/5 blur-3xl pointer-events-none"></div>

      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4 relative z-10">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-black dark:text-white leading-none">
            📚 Welcome to <span className="bg-gradient-to-r from-blue-600 to-indigo-650 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Study Buddy</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Your AI-powered learning assistant that helps you master any topic.
            Generate comprehensive flashcards, challenging quizzes, and track your progress in real-time.
          </p>
        </div>

        {/* Input panel container */}
        <div className="w-full max-w-md bg-white dark:bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xl p-6 sm:p-8 mb-12">
          <TopicInput />
        </div>

        {topics.length > 0 && (
          <div className="w-full max-w-md">
            <h3 className="text-lg font-bold text-black dark:text-white mb-4 flex items-center gap-2">
              <span>📖</span> Your Topics
            </h3>
            <div className="space-y-3">
              {topics.map((t) => (
                <Link
                  key={t.id}
                  href={`/topics?topicId=${t.id}`}
                  className="group flex items-center justify-between w-full text-left px-5 py-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 text-black dark:text-white hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all duration-250 cursor-pointer"
                >
                  <div className="pr-4">
                    <p className="font-bold text-base text-gray-900 dark:text-gray-150 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                      {t.summary}
                    </p>
                  </div>
                  <span className="text-blue-600 dark:text-blue-400 text-lg transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic features layout */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <div className="bg-white dark:bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-md hover:shadow-lg p-6 text-center transition-all duration-300 hover:-translate-y-1">
            <p className="text-4xl mb-4">🎯</p>
            <h3 className="text-xl font-bold text-black dark:text-white mb-2 bg-gradient-to-r from-blue-600 to-indigo-650 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-455">
              Flashcards
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Interactive flashcards with smooth 3D flipping to help you study, memorize, and recall critical concepts.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-md hover:shadow-lg p-6 text-center transition-all duration-300 hover:-translate-y-1">
            <p className="text-4xl mb-4">📝</p>
            <h3 className="text-xl font-bold text-black dark:text-white mb-2 bg-gradient-to-r from-purple-600 to-pink-650 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-455">
              Quizzes
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Test your knowledge with multiple choice active-recall quizzes generated automatically by our AI system.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-md hover:shadow-lg p-6 text-center transition-all duration-300 hover:-translate-y-1">
            <p className="text-4xl mb-4">📊</p>
            <h3 className="text-xl font-bold text-black dark:text-white mb-2 bg-gradient-to-r from-emerald-600 to-teal-650 bg-clip-text text-transparent dark:from-emerald-450 dark:to-teal-455">
              Progress
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Track your learning milestones, scores, and review history to maximize spaced-repetition efficiency.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
