// Database Types for Foodlytics

export type QuestionType =
  | 'multiple_choice'
  | 'checkbox'
  | 'text'
  | 'textarea'
  | 'rating'
  | 'scale'
  | 'image_upload'
  | 'date'
  | 'time'

export interface UserProfile {
  id: string
  username: string | null
  avatar_url: string | null
  points: number
  level: number
  total_surveys_completed: number
  created_at: string
  updated_at: string
}

export interface Survey {
  id: string
  title: string
  description: string | null
  category: string | null
  is_active: boolean
  start_date: string | null
  end_date: string | null
  points_reward: number
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface SurveyQuestion {
  id: string
  survey_id: string
  question_text: string
  question_type: QuestionType
  options: string[] | null
  is_required: boolean
  order_index: number
  min_value: number | null
  max_value: number | null
  placeholder: string | null
  help_text: string | null
  metadata: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

export interface SurveyResponse {
  id: string
  survey_id: string
  user_id: string | null
  session_id: string | null
  started_at: string
  completed_at: string | null
  is_completed: boolean
  completion_time_seconds: number | null
  device_info: Record<string, unknown> | null
  created_at: string
}

export interface SurveyAnswer {
  id: string
  response_id: string
  question_id: string
  answer_text: string | null
  answer_number: number | null
  answer_array: string[] | null
  answer_json: Record<string, unknown> | null
  image_url: string | null
  confidence_score: number | null
  sentiment_score: number | null
  created_at: string
}

export interface Achievement {
  id: string
  name: string
  description: string | null
  icon: string | null
  points: number
  condition_type: string
  condition_value: number
  created_at: string
}

export interface UserAchievement {
  id: string
  user_id: string
  achievement_id: string
  unlocked_at: string
  achievement?: Achievement
}

export interface LeaderboardEntry {
  id: string
  user_id: string
  week_start: string
  points: number
  rank: number | null
  created_at: string
  user_profile?: UserProfile
}

export interface AITrainingLabel {
  id: string
  answer_id: string | null
  label_type: string
  label_value: string
  confidence: number | null
  labeled_by: string | null
  is_verified: boolean
  created_at: string
}

// Form types for creating/editing
export interface CreateSurveyForm {
  title: string
  description?: string
  category?: string
  start_date?: string
  end_date?: string
  points_reward?: number
}

export interface CreateQuestionForm {
  question_text: string
  question_type: QuestionType
  options?: string[]
  is_required?: boolean
  min_value?: number
  max_value?: number
  placeholder?: string
  help_text?: string
  metadata?: Record<string, unknown>
}
