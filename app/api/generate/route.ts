import { NextResponse } from 'next/server'
import { nebiusClient, openaiClient, anthropicClient } from '@/lib/api-clients'
import { getSystemPrompt } from '@/lib/prompts'
import { CreativeType } from '@/types'

export async function POST(request: Request) {
  try {
    const { prompt, modelId, type = 'ascii' } = await request.json()
    const systemPrompt = getSystemPrompt(type as CreativeType)
    let completion

    if (modelId.includes('claude')) {
      completion = await anthropicClient.messages.create({
        model: modelId,
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: prompt }]
      })
      return NextResponse.json({ 
        output: completion.content[0].type === 'text' ? completion.content[0].text : 'Failed to generate content.'
      })
    }
    
    const client = modelId.includes('gpt') || modelId.includes('o1') ? openaiClient : nebiusClient
    completion = await client.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      model: modelId,
      temperature: 0.7,
      max_tokens: 1000,
    })

    return NextResponse.json({ 
      output: completion.choices[0]?.message?.content || 'Failed to generate art.'
    })
  } catch (error) {
    console.error('Server Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate art. Please try again.' },
      { status: 500 }
    )
  }
}