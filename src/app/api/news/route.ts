import { handleNewsRequest } from '@/lib/api/newsHelpers';
import { Collection } from 'mongodb';
import { NewsItem } from '@/lib/types/news';
import { NextResponse } from 'next/server';

export async function GET() {
  // return handleNewsRequest(async (collection: Collection<NewsItem>) => {
  //   console.log('Querying database');
  //   return await collection.find().sort({ date: -1 }).toArray();
  //   console.log(`Found news items`);
  // });
  try {
    const news = await handleNewsRequest(async (collection) => {
      return await collection.find().sort({ date: -1 }).toArray();
    });
    
    // 明示的にJSONレスポンスを返す
    return NextResponse.json(news);
  } catch (error) {
    console.error('Error in /api/news:', error);
    // エラー時もJSONレスポンスを返す
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}


// export async function GET() {
//   let connection = null;

//   try {
//     connection = await connect();
//     const { db } = connection;
    
//     const news = await db.collection('news')
//       .find()
//       .sort({ date: -1 })
//       .toArray();

//     console.log('API route returning sorted news:', news);
//     return NextResponse.json(news);
//   } catch (error) {
//     console.error('Failed to fetch news:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch news' },
//       { status: 500 }
//     );
//   } finally {
//     if (connection) {
//       await connection.client.close();
//     }
//   }
// }