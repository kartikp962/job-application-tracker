import { configDotenv } from "dotenv";
import { readdir, readFile } from "fs/promises";
configDotenv();
const pool = (await import("./pg-pool.js")).default;

// EXECUTE migration
const sqlString = `CREATE TABLE IF NOT EXISTS migration_history (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    migration_name  TEXT UNIQUE NOT NULL,
    executed_at     TIMESTAMPTZ NOT NULL DEFAULT now()
)`;

await pool.query(sqlString);

const client = await pool.connect();

const files = await readdir("./src/db/migrations");
console.log(files);

try {
  // BEGIN transaction
  await client.query("BEGIN");

  // insert into migration_history
  for (let i = 0; i < files.length; i++) {
    const fileContent = await readFile(`./src/db/migrations/${files[i]}`, {
      encoding: "utf-8",
    });
    const migrationHistoryExists = await client.query(
      `
    SELECT * FROM migration_history WHERE migration_name = $1
    `,
      [files[i]],
    );

    if (migrationHistoryExists.rows.length > 0) {
      continue;
    }

    const result = await client.query(fileContent);
    await client.query(
      `
    INSERT INTO migration_history (migration_name) 
    VALUES ($1);
    `,
      [files[i]],
    );
  }

  // COMMIT transaction
  await client.query("COMMIT");
} catch (error) {
  console.log(error);
  // ROLLBACK transaction
  await client.query("ROLLBACK");
} finally {
  client.release();
}
