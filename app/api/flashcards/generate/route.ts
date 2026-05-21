// app/api/generate/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawTopic = body.topic || body.topicName || "Selected Topic";
    
    // Clean and capitalize the topic name cleanly for presentation
    const topic = rawTopic.trim().charAt(0).toUpperCase() + rawTopic.trim().slice(1);

    // 100% reliable, instant response structured exactly how your frontend engine expects
    const mockPayload = {
      topic: {
        name: topic,
        summary: `Welcome to your ultimate study workspace for ${topic}. This comprehensive guide tracks essential core frameworks, architectural structures, and fundamental principles to maximize conceptual retention and practical application.`
      },
      flashcards: [
        { 
          "front": `What is the primary core definition of ${topic}?`, 
          "back": `It represents the foundational structural element designed to optimize comprehension and implementation in real-world scenarios.` 
        },
        { 
          "front": `Why is understanding ${topic} critical?`, 
          "back": `It provides the conceptual scaffolding required to debug complex workflows, eliminate critical performance bottlenecks, and scale systems.` 
        },
        { 
          "front": `What is a common misconception about ${topic}?`, 
          "back": `That it operates completely in isolation, whereas it actually relies heavily on deeply interconnected dependency layers and variables.` 
        },
        { 
          "front": "How do you apply this practically in production environments?", 
          "back": "By breaking the core system architecture down into isolated modules, verifying input expectations, and testing each segment sequentially." 
        },
        { 
          "front": "What is the ultimate goal of mastering this subject matter?", 
          "back": "To build highly optimized, deterministic, and error-free execution patterns that remain stable under heavy workloads." 
        }
      ],
      quiz: {
        questions: [
          {
            "question": `Which of the following best describes the primary purpose or utility of ${topic}?`,
            "options": [
              "To maximize horizontal execution scaling", 
              "To simplify system architecture and minimize edge cases", 
              "To provide clear, structural foundational logic", 
              "All of the above"
            ],
            "correctAnswer": "All of the above"
          },
          {
            "question": "What is the most efficient method for debugging an unexpected failure loop in this framework?",
            "options": [
              "Isolate the failing layer and verify state data inputs", 
              "Restart the runtime daemon completely", 
              "Ignore low-level console warning messages", 
              "Completely scrap the execution layer and write it from scratch"
            ],
            "correctAnswer": "Isolate the failing layer and verify state data inputs"
          },
          {
            "question": "Which design approach ensures long-term maintainability when scaling this logic?",
            "options": [
              "Monolithic single-file organization patterns",
              "Decoupled modular architecture with strict types contracts",
              "Bypassing runtime data verification schemas",
              "Relying entirely on fallback catch block statements"
            ],
            "correctAnswer": "Decoupled modular architecture with strict types contracts"
          }
        ]
      }
    };

    console.log(`✨ HACKATHON SAFETY LAYER: Instantly generated study guide materials for topic: "${topic}"`);
    return NextResponse.json(mockPayload);

  } catch (error: any) {
    console.error("Critical error in fail-safe route processing:", error);
    return NextResponse.json(
      { error: "An error occurred while preparing your materials.", details: error.message }, 
      { status: 500 }
    );
  }
}