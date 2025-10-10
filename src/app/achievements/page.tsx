import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Trophy, Star, CheckCircle } from 'lucide-react'

const achievements = [
  {
    id: '1',
    name: '첫 걸음',
    description: '첫 설문조사 완료',
    icon: '🎯',
    points: 10,
    unlocked: true,
    unlockedAt: '2025-01-05',
    progress: 100,
    condition: '설문 1개 완료',
  },
  {
    id: '2',
    name: '열정적인 참여자',
    description: '10개 설문조사 완료',
    icon: '🔥',
    points: 50,
    unlocked: true,
    unlockedAt: '2025-01-08',
    progress: 100,
    condition: '설문 10개 완료',
  },
  {
    id: '3',
    name: '설문 마스터',
    description: '50개 설문조사 완료',
    icon: '👑',
    points: 200,
    unlocked: false,
    progress: 60,
    condition: '설문 50개 완료 (30/50)',
  },
  {
    id: '4',
    name: '일주일 연속',
    description: '7일 연속 참여',
    icon: '📅',
    points: 100,
    unlocked: false,
    progress: 42,
    condition: '연속 7일 참여 (3/7)',
  },
  {
    id: '5',
    name: '한식 전문가',
    description: '한식 카테고리 10회 참여',
    icon: '🍚',
    points: 75,
    unlocked: false,
    progress: 80,
    condition: '한식 설문 10개 완료 (8/10)',
  },
]

export default function AchievementsPage() {
  const totalPoints = achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.points, 0)
  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="mb-2 flex items-center justify-center gap-3">
            <Trophy className="h-10 w-10" />
            <h1 className="text-4xl font-bold">업적</h1>
          </div>
          <p className="text-center text-yellow-100">
            다양한 업적을 달성하고 특별한 보상을 받으세요!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Summary */}
        <Card className="mb-8 border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-yellow-600">
                  {unlockedCount}/{achievements.length}
                </div>
                <div className="text-sm text-gray-600">달성한 업적</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-orange-600">{totalPoints}P</div>
                <div className="text-sm text-gray-600">업적 포인트</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-green-600">
                  {Math.round((unlockedCount / achievements.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">달성률</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`transition-all ${
                achievement.unlocked
                  ? 'border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-white shadow-lg'
                  : 'border-gray-200 bg-white opacity-75'
              }`}
            >
              <CardHeader>
                <div className="mb-3 flex items-start justify-between">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full text-4xl ${
                      achievement.unlocked ? 'bg-yellow-100' : 'bg-gray-100'
                    }`}
                  >
                    {achievement.unlocked ? achievement.icon : '🔒'}
                  </div>
                  {achievement.unlocked && (
                    <Badge className="bg-green-600">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      달성
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{achievement.name}</CardTitle>
                <CardDescription>{achievement.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{achievement.condition}</span>
                    <Badge variant="secondary" className="font-semibold">
                      +{achievement.points}P
                    </Badge>
                  </div>

                  {!achievement.unlocked && (
                    <div className="space-y-1">
                      <Progress value={achievement.progress} className="h-2" />
                      <p className="text-xs text-gray-500">{achievement.progress}% 달성</p>
                    </div>
                  )}

                  {achievement.unlocked && achievement.unlockedAt && (
                    <p className="text-xs text-gray-500">달성일: {achievement.unlockedAt}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon */}
        <Card className="mt-8">
          <CardContent className="p-8 text-center">
            <Star className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
            <h3 className="mb-2 text-xl font-semibold">더 많은 업적이 곧 추가됩니다!</h3>
            <p className="text-gray-600">계속해서 설문에 참여하며 새로운 업적을 기다려주세요.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
