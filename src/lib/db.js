import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'path'

export async function getDB() {
  const db = await open({
    filename: path.join(process.cwd(), 'sqlite.db'),
    driver: sqlite3.Database
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      username TEXT PRIMARY KEY,
      role TEXT CHECK(role IN ('student', 'teacher')) NOT NULL,
      name TEXT NOT NULL,
      surname TEXT NOT NULL,
      passwordHash TEXT NOT NULL,
      salt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      teacher TEXT NOT NULL,
      FOREIGN KEY (teacher) REFERENCES users(username) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS user_course (
      username TEXT NOT NULL,
      courseId INTEGER NOT NULL,
      lastVisited INTEGER,
      PRIMARY KEY (username, courseId),
      FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      courseId INTEGER NOT NULL,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS attachments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      file TEXT NOT NULL,
      topicId INTEGER NOT NULL,
      FOREIGN KEY (topicId) REFERENCES topics(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS grades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      gradeNumber INTEGER NOT NULL,
      timestamp INTEGER NOT NULL,
      username TEXT NOT NULL,
      courseId INTEGER NOT NULL,
      FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      courseId INTEGER NOT NULL,
      timestamp INTEGER NOT NULL,
      text TEXT NOT NULL,
      FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE
    );
  `)

  return db
}

