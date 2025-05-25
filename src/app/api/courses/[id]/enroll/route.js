import { getUserFromTokenCookie } from "@/lib/auth"
import { getDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req, { params }) {
  const user = await getUserFromTokenCookie()
  if(!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  const username = user.username
  const courseId = parseInt((await params).id)

  if (!username || isNaN(courseId)) {
    return new Response('Missing username or invalid course ID', { status: 400 })
  }

  const db = await getDB()

  const {password} = await req.json()
  const course = await db.get(
                              'SELECT * FROM courses WHERE id = ?',
                              [courseId]
                            )
  if(course.password !== undefined && course.password !== '' && password !== course.password) {
    return NextResponse.json({ error: 'Invalid course password' }, { status: 401 })
  }

  try {
    await db.run(
      'INSERT OR IGNORE INTO user_course (username, courseId) VALUES (?, ?)',
      [username, courseId]
    )

    return new Response('User enrolled', { status: 200 })
  } catch (err) {
    console.error('Enrollment error:', err.message)
    return new Response('Server error', { status: 500 })
  }
}