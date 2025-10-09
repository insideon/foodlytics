import { create } from 'zustand'
import type { Survey, SurveyQuestion, SurveyResponse, SurveyAnswer } from '@/types/database'

interface SurveyState {
  // Current survey being taken
  currentSurvey: Survey | null
  currentQuestions: SurveyQuestion[]
  currentResponse: SurveyResponse | null
  answers: Map<string, SurveyAnswer>

  // Survey progress
  currentQuestionIndex: number
  startTime: Date | null
  isLoading: boolean
  error: string | null

  // Actions
  setSurvey: (survey: Survey, questions: SurveyQuestion[]) => void
  setResponse: (response: SurveyResponse) => void
  setAnswer: (questionId: string, answer: Partial<SurveyAnswer>) => void
  nextQuestion: () => void
  previousQuestion: () => void
  goToQuestion: (index: number) => void
  completeSurvey: () => void
  reset: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useSurveyStore = create<SurveyState>((set, get) => ({
  currentSurvey: null,
  currentQuestions: [],
  currentResponse: null,
  answers: new Map(),
  currentQuestionIndex: 0,
  startTime: null,
  isLoading: false,
  error: null,

  setSurvey: (survey, questions) => {
    set({
      currentSurvey: survey,
      currentQuestions: questions.sort((a, b) => a.order_index - b.order_index),
      currentQuestionIndex: 0,
      startTime: new Date(),
      answers: new Map(),
    })
  },

  setResponse: (response) => {
    set({ currentResponse: response })
  },

  setAnswer: (questionId, answer) => {
    const { answers } = get()
    const newAnswers = new Map(answers)
    const existing = newAnswers.get(questionId) || {}
    newAnswers.set(questionId, { ...existing, ...answer } as SurveyAnswer)
    set({ answers: newAnswers })
  },

  nextQuestion: () => {
    const { currentQuestionIndex, currentQuestions } = get()
    if (currentQuestionIndex < currentQuestions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 })
    }
  },

  previousQuestion: () => {
    const { currentQuestionIndex } = get()
    if (currentQuestionIndex > 0) {
      set({ currentQuestionIndex: currentQuestionIndex - 1 })
    }
  },

  goToQuestion: (index) => {
    const { currentQuestions } = get()
    if (index >= 0 && index < currentQuestions.length) {
      set({ currentQuestionIndex: index })
    }
  },

  completeSurvey: () => {
    set({
      currentSurvey: null,
      currentQuestions: [],
      currentResponse: null,
      answers: new Map(),
      currentQuestionIndex: 0,
      startTime: null,
    })
  },

  reset: () => {
    set({
      currentSurvey: null,
      currentQuestions: [],
      currentResponse: null,
      answers: new Map(),
      currentQuestionIndex: 0,
      startTime: null,
      isLoading: false,
      error: null,
    })
  },

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}))
