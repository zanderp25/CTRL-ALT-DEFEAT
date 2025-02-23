// lib/db.ts
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let dbInstance: Database | null = null;

export async function getDB(): Promise<Database> {
  if (!dbInstance) {
    dbInstance = await open({
      filename: './mydb.sqlite', // Adjust the path as needed
      driver: sqlite3.Database,
    });
  }
  return dbInstance;
}
