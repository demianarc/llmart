import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS votes (
        id SERIAL PRIMARY KEY,
        winner_id TEXT NOT NULL,
        loser_id TEXT NOT NULL,
        creative_type TEXT NOT NULL,
        prompt TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `
    // Verify the table exists
    const testQuery = await sql`SELECT COUNT(*) FROM votes`
    
    return NextResponse.json({ 
      message: 'Database initialized successfully',
      count: testQuery.rows[0].count 
    })
  } catch (error) {
    console.error('Database Error:', error)
    return NextResponse.json({ error: 'Failed to initialize database' }, { status: 500 })
  }
}