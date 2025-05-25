import { getAllUsers, updateUserRole } from '@/app/lib/users'
import { getUserFromTokenCookie } from '@/app/lib/auth'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'; 

export async function GET() {
  const currentUser = getUserFromTokenCookie(cookies()); 
  if (!currentUser || currentUser.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const users = await getAllUsers()
  return NextResponse.json(users)
}

export async function POST(req) {
  const currentUser = getUserFromTokenCookie(cookies()); 
  if (!currentUser || currentUser.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const { email, role } = await req.json()
  if (!email || !role) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  await updateUserRole(email, role)
  return NextResponse.json({ success: true })
}
