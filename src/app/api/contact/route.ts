import { NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();
    const connection = await connect();
    const { db } = connection;

    const result = await db.collection('contact').insertOne({
      name,
      email,
      phone,
      message,
      createdAt: new Date(),
    });

    await connection.client.close();

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}