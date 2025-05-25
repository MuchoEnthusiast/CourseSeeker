import { getUserFromTokenCookie } from "@/lib/auth"
import { getDB } from "@/lib/db"

export async function GET(req, { params }) {
  const user = await getUserFromTokenCookie()
  if(!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  const username = user.username
  const courseId = parseInt((await params).id)

  if (!username || isNaN(courseId)) {
    return new Response('Missing username or invalid course ID', { status: 400 })
  }

  const db = await getDB()

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