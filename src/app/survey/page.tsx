import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Clock, Users, Award, ChevronRight } from 'lucide-react'

// Mock data - 실제로는 Supabase에서 가져옴
const surveys = [
  {
    id: '1',
    title: '2025년 한식 선호도 조사',
    description: '한국인이 가장 좋아하는 한식 메뉴와 선호도를 알아보는 설문입니다',
    category: '한식',
    points_reward: 50,
    estimated_time: 5,
    responses_count: 1234,
    total_questions: 10,
  },
  {
    id: '2',
    title: '디저트 트렌드 리서치',
    description: '최신 디저트 트렌드와 소비자 선호도를 파악하는 설문입니다',
    category: '디저트',
    points_reward: 30,
    estimated_time: 3,
    responses_count: 856,
    total_questions: 8,
  },
  {
    id: '3',
    title: '양식 레스토랑 방문 경험',
    description: '양식 레스토랑 이용 경험과 만족도에 대한 설문입니다',
    category: '양식',
    points_reward: 40,
    estimated_time: 4,
    responses_count: 542,
    total_questions: 12,
  },
  {
    id: '4',
    title: '중식 배달 음식 선호도',
    description: '중식 배달 음식의 맛, 가격, 배달 속도에 대한 의견을 듣습니다',
    category: '중식',
    points_reward: 35,
    estimated_time: 4,
    responses_count: 678,
    total_questions: 9,
  },
]

const categories = ['전체', '한식', '양식', '중식', '일식', '디저트', '카페']

export default function SurveyListPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="mb-2 text-4xl font-bold">설문조사 참여하기</h1>
          <p className="text-blue-100">
            설문에 참여하고 포인트를 획득하세요. 모든 설문은 익명으로 진행됩니다.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === '전체' ? 'default' : 'outline'}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>이번 주 진행 상황</CardTitle>
                <CardDescription>3개 완료 / 목표 5개</CardDescription>
              </div>
              <Badge variant="secondary" className="text-lg">
                <Award className="mr-1 h-4 w-4" />
                150P
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={60} className="h-3" />
            <p className="mt-2 text-sm text-gray-600">2개만 더 완료하면 보너스 50P를 받아요!</p>
          </CardContent>
        </Card>

        {/* Survey List */}
        <div className="grid gap-6 md:grid-cols-2">
          {surveys.map((survey) => (
            <Card key={survey.id} className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex items-start justify-between">
                  <Badge variant="secondary">{survey.category}</Badge>
                  <Badge className="bg-green-600">
                    <Award className="mr-1 h-3 w-3" />
                    {survey.points_reward}P
                  </Badge>
                </div>
                <CardTitle className="text-xl">{survey.title}</CardTitle>
                <CardDescription className="line-clamp-2">{survey.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>약 {survey.estimated_time}분</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{survey.responses_count.toLocaleString()}명 참여</span>
                  </div>
                </div>

                <Button asChild className="w-full">
                  <Link href={`/survey/${survey.id}`}>
                    시작하기
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State (when no surveys) */}
        {surveys.length === 0 && (
          <div className="py-16 text-center">
            <div className="mb-4 text-6xl">📋</div>
            <h3 className="mb-2 text-xl font-semibold">진행 중인 설문이 없습니다</h3>
            <p className="text-gray-600">곧 새로운 설문이 추가될 예정입니다!</p>
          </div>
        )}
      </div>
    </div>
  )
}
