import { NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import { Collection } from 'mongodb';
import { NewsItem } from '@/lib/types/news';

export async function handleNewsRequest<T>(
  action: (collection: Collection<NewsItem>) => Promise<T | null>
): Promise<NextResponse> {
  let connection = null;

  try {
    console.log('Connecting to database');
    connection = await connect();
    const { db } = connection;
    const collection = db.collection('news');

    console.log('Executing database action');
    const result = await action(collection);

    if (!result) {
      console.log('No results found');
      return NextResponse.json({ error: 'News item not found' }, { status: 404 });
    }

    console.log('Returning results');
    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news', details: (error as Error).message },
      { status: 500 }
    );
  } finally {
    if (connection) {
      console.log('Closing database connection');
      await connection.client.close();
    }
  }
}