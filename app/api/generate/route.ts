import { NextResponse } from 'next/server'
import { nebiusClient, openaiClient, anthropicClient } from '@/lib/api-clients'
import { getSystemPrompt } from '@/lib/prompts'
import { CreativeType } from '@/types'

export async function POST(request: Request) {
  try {
    const { prompt, modelId, type = 'ascii' } = await request.json()
    const systemPrompt = getSystemPrompt(type as CreativeType)
    let completion

    // Handle OpenAI models
    if (modelId.includes('gpt') || modelId.includes('o1')) {
      const messages = modelId.includes('o1') 
        ? [
            // O1 models don't support system messages, combine with user prompt
            { 
              role: 'user', 
              content: `${systemPrompt}\n\nPrompt: ${prompt}` 
            }
          ]
        : [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ]

      completion = await openaiClient.chat.completions.create({
        model: modelId === 'gpt-4o' ? 'gpt-4' : modelId,
        messages,
        temperature: 0.7,
        max_completion_tokens: 1000,
        stream: false,
        // Add specific parameters for O1 models
        ...(modelId.includes('o1') && {
          reasoning_effort: 'medium',
          service_tier: 'auto'
        })
      })

      return NextResponse.json({ 
        output: completion.choices[0]?.message?.content || 'Failed to generate content.'
      })
    }

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
    
    // Handle GPT-4 and Nebius models
    completion = await (modelId.includes('gpt') ? openaiClient : nebiusClient).chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      model: modelId === 'gpt-4o' ? 'gpt-4' : modelId,
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