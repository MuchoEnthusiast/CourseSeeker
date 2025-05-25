import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { getElement } from './data'
import crypto from 'crypto'
import { getDB } from './db'

//TODO: FOR TESTING ONLY
const SECRET = "1cf552af5146b96aa267b1b8c6ddcefb05b1e02cfaf450489180a57a87d633efff0c8f9133e86091a3cd4c2c4fc99df479b34430f42a2cb0f40d74de5af73f8d"

export function generateToken(payload) {
    return jwt.sign(payload, SECRET, { expiresIn: '1h' })
}

export function getUserFromToken(token) {
  try {
    return jwt.verify(token, SECRET)
  } catch (err) {
    return null
  }
}

//You have to await this function
export async function getUserFromTokenCookie() {
    const tokenUser = getUserFromToken((await cookies()).get('session_token')?.value)
    if(!tokenUser)
      return null
    const user = await getElement('SELECT username, role FROM users WHERE username = ?', [tokenUser.username])
    return user
}

export function computeHash(payload, salt) {
  return crypto.pbkdf2Sync(payload, salt, 100000, 64, 'sha512').toString('hex')
}

export function randomSalt() {
  return crypto.randomBytes(16).toString('hex')
}

export async function getUserIfValidCredentials(credentials) {
  const user = await getElement('SELECT * FROM users WHERE username = ?', [credentials.username])
  if(!user)
    return undefined

  if(computeHash(credentials.password, user.salt) !== user.passwordHash)
    return undefined

  return {username: user.username, role: user.role}
}