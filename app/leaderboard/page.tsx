'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AI_MODELS } from '@/lib/models'
import { Home, Trophy } from 'lucide-react'

type VoteStats = {
  winner_id: string
  wins: number
}

export default function LeaderboardPage() {
  const [stats, setStats] = useState<VoteStats[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/votes')
        if (!response.ok) throw new Error('Failed to fetch stats')
        const data = await response.json()
        setStats(data.votes)
      } catch (error) {
        console.error('Error fetching leaderboard:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
    
    // Set up polling every 5 seconds
    const interval = setInterval(fetchStats, 5000)
    return () => clearInterval(interval)
  }, [])

  // Create a lookup for model names
  const modelNameLookup = Object.fromEntries(
    AI_MODELS.map(model => [model.id, model.name])
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-neutral-200 flex items-center gap-2">
              <Trophy className="w-8 h-8 text-emerald-400" />
              Global Leaderboard
            </h1>
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <Home className="w-4 h-4" />
                Back to Arena
              </Button>
            </Link>
          </div>

          <Card className="bg-neutral-800/50 border-neutral-700">
            <CardContent className="pt-6">
              {isLoading ? (
                <p className="text-neutral-400">Loading stats...</p>
              ) : stats.length === 0 ? (
                <p className="text-neutral-400">No votes yet</p>
              ) : (
                <div className="space-y-4">
                  {stats.map((stat, index) => (
                    <div
                      key={stat.winner_id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-neutral-800/50"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-700 text-emerald-400 font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-neutral-200 font-medium">
                          {modelNameLookup[stat.winner_id] || stat.winner_id}
                        </div>
                        <div className="text-sm text-neutral-400">
                          {stat.wins} {stat.wins === 1 ? 'win' : 'wins'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}