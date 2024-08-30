import { taskSchema } from '@/lib/validation/task';
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const existingSession = await getServerSession(authOptions);

    if (!existingSession) {
      return NextResponse.json(
        { error: 'You are not authorized.' },
        { status: 401 }
      );
    }

    const response =
      await sql`SELECT * FROM tasks WHERE user_id = ${existingSession.user.id}`;

    const tasks = response.rows;

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 400 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const existingSession = await getServerSession(authOptions);

    if (!existingSession) {
      return NextResponse.json(
        { error: 'You are not authorized.' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      title: parsedTitle,
      description: parsedDescription,
      priority: parsedPriority,
    } = taskSchema.parse({
      title: body.title,
      description: body.description,
      priority: body.priority,
    });

    await sql`INSERT INTO tasks (title, description, priority, user_id) VALUES (${parsedTitle}, ${parsedDescription}, ${parsedPriority}, ${existingSession.user.id})`;

    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 400 }
    );
  }
}
