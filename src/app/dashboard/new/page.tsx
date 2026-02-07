'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Building2, Globe, FileText } from 'lucide-react';
import { useAssessmentStore } from '@/lib/store';
import { getTranslations } from '@/lib/translations';

export default function NewProjectPage() {
  const router = useRouter();
  const locale = useAssessmentStore((state) => state.locale);
  const t = getTranslations('newProjectPage', locale);
  const tDashboard = getTranslations('dashboard', locale);
  const tCommon = getTranslations('common', locale);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    clientName: '',
    clientDomain: '',
    deadline: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        status: 'active',
      }),
    });

    if (res.ok) {
      const project = await res.json();
      router.push(`/dashboard/project/${project.id}`);
    } else {
      const data = await res.json();
      setError(data.error || tCommon.error);
      setIsSubmitting(false);
    }
  }

  // Domain restriction hint
  const domainHint = locale === 'sv'
    ? 'Endast e-postadresser med denna domän kan svara på enkäten'
    : 'Only email addresses with this domain can respond to the survey';

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.backToProjects}
      </Link>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {t.createNewProject}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          {t.createDescription}
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <FileText className="w-4 h-4" />
              {t.projectName}
            </label>
            <input
              type="text"
              required
              placeholder={t.projectNamePlaceholder}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-shadow text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <Building2 className="w-4 h-4" />
              {t.clientCompany}
            </label>
            <input
              type="text"
              required
              placeholder={t.clientCompanyPlaceholder}
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-shadow text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <Globe className="w-4 h-4" />
              {t.clientEmailDomain}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">@</span>
              <input
                type="text"
                required
                placeholder={t.clientEmailDomainPlaceholder}
                value={formData.clientDomain}
                onChange={(e) =>
                  setFormData({ ...formData, clientDomain: e.target.value.replace('@', '') })
                }
                className="w-full pl-8 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-shadow text-slate-900 dark:text-white placeholder:text-slate-400"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {domainHint}
            </p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <Calendar className="w-4 h-4" />
              {t.deadline}
            </label>
            <input
              type="datetime-local"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-shadow text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {t.deadlineDescription}
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <Link
              href="/dashboard"
              className="flex-1 px-4 py-3 text-center text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              {tCommon.cancel}
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? tDashboard.creating : tDashboard.createProject}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
