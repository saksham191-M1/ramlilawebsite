import fs from 'fs'
import path from 'path'

export interface QuizEntry {
  id: string
  name: string
  score: number
  percentage: number
  totalQuestions: number
  date: string
  language: 'hi' | 'en'
  answers: number[]
  timeSpent: number // in seconds
}

export interface LeaderboardEntry {
  id: string
  name: string
  score: number
  percentage: number
  date: string
  language: 'hi' | 'en'
  timeSpent: number
}

const DATA_DIR = path.join(process.cwd(), 'data')
const QUIZ_ENTRIES_FILE = path.join(DATA_DIR, 'quiz-entries.json')
const LEADERBOARD_FILE = path.join(DATA_DIR, 'leaderboard.json')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Initialize files if they don't exist
if (!fs.existsSync(QUIZ_ENTRIES_FILE)) {
  fs.writeFileSync(QUIZ_ENTRIES_FILE, JSON.stringify([], null, 2))
}

if (!fs.existsSync(LEADERBOARD_FILE)) {
  fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify([], null, 2))
}

export class Database {
  private static readQuizEntries(): QuizEntry[] {
    try {
      const data = fs.readFileSync(QUIZ_ENTRIES_FILE, 'utf8')
      return JSON.parse(data)
    } catch (error) {
      console.error('Error reading quiz entries:', error)
      return []
    }
  }

  private static writeQuizEntries(entries: QuizEntry[]): void {
    try {
      fs.writeFileSync(QUIZ_ENTRIES_FILE, JSON.stringify(entries, null, 2))
    } catch (error) {
      console.error('Error writing quiz entries:', error)
    }
  }

  private static readLeaderboard(): LeaderboardEntry[] {
    try {
      const data = fs.readFileSync(LEADERBOARD_FILE, 'utf8')
      return JSON.parse(data)
    } catch (error) {
      console.error('Error reading leaderboard:', error)
      return []
    }
  }

  private static writeLeaderboard(entries: LeaderboardEntry[]): void {
    try {
      fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify(entries, null, 2))
    } catch (error) {
      console.error('Error writing leaderboard:', error)
    }
  }

  static async saveQuizEntry(entry: Omit<QuizEntry, 'id'>): Promise<QuizEntry> {
    const entries = this.readQuizEntries()
    const newEntry: QuizEntry = {
      ...entry,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    }
    
    entries.push(newEntry)
    this.writeQuizEntries(entries)

    // Update leaderboard
    await this.updateLeaderboard(newEntry)

    return newEntry
  }

  static async getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
    const leaderboard = this.readLeaderboard()
    return leaderboard
      .sort((a, b) => {
        // Sort by percentage first, then by score, then by time (faster is better)
        if (b.percentage !== a.percentage) {
          return b.percentage - a.percentage
        }
        if (b.score !== a.score) {
          return b.score - a.score
        }
        return a.timeSpent - b.timeSpent
      })
      .slice(0, limit)
  }

  static async getQuizStats(): Promise<{
    totalParticipants: number
    averageScore: number
    averagePercentage: number
    languageStats: { hi: number; en: number }
  }> {
    const entries = this.readQuizEntries()
    
    if (entries.length === 0) {
      return {
        totalParticipants: 0,
        averageScore: 0,
        averagePercentage: 0,
        languageStats: { hi: 0, en: 0 }
      }
    }

    const totalScore = entries.reduce((sum, entry) => sum + entry.score, 0)
    const totalPercentage = entries.reduce((sum, entry) => sum + entry.percentage, 0)
    const languageStats = entries.reduce(
      (stats, entry) => {
        stats[entry.language]++
        return stats
      },
      { hi: 0, en: 0 }
    )

    return {
      totalParticipants: entries.length,
      averageScore: Math.round((totalScore / entries.length) * 100) / 100,
      averagePercentage: Math.round((totalPercentage / entries.length) * 100) / 100,
      languageStats
    }
  }

  private static async updateLeaderboard(newEntry: QuizEntry): Promise<void> {
    const leaderboard = this.readLeaderboard()
    
    // Add new entry to leaderboard
    const leaderboardEntry: LeaderboardEntry = {
      id: newEntry.id,
      name: newEntry.name,
      score: newEntry.score,
      percentage: newEntry.percentage,
      date: newEntry.date,
      language: newEntry.language,
      timeSpent: newEntry.timeSpent
    }

    leaderboard.push(leaderboardEntry)

    // Sort and keep only top entries
    const sortedLeaderboard = leaderboard
      .sort((a, b) => {
        if (b.percentage !== a.percentage) {
          return b.percentage - a.percentage
        }
        if (b.score !== a.score) {
          return b.score - a.score
        }
        return a.timeSpent - b.timeSpent
      })
      .slice(0, 50) // Keep top 50 entries

    this.writeLeaderboard(sortedLeaderboard)
  }

  static async getAllQuizEntries(): Promise<QuizEntry[]> {
    return this.readQuizEntries()
  }

  static async deleteQuizEntry(id: string): Promise<boolean> {
    const entries = this.readQuizEntries()
    const filteredEntries = entries.filter(entry => entry.id !== id)
    
    if (filteredEntries.length === entries.length) {
      return false // Entry not found
    }

    this.writeQuizEntries(filteredEntries)

    // Update leaderboard
    const leaderboard = this.readLeaderboard()
    const filteredLeaderboard = leaderboard.filter(entry => entry.id !== id)
    this.writeLeaderboard(filteredLeaderboard)

    return true
  }
}

