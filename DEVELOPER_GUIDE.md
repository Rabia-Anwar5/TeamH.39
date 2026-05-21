# Study Buddy - Developer Guide for Part 3 & 4

## Architecture Overview

### Current Tech Stack
- **Frontend**: Next.js 16 + React 19 + TypeScript
- **Styling**: Tailwind CSS + PostCSS
- **State Management**: React Context API
- **Storage**: Browser LocalStorage
- **Build Tool**: Turbopack (via Next.js)

### Project Structure
```
study-buddy/
├── app/
│   ├── components/           # Reusable React components
│   ├── context/             # State management (StudyContext)
│   ├── api/                 # API routes (ready for integration)
│   ├── types/               # TypeScript definitions
│   ├── lib/                 # Utility functions
│   ├── styles/              # Custom CSS
│   ├── topics/              # Pages
│   ├── progress/            # Pages
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Home page
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README files
```

## Part 3: AI API Integration Guide

### Goal
Replace mock data generation with real AI-powered flashcard and quiz generation.

### Implementation Steps

#### Step 1: Choose AI Service
Options:
1. **OpenAI API** (Recommended)
   - Most mature API
   - Best for text generation
   - Fair pricing

2. **Anthropic Claude API**
   - Very capable
   - Good for long-form content
   - Faster responses

3. **Google Gemini API**
   - Good alternative
   - Integrated with Google Cloud

#### Step 2: Setup API Keys
```env
# .env.local
OPENAI_API_KEY=your_key_here
```

#### Step 3: Install Dependencies
```bash
npm install openai
# or
npm install @anthropic-ai/sdk
```

#### Step 4: Update API Routes

**File: `/api/flashcards/generate/route.ts`**
```typescript
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const { topic } = await request.json();

  const message = await openai.messages.create({
    model: 'gpt-4',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `Generate 5 flashcards for the topic "${topic}". 
        Format as JSON array with objects containing "question" and "answer" fields.
        Make questions clear and answers concise.`,
      },
    ],
  });

  // Parse response and return flashcards
  return NextResponse.json(parsedFlashcards);
}
```

**File: `/api/quiz/generate/route.ts`**
```typescript
// Similar approach for quiz generation
// Generate 3-5 multiple choice questions
// Each with 4 options and correct answer
```

#### Step 5: Update Frontend Components

**File: `TopicInput.tsx`**
```typescript
// Replace generateMockFlashcards with:
const response = await fetch('/api/flashcards/generate', {
  method: 'POST',
  body: JSON.stringify({ topic })
});
const flashcards = await response.json();

// Similar for quizzes
```

### Part 3 Checklist
- [ ] Choose and setup AI service
- [ ] Create API keys in environment
- [ ] Update `/api/flashcards/generate/route.ts`
- [ ] Update `/api/quiz/generate/route.ts`
- [ ] Test with real topics
- [ ] Add error handling and retries
- [ ] Implement rate limiting
- [ ] Add loading states UI
- [ ] Test streaming responses
- [ ] Document AI prompts used

---

## Part 4: Database Integration Guide

### Goal
Replace LocalStorage with persistent database backend.

### Recommended Database Options

1. **Supabase** (Easiest)
   - PostgreSQL backend
   - Built-in auth
   - Real-time subscriptions
   - Free tier available

2. **MongoDB + Vercel**
   - Flexible schema
   - Good for document storage
   - Scales well

3. **Firebase**
   - Real-time database
   - Built-in auth
   - Easy scaling

### Implementation Steps

#### Step 1: Choose Database
Recommendation: **Supabase** (easiest to setup)

#### Step 2: Setup Project
```bash
# Create Supabase project
npm install @supabase/supabase-js
```

#### Step 3: Create Database Schema
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Topics table
CREATE TABLE topics (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Flashcards table
CREATE TABLE flashcards (
  id UUID PRIMARY KEY,
  topic_id UUID REFERENCES topics(id),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Quizzes table
CREATE TABLE quizzes (
  id UUID PRIMARY KEY,
  topic_id UUID REFERENCES topics(id),
  title VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Quiz questions table
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY,
  quiz_id UUID REFERENCES quizzes(id),
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Progress table
CREATE TABLE progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  topic_id UUID REFERENCES topics(id),
  flashcards_learned INT,
  quizzes_completed INT,
  average_score FLOAT,
  last_review_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Quiz attempts table
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  quiz_id UUID REFERENCES quizzes(id),
  score INT,
  total_questions INT,
  attempted_at TIMESTAMP DEFAULT NOW()
);
```

#### Step 4: Create Supabase Client
**File: `lib/supabase.ts`**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

#### Step 5: Update API Routes
Replace LocalStorage calls with database queries:

```typescript
// /api/topics/route.ts
import { supabase } from '@/app/lib/supabase';

export async function GET(request: NextRequest) {
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const { title, description, user_id } = await request.json();

  const { data, error } = await supabase
    .from('topics')
    .insert([{ title, description, user_id }])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data[0]);
}
```

#### Step 6: Add Authentication
```typescript
// app/context/AuthContext.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase';
import { Session } from '@supabase/supabase-js';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  return session;
}
```

#### Step 7: Update Context Provider
**File: `context/StudyContext.tsx`**
```typescript
// Replace localStorage with Supabase queries
// Use useAuth() to get current user
// Fetch topics from database instead of localStorage
```

### Part 4 Checklist
- [ ] Choose database service
- [ ] Create project and tables
- [ ] Setup environment variables
- [ ] Create Supabase client
- [ ] Implement authentication
- [ ] Update API routes for database
- [ ] Migrate LocalStorage to queries
- [ ] Add error handling
- [ ] Test all CRUD operations
- [ ] Setup real-time subscriptions (optional)
- [ ] Add backup strategy

---

## Common Integration Issues & Solutions

### API Rate Limiting
```typescript
// Add retry logic with exponential backoff
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }
}
```

### Database Connection Issues
```typescript
// Add connection pooling and error handling
import { Pool } from 'pg';

const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

### Type Safety Across API Boundary
```typescript
// Generate types from database schema
npm install -D @supabase/gotrue-js-types

// Use generated types in components
import { Database } from '@/types/database.types';
type Topics = Database['public']['Tables']['topics']['Row'];
```

---

## Performance Optimization Tips

1. **Caching**
   - Cache flashcards/quizzes locally
   - Implement cache invalidation strategy

2. **Pagination**
   - Load topics 10 at a time
   - Implement infinite scroll

3. **Lazy Loading**
   - Load quiz questions as needed
   - Stream quiz results

4. **Database Indexing**
   - Index on user_id and topic_id
   - Index on created_at for sorting

5. **CDN**
   - Deploy static assets to CDN
   - Cloudflare recommended

---

## Testing Strategy

### Unit Tests
```typescript
// jest.config.js setup
// Test StudyContext
// Test components isolation
```

### Integration Tests
```typescript
// Test API routes
// Test database operations
```

### E2E Tests
```typescript
// Use Playwright or Cypress
// Test full user workflows
```

---

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Additional Resources

- OpenAI Docs: https://platform.openai.com/docs
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs

---

**Ready to build? Let's go! 🚀**
