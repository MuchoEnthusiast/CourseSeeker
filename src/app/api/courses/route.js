// // Courses API endpoints
// export async function GET(request) {
//   return new Response(JSON.stringify({ message: 'Courses API endpoint' }), {
//     headers: { 'Content-Type': 'application/json' },
//   });
// }

// export async function POST(request) {
//   // Handle course creation
//   return new Response(JSON.stringify({ message: 'Course created' }), {
//     headers: { 'Content-Type': 'application/json' },
//   });
// }

import { run } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, description } = req.body;

    try {
      await run('INSERT INTO courses (title, description) VALUES (?, ?)', [title, description]);
      res.status(201).json({ message: 'Course added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
