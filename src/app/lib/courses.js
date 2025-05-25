import { query, run } from './db.js'

export async function getAllCourses() {
    return await query('SELECT id, name, description FROM courses')
}

export async function getCourseParticipants(courseId) {
  return await query(
    'SELECT username, role, last_visited FROM participants WHERE course_id = ?',
    [courseId]
  );
}

export async function getCourseTopics(courseId) {
    return await query(
        'SELECT id, title, description FROM topics WHERE course_id = ?',
        [courseId]
    );
}

export async function getCourseById(id) {
    const rows = await query('SELECT id, name, description FROM courses WHERE id = ?', [id])
    return rows[0] || null
}

export async function addCourse({ name, description }) {
    await run('INSERT INTO courses (name, description) VALUES (?, ?)', [name, description])
}
