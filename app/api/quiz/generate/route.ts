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

    const prompt = `Generate exactly 3 multiple-choice quiz questions for the topic: "${cleanTopicName}"

Requirements:
- Each question should test understanding of key concepts
- Provide 4 options for each question
- Clearly mark which option is correct
- Include a brief explanation for why the answer is correct
- Format as a JSON array with this exact structure:

[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Option A",
    "explanation": "This is correct because..."
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

    let questions;
    try {
      questions = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', jsonText);
      return NextResponse.json(
        { error: 'Failed to parse AI response. Please try again.' },
        { status: 500 }
      );
    }

    // Validate and clean questions
    if (!Array.isArray(questions)) {
      return NextResponse.json(
        { error: 'Invalid response format from AI' },
        { status: 500 }
      );
    }

    // Ensure we have exactly 3 questions
    const validQuestions = questions.slice(0, 3).map((q: any, index: number) => ({
      id: `q-${Date.now()}-${index}`,
      question: String(q.question || '').substring(0, 500),
      options: Array.isArray(q.options)
        ? q.options.slice(0, 4).map((opt: any) => String(opt).substring(0, 200))
        : ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: String(q.correctAnswer || q.options?.[0] || 'Option A').substring(0, 200),
      explanation: String(q.explanation || 'Check your understanding').substring(0, 500),
    }));

    if (validQuestions.length === 0) {
      return NextResponse.json(
        { error: 'No valid questions generated' },
        { status: 500 }
      );
    }

    const quiz = {
      id: `quiz-${Date.now()}`,
      topicId: topicId,
      title: `Quiz: ${cleanTopicName}`,
      questions: validQuestions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      quiz: quiz,
    });

  } catch (error) {
    console.error('Quiz generation error:', error);
    
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
      { error: `Failed to generate quiz: ${errorMessage}` },
      { status: 500 }
    );
  }
}
