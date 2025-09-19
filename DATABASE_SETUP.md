# Quiz Database Setup

This document describes the database setup for storing quiz entries and leaderboard data.

## Overview

The quiz system now uses a file-based database to store quiz entries and maintain a leaderboard. This provides persistent storage that survives browser refreshes and can be easily migrated to a proper database in the future.

## Database Structure

### QuizEntry Interface
```typescript
interface QuizEntry {
  id: string                    // Unique identifier
  name: string                  // Player name
  score: number                 // Number of correct answers
  percentage: number            // Percentage score
  totalQuestions: number        // Total questions in quiz
  date: string                  // ISO date string
  language: 'hi' | 'en'        // Quiz language
  answers: number[]            // Array of selected answers
  timeSpent: number            // Time taken in seconds
}
```

### LeaderboardEntry Interface
```typescript
interface LeaderboardEntry {
  id: string                   // Unique identifier
  name: string                 // Player name
  score: number                // Number of correct answers
  percentage: number           // Percentage score
  date: string                 // ISO date string
  language: 'hi' | 'en'       // Quiz language
  timeSpent: number           // Time taken in seconds
}
```

## File Structure

```
data/
├── quiz-entries.json         # All quiz entries
└── leaderboard.json          # Top 50 leaderboard entries
```

## API Endpoints

### POST /api/quiz/entries
Save a new quiz entry to the database.

**Request Body:**
```json
{
  "name": "Player Name",
  "score": 8,
  "percentage": 80,
  "totalQuestions": 10,
  "language": "en",
  "answers": [0, 1, 2, 0, 1, 2, 0, 1, 2, 0],
  "timeSpent": 120
}
```

### GET /api/quiz/entries
Retrieve all quiz entries.

**Query Parameters:**
- `limit` (optional): Number of entries to return

### GET /api/quiz/leaderboard
Retrieve the leaderboard.

**Query Parameters:**
- `limit` (optional): Number of entries to return (default: 10)

### GET /api/quiz/stats
Retrieve quiz statistics.

**Response:**
```json
{
  "totalParticipants": 25,
  "averageScore": 7.2,
  "averagePercentage": 72.0,
  "languageStats": {
    "hi": 15,
    "en": 10
  }
}
```

## Features

### Quiz Component Updates
- ✅ Real-time leaderboard updates
- ✅ Time tracking for each quiz attempt
- ✅ Language-specific statistics
- ✅ Loading states and error handling
- ✅ Fallback to localStorage if API fails

### Admin Panel
- ✅ View quiz statistics
- ✅ Monitor all quiz entries
- ✅ Leaderboard management
- ✅ Language distribution analysis
- ✅ Performance metrics

### Database Features
- ✅ Automatic leaderboard sorting (by percentage, then score, then time)
- ✅ Top 50 leaderboard entries maintained
- ✅ Complete quiz entry history
- ✅ Language-specific tracking
- ✅ Time-based performance metrics

## Usage

1. **Taking a Quiz:**
   - Select language (Hindi/English)
   - Complete the quiz
   - Enter name to save score
   - View updated leaderboard

2. **Viewing Leaderboard:**
   - Access from quiz page
   - Real-time updates
   - Refresh button available

3. **Admin Access:**
   - Navigate to `/admin/quiz`
   - View statistics and all entries
   - Monitor quiz performance

## Migration to Production Database

To migrate to a production database (PostgreSQL, MongoDB, etc.):

1. Update the `Database` class in `lib/database.ts`
2. Replace file operations with database queries
3. Update API routes if needed
4. The interface remains the same

## Error Handling

- API failures fall back to localStorage
- Loading states prevent multiple submissions
- Error logging for debugging
- Graceful degradation

## Performance

- File-based storage is fast for small datasets
- Automatic cleanup (top 50 leaderboard entries)
- Efficient sorting algorithms
- Minimal memory footprint

