export const CREATIVE_TYPES = [
  'ascii',
  'haiku',
  'quote',
  'joke',
  'riddle',
  'proverb'
] as const

export type CreativeType = typeof CREATIVE_TYPES[number]

export type ArtModel = {
  id: string
  name: string
  provider: string
  supportedTypes: CreativeType[]
}

export type ArtGeneration = {
  model: ArtModel
  output: string
  prompt: string
}

export type CompetitionState = {
  modelA: ArtGeneration | null
  modelB: ArtGeneration | null
  isGenerating: boolean
}

export type ModelStats = {
  model_id: string
  wins: number
  total_matches: number
  win_rate: number
}

