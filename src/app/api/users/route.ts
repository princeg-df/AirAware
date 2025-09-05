import {NextRequest, NextResponse} from 'next/server';
import pool from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ message: 'Username, email, and password are required' }, { status: 400 });
    }

    // In a real application, you would hash the password here before storing it.
    const password_hash = password; // Storing plain text for now.

    // Check if a user with the same email or username already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username]);

    if (existingUser.rows.length > 0) {
      return NextResponse.json({ message: 'A user with this email or username already exists.' }, { status: 409 });
    }

    const newUser = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, created_at',
      [username, email, password_hash]
    );

    return NextResponse.json(newUser.rows[0], { status: 201 });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
