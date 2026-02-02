'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAssessmentStore, useResultsStore } from '@/lib/store';
import { MaturityGauge } from '../visualization/MaturityGauge';
import { RadarChart } from '../visualization/RadarChart';
import { MaturitySteps } from '../visualization/MaturitySteps';
import { DimensionBars } from '../visualization/DimensionBars';
import { AIInsightsCard } from './AIInsightsCard';
import { Download, RefreshCw, Share2 } from 'lucide-react';

interface ResultsDashboardProps {
  onReset: () => void;
}

export function ResultsDashboard({ onReset }: ResultsDashboardProps) {
  const { locale, getResponsesMap } = useAssessmentStore();
  const { dimensionScores, overallScore, maturityLevel, aiInsights, isLoading, setAiInsights, setIsLoading } = useResultsStore();

  // Fetch AI insights on mount
  useEffect(() => {
    if (!dimensionScores || !overallScore || !maturityLevel || aiInsights) return;

    const fetchInsights = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/insights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dimensionScores,
            overallScore,
            maturityLevel,
            locale,
          }),
        });

        if (response.ok) {
          const insights = await response.json();
          setAiInsights(insights);
        }
      } catch (error) {
        console.error('Failed to fetch AI insights:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsights();
  }, [dimensionScores, overallScore, maturityLevel, locale, aiInsights, setAiInsights, setIsLoading]);

  if (!dimensionScores || !overallScore || !maturityLevel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          {locale === 'sv' ? 'Laddar resultat...' : 'Loading results...'}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {locale === 'sv' ? 'Ert resultat' : 'Your results'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {locale === 'sv'
              ? 'Digital mognadsbedömning för ledningsgruppen'
              : 'Digital maturity assessment for the leadership team'}
          </p>
        </motion.div>

        {/* Main gauge and radar */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Gauge card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              {locale === 'sv' ? 'Övergripande mognadsnivå' : 'Overall maturity level'}
            </h2>
            <MaturityGauge score={overallScore} locale={locale} />
          </motion.div>

          {/* Radar card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              {locale === 'sv' ? 'Dimensionsanalys' : 'Dimension analysis'}
            </h2>
            <div className="flex justify-center">
              <RadarChart scores={dimensionScores} locale={locale} />
            </div>
          </motion.div>
        </div>

        {/* Maturity steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 mb-12"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
            {locale === 'sv' ? 'Mognadsresan' : 'Maturity journey'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-4 text-sm">
            {locale === 'sv'
              ? '"En digital strategi blir bara så bra som den förankring den får i ledningen"'
              : '"A digital strategy is only as good as the buy-in it gets from leadership"'}
          </p>
          <MaturitySteps currentLevel={maturityLevel} locale={locale} />
        </motion.div>

        {/* Dimension details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 mb-12"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {locale === 'sv' ? 'Dimensioner i detalj' : 'Dimensions in detail'}
          </h2>
          <DimensionBars scores={dimensionScores} locale={locale} />
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <AIInsightsCard
            insights={aiInsights}
            isLoading={isLoading}
            locale={locale}
          />
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            {locale === 'sv' ? 'Gör om bedömningen' : 'Retake assessment'}
          </button>

          <button
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => {
              // TODO: Implement PDF export
              alert(locale === 'sv' ? 'PDF-export kommer snart!' : 'PDF export coming soon!');
            }}
          >
            <Download className="w-5 h-5" />
            {locale === 'sv' ? 'Ladda ner rapport' : 'Download report'}
          </button>

          <button
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            onClick={() => {
              // TODO: Implement sharing
              alert(locale === 'sv' ? 'Delningsfunktion kommer snart!' : 'Sharing coming soon!');
            }}
          >
            <Share2 className="w-5 h-5" />
            {locale === 'sv' ? 'Dela med teamet' : 'Share with team'}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
