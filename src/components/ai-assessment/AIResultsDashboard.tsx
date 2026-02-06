'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAIAssessmentStore, useAIResultsStore } from '@/lib/ai-store';
import { AIMaturityGauge } from './AIMaturityGauge';
import { AIRadarChart } from './AIRadarChart';
import { AIMaturitySteps } from './AIMaturitySteps';
import { AIDimensionBars } from './AIDimensionBars';
import { AIInsightsCard } from './AIInsightsCard';
import { Download, RefreshCw, Share2 } from 'lucide-react';

interface AIResultsDashboardProps {
  onReset: () => void;
}

export function AIResultsDashboard({ onReset }: AIResultsDashboardProps) {
  const { locale } = useAIAssessmentStore();
  const { dimensionScores, overallScore, maturityLevel, aiInsights, isLoading, setAiInsights, setIsLoading } = useAIResultsStore();

  useEffect(() => {
    if (!dimensionScores || !overallScore || !maturityLevel || aiInsights) return;

    const fetchInsights = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/ai-insights', {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 pt-4 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {locale === 'sv' ? 'Ert AI-mognadsresultat' : 'Your AI maturity results'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {locale === 'sv'
              ? 'AI-mognadsbedömning baserad på 8 strategiska dimensioner'
              : 'AI maturity assessment based on 8 strategic dimensions'}
          </p>
        </motion.div>

        {/* Main gauge and radar */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              {locale === 'sv' ? 'Övergripande AI-mognadsnivå' : 'Overall AI maturity level'}
            </h2>
            <AIMaturityGauge score={overallScore} locale={locale} />
          </motion.div>

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
              <AIRadarChart scores={dimensionScores} locale={locale} />
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
            {locale === 'sv' ? 'AI-mognadsresan' : 'AI maturity journey'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-4 text-sm">
            {locale === 'sv'
              ? '"AI-mognad är inte en teknikfråga – det är en ledningsfråga"'
              : '"AI maturity is not a technology question – it\'s a leadership question"'}
          </p>
          <AIMaturitySteps currentLevel={maturityLevel} locale={locale} />
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
          <AIDimensionBars scores={dimensionScores} locale={locale} />
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

        {/* EU AI Act context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-6 md:p-8 mb-12 border border-orange-200 dark:border-orange-800"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            {locale === 'sv' ? 'EU AI Act – Kontext' : 'EU AI Act – Context'}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
            {locale === 'sv'
              ? 'EU:s AI-förordning (AI Act) träder i full kraft i augusti 2026. Organisationer som använder eller utvecklar AI-system behöver kartlägga sina AI-tillämpningar, klassificera risknivåer och säkerställa efterlevnad. AI-literacy-kravet gäller redan sedan februari 2025.'
              : 'The EU AI Act comes into full effect in August 2026. Organizations using or developing AI systems need to map their AI applications, classify risk levels and ensure compliance. The AI literacy requirement has been in effect since February 2025.'}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-xs">
            {locale === 'sv'
              ? 'Er AI-mognadsnivå inom Styrning & Etik indikerar er beredskap för regulatoriska krav.'
              : 'Your AI maturity level in Governance & Ethics indicates your readiness for regulatory requirements.'}
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
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
            className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            onClick={() => {
              alert(locale === 'sv' ? 'PDF-export kommer snart!' : 'PDF export coming soon!');
            }}
          >
            <Download className="w-5 h-5" />
            {locale === 'sv' ? 'Ladda ner rapport' : 'Download report'}
          </button>

          <button
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            onClick={() => {
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
