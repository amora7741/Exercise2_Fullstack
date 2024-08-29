import { credentialsSchema } from '@/lib/validation/credentials';
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { hash } from 'bcrypt';

export async function POST(request: Request) {
  const usernameMinLength = 5;
  const passwordMinLength = 8;

  try {
    const body = await request.json();

    const { username: parsedUsername, password: parsedPassword } =
      credentialsSchema.parse({
        username: body.username,
        password: body.password,
      });

    if (parsedUsername.length < usernameMinLength) {
      return NextResponse.json(
        { error: 'Username must be at least 5 characters long.' },
        { status: 400 }
      );
    }

    if (parsedPassword.length < passwordMinLength) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    const existingUser =
      await sql`SELECT * FROM users WHERE username = ${parsedUsername} LIMIT 1;`;

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'Username already exists.' },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(parsedPassword, 10);

    await sql`INSERT INTO users (username, password) VALUES (${parsedUsername}, ${hashedPassword});`;

    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 400 }
    );
  }
}
