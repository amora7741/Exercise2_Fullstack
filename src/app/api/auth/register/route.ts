import { credentialsSchema } from '@/lib/validation/credentials';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { username: parsedUsername, password: parsedPassword } =
      credentialsSchema.parse({
        username: body.username,
        password: body.password,
      });

    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 400 }
    );
  }
}
