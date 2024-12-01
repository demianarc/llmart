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
        WITH model_stats AS (
          -- Count wins for each model
          SELECT 
            winner_id as model_id,
            COUNT(*) as wins
          FROM votes
          GROUP BY winner_id
        ),
        model_matches AS (
          -- Count total matches (both wins and losses) for each model
          SELECT 
            model_id,
            COUNT(*) as total_matches
          FROM (
            SELECT winner_id as model_id FROM votes
            UNION ALL
            SELECT loser_id as model_id FROM votes
          ) all_matches
          GROUP BY model_id
        )
        SELECT 
          m.model_id,
          COALESCE(s.wins, 0) as wins,
          m.total_matches,
          ROUND(COALESCE(s.wins, 0)::numeric / m.total_matches * 100, 1) as win_rate
        FROM model_matches m
        LEFT JOIN model_stats s ON m.model_id = s.model_id
        ORDER BY win_rate DESC, wins DESC
      `;
      return result.rows;
    } catch (error) {
      console.error('Database error:', error);
      return [];
    }
  }