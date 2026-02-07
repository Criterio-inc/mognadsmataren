'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, AlertCircle, Mail, User, Globe, Home } from 'lucide-react';
import { questions, dimensions } from '@/lib/questions';
import { getTranslations, type Locale } from '@/lib/translations';

type Step = 'loading' | 'error' | 'closed' | 'email' | 'assessment' | 'completed';

interface ProjectInfo {
  id: string;
  name: string;
  clientName: string;
  clientDomain: string;
}

export default function SurveyPage() {
  const params = useParams();
  const shareCode = params.shareCode as string;

  // Local locale state for survey page (independent of main app)
  const [locale, setLocale] = useState<Locale>('sv');
  const t = getTranslations('survey', locale);
  const tCommon = getTranslations('common', locale);

  const [step, setStep] = useState<Step>('loading');
  const [project, setProject] = useState<ProjectInfo | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [shareCode]);

  async function fetchProject() {
    const res = await fetch(`/api/survey?code=${shareCode}`);
    const data = await res.json();

    if (res.ok) {
      setProject(data);
      setStep('email');
    } else if (res.status === 403) {
      setProject(data.project || null);
      setStep('closed');
    } else {
      setErrorMessage(data.error || t.surveyNotFound);
      setStep('error');
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const res = await fetch('/api/survey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shareCode, email, name }),
    });

    const data = await res.json();

    if (res.ok) {
      setSessionId(data.sessionId);
      setResponses(data.responses || {});
      // Resume from where they left off
      const answeredCount = Object.keys(data.responses || {}).length;
      setCurrentQuestionIndex(Math.min(answeredCount, questions.length - 1));
      setStep('assessment');
    } else {
      setErrorMessage(data.error || tCommon.error);
    }

    setIsSubmitting(false);
  }

  async function saveResponse(questionId: number, value: number) {
    if (!sessionId) return;

    setResponses((prev) => ({ ...prev, [questionId]: value }));

    // Save to server in background
    fetch(`/api/survey/${sessionId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId, value }),
    });
  }

  async function handleComplete() {
    if (!sessionId) return;

    setIsSubmitting(true);
    setErrorMessage('');

    const res = await fetch(`/api/survey/${sessionId}`, {
      method: 'POST',
    });

    if (res.ok) {
      setStep('completed');
    } else {
      const data = await res.json();
      setErrorMessage(data.error || t.submitError);
    }

    setIsSubmitting(false);
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentDimension = dimensions.find((d) => d.id === currentQuestion?.dimension);
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const allAnswered = Object.keys(responses).length === questions.length;

  // Rating scale labels
  const ratingLabels = [
    { value: 1, label: t.rating1 },
    { value: 2, label: t.rating2 },
    { value: 3, label: t.rating3 },
    { value: 4, label: t.rating4 },
    { value: 5, label: t.rating5 },
  ];

  function goNext() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }

  function goPrev() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }

  // Language switcher component for survey
  const LanguageToggle = () => (
    <button
      onClick={() => setLocale(locale === 'sv' ? 'en' : 'sv')}
      className="fixed top-4 right-4 z-50 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
    >
      <Globe className="w-4 h-4" />
      {locale === 'sv' ? 'EN' : 'SV'}
    </button>
  );

  // Header text component
  const HeaderText = ({ className = '' }: { className?: string }) => (
    <span className={`font-bold ${className}`} style={{ color: '#1a5f5a' }}>
      {locale === 'sv' ? 'AI-Mognadsmätaren' : 'AI Maturity Meter'}
    </span>
  );

  // Render different steps
  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">{t.loadingSurvey}</div>
      </div>
    );
  }

  if (step === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4">
        <LanguageToggle />
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {t.surveyNotFound}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">{errorMessage}</p>
        </div>
      </div>
    );
  }

  if (step === 'closed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4">
        <LanguageToggle />
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {t.surveyClosed}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {project?.name
              ? (locale === 'sv'
                  ? `Enkäten "${project.name}" är inte längre öppen för svar.`
                  : `The survey "${project.name}" is no longer accepting responses.`)
              : t.surveyClosedDescription}
          </p>
        </div>
      </div>
    );
  }

  if (step === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            {t.thankYou}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            {t.responsesRecorded}
          </p>
          <div className="flex justify-center">
            <HeaderText className="text-lg opacity-50" />
          </div>
        </motion.div>
      </div>
    );
  }

  if (step === 'email') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4">
        <LanguageToggle />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="flex justify-center mb-8">
            <HeaderText className="text-2xl" />
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-2xl p-8 shadow-xl">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">
              {project?.name}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-center mb-8">
              {t.digitalMaturityFor} {project?.clientName}
            </p>

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <Mail className="w-4 h-4" />
                  {t.yourEmail}
                </label>
                <input
                  type="email"
                  required
                  placeholder={`${locale === 'sv' ? 'namn' : 'name'}@${project?.clientDomain}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-shadow text-slate-900 dark:text-white placeholder:text-slate-400"
                />
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {locale === 'sv'
                    ? `Endast @${project?.clientDomain} kan delta`
                    : `Only @${project?.clientDomain} can participate`}
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <User className="w-4 h-4" />
                  {t.yourName}
                </label>
                <input
                  type="text"
                  placeholder={t.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-shadow text-slate-900 dark:text-white placeholder:text-slate-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
              >
                {isSubmitting ? t.starting : t.startSurvey}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <p className="mt-6 text-xs text-slate-400 text-center">
              {t.surveyDuration}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Assessment step
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <LanguageToggle />
      {/* Back to start link */}
      <a
        href="/"
        className="fixed top-4 left-4 z-50 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
      >
        <Home className="w-4 h-4" />
        {locale === 'sv' ? 'Startsida' : 'Home'}
      </a>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-600 to-emerald-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <HeaderText className="text-sm opacity-70" />
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {t.question} {currentQuestionIndex + 1} {t.of} {questions.length}
          </span>
        </div>

        {/* Dimension indicator */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-sm font-medium rounded-full">
            {currentDimension?.[locale].name}
          </span>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-2xl p-8 shadow-xl mb-8"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mb-8">
              {currentQuestion?.[locale]}
            </h2>

            {/* Rating scale */}
            <div className="space-y-3">
              {ratingLabels.map((option) => (
                <button
                  key={option.value}
                  onClick={() => saveResponse(currentQuestion.id, option.value)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    responses[currentQuestion.id] === option.value
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      responses[currentQuestion.id] === option.value
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {option.value}
                  </div>
                  <span
                    className={`text-left ${
                      responses[currentQuestion.id] === option.value
                        ? 'text-teal-700 dark:text-teal-300 font-medium'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={goPrev}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t.previous}
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleComplete}
              disabled={!allAnswered || isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t.submitting : t.submitResponses}
              <Check className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={goNext}
              disabled={!responses[currentQuestion?.id]}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.next}
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
