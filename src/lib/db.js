import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'path'

export async function getDB() {
  const db = await open({
    filename: path.join(process.cwd(), 'sqlite.db'),
    driver: sqlite3.Database
  })

  return db
}

