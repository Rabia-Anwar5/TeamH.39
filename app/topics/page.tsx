'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
// 1. Updated path alias routes to clean relative positions
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
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20 px-4">
          <div className="text-center">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              No topic selected. Create a topic to get started!
            </p>
            <a
              href="/"
              className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              ← Back to Home
            </a>
          </div>
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
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <a
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
            >
              ← Back
            </a>
            {/* 2. Re-mapped fields to use .name and .summary properties */}
            <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
              {currentTopic.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {currentTopic.summary}
            </p>
          </div>

          <div className="flex gap-4 mb-8 flex-wrap">
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === 'flashcards'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-200 dark:border-gray-700'
              }`}
            >
              🎯 Flashcards ({flashcards.length})
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-200 dark:border-gray-700'
              }`}
            >
              📝 Quiz ({quiz?.questions.length || 0})
            </button>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-lg p-6 sm:p-8 min-h-96">
            {activeTab === 'flashcards' ? (
              flashcards.length > 0 ? (
                <FlashcardDisplay flashcards={flashcards} />
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                  <p className="text-lg mb-2 font-medium">No flashcards available yet</p>
                  <p className="text-sm opacity-80">Flashcards will be generated with AI integration</p>
                </div>
              )
            ) : quiz ? (
              // Passed the current topic name into the quiz header context mapping
              <QuizDisplay quiz={quiz} topicName={currentTopic.name} onComplete={handleQuizComplete} />
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                <p className="text-lg mb-2 font-medium">No quiz available yet</p>
                <p className="text-sm opacity-80">Quizzes will be generated with AI integration</p>
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