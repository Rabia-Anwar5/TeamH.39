// Context for managing study materials and progress
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Topic, Flashcard, Quiz, UserProgress } from '@/app/types';
import {
  getTopics,
  saveTopics,
  getFlashcards,
  saveFlashcards,
  getQuizzes,
  saveQuizzes,
  getProgress,
  saveProgress,
  generateId,
} from '@/app/lib/storage';

interface StudyContextType {
  topics: Topic[];
  flashcards: Flashcard[];
  quizzes: Quiz[];
  progress: UserProgress[];
  currentTopic: Topic | null;
  
  addTopic: (title: string, description: string) => void;
  addFlashcard: (topicId: string, question: string, answer: string) => void;
  addQuiz: (quiz: Quiz) => void;
  updateProgress: (topicId: string, score: number, total: number) => void;
  getFlashcardsForTopic: (topicId: string) => Flashcard[];
  getQuizForTopic: (topicId: string) => Quiz | undefined;
  setCurrentTopic: (topic: Topic | null) => void;
  deleteTopic: (topicId: string) => void;
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export function StudyProvider({ children }: { children: React.ReactNode }) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    setTopics(getTopics());
    setFlashcards(getFlashcards());
    setQuizzes(getQuizzes());
    setProgress(getProgress());
  }, []);

  // Save topics whenever they change
  useEffect(() => {
    saveTopics(topics);
  }, [topics]);

  // Save flashcards whenever they change
  useEffect(() => {
    saveFlashcards(flashcards);
  }, [flashcards]);

  // Save quizzes whenever they change
  useEffect(() => {
    saveQuizzes(quizzes);
  }, [quizzes]);

  // Save progress whenever it changes
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const addTopic = (title: string, description: string) => {
    const newTopic: Topic = {
      id: generateId(),
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTopics([...topics, newTopic]);
  };

  const addFlashcard = (topicId: string, question: string, answer: string) => {
    const newFlashcard: Flashcard = {
      id: generateId(),
      topicId,
      question,
      answer,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setFlashcards([...flashcards, newFlashcard]);
  };

  const addQuiz = (quiz: Quiz) => {
    setQuizzes([...quizzes, quiz]);
  };

  const updateProgress = (topicId: string, score: number, total: number) => {
    const existingProgress = progress.find((p) => p.topicId === topicId);
    const newProgress: UserProgress = {
      id: existingProgress?.id || generateId(),
      userId: 'user_1', // TODO: Replace with actual user ID
      topicId,
      flashcardsLearned: existingProgress?.flashcardsLearned || 0,
      quizzesCompleted: (existingProgress?.quizzesCompleted || 0) + 1,
      averageScore:
        existingProgress && existingProgress.quizzesCompleted > 0
          ? (existingProgress.averageScore * existingProgress.quizzesCompleted + (score / total) * 100) /
            (existingProgress.quizzesCompleted + 1)
          : (score / total) * 100,
      lastReviewDate: new Date(),
      createdAt: existingProgress?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (existingProgress) {
      setProgress(progress.map((p) => (p.topicId === topicId ? newProgress : p)));
    } else {
      setProgress([...progress, newProgress]);
    }
  };

  const getFlashcardsForTopic = (topicId: string) => {
    return flashcards.filter((fc) => fc.topicId === topicId);
  };

  const getQuizForTopic = (topicId: string) => {
    return quizzes.find((q) => q.topicId === topicId);
  };

  const deleteTopic = (topicId: string) => {
    setTopics(topics.filter((t) => t.id !== topicId));
    setFlashcards(flashcards.filter((fc) => fc.topicId !== topicId));
    setQuizzes(quizzes.filter((q) => q.topicId !== topicId));
    setProgress(progress.filter((p) => p.topicId !== topicId));
  };

  return (
    <StudyContext.Provider
      value={{
        topics,
        flashcards,
        quizzes,
        progress,
        currentTopic,
        addTopic,
        addFlashcard,
        addQuiz,
        updateProgress,
        getFlashcardsForTopic,
        getQuizForTopic,
        setCurrentTopic,
        deleteTopic,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (context === undefined) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
}
