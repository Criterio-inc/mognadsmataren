'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/lib/store';
import { ArrowRight, BarChart3, Users, Lightbulb, Clock, TrendingUp, Sparkles, Mail } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  const { locale } = useAssessmentStore();

  const features = [
    {
      icon: BarChart3,
      sv: { title: '32 påståenden', description: 'Inom 8 strategiska dimensioner' },
      en: { title: '32 statements', description: 'Across 8 strategic dimensions' },
    },
    {
      icon: Clock,
      sv: { title: '15-20 minuter', description: 'Grundlig men fokuserad bedömning' },
      en: { title: '15-20 minutes', description: 'Thorough yet focused assessment' },
    },
    {
      icon: Lightbulb,
      sv: { title: 'AI-insikter', description: 'Personliga rekommendationer' },
      en: { title: 'AI insights', description: 'Personalized recommendations' },
    },
    {
      icon: Users,
      sv: { title: 'Teamjämförelse', description: 'Se aggregerade resultat' },
      en: { title: 'Team comparison', description: 'View aggregated results' },
    },
  ];


  return (
    <div className="min-h-screen bg-background">
      {/* Hero section */}
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-24">
        {/* Orange icon logo at top */}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            {locale === 'sv' ? 'Starta AI-bedömningen' : 'Start AI assessment'}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Report Teaser Section */}
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
                ? 'En detaljerad rapport med grafer, analyser och AI-genererade insikter'
                : 'A detailed report with graphs, analysis and AI-generated insights'}
            </p>
          </div>

          {/* Report Preview Card */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700 overflow-hidden relative"
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl" />

            <div className="relative grid md:grid-cols-2 gap-8">
              {/* Left side - Gauge and Score */}
              <div className="space-y-6">
                <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-orange-400" />
                    <span className="text-sm font-medium text-slate-300">
                      {locale === 'sv' ? 'Er AI-mognadsnivå' : 'Your AI maturity level'}
                    </span>
                  </div>

                  {/* Simulated Gauge */}
                  <div className="relative h-32 flex items-center justify-center">
                    <svg viewBox="0 0 200 120" className="w-full max-w-[200px]">
                      {/* Background arc */}
                      <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="#334155"
                        strokeWidth="12"
                        strokeLinecap="round"
                      />
                      {/* Progress arc */}
                      <path
                        d="M 20 100 A 80 80 0 0 1 140 35"
                        fill="none"
                        stroke="url(#gaugeGradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#F5A623" />
                          <stop offset="100%" stopColor="#1a5f5a" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
                      <span className="text-4xl font-bold text-white">3.8</span>
                      <span className="text-xs text-slate-400">{locale === 'sv' ? 'av 5' : 'of 5'}</span>
                    </div>
                  </div>

                  <div className="text-center mt-2">
                    <span className="inline-block px-3 py-1 bg-teal-500/20 text-teal-400 text-sm font-medium rounded-full">
                      {locale === 'sv' ? 'Nivå 4: Skalande' : 'Level 4: Scaling'}
                    </span>
                  </div>
                </div>

                {/* Dimension bars */}
                <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur">
                  <div className="text-sm font-medium text-slate-300 mb-4">
                    {locale === 'sv' ? 'Resultat per dimension' : 'Results by dimension'}
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: locale === 'sv' ? 'Strategi & Ledarskap' : 'Strategy & Leadership', score: 4.2, color: 'bg-teal-500' },
                      { name: locale === 'sv' ? 'Data & Infrastruktur' : 'Data & Infrastructure', score: 3.6, color: 'bg-cyan-500' },
                      { name: locale === 'sv' ? 'Styrning & Etik' : 'Governance & Ethics', score: 3.8, color: 'bg-orange-500' },
                      { name: locale === 'sv' ? 'Kompetens & Kultur' : 'Competence & Culture', score: 3.4, color: 'bg-emerald-500' },
                    ].map((dim, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">{dim.name}</span>
                          <span className="text-white font-medium">{dim.score}</span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(dim.score / 5) * 100}%` }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                            className={`h-full ${dim.color} rounded-full`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side - AI Insights */}
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur h-fit">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-orange-400" />
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
                      <span className="text-emerald-400 text-xs">✓</span>
                    </div>
                    <p>
                      {locale === 'sv'
                        ? 'Starkt strategiskt ledarskap och tydlig AI-vision på ledningsnivå.'
                        : 'Strong strategic leadership and clear AI vision at management level.'}
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
                        ? 'Potential att förbättra AI-kompetens och kultur i hela organisationen.'
                        : 'Potential to improve AI competence and culture across the organization.'}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <span className="text-teal-400 text-xs">→</span>
                    </div>
                    <p>
                      {locale === 'sv'
                        ? 'Rekommendation: Kartlägg er status gentemot EU AI Act och formalisera AI-styrning.'
                        : 'Recommendation: Map your status against the EU AI Act and formalize AI governance.'}
                    </p>
                  </motion.div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700">
                  <p className="text-xs text-slate-500 italic">
                    {locale === 'sv'
                      ? '* Exempelrapport – dina faktiska resultat baseras på dina svar'
                      : '* Example report – your actual results are based on your answers'}
                  </p>
                </div>
              </div>
            </div>

            {/* Call to action overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-center"
            >
              <button
                onClick={onStart}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                {locale === 'sv' ? 'Få din egen rapport' : 'Get your own report'}
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
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 300 }}
                className="bg-card backdrop-blur rounded-xl p-6 shadow-lg cursor-pointer border border-border text-center"
              >
                <Icon className="w-10 h-10 text-primary mb-4 mx-auto" />
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

        {/* Why AI maturity assessment */}
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
                ? 'En AI-mognadsmätning skapar ett gemensamt och verifierbart nuläge för hela organisationen. Den flyttar dialogen från upplevda behov och lösryckta AI-initiativ till en sammanhängande förståelse för hur strategi, data, kompetens, styrning och teknik faktiskt hänger ihop i er AI-resa.'
                : 'An AI maturity assessment creates a shared and verifiable baseline for the entire organization. It shifts the dialogue from perceived needs and disconnected AI initiatives to a coherent understanding of how strategy, data, competence, governance and technology actually connect in your AI journey.'}
            </p>
            <p>
              {locale === 'sv'
                ? 'Med EU:s AI-förordning (AI Act) som träder i kraft är det viktigare än någonsin att förstå var ni står – både vad gäller teknisk mognad och regelefterlevnad. En strukturerad bedömning ger er verktygen att prioritera rätt och agera proaktivt.'
                : 'With the EU AI Act coming into effect, it is more important than ever to understand where you stand – both in terms of technical maturity and regulatory compliance. A structured assessment gives you the tools to prioritize correctly and act proactively.'}
            </p>
            <p className="font-medium text-foreground">
              {locale === 'sv'
                ? 'Resultatet är en AI-förflyttning som bygger på genomförbarhet, tydligt ansvar och ett tempo som organisationen faktiskt klarar att hålla över tid.'
                : 'The result is an AI transformation built on feasibility, clear accountability and a pace the organization can actually sustain over time.'}
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
                sv: { title: 'Genomför', description: 'Varje deltagare fyller i enkäten individuellt – 32 påståenden om er AI-mognad' },
                en: { title: 'Complete', description: 'Each participant fills in the survey individually – 32 statements about your AI maturity' },
              },
              {
                step: 2,
                sv: { title: 'Analysera', description: 'Se individuella och aggregerade resultat per dimension med EU AI Act-kontext' },
                en: { title: 'Analyze', description: 'View individual and aggregated results per dimension with EU AI Act context' },
              },
              {
                step: 3,
                sv: { title: 'Agera', description: 'Använd AI-insikterna för att planera er organisations AI-resa' },
                en: { title: 'Act', description: 'Use AI insights to plan your organization\'s AI journey' },
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">
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

        {/* Team version CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-center border border-slate-700"
        >
          <Users className="w-12 h-12 text-orange-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            {locale === 'sv' ? 'Vill ni mäta hela organisationens AI-mognad?' : 'Want to assess your entire organization\'s AI maturity?'}
          </h3>
          <p className="text-slate-300 mb-6 max-w-xl mx-auto">
            {locale === 'sv'
              ? 'Få aggregerade resultat med flera svaranden, jämförelseanalys och professionell facilitering av er AI-mognadsmätning.'
              : 'Get aggregated results with multiple respondents, comparative analysis and professional facilitation of your AI maturity assessment.'}
          </p>
          <a
            href="mailto:kontakt@criteroconsulting.se?subject=AI-mognadsmätning – förfrågan"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Mail className="w-5 h-5" />
            {locale === 'sv' ? 'Kontakta oss' : 'Contact us'}
          </a>
          <p className="mt-4 text-sm text-slate-400">
            kontakt@criteroconsulting.se
          </p>
        </motion.div>

        {/* Footer with logo and copyright */}
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
              © Critero AB
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
