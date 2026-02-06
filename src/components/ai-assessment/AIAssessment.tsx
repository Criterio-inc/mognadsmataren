'use client';

import { useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { aiQuestions, calculateAIDimensionScore, calculateAIOverallScore, getAIMaturityLevel, aiDimensions } from '@/lib/ai-questions';
import { useAIAssessmentStore, useAIResultsStore } from '@/lib/ai-store';
import { AIQuestionCard } from './AIQuestionCard';
import { AIProgressBar } from './AIProgressBar';
import type { AIDimension } from '@/lib/ai-questions';

interface AIAssessmentProps {
  onComplete: () => void;
}

export function AIAssessment({ onComplete }: AIAssessmentProps) {
  const { currentQuestionIndex, setCurrentQuestionIndex, getResponsesMap, locale } = useAIAssessmentStore();
  const { setResults, setIsLoading } = useAIResultsStore();

  const currentQuestion = aiQuestions[currentQuestionIndex];

  const handleNext = useCallback(async () => {
    if (currentQuestionIndex < aiQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsLoading(true);

      const responsesMap = getResponsesMap();

      const dimensionScores = aiDimensions.reduce((acc, dim) => {
        acc[dim.id] = calculateAIDimensionScore(responsesMap, dim.id);
        return acc;
      }, {} as Record<AIDimension, number>);

      const overallScore = calculateAIOverallScore(responsesMap);
      const maturityLevel = getAIMaturityLevel(overallScore).level;

      setResults(dimensionScores, overallScore, maturityLevel);
      onComplete();
    }
  }, [currentQuestionIndex, setCurrentQuestionIndex, getResponsesMap, setResults, setIsLoading, onComplete]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }, [currentQuestionIndex, setCurrentQuestionIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 pt-4 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {locale === 'sv' ? 'AI-Mognadsmätning' : 'AI Maturity Assessment'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {locale === 'sv'
              ? 'Svara på frågorna för att bedöma er AI-mognad'
              : 'Answer the questions to assess your AI maturity'}
          </p>
        </div>

        {/* Progress */}
        <AIProgressBar />

        {/* Question */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
          <AnimatePresence mode="wait">
            <AIQuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={aiQuestions.length}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isFirst={currentQuestionIndex === 0}
              isLast={currentQuestionIndex === aiQuestions.length - 1}
            />
          </AnimatePresence>
        </div>

        {/* Tips */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            {locale === 'sv'
              ? 'Tips: Svara utifrån hur det faktiskt ser ut idag, inte hur ni vill att det ska vara'
              : 'Tip: Answer based on how things actually are today, not how you want them to be'}
          </p>
        </div>
      </div>
    </div>
  );
}
