'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Trophy, Medal, Crown, TrendingUp, TrendingDown, Minus, Zap, Award } from 'lucide-react'
import { formatNumber } from '@/lib/utils'

// Mock data - 실제로는 Supabase에서 가져옴
const weeklyLeaderboard = [
  {
    rank: 1,
    userId: '1',
    username: '음식평론가김',
    avatar: null,
    points: 1250,
    level: 15,
    surveysCompleted: 25,
    rankChange: 2,
    achievements: 12,
  },
  {
    rank: 2,
    userId: '2',
    username: '맛있는세상',
    avatar: null,
    points: 1180,
    level: 14,
    surveysCompleted: 23,
    rankChange: -1,
    achievements: 10,
  },
  {
    rank: 3,
    userId: '3',
    username: 'FoodLover',
    avatar: null,
    points: 1050,
    level: 13,
    surveysCompleted: 21,
    rankChange: 1,
    achievements: 9,
  },
  {
    rank: 4,
    userId: '4',
    username: '설문왕',
    avatar: null,
    points: 920,
    level: 12,
    surveysCompleted: 18,
    rankChange: 0,
    achievements: 8,
  },
  {
    rank: 5,
    userId: '5',
    username: '한식러버',
    avatar: null,
    points: 880,
    level: 11,
    surveysCompleted: 17,
    rankChange: 3,
    achievements: 7,
  },
  ...Array.from({ length: 15 }, (_, i) => ({
    rank: i + 6,
    userId: `${i + 6}`,
    username: `사용자${i + 6}`,
    avatar: null,
    points: 850 - i * 40,
    level: 11 - Math.floor(i / 3),
    surveysCompleted: 16 - i,
    rankChange: ((i + 1) % 5) - 2,
    achievements: 7 - Math.floor(i / 3),
  })),
]

const myRank = {
  rank: 12,
  userId: 'current-user',
  username: '내계정',
  avatar: null,
  points: 650,
  level: 9,
  surveysCompleted: 13,
  rankChange: 2,
  achievements: 6,
}

const categories = [
  { id: 'all', name: '전체', icon: '🏆' },
  { id: 'korean', name: '한식', icon: '🍚' },
  { id: 'western', name: '양식', icon: '🍝' },
  { id: 'chinese', name: '중식', icon: '🥟' },
  { id: 'japanese', name: '일식', icon: '🍱' },
  { id: 'dessert', name: '디저트', icon: '🍰' },
]

