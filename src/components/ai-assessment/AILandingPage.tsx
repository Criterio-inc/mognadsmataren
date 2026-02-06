'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAIAssessmentStore } from '@/lib/ai-store';
import { ArrowRight, Brain, Users, Lightbulb, Clock, TrendingUp, Sparkles, Mail, Shield, Database, Cpu, Building2 } from 'lucide-react';

interface AILandingPageProps {
  onStart: () => void;
}

export function AILandingPage({ onStart }: AILandingPageProps) {
  const { locale } = useAIAssessmentStore();

  const features = [
    {
      icon: Brain,
      sv: { title: '32 påståenden', description: 'Inom 8 strategiska AI-dimensioner' },
      en: { title: '32 statements', description: 'Across 8 strategic AI dimensions' },
    },
    {
      icon: Clock,
      sv: { title: '15-20 minuter', description: 'Djupgående men fokuserad bedömning' },
      en: { title: '15-20 minutes', description: 'In-depth yet focused assessment' },
    },
    {
      icon: Sparkles,
      sv: { title: 'AI-insikter', description: 'Personliga rekommendationer med EU-kontext' },
      en: { title: 'AI insights', description: 'Personalized recommendations with EU context' },
    },
    {
      icon: Shield,
      sv: { title: 'EU AI Act', description: 'Bedömning av regulatorisk beredskap' },
      en: { title: 'EU AI Act', description: 'Regulatory readiness assessment' },
    },
  ];

  const dimensionHighlights = [
    { icon: TrendingUp, sv: 'Strategi & Ledarskap', en: 'Strategy & Leadership' },
    { icon: Lightbulb, sv: 'Användningsfall & Värde', en: 'Use Cases & Value' },
    { icon: Database, sv: 'Data & Infrastruktur', en: 'Data & Infrastructure' },
    { icon: Users, sv: 'Kompetens & Kultur', en: 'Competence & Culture' },
    { icon: Shield, sv: 'Styrning & Etik', en: 'Governance & Ethics' },
    { icon: Cpu, sv: 'Teknik & Arkitektur', en: 'Technology & Architecture' },
    { icon: Building2, sv: 'Organisation & Processer', en: 'Organization & Processes' },
    { icon: Sparkles, sv: 'Ekosystem & Innovation', en: 'Ecosystem & Innovation' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-24">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-12"
        >
          <Image
            src="/critero-icon.svg"
            alt="Critero"
            width={120}
            height={72}
            className="h-16 w-auto"
          />
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium mb-6">
            <Brain className="w-4 h-4" />
            {locale === 'sv' ? 'AI-Mognadsmätaren' : 'AI Maturity Meter'}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {locale === 'sv' ? 'AI-Mognadsmätaren' : 'AI Maturity Meter'}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            {locale === 'sv'
              ? 'Mät er organisations AI-mognad inom 8 strategiska dimensioner'
              : 'Measure your organization\'s AI maturity across 8 strategic dimensions'}
          </p>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto italic">
            {locale === 'sv'
              ? '"AI-mognad är inte en teknikfråga – det är en ledningsfråga"'
              : '"AI maturity is not a technology question – it\'s a leadership question"'}
          </p>

          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-teal-700 transition-all"
          >
            {locale === 'sv' ? 'Starta AI-bedömningen' : 'Start AI assessment'}
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <div className="mt-4">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {locale === 'sv' ? '← Tillbaka till Digital Mognadsmätare' : '← Back to Digital Maturity Meter'}
            </Link>
          </div>
        </motion.div>

        {/* Report teaser */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-24"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {locale === 'sv' ? 'Se vad du får' : 'See what you get'}
            </h2>
            <p className="text-muted-foreground">
              {locale === 'sv'
                ? 'En detaljerad AI-mognadsrapport med 8-dimensionell analys och handlingsbara rekommendationer'
                : 'A detailed AI maturity report with 8-dimensional analysis and actionable recommendations'}
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-500/20 to-transparent rounded-full blur-3xl" />

            <div className="relative grid md:grid-cols-2 gap-8">
              {/* Left side - Gauge preview */}
              <div className="space-y-6">
                <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-teal-400" />
                    <span className="text-sm font-medium text-slate-300">
                      {locale === 'sv' ? 'Er AI-mognadsnivå' : 'Your AI maturity level'}
                    </span>
                  </div>

                  <div className="relative h-32 flex items-center justify-center">
                    <svg viewBox="0 0 200 120" className="w-full max-w-[200px]">
                      <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="#334155"
                        strokeWidth="12"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 20 100 A 80 80 0 0 1 120 28"
                        fill="none"
                        stroke="url(#aiGaugeGradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="aiGaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f97316" />
                          <stop offset="100%" stopColor="#14b8a6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
                      <span className="text-4xl font-bold text-white">3.2</span>
                      <span className="text-xs text-slate-400">{locale === 'sv' ? 'av 5' : 'of 5'}</span>
                    </div>
                  </div>

                  <div className="text-center mt-2">
                    <span className="inline-block px-3 py-1 bg-teal-500/20 text-teal-400 text-sm font-medium rounded-full">
                      {locale === 'sv' ? 'Nivå 3: Formaliserande' : 'Level 3: Formalizing'}
                    </span>
                  </div>
                </div>

                {/* Dimension bars preview */}
                <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur">
                  <div className="text-sm font-medium text-slate-300 mb-4">
                    {locale === 'sv' ? 'Resultat per dimension' : 'Results by dimension'}
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { name: locale === 'sv' ? 'Strategi' : 'Strategy', score: 3.8, color: 'bg-teal-500' },
                      { name: locale === 'sv' ? 'Användningsfall' : 'Use Cases', score: 3.2, color: 'bg-emerald-500' },
                      { name: locale === 'sv' ? 'Data' : 'Data', score: 2.8, color: 'bg-cyan-500' },
                      { name: locale === 'sv' ? 'Kompetens' : 'Competence', score: 3.5, color: 'bg-sky-500' },
                      { name: locale === 'sv' ? 'Styrning' : 'Governance', score: 2.4, color: 'bg-orange-500' },
                      { name: locale === 'sv' ? 'Teknik' : 'Technology', score: 3.0, color: 'bg-indigo-500' },
                      { name: locale === 'sv' ? 'Organisation' : 'Organization', score: 3.4, color: 'bg-purple-500' },
                      { name: locale === 'sv' ? 'Ekosystem' : 'Ecosystem', score: 2.6, color: 'bg-rose-500' },
                    ].map((dim, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-0.5">
                          <span className="text-slate-400">{dim.name}</span>
                          <span className="text-white font-medium">{dim.score}</span>
                        </div>
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(dim.score / 5) * 100}%` }}
                            transition={{ delay: 0.5 + i * 0.08, duration: 0.8 }}
                            className={`h-full ${dim.color} rounded-full`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side - AI Insights preview */}
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur h-fit">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-teal-400" />
                  <span className="text-sm font-medium text-slate-300">
                    {locale === 'sv' ? 'AI-genererade insikter' : 'AI-generated insights'}
                  </span>
                </div>

                <div className="space-y-4 text-sm text-slate-300">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <span className="text-emerald-400 text-xs">&#10003;</span>
                    </div>
                    <p>
                      {locale === 'sv'
                        ? 'Stark strategisk förankring – ledningen driver AI-agendan aktivt.'
                        : 'Strong strategic alignment – leadership actively drives the AI agenda.'}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <span className="text-orange-400 text-xs">!</span>
                    </div>
                    <p>
                      {locale === 'sv'
                        ? 'Styrning & Etik kräver fokus – EU AI Act-beredskap behöver stärkas före aug 2026.'
                        : 'Governance & Ethics needs focus – EU AI Act readiness must be strengthened before Aug 2026.'}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <span className="text-teal-400 text-xs">&rarr;</span>
                    </div>
                    <p>
                      {locale === 'sv'
                        ? 'Rekommendation: Kartlägg AI-system och klassificera enligt EU AI Acts risknivåer.'
                        : 'Recommendation: Map AI systems and classify according to EU AI Act risk levels.'}
                    </p>
                  </motion.div>
                </div>

                {/* Frameworks context */}
                <div className="mt-6 pt-4 border-t border-slate-700 space-y-2">
                  <div className="text-xs text-slate-400">
                    {locale === 'sv' ? 'Baserat på ramverk från:' : 'Based on frameworks from:'}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['AI Sweden', 'EU AI Act', 'OECD', 'MITRE'].map((name) => (
                      <span key={name} className="text-xs px-2 py-0.5 bg-slate-700 text-slate-300 rounded">
                        {name}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 italic mt-2">
                    {locale === 'sv'
                      ? '* Exempelrapport – dina faktiska resultat baseras på dina svar'
                      : '* Example report – your actual results are based on your answers'}
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-center"
            >
              <button
                onClick={onStart}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                {locale === 'sv' ? 'Få din egen AI-mognadsrapport' : 'Get your own AI maturity report'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Features grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mb-24"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}
                transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 300 }}
                className="bg-card backdrop-blur rounded-xl p-6 shadow-lg cursor-pointer border border-border text-center"
              >
                <Icon className="w-10 h-10 text-teal-600 dark:text-teal-400 mb-4 mx-auto" />
                <h3 className="font-semibold text-card-foreground mb-1">
                  {feature[locale].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature[locale].description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 8 Dimensions overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-24"
        >
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            {locale === 'sv' ? '8 strategiska dimensioner' : '8 strategic dimensions'}
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {dimensionHighlights.map((dim, index) => {
              const Icon = dim.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border"
                >
                  <Icon className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-card-foreground">
                    {dim[locale]}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Why AI maturity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-24 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {locale === 'sv' ? 'Varför mäta AI-mognad?' : 'Why measure AI maturity?'}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {locale === 'sv'
                ? 'En AI-mognadsmätning ger organisationen en tydlig bild av var man står i sin AI-resa – från strategi och data till styrning och kompetens. Den synliggör styrkor, identifierar gap och skapar ett gemensamt språk för AI-frågor i hela organisationen.'
                : 'An AI maturity assessment gives the organization a clear picture of where it stands in its AI journey – from strategy and data to governance and competence. It highlights strengths, identifies gaps and creates a common language for AI matters across the organization.'}
            </p>
            <p>
              {locale === 'sv'
                ? 'Med EU:s AI-förordning (AI Act) som träder i full kraft i augusti 2026 och AI-kommissionens färdplan för Sverige är det avgörande att förstå sin nuvarande AI-mognad. Bedömningen hjälper organisationer att navigera mellan regulatoriska krav, tekniska möjligheter och affärsvärde.'
                : 'With the EU AI Act coming into full effect in August 2026 and the Swedish AI Commission\'s roadmap, it is critical to understand your current AI maturity. The assessment helps organizations navigate between regulatory requirements, technical opportunities and business value.'}
            </p>
            <p className="font-medium text-foreground">
              {locale === 'sv'
                ? 'Resultatet är en handlingsbar färdplan för att bygga hållbar AI-förmåga som balanserar innovation, styrning och verksamhetsnytta.'
                : 'The result is an actionable roadmap for building sustainable AI capability that balances innovation, governance and business value.'}
            </p>
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-card backdrop-blur rounded-2xl p-8 shadow-lg border border-border text-center"
        >
          <h2 className="text-2xl font-bold text-card-foreground mb-8">
            {locale === 'sv' ? 'Så här fungerar det' : 'How it works'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                sv: { title: 'Bedöm', description: 'Svara på 32 påståenden inom 8 AI-dimensioner – tar ca 15-20 minuter' },
                en: { title: 'Assess', description: 'Answer 32 statements across 8 AI dimensions – takes about 15-20 minutes' },
              },
              {
                step: 2,
                sv: { title: 'Analysera', description: 'Få en detaljerad rapport med radardiagram, dimensionsanalys och mognadsnivå' },
                en: { title: 'Analyze', description: 'Get a detailed report with radar chart, dimension analysis and maturity level' },
              },
              {
                step: 3,
                sv: { title: 'Agera', description: 'Använd AI-insikter och EU AI Act-kontext för att planera er AI-resa' },
                en: { title: 'Act', description: 'Use AI insights and EU AI Act context to plan your AI journey' },
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-teal-600 dark:text-teal-400">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">
                  {item[locale].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item[locale].description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-center border border-slate-700"
        >
          <Brain className="w-12 h-12 text-teal-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            {locale === 'sv' ? 'Vill ni mäta hela organisationens AI-mognad?' : 'Want to assess your entire organization\'s AI maturity?'}
          </h3>
          <p className="text-slate-300 mb-6 max-w-xl mx-auto">
            {locale === 'sv'
              ? 'Få aggregerade resultat med flera svaranden, jämförelseanalys, EU AI Act-beredskapsrapport och professionell facilitering av er AI-mognadsmätning.'
              : 'Get aggregated results with multiple respondents, comparative analysis, EU AI Act readiness report and professional facilitation of your AI maturity assessment.'}
          </p>
          <a
            href="mailto:kontakt@criteroconsulting.se?subject=AI-mognadsmätning – förfrågan"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Mail className="w-5 h-5" />
            {locale === 'sv' ? 'Kontakta oss' : 'Contact us'}
          </a>
          <p className="mt-4 text-sm text-slate-400">
            kontakt@criteroconsulting.se
          </p>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-24 pt-8 border-t border-border"
        >
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/critero-logo.svg"
              alt="Critero"
              width={160}
              height={80}
              className="h-16 w-auto"
            />
            <p className="text-sm text-muted-foreground">
              &copy; Critero AB
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
