'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AI_MODELS } from '@/lib/models'
import { Home, Trophy } from 'lucide-react'
import { ModelStats } from '@/types'

export default function LeaderboardPage() {
  const [stats, setStats] = useState<ModelStats[]>([])
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
    const interval = setInterval(fetchStats, 5000)
    return () => clearInterval(interval)
  }, [])

  // Create a lookup for model names
  const modelLookup = Object.fromEntries(
    AI_MODELS.map(model => [model.id, model])
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
                <p className="text-neutral-400">No matches yet</p>
              ) : (
                <div className="space-y-4">
                  {stats.map((stat, index) => {
                    const model = modelLookup[stat.model_id]
                    return (
                      <div
                        key={stat.model_id}
                        className="flex items-center gap-4 p-4 rounded-lg bg-neutral-800/50"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-700 text-emerald-400 font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="text-neutral-200 font-medium">
                              {model?.name || stat.model_id}
                            </div>
                            <div className="text-xs text-neutral-500 px-1.5 py-0.5 rounded-full border border-neutral-700">
                              {model?.provider || 'Unknown'}
                            </div>
                          </div>
                          <div className="text-sm text-neutral-400 mt-1">
                            <div className="flex items-center gap-2">
                              <span className="text-emerald-400 font-medium">
                                {stat.win_rate}% win rate
                              </span>
                              <span className="text-neutral-600">•</span>
                              <span>{stat.wins} wins</span>
                              <span className="text-neutral-600">•</span>
                              <span>{stat.total_matches} matches</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}