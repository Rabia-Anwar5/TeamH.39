import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-4 z-50 max-w-5xl w-[95%] mx-auto my-3">
      <div className="backdrop-blur-lg bg-white/75 dark:bg-neutral-900/75 border border-girly-pink-200/60 dark:border-girly-pink-900/40 rounded-3xl shadow-[0_8px_32px_0_rgba(251,113,133,0.12)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="group flex items-center gap-2 cursor-pointer">
              <span className="text-2xl animate-bubbly inline-block">✨</span>
              <h1 className="text-xl font-bold bg-gradient-to-r from-girly-pink-500 via-girly-pink-600 to-girly-lavender-550 bg-clip-text text-transparent font-display group-hover:scale-105 transition-transform duration-300">
                Study Buddy 🌸
              </h1>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link 
              href="/" 
              className="px-3.5 py-1.5 rounded-full text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:text-girly-pink-600 dark:hover:text-girly-pink-400 hover:bg-girly-pink-100/50 dark:hover:bg-girly-pink-950/30 transition-all duration-300 cursor-pointer"
            >
              Home
            </Link>
            <Link 
              href="/topics" 
              className="px-3.5 py-1.5 rounded-full text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:text-girly-pink-600 dark:hover:text-girly-pink-400 hover:bg-girly-pink-100/50 dark:hover:bg-girly-pink-950/30 transition-all duration-300 cursor-pointer"
            >
              Topics
            </Link>
            <Link 
              href="/progress" 
              className="px-3.5 py-1.5 rounded-full text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:text-girly-pink-600 dark:hover:text-girly-pink-400 hover:bg-girly-pink-100/50 dark:hover:bg-girly-pink-950/30 transition-all duration-300 cursor-pointer"
            >
              Progress
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
