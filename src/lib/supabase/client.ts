import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your-project-url') {
    throw new Error(
      'Supabase URL과 Key를 .env.local 파일에 설정해주세요.\n' +
        'https://supabase.com/dashboard 에서 프로젝트 생성 후 API 키를 확인하세요.'
    )
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}
