import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Inter } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'
import type { Metadata } from 'next'
import Footer from './components/footer'
import { Navbar } from './components/nav'
import './global.css'
import { baseUrl } from './sitemap'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'PUCtafolio by develipster',
    template: '%s | PUCtafolio by develipster',
  },
  description: 'This is my portfolio for showcasing my work and projects at Ingenieria UC.',
  openGraph: {
    title: 'My Portfolio',
    description: 'This is my portfolio for showcasing my work and projects at Ingenieria UC.',
    url: baseUrl,
    siteName: 'PUCtafolio by develipster',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        inter.variable,
        jetbrainsMono.variable
      )}
    >
      <body className="antialiased mt-8">
        <main className="flex-auto min-w-0 mt-6 flex flex-col">
          <Analytics />
          <SpeedInsights />
          <div className="max-w-xl mx-4 lg:mx-auto px-2 md:px-0">
            <Navbar />
          </div>
          {children}
          <div className="max-w-xl mx-4 lg:mx-auto px-2 md:px-0">
            <Footer />
          </div>
        </main>
      </body>
    </html>
  )
}