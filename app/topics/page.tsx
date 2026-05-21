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
      <div className="relative flex flex-col min-h-screen bg-gradient-to-b from-girly-pink-50 via-white to-girly-lavender-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 overflow-hidden">
        {/* Visual background glows */}
        <div className="absolute top-[-5%] left-[-10%] w-[550px] h-[550px] rounded-full bg-girly-pink-300/10 dark:bg-girly-pink-900/5 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-5%] right-[-10%] w-[550px] h-[550px] rounded-full bg-girly-lavender-350/10 dark:bg-girly-lavender-900/5 blur-3xl pointer-events-none"></div>
        
        <Navbar />
        
        <main className="flex-1 py-16 px-4 relative z-10 max-w-5xl mx-auto w-full">
          <div className="text-center space-y-3 mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-850 dark:text-neutral-50 font-display">
              🌸 Select a Study Topic 📖
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto font-medium text-sm">
              Choose one of your active topics to practice cute flashcards, take quizzes, and track your study milestones! 🧸
            </p>
          </div>

          {topics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((t) => (
                <Link
                  key={t.id}
                  href={`/topics?topicId=${t.id}`}
                  className="group relative flex flex-col justify-between p-6 bg-white/70 dark:bg-neutral-900/60 border border-girly-pink-100 dark:border-neutral-800 rounded-3xl shadow-sm hover:shadow-[0_8px_30px_rgba(251,113,135,0.08)] transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-girly-pink-400 to-girly-pink-600 rounded-l-3xl"></div>
                  <div className="pl-2">
                    <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-girly-pink-600 dark:group-hover:text-girly-pink-450 transition-colors mb-2.5 font-display">
                      {t.name}
                    </h2>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-3 leading-relaxed mb-5 font-medium">
                      {t.summary || 'No summary description generated for this topic.'}
                    </p>
                  </div>
                  <div className="text-xs font-bold text-girly-pink-650 dark:text-girly-pink-400 flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform pl-2 font-display">
                    Start Learning <span>🎀 →</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center bg-white/80 dark:bg-neutral-900/80 border border-girly-pink-100 dark:border-neutral-800 p-8 rounded-3xl shadow-xl max-w-md mx-auto space-y-6">
              <div className="text-6xl animate-bounce">💡</div>
              <div className="space-y-2">
                <p className="text-xl font-bold text-neutral-800 dark:text-neutral-205 font-display">
                  No topics available
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                  You haven't generated any study topics yet. Let's create your first magical topic!
                </p>
              </div>
              <Link
                href="/"
                className="inline-block px-7 py-3 bg-gradient-to-r from-girly-pink-500 to-girly-pink-650 hover:shadow-[0_4px_15px_rgba(236,72,153,0.25)] text-white font-bold rounded-2xl transition-all duration-300 cursor-pointer font-display text-sm"
              >
                Create a Topic ✨
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
    <div className="relative flex flex-col min-h-screen bg-gradient-to-b from-girly-pink-50 via-white to-girly-lavender-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 overflow-hidden">
      {/* Visual background glows */}
      <div className="absolute top-[-5%] left-[-10%] w-[550px] h-[550px] rounded-full bg-girly-pink-300/10 dark:bg-girly-pink-900/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-5%] right-[-10%] w-[550px] h-[550px] rounded-full bg-girly-lavender-350/10 dark:bg-girly-lavender-900/5 blur-3xl pointer-events-none"></div>
      
      <Navbar />
      
      <main className="flex-1 py-12 px-4 relative z-10 max-w-4xl mx-auto w-full">
        <div>
          <div className="mb-8">
            <Link
              href="/topics"
              className="text-girly-pink-600 dark:text-girly-pink-400 hover:underline mb-4 inline-block font-bold font-display text-sm flex items-center gap-1"
            >
              <span>← Back to Topics</span> 🌸
            </Link>
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-850 dark:text-neutral-50 mb-3.5 font-display bg-gradient-to-r from-girly-pink-600 to-girly-lavender-550 bg-clip-text text-transparent">
              {currentTopic.name}
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-base leading-relaxed max-w-3xl font-medium">
              {currentTopic.summary}
            </p>
          </div>

          <div className="flex gap-4 mb-8 flex-wrap">
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 text-sm font-display shadow-sm ${
                activeTab === 'flashcards'
                  ? 'bg-gradient-to-r from-girly-pink-500 to-girly-pink-650 hover:shadow-lg text-white'
                  : 'bg-white/80 dark:bg-neutral-900/80 text-neutral-800 dark:text-neutral-100 border border-girly-pink-100 dark:border-neutral-850 hover:bg-girly-pink-50/50 dark:hover:bg-neutral-800/40'
              }`}
            >
              <span>🧸</span> Flashcards ({flashcards.length})
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 text-sm font-display shadow-sm ${
                activeTab === 'quiz'
                  ? 'bg-gradient-to-r from-girly-lavender-550 to-girly-pink-500 hover:shadow-lg text-white'
                  : 'bg-white/80 dark:bg-neutral-900/80 text-neutral-800 dark:text-neutral-100 border border-girly-pink-100 dark:border-neutral-850 hover:bg-girly-pink-50/50 dark:hover:bg-neutral-800/40'
              }`}
            >
              <span>🍰</span> Quiz ({quiz?.questions.length || 0})
            </button>
          </div>

          <div className="bg-white/80 dark:bg-neutral-900/60 backdrop-blur-md rounded-3xl border border-girly-pink-200/50 dark:border-neutral-850 shadow-xl p-6 sm:p-8 min-h-[400px]">
            {activeTab === 'flashcards' ? (
              flashcards.length > 0 ? (
                <FlashcardDisplay flashcards={flashcards} />
              ) : (
                <div className="text-center text-neutral-500 dark:text-neutral-400 py-16">
                  <p className="text-2xl mb-2 font-extrabold font-display">No flashcards available yet</p>
                  <p className="text-sm opacity-80 max-w-sm mx-auto font-medium">
                    We will generate high-quality study cards for you with our magical AI assistant!
                  </p>
                </div>
              )
            ) : quiz ? (
              <QuizDisplay quiz={quiz} topicName={currentTopic.name} onComplete={handleQuizComplete} />
            ) : (
              <div className="text-center text-neutral-500 dark:text-neutral-400 py-16">
                <p className="text-2xl mb-2 font-extrabold font-display">No quiz available yet</p>
                <p className="text-sm opacity-80 max-w-sm mx-auto font-medium">
                  We will generate active recall quizzes for you with our magical AI assistant!
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