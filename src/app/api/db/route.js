import { getUserFromTokenCookie } from "@/lib/auth"
import { addUser, getCredentials, getUsers, populateDB } from "@/lib/data"
import { NextResponse } from "next/server"


//TODO: Just for testing
//This endpoint populates the db with test data
export async function GET() {
  populateDB()
  return Response.json({success:true})
}