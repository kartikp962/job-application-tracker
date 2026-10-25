import pool from "../db/pg-pool.js";

async function getApplicationsByUserId(userId) {
  const sqlQuery = `
  SELECT * 
  FROM applications 
  WHERE user_id = $1 
  ORDER BY created_at DESC`;

  const result = await pool.query(sqlQuery, [userId]);

  return result.rows;
}

export { getApplicationsByUserId };
