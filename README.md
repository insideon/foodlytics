# 🍽️ Foodlytics

AI 기반 음식 피드백 수집 플랫폼 - 사용자 의견을 수집하고 보상하는 게이미피케이션 설문조사 시스템

## 📋 프로젝트 소개

Foodlytics는 음식에 대한 소비자 피드백을 체계적으로 수집하고, 수집된 데이터를 AI 학습에 활용할 수 있도록 최적화된 플랫폼입니다. 사용자 참여를 높이기 위해 게이미피케이션 요소를 적용했습니다.

### 주요 기능

#### 1. 설문조사 관리 시스템 (관리자)

- 다양한 설문 유형 지원
  - 객관식 (단일/다중 선택)
  - 주관식 (단답형/장문형)
  - 평점 (별점)
  - 척도 (슬라이더)
  - 이미지 업로드
  - 날짜/시간 선택
- 설문 생성, 수정, 삭제
- 응답 데이터 분석 및 시각화

#### 2. 사용자 피드백 수집 인터페이스

- 구글폼 스타일의 직관적인 UI
- 진행상황 표시 및 질문 네비게이션
- 응답 자동 저장
- 모바일/데스크톱 반응형 디자인

#### 3. 게이미피케이션 시스템

- **포인트 시스템**: 설문 완료 시 포인트 획득
- **레벨 시스템**: 경험치 기반 레벨업
- **업적 시스템**: 다양한 조건의 업적 달성
- **리더보드**: 주간 랭킹 경쟁
- **보상**: 설문 완료 시 confetti 애니메이션과 즉시 피드백

#### 4. AI 최적화 데이터 구조

- 구조화된 응답 데이터 저장
- 감정 분석 점수 (sentiment_score)
- 신뢰도 점수 (confidence_score)
- AI 학습용 레이블링 시스템
- 메타데이터 저장 (완료 시간, 디바이스 정보 등)

## 🛠️ 기술 스택

### Frontend

- **Framework**: Next.js 15.5.4 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Form**: React Hook Form + Zod
- **Animations**: canvas-confetti

### Backend & Database

- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (이미지 업로드)
- **API**: Next.js API Routes

### Code Quality

- **Linting**: ESLint
- **Formatting**: Prettier (Tailwind CSS 플러그인 포함)
- **Git Hooks**: Husky + lint-staged
- **Commit Convention**: Commitlint (Conventional Commits)

## 🚀 시작하기

### 사전 요구사항

- Node.js 20 이상
- pnpm 10 이상
- Supabase 계정

### 설치

1. 레포지토리 클론

```bash
git clone <repository-url>
cd foodlytics
```

2. 의존성 설치

```bash
pnpm install
```

3. 환경 변수 설정

```bash
cp .env.example .env.local
```

`.env.local` 파일에 Supabase 정보 입력:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Supabase 데이터베이스 설정

Supabase SQL 에디터에서 `supabase/migrations/001_initial_schema.sql` 파일 실행

5. 개발 서버 실행

```bash
pnpm dev
```

http://localhost:3000 에서 확인

## 📁 프로젝트 구조

```
foodlytics/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # 관리자 페이지
│   │   ├── survey/            # 설문 페이지
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   └── page.tsx           # 홈페이지
│   ├── components/            # React 컴포넌트
│   │   ├── ui/               # shadcn/ui 컴포넌트
│   │   ├── admin/            # 관리자 컴포넌트
│   │   ├── survey/           # 설문 컴포넌트
│   │   ├── gamification/     # 게이미피케이션 컴포넌트
│   │   └── common/           # 공통 컴포넌트 (Navbar, Footer)
│   ├── lib/                   # 유틸리티 함수
│   │   └── supabase/         # Supabase 클라이언트
│   ├── stores/               # Zustand 스토어
│   ├── types/                # TypeScript 타입 정의
│   └── hooks/                # Custom React Hooks
├── supabase/
│   └── migrations/           # 데이터베이스 마이그레이션
└── public/                   # 정적 파일
```

## 📊 데이터베이스 스키마

### 주요 테이블

- `user_profiles`: 사용자 프로필 및 게임 정보
- `surveys`: 설문조사 메타데이터
- `survey_questions`: 설문 질문
- `survey_responses`: 설문 응답 (메인)
- `survey_answers`: 각 질문에 대한 답변
- `achievements`: 업적 정의
- `user_achievements`: 사용자 업적 달성 기록
- `leaderboard`: 주간 랭킹
- `ai_training_labels`: AI 학습용 레이블 데이터

## 🎮 사용 방법

### 사용자

1. 메인 페이지에서 "지금 시작하기" 클릭
2. 원하는 설문 선택
3. 질문에 답변 (진행 상황 실시간 표시)
4. 설문 완료 후 포인트 및 업적 획득
5. 리더보드에서 순위 확인

### 관리자

1. `/admin` 페이지 접속
2. "새 설문 만들기"로 설문 생성
3. 질문 추가 (다양한 타입 지원)
4. 활성화 후 배포
5. `/admin/responses`에서 응답 데이터 확인 및 분석

## 🎨 디자인 가이드

- **벤치마킹**: 구글폼의 직관적인 설문 인터페이스
- **컬러**: 파란색 계열 (신뢰감)
- **UI**: 모던하고 깔끔한 디자인
- **게임 요소**: 적절한 애니메이션과 시각적 피드백

## 📝 스크립트

```bash
# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# 린트 검사
pnpm lint

# 코드 포맷팅
pnpm format

# 포맷팅 검사 (수정 안함)
pnpm format:check
```

## 🔒 보안

- Row Level Security (RLS) 적용
- 사용자는 자신의 데이터만 접근 가능
- 관리자 권한 분리
- 환경 변수로 민감 정보 관리

## 🚀 배포

### Vercel (권장)

1. GitHub에 푸시
2. Vercel에서 프로젝트 임포트
3. 환경 변수 설정
4. 배포

### 환경 변수 (프로덕션)

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feat/amazing-feature`)
3. Commit your Changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the Branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

### Commit Convention

```
feat: 새로운 기능
fix: 버그 수정
docs: 문서 변경
style: 코드 포맷팅
refactor: 리팩토링
test: 테스트 추가/수정
chore: 빌드/설정 변경
```

## 📄 라이선스

MIT License

## 👥 제작자

- 개발: Your Team

## 📞 문의

이메일: support@foodlytics.com
