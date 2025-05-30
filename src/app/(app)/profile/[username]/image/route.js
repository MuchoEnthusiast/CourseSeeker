import { getUserFromTokenCookie } from '@/lib/auth'
import { getDB } from '@/lib/db'
import { Buffer } from 'buffer'
import { NextResponse } from 'next/server'


export async function GET(req, { params }) {
  const user = await getUserFromTokenCookie()
  if(!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  const username = (await params).username

  const db = await getDB()
  const profile = await db.get('SELECT photo, mimeType FROM profile WHERE username = ?', [username])

  if (!profile || !profile.photo) return new Response('Not found', { status: 404 })

  const fileBuffer = Buffer.from(profile.photo, 'base64')

  return new Response(fileBuffer, {
    headers: {
      'Content-Type': profile.mimeType
    }
  })
}