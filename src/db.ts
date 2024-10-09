import { Database } from "bun:sqlite";

export const db = new Database("./data/shmoocon.sqlite", {
  create: true,
});

export function initDB() {
  db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            proxy TEXT,
            email TEXT NOT NULL,
            client TEXT NOT NULL,
            created_at DATETIME DEFAULT current_timestamp NOT NULL
        )
    `);

  db.run(`
        CREATE TABLE IF NOT EXISTS checkouts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client TEXT NOT NULL,
            confirmation_id TEXT NOT NULL,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            ticket_count INTEGER NOT NULL,
            purchased_at DATETIME DEFAULT current_timestamp NOT NULL
        )
    `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS config (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT NOT NULL UNIQUE,
      value TEXT NOT NULL
    )
  `)
}

