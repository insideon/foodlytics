import { create } from 'zustand'
import type { UserProfile, UserAchievement } from '@/types/database'

interface UserState {
  profile: UserProfile | null
  achievements: UserAchievement[]
  isLoading: boolean
  error: string | null

  // Actions
  setProfile: (profile: UserProfile | null) => void
  setAchievements: (achievements: UserAchievement[]) => void
  addAchievement: (achievement: UserAchievement) => void
  updatePoints: (points: number) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  achievements: [],
  isLoading: false,
  error: null,

  setProfile: (profile) => set({ profile }),

  setAchievements: (achievements) => set({ achievements }),

  addAchievement: (achievement) =>
    set((state) => ({
      achievements: [...state.achievements, achievement],
    })),

  updatePoints: (points) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, points } : null,
    })),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  reset: () =>
    set({
      profile: null,
      achievements: [],
      isLoading: false,
      error: null,
    }),
}))
