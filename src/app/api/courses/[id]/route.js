import { getUserFromTokenCookie } from "@/lib/auth"
import { isUserEnrolled, isUserOwner } from "@/lib/data"
import { getDB } from "@/lib/db"

export async function POST(req) {
  const user = await getUserFromTokenCookie()
  if(!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  if(user.role !== "teacher") return NextResponse.json({ error: 'You must have role teacher' }, { status: 401 })

  const { name, password } = await req.json()
  if (!name) return new Response('Missing name', { status: 400 })

  const db = await getDB()
  try {
    const result = await db.run('INSERT INTO courses (name, password, teacher) VALUES (?, ?, ?)', [name, password !== undefined ? password : '', user.username])
    await db.run('INSERT INTO user_course (username, courseId) VALUES (?, ?)', [user.username, result.lastID])
    return Response.json({ id: result.lastID }, { status: 201 })
  } catch(err) {
    return Response.json({ status: "name_used" }, { status: 406 })
  }
}

export async function DELETE(_, { params }) {
  const user = await getUserFromTokenCookie()
  const courseId = parseInt((await params).id)
  if(!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  if(user.role !== "teacher" || !await isUserOwner(user.username, courseId)) return NextResponse.json({ error: 'You must have role teacher and be owner' }, { status: 401 })
  
  const db = await getDB()

  if(!await isUserEnrolled(user.username, courseId)) return NextResponse.json({ error: 'Not enrolled' }, { status: 401 })

  const result = await db.run('DELETE FROM courses WHERE id = ?', [courseId])

  if (result.changes === 0) return new Response('Not found', { status: 404 })
  return new Response('Course deleted')
}