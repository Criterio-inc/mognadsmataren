'use client';

import { motion } from 'framer-motion';
import { Question, getDimensionById } from '@/lib/questions';
import { useAssessmentStore } from '@/lib/store';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const scaleLabels = {
  sv: [
    'Instämmer inte alls',
    'Instämmer i låg grad',
    'Instämmer delvis',
    'Instämmer i hög grad',
    'Instämmer helt',
  ],
  en: [
    'Strongly disagree',
    'Disagree',
    'Neutral',
    'Agree',
    'Strongly agree',
  ],
};

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onNext,
  onPrevious,
  isFirst,
  isLast,
}: QuestionCardProps) {
  const { responses, setResponse, locale } = useAssessmentStore();
  const currentValue = responses[question.id];
  const dimension = getDimensionById(question.dimension);

  const handleSelect = (value: number) => {
    setResponse(question.id, value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Dimension badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
          {dimension?.[locale].name}
        </span>
      </div>

      {/* Question counter */}
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {locale === 'sv' ? 'Fråga' : 'Question'} {questionNumber} {locale === 'sv' ? 'av' : 'of'} {totalQuestions}
      </div>

      {/* Question text */}
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-8">
        {question[locale]}
      </h2>

      {/* Rating scale */}
      <div className="space-y-3 mb-8">
        {[1, 2, 3, 4, 5].map((value) => (
          <motion.button
            key={value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(value)}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              currentValue === value
                ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-600'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  currentValue === value
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                {value}
              </div>
              <span
                className={`text-sm md:text-base ${
                  currentValue === value
                    ? 'text-teal-700 dark:text-teal-300 font-medium'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {scaleLabels[locale][value - 1]}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between gap-4">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            isFirst
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {locale === 'sv' ? '← Föregående' : '← Previous'}
        </button>

        <button
          onClick={onNext}
          disabled={currentValue === undefined}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            currentValue === undefined
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800'
              : 'bg-teal-600 text-white hover:bg-teal-700'
          }`}
        >
          {isLast
            ? locale === 'sv'
              ? 'Se resultat →'
              : 'View results →'
            : locale === 'sv'
              ? 'Nästa →'
              : 'Next →'}
        </button>
      </div>
    </motion.div>
  );
}
