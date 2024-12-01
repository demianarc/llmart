import { sql } from '@vercel/postgres'
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
    
    const result = await sql`
      INSERT INTO votes (winner_id, loser_id, creative_type, prompt)
      VALUES (${winnerId}, ${loserId}, ${creativeType}, ${prompt})
      RETURNING id
    `
    
    return NextResponse.json({ success: true, id: result.rows[0].id })
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
    const result = await sql`
      SELECT 
        winner_id,
        COUNT(*) as wins
      FROM votes
      GROUP BY winner_id
      ORDER BY wins DESC
    `
    return NextResponse.json({ votes: result.rows })
  } catch (error) {
    console.error('Error fetching votes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch votes' },
      { status: 500 }
    )
  }
}