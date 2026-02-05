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
    <div className="min-h-screen bg-background">
      {/* Hero section */}
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-24">
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
            {locale === 'sv' ? 'Mognadsmätaren' : 'Maturity Meter'}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            {locale === 'sv'
              ? 'Mät er ledningsgrupps digitala mognad'
              : 'Measure your leadership team\'s digital maturity'}
          </p>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto italic">
            {locale === 'sv'
              ? '"En digital strategi blir bara så bra som den förankring den får i ledningen"'
              : '"A digital strategy is only as good as the buy-in it gets from leadership"'}
          </p>

          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
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

        {/* Dimensions section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-24 text-center"
        >
          <h2 className="text-2xl font-bold text-foreground mb-8">
            {locale === 'sv' ? 'Fyra dimensioner av digital mognad' : 'Four dimensions of digital maturity'}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {dimensions.map((dim, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                }}
                transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 300 }}
                className="flex items-center gap-4 bg-card/80 backdrop-blur rounded-xl p-6 cursor-pointer border border-border"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  {index + 1}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-card-foreground mb-1">
                    {dim[locale].name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
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
          className="mb-24 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {locale === 'sv' ? 'Varför mäta digital mognad?' : 'Why measure digital maturity?'}
          </h2>
          <div className="space-y-4 text-muted-foreground">
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
            <p className="font-medium text-foreground">
              {locale === 'sv'
                ? 'Resultatet är en digital förflyttning som bygger på genomförbarhet, tydligt ansvar och ett tempo som organisationen faktiskt klarar att hålla över tid.'
                : 'The result is a digital transformation built on feasibility, clear accountability and a pace the organization can actually sustain over time.'}
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            {locale === 'sv' ? 'Börja nu – det tar bara 10-15 minuter' : 'Start now – it only takes 10-15 minutes'}
            <ArrowRight className="w-5 h-5" />
          </button>
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
