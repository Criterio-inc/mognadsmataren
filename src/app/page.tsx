'use client';

import { useState, useEffect } from 'react';
import { LandingPage } from '@/components/landing/LandingPage';
import { Assessment } from '@/components/assessment/Assessment';
import { ResultsDashboard } from '@/components/results/ResultsDashboard';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useAssessmentStore, useResultsStore } from '@/lib/store';

type View = 'landing' | 'assessment' | 'results';

export default function Home() {
  const [view, setView] = useState<View>('landing');
  const [mounted, setMounted] = useState(false);
  const resetAssessment = useAssessmentStore((state) => state.reset);
  const resetResults = useResultsStore((state) => state.reset);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStartAssessment = () => {
    resetAssessment();
    resetResults();
    setView('assessment');
  };

  const handleAssessmentComplete = () => {
    setView('results');
  };

  const handleReset = () => {
    resetAssessment();
    resetResults();
    setView('landing');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Laddar...</div>
      </div>
    );
  }

  return (
    <main className="relative">
      {/* Language switcher */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Views */}
      {view === 'landing' && <LandingPage onStart={handleStartAssessment} />}
      {view === 'assessment' && <Assessment onComplete={handleAssessmentComplete} />}
      {view === 'results' && <ResultsDashboard onReset={handleReset} />}
    </main>
  );
}