export default function LeaderboardPage() {
  const [period, setPeriod] = useState('week')
  const [category, setCategory] = useState('all')

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-yellow-500" />
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />
    if (rank === 3) return <Medal className="h-6 w-6 text-amber-600" />
    return <span className="text-lg font-bold text-gray-500">{rank}</span>
  }

  const getRankChangeIcon = (change: number) => {
    if (change > 0)
      return (
        <div className="flex items-center gap-1 text-green-600">
          <TrendingUp className="h-4 w-4" />
          <span className="text-xs font-semibold">+{change}</span>
        </div>
      )
    if (change < 0)
      return (
        <div className="flex items-center gap-1 text-red-600">
          <TrendingDown className="h-4 w-4" />
          <span className="text-xs font-semibold">{change}</span>
        </div>
      )
    return (
      <div className="flex items-center gap-1 text-gray-400">
        <Minus className="h-4 w-4" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="mb-2 flex items-center justify-center gap-3">
            <Trophy className="h-10 w-10" />
            <h1 className="text-4xl font-bold">리더보드</h1>
          </div>
          <p className="text-center text-purple-100">
            최고의 참여자들과 경쟁하고 순위를 올려보세요!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Period Tabs */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <Tabs value={period} onValueChange={setPeriod} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="day">일간</TabsTrigger>
                <TabsTrigger value="week">주간</TabsTrigger>
                <TabsTrigger value="month">월간</TabsTrigger>
                <TabsTrigger value="all">전체</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={category === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategory(cat.id)}
              className="gap-1"
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </Button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  주간 랭킹
                </CardTitle>
                <CardDescription>2025년 1월 2주차 (1/6 - 1/12)</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {/* Top 3 Podium */}
                <div className="grid grid-cols-3 gap-4 border-b bg-gradient-to-b from-yellow-50 to-white p-6">
                  {/* 2nd Place */}
                  <div className="flex flex-col items-center">
                    <div className="mb-2 text-2xl">🥈</div>
                    <Avatar className="mb-2 h-16 w-16 border-4 border-gray-300">
                      <AvatarFallback className="bg-gray-200 text-lg font-bold">
                        {weeklyLeaderboard[1].username.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <p className="mb-1 text-center text-sm font-semibold">
                      {weeklyLeaderboard[1].username}
                    </p>
                    <Badge variant="secondary" className="mb-1">
                      Lv.{weeklyLeaderboard[1].level}
                    </Badge>
                    <p className="text-lg font-bold text-gray-600">
                      {formatNumber(weeklyLeaderboard[1].points)}P
                    </p>
                  </div>

                  {/* 1st Place */}
                  <div className="-mt-4 flex flex-col items-center">
                    <div className="mb-2 text-3xl">👑</div>
                    <Avatar className="mb-2 h-20 w-20 border-4 border-yellow-400">
                      <AvatarFallback className="bg-yellow-100 text-xl font-bold">
                        {weeklyLeaderboard[0].username.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <p className="mb-1 text-center font-bold">{weeklyLeaderboard[0].username}</p>
                    <Badge className="mb-1 bg-yellow-500">Lv.{weeklyLeaderboard[0].level}</Badge>
                    <p className="text-xl font-bold text-yellow-600">
                      {formatNumber(weeklyLeaderboard[0].points)}P
                    </p>
                  </div>

                  {/* 3rd Place */}
                  <div className="flex flex-col items-center">
                    <div className="mb-2 text-2xl">🥉</div>
                    <Avatar className="mb-2 h-16 w-16 border-4 border-amber-600">
                      <AvatarFallback className="bg-amber-100 text-lg font-bold">
                        {weeklyLeaderboard[2].username.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <p className="mb-1 text-center text-sm font-semibold">
                      {weeklyLeaderboard[2].username}
                    </p>
                    <Badge variant="secondary" className="mb-1">
                      Lv.{weeklyLeaderboard[2].level}
                    </Badge>
                    <p className="text-lg font-bold text-amber-700">
                      {formatNumber(weeklyLeaderboard[2].points)}P
                    </p>
                  </div>
                </div>

                {/* Rankings List */}
                <div className="divide-y">
                  {weeklyLeaderboard.slice(3).map((user) => (
                    <div
                      key={user.userId}
                      className={`flex items-center justify-between p-4 transition-colors hover:bg-gray-50 ${
                        user.userId === myRank.userId ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex w-8 items-center justify-center">
                          {getRankIcon(user.rank)}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="font-semibold">
                            {user.username.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{user.username}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Badge variant="outline" className="text-xs">
                              Lv.{user.level}
                            </Badge>
                            <span>•</span>
                            <span>{user.surveysCompleted}개 완료</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold">{formatNumber(user.points)}P</p>
                          {getRankChangeIcon(user.rankChange)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* My Rank Card */}
            <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="h-5 w-5 text-blue-600" />내 순위
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                    #{myRank.rank}
                  </div>
                  <div className="flex-1">
                    <p className="mb-1 font-bold">{myRank.username}</p>
                    <Badge className="mb-1">Lv.{myRank.level}</Badge>
                    <p className="text-sm text-gray-600">{myRank.achievements}개 업적</p>
                  </div>
                </div>

                <div className="space-y-2 rounded-lg bg-white p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">포인트</span>
                    <span className="font-bold">{formatNumber(myRank.points)}P</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">완료한 설문</span>
                    <span className="font-bold">{myRank.surveysCompleted}개</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">순위 변동</span>
                    {getRankChangeIcon(myRank.rankChange)}
                  </div>
                </div>

                <Button className="w-full">더 많은 설문 참여하기</Button>
              </CardContent>
            </Card>

            {/* Weekly Rewards */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Award className="h-5 w-5 text-purple-600" />
                  주간 보상
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-yellow-100 to-yellow-50 p-3">
                  <div className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-600" />
                    <span className="font-semibold">1위</span>
                  </div>
                  <Badge className="bg-yellow-500">1,000P</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 p-3">
                  <div className="flex items-center gap-2">
                    <Medal className="h-5 w-5 text-gray-400" />
                    <span className="font-semibold">2위</span>
                  </div>
                  <Badge variant="secondary">500P</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-amber-100 to-amber-50 p-3">
                  <div className="flex items-center gap-2">
                    <Medal className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold">3위</span>
                  </div>
                  <Badge variant="secondary">300P</Badge>
                </div>
                <div className="rounded-lg bg-blue-50 p-3 text-center text-sm text-gray-600">
                  4-10위: 100P
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">전체 통계</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-gray-600">총 참여자</span>
                    <span className="font-bold">1,234명</span>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-gray-600">평균 포인트</span>
                    <span className="font-bold">450P</span>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-gray-600">이번 주 완료된 설문</span>
                    <span className="font-bold">5,678개</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
