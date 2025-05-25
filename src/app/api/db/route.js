import { getUserFromTokenCookie } from "@/lib/auth"
import { addUser, getCredentials, getUsers, populateDB } from "@/lib/data"
import { NextResponse } from "next/server"



export async function GET() {
  // const user = await getUserFromTokenCookie()
  // if(!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  // if(user.role !== "teacher") return NextResponse.json({ error: 'You must have role teacher' }, { status: 401 })

  populateDB()
  return Response.json({success:true})
}