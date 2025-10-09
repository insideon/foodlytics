import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Target,
  Lightbulb,
  Users,
  TrendingUp,
  Award,
  Database,
  Brain,
  Heart,
  Sparkles,
  Mail,
  ChevronRight,
} from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white">
            About Foodlytics
          </Badge>
          <h1 className="mb-6 text-5xl font-bold">
            음식 문화의 미래를
            <br />
            함께 만들어갑니다
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
            Foodlytics는 AI 기술을 활용하여 소비자의 음식 경험을 데이터로 전환하고,
            <br />더 나은 음식 문화를 만들기 위한 인사이트를 제공합니다.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-2 border-blue-100">
            <CardHeader>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Mission</CardTitle>
              <CardDescription className="text-base">우리의 사명</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                소비자의 진솔한 음식 경험을 수집하고, 이를 통해 식품 산업과 외식 업계가 더 나은
                제품과 서비스를 제공할 수 있도록 돕습니다. 모든 의견은 소중하며, 우리는 이를
                체계적으로 분석하여 실질적인 변화를 만들어냅니다.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100">
            <CardHeader>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <Lightbulb className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">Vision</CardTitle>
              <CardDescription className="text-base">우리의 비전</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                AI 기술과 빅데이터 분석을 통해 음식 문화의 트렌드를 예측하고, 개인화된 음식 경험을
                제공하는 플랫폼이 되고자 합니다. 소비자와 생산자를 연결하여 상호 이익을 창출하는
                생태계를 구축합니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Foodlytics */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">왜 Foodlytics인가요?</h2>
            <p className="text-gray-600">다른 설문 플랫폼과 차별화되는 우리만의 강점</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <Brain className="mb-2 h-10 w-10 text-blue-600" />
                <CardTitle>AI 기반 분석</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  머신러닝 알고리즘을 활용하여 감정 분석, 트렌드 예측, 개인화 추천을 제공합니다.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <Award className="mb-2 h-10 w-10 text-yellow-600" />
                <CardTitle>게이미피케이션</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  포인트, 레벨, 업적 시스템으로 참여를 즐겁게 만들어 지속적인 참여를 유도합니다.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <Database className="mb-2 h-10 w-10 text-green-600" />
                <CardTitle>구조화된 데이터</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  AI 학습에 최적화된 데이터 구조로 수집하여 높은 품질의 인사이트를 제공합니다.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <Users className="mb-2 h-10 w-10 text-purple-600" />
                <CardTitle>커뮤니티 기반</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  리더보드와 소셜 기능으로 사용자들이 함께 성장하는 커뮤니티를 만듭니다.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <TrendingUp className="mb-2 h-10 w-10 text-red-600" />
                <CardTitle>실시간 인사이트</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  실시간으로 수집되는 데이터를 분석하여 빠르게 변화하는 트렌드를 파악합니다.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <Heart className="mb-2 h-10 w-10 text-pink-600" />
                <CardTitle>사용자 중심</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  직관적인 UI/UX로 누구나 쉽게 참여할 수 있으며, 의견을 존중받는다고 느낍니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">어떻게 작동하나요?</h2>
          <p className="text-gray-600">간단한 4단계로 참여하고 보상받으세요</p>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
              1
            </div>
            <h3 className="mb-2 font-semibold">회원가입</h3>
            <p className="text-sm text-gray-600">무료로 가입하고 초기 포인트를 받으세요</p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-600">
              2
            </div>
            <h3 className="mb-2 font-semibold">설문 참여</h3>
            <p className="text-sm text-gray-600">관심 있는 주제의 설문에 참여하세요</p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-600">
              3
            </div>
            <h3 className="mb-2 font-semibold">포인트 획득</h3>
            <p className="text-sm text-gray-600">설문 완료 시 포인트와 업적을 획득하세요</p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-2xl font-bold text-yellow-600">
              4
            </div>
            <h3 className="mb-2 font-semibold">순위 경쟁</h3>
            <p className="text-sm text-gray-600">리더보드에서 다른 사용자와 경쟁하세요</p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <Sparkles className="mx-auto mb-4 h-12 w-12" />
            <h2 className="mb-4 text-3xl font-bold">우리의 영향력</h2>
            <p className="text-blue-100">Foodlytics가 만들어낸 변화</p>
          </div>

          <div className="grid gap-8 text-center md:grid-cols-4">
            <div>
              <div className="mb-2 text-4xl font-bold">10,000+</div>
              <div className="text-blue-100">활성 사용자</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold">50,000+</div>
              <div className="text-blue-100">완료된 설문</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold">100+</div>
              <div className="text-blue-100">파트너 기업</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold">98%</div>
              <div className="text-blue-100">사용자 만족도</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">팀 소개</h2>
          <p className="text-gray-600">음식 문화의 미래를 만들어가는 사람들</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-3xl font-bold text-white">
                B
              </div>
              <h3 className="mb-1 text-xl font-semibold">CEO</h3>
              <p className="mb-3 text-sm text-gray-600">Founder & CEO</p>
              <p className="text-sm text-gray-500">
                AI와 데이터 분석 전문가로 음식 산업의 혁신을 이끌고 있습니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-3xl font-bold text-white">
                AI
              </div>
              <h3 className="mb-1 text-xl font-semibold">AI Team</h3>
              <p className="mb-3 text-sm text-gray-600">Machine Learning Engineers</p>
              <p className="text-sm text-gray-500">
                최신 AI 기술을 활용하여 데이터 분석과 인사이트를 제공합니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-3xl font-bold text-white">
                UX
              </div>
              <h3 className="mb-1 text-xl font-semibold">Design Team</h3>
              <p className="mb-3 text-sm text-gray-600">UX/UI Designers</p>
              <p className="text-sm text-gray-500">
                사용자 경험을 최우선으로 생각하며 직관적인 인터페이스를 디자인합니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">기술 스택</h2>
            <p className="text-gray-600">최신 기술로 안정적인 서비스를 제공합니다</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Frontend</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Next.js 15</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• React Hook Form</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Backend</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Supabase</li>
                  <li>• PostgreSQL</li>
                  <li>• API Routes</li>
                  <li>• Server Actions</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI/ML</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Sentiment Analysis</li>
                  <li>• Trend Prediction</li>
                  <li>• Data Labeling</li>
                  <li>• Recommendation</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">DevOps</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Vercel Deploy</li>
                  <li>• GitHub Actions</li>
                  <li>• Automated Testing</li>
                  <li>• Monitoring</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
          <CardContent className="p-8 text-center">
            <Mail className="mx-auto mb-4 h-12 w-12 text-blue-600" />
            <h2 className="mb-2 text-2xl font-bold">문의하기</h2>
            <p className="mb-6 text-gray-600">
              궁금하신 점이나 제안사항이 있으시면 언제든 연락주세요
            </p>
            <div className="mb-6 space-y-2">
              <p className="text-gray-700">
                <strong>이메일:</strong> support@foodlytics.com
              </p>
              <p className="text-gray-700">
                <strong>운영시간:</strong> 평일 09:00 - 18:00
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/survey">
                  지금 시작하기
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="mailto:support@foodlytics.com">이메일 보내기</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
