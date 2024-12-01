import { CreativeType } from '@/types'

export async function generateAsciiArt(
  prompt: string, 
  modelId: string, 
  type: CreativeType = 'ascii'
): Promise<string> {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, modelId, type }),
    })

    if (!response.ok) {
      throw new Error('Failed to generate art')
    }

    const data = await response.json()
    return data.output
  } catch (error) {
    console.error('Error generating art:', error)
    return 'Error: Failed to generate art. Please try again.'
  }
}