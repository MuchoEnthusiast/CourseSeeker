import { NextResponse } from 'next/server'
import { getUserFromTokenCookie } from '@/lib/auth'
import { getMessages, addMessage, isUserEnrolled } from '@/lib/data'


export async function GET(req, { params }) {
  const user = await getUserFromTokenCookie()
  if(!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  const id = (await params).id
  const { searchParams } = new URL(req.url)
  const afterTimestamp = searchParams.get('afterTimestamp')

  if(!await isUserEnrolled(user.username, id)) return NextResponse.json({ error: 'Not enrolled' }, { status: 401 })

  const messages = await getMessages(id, afterTimestamp)


  return NextResponse.json(messages)
}

export async function POST(req, { params }) {
  const user = await getUserFromTokenCookie()
  if(!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  const id = (await params).id

  if(!await isUserEnrolled(user.username, id)) return NextResponse.json({ error: 'Not enrolled' }, { status: 401 })

  //Just the message text is took from client
  //The client is not trusted for timestamp and username
  const message = await req.json()
  message.timestamp = Date.now()
  message.username = user.username
  await addMessage(id, message)

  return NextResponse.json({ success: true })
}
