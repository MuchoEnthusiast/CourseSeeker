import { getUserFromTokenCookie } from "@/lib/auth"
import { getDB } from "@/lib/db"

export async function POST(req, { params }) {
  const user = await getUserFromTokenCookie()
  if(!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  if(user.role !== "teacher") return NextResponse.json({ error: 'You must have role teacher' }, { status: 401 })

  const db = await getDB()
  const courseId = parseInt((await params).id)
  const topicId = parseInt((await params).topicId)
  const { name, file } = await req.json()
  
  if (!name || !file) {
    return new Response('Missing name or file', { status: 400 })
  }

  try {
    const topic = await db.get('SELECT * FROM topics WHERE id = ? AND courseId = ?', [topicId, courseId])
    if (!topic) return new Response('Topic not found in course', { status: 404 })

    const result = await db.run(
      'INSERT INTO attachments (name, file, topicId) VALUES (?, ?, ?)',
      [name, file, topicId]
    )

    return Response.json({ id: result.lastID }, { status: 201 })
  } catch (err) {
    console.error('Failed to insert attachment:', err.message)
    return new Response('Server error', { status: 500 })
  }
}

export async function DELETE(_, { params }) {
  const user = await getUserFromTokenCookie()
  if(!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  if(user.role !== "teacher") return NextResponse.json({ error: 'You must have role teacher' }, { status: 401 })

  const db = await getDB()
  const courseId = parseInt((await params).id)
  const topicId = parseInt((await params).topicId)
  const attachmentId = parseInt((await params).attachmentId)

  try {
    const attachment = await db.get(`
      SELECT a.id FROM attachments a
      JOIN topics t ON a.topicId = t.id
      WHERE a.id = ? AND a.topicId = ? AND t.courseId = ?
    `, [attachmentId, topicId, courseId])

    if (!attachment) return new Response('Attachment not found in topic or course', { status: 404 })

    await db.run('DELETE FROM attachments WHERE id = ?', [attachmentId])
    return new Response('Attachment deleted', { status: 200 })
  } catch (err) {
    console.error('Failed to delete attachment:', err.message)
    return new Response('Server error', { status: 500 })
  }
}