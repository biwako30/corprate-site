import { handleNewsRequest } from '@/lib/api/newsHelpers';
import { Collection } from 'mongodb';
import { NewsItem } from '@/lib/types/news';
import { NextResponse } from 'next/server';

export async function GET() {
  console.log('GET /api/news request received');
  try {
    const result = await handleNewsRequest(async (collection: Collection<NewsItem>) => {
      console.log('Querying database');
      return await collection.find().sort({ date: -1 }).toArray();
    });
    console.log('API response:', result);
    return result;
  } catch (error) {
    console.error('Error in GET /api/news:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: (error as Error).message },
      { status: 500 }
    );
  }
}