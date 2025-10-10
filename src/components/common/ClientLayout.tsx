'use client'

import { useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex min-h-screen flex-col" suppressHydrationWarning>
      {mounted && <Navbar />}
      <main className="flex-1" suppressHydrationWarning>
        {children}
      </main>
      <Footer />
    </div>
  )
}
