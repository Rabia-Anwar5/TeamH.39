import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Validate API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured. Please set OPENAI_API_KEY in .env.local' },
        { status: 500 }
      );
    }

    const { topicName, topicId } = await request.json();

    // Validate input
    if (!topicName || !topicId) {
      return NextResponse.json(
        { error: 'topicName and topicId are required' },
        { status: 400 }
      );
    }

    // Trim topic name to prevent token issues
    const cleanTopicName = topicName.substring(0, 100);

    const prompt = `Generate exactly 5 high-quality flashcard question-answer pairs for the topic: "${cleanTopicName}"

Requirements:
- Each pair should be educational and clear
- Questions should be specific and not too broad
- Answers should be concise but complete (1-2 sentences max)
- Include a mix of definition, concept, and application questions
- Format as a JSON array with this exact structure:

[
  {
    "question": "Question text here?",
    "answer": "Concise answer here."
  }
]

Only respond with the JSON array, no other text.`;

    const message = await openai.messages.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Extract text content
    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from OpenAI');
    }

    // Parse the response - extract JSON from potential markdown code blocks
    let jsonText = content.text.trim();
    
    // Remove markdown code blocks if present
    if (jsonText.includes('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (jsonText.includes('```')) {
      jsonText = jsonText.replace(/```\n?/g, '');
    }
    
    jsonText = jsonText.trim();

    let flashcards;
    try {
      flashcards = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', jsonText);
      return NextResponse.json(
        { error: 'Failed to parse AI response. Please try again.' },
        { status: 500 }
      );
    }

    // Validate and clean flashcards
    if (!Array.isArray(flashcards)) {
      return NextResponse.json(
        { error: 'Invalid response format from AI' },
        { status: 500 }
      );
    }

    // Ensure we have exactly 5 flashcards
    const validFlashcards = flashcards.slice(0, 5).map((card: any, index: number) => ({
      id: `fc-${Date.now()}-${index}`,
      topicId: topicId,
      question: String(card.question || '').substring(0, 500),
      answer: String(card.answer || '').substring(0, 500),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    if (validFlashcards.length === 0) {
      return NextResponse.json(
        { error: 'No valid flashcards generated' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      flashcards: validFlashcards,
      count: validFlashcards.length,
    });

  } catch (error) {
    console.error('Flashcard generation error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    // Check for specific OpenAI errors
    if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
      return NextResponse.json(
        { error: 'Invalid OpenAI API key. Please check your OPENAI_API_KEY in .env.local' },
        { status: 401 }
      );
    }
    
    if (errorMessage.includes('rate_limit')) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: `Failed to generate flashcards: ${errorMessage}` },
      { status: 500 }
    );
  }
}
