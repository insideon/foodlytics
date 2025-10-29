import type { Metadata } from 'next'
import { Noto_Sans, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ClientLayout } from '@/components/common/ClientLayout'

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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
      <body className={`${notoSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
