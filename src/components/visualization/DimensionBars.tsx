'use client';

import { motion } from 'framer-motion';
import { dimensions, type Dimension } from '@/lib/questions';

interface DimensionBarsProps {
  scores: Record<Dimension, number>;
  locale: 'sv' | 'en';
}

const barColors = [
  'from-teal-400 to-teal-600',
  'from-emerald-400 to-emerald-600',
  'from-cyan-400 to-cyan-600',
  'from-sky-400 to-sky-600',
  'from-orange-400 to-orange-600',
  'from-amber-400 to-amber-600',
  'from-indigo-400 to-indigo-600',
  'from-violet-400 to-violet-600',
];

export function DimensionBars({ scores, locale }: DimensionBarsProps) {
  return (
    <div className="space-y-6">
      {dimensions.map((dim, index) => {
        const score = scores[dim.id] || 0;
        const percentage = (score / 5) * 100;

        return (
          <motion.div
            key={dim.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Header */}
            <div className="flex justify-between items-baseline mb-2">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {dim[locale].name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {dim[locale].description}
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {score.toFixed(1)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">/5</span>
              </div>
            </div>

            {/* Bar */}
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${barColors[index]} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
              />
            </div>

            {/* Scale markers */}
            <div className="flex justify-between mt-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  className={`text-xs ${
                    score >= n
                      ? 'text-gray-600 dark:text-gray-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                >
                  {n}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
