// src/components/NewsWrapper.tsx
import NewsContent from './NewsContent'
import { NewsItem } from '@/lib/types/news'

async function getNewsItems(): Promise<NewsItem[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  console.log('Fetching news from:', `${apiUrl}/api/news`) // デバッグログ

  const res = await fetch(`${apiUrl}/api/news`, { 
    next: { revalidate: 60 }
  })

  if (!res.ok) {
    console.error('API response not OK:', res.status, res.statusText) // エラーログ
    throw new Error('Failed to fetch news')
  }

  const data = await res.json()
  //console.log('Fetched news data:', data) // デバッグログ
  return data
}

export default async function NewsWrapper() {
  try {
    const newsItems = await getNewsItems()
    console.log('News items in NewsWrapper:', newsItems) // デバッグログ
    return <NewsContent newsItems={newsItems} />
  } catch (error) {
    console.error('Error in NewsWrapper:', error)
    return <div>ニュースの取得中にエラーが発生しました。</div>
  }
}