// Topic type
export interface Topic {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// Flashcard type
export interface Flashcard {
  id: string;
  topicId: string;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}

// Quiz type
export interface Quiz {
  id: string;
  topicId: string;
  title: string;
  questions: QuizQuestion[];
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

// Progress tracking type
export interface UserProgress {
  id: string;
  userId: string;
  topicId: string;
  flashcardsLearned: number;
  quizzesCompleted: number;
  averageScore: number;
  lastReviewDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  attemptedAt: Date;
}
