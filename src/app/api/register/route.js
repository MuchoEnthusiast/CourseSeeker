import { computeHash, randomSalt } from '@/lib/auth'
import { getDB } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const { username, role, name, surname, password } = await req.json()

  if (!username || !role || !name || !surname || !password) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const db = await getDB()

  try {
    //Using hash with salt storage method for passwords
    const salt = randomSalt()
    const passwordHash = computeHash(password, salt)

    await db.run(`
      INSERT INTO users (username, role, name, surname, passwordHash, salt)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [username, role, name, surname, passwordHash, salt])

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 })
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 409 })
    }

    console.error('Registration error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}