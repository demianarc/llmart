import { sql } from '@vercel/postgres';


export async function saveVote(
    winnerId: string,
    loserId: string,
    creativeType: string,
    prompt: string
  ) {
    try {
      // Check for recent votes using a hardcoded value
      const recentVotes = await sql`
        SELECT COUNT(*) 
        FROM votes 
        WHERE created_at > NOW() - INTERVAL '2 seconds'
      `

    if (parseInt(recentVotes.rows[0].count) > 0) {
      return { 
        success: false, 
        error: 'Please wait before voting again' 
      };
    }

    // If no recent votes, proceed with saving
    const result = await sql`
      INSERT INTO votes (winner_id, loser_id, creative_type, prompt)
      VALUES (${winnerId}, ${loserId}, ${creativeType}, ${prompt})
      RETURNING id
    `;
    
    return { success: true, id: result.rows[0].id };
  } catch (error) {
    console.error('Database error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

export async function getVoteStats() {
  try {
    const result = await sql`
      SELECT 
        winner_id,
        COUNT(*) as wins
      FROM votes
      GROUP BY winner_id
      ORDER BY wins DESC
    `;
    return result.rows;
  } catch (error) {
    console.error('Database error:', error);
    return [];
  }
}