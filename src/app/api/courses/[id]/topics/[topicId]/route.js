import { NextResponse } from 'next/server'
import { getUserFromTokenCookie } from '@/lib/auth'
import { getMessages, addMessage, isUserEnrolled } from '@/lib/data'
import { getDB } from '@/lib/db'


export async function POST(req, { params }) {
  const user = await getUserFromTokenCookie()
  if(!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  if(user.role !== "teacher") return NextResponse.json({ error: 'You must have role teacher' }, { status: 401 })

  const db = await getDB()
  const courseId = parseInt((await params).id)
  const { title, description } = await req.json()

  if(!await isUserEnrolled(user.username, courseId)) return NextResponse.json({ error: 'Not enrolled' }, { status: 401 })


  if (!title || !description)
    return new Response('Missing title or description', { status: 400 })

  const result = await db.run(
    'INSERT INTO topics (title, description, courseId) VALUES (?, ?, ?)',
    [title, description, courseId]
  )

  return Response.json({ id: result.lastID }, { status: 201 })
}

export async function PUT(req, { params }) {
  const user = await getUserFromTokenCookie()
  if(!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  if(user.role !== "teacher") return NextResponse.json({ error: 'You must have role teacher' }, { status: 401 })

  const db = await getDB()
  const courseId = parseInt((await params).id)
  const topicId = parseInt((await params).topicId)
  const { title, description } = await req.json()

  if(!await isUserEnrolled(user.username, courseId)) return NextResponse.json({ error: 'Not enrolled' }, { status: 401 })

  if (!title || !description)
    return new Response('Missing title or description', { status: 400 })

  const result = await db.run(
    'UPDATE topics SET title = ?, description = ? WHERE id = ? AND courseId = ?',
    [title, description, topicId, courseId]
  )

  if (result.changes === 0) return new Response('Topic not found', { status: 404 })
  return new Response('Topic updated')
}

export async function DELETE(req, { params }) {
  const user = await getUserFromTokenCookie()
  if(!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  if(user.role !== "teacher") return NextResponse.json({ error: 'You must have role teacher' }, { status: 401 })
    
  const db = await getDB()
  const courseId = parseInt((await params).id)
  const topicId = parseInt((await params).topicId)

  if(!await isUserEnrolled(user.username, courseId)) return NextResponse.json({ error: 'Not enrolled' }, { status: 401 })

  const result = await db.run(
    'DELETE FROM topics WHERE id = ? AND courseId = ?',
    [topicId, courseId]
  )

  if (result.changes === 0) return new Response('Topic not found', { status: 404 })
  return new Response('Topic deleted')
}