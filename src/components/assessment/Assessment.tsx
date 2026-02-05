'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { questions, calculateDimensionScore, calculateOverallScore, getMaturityLevel, dimensions } from '@/lib/questions';
import { useAssessmentStore, useResultsStore } from '@/lib/store';
import { QuestionCard } from './QuestionCard';
import { ProgressBar } from './ProgressBar';
import type { Dimension } from '@/lib/questions';

interface AssessmentProps {
  onComplete: () => void;
}

export function Assessment({ onComplete }: AssessmentProps) {
  const { currentQuestionIndex, setCurrentQuestionIndex, getResponsesMap, locale } = useAssessmentStore();
  const { setResults, setIsLoading } = useResultsStore();

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = useCallback(async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Assessment complete - calculate results
      setIsLoading(true);

      const responsesMap = getResponsesMap();

      // Calculate dimension scores
      const dimensionScores = dimensions.reduce((acc, dim) => {
        acc[dim.id] = calculateDimensionScore(responsesMap, dim.id);
        return acc;
      }, {} as Record<Dimension, number>);

      // Calculate overall score and maturity level
      const overallScore = calculateOverallScore(responsesMap);
      const maturityLevel = getMaturityLevel(overallScore).level;

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 pt-4 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {locale === 'sv' ? 'Digital Mognadsmätning' : 'Digital Maturity Assessment'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {locale === 'sv'
              ? 'Svara på frågorna för att bedöma er digitala mognad'
              : 'Answer the questions to assess your digital maturity'}
          </p>
        </div>

        {/* Progress */}
        <ProgressBar />

        {/* Question */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
          <AnimatePresence mode="wait">
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isFirst={currentQuestionIndex === 0}
              isLast={currentQuestionIndex === questions.length - 1}
            />
          </AnimatePresence>
        </div>

        {/* Tips */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            {locale === 'sv'
              ? '💡 Tips: Svara ärligt – det finns inga rätt eller fel svar'
              : '💡 Tip: Answer honestly – there are no right or wrong answers'}
          </p>
        </div>
      </div>
    </div>
  );
}
