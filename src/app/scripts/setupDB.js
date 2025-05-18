import { connectToDatabase } from "../lib/db.js";
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DOTENV CONFIG HERE
dotenv.config({ path: path.resolve(__dirname, '../../../.env.local') });


const setupDatabase = async () => {
  const dbName = process.env.DB_NAME;
  const serverConnection = await connectToDatabase(); // No db name, server-level connection

  try {
    // 1. Create DB
    await serverConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`Database "${dbName}" created or already exists.`);

    // 2. Connect to DB
    const connection = await connectToDatabase(dbName);

    // 3. Create Tables
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS course_browser (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        course_id INT NOT NULL,
        course_name VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
    console.log("Tables created.");

    // 4. Create Trigger for course_browser.description auto copy
    await connection.query(`
        DROP TRIGGER IF EXISTS sync_course_description;
    `);

    await connection.query(`
        CREATE TRIGGER sync_course_description
        BEFORE INSERT ON course_browser
        FOR EACH ROW
        BEGIN
            DECLARE courseName VARCHAR(255);
            DECLARE courseDesc TEXT;

            SELECT name, description INTO courseName, courseDesc
            FROM courses
            WHERE id = NEW.course_id;

            SET NEW.course_name = courseName;
            SET NEW.description = courseDesc;
        END

    `);
    console.log("Trigger created for course_browser.description.");

    await connection.end();
  } catch (err) {
    console.error("Setup error:", err.message);
  } finally {
    await serverConnection.end();
  }
};

setupDatabase();
