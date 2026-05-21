// This file will contain the main layout and navigation
import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-black dark:text-white">
              📚 Study Buddy
            </h1>
          </div>
          <div className="flex space-x-4">
            <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
              Home
            </a>
            <a href="/topics" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
              Topics
            </a>
            <a href="/progress" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
              Progress
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
