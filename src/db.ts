import { Pool } from "pg";
import { config } from "./config";

let pool: Pool;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      host: config.db.host,
      port: config.db.port,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database,
    });
  }
  return pool;
}

export async function initDb(): Promise<void> {
  const p = getPool();
  await p.query(`
    CREATE TABLE IF NOT EXISTS weather_cache (
      id SERIAL PRIMARY KEY,
      city VARCHAR(255) NOT NULL UNIQUE,
      data JSONB NOT NULL,
      fetched_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    )
  `);
}

export async function closeDb(): Promise<void> {
  if (pool) {
    await pool.end();
  }
}
