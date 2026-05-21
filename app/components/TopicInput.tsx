// app/components/TopicInput.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStudy } from '../context/StudyContext';
import { generateStudyMaterials } from '../lib/api';
import { getTopics, getFlashcards, getQuizzes, saveTopics, saveFlashcards, saveQuizzes, generateId } from '../lib/storage';
import { Flashcard, QuizQuestion, Quiz, Topic } from '../types';

export default function TopicInput() {
  const router = useRouter();
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { addTopic, addFlashcard, addQuiz } = useStudy();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setIsLoading(true);

    try {
      const aiData = await generateStudyMaterials(topic.trim());

      if (!aiData || !aiData.topic || !aiData.flashcards || !aiData.quiz) {
        throw new Error('Invalid content payload returned from synthesis layer');
      }

      const targetTopicId = generateId();

      // 1. Build unified local object representations matching types
      const newTopic: Topic = {
        id: targetTopicId,
        name: aiData.topic.name,
        summary: aiData.topic.summary,
        createdAt: new Date().toISOString()
      };

      const newCards: Flashcard[] = aiData.flashcards.map((card: any) => ({
        id: generateId(),
        topicId: targetTopicId,
        front: card.front,
        back: card.back
      }));

      const typedQuestions: QuizQuestion[] = aiData.quiz.questions.map((q: any) => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer
      }));

      const newQuiz: Quiz = {
        id: generateId(),
        topicId: targetTopicId,
        questions: typedQuestions
      };

      // 2. Direct atomic local storage write to secure against early page unmounts
      saveTopics([...getTopics(), newTopic]);
      saveFlashcards([...getFlashcards(), ...newCards]);
      saveQuizzes([...getQuizzes(), newQuiz]);

      // 3. Keep internal React runtime context fully synced (with pre-allocated ID)
      addTopic(aiData.topic.name, aiData.topic.summary, targetTopicId);
      aiData.flashcards.forEach((c: any) => addFlashcard(targetTopicId, c.front, c.back));
      addQuiz(newQuiz);

      // 4. Smooth routing transfer over to our materials tab view
      router.push(`/topics?topicId=${targetTopicId}`);

    } catch (err: any) {
      setError('Failed to generate high-quality materials. Check your GEMINI_API_KEY config entry.');
      console.error('AI Lifecycle Execution Fault:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="topic" className="block text-sm font-bold text-neutral-600 dark:text-neutral-300 font-display flex items-center gap-1">
            <span>What topic would you like to study?</span> <span className="text-girly-pink-500 animate-pulse text-base">💖</span>
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., French Vocab, DNA Replication, History... 🌸"
            className="mt-2.5 w-full px-5 py-3 border border-girly-pink-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900 text-neutral-850 dark:text-neutral-100 outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:ring-4 focus:ring-girly-pink-200/50 focus:border-girly-pink-400 font-sans font-medium text-sm transition-all duration-300"
            disabled={isLoading}
          />
        </div>
        
        {error && (
          <div className="text-xs text-girly-pink-600 dark:text-girly-pink-400 font-bold bg-girly-pink-50/80 dark:bg-girly-pink-950/20 px-3.5 py-2.5 rounded-xl border border-girly-pink-100 dark:border-girly-pink-900/40">
            🍭 {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="w-full px-6 py-3.5 bg-gradient-to-r from-girly-pink-500 to-girly-pink-650 dark:from-girly-pink-600 dark:to-girly-pink-700 disabled:from-neutral-300 disabled:to-neutral-350 dark:disabled:from-neutral-800 dark:disabled:to-neutral-850 disabled:cursor-not-allowed hover:shadow-[0_6px_20px_rgba(236,72,153,0.3)] disabled:shadow-none text-white font-bold rounded-2xl transition-all duration-300 transform active:scale-95 hover:scale-[1.02] cursor-pointer text-sm font-display flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="flex items-center gap-2 animate-pulse">
              <span className="text-lg animate-spin inline-block">✨</span>
              <span>Sprinkling AI magic... 🦄</span>
            </div>
          ) : (
            <>
              <span>Generate AI Study Materials</span>
              <span>🌸</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}