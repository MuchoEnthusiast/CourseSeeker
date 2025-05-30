import { NextResponse } from 'next/server';
import { getUserFromTokenCookie } from '@/lib/auth';
import { getDB } from '@/lib/db';



export async function PUT(req) {
  const user = await getUserFromTokenCookie()
  if(!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  try {
    const form = await req.formData();

    const nationality = form.get('nationality') || '';
    const city = form.get('city') || '';
    const country = form.get('country') || '';
    const description = form.get('description') || '';
    const deletePhoto = form.get('deletePhoto') === 'true';
    const photo = deletePhoto ? null : form.get('photo')
    const base64photo = photo ? Buffer.from(await photo.arrayBuffer()).toString('base64') : null
    const unsafeMimeType = photo ? photo.type : null

    const imageMimeTypes = [
                              'image/jpeg',
                              'image/png',
                              'image/gif',
                              'image/webp',
                              'image/svg+xml'
                            ]
    const safeMimeTypeFilter = imageMimeTypes.filter(imt => imt === unsafeMimeType)
    const safeMimeType = safeMimeTypeFilter.length === 1 ? safeMimeTypeFilter[0] : null
    if(photo && !safeMimeType) {
      return NextResponse.json({ 
        error: 'Invalid mime type'
      }, { status: 500 });
    }

    const db = await getDB();

    if(!deletePhoto && !photo) {
      await db.run(`
      INSERT INTO profile (username, nationality, city, country, description)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(username) DO UPDATE SET
        nationality = excluded.nationality,
        city = excluded.city,
        country = excluded.country,
        description = excluded.description;
    `, [user.username, nationality, city, country, description])

    } else {
    await db.run(`
        INSERT INTO profile (username, nationality, city, country, description, photo, mimeType)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(username) DO UPDATE SET
          nationality = excluded.nationality,
          city = excluded.city,
          country = excluded.country,
          description = excluded.description,
          photo = excluded.photo,
          mimeType = excluded.mimeType;
      `, [user.username, nationality, city, country, description, base64photo, safeMimeType])
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Profile save failed:", err);
    return NextResponse.json({ 
      error: 'Save failed', 
      detail: err.message 
    }, { status: 500 });
  }
}