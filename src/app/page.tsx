'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LogIn, Home as HomeIcon } from 'lucide-react';
import { LandingPage } from '@/components/landing/LandingPage';
import { Assessment } from '@/components/assessment/Assessment';
import { ResultsDashboard } from '@/components/results/ResultsDashboard';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useAssessmentStore, useResultsStore } from '@/lib/store';
import { getTranslations } from '@/lib/translations';

type View = 'landing' | 'assessment' | 'results';

export default function Home() {
  const [view, setView] = useState<View>('landing');
  const [mounted, setMounted] = useState(false);
  const locale = useAssessmentStore((state) => state.locale);
  const resetAssessment = useAssessmentStore((state) => state.reset);
  const resetResults = useResultsStore((state) => state.reset);
  const tCommon = getTranslations('common', locale);

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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">{tCommon.loading}</div>
      </div>
    );
  }

  return (
    <main className="relative">
      {/* Top left link - shows Home during assessment, Consultant link otherwise */}
      {view === 'assessment' || view === 'results' ? (
        <button
          onClick={handleReset}
          className="fixed top-4 left-4 z-50 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <HomeIcon className="w-4 h-4" />
          {locale === 'sv' ? 'Startsida' : 'Home'}
        </button>
      ) : (
        <Link
          href="/login"
          className="fixed top-4 left-4 z-50 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogIn className="w-4 h-4" />
          {tCommon.consultant}
        </Link>
      )}

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
