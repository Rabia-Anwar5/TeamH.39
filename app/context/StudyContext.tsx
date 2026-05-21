// app/context/StudyContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
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
  
  // 1. Updated addTopic signature to return the newly minted ID string (supporting pre-allocated IDs)
  addTopic: (name: string, summary: string, id?: string) => string;
  addFlashcard: (topicId: string, front: string, back: string) => void;
  addQuiz: (quiz: Quiz) => void;
  updateProgress: (topicId: string, score: number, total: number) => void;
  updateFlashcardProgress: (topicId: string, learnedCount: number) => void;
  getFlashcardsForTopic: (topicId: string) => Flashcard[];
  getQuizForTopic: (topicId: string) => Quiz | undefined;
  setCurrentTopic: (topic: Topic | null) => void;
  deleteTopic: (topicId: string) => void;
  toggleFlashcardLearned: (flashcardId: string) => void;
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export function StudyProvider({ children }: { children: React.ReactNode }) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [progress, setProgress] = useState<TopicProgress[]>([]);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);

  // Load data safely from localStorage on component mount
  useEffect(() => {
    setTopics(getTopics() || []);
    setFlashcards(getFlashcards() || []);
    setQuizzes(getQuizzes() || []);
    setProgress(getProgress() || []);
  }, []);

  // Synchronize runtime application states with client engine local storage
  useEffect(() => { saveTopics(topics); }, [topics]);
  useEffect(() => { saveFlashcards(flashcards); }, [flashcards]);
  useEffect(() => { saveQuizzes(quizzes); }, [quizzes]);
  useEffect(() => { saveProgress(progress); }, [progress]);

  // 2. Implemented the atomic ID return configuration to eliminate state-lookup latency (supporting pre-allocated IDs)
  const addTopic = (name: string, summary: string, id?: string): string => {
    const targetId = id || generateId();
    const newTopic: Topic = {
      id: targetId,
      name,
      summary,
      createdAt: new Date().toISOString(),
    };
    setTopics((prev) => [...prev, newTopic]);
    return targetId;
  };

  const addFlashcard = (topicId: string, front: string, back: string) => {
    const newFlashcard: Flashcard = {
      id: generateId(),
      topicId,
      front,
      back,
    };
    setFlashcards((prev) => [...prev, newFlashcard]);
  };

  const addQuiz = (quiz: Quiz) => {
    setQuizzes((prev) => [...prev, quiz]);
  };

  const updateProgress = (topicId: string, score: number, total: number) => {
    // Functional state updater to ensure calculations use current up-to-date state values
    setProgress((prevProgress) => {
      const existingProgress = prevProgress.find((p) => p.topicId === topicId);
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
        return prevProgress.map((p) => (p.topicId === topicId ? newProgress : p));
      } else {
        return [...prevProgress, newProgress];
      }
    });
  };

  const updateFlashcardProgress = (topicId: string, learnedCount: number) => {
    setProgress((prevProgress) => {
      const existingProgress = prevProgress.find((p) => p.topicId === topicId);
      
      const newProgress: TopicProgress = {
        topicId,
        flashcardsLearned: learnedCount,
        quizzesCompleted: existingProgress?.quizzesCompleted || 0,
        averageScore: existingProgress?.averageScore || 0,
        lastReviewDate: new Date().toISOString(),
      };

      if (existingProgress) {
        return prevProgress.map((p) => (p.topicId === topicId ? newProgress : p));
      } else {
        return [...prevProgress, newProgress];
      }
    });
  };

  const getFlashcardsForTopic = (topicId: string) => {
    return flashcards.filter((fc) => fc.topicId === topicId);
  };

  const getQuizForTopic = (topicId: string) => {
    return quizzes.find((q) => q.topicId === topicId);
  };

  const deleteTopic = (topicId: string) => {
    setTopics((prev) => prev.filter((t) => t.id !== topicId));
    setFlashcards((prev) => prev.filter((fc) => fc.topicId !== topicId));
    setQuizzes((prev) => prev.filter((q) => q.topicId !== topicId));
    setProgress((prev) => prev.filter((p) => p.topicId !== topicId));
  };

  const toggleFlashcardLearned = (flashcardId: string) => {
    setFlashcards((prev) => {
      const targetCard = prev.find(fc => fc.id === flashcardId);
      if (!targetCard) return prev;
      
      const updated = prev.map((fc) => 
        fc.id === flashcardId ? { ...fc, isLearned: !fc.isLearned } : fc
      );
      
      const topicId = targetCard.topicId;
      if (topicId) {
        const learnedCount = updated.filter(fc => fc.topicId === topicId && fc.isLearned).length;
        setProgress((prevProgress) => {
          const existingProgress = prevProgress.find((p) => p.topicId === topicId);
          const newProgress: TopicProgress = {
            topicId,
            flashcardsLearned: learnedCount,
            quizzesCompleted: existingProgress?.quizzesCompleted || 0,
            averageScore: existingProgress?.averageScore || 0,
            lastReviewDate: new Date().toISOString(),
          };
          if (existingProgress) {
            return prevProgress.map((p) => (p.topicId === topicId ? newProgress : p));
          } else {
            return [...prevProgress, newProgress];
          }
        });
      }
      return updated;
    });
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
        updateFlashcardProgress,
        getFlashcardsForTopic,
        getQuizForTopic,
        setCurrentTopic,
        deleteTopic,
        toggleFlashcardLearned,
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