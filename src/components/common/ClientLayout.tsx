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
    <div className="flex min-h-screen flex-col">
      {mounted && <Navbar />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
