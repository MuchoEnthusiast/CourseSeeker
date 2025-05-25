import { getUserFromTokenCookie } from "@/lib/auth"
import { getDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req, { params }) {
  const user = await getUserFromTokenCookie()
  if(!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  if(user.role !== "teacher") return NextResponse.json({ error: 'You must have role teacher' }, { status: 401 })

  const courseId = parseInt((await params).id)
  const { username, name, gradeNumber } = await req.json()

  if (!courseId || !username || !name || gradeNumber == null)
    return new Response('Missing fields', { status: 400 })

  const db = await getDB()
  const timestamp = Date.now()

  const result = await db.get(
    'SELECT id FROM grades WHERE username = ? AND courseId = ? AND name = ?',
    [username, courseId, name]
  )
  
  if(!!result)
    return new Response('Already existing username course pair', { status: 406 })

  await db.run(`
    INSERT INTO grades (username, courseId, name, gradeNumber, timestamp)
    VALUES (?, ?, ?, ?, ?)
  `, [username, courseId, name, gradeNumber, timestamp])

  return new Response('Grade created', { status: 201 })
}

export async function DELETE(_, { params }) {
  const user = await getUserFromTokenCookie()
  if(!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  if(user.role !== "teacher") return NextResponse.json({ error: 'You must have role teacher' }, { status: 401 })

  const gradeId = parseInt((await params).gradeId)  

  if (!gradeId)
    return new Response('Missing grade ID', { status: 400 })

  const db = await getDB()
  await db.run('DELETE FROM grades WHERE id = ?', [gradeId])

  return new Response('Grade deleted', { status: 200 })
}