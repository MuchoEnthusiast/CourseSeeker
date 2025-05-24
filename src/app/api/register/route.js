import { NextResponse } from 'next/server'
import { addUser } from '@/app/lib/users'

export async function POST(req) {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    try {
        await addUser({ name, email, password })
        return NextResponse.json({ success: true })
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 400 })
    }
}






// import { addUser } from '@/app/lib/users'
// import { NextResponse } from 'next/server'

// export async function POST(req) {
//   const { username, password } = await req.json()
//   if (!username || !password) {
//     return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
//   }

//   try {
//     await addUser({ username, password })
//     return NextResponse.json({ success: true })
//   } catch (e) {
//     return NextResponse.json({ error: e.message }, { status: 400 })
//   }
// }
