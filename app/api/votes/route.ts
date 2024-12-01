import { saveVote, getVoteStats } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { winnerId, loserId, creativeType, prompt } = await request.json()
    
    if (!winnerId || !loserId || !creativeType || !prompt) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const result = await saveVote(winnerId, loserId, creativeType, prompt)
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }
    
    return NextResponse.json({ success: true, id: result.id })
  } catch (error) {
    console.error('Vote API error:', error)
    return NextResponse.json(
      { error: 'Failed to save vote' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const votes = await getVoteStats()
    return NextResponse.json({ votes })
  } catch (error) {
    console.error('Error fetching votes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch votes' },
      { status: 500 }
    )
  }
}