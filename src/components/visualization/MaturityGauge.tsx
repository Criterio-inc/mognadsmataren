'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { maturityLevels } from '@/lib/questions';

interface MaturityGaugeProps {
  score: number; // 1-5
  locale: 'sv' | 'en';
}

export function MaturityGauge({ score, locale }: MaturityGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  // Calculate rotation: -90deg (left) to 90deg (right) for scores 1-5
  const rotation = ((animatedScore - 1) / 4) * 180 - 90;

  // Get current level info
  const currentLevel = maturityLevels.find(
    (l) => score >= l.scoreRange[0] && score <= l.scoreRange[1]
  ) || maturityLevels[0];

  // Colors for each level segment
  const segmentColors = [
    '#ef4444', // Level 1 - Red
    '#f97316', // Level 2 - Orange
    '#eab308', // Level 3 - Yellow
    '#3b82f6', // Level 4 - Blue
    '#1d4ed8', // Level 5 - Dark Blue
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Gauge */}
      <div className="relative w-80 h-48">
        {/* Background arc segments */}
        <svg
          viewBox="0 0 200 120"
          className="w-full h-full"
        >
          {/* Arc segments */}
          {[0, 1, 2, 3, 4].map((i) => {
            const startAngle = -90 + (i * 36);
            const endAngle = -90 + ((i + 1) * 36);
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;

            const outerRadius = 80;
            const innerRadius = 55;
            const cx = 100;
            const cy = 95;

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

          {/* Level labels - positioned along the outer edge */}
          {[1, 2, 3, 4, 5].map((level, i) => {
            const angle = -90 + (i * 36) + 18;
            const rad = (angle * Math.PI) / 180;
            const labelRadius = 92;
            const x = 100 + labelRadius * Math.cos(rad);
            const y = 95 + labelRadius * Math.sin(rad);

            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs fill-gray-600 dark:fill-gray-400 font-semibold"
              >
                {level}
              </text>
            );
          })}

          {/* Center decoration */}
          <circle cx="100" cy="95" r="12" fill="currentColor" className="text-gray-800 dark:text-gray-200" />
          <circle cx="100" cy="95" r="8" fill="currentColor" className="text-gray-100 dark:text-gray-700" />
        </svg>

        {/* Animated needle */}
        <motion.div
          className="absolute left-1/2 origin-bottom"
          style={{
            width: '4px',
            height: '65px',
            marginLeft: '-2px',
            bottom: '28px',
          }}
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
        >
          <div className="w-full h-full bg-gradient-to-t from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 rounded-full" />
          <div className="absolute bottom-0 left-1/2 w-3 h-3 -ml-1.5 bg-gray-800 dark:bg-gray-200 rounded-full" />
        </motion.div>
      </div>

      {/* Score display */}
      <motion.div
        className="mt-4 text-center"
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

      {/* Level name */}
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
