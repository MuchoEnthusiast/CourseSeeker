import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

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
    const user = getUserFromToken((await cookies()).get('session_token')?.value)
    console.log(user)
    return user
}

export function getUserIfValidCredentials(credentials) {
    return { username: "test", role: "teacher" }
}