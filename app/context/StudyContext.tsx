// app/context/StudyContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
// 1. Fixed path aliases to relative locations
import { Topic, Flashcard, Quiz, TopicProgress } from '../types';
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
} from '../lib/storage';

interface StudyContextType {
  topics: Topic[];
  flashcards: Flashcard[];
  quizzes: Quiz[];
  progress: TopicProgress[];
  currentTopic: Topic | null;
  
  addTopic: (name: string, summary: string) => void;
  addFlashcard: (topicId: string, front: string, back: string) => void;
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
  // 2. Transformed array type directly into TopicProgress to match data consumers
  const [progress, setProgress] = useState<TopicProgress[]>([]);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);

  // Load data from localStorage safely on mount
  useEffect(() => {
    setTopics(getTopics() || []);
    setFlashcards(getFlashcards() || []);
    setQuizzes(getQuizzes() || []);
    setProgress(getProgress() || []);
  }, []);

  // Sync operations
  useEffect(() => { saveTopics(topics); }, [topics]);
  useEffect(() => { saveFlashcards(flashcards); }, [flashcards]);
  useEffect(() => { saveQuizzes(quizzes); }, [quizzes]);
  useEffect(() => { saveProgress(progress); }, [progress]);

  const addTopic = (name: string, summary: string) => {
    // 3. Re-mapped fields from (title/description) to correct type contracts (name/summary)
    const newTopic: Topic = {
      id: generateId(),
      name,
      summary,
      createdAt: new Date().toISOString(),
    };
    setTopics([...topics, newTopic]);
  };

  const addFlashcard = (topicId: string, front: string, back: string) => {
    // 4. Re-mapped from (question/answer) to proper type contracts (front/back)
    const newFlashcard: Flashcard = {
      id: generateId(),
      topicId,
      front,
      back,
    };
    setFlashcards([...flashcards, newFlashcard]);
  };

  const addQuiz = (quiz: Quiz) => {
    setQuizzes([...quizzes, quiz]);
  };

  const updateProgress = (topicId: string, score: number, total: number) => {
    const existingProgress = progress.find((p) => p.topicId === topicId);
    
    // Calculates precision metrics based on current active state properties
    const calculatedScore = total > 0 ? (score / total) * 100 : 0;
    const completedCount = (existingProgress?.quizzesCompleted || 0) + 1;
    
    const newProgress: TopicProgress = {
      topicId,
      flashcardsLearned: existingProgress?.flashcardsLearned || 0,
      quizzesCompleted: completedCount,
      averageScore:
        existingProgress && existingProgress.quizzesCompleted > 0
          ? (existingProgress.averageScore * existingProgress.quizzesCompleted + calculatedScore) / completedCount
          : calculatedScore,
      lastReviewDate: new Date().toISOString(),
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