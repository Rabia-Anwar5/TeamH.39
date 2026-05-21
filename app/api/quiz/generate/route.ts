import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    // TODO: Integrate with AI API to generate quiz
    // This will be implemented in Part 3

    const mockQuiz = {
      id: Math.random().toString(36).substring(7),
      topicId: topic,
      title: `Quiz: ${topic}`,
      questions: [
        {
          id: '1',
          question: 'Sample Question 1?',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 'Option A',
          explanation: 'This is the correct answer because...',
        },
        {
          id: '2',
          question: 'Sample Question 2?',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 'Option B',
          explanation: 'This is the correct answer because...',
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json(mockQuiz);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate quiz' },
      { status: 500 }
    );
  }
}
