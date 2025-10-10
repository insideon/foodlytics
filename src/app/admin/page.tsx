'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircle, FileText, Users, BarChart3 } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">관리자 대시보드</h1>
        <p className="text-gray-600">설문조사를 관리하고 데이터를 분석하세요</p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">빠른 작업</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="cursor-pointer transition-all hover:shadow-lg">
            <Link href="/admin/surveys/create">
              <CardHeader>
                <PlusCircle className="mb-2 h-8 w-8 text-blue-600" />
                <CardTitle className="text-lg">새 설문 만들기</CardTitle>
                <CardDescription>새로운 설문조사를 생성합니다</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="cursor-pointer transition-all hover:shadow-lg">
            <Link href="/admin/surveys">
              <CardHeader>
                <FileText className="mb-2 h-8 w-8 text-green-600" />
                <CardTitle className="text-lg">설문 관리</CardTitle>
                <CardDescription>기존 설문을 편집하거나 삭제합니다</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="cursor-pointer transition-all hover:shadow-lg">
            <Link href="/admin/responses">
              <CardHeader>
                <BarChart3 className="mb-2 h-8 w-8 text-purple-600" />
                <CardTitle className="text-lg">응답 분석</CardTitle>
                <CardDescription>수집된 데이터를 분석합니다</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="cursor-pointer transition-all hover:shadow-lg">
            <Link href="/admin/users">
              <CardHeader>
                <Users className="mb-2 h-8 w-8 text-orange-600" />
                <CardTitle className="text-lg">사용자 관리</CardTitle>
                <CardDescription>사용자 정보를 확인합니다</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">통계 개요</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>활성 설문</CardDescription>
              <CardTitle className="text-3xl">12</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-600">+2 이번 주</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>총 응답 수</CardDescription>
              <CardTitle className="text-3xl">3,456</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-600">+234 이번 주</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>활성 사용자</CardDescription>
              <CardTitle className="text-3xl">1,234</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-600">+89 이번 주</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>평균 완료율</CardDescription>
              <CardTitle className="text-3xl">87%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-600">+3% 지난주 대비</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Surveys */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">최근 설문</h2>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/surveys">모두 보기</Link>
          </Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div>
                    <h3 className="font-semibold">2025년 한식 선호도 조사 #{i}</h3>
                    <p className="text-sm text-gray-500">생성일: 2025-01-{10 + i}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold">{123 * i}개 응답</p>
                      <p className="text-sm text-gray-500">활성</p>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/surveys/${i}`}>관리</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
