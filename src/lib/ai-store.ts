import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AIDimension } from './ai-questions';

interface AIAssessmentState {
  responses: Record<number, number>;
  currentQuestionIndex: number;
  locale: 'sv' | 'en';

  setResponse: (questionId: number, value: number) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setLocale: (locale: 'sv' | 'en') => void;
  reset: () => void;

  getResponsesMap: () => Map<number, number>;
  isComplete: () => boolean;
  getProgress: () => number;
}

const initialState = {
  responses: {},
  currentQuestionIndex: 0,
  locale: 'sv' as const,
};

export const useAIAssessmentStore = create<AIAssessmentState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setResponse: (questionId, value) =>
        set((state) => ({
          responses: { ...state.responses, [questionId]: value },
        })),

      setCurrentQuestionIndex: (index) =>
        set({ currentQuestionIndex: index }),

      setLocale: (locale) => set({ locale }),

      reset: () => set(initialState),

      getResponsesMap: () => new Map(Object.entries(get().responses).map(
        ([k, v]) => [parseInt(k), v]
      )),

      isComplete: () => Object.keys(get().responses).length === 32,

      getProgress: () => (Object.keys(get().responses).length / 32) * 100,
    }),
    {
      name: 'ai-maturity-assessment',
      partialize: (state) => ({
        responses: state.responses,
        currentQuestionIndex: state.currentQuestionIndex,
        locale: state.locale,
      }),
    }
  )
);

interface AIResultsState {
  dimensionScores: Record<AIDimension, number> | null;
  overallScore: number | null;
  maturityLevel: number | null;
  aiInsights: {
    summary: string;
    strengths: string[];
    improvements: string[];
    recommendations: string[];
    nextSteps: string[];
  } | null;
  isLoading: boolean;

  setResults: (
    dimensionScores: Record<AIDimension, number>,
    overallScore: number,
    maturityLevel: number
  ) => void;
  setAiInsights: (insights: AIResultsState['aiInsights']) => void;
  setIsLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useAIResultsStore = create<AIResultsState>((set) => ({
  dimensionScores: null,
  overallScore: null,
  maturityLevel: null,
  aiInsights: null,
  isLoading: false,

  setResults: (dimensionScores, overallScore, maturityLevel) =>
    set({ dimensionScores, overallScore, maturityLevel }),

  setAiInsights: (aiInsights) => set({ aiInsights }),

  setIsLoading: (isLoading) => set({ isLoading }),

  reset: () =>
    set({
      dimensionScores: null,
      overallScore: null,
      maturityLevel: null,
      aiInsights: null,
      isLoading: false,
    }),
}));
