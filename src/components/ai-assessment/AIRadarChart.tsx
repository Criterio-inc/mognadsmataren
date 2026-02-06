'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { aiDimensions, type AIDimension } from '@/lib/ai-questions';

interface AIRadarChartProps {
  scores: Record<AIDimension, number>;
  locale: 'sv' | 'en';
  size?: number;
}

export function AIRadarChart({ scores, locale, size = 320 }: AIRadarChartProps) {
  const [animatedScores, setAnimatedScores] = useState<Record<AIDimension, number>>(
    aiDimensions.reduce((acc, d) => ({ ...acc, [d.id]: 0 }), {} as Record<AIDimension, number>)
  );

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScores(scores), 100);
    return () => clearTimeout(timer);
  }, [scores]);

  const center = size / 2;
  const maxRadius = (size / 2) - 50;
  const levels = 5;

  const angleStep = (2 * Math.PI) / aiDimensions.length;

  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const radius = (value / 5) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  const dataPoints = aiDimensions.map((_, i) => {
    const dimId = aiDimensions[i].id;
    return getPoint(i, animatedScores[dimId] || 0);
  });

  const dataPath = dataPoints.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ') + ' Z';

  const levelPaths = Array.from({ length: levels }, (_, levelIndex) => {
    const levelValue = ((levelIndex + 1) / levels) * 5;
    const points = aiDimensions.map((_, i) => getPoint(i, levelValue));
    return points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ') + ' Z';
  });

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Level polygons */}
        {levelPaths.map((path, i) => (
          <path
            key={i}
            d={path}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-gray-200 dark:text-gray-700"
          />
        ))}

        {/* Axis lines */}
        {aiDimensions.map((_, i) => {
          const endPoint = getPoint(i, 5);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="currentColor"
              strokeWidth="1"
              className="text-gray-300 dark:text-gray-600"
            />
          );
        })}

        {/* Data polygon */}
        <motion.path
          d={dataPath}
          fill="rgba(20, 184, 166, 0.25)"
          stroke="#14b8a6"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Data points */}
        {dataPoints.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="5"
            fill="#14b8a6"
            stroke="white"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.3 }}
          />
        ))}

        {/* Dimension labels */}
        {aiDimensions.map((dim, i) => {
          const labelPoint = getPoint(i, 6.2);
          const angle = angleStep * i - Math.PI / 2;
          const isRight = angle > -Math.PI / 2 && angle < Math.PI / 2;
          const isTop = angle < 0;

          // Get short name (first word or first two words if short)
          const words = dim[locale].name.split(' ');
          const shortName = words.length > 2 ? words.slice(0, 2).join(' ') : dim[locale].name;

          return (
            <g key={dim.id}>
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor={
                  Math.abs(angle + Math.PI / 2) < 0.1 || Math.abs(angle - Math.PI / 2) < 0.1
                    ? 'middle'
                    : isRight
                      ? 'start'
                      : 'end'
                }
                dominantBaseline={isTop ? 'auto' : 'hanging'}
                className="text-[10px] font-medium fill-gray-700 dark:fill-gray-300"
              >
                {shortName}
              </text>
              <text
                x={labelPoint.x}
                y={labelPoint.y + 13}
                textAnchor={
                  Math.abs(angle + Math.PI / 2) < 0.1 || Math.abs(angle - Math.PI / 2) < 0.1
                    ? 'middle'
                    : isRight
                      ? 'start'
                      : 'end'
                }
                dominantBaseline="hanging"
                className="text-[9px] fill-gray-500 dark:fill-gray-400"
              >
                {scores[dim.id]?.toFixed(1) || '0.0'}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
