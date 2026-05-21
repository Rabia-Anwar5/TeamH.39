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

    // TODO: Integrate with AI API to generate flashcards
    // This will be implemented in Part 3

    const mockFlashcards = [
      {
        id: '1',
        topicId: topic,
        question: 'Sample Question 1',
        answer: 'Sample Answer 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        topicId: topic,
        question: 'Sample Question 2',
        answer: 'Sample Answer 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return NextResponse.json(mockFlashcards);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate flashcards' },
      { status: 500 }
    );
  }
}
