'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CompetitionState, CreativeType } from '@/types'
import { getRandomModels } from '@/lib/models'
import { generateAsciiArt } from '@/lib/api-client'
import { PromptInput } from '@/components/prompt-input'
import { EmojiShortcuts } from '@/components/emoji-shortcuts'
import { CreativeTypeSelector } from '@/components/creative-type-selector'
import { VoteButtons } from '@/components/vote-buttons'
import { Button } from '@/components/ui/button'
import { Trophy } from 'lucide-react'
import { StartAgainModal } from '@/components/start-again-modal'
import { ModelCard } from '@/components/model-card'
import { TextLoop } from '@/components/ui/text-loop'

const VOTE_COOLDOWN_MS = 2000 // 2 seconds cooldown

export default function Home() {
  const [creativeType, setCreativeType] = useState<CreativeType>('ascii')
  const [lastVoteTime, setLastVoteTime] = useState<number>(0)
  const [state, setState] = useState<CompetitionState>({
    modelA: null,
    modelB: null,
    isGenerating: false,
  })
  const [isStartAgainOpen, setIsStartAgainOpen] = useState(false)

  const handlePromptSubmit = async (prompt: string) => {
    // Clear previous results when starting new generation
    setState({
      modelA: null,
      modelB: null,
      isGenerating: true,
    })
    
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
    } catch (error) {
      console.error('Error saving vote:', error)
    }
  }

  const isVotingDisabled = 
    !state.modelA || 
    !state.modelB || 
    state.isGenerating || 
    (Date.now() - lastVoteTime < VOTE_COOLDOWN_MS)

  const handleStartAgain = () => {
    setState({
      modelA: null,
      modelB: null,
      isGenerating: false,
    })
  }

  return (
    <main className="min-h-screen relative bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/20 to-emerald-500/20 animate-gradient-x">
      <div className="container mx-auto px-4 py-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto space-y-2"
        >
          <div className="min-h-[15vh] flex flex-col items-center justify-center">
            <div className="w-full flex flex-col items-center mb-3">
              <h1 className="text-5xl font-bold tracking-tight flex flex-col items-center gap-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 whitespace-nowrap">
                  LLM Arena for...
                </span>
                <TextLoop
                  className="text-5xl font-bold tracking-tight"
                  interval={3}
                  containerClassName="flex justify-center items-center"
                >
                  {["ASCII Art", "haikus", "quotes", "jokes", "stories", "poetry"].map((text) => (
                    <span key={text}>{text}</span>
                  ))}
                </TextLoop>
              </h1>
            </div>
            <Link href="/leaderboard">
              <Button variant="outline" size="sm" className="gap-2">
                <Trophy className="w-4 h-4" />
                View Leaderboard
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
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
              <div className="space-y-3">
                <EmojiShortcuts
                  onSelect={handlePromptSubmit}
                  disabled={state.isGenerating}
                />
                {(state.modelA || state.modelB) && (
                  <div className="flex justify-center">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsStartAgainOpen(true)}
                      className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 hover:to-emerald-400 border-0 text-white px-8 transition-all duration-300"
                    >
                      Start Again
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="md:col-span-2 text-center">
              {state.modelA?.prompt && (
                <div className="text-neutral-400 text-sm mb-4">
                  Prompt: &ldquo;{state.modelA.prompt}&rdquo;
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-4">
                <ModelCard
                  generation={state.modelA}
                  side="left"
                  isGenerating={state.isGenerating}
                />
                <ModelCard
                  generation={state.modelB}
                  side="right"
                  isGenerating={state.isGenerating}
                />
                <VoteButtons
                  onVote={handleVote}
                  disabled={isVotingDisabled}
                  modelA={state.modelA}
                  modelB={state.modelB}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <StartAgainModal 
        isOpen={isStartAgainOpen}
        onClose={() => setIsStartAgainOpen(false)}
        onConfirm={handleStartAgain}
      />
    </main>
  )
}