// lib/api/newsHelpers.ts

import { NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import { Collection } from 'mongodb';
import { NewsItem } from '@/lib/types/news';

export async function handleNewsRequest<T>(
  action: (collection: Collection<NewsItem>) => Promise<T | null>
): Promise<NextResponse> {
    let connection = null;

  try {
    connection = await connect();
    const { db } = connection;
    const collection = db.collection('news');

    const result = await action(collection);

    if (!result) {
      return NextResponse.json({ error: 'News item not found' }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news', details: (error as Error).message },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.client.close();
    }
  }
}
