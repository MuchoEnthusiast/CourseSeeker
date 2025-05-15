import { connectToDatabase } from "../lib/db.js";

const seedDatabase = async () => {
  const dbName = "db";
  const connection = await connectToDatabase(dbName);

  try {
    console.log("Seeding started...");

    // Users
    await connection.query(`
      INSERT INTO users (username, password, email, name)
      VALUES 
        ('johndoe', '1234', 'john@example.com', 'John Doe'),
        ('janedoe', '5678', 'jane@example.com', 'Jane Doe');
    `);

    // Courses
    await connection.query(`
      INSERT INTO courses (name, description, category)
      VALUES 
        ('React for Beginners', 'Learn React from scratch', 'Web Dev'),
        ('Advanced SQL', 'Master SQL queries', 'Data Science');
    `);

    // course_browser — trigger will auto-fill description from courses
    await connection.query(`
      INSERT INTO course_browser (user_id, course_id)
      VALUES 
        (1, 1),
        (2, 2);
    `);

    console.log("Data seeded successfully.");
  } catch (err) {
    console.error("Seeding error:", err.message);
  } finally {
    await connection.end();
  }
};

seedDatabase();
