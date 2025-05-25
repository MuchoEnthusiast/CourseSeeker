import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';

function getDb() {
    return new sqlite3.Database('./database.db');
}

function getSingleRow(db, query, params = []) {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

export async function GET(_, { params }) {
    const db = getDb();
    try {
        const id = Number(params.id);
        const course = await getSingleRow(db, 'SELECT * FROM courses WHERE id = ?', [id]);

        // const course = await getSingleRow(db, 'SELECT * FROM courses WHERE id = ?', [params.id]);
        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }
        return NextResponse.json(course);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        db.close();
    }
}
