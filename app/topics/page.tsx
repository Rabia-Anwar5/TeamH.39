'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
// 1. Path alias route updates for parent positioning
import Navbar from '../components/Navbar';
import FlashcardDisplay from '../components/FlashcardDisplay';
import QuizDisplay from '../components/QuizDisplay';
import { useStudy } from '../context/StudyContext';
import { Topic } from '../types';

function TopicsPageContent() {
  const searchParams = useSearchParams();
  const topicId = searchParams.get('topicId');
  const { topics, getFlashcardsForTopic, getQuizForTopic, setCurrentTopic, updateProgress } = useStudy();
  const [activeTab, setActiveTab] = useState<'flashcards' | 'quiz'>('flashcards');
  const [currentTopic, setLocalTopic] = useState<Topic | null>(null);

  useEffect(() => {
    if (topicId && topics.length > 0) {
      const topic = topics.find((t) => t.id === topicId);
      if (topic) {
        setLocalTopic(topic);
        setCurrentTopic(topic);
      }
    }
  }, [topicId, topics, setCurrentTopic]);

  if (!currentTopic) {
    return (
      <div className="relative flex flex-col min-h-screen bg-gray-50 dark:bg-black overflow-hidden">
        {/* Visual background glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/10 dark:bg-blue-600/5 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-400/10 dark:bg-purple-600/5 blur-3xl pointer-events-none"></div>
        
        <Navbar />
        
        <main className="flex-1 py-16 px-4 relative z-10 max-w-5xl mx-auto w-full">
          <div className="text-center space-y-3 mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-black dark:text-white">
              📚 Select a Study Topic
            </h1>
            <p className="text-gray-555 dark:text-gray-400 max-w-lg mx-auto">
              Choose one of your active topics to practice flashcards, take quizzes, and track progress.
            </p>
          </div>

          {topics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((t) => (
                <Link
                  key={t.id}
                  href={`/topics?topicId=${t.id}`}
                  className="group relative flex flex-col justify-between p-6 bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-850 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 rounded-l-2xl"></div>
                  <div>
                    <h2 className="text-xl font-bold text-black dark:text-white group-hover:text-blue-550 dark:group-hover:text-blue-400 transition-colors mb-2">
                      {t.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-450 line-clamp-3 leading-relaxed mb-4">
                      {t.summary || 'No summary description generated for this topic.'}
                    </p>
                  </div>
                  <div className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                    Start Learning <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-2xl shadow-xl max-w-md mx-auto space-y-6">
              <div className="text-5xl">💡</div>
              <div className="space-y-2">
                <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
                  No topics available
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  You haven't generated any study topics yet. Let's create your first topic!
                </p>
              </div>
              <Link
                href="/"
                className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all cursor-pointer shadow hover:shadow-md"
              >
                Create a Topic
              </Link>
            </div>
          )}
        </main>
      </div>
    );
  }

  const flashcards = getFlashcardsForTopic(currentTopic.id);
  const quiz = getQuizForTopic(currentTopic.id);

  const handleQuizComplete = (score: number, total: number) => {
    updateProgress(currentTopic.id, score, total);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-50 dark:bg-black overflow-hidden">
      {/* Visual background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/10 dark:bg-blue-600/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-400/10 dark:bg-purple-600/5 blur-3xl pointer-events-none"></div>
      
      <Navbar />
      
      <main className="flex-1 py-12 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block font-semibold"
            >
              ← Back to Home
            </Link>
            {/* 2. Re-mapped fields to use .name and .summary properties */}
            <h1 className="text-4xl font-extrabold tracking-tight text-black dark:text-white mb-3">
              {currentTopic.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-3xl">
              {currentTopic.summary}
            </p>
          </div>

          <div className="flex gap-4 mb-8 flex-wrap">
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-sm ${
                activeTab === 'flashcards'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-650 text-white hover:shadow-md'
                  : 'bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-850'
              }`}
            >
              <span>🎯</span> Flashcards ({flashcards.length})
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-sm ${
                activeTab === 'quiz'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-650 text-white hover:shadow-md'
                  : 'bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-850'
              }`}
            >
              <span>📝</span> Quiz ({quiz?.questions.length || 0})
            </button>
          </div>

          <div className="bg-white dark:bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-150 dark:border-gray-850 shadow-xl p-6 sm:p-8 min-h-[400px]">
            {activeTab === 'flashcards' ? (
              flashcards.length > 0 ? (
                <FlashcardDisplay flashcards={flashcards} />
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-16">
                  <p className="text-2xl mb-2 font-bold">No flashcards available yet</p>
                  <p className="text-sm opacity-80 max-w-sm mx-auto">
                    We will generate high-quality flashcards with AI integration.
                  </p>
                </div>
              )
            ) : quiz ? (
              <QuizDisplay quiz={quiz} topicName={currentTopic.name} onComplete={handleQuizComplete} />
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-16">
                <p className="text-2xl mb-2 font-bold">No quiz available yet</p>
                <p className="text-sm opacity-80 max-w-sm mx-auto">
                  We will generate active recall quizzes with AI integration.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function TopicsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
          <Navbar />
          <main className="flex-1 flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400 animate-pulse font-medium">Loading Topic Details...</p>
          </main>
        </div>
      }
    >
      <TopicsPageContent />
    </Suspense>
  );
}