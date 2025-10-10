import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import dynamic from 'next/dynamic'
import './globals.css'
import { Footer } from '@/components/common/Footer'

const Navbar = dynamic(() => import('@/components/common/Navbar').then((mod) => mod.Navbar), {
  ssr: false,
})

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Foodlytics - AI 음식 피드백 플랫폼',
  description: '음식에 대한 의견을 공유하고 보상을 받으세요',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
