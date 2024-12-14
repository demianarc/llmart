import { Button } from '@/components/ui/button'
import { ArtGeneration } from '@/types'
import { useState, useEffect } from 'react'

type VoteButtonsProps = {
  onVote: (side: 'left' | 'right') => void
  disabled?: boolean
  modelA: ArtGeneration | null
  modelB: ArtGeneration | null
}

export function VoteButtons({ onVote, disabled, modelA, modelB }: VoteButtonsProps) {
  const [hasVoted, setHasVoted] = useState(false)

  // Reset hasVoted when new models are generated
  useEffect(() => {
    setHasVoted(false)
  }, [modelA?.prompt, modelB?.prompt])

  const handleVote = (side: 'left' | 'right') => {
    setHasVoted(true)
    onVote(side)
  }

  return (
    <div className="col-span-2 space-y-4">
      <div className="flex justify-center gap-4">
        <Button
          onClick={() => handleVote('left')}
          disabled={disabled}
          variant="outline"
          className="w-32"
        >
          Vote Left
        </Button>
        <Button
          onClick={() => handleVote('right')}
          disabled={disabled}
          variant="outline"
          className="w-32"
        >
          Vote Right
        </Button>
      </div>
      
      {hasVoted && modelA && modelB && (
        <div className="flex justify-center gap-8 text-sm text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">A:</span> 
            <span>{modelA.model.name}</span>
            <span className="text-xs text-neutral-600 px-1.5 py-0.5 rounded-full border border-neutral-700">
              {modelA.model.provider}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">B:</span>
            <span>{modelB.model.name}</span>
            <span className="text-xs text-neutral-600 px-1.5 py-0.5 rounded-full border border-neutral-700">
              {modelB.model.provider}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}