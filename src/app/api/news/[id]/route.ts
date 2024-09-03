// app/api/news/[id]/route.ts
import { handleNewsRequest } from '@/lib/api/newsHelpers';
import { Collection } from 'mongodb';
import { NewsItem } from '@/lib/types/news';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const newsId = params.id;
  return handleNewsRequest(async (collection: Collection<NewsItem>) => {
    return await collection.findOne({ newsId: newsId });
  });
}