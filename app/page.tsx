'use client';

import Navbar from '@/app/components/Navbar';
import TopicInput from '@/app/components/TopicInput';
import { useStudy } from '@/app/context/StudyContext';

export default function Home() {
  const { topics } = useStudy();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-black dark:text-white mb-4">
            📚 Welcome to Study Buddy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
            Your AI-powered learning assistant that helps you understand and revise topics.
            Generate flashcards, quizzes, and track your progress all in one place.
          </p>
        </div>

        <TopicInput />

        {topics.length > 0 && (
          <div className="mt-16 w-full max-w-md">
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
              📖 Your Topics
            </h3>
            <div className="space-y-2">
              {topics.map((t) => (
                <a
                  key={t.id}
                  href={`/topics?topicId=${t.id}`}
                  className="flex items-center justify-between w-full text-left px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div>
                    <p className="font-medium">{t.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.description}</p>
                  </div>
                  <span className="text-lg">→</span>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 text-center">
            <p className="text-3xl mb-3">🎯</p>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
              Flashcards
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Interactive flashcards to help you memorize and recall information
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 text-center">
            <p className="text-3xl mb-3">📝</p>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
              Quizzes
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Test your knowledge with AI-generated quiz questions
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 text-center">
            <p className="text-3xl mb-3">📊</p>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
              Progress
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track your learning progress and see how you improve
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
