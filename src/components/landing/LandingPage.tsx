'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/lib/store';
import { ArrowRight, BarChart3, Users, Lightbulb, Clock } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  const { locale } = useAssessmentStore();

  const features = [
    {
      icon: BarChart3,
      sv: { title: '22 påståenden', description: 'Inom 4 strategiska dimensioner' },
      en: { title: '22 statements', description: 'Across 4 strategic dimensions' },
    },
    {
      icon: Clock,
      sv: { title: '10-15 minuter', description: 'Snabb och fokuserad bedömning' },
      en: { title: '10-15 minutes', description: 'Quick and focused assessment' },
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

  const dimensions = [
    {
      sv: { name: 'Gemensam Bild', description: 'Förståelse för digitaliseringens innebörd' },
      en: { name: 'Shared Understanding', description: 'Understanding what digitalization means' },
    },
    {
      sv: { name: 'Strategisk Koppling', description: 'Koppling till verksamhetsmål' },
      en: { name: 'Strategic Alignment', description: 'Connection to business goals' },
    },
    {
      sv: { name: 'Prioritering & Beslut', description: 'Förmåga att prioritera och besluta' },
      en: { name: 'Prioritization & Decisions', description: 'Ability to prioritize and decide' },
    },
    {
      sv: { name: 'Ägarskap & Genomförande', description: 'Ansvar och förändringsledning' },
      en: { name: 'Ownership & Execution', description: 'Responsibility and change management' },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero section */}
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-24">
        {/* Curago Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-12"
        >
          <Image
            src="/curago-logo.png"
            alt="Curago"
            width={240}
            height={80}
            className="h-16 md:h-20 w-auto"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {locale === 'sv' ? 'Mognadsmätaren' : 'Maturity Meter'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto">
            {locale === 'sv'
              ? 'Mät er ledningsgrupps digitala mognad'
              : 'Measure your leadership team\'s digital maturity'}
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto italic">
            {locale === 'sv'
              ? '"En digital strategi blir bara så bra som den förankring den får i ledningen"'
              : '"A digital strategy is only as good as the buy-in it gets from leadership"'}
          </p>

          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            {locale === 'sv' ? 'Starta bedömningen' : 'Start assessment'}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
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
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-xl p-6 shadow-lg cursor-pointer"
              >
                <Icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {feature[locale].title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {feature[locale].description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Dimensions section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-24"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            {locale === 'sv' ? 'Fyra dimensioner av digital mognad' : 'Four dimensions of digital maturity'}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {dimensions.map((dim, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{
                  scale: 1.02,
                  x: index % 2 === 0 ? 5 : -5,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                }}
                transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 300 }}
                className="flex items-start gap-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur rounded-xl p-6 cursor-pointer"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {dim[locale].name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {dim[locale].description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why digital maturity assessment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-24 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
            {locale === 'sv' ? 'Varför mäta digital mognad?' : 'Why measure digital maturity?'}
          </h2>
          <div className="max-w-4xl mx-auto space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              {locale === 'sv'
                ? 'En digital mognadsmätning skapar ett gemensamt och verifierbart nuläge för ledning och verksamhet. Den flyttar dialogen från upplevda behov och lösryckta initiativ till en sammanhängande förståelse för hur styrning, förmågor, arbetssätt och teknik faktiskt hänger ihop.'
                : 'A digital maturity assessment creates a shared and verifiable baseline for leadership and operations. It shifts the dialogue from perceived needs and disconnected initiatives to a coherent understanding of how governance, capabilities, ways of working and technology actually connect.'}
            </p>
            <p>
              {locale === 'sv'
                ? 'När nuläget är tydligt blir det möjligt att formulera en digital ambition som är både relevant och realistisk – och att skilja mellan vad som är strategiskt viktigt och vad som bara är angeläget.'
                : 'When the current state is clear, it becomes possible to formulate a digital ambition that is both relevant and realistic – and to distinguish between what is strategically important and what is merely urgent.'}
            </p>
            <p className="font-medium text-gray-700 dark:text-gray-200">
              {locale === 'sv'
                ? 'Resultatet är en digital förflyttning som bygger på genomförbarhet, tydligt ansvar och ett tempo som organisationen faktiskt klarar att hålla över tid – i linje med Curagos 5-stegsmodell för digital förflyttning.'
                : 'The result is a digital transformation built on feasibility, clear accountability and a pace the organization can actually sustain over time – in line with Curago\'s 5-step model for digital transformation.'}
            </p>
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-2xl p-8 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            {locale === 'sv' ? 'Så här fungerar det' : 'How it works'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                sv: { title: 'Genomför', description: 'Varje ledningsgruppmedlem fyller i enkäten individuellt' },
                en: { title: 'Complete', description: 'Each leadership team member fills in the survey individually' },
              },
              {
                step: 2,
                sv: { title: 'Analysera', description: 'Se individuella och aggregerade resultat per dimension' },
                en: { title: 'Analyze', description: 'View individual and aggregated results per dimension' },
              },
              {
                step: 3,
                sv: { title: 'Agera', description: 'Använd AI-insikterna för att planera er utvecklingsresa' },
                en: { title: 'Act', description: 'Use AI insights to plan your development journey' },
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {item[locale].title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item[locale].description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            {locale === 'sv' ? 'Börja nu – det tar bara 10-15 minuter' : 'Start now – it only takes 10-15 minutes'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-24 pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/curago-logo.png"
                alt="Curago"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {locale === 'sv'
                ? '© 2025 Curago. Verktyg för digital transformation.'
                : '© 2025 Curago. Tools for digital transformation.'}
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
