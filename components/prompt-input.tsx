'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'

interface PromptInputProps {
  onSubmit: (prompt: string) => void
  isGenerating: boolean
}

export function PromptInput({ onSubmit, isGenerating }: PromptInputProps) {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim() && !isGenerating) {
      onSubmit(prompt.trim())
      setPrompt('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex w-full items-center gap-2">
      <div className="relative flex-1">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a topic (e.g. 'nature', 'wisdom', 'technology', 'love')"
          className="w-full bg-white/95 backdrop-blur-sm border-neutral-200 text-neutral-800 placeholder:text-neutral-500 h-12 pr-24 transition-colors focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50"
          disabled={isGenerating}
        />
      </div>
      <Button 
        type="submit" 
        disabled={isGenerating || !prompt.trim()}
        className="h-12 px-8 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 hover:to-emerald-400 border-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <AnimatedGradientText>
          <span className="inline-flex items-center gap-2">
            {isGenerating ? 'Generating' : 'Generate'}
            <Send className="w-4 h-4" />
          </span>
        </AnimatedGradientText>
      </Button>
    </form>
  )
}

