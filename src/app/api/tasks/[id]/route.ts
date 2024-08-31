import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const existingSession = await getServerSession(authOptions);

    if (!existingSession) {
      return NextResponse.json(
        { error: 'You are not authorized.' },
        { status: 401 }
      );
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Task ID is required.' },
        { status: 400 }
      );
    }

    await sql`DELETE FROM tasks WHERE id = ${id} AND user_id = ${existingSession.user.id}`;

    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 400 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const existingSession = await getServerSession(authOptions);

    if (!existingSession) {
      return NextResponse.json(
        { error: 'You are not authorized.' },
        { status: 401 }
      );
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Task ID is required.' },
        { status: 400 }
      );
    }

    const { title, description, priority } = await request.json();

    if (!title || !priority) {
      return NextResponse.json(
        { error: 'Title and priority are required.' },
        { status: 400 }
      );
    }

    const result = await sql`
      UPDATE tasks
      SET title = ${title}, description = ${description}, priority = ${priority}
      WHERE id = ${id} AND user_id = ${existingSession.user.id}
    `;

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: 'Task not found or you are not authorized to update it.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 400 }
    );
  }
}
