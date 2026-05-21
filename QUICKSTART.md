# Study Buddy - Quick Start Guide

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Step 1: Install Dependencies
```bash
cd study-buddy
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## User Guide

### Creating Your First Study Topic

1. **Navigate to Home Page**
   - You'll see the Welcome to Study Buddy page

2. **Enter a Topic Name**
   - Type any subject you want to study
   - Examples: "World War 2", "Photosynthesis", "JavaScript ES6"

3. **Click "Generate Study Materials"**
   - The app will generate:
     - 5 interactive flashcards
     - 1 quiz with 3 questions
     - Progress tracking automatically starts

4. **You'll be redirected to the Study Page**
   - Your topic appears with all materials ready

### Using Flashcards

1. **Open a Topic**
   - Click on any topic from your list

2. **Go to Flashcards Tab**
   - Shows count: "🎯 Flashcards (5)"

3. **Study Flashcards**
   - **Click any card** to flip and reveal answer
   - **Previous/Next buttons** to navigate
   - Card counter shows "Card X of Y"

4. **Tips**
   - Take time to think before flipping
   - Active recall improves retention
   - Repeat cards until you know them

### Taking a Quiz

1. **Click Quiz Tab**
   - Shows count: "📝 Quiz (3)"

2. **Answer Questions**
   - Select one option per question
   - Use Previous/Next to review answers

3. **Submit Quiz**
   - After last question, click "Submit Quiz"
   - See your score and percentage

4. **View Results**
   - Shows: "You got X out of Y questions correct"
   - Retake quiz if needed

### Tracking Progress

1. **Navigate to Progress Page**
   - Use navbar or click "Progress" link

2. **View Statistics**
   - Total flashcards learned
   - Total quizzes completed
   - Average score across all quizzes

3. **Per-Topic Breakdown**
   - See progress for each topic
   - Visual progress bars
   - Last review date

### Managing Topics

1. **View All Topics**
   - Home page shows all your topics
   - Click to study or use delete button

2. **Delete a Topic**
   - Topics list has delete button
   - Removes all associated data

3. **Create New Topic**
   - Use the input form on home page anytime

## Features Overview

### 🎯 Flashcards
- Interactive flip animation
- Click to reveal answers
- Easy navigation
- Spaced repetition ready

### 📝 Quizzes
- Multiple choice questions
- Instant scoring
- Review mode
- Performance tracking

### 📊 Progress Tracking
- Overall statistics
- Per-topic metrics
- Visual progress indicators
- History tracking

### 💾 Data Persistence
- All data saved automatically
- Survives browser refresh
- Works offline (locally stored)

## Keyboard Shortcuts (Coming Soon)

- `Spacebar` - Flip flashcard
- `→` - Next card/question
- `←` - Previous card/question
- `Enter` - Submit quiz

## Tips for Effective Learning

1. **Spaced Repetition**
   - Study same topic multiple times
   - Track progress over days

2. **Active Recall**
   - Try answering before flipping card
   - Improves memory retention

3. **Quiz Mode**
   - Test yourself regularly
   - Identifies weak areas

4. **Consistent Review**
   - Review last studied date in progress
   - Daily practice recommended

## Troubleshooting

### Data Not Saving
- Check browser's LocalStorage is enabled
- Try different browser
- Clear cache and reload

### Flashcard Not Flipping
- Click directly on card area
- Ensure JavaScript is enabled
- Try refreshing page

### Quiz Not Showing Results
- Complete all questions (don't skip)
- Click "Submit Quiz" button
- Check browser console for errors

### Page Loading Slowly
- Clear browser cache
- Reduce number of topics
- Try disabling browser extensions

## Keyboard Navigation

- `Tab` - Navigate between elements
- `Enter` - Activate buttons and links
- `Space` - Scroll and interact

## Future Features (Coming in Part 3 & 4)

✨ **AI-Powered Generation**
- Smart flashcard creation
- Contextual questions
- Adaptive difficulty

✨ **Cloud Sync**
- Study on multiple devices
- Real-time backup
- Collaboration features

✨ **Advanced Analytics**
- Learning curves
- Weak area identification
- Performance predictions

## Support

For issues or suggestions:
1. Check this guide first
2. Review PART2_COMPLETE.md for technical details
3. Check console for error messages

---

**Happy Learning! 📚**

*Last Updated: May 21, 2026*
