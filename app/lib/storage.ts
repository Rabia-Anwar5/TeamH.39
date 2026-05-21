// Utility functions for API calls and local storage
import { Topic, Flashcard, Quiz, UserProgress, QuizAttempt } from '@/app/types';

// Local Storage Functions
export const localStorageKeys = {
  topics: 'study_buddy_topics',
  flashcards: 'study_buddy_flashcards',
  quizzes: 'study_buddy_quizzes',
  progress: 'study_buddy_progress',
  quizAttempts: 'study_buddy_quiz_attempts',
};

export function saveTopics(topics: Topic[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(localStorageKeys.topics, JSON.stringify(topics));
  }
}

export function getTopics(): Topic[] {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(localStorageKeys.topics);
    return data ? JSON.parse(data) : [];
  }
  return [];
}

export function saveFlashcards(flashcards: Flashcard[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(localStorageKeys.flashcards, JSON.stringify(flashcards));
  }
}

export function getFlashcards(): Flashcard[] {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(localStorageKeys.flashcards);
    return data ? JSON.parse(data) : [];
  }
  return [];
}

export function saveQuizzes(quizzes: Quiz[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(localStorageKeys.quizzes, JSON.stringify(quizzes));
  }
}

export function getQuizzes(): Quiz[] {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(localStorageKeys.quizzes);
    return data ? JSON.parse(data) : [];
  }
  return [];
}

export function saveProgress(progress: UserProgress[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(localStorageKeys.progress, JSON.stringify(progress));
  }
}

export function getProgress(): UserProgress[] {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(localStorageKeys.progress);
    return data ? JSON.parse(data) : [];
  }
  return [];
}

// Generate unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}
