import { NextResponse } from 'next/server';
import { getUserFromTokenCookie } from '@/lib/auth';
import { getDB } from '@/lib/db';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

export async function PUT(req) {
  try {
    const user = await getUserFromTokenCookie();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const form = await req.formData();

    const nationality = form.get('nationality') || '';
    const city = form.get('city') || '';
    const country = form.get('country') || '';
    const description = form.get('description') || '';
    const photo = form.get('photo');
    const deletePhoto = form.get('deletePhoto') === 'true';
    
    let photoFilename = null;

    // Get current user data to check existing photo
    const db = await getDB();
    const currentProfile = await db.get('SELECT photo FROM profile WHERE username = ?', [user.username]);
    
    if (deletePhoto && currentProfile?.photo) {
      // Delete existing photo file
      try {
        const oldPhotoPath = path.join(process.cwd(), 'public', 'uploads', currentProfile.photo);
        await unlink(oldPhotoPath);
        console.log('✅ Old photo deleted:', currentProfile.photo);
      } catch (err) {
        console.warn('⚠️ Could not delete old photo:', err.message);
      }
      photoFilename = null; // Will be set to NULL in database
    } else if (photo && typeof photo.name === 'string') {
      // Upload new photo
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      photoFilename = `${user.username}_${Date.now()}_${photo.name}`;
      const photoPath = path.join(process.cwd(), 'public', 'uploads', photoFilename);
      
      // Delete old photo if exists
      if (currentProfile?.photo) {
        try {
          const oldPhotoPath = path.join(process.cwd(), 'public', 'uploads', currentProfile.photo);
          await unlink(oldPhotoPath);
          console.log('✅ Old photo deleted:', currentProfile.photo);
        } catch (err) {
          console.warn('⚠️ Could not delete old photo:', err.message);
        }
      }
      
      await writeFile(photoPath, buffer);
      console.log('✅ New photo uploaded:', photoFilename);
    }

    // Update database
    if (deletePhoto) {
      await db.run(`
        INSERT INTO profile (username, nationality, city, country, description, photo)
        VALUES (?, ?, ?, ?, ?, NULL)
        ON CONFLICT(username) DO UPDATE SET
          nationality = excluded.nationality,
          city = excluded.city,
          country = excluded.country,
          description = excluded.description,
          photo = NULL;
      `, [user.username, nationality, city, country, description]);
    } else {
      await db.run(`
        INSERT INTO profile (username, nationality, city, country, description, photo)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(username) DO UPDATE SET
          nationality = excluded.nationality,
          city = excluded.city,
          country = excluded.country,
          description = excluded.description,
          photo = COALESCE(excluded.photo, photo);
      `, [user.username, nationality, city, country, description, photoFilename]);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Profile save failed:", err);
    return NextResponse.json({ 
      error: 'Save failed', 
      detail: err.message 
    }, { status: 500 });
  }
}