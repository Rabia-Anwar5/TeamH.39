'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import TopicInput from '@/app/components/TopicInput';
import { useStudy } from '@/app/context/StudyContext';

export default function Home() {
  const { topics } = useStudy();

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-b from-girly-pink-50 via-white to-girly-lavender-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 overflow-hidden">
      {/* Background ambient glow shapes for dreamy aesthetics */}
      <div className="absolute top-[-5%] left-[-10%] w-[600px] h-[600px] rounded-full bg-girly-pink-300/15 dark:bg-girly-pink-900/5 blur-3xl pointer-events-none animate-pulse duration-5000"></div>
      <div className="absolute bottom-[-5%] right-[-10%] w-[600px] h-[600px] rounded-full bg-girly-lavender-350/15 dark:bg-girly-lavender-900/5 blur-3xl pointer-events-none animate-pulse duration-7000"></div>

      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4 relative z-10 max-w-5xl mx-auto w-full">
        {/* Sweet motivational header badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-girly-pink-100/70 dark:bg-girly-pink-950/40 border border-girly-pink-200/50 text-girly-pink-600 dark:text-girly-pink-300 text-xs font-bold tracking-wide uppercase mb-6 animate-bubbly">
          🌸 A sweet way to study and shine 🌟
        </div>

        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-800 dark:text-neutral-50 leading-tight font-display">
            📚 Welcome to <span className="bg-gradient-to-r from-girly-pink-500 via-girly-pink-600 to-girly-lavender-550 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(236,72,153,0.15)]">Study Buddy</span> 💖
          </h1>
          <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed font-sans font-medium">
            Your adorable AI-powered learning helper! We generate sweet, customizable flashcards and fun quizzes to help you learn and retain anything you want. ✨
          </p>
        </div>

        {/* Bubbly Glass Input Panel */}
        <div className="w-full max-w-md bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg rounded-3xl border border-girly-pink-200/60 dark:border-girly-pink-900/40 shadow-[0_12px_40px_rgba(251,113,133,0.15)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] p-6 sm:p-8 mb-12 transform hover:scale-[1.01] transition-transform duration-300">
          <TopicInput />
        </div>

        {topics.length > 0 && (
          <div className="w-full max-w-md">
            <h3 className="text-lg font-bold text-neutral-850 dark:text-neutral-100 mb-4 flex items-center gap-2 font-display">
              <span className="text-girly-pink-500">📖</span> Your Custom Topics
            </h3>
            <div className="space-y-3">
              {topics.map((t) => (
                <Link
                  key={t.id}
                  href={`/topics?topicId=${t.id}`}
                  className="group flex items-center justify-between w-full text-left px-5 py-4 rounded-2xl bg-white/70 dark:bg-neutral-900/60 border border-girly-pink-100 dark:border-neutral-800 text-neutral-800 dark:text-neutral-150 hover:border-girly-pink-400 dark:hover:border-girly-pink-550 hover:bg-girly-pink-50/50 dark:hover:bg-girly-pink-950/20 hover:shadow-[0_8px_24px_rgba(251,113,135,0.08)] transition-all duration-300 cursor-pointer"
                >
                  <div className="pr-4">
                    <p className="font-bold text-base text-neutral-800 dark:text-neutral-100 group-hover:text-girly-pink-650 dark:group-hover:text-girly-pink-400 transition-colors">
                      {t.name}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-450 mt-1.5 line-clamp-1 font-medium">
                      {t.summary}
                    </p>
                  </div>
                  <span className="text-girly-pink-500 dark:text-girly-pink-400 text-xl font-bold transition-transform duration-300 group-hover:translate-x-1.5">
                    🎀 →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Decorative Grid Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <div className="group bg-white/60 dark:bg-neutral-900/50 backdrop-blur-md rounded-3xl border border-girly-pink-100 dark:border-neutral-800 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(251,113,133,0.08)] p-6 text-center transition-all duration-300 hover:-translate-y-1.5 cursor-default">
            <p className="text-4xl mb-4 group-hover:scale-110 transition-transform">🧸</p>
            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-2 font-display bg-gradient-to-r from-girly-pink-500 to-girly-pink-600 bg-clip-text text-transparent">
              Cute Flashcards
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
              Interactive flashcards with beautiful 3D flipping effects to study, remember, and check important ideas.
            </p>
          </div>
          
          <div className="group bg-white/60 dark:bg-neutral-900/50 backdrop-blur-md rounded-3xl border border-girly-pink-100 dark:border-neutral-800 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(251,113,133,0.08)] p-6 text-center transition-all duration-300 hover:-translate-y-1.5 cursor-default">
            <p className="text-4xl mb-4 group-hover:scale-110 transition-transform">🍰</p>
            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-2 font-display bg-gradient-to-r from-girly-lavender-550 to-girly-pink-500 bg-clip-text text-transparent">
              Recall Quizzes
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
              Test yourself with cute multiple-choice quizzes created in real-time by your friendly AI assistant.
            </p>
          </div>

          <div className="group bg-white/60 dark:bg-neutral-900/50 backdrop-blur-md rounded-3xl border border-girly-pink-100 dark:border-neutral-800 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(251,113,133,0.08)] p-6 text-center transition-all duration-300 hover:-translate-y-1.5 cursor-default">
            <p className="text-4xl mb-4 group-hover:scale-110 transition-transform">🦄</p>
            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-2 font-display bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              Magical Progress
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
              Track achievements, sweet review milestones, average quiz scores, and stay motivated with adorable badges!
            </p>
          </div>
        </div>

        {/* Motivational bottom banner */}
        <div className="mt-20 text-center text-xs font-semibold text-girly-pink-400 dark:text-girly-pink-600 uppercase tracking-widest">
          🌸 ✨ Keep going, you're doing amazing! ✨ 🌸
        </div>
      </main>
    </div>
  );
}
