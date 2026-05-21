// API call functions
import { Topic, Flashcard, Quiz } from '@/app/types';

export async function generateStudyMaterials(topic: string) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topic }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate study materials');
  }

  return response.json();
}

export async function generateFlashcards(topic: string): Promise<Flashcard[]> {
  const response = await fetch('/api/flashcards/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topic }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate flashcards');
  }

  return response.json();
}

export async function generateQuiz(topic: string): Promise<Quiz> {
  const response = await fetch('/api/quiz/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topic }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate quiz');
  }

  return response.json();
}

export async function saveLearningMaterials(
  topic: Topic,
  flashcards: Flashcard[],
  quiz: Quiz
) {
  const response = await fetch('/api/materials/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topic, flashcards, quiz }),
  });

  if (!response.ok) {
    throw new Error('Failed to save learning materials');
  }

  return response.json();
}
