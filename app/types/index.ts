// app/types/index.ts

// 1. Basic Flashcard Interface
export interface Flashcard {
  id?: string;
  topicId?: string;
  front: string;
  back: string;
  isLearned?: boolean;
}

// 2. Individual Quiz Question Interface
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

// 3. Quiz Group Interface
export interface Quiz {
  id?: string;
  topicId?: string;
  questions: QuizQuestion[];
}

// 4. Topic Interface (Fixes the 'Topic' squiggly)
export interface Topic {
  id: string;
  name: string;
  createdAt: string;
  summary?: string;
}

// 5. Individual Quiz Attempt Tracker (Fixes the 'QuizAttempt' squiggly)
export interface QuizAttempt {
  id: string;
  topicId: string;
  date: string;
  score: number;
  totalQuestions: number;
}

// 6. Overall User Progress Interface (Fixes the 'UserProgress' squiggly)
export interface UserProgress {
  topicsCompleted: string[]; // Array of topic IDs
  totalQuizzesTaken: number;
  averageScore: number;
  recentAttempts: QuizAttempt[];
}

// 7. Combined Study Material Interface (Used when AI generates a package)
export interface StudyMaterial {
  summary: string;
  flashcards: Flashcard[];
  quiz: Quiz;
}
// app/types/index.ts

export interface TopicProgress {
  topicId: string;
  averageScore: number;
  flashcardsLearned: number;
  quizzesCompleted: number;
  lastReviewDate: string; // Resolves progress.lastReviewDate
}

// Update your main UserProgress interface to hold an array of these item breakdowns
export interface UserProgress {
  topicsProgress: TopicProgress[]; // Contains all individual topic progress metrics
  totalQuizzesTaken: number;
  overallAverageScore: number;
}