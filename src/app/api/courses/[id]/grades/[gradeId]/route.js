import { getUserFromTokenCookie } from "@/lib/auth"
import { isUserEnrolled, isUserOwner } from "@/lib/data"
import { getDB } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req, { params }) {
  const user = await getUserFromTokenCookie()
  const courseId = parseInt((await params).id)
  if(!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  if(user.role !== "teacher" || !await isUserOwner(user.username, courseId)) return NextResponse.json({ error: 'You must have role teacher and be owner' }, { status: 401 })

  
  if(!await isUserEnrolled(user.username, courseId)) return NextResponse.json({ error: 'Not enrolled' }, { status: 401 })

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
  const courseId = parseInt((await params).id)
  if(!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  if(user.role !== "teacher" || !await isUserOwner(user.username, courseId)) return NextResponse.json({ error: 'You must have role teacher and be owner' }, { status: 401 })

  
  if(!await isUserEnrolled(user.username, courseId)) return NextResponse.json({ error: 'Not enrolled' }, { status: 401 })

  const gradeId = parseInt((await params).gradeId)  

  if (!gradeId)
    return new Response('Missing grade ID', { status: 400 })

  const db = await getDB()
  await db.run('DELETE FROM grades WHERE id = ?', [gradeId])

  return new Response('Grade deleted', { status: 200 })
}