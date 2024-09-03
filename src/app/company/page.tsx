// src/app/company/page.tsx
import React from 'react';

export default function CompanyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white bg-opacity-90 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8 text-center">会社概要</h1>
        <div className="border-t border-gray-200">
          {[
            { term: '社名', description: '株式会社ロード製作所' },
            { term: '代表取締役社長', description: '安田研二' },
            { term: '所在地', description: '520-2123 滋賀県大津市瀬田大江町横谷1-5' },
            { term: '資本金', description: '1円' },
            { term: '創業', description: '2024年8月' },
            { term: '事業内容', description: 'ITコンサルティング, アプリ開発' },
          ].map((item, index) => (
            <div key={item.term} className={`py-5 ${index !== 0 ? 'border-t border-gray-200' : ''}`}>
              <div className="grid grid-cols-3 gap-4">
                <dt className="text-sm font-medium text-gray-600">{item.term}</dt>
                <dd className="text-sm text-gray-900 col-span-2">{item.description}</dd>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}