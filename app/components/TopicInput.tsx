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
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            What topic would you like to study?
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Quantum Computing, Photosynthesis..."
            className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>
        {error && <div className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</div>}
        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="w-full px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors cursor-pointer"
        >
          {isLoading ? 'Generating Live AI Materials...' : 'Generate AI Study Materials'}
        </button>
      </div>
    </form>
  );
}