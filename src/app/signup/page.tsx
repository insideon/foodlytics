'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Mail, Lock, User, AlertCircle, CheckCircle2 } from 'lucide-react'

const signupSchema = z
  .object({
    username: z
      .string()
      .min(2, '사용자 이름은 최소 2자 이상이어야 합니다')
      .max(20, '사용자 이름은 최대 20자까지 가능합니다')
      .regex(/^[a-zA-Z0-9가-힣_]+$/, '사용자 이름은 문자, 숫자, 밑줄만 사용 가능합니다'),
    email: z.string().email('올바른 이메일 주소를 입력해주세요'),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다'
      ),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: '이용약관에 동의해주세요',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  })

type SignupForm = z.infer<typeof signupSchema>

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  })

  const onSubmit = async (data: SignupForm) => {
    try {
      setIsLoading(true)
      setError(null)

      const supabase = createClient()

      // 1. Sign up user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            username: data.username,
          },
        },
      })

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          setError('이미 사용 중인 이메일입니다')
        } else {
          setError(signUpError.message)
        }
        return
      }

      // 2. Create user profile
      if (authData.user) {
        const { error: profileError } = await supabase.from('user_profiles').insert({
          id: authData.user.id,
          username: data.username,
          points: 0,
          level: 1,
          total_surveys_completed: 0,
        })

        if (profileError) {
          console.error('Profile creation error:', profileError)
        }
      }

      // 회원가입 성공
      setSuccess(true)

      // 3초 후 로그인 페이지로 이동
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    try {
      setIsLoading(true)
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        setError('소셜 회원가입 중 오류가 발생했습니다')
      }
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 py-12">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">회원가입 완료!</h2>
            <p className="mb-4 text-gray-600">
              가입하신 이메일로 인증 링크를 발송했습니다.
              <br />
              이메일 인증 후 로그인해주세요.
            </p>
            <div className="mt-6">
              <Button asChild className="w-full">
                <Link href="/login">로그인 페이지로 이동</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mb-2 text-4xl">🍽️</div>
          <CardTitle className="text-2xl font-bold">계정 만들기</CardTitle>
          <CardDescription>무료로 가입하고 보상을 받으세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {/* Signup Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>사용자 이름</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="foodlover123"
                          className="pl-10"
                          {...field}
                          disabled={isLoading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="your@email.com"
                          className="pl-10"
                          {...field}
                          disabled={isLoading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          {...field}
                          disabled={isLoading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          {...field}
                          disabled={isLoading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        <Link href="/terms" className="text-blue-600 hover:underline">
                          이용약관
                        </Link>{' '}
                        및{' '}
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                          개인정보처리방침
                        </Link>
                        에 동의합니다
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                회원가입
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">또는</span>
            </div>
          </div>

          {/* Social Signup */}
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google로 가입하기
          </Button>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="font-semibold text-blue-600 hover:underline">
              로그인
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
