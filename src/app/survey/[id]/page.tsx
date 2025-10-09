'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { ChevronLeft, ChevronRight, Check, Star } from 'lucide-react'

// Mock survey data
const mockSurvey = {
  id: '1',
  title: '2025년 한식 선호도 조사',
  description: '한국인이 가장 좋아하는 한식 메뉴와 선호도를 알아보는 설문입니다',
  points_reward: 50,
  questions: [
    {
      id: 'q1',
      question_text: '가장 좋아하는 한식 메뉴는 무엇인가요?',
      question_type: 'multiple_choice',
      options: ['김치찌개', '된장찌개', '불고기', '비빔밥', '삼겹살'],
      is_required: true,
    },
    {
      id: 'q2',
      question_text: '한식을 얼마나 자주 드시나요?',
      question_type: 'scale',
      min_value: 1,
      max_value: 5,
      is_required: true,
      help_text: '1: 거의 안먹음, 5: 매일 먹음',
    },
    {
      id: 'q3',
      question_text: '선호하는 한식 종류를 모두 선택해주세요 (복수선택 가능)',
      question_type: 'checkbox',
      options: ['찌개류', '구이류', '볶음류', '국물요리', '면요리', '전류'],
      is_required: false,
    },
    {
      id: 'q4',
      question_text: '한식의 맛을 평가해주세요',
      question_type: 'rating',
      max_value: 5,
      is_required: true,
    },
    {
      id: 'q5',
      question_text: '한식에 대한 자유로운 의견을 남겨주세요',
      question_type: 'textarea',
      placeholder: '한식의 좋은 점, 개선점 등을 자유롭게 작성해주세요',
      is_required: false,
    },
  ],
}

export default function SurveyTakePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, unknown>>({})

  const survey = mockSurvey
  const currentQuestion = survey.questions[currentStep]
  const progress = ((currentStep + 1) / survey.questions.length) * 100

  const handleNext = () => {
    if (currentStep < survey.questions.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    // Submit to Supabase
    console.log('Submitting answers:', answers)
    router.push('/survey/complete')
  }

  const handleAnswer = (value: string | number | string[] | boolean) => {
    setAnswers({ ...answers, [currentQuestion.id]: value })
  }

  const renderQuestion = () => {
    switch (currentQuestion.question_type) {
      case 'multiple_choice':
        return (
          <RadioGroup
            value={(answers[currentQuestion.id] as string) || ''}
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {currentQuestion.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="cursor-pointer text-base">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )

      case 'checkbox':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={(answers[currentQuestion.id] as string[])?.includes(option)}
                  onCheckedChange={(checked) => {
                    const current = (answers[currentQuestion.id] as string[]) || []
                    handleAnswer(
                      checked ? [...current, option] : current.filter((o: string) => o !== option)
                    )
                  }}
                />
                <Label htmlFor={option} className="cursor-pointer text-base">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        )

      case 'scale':
        return (
          <div className="space-y-4">
            <Slider
              value={[(answers[currentQuestion.id] as number) || currentQuestion.min_value || 1]}
              onValueChange={(value) => handleAnswer(value[0])}
              min={currentQuestion.min_value || 1}
              max={currentQuestion.max_value || 5}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{currentQuestion.min_value || 1}</span>
              <span className="font-semibold">
                선택: {(answers[currentQuestion.id] as number) || '미선택'}
              </span>
              <span>{currentQuestion.max_value || 5}</span>
            </div>
            {currentQuestion.help_text && (
              <p className="text-sm text-gray-500">{currentQuestion.help_text}</p>
            )}
          </div>
        )

      case 'rating':
        return (
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleAnswer(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`h-10 w-10 ${
                    ((answers[currentQuestion.id] as number) || 0) >= star
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        )

      case 'text':
        return (
          <Input
            value={(answers[currentQuestion.id] as string) || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="text-base"
          />
        )

      case 'textarea':
        return (
          <Textarea
            value={(answers[currentQuestion.id] as string) || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="min-h-32 text-base"
          />
        )

      default:
        return <div>지원하지 않는 질문 유형입니다</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-3xl px-4">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="mb-4 flex items-center justify-between">
              <Badge>{survey.title}</Badge>
              <Badge variant="secondary">
                {currentStep + 1} / {survey.questions.length}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
            <CardDescription className="mt-2">
              {Math.round(progress)}% 완료 • 보상: {survey.points_reward}P
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Question */}
        <Card>
          <CardHeader>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">질문 {currentStep + 1}</span>
              {currentQuestion.is_required && (
                <Badge variant="destructive" className="text-xs">
                  필수
                </Badge>
              )}
            </div>
            <CardTitle className="text-2xl">{currentQuestion.question_text}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderQuestion()}

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="min-w-24"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                이전
              </Button>

              {currentStep === survey.questions.length - 1 ? (
                <Button onClick={handleComplete} className="min-w-24">
                  <Check className="mr-2 h-4 w-4" />
                  완료
                </Button>
              ) : (
                <Button onClick={handleNext} className="min-w-24">
                  다음
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Question Navigation */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {survey.questions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentStep(index)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 font-semibold transition-all ${
                    index === currentStep
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : answers[q.id]
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
