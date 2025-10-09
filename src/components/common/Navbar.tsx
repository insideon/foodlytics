'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useUserStore } from '@/stores/userStore'
import { Trophy, User, LayoutDashboard } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()
  const { profile } = useUserStore()

  const isAdmin = pathname?.startsWith('/admin')

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-blue-600">🍽️</div>
          <span className="text-xl font-bold">Foodlytics</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            href="/survey"
            className={`text-sm font-medium transition-colors hover:text-blue-600 ${
              pathname === '/survey' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            설문 참여
          </Link>
          <Link
            href="/leaderboard"
            className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-blue-600 ${
              pathname === '/leaderboard' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Trophy className="h-4 w-4" />
            <span>리더보드</span>
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-blue-600 ${
                pathname?.startsWith('/admin') ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>관리자</span>
            </Link>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-4">
          {profile ? (
            <>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="font-semibold">
                  Lv.{profile.level}
                </Badge>
                <span className="text-sm font-medium text-gray-600">{profile.points}P</span>
              </div>
              <Link href="/profile">
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src={profile.avatar_url || undefined} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">로그인</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
