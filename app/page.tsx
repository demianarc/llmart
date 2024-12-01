'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CompetitionState, CreativeType } from '@/types'
import { getRandomModels } from '@/lib/models'
import { generateAsciiArt } from '@/lib/api-client'
import { ArtDisplay } from '@/components/art-display'
import { PromptInput } from '@/components/prompt-input'
import { EmojiShortcuts } from '@/components/emoji-shortcuts'
import { CreativeTypeSelector } from '@/components/creative-type-selector'
import { VoteButtons } from '@/components/vote-buttons'
import { Button } from '@/components/ui/button'
import { Trophy } from 'lucide-react'

const VOTE_COOLDOWN_MS = 2000 // 2 seconds cooldown

export default function Home() {
  const [creativeType, setCreativeType] = useState<CreativeType>('ascii')
  const [lastVoteTime, setLastVoteTime] = useState<number>(0)
  const [state, setState] = useState<CompetitionState>({
    modelA: null,
    modelB: null,
    isGenerating: false,
  })

  const handlePromptSubmit = async (prompt: string) => {
    setState(prev => ({ ...prev, isGenerating: true }))
    
    const [modelA, modelB] = getRandomModels()
    
    try {
      const [outputA, outputB] = await Promise.all([
        generateAsciiArt(prompt, modelA.id, creativeType),
        generateAsciiArt(prompt, modelB.id, creativeType),
      ])
      
      setState({
        modelA: { model: modelA, output: outputA, prompt },
        modelB: { model: modelB, output: outputB, prompt },
        isGenerating: false,
      })
    } catch (error) {
      console.error('Error in handlePromptSubmit:', error)
      setState(prev => ({ ...prev, isGenerating: false }))
    }
  }

  const handleVote = async (side: 'left' | 'right') => {
    if (!state.modelA || !state.modelB || state.isGenerating) return
    
    const now = Date.now()
    if (now - lastVoteTime < VOTE_COOLDOWN_MS) return
    
    const winner = side === 'left' ? state.modelA : state.modelB
    const loser = side === 'left' ? state.modelB : state.modelA
    
    try {
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          winnerId: winner.model.id,
          loserId: loser.model.id,
          creativeType,
          prompt: winner.prompt,
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to save vote')
      }
      
      setLastVoteTime(now)
      setState({
        modelA: null,
        modelB: null,
        isGenerating: false,
      })
    } catch (error) {
      console.error('Error saving vote:', error)
    }
  }

  const isVotingDisabled = 
    !state.modelA || 
    !state.modelB || 
    state.isGenerating || 
    (Date.now() - lastVoteTime < VOTE_COOLDOWN_MS)

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
              AI Creative Arena
            </h1>
            <Link href="/leaderboard">
              <Button variant="outline" size="sm" className="gap-2">
                <Trophy className="w-4 h-4" />
                View Leaderboard
              </Button>
            </Link>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <CreativeTypeSelector
                selected={creativeType}
                onChange={setCreativeType}
                disabled={state.isGenerating}
              />
              <PromptInput
                onSubmit={handlePromptSubmit}
                isGenerating={state.isGenerating}
              />
              <EmojiShortcuts
                onSelect={handlePromptSubmit}
                disabled={state.isGenerating}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <ArtDisplay
                generation={state.modelA}
                isGenerating={state.isGenerating}
                side="left"
              />
              <ArtDisplay
                generation={state.modelB}
                isGenerating={state.isGenerating}
                side="right"
              />
              <VoteButtons
                onVote={handleVote}
                disabled={isVotingDisabled}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}