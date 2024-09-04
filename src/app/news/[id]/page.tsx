import { NewsItem } from '@/lib/types/news';
import Image from 'next/image';
import { getApiUrl } from '../../utils/api';

async function getNewsItem(id: string): Promise<NewsItem> {
  //  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const apiUrl = getApiUrl();

  const res = await fetch(`${apiUrl}/api/news/${id}`, { next: { revalidate: 60 } });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('News item not found');
    }
    throw new Error('Failed to fetch news item');
  }

  const data = await res.json();
  return {
    ...data,
    date: new Date(data.date),
    newsId: data.newsId
  };
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  let newsItem: NewsItem | null = null;
  let error: string | null = null;

  try {
    newsItem = await getNewsItem(params.id);
  } catch (e) {
    error = e instanceof Error ? e.message : 'An unknown error occurred';
    console.error('Error fetching news item:', error);
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">エラー</h1>
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  if (!newsItem) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">ニュースが見つかりません</h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{newsItem.title}</h1>
      <p className="text-gray-600 mb-4">{formatDate(newsItem.date)}</p>
      <div className="relative w-full h-64 mb-6">
        <Image
          src={newsItem.image}
          alt={newsItem.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="prose max-w-none">
        <p>{newsItem.content}</p>
      </div>
    </main>
  );
}