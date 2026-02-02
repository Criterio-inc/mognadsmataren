'use client';

import { motion } from 'framer-motion';
import { maturityLevels } from '@/lib/questions';
import { CheckCircle, Circle, Lightbulb, Target, Brain, Rocket, TrendingUp } from 'lucide-react';

interface MaturityStepsProps {
  currentLevel: number; // 1-5
  locale: 'sv' | 'en';
}

const levelIcons = [Lightbulb, Target, Brain, Rocket, TrendingUp];
const levelColors = [
  'from-red-400 to-red-500',
  'from-orange-400 to-orange-500',
  'from-yellow-400 to-yellow-500',
  'from-blue-400 to-blue-500',
  'from-indigo-500 to-indigo-600',
];

export function MaturitySteps({ currentLevel, locale }: MaturityStepsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      {/* Steps */}
      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700" />
        <motion.div
          className="absolute top-8 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${((currentLevel - 1) / 4) * 100}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Step indicators */}
        <div className="relative flex justify-between">
          {maturityLevels.map((level, index) => {
            const Icon = levelIcons[index];
            const isActive = level.level <= currentLevel;
            const isCurrent = level.level === currentLevel;

            return (
              <motion.div
                key={level.level}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.15 }}
              >
                {/* Circle with icon */}
                <motion.div
                  className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${
                    isCurrent
                      ? `bg-gradient-to-br ${levelColors[index]} shadow-lg`
                      : isActive
                        ? 'bg-blue-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon className={`w-7 h-7 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                  {isCurrent && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-blue-400"
                      animate={{ scale: [1, 1.3], opacity: [1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Level number */}
                <div className={`mt-2 text-sm font-bold ${
                  isCurrent
                    ? 'text-blue-600 dark:text-blue-400'
                    : isActive
                      ? 'text-gray-700 dark:text-gray-300'
                      : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {locale === 'sv' ? 'Nivå' : 'Level'} {level.level}
                </div>

                {/* Level name */}
                <div className={`mt-1 text-xs text-center max-w-[80px] ${
                  isCurrent
                    ? 'text-blue-600 dark:text-blue-400 font-medium'
                    : isActive
                      ? 'text-gray-600 dark:text-gray-400'
                      : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {level[locale].name}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Current level description */}
      <motion.div
        className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {locale === 'sv' ? 'Er nuvarande nivå' : 'Your current level'}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {maturityLevels[currentLevel - 1][locale].description}
        </p>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {locale === 'sv' ? 'Typiska behov på denna nivå:' : 'Typical needs at this level:'}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {maturityLevels[currentLevel - 1][locale].typicalNeeds}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
