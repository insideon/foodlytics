'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ClipboardList, Award, TrendingUp, Zap, Target, Gift, ChevronRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-4">
          🎉 AI 기반 음식 피드백 플랫폼
        </Badge>
        <h1 className="mb-6 text-5xl font-bold tracking-tight">
          음식에 대한 의견을 공유하고
          <br />
          <span className="text-blue-600">보상을 받으세요</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          간단한 설문조사에 참여하여 포인트를 획득하고, 레벨을 올리며, 다양한 업적을 달성하세요.
          여러분의 소중한 의견이 더 나은 음식 문화를 만듭니다.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button asChild size="lg" className="text-lg">
            <Link href="/survey">
              지금 시작하기 <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg">
            <Link href="/about">자세히 알아보기</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold">왜 Foodlytics인가요?</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <ClipboardList className="mb-2 h-10 w-10 text-blue-600" />
              <CardTitle>다양한 설문 유형</CardTitle>
              <CardDescription>
                객관식, 주관식, 평점, 이미지 업로드 등 다양한 방식으로 의견을 표현하세요
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Gift className="mb-2 h-10 w-10 text-green-600" />
              <CardTitle>보상 시스템</CardTitle>
              <CardDescription>
                설문 참여 시 포인트를 획득하고, 레벨을 올려 더 많은 혜택을 받으세요
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Award className="mb-2 h-10 w-10 text-yellow-600" />
              <CardTitle>업적 시스템</CardTitle>
              <CardDescription>
                다양한 업적을 달성하며 재미있게 참여하고, 특별한 보상을 받으세요
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="mb-2 h-10 w-10 text-purple-600" />
              <CardTitle>리더보드</CardTitle>
              <CardDescription>
                다른 사용자들과 경쟁하며 순위를 올리고 최고의 참여자가 되어보세요
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Target className="mb-2 h-10 w-10 text-red-600" />
              <CardTitle>직관적인 인터페이스</CardTitle>
              <CardDescription>
                구글폼을 벤치마킹한 사용하기 쉬운 설문 인터페이스로 빠르게 참여하세요
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="mb-2 h-10 w-10 text-orange-600" />
              <CardTitle>AI 데이터 분석</CardTitle>
              <CardDescription>
                여러분의 피드백은 AI 학습 데이터로 활용되어 더 나은 서비스를 만듭니다
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div>
              <div className="mb-2 text-5xl font-bold">10,000+</div>
              <div className="text-blue-100">참여자</div>
            </div>
            <div>
              <div className="mb-2 text-5xl font-bold">50,000+</div>
              <div className="text-blue-100">완료된 설문</div>
            </div>
            <div>
              <div className="mb-2 text-5xl font-bold">100+</div>
              <div className="text-blue-100">다양한 설문</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="mb-4 text-4xl font-bold">지금 바로 시작하세요!</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          가입하고 첫 설문을 완료하면 즉시 100 포인트를 드립니다
        </p>
        <Button asChild size="lg" className="text-lg">
          <Link href="/survey">
            첫 설문 시작하기 <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>
    </div>
  )
}
