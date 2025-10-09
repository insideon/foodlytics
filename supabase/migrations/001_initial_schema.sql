-- Foodlytics Database Schema
-- AI 학습에 최적화된 데이터 구조

-- 사용자 프로필 (게이미피케이션용)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  avatar_url TEXT,
  points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  total_surveys_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 설문조사 템플릿
CREATE TABLE surveys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT, -- 예: 한식, 양식, 중식, 디저트 등
  is_active BOOLEAN DEFAULT true,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  points_reward INTEGER DEFAULT 10, -- 완료 시 지급 포인트
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 질문 유형 ENUM
CREATE TYPE question_type AS ENUM (
  'multiple_choice',    -- 객관식 (단일 선택)
  'checkbox',          -- 체크박스 (다중 선택)
  'text',              -- 주관식 (단답형)
  'textarea',          -- 주관식 (장문)
  'rating',            -- 평점 (별점)
  'scale',             -- 척도 (1-5, 1-10 등)
  'image_upload',      -- 이미지 업로드
  'date',              -- 날짜 선택
  'time'               -- 시간 선택
);

-- 설문 질문
CREATE TABLE survey_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type question_type NOT NULL,
  options JSONB, -- 객관식/체크박스 옵션 배열: ["옵션1", "옵션2", ...]
  is_required BOOLEAN DEFAULT false,
  order_index INTEGER NOT NULL, -- 질문 순서
  min_value INTEGER, -- 척도/평점 최소값
  max_value INTEGER, -- 척도/평점 최대값
  placeholder TEXT, -- 입력 필드 플레이스홀더
  help_text TEXT, -- 질문 도움말
  metadata JSONB, -- 추가 설정 (AI 학습용 태그 등)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 설문 응답 (메인)
CREATE TABLE survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- NULL이면 익명
  session_id TEXT, -- 익명 사용자 추적용
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  is_completed BOOLEAN DEFAULT false,
  completion_time_seconds INTEGER, -- 완료 소요 시간 (AI 분석용)
  device_info JSONB, -- 디바이스 정보 (분석용)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 설문 응답 상세 (각 질문에 대한 답변)
CREATE TABLE survey_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  response_id UUID NOT NULL REFERENCES survey_responses(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES survey_questions(id) ON DELETE CASCADE,
  answer_text TEXT, -- 주관식 답변
  answer_number NUMERIC, -- 평점/척도 답변
  answer_array TEXT[], -- 다중 선택 답변
  answer_json JSONB, -- 복잡한 구조의 답변
  image_url TEXT, -- 이미지 업로드 URL
  confidence_score NUMERIC, -- AI 분석: 답변 신뢰도
  sentiment_score NUMERIC, -- AI 분석: 감정 점수 (-1~1)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 업적 시스템 (게이미피케이션)
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- 아이콘 이미지 URL 또는 이모지
  points INTEGER DEFAULT 0,
  condition_type TEXT, -- 예: 'survey_count', 'consecutive_days', 'category_master'
  condition_value INTEGER, -- 달성 조건 값
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 사용자 업적 달성 기록
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- 리더보드 (주간 랭킹)
CREATE TABLE leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  week_start DATE NOT NULL,
  points INTEGER DEFAULT 0,
  rank INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, week_start)
);

-- AI 학습용 레이블 데이터
CREATE TABLE ai_training_labels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  answer_id UUID REFERENCES survey_answers(id) ON DELETE CASCADE,
  label_type TEXT NOT NULL, -- 예: 'quality', 'taste', 'price_satisfaction'
  label_value TEXT NOT NULL,
  confidence NUMERIC, -- 레이블 확신도
  labeled_by UUID REFERENCES auth.users(id), -- 레이블 작성자
  is_verified BOOLEAN DEFAULT false, -- 검증 여부
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX idx_surveys_active ON surveys(is_active, start_date, end_date);
CREATE INDEX idx_survey_questions_survey_id ON survey_questions(survey_id, order_index);
CREATE INDEX idx_survey_responses_user_id ON survey_responses(user_id, created_at);
CREATE INDEX idx_survey_responses_survey_id ON survey_responses(survey_id, completed_at);
CREATE INDEX idx_survey_answers_response_id ON survey_answers(response_id);
CREATE INDEX idx_survey_answers_question_id ON survey_answers(question_id);
CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX idx_leaderboard_week ON leaderboard(week_start, rank);
CREATE INDEX idx_ai_labels_answer_id ON ai_training_labels(answer_id);

