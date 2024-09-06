import NewsContent from './NewsContent'
import { NewsItem } from '@/lib/types/news'
import { getApiUrl } from '../app/utils/api';

async function getNewsItems(): Promise<NewsItem[]> {
  const apiUrl = getApiUrl();
  console.log('Fetching news from:', `${apiUrl}/news`)

  const res = await fetch(`${apiUrl}/news`, { 
    next: { revalidate: 60 }
  })

  if (!res.ok) {
    console.error('API response not OK:', res.status, res.statusText)
    const text = await res.text()
    console.error('Response body:', text)
    throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`)
  }

  const contentType = res.headers.get('content-type')
  if (!contentType || !contentType.includes('application/json')) {
    console.error('Unexpected content type:', contentType)
    const text = await res.text()
    console.error('Response body:', text)
    throw new Error(`Unexpected content type: ${contentType}`)
  }

  const data = await res.json()
  return data
}

export default async function NewsWrapper() {
  try {
    const newsItems = await getNewsItems()
    console.log('News items in NewsWrapper:', newsItems)
    return <NewsContent newsItems={newsItems} />
  } catch (error) {
    console.error('Error in NewsWrapper:', error)
    return <div>ニュースの取得中にエラーが発生しました。詳細はコンソールを確認してください。</div>
  }
}