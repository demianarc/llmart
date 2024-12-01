'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

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
    <form onSubmit={handleSubmit} className="relative">
      <Input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a topic (e.g. 'nature', 'wisdom', 'technology', 'love')"
        className="w-full bg-black/40 border-neutral-800 text-neutral-200 placeholder:text-neutral-500"
        disabled={isGenerating}
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={isGenerating || !prompt.trim()}
        className="absolute right-2 top-2 bg-emerald-600 hover:bg-emerald-700"
      >
        <Send className="w-4 h-4" />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  )
}

