'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { ArtGeneration } from '@/types'

type ModelCardProps = {
  generation: ArtGeneration | null
  side: 'left' | 'right'
  isGenerating?: boolean
}

export function ModelCard({ generation, side, isGenerating }: ModelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white/80 backdrop-blur-md border-transparent hover:border-indigo-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
        <CardContent className="p-6">
          <div className="flex-1 font-mono whitespace-pre-wrap break-words overflow-auto text-neutral-800">
            {isGenerating ? (
              <div className="animate-pulse">Loading...</div>
            ) : (
              generation?.output || 'Select a creative type and enter a prompt...'
            )}
          </div>
          <div className="absolute bottom-2 right-2 text-xs text-neutral-400">
            {side === 'left' ? 'A' : 'B'}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}