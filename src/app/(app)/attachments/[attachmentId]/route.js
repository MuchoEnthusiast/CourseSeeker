import { getUserFromTokenCookie } from '@/lib/auth'
import { isUserEnrolled } from '@/lib/data'
import { getDB } from '@/lib/db'
import { Buffer } from 'buffer'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  const user = await getUserFromTokenCookie()
  if(!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  const attachmentId = parseInt((await params).attachmentId)
  if (isNaN(attachmentId)) return new Response('Not found', { status: 404 })

  const db = await getDB()
  const attachment = await db.get('SELECT * FROM attachments WHERE id = ?', [attachmentId])
  const res = await db.get(`
                                    SELECT t.courseId
                                    FROM attachments a
                                    JOIN topics t ON a.topicId = t.id
                                    WHERE a.id = ?
                                  `, [attachmentId])
  if(!res) return new Response('Server error', { status: 500 })
  if(!await isUserEnrolled(user.username, res.courseId)) return NextResponse.redirect(new URL('/courses/' + res.courseId, req.url))

  if (!attachment) return new Response('Not found', { status: 404 })

  const mimeType = 'application/octet-stream' //TODO: detect mime type
  const fileBuffer = Buffer.from(attachment.file, 'base64')

  return new Response(fileBuffer, {
    headers: {
      'Content-Type': mimeType,
      'Content-Disposition': `inline; filename="${attachment.name}"`
    }
  })
}