import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';

// Helper function to get database connection
function getDb() {
  return new sqlite3.Database('./database.db', (err) => {
    if (err) {
      console.error('Error connecting to database:', err);
    }
  });
}

// Helper function to run query with promises
function runQuery(db, query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// Helper function to get single row
function getSingleRow(db, query, params = []) {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// GET endpoint to fetch courses
export async function GET(request) {
  const db = getDb();
  
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      // Fetch specific course
      const course = await getSingleRow(db, 'SELECT * FROM courses WHERE id = ?', [id]);
      
      if (!course) {
        return NextResponse.json(
          { error: 'Course not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(course);
    }

    // Fetch all courses
    const courses = await runQuery(db, 'SELECT * FROM courses');
    return NextResponse.json(courses);

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
      }
    });
  }
}

// POST endpoint to create a new course
export async function POST(request) {
  const db = getDb();
  
  try {
    const body = await request.json();
    const { title, description } = body;

    // Validate required fields
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Insert new course
    const result = await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO courses (title, description) VALUES (?, ?)',
        [title, description || null],
        function(err) {
          if (err) reject(err);
          else resolve(this);
        }
      );
    });

    // Fetch the newly created course
    const newCourse = await getSingleRow(
      db,
      'SELECT * FROM courses WHERE id = ?',
      [result.lastID]
    );

    return NextResponse.json(
      { message: 'Course created successfully', course: newCourse },
      { status: 201 }
    );

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
      }
    });
  }
}