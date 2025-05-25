import { NextResponse } from 'next/server'
import { getUserIfValidCredentials, generateToken, getUserFromTokenCookie } from '@/lib/auth'

//To know from client if the user is logged in
export async function GET(req) {
  const user = await getUserFromTokenCookie()
  if(!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }


  return NextResponse.json(user)
}

export async function POST(req) {
  const credentials = await req.json()
  
  const user = await getUserIfValidCredentials(credentials)
  if(!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = generateToken({username: user.username})

  const res = NextResponse.json({ success: true })
  res.cookies.set('session_token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 3600
  })

  return res
}
