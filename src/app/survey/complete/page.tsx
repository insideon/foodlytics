'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, Trophy, Zap, Gift, ArrowRight } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function SurveyCompletePage() {
  const [showRewards, setShowRewards] = useState(false)

  useEffect(() => {
    // Celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })

    setTimeout(() => {
      setShowRewards(true)
    }, 500)
  }, [])

  const earnedPoints = 50
  const newLevel = 5
  const newAchievements = ['첫 걸음', '설문 마스터']
  const nextSurveys = [
    { id: '2', title: '디저트 트렌드 리서치', points: 30 },
    { id: '3', title: '양식 레스토랑 방문 경험', points: 40 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
      <div className="container mx-auto max-w-2xl px-4">
        {/* Success Message */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="mb-2 text-4xl font-bold">설문 완료!</h1>
          <p className="text-lg text-gray-600">소중한 의견을 주셔서 감사합니다</p>
        </div>

        {/* Rewards Card */}
        <Card
          className={`mb-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 transition-all duration-500 ${
            showRewards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Gift className="h-6 w-6 text-blue-600" />
              획득한 보상
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Points */}
            <div className="flex items-center justify-between rounded-lg bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                  <Zap className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="font-semibold">포인트</p>
                  <p className="text-sm text-gray-600">경험치 획득</p>
                </div>
              </div>
              <Badge className="text-lg">+{earnedPoints}P</Badge>
            </div>

            {/* Level */}
            <div className="rounded-lg bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                    <Trophy className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold">레벨 업!</p>
                    <p className="text-sm text-gray-600">다음 레벨까지 50P</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-lg">
                  Lv.{newLevel}
                </Badge>
              </div>
              <Progress value={60} className="mt-2 h-2" />
            </div>

            {/* Achievements */}
            {newAchievements.length > 0 && (
              <div className="rounded-lg bg-white p-4">
                <p className="mb-3 font-semibold">🏆 새로운 업적 달성!</p>
                <div className="space-y-2">
                  {newAchievements.map((achievement) => (
                    <div
                      key={achievement}
                      className="flex items-center justify-between rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-2"
                    >
                      <span className="text-sm font-medium">{achievement}</span>
                      <Badge variant="outline" className="border-yellow-400 text-yellow-700">
                        +10P
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>이번 주 통계</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="mb-1 text-3xl font-bold text-blue-600">4</div>
                <div className="text-sm text-gray-600">완료한 설문</div>
              </div>
              <div>
                <div className="mb-1 text-3xl font-bold text-purple-600">150P</div>
                <div className="text-sm text-gray-600">획득 포인트</div>
              </div>
              <div>
                <div className="mb-1 text-3xl font-bold text-green-600">#12</div>
                <div className="text-sm text-gray-600">이번 주 순위</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Surveys */}
        <Card>
          <CardHeader>
            <CardTitle>다음 설문 추천</CardTitle>
            <CardDescription>계속해서 포인트를 획득하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {nextSurveys.map((survey) => (
              <Link key={survey.id} href={`/survey/${survey.id}`}>
                <div className="flex items-center justify-between rounded-lg border p-4 transition-all hover:border-blue-300 hover:bg-blue-50">
                  <span className="font-medium">{survey.title}</span>
                  <div className="flex items-center gap-2">
                    <Badge>{survey.points}P</Badge>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <Button asChild className="flex-1" size="lg">
            <Link href="/survey">다른 설문 참여하기</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1" size="lg">
            <Link href="/profile">내 프로필 보기</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