-- RLS (Row Level Security) 활성화
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_training_labels ENABLE ROW LEVEL SECURITY;

-- RLS 정책: 사용자 프로필
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS 정책: 설문조사 (모두 읽기 가능, 관리자만 수정)
CREATE POLICY "Anyone can view active surveys" ON surveys
  FOR SELECT USING (is_active = true);

-- RLS 정책: 질문 (활성 설문의 질문은 모두 읽기 가능)
CREATE POLICY "Anyone can view questions of active surveys" ON survey_questions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM surveys WHERE surveys.id = survey_questions.survey_id AND surveys.is_active = true)
  );

-- RLS 정책: 응답 (자신의 응답만 읽기/쓰기)
CREATE POLICY "Users can view their own responses" ON survey_responses
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can insert their own responses" ON survey_responses
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- RLS 정책: 답변 (자신의 답변만 읽기/쓰기)
CREATE POLICY "Users can view their own answers" ON survey_answers
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM survey_responses WHERE survey_responses.id = survey_answers.response_id
            AND (survey_responses.user_id = auth.uid() OR survey_responses.user_id IS NULL))
  );
CREATE POLICY "Users can insert their own answers" ON survey_answers
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM survey_responses WHERE survey_responses.id = survey_answers.response_id
            AND (survey_responses.user_id = auth.uid() OR survey_responses.user_id IS NULL))
  );

-- RLS 정책: 업적 (모두 읽기 가능)
CREATE POLICY "Anyone can view achievements" ON achievements
  FOR SELECT USING (true);

-- RLS 정책: 사용자 업적 (자신의 업적만 읽기)
CREATE POLICY "Users can view their own achievements" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

-- RLS 정책: 리더보드 (모두 읽기 가능)
CREATE POLICY "Anyone can view leaderboard" ON leaderboard
  FOR SELECT USING (true);

-- 함수: 사용자 레벨 계산
CREATE OR REPLACE FUNCTION calculate_user_level(user_points INTEGER)
RETURNS INTEGER AS $$
BEGIN
  RETURN FLOOR(SQRT(user_points / 100)) + 1;
END;
$$ LANGUAGE plpgsql;

-- 함수: 설문 완료 시 포인트 지급 및 통계 업데이트
CREATE OR REPLACE FUNCTION handle_survey_completion()
RETURNS TRIGGER AS $$
DECLARE
  survey_points INTEGER;
BEGIN
  IF NEW.is_completed = true AND OLD.is_completed = false THEN
    -- 설문의 보상 포인트 가져오기
    SELECT points_reward INTO survey_points FROM surveys WHERE id = NEW.survey_id;

    -- 사용자 프로필 업데이트
    IF NEW.user_id IS NOT NULL THEN
      UPDATE user_profiles
      SET
        points = points + survey_points,
        total_surveys_completed = total_surveys_completed + 1,
        level = calculate_user_level(points + survey_points),
        updated_at = NOW()
      WHERE id = NEW.user_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거: 설문 완료 시
CREATE TRIGGER on_survey_completion
  AFTER UPDATE ON survey_responses
  FOR EACH ROW
  EXECUTE FUNCTION handle_survey_completion();

-- 기본 업적 데이터 삽입
INSERT INTO achievements (name, description, icon, points, condition_type, condition_value) VALUES
  ('첫 걸음', '첫 설문조사 완료', '🎯', 10, 'survey_count', 1),
  ('열정적인 참여자', '10개 설문조사 완료', '🔥', 50, 'survey_count', 10),
  ('설문 마스터', '50개 설문조사 완료', '👑', 200, 'survey_count', 50),
  ('일주일 연속', '7일 연속 참여', '📅', 100, 'consecutive_days', 7),
  ('한식 전문가', '한식 카테고리 10회 참여', '🍚', 75, 'category_master', 10);

