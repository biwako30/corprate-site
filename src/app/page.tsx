import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import NewsWrapper from '@/components/NewsWrapper'

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Services />
        <NewsWrapper />
      </main>
    </>
  )
}