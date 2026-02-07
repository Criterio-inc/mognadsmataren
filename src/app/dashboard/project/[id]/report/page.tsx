'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Download,
  Loader2,
  Users,
  Calendar,
} from 'lucide-react';
import { MaturityGauge } from '@/components/visualization/MaturityGauge';
import { RadarChart } from '@/components/visualization/RadarChart';
import { MaturitySteps } from '@/components/visualization/MaturitySteps';
import { DimensionBars } from '@/components/visualization/DimensionBars';
import { AIInsightsCard } from '@/components/results/AIInsightsCard';
import { formatDate } from '@/lib/utils';
import { useAssessmentStore } from '@/lib/store';
import { getTranslations } from '@/lib/translations';
import type { Dimension } from '@/lib/questions';

interface Project {
  id: string;
  name: string;
  clientName: string;
  clientDomain: string;
  shareCode: string;
  status: 'draft' | 'active' | 'closed';
  deadline: string | null;
  createdAt: string;
}

interface AggregatedScores {
  dimensionScores: Record<Dimension, number>;
  overallScore: number;
  responseCount: number;
}

interface AIInsights {
  summary: string;
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  nextSteps: string[];
}

interface ProjectData {
  project: Project;
  sessions: Array<{
    id: string;
    completedAt: string | null;
  }>;
  aggregatedScores: AggregatedScores | null;
}

export default function ProjectReportPage() {
  const params = useParams();
  const locale = useAssessmentStore((state) => state.locale);
  const t = getTranslations('report', locale);
  const tProjectDetail = getTranslations('projectDetail', locale);

  const [data, setData] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [aiInsights, setAiInsights] = useState<AIInsights | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [isPrintMode, setIsPrintMode] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProject();
  }, [params.id]);

  async function fetchProject() {
    const res = await fetch(`/api/projects/${params.id}`);
    if (res.ok) {
      const projectData = await res.json();
      setData(projectData);

      // Fetch AI insights if there are aggregated scores
      if (projectData.aggregatedScores) {
        fetchAIInsights(projectData.aggregatedScores);
      }
    }
    setIsLoading(false);
  }

  async function fetchAIInsights(scores: AggregatedScores) {
    setIsLoadingInsights(true);
    try {
      const maturityLevel = Math.round(scores.overallScore);
      const res = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dimensionScores: scores.dimensionScores,
          overallScore: scores.overallScore,
          maturityLevel,
          locale,
        }),
      });
      if (res.ok) {
        const insights = await res.json();
        setAiInsights(insights);
      }
    } catch (error) {
      console.error('Failed to fetch AI insights:', error);
    } finally {
      setIsLoadingInsights(false);
    }
  }

  async function handleExportPDF() {
    setIsPrintMode(true);

    // Wait for animations to complete and styles to apply
    await new Promise(resolve => setTimeout(resolve, 500));

    // Use browser print functionality
    window.print();

    setIsPrintMode(false);
  }

  const projectNotFound = locale === 'sv' ? 'Projektet kunde inte hittas' : 'Project not found';
  const backToDashboard = locale === 'sv' ? 'Tillbaka till dashboard' : 'Back to dashboard';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-slate-400">{t.loadingReport}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">{projectNotFound}</p>
        <Link href="/dashboard" className="text-teal-600 hover:underline mt-2 inline-block">
          {backToDashboard}
        </Link>
      </div>
    );
  }

  const { project, sessions, aggregatedScores } = data;
  const completedSessions = sessions.filter((s) => s.completedAt);

  if (!aggregatedScores || completedSessions.length === 0) {
    return (
      <div>
        <Link
          href={`/dashboard/project/${params.id}`}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {tProjectDetail.backToProjects}
        </Link>

        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mb-2">
            {t.noCompletedResponses}
          </p>
          <p className="text-slate-400 dark:text-slate-500">
            {t.reportShownWhen}
          </p>
        </div>
      </div>
    );
  }

  const maturityLevel = Math.round(aggregatedScores.overallScore);

  // Quote translation
  const quote = locale === 'sv'
    ? '"AI-mognad är inte en teknikfråga – det är en ledningsfråga"'
    : '"AI maturity is not a technology question – it\'s a leadership question"';

  // Collection ended translation
  const collectionEnded = locale === 'sv'
    ? `Insamlingsperiod avslutad: ${formatDate(project.deadline || '')}`
    : `Collection period ended: ${formatDate(project.deadline || '')}`;

  return (
    <>
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #report-content, #report-content * {
            visibility: visible;
          }
          #report-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
          }
          .no-print {
            display: none !important;
          }
          .print-break {
            page-break-before: always;
          }
        }
      `}</style>

      <div className="no-print">
        <div className="flex items-center justify-between mb-6">
          <Link
            href={`/dashboard/project/${params.id}`}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
            {tProjectDetail.backToProjects}
          </Link>

          <button
            onClick={handleExportPDF}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            {t.exportPdf}
          </button>
        </div>
      </div>

      <div id="report-content" ref={reportRef}>
        {/* Report Header */}
        <div className="bg-gradient-to-br from-slate-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-8 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t.maturityReport}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t.reportDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{t.project}</p>
              <p className="font-semibold text-slate-900 dark:text-white">{project.name}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{t.client}</p>
              <p className="font-semibold text-slate-900 dark:text-white">{project.clientName}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{t.responseCount}</p>
              <p className="font-semibold text-slate-900 dark:text-white">{completedSessions.length}</p>
            </div>
          </div>

          {project.deadline && (
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
              <Calendar className="w-4 h-4 inline mr-1" />
              {collectionEnded}
            </p>
          )}
        </div>

        {/* Main gauge and radar */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              {t.overallMaturityLevel}
            </h2>
            <MaturityGauge score={aggregatedScores.overallScore} locale={locale} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              {t.dimensionAnalysis}
            </h2>
            <div className="flex justify-center">
              <RadarChart scores={aggregatedScores.dimensionScores} locale={locale} />
            </div>
          </motion.div>
        </div>

        {/* Maturity steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
            {t.maturityJourney}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-4 text-sm">
            {quote}
          </p>
          <MaturitySteps currentLevel={maturityLevel} locale={locale} />
        </motion.div>

        {/* Dimension details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {t.dimensionsInDetail}
          </h2>
          <DimensionBars scores={aggregatedScores.dimensionScores} locale={locale} />
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8 print-break"
        >
          <AIInsightsCard
            insights={aiInsights}
            isLoading={isLoadingInsights}
            locale={locale}
          />
        </motion.div>

        {/* Footer */}
        <div className="text-center text-sm text-slate-400 dark:text-slate-500 py-4 border-t border-slate-200 dark:border-slate-700">
          <p>{t.generatedBy}</p>
          <p>{new Date().toLocaleDateString(locale === 'sv' ? 'sv-SE' : 'en-US')}</p>
        </div>
      </div>
    </>
  );
}
