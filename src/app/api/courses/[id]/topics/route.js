import { NextResponse } from 'next/server';
import { getUserFromTokenCookie } from '@/app/lib/auth';
import { run, query } from '@/app/lib/db';
import { cookies } from 'next/headers';

export async function POST(req, { params }) {
    const cookieStore = cookies();
    const user = getUserFromTokenCookie(cookieStore);

    console.log('user')

    if (!user || !['admin', 'teacher'].includes(user.role)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { title, description, attachments } = await req.json();
    const courseId = Number(params.id);

    if (!title || !courseId) {
        return NextResponse.json({ error: 'Missing title or courseId' }, { status: 400 });
    }

    const result = await new Promise((resolve, reject) => {
        run(
            'INSERT INTO topics (course_id, title, description) VALUES (?, ?, ?)',
            [courseId, title, description || null]
        ).then(resolve).catch(reject);
    });

    const topicId = result.lastID;

    if (Array.isArray(attachments) && attachments.length > 0) {
        for (const name of attachments) {
            await run('INSERT INTO attachments (topic_id, name) VALUES (?, ?)', [topicId, name]);
        }
    }

    return NextResponse.json({ success: true });
}





// import { NextResponse } from 'next/server';
// import { getUserFromTokenCookie } from '@/app/lib/auth';
// import { run } from '@/app/lib/db';

// export async function POST(req, { params }) {
//   const user = await getUserFromTokenCookie();
//   if (!user || !['admin', 'teacher'].includes(user.role)) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
//   }

//   const { title, description } = await req.json();
//   const courseId = Number(params.id);

//   if (!title || !courseId) {
//     return NextResponse.json({ error: 'Missing title or courseId' }, { status: 400 });
//   }

//   await run(
//     'INSERT INTO topics (course_id, title, description) VALUES (?, ?, ?)',
//     [courseId, title, description || null]
//   );

//   return NextResponse.json({ success: true });
// }
