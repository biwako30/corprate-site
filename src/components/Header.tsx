import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              株式会社ロード製作所
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link href="/business" className="text-base font-medium text-gray-500 hover:text-gray-900">
              事業内容
            </Link>
            <Link href="/company" className="text-base font-medium text-gray-500 hover:text-gray-900">
              会社概要
            </Link>
            <Link href="/news" className="text-base font-medium text-gray-500 hover:text-gray-900">
              ニュース
            </Link>
            <Link href="/contact" className="text-base font-medium text-gray-500 hover:text-gray-900">
              お問い合わせ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}