// app/components/TopicInput.tsx
'use client';

import React, { useState } from 'react';
// 1. Fixed path imports to direct relative paths
import { useStudy } from '../context/StudyContext';
import { Quiz, QuizQuestion } from '../types';
import { generateId } from '../lib/storage';

export default function TopicInput() {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { addTopic, addFlashcard, addQuiz } = useStudy();

  const generateMockFlashcards = (topicName: string, topicId: string) => {
    const mockQuestions = [
      `What is ${topicName}?`,
      `Explain the key concepts of ${topicName}`,
      `What are the main characteristics of ${topicName}?`,
      `How does ${topicName} relate to real-world applications?`,
      `What are common misconceptions about ${topicName}?`,
    ];

    const mockAnswers = [
      `${topicName} is a comprehensive subject covering various important aspects and fundamental principles.`,
      `The key concepts include foundational theories, practical applications, and interconnected ideas that build upon each other.`,
      `Main characteristics include structure, function, relevance, and applicability in different contexts.`,
      `${topicName} has numerous applications in everyday life, industry, and scientific research.`,
      `Common misconceptions often relate to oversimplified views or incomplete understanding of complex relationships.`,
    ];

    mockQuestions.forEach((q, idx) => {
      addFlashcard(topicId, q, mockAnswers[idx]);
    });
  };

  const generateMockQuiz = (topicName: string, topicId: string) => {
    // 2. Aligned this array strictly with the QuizQuestion type contract
    const mockQuestions: QuizQuestion[] = [
      {
        question: `Which statement best describes ${topicName}?`,
        options: [
          'Option A: A comprehensive approach to understanding',
          'Option B: A limited perspective on the subject',
          'Option C: An outdated theory no longer relevant',
          'Option D: A basic introduction only',
        ],
        correctAnswer: 'Option A: A comprehensive approach to understanding',
      },
      {
        question: `What is the primary focus of ${topicName}?`,
        options: [
          'Understanding foundational concepts',
          'Memorizing definitions',
          'Ignoring practical applications',
          'Avoiding complex topics',
        ],
        correctAnswer: 'Understanding foundational concepts',
      },
      {
        question: `How can ${topicName} be applied?`,
        options: [
          'In various real-world contexts and industries',
          'Only in academic settings',
          'Not at all in practice',
          'Limited to specific scenarios',
        ],
        correctAnswer: 'In various real-world contexts and industries',
      },
    ];

    const quiz: Quiz = {
      id: generateId(),
      topicId,
      questions: mockQuestions,
    };

    addQuiz(quiz);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create new topic
      const newTopicId = generateId();
      addTopic(topic, `Study materials for ${topic}`);

      // Generate mock flashcards and quiz
      generateMockFlashcards(topic, newTopicId);
      generateMockQuiz(topic, newTopicId);

      // Navigate to topics page
      window.location.href = `/topics?topicId=${newTopicId}`;

      setTopic('');
    } catch (err) {
      setError('Failed to generate study materials. Please try again.');
      console.error(err);
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
            placeholder="e.g., World War 2, Photosynthesis, Python Basics..."
            className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            disabled={isLoading}
          />
        </div>
        {error && <div className="text-sm text-red-600 dark:text-red-400">{error}</div>}
        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="w-full px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors cursor-pointer"
        >
          {isLoading ? 'Generating...' : 'Generate Study Materials'}
        </button>
      </div>
    </form>
  );
}