'use client';

import React, { useEffect, useRef, useCallback } from 'react'
import { NewsItem } from '@/lib/types/news'
import Link from 'next/link'

interface NewsContentProps {
  newsItems: NewsItem[]
}

export default function NewsContent({ newsItems }: NewsContentProps) {
  const newsRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setNewsRef = useCallback((el: HTMLDivElement | null, index: number) => {
    newsRefs.current[index] = el;
  }, []);

  useEffect(() => {
    console.log('NewsContent received news items:', newsItems)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    newsRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const limitedNewsItems = newsItems.slice(0, 3);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">最新ニュース</h2>
        <div className="space-y-4">
          {limitedNewsItems.map((item, index) => (
            <Link href={`/news/${item.newsId}`} key={item.newsId}>
              <div
                ref={(el) => setNewsRef(el, index)}
                className="news-item bg-white bg-opacity-80 overflow-hidden shadow rounded-lg opacity-0 transform translate-y-10 transition-all duration-1000 ease-out"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="text-sm font-medium text-blue-600">
                    {new Date(item.date).toLocaleDateString('ja-JP')}
                  </div>
                  <div className="mt-1 text-base text-gray-900">{item.title}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/news" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
            すべてのニュースを見る
          </Link>
        </div>
      </div>
    </div>
  )
}