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
    <Card className={cn(
      "h-full bg-black/40 backdrop-blur-sm border-neutral-800",
      side === 'left' ? "bg-opacity-50" : "bg-opacity-30"
    )}>
      <CardHeader className={cn(
        "border-b border-neutral-800",
        side === 'left' ? "border-emerald-900/20" : "border-cyan-900/20"
      )}>
        <CardTitle className="flex items-center gap-2 text-neutral-400">
          <Bot className={cn(
            "w-5 h-5",
            side === 'left' ? "text-emerald-400" : "text-cyan-400"
          )} />
          {generation?.model.name || 'Selecting Model...'}
          <span className="text-xs text-neutral-500">
            {generation?.model.provider}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {isGenerating ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="animate-pulse text-neutral-400">Generating...</div>
          </div>
        ) : generation ? (
          <pre className="font-mono text-sm text-neutral-200 whitespace-pre overflow-x-auto">
            {generation.output}
          </pre>
        ) : (
          <div className="h-[400px] flex items-center justify-center text-neutral-500">
            Enter a prompt to begin
          </div>
        )}
      </CardContent>
    </Card>
  )
}