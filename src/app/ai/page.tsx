'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home as HomeIcon, Brain } from 'lucide-react';
import { AILandingPage } from '@/components/ai-assessment/AILandingPage';
import { AIAssessment } from '@/components/ai-assessment/AIAssessment';
import { AIResultsDashboard } from '@/components/ai-assessment/AIResultsDashboard';
import { AILanguageSwitcher } from '@/components/ai-assessment/AILanguageSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useAIAssessmentStore, useAIResultsStore } from '@/lib/ai-store';

type View = 'landing' | 'assessment' | 'results';

export default function AIMaturityPage() {
  const [view, setView] = useState<View>('landing');
  const [mounted, setMounted] = useState(false);
  const locale = useAIAssessmentStore((state) => state.locale);
  const resetAssessment = useAIAssessmentStore((state) => state.reset);
  const resetResults = useAIResultsStore((state) => state.reset);

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
        <div className="animate-pulse text-muted-foreground">
          {locale === 'sv' ? 'Laddar...' : 'Loading...'}
        </div>
      </div>
    );
  }

  return (
    <main className="relative">
      {/* Fixed header bar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between bg-background/80 backdrop-blur-sm border-b border-border/50">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {view === 'assessment' || view === 'results' ? (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              <HomeIcon className="w-4 h-4" />
              {locale === 'sv' ? 'Startsida' : 'Home'}
            </button>
          ) : (
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Brain className="w-4 h-4" />
              {locale === 'sv' ? 'Digital Mognad' : 'Digital Maturity'}
            </Link>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <AILanguageSwitcher />
        </div>
      </header>

      {/* Views */}
      <div className="pt-14">
        {view === 'landing' && <AILandingPage onStart={handleStartAssessment} />}
        {view === 'assessment' && <AIAssessment onComplete={handleAssessmentComplete} />}
        {view === 'results' && <AIResultsDashboard onReset={handleReset} />}
      </div>
    </main>
  );
}
