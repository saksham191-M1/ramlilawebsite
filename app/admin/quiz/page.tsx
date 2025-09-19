"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, TrendingUp, Clock, Globe, Trash2, RefreshCw } from "lucide-react"

interface QuizStats {
  totalParticipants: number
  averageScore: number
  averagePercentage: number
  languageStats: { hi: number; en: number }
}

interface QuizEntry {
  id: string
  name: string
  score: number
  percentage: number
  totalQuestions: number
  date: string
  language: 'hi' | 'en'
  answers: number[]
  timeSpent: number
}

interface LeaderboardEntry {
  id: string
  name: string
  score: number
  percentage: number
  date: string
  language: 'hi' | 'en'
  timeSpent: number
}

export default function QuizAdminPage() {
  const [stats, setStats] = useState<QuizStats | null>(null)
  const [entries, setEntries] = useState<QuizEntry[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'stats' | 'entries' | 'leaderboard'>('stats')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [statsRes, entriesRes, leaderboardRes] = await Promise.all([
        fetch('/api/quiz/stats'),
        fetch('/api/quiz/entries'),
        fetch('/api/quiz/leaderboard?limit=50')
      ])

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }

      if (entriesRes.ok) {
        const entriesData = await entriesRes.json()
        setEntries(entriesData)
      }

      if (leaderboardRes.ok) {
        const leaderboardData = await leaderboardRes.json()
        setLeaderboard(leaderboardData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading quiz data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Quiz Administration</h1>
          <p className="text-muted-foreground">Monitor quiz performance and manage entries</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'stats' ? 'default' : 'outline'}
            onClick={() => setActiveTab('stats')}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Statistics
          </Button>
          <Button
            variant={activeTab === 'entries' ? 'default' : 'outline'}
            onClick={() => setActiveTab('entries')}
          >
            <Users className="w-4 h-4 mr-2" />
            All Entries ({entries.length})
          </Button>
          <Button
            variant={activeTab === 'leaderboard' ? 'default' : 'outline'}
            onClick={() => setActiveTab('leaderboard')}
          >
            <Trophy className="w-4 h-4 mr-2" />
            Leaderboard
          </Button>
          <Button variant="outline" onClick={fetchData} className="ml-auto">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Statistics Tab */}
        {activeTab === 'stats' && stats && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalParticipants}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.averageScore.toFixed(1)}</div>
                <p className="text-xs text-muted-foreground">out of 10 questions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Percentage</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.averagePercentage.toFixed(1)}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Language Distribution</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Hindi</span>
                    <Badge variant="secondary">{stats.languageStats.hi}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">English</span>
                    <Badge variant="secondary">{stats.languageStats.en}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* All Entries Tab */}
        {activeTab === 'entries' && (
          <Card>
            <CardHeader>
              <CardTitle>All Quiz Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {entries.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No quiz entries found.</p>
                ) : (
                  entries.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-medium">{entry.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(entry.date)} • {entry.language === 'hi' ? 'Hindi' : 'English'}
                            </p>
                          </div>
                          <Badge variant={entry.percentage >= 80 ? 'default' : entry.percentage >= 60 ? 'secondary' : 'outline'}>
                            {entry.percentage}%
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{entry.score}/{entry.totalQuestions}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(entry.timeSpent)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No leaderboard entries found.</p>
                ) : (
                  leaderboard.map((entry, index) => (
                    <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {index < 3 ? (
                            <Trophy className={`w-4 h-4 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-amber-600'}`} />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{entry.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(entry.date)} • {entry.language === 'hi' ? 'Hindi' : 'English'}
                          </p>
                        </div>
                        <Badge variant={entry.percentage >= 80 ? 'default' : entry.percentage >= 60 ? 'secondary' : 'outline'}>
                          {entry.percentage}%
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{entry.score}/10</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(entry.timeSpent)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

