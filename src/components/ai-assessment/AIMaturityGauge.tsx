'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { aiMaturityLevels } from '@/lib/ai-questions';

interface AIMaturityGaugeProps {
  score: number;
  locale: 'sv' | 'en';
}

export function AIMaturityGauge({ score, locale }: AIMaturityGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const needleRotation = -90 + ((animatedScore - 1) / 4) * 180;

  const currentLevel = aiMaturityLevels.find(
    (l) => score >= l.scoreRange[0] && score <= l.scoreRange[1]
  ) || aiMaturityLevels[0];

  const segmentColors = [
    '#f97316', // Level 1 - Orange
    '#eab308', // Level 2 - Yellow
    '#14b8a6', // Level 3 - Teal
    '#0d9488', // Level 4 - Dark Teal
    '#0f766e', // Level 5 - Darker Teal
  ];

  const cx = 100;
  const cy = 100;
  const outerRadius = 70;
  const innerRadius = 45;
  const labelRadius = 85;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-80 h-40">
        <svg viewBox="0 0 200 115" className="w-full h-full">
          {[0, 1, 2, 3, 4].map((i) => {
            const startAngle = 180 + (i * 36);
            const endAngle = 180 + ((i + 1) * 36);
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;

            const x1 = cx + outerRadius * Math.cos(startRad);
            const y1 = cy + outerRadius * Math.sin(startRad);
            const x2 = cx + outerRadius * Math.cos(endRad);
            const y2 = cy + outerRadius * Math.sin(endRad);
            const x3 = cx + innerRadius * Math.cos(endRad);
            const y3 = cy + innerRadius * Math.sin(endRad);
            const x4 = cx + innerRadius * Math.cos(startRad);
            const y4 = cy + innerRadius * Math.sin(startRad);

            return (
              <path
                key={i}
                d={`M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`}
                fill={segmentColors[i]}
                opacity={currentLevel.level === i + 1 ? 1 : 0.4}
                className="transition-opacity duration-500"
              />
            );
          })}

          {[1, 2, 3, 4, 5].map((level, i) => {
            const angle = 180 + (i * 36) + 18;
            const rad = (angle * Math.PI) / 180;
            const x = cx + labelRadius * Math.cos(rad);
            const y = cy + labelRadius * Math.sin(rad);

            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm fill-gray-600 dark:fill-gray-400 font-bold"
              >
                {level}
              </text>
            );
          })}

          <circle cx={cx} cy={cy} r="10" fill="currentColor" className="text-gray-800 dark:text-gray-200" />
          <circle cx={cx} cy={cy} r="6" fill="currentColor" className="text-gray-100 dark:text-gray-700" />
        </svg>

        <motion.div
          className="absolute origin-bottom"
          style={{
            width: '4px',
            height: '50px',
            left: '50%',
            marginLeft: '-2px',
            bottom: '22px',
          }}
          initial={{ rotate: -90 }}
          animate={{ rotate: needleRotation }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
        >
          <div className="w-full h-full bg-gradient-to-t from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 rounded-full" />
          <div className="absolute bottom-0 left-1/2 w-3 h-3 -ml-1.5 bg-gray-800 dark:bg-gray-200 rounded-full" />
        </motion.div>
      </div>

      <motion.div
        className="mt-2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-5xl font-bold text-gray-900 dark:text-white">
          {score.toFixed(1)}
        </div>
        <div className="text-lg text-gray-500 dark:text-gray-400">
          {locale === 'sv' ? 'av 5.0' : 'of 5.0'}
        </div>
      </motion.div>

      <motion.div
        className="mt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <span
          className="inline-block px-4 py-2 rounded-full text-lg font-semibold"
          style={{ backgroundColor: segmentColors[currentLevel.level - 1] + '20', color: segmentColors[currentLevel.level - 1] }}
        >
          {locale === 'sv' ? `Nivå ${currentLevel.level}: ` : `Level ${currentLevel.level}: `}
          {currentLevel[locale].name}
        </span>
      </motion.div>
    </div>
  );
}
