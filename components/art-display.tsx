import { ArtGeneration } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bot } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ArtDisplayProps {
  generation: ArtGeneration | null
  isGenerating: boolean
  side: 'left' | 'right'
}

export function ArtDisplay({ generation, isGenerating, side }: ArtDisplayProps) {
  return (
    <Card className="relative">
      <CardContent className="p-4 min-h-[300px] flex flex-col">
        <div className="flex-1 font-mono whitespace-pre-wrap break-words overflow-auto">
          {isGenerating ? (
            <div className="animate-pulse">Generating...</div>
          ) : (
            generation?.output || 'Ready for your prompt...'
          )}
        </div>
        <div className="absolute bottom-2 right-2 text-xs text-neutral-500">
          {side === 'left' ? 'A' : 'B'}
        </div>
      </CardContent>
    </Card>
  )
}