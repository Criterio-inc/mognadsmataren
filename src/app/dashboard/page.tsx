'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Users, Calendar, Link as LinkIcon, MoreVertical, Trash2 } from 'lucide-react';
import { formatDate, isDeadlinePassed } from '@/lib/utils';

interface Project {
  id: string;
  name: string;
  clientName: string;
  clientDomain: string;
  shareCode: string;
  status: 'draft' | 'active' | 'closed';
  deadline: string | null;
  createdAt: string;
  responseCount: number;
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewProject, setShowNewProject] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const res = await fetch('/api/projects');
    if (res.ok) {
      const data = await res.json();
      setProjects(data);
    }
    setIsLoading(false);
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setProjects(projects.filter((p) => p.id !== id));
    }
    setDeleteConfirm(null);
  }

  function getShareUrl(shareCode: string) {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}/p/${shareCode}`;
  }

  function copyShareLink(shareCode: string) {
    navigator.clipboard.writeText(getShareUrl(shareCode));
  }

  const statusColors = {
    draft: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
    active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    closed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  const statusLabels = {
    draft: 'Utkast',
    active: 'Aktiv',
    closed: 'Stängd',
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-slate-400">Laddar projekt...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Mina projekt
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Hantera dina kundprojekt och se resultat
          </p>
        </div>
        <Link
          href="/dashboard/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nytt projekt
        </Link>
      </div>

      {/* Projects grid */}
      {projects.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
            Inga projekt ännu
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Skapa ditt första projekt för att börja samla in svar
          </p>
          <Link
            href="/dashboard/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Skapa projekt
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Link
                    href={`/dashboard/project/${project.id}`}
                    className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {project.name}
                  </Link>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {project.clientName}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[project.status]}`}
                >
                  {statusLabels[project.status]}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Users className="w-4 h-4" />
                  <span>{project.responseCount} svar</span>
                </div>
                {project.deadline && (
                  <div
                    className={`flex items-center gap-2 text-sm ${
                      isDeadlinePassed(project.deadline)
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>
                      {isDeadlinePassed(project.deadline) ? 'Stängdes ' : 'Stänger '}
                      {formatDate(project.deadline)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  onClick={() => copyShareLink(project.shareCode)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  <LinkIcon className="w-4 h-4" />
                  Kopiera länk
                </button>
                <Link
                  href={`/dashboard/project/${project.id}`}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Visa resultat
                </Link>
                <div className="relative">
                  <button
                    onClick={() =>
                      setDeleteConfirm(deleteConfirm === project.id ? null : project.id)
                    }
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {deleteConfirm === project.id && (
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-10">
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                        Ta bort projekt
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
