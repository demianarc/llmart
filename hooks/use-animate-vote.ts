import { useState, useEffect } from 'react'

export function useAnimateVote() {
  const [hasVoted, setHasVoted] = useState(false)
  const [voteSide, setVoteSide] = useState<'left' | 'right' | null>(null)

  useEffect(() => {
    if (hasVoted) {
      const timer = setTimeout(() => setHasVoted(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [hasVoted])

  return {
    hasVoted,
    voteSide,
    animateVote: (side: 'left' | 'right') => {
      setHasVoted(true)
      setVoteSide(side)
    }
  }
}