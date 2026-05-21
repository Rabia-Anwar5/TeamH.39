// app/lib/api.ts

/**
 * Sends a study topic to our localized Next.js API route handler
 * to generate flashcards and quizzes via the Gemini API.
 */
export async function generateStudyMaterials(topicName: string) {
  try {
    // 1. Direct fetch targeting our unified generation endpoint
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic: topicName }),
    });

    // 2. Catch route or API errors safely
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Frontend API helper received route error:', errorData);
      throw new Error(errorData.error || 'Failed to generate study materials');
    }

    // 3. Parse and return the clean structured data object
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error within generateStudyMaterials lifecycle:', error);
    throw error;
  }
}