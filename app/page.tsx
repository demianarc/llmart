'use client'

import { useState } from 'react'
import { CompetitionState, CreativeType } from '@/types'
import { getRandomModels } from '@/lib/models'
import { generateAsciiArt } from '@/lib/api-client'
import { ArtDisplay } from '@/components/art-display'
import { PromptInput } from '@/components/prompt-input'
import { EmojiShortcuts } from '@/components/emoji-shortcuts'
import { CreativeTypeSelector } from '@/components/creative-type-selector'

export default function Home() {
  const [creativeType, setCreativeType] = useState<CreativeType>('ascii')
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
              AI Creative Arena
            </h1>
            <p className="text-neutral-400">
              Watch AI models compete head-to-head in creative challenges
            </p>
          </div>

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
          </div>
        </div>
      </div>
    </main>
  )
}

