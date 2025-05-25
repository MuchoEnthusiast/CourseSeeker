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
    const result = await db.run(
      'DELETE FROM user_course WHERE username = ? AND courseId = ?',
      [username, courseId]
    )

    if (result.changes === 0) {
      return new Response('User was not enrolled', { status: 404 })
    }

    return new Response('User unenrolled', { status: 200 })
  } catch (err) {
    console.error('Unenroll error:', err.message)
    return new Response('Server error', { status: 500 })
  }
}