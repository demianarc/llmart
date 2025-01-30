import { ArtModel } from '@/types'

export const AI_MODELS: ArtModel[] = [
  { 
    id: 'meta-llama/Meta-Llama-3.1-70B-Instruct-fast', 
    name: 'Meta-Llama 3.1 70B', 
    provider: 'Nebius',
    supportedTypes: ['ascii', 'haiku', 'quote', 'joke', 'asciiEmotion', 'absurdRecipe', 'emojiStory', 'codePoetry', 'mathMetaphor', 'proverb']
  },
  { 
    id: 'meta-llama/Meta-Llama-3.1-405B-Instruct', 
    name: 'Meta-Llama 3.1 405B', 
    provider: 'Nebius',
    supportedTypes: ['ascii', 'haiku', 'quote', 'joke', 'asciiEmotion', 'absurdRecipe', 'emojiStory', 'codePoetry', 'mathMetaphor', 'proverb']
  },
  { 
    id: 'meta-llama/Llama-3.3-70B-Instruct', 
    name: 'Meta-Llama 3.3 70B', 
    provider: 'Nebius',
    supportedTypes: ['ascii', 'haiku', 'quote', 'joke', 'asciiEmotion', 'absurdRecipe', 'emojiStory', 'codePoetry', 'mathMetaphor', 'proverb']
  },
  { 
    id: 'mistralai/Mistral-Nemo-Instruct-2407-fast', 
    name: 'Mistral Nemo', 
    provider: 'Nebius',
    supportedTypes: ['ascii', 'haiku', 'quote', 'joke', 'asciiEmotion', 'absurdRecipe', 'emojiStory', 'codePoetry', 'mathMetaphor', 'proverb']
  },
  { 
    id: 'Qwen/Qwen2.5-Coder-32B-Instruct-fast', 
    name: 'Qwen2.5 Coder 32B', 
    provider: 'Nebius',
    supportedTypes: ['ascii', 'haiku', 'quote', 'joke', 'asciiEmotion', 'absurdRecipe', 'emojiStory', 'codePoetry', 'mathMetaphor', 'proverb']
  },
  { 
    id: 'mistralai/Mixtral-8x22B-Instruct-v0.1-fast', 
    name: 'Mixtral 8x22B', 
    provider: 'Nebius',
    supportedTypes: ['ascii', 'haiku', 'quote', 'joke', 'asciiEmotion', 'absurdRecipe', 'emojiStory', 'codePoetry', 'mathMetaphor', 'proverb']
  },
  { 
    id: 'deepseek-ai/DeepSeek-Coder-V2-Lite-Instruct-fast', 
    name: 'DeepSeek Coder V2', 
    provider: 'Nebius',
    supportedTypes: ['ascii', 'haiku', 'quote', 'joke', 'asciiEmotion', 'absurdRecipe', 'emojiStory', 'codePoetry', 'mathMetaphor', 'proverb']
  },
  { 
    id: 'nvidia/Llama-3.1-Nemotron-70B-Instruct-HF-fast', 
    name: 'Nemotron 70B', 
    provider: 'Nebius',
    supportedTypes: ['ascii', 'haiku', 'quote', 'joke', 'asciiEmotion', 'absurdRecipe', 'emojiStory', 'codePoetry', 'mathMetaphor', 'proverb']
  },
  { 
    id: 'Qwen/Qwen2.5-72B-Instruct-fast', 
    name: 'Qwen2.5 72B', 
    provider: 'Nebius',
    supportedTypes: ['ascii', 'haiku', 'quote', 'joke', 'asciiEmotion', 'absurdRecipe', 'emojiStory', 'codePoetry', 'mathMetaphor', 'proverb']
  },
  { 
    id: 'gpt-4o', 
    name: 'GPT-4 Optimized', 
    provider: 'OpenAI',
    supportedTypes: ['ascii', 'haiku', 'quote', 'joke', 'asciiEmotion', 'absurdRecipe', 'emojiStory', 'codePoetry', 'mathMetaphor', 'proverb']
  },
  { 
    id: 'o1-preview', 
    name: 'O1 Preview', 
    provider: 'OpenAI',
    supportedTypes: ['ascii', 'haiku', 'quote', 'joke', 'asciiEmotion', 'absurdRecipe', 'emojiStory', 'codePoetry', 'mathMetaphor', 'proverb']
  },
  { 
    id: 'o1-mini', 
    name: 'O1 Mini', 
    provider: 'OpenAI',
    supportedTypes: ['ascii', 'haiku', 'quote', 'joke', 'asciiEmotion', 'absurdRecipe', 'emojiStory', 'codePoetry', 'mathMetaphor', 'proverb']
  },
  { 
    id: 'claude-3-5-sonnet-20241022', 
    name: 'Claude 3.5 Sonnet', 
    provider: 'Anthropic',
    supportedTypes: ['ascii', 'haiku', 'quote', 'joke', 'asciiEmotion', 'absurdRecipe', 'emojiStory', 'codePoetry', 'mathMetaphor', 'proverb']
  },
  { 
    id: 'claude-3-5-haiku-20241022', 
    name: 'Claude 3.5 Haiku', 
    provider: 'Anthropic',
    supportedTypes: ['ascii', 'haiku', 'quote', 'joke', 'asciiEmotion', 'absurdRecipe', 'emojiStory', 'codePoetry', 'mathMetaphor', 'proverb']
  },
  { 
    id: 'deepseek-ai/DeepSeek-R1', 
    name: 'DeepSeek R1', 
    provider: 'Nebius',
    supportedTypes: ['ascii', 'haiku', 'quote', 'joke', 'asciiEmotion', 'absurdRecipe', 'emojiStory', 'codePoetry', 'mathMetaphor', 'proverb']
  },
  { 
    id: 'deepseek-ai/DeepSeek-V3', 
    name: 'DeepSeek V3', 
    provider: 'Nebius',
    supportedTypes: ['ascii', 'haiku', 'quote', 'joke', 'asciiEmotion', 'absurdRecipe', 'emojiStory', 'codePoetry', 'mathMetaphor', 'proverb']
  },
  { 
    id: 'Qwen/QwQ-32B-Preview', 
    name: 'QwQ 32B Preview', 
    provider: 'Nebius',
    supportedTypes: ['ascii', 'haiku', 'quote', 'joke', 'asciiEmotion', 'absurdRecipe', 'emojiStory', 'codePoetry', 'mathMetaphor', 'proverb']
  }
]

export function getRandomModels(): [ArtModel, ArtModel] {
  const shuffled = [...AI_MODELS].sort(() => 0.5 - Math.random())
  return [shuffled[0], shuffled[1]]
}