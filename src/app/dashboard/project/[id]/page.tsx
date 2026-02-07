'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Link as LinkIcon,
  Users,
  Calendar,
  Check,
  Clock,
  Copy,
  CheckCircle,
  Settings,
  BarChart3,
} from 'lucide-react';
import { formatDate, isDeadlinePassed } from '@/lib/utils';
import { useAssessmentStore } from '@/lib/store';
import { getTranslations } from '@/lib/translations';

interface Session {
  id: string;
  respondentEmail: string;
  respondentName: string | null;
  completedAt: string | null;
  createdAt: string;
  result: {
    dimensionScores: {
      strategiLedarskap: number;
      anvandsfall: number;
      dataInfrastruktur: number;
      kompetensKultur: number;
      styrningEtik: number;
      teknikArkitektur: number;
      organisationProcesser: number;
      ekosystemInnovation: number;
    };
    overallScore: number;
    maturityLevel: number;
  } | null;
}

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
  dimensionScores: {
    strategiLedarskap: number;
    anvandsfall: number;
    dataInfrastruktur: number;
    kompetensKultur: number;
    styrningEtik: number;
    teknikArkitektur: number;
    organisationProcesser: number;
    ekosystemInnovation: number;
  };
  overallScore: number;
  responseCount: number;
}

interface ProjectData {
  project: Project;
  sessions: Session[];
  aggregatedScores: AggregatedScores | null;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const locale = useAssessmentStore((state) => state.locale);
  const t = getTranslations('projectDetail', locale);
  const tStatus = getTranslations('status', locale);
  const tDimensions = getTranslations('dimensions', locale);
  const tDashboard = getTranslations('dashboard', locale);
  const tCommon = getTranslations('common', locale);

  const dimensionLabels = {
    strategiLedarskap: tDimensions.strategiLedarskap,
    anvandsfall: tDimensions.anvandsfall,
    dataInfrastruktur: tDimensions.dataInfrastruktur,
    kompetensKultur: tDimensions.kompetensKultur,
    styrningEtik: tDimensions.styrningEtik,
    teknikArkitektur: tDimensions.teknikArkitektur,
    organisationProcesser: tDimensions.organisationProcesser,
    ekosystemInnovation: tDimensions.ekosystemInnovation,
  };

  const [data, setData] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [params.id]);

  async function fetchProject() {
    const res = await fetch(`/api/projects/${params.id}`);
    if (res.ok) {
      const projectData = await res.json();
      setData(projectData);
    }
    setIsLoading(false);
  }

  function getShareUrl() {
    if (typeof window === 'undefined' || !data) return '';
    return `${window.location.origin}/p/${data.project.shareCode}`;
  }

  function copyShareLink() {
    navigator.clipboard.writeText(getShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function updateStatus(status: 'active' | 'closed') {
    const res = await fetch(`/api/projects/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      fetchProject();
    }
    setShowSettings(false);
  }

  const projectNotFound = locale === 'sv' ? 'Projektet kunde inte hittas' : 'Project not found';
  const backToDashboard = locale === 'sv' ? 'Tillbaka till dashboard' : 'Back to dashboard';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-slate-400">{tDashboard.loadingProjects}</div>
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
  const pendingSessions = sessions.filter((s) => !s.completedAt);

  // Translate share link description with client name
  const shareLinkDescription = locale === 'sv'
    ? `Skicka denna länk till ${project.clientName}s ledningsgrupp för att samla in svar`
    : `Send this link to ${project.clientName}'s leadership team to collect responses`;

  return (
    <div>
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.backToProjects}
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {project.name}
            </h1>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                project.status === 'active'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : project.status === 'closed'
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
              }`}
            >
              {project.status === 'active' ? tStatus.active : project.status === 'closed' ? tStatus.closed : tStatus.draft}
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400">
            {project.clientName} ({project.clientDomain})
          </p>
          {project.deadline && (
            <p
              className={`text-sm mt-1 ${
                isDeadlinePassed(project.deadline)
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-1" />
              {isDeadlinePassed(project.deadline) ? tDashboard.closedOn : tDashboard.closesOn}{' '}
              {formatDate(project.deadline)}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {aggregatedScores && (
            <Link
              href={`/dashboard/project/${params.id}/report`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              {t.viewReport}
            </Link>
          )}
          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
            {showSettings && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-10">
                {project.status === 'active' ? (
                  <button
                    onClick={() => updateStatus('closed')}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    {t.closeSurvey}
                  </button>
                ) : (
                  <button
                    onClick={() => updateStatus('active')}
                    className="w-full px-4 py-2 text-left text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                  >
                    {t.reopenSurvey}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share link */}
      <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-xl p-6 mb-8">
        <h2 className="font-semibold text-teal-900 dark:text-teal-100 mb-2">
          {t.shareLink}
        </h2>
        <p className="text-sm text-teal-700 dark:text-teal-300 mb-4">
          {shareLinkDescription}
        </p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={getShareUrl()}
            className="flex-1 px-4 py-2 bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-700 rounded-lg text-sm text-slate-700 dark:text-slate-300"
          />
          <button
            onClick={copyShareLink}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4" />
                {tCommon.copied}
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                {tCommon.copy}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {completedSessions.length}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t.completedResponses}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {pendingSessions.length}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t.ongoing}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {aggregatedScores ? aggregatedScores.overallScore.toFixed(1) : '-'}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t.average}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Aggregated results */}
      {aggregatedScores && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
            {t.aggregatedResults}
          </h2>
          <div className="space-y-4">
            {Object.entries(aggregatedScores.dimensionScores).map(([key, value]) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {dimensionLabels[key as keyof typeof dimensionLabels]}
                  </span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {value.toFixed(1)}/5
                  </span>
                </div>
                <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: `${(value / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Respondents table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            {t.respondents} ({sessions.length})
          </h2>
        </div>
        {sessions.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">
              {t.noResponsesYet}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {t.respondent}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {tStatus.inProgress.split(' ')[0] === 'In' ? 'Status' : 'Status'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {t.date}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {sessions.map((session) => (
                  <tr key={session.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {session.respondentName || t.anonymous}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {session.respondentEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {session.completedAt ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                          <Check className="w-3 h-3" />
                          {tStatus.completed}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full">
                          <Clock className="w-3 h-3" />
                          {tStatus.inProgress}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(session.completedAt || session.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
