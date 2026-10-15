import pool from "../db/pg-pool.js";

async function createUser({name, email, passwordHash}) {
    const sqlQuery = `
        INSERT INTO users (name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, name, email, created_at;
    `;

    const result = await pool.query(sqlQuery, [name, email, passwordHash]);

    return result.rows[0];
}

async function findUserByEmail(email) {
    const sqlQuery = `
        SELECT * FROM users where id=${email}
    `;

    const result = await pool.query(sqlQuery);

    return result.rows[0];
}
