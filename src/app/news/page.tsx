import { NewsItem } from '@/lib/types/news';
import Link from 'next/link';
import Image from 'next/image';
import { getApiUrl } from '../utils/api';

async function getNews(): Promise<NewsItem[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${apiUrl}/api/news`, { 
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache'
    }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch news');
  }
  
  const data = await res.json();
  
  return data.map((item: any) => ({
    ...item,
    date: new Date(item.date)
  })) as NewsItem[];
}

function formatDate(dateString: string | Date): string {
  const date = new Date(dateString);

  // 無効な日付の場合は空文字列を返す
  if (isNaN(date.getTime())) {
    return '';
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()は0から始まるため、1を加算
  const day = date.getDate();

  return `${year}年${month.toString().padStart(2, '0')}月${day.toString().padStart(2, '0')}日`;
}

export default async function NewsPage() {
  let news: NewsItem[] = [];
  
  try {
    news = await getNews();
    console.log('News items:', news);
  } catch (error) {
    console.error('Error fetching news:', error);
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">ニュース一覧</h1>
      {news.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
          <Link href={`/news/${item.newsId}`} key={item.newsId}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-600 text-sm mb-2">
                  {formatDate(item.date)}
                </p>
                <p className="text-gray-700 line-clamp-3">{item.content}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      ) : (
        <p>ニュースの読み込み中にエラーが発生しました。</p>
      )}
    </main>
  );
}