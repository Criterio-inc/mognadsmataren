// Centralized translations for the application
export type Locale = 'sv' | 'en';

export const translations = {
  // Common
  common: {
    loading: { sv: 'Laddar...', en: 'Loading...' },
    error: { sv: 'Något gick fel', en: 'Something went wrong' },
    cancel: { sv: 'Avbryt', en: 'Cancel' },
    save: { sv: 'Spara', en: 'Save' },
    delete: { sv: 'Ta bort', en: 'Delete' },
    copy: { sv: 'Kopiera', en: 'Copy' },
    copied: { sv: 'Kopierad!', en: 'Copied!' },
    back: { sv: 'Tillbaka', en: 'Back' },
    next: { sv: 'Nästa', en: 'Next' },
    previous: { sv: 'Föregående', en: 'Previous' },
    consultant: { sv: 'Konsult', en: 'Consultant' },
  },

  // Status labels
  status: {
    draft: { sv: 'Utkast', en: 'Draft' },
    active: { sv: 'Aktiv', en: 'Active' },
    closed: { sv: 'Stängd', en: 'Closed' },
    completed: { sv: 'Slutförd', en: 'Completed' },
    inProgress: { sv: 'Pågående', en: 'In progress' },
  },

  // Dashboard
  dashboard: {
    myProjects: { sv: 'Mina projekt', en: 'My projects' },
    manageProjects: { sv: 'Hantera dina kundprojekt och se resultat', en: 'Manage your client projects and view results' },
    demoProject: { sv: 'Demo-projekt', en: 'Demo project' },
    newProject: { sv: 'Nytt projekt', en: 'New project' },
    noProjectsYet: { sv: 'Inga projekt ännu', en: 'No projects yet' },
    createFirstProject: { sv: 'Skapa ditt första projekt för att börja samla in svar', en: 'Create your first project to start collecting responses' },
    createProject: { sv: 'Skapa projekt', en: 'Create project' },
    responses: { sv: 'svar', en: 'responses' },
    closesOn: { sv: 'Stänger', en: 'Closes' },
    closedOn: { sv: 'Stängdes', en: 'Closed' },
    copyLink: { sv: 'Kopiera länk', en: 'Copy link' },
    viewResults: { sv: 'Visa resultat', en: 'View results' },
    deleteProject: { sv: 'Ta bort projekt', en: 'Delete project' },
    loadingProjects: { sv: 'Laddar projekt...', en: 'Loading projects...' },
    creating: { sv: 'Skapar...', en: 'Creating...' },
  },

  // New project page
  newProjectPage: {
    backToProjects: { sv: 'Tillbaka till projekt', en: 'Back to projects' },
    createNewProject: { sv: 'Skapa nytt projekt', en: 'Create new project' },
    createDescription: { sv: 'Skapa ett projekt för att börja samla in AI-mognadsbedömningar från din kunds organisation', en: 'Create a project to start collecting AI maturity assessments from your client\'s organization' },
    projectName: { sv: 'Projektnamn', en: 'Project name' },
    projectNamePlaceholder: { sv: 't.ex. AI-Mognadsmätning Q1 2025', en: 'e.g. AI Maturity Assessment Q1 2025' },
    clientCompany: { sv: 'Kundföretag', en: 'Client company' },
    clientCompanyPlaceholder: { sv: 't.ex. Företaget AB', en: 'e.g. Company Ltd' },
    clientEmailDomain: { sv: 'Kundens e-postdomän', en: 'Client email domain' },
    clientEmailDomainPlaceholder: { sv: 't.ex. foretaget.se', en: 'e.g. company.com' },
    deadline: { sv: 'Deadline (valfritt)', en: 'Deadline (optional)' },
    deadlineDescription: { sv: 'Enkäten stängs automatiskt vid denna tidpunkt', en: 'The survey closes automatically at this time' },
  },

  // Project detail page
  projectDetail: {
    backToProjects: { sv: 'Tillbaka till projekt', en: 'Back to projects' },
    shareLink: { sv: 'Delningslänk', en: 'Share link' },
    shareLinkDescription: { sv: 'Skicka denna länk till {client}s organisation för att samla in AI-mognadsbedömningar', en: 'Send this link to {client}\'s organization to collect AI maturity assessments' },
    completedResponses: { sv: 'Slutförda svar', en: 'Completed responses' },
    ongoing: { sv: 'Pågående', en: 'Ongoing' },
    average: { sv: 'Genomsnitt', en: 'Average' },
    aggregatedResults: { sv: 'Aggregerade resultat', en: 'Aggregated results' },
    respondents: { sv: 'Respondenter', en: 'Respondents' },
    respondent: { sv: 'Respondent', en: 'Respondent' },
    date: { sv: 'Datum', en: 'Date' },
    anonymous: { sv: 'Anonym', en: 'Anonymous' },
    noResponsesYet: { sv: 'Inga svar ännu. Dela länken för att börja samla in svar.', en: 'No responses yet. Share the link to start collecting responses.' },
    viewReport: { sv: 'Visa rapport', en: 'View report' },
    closeSurvey: { sv: 'Stäng enkäten', en: 'Close survey' },
    reopenSurvey: { sv: 'Öppna enkäten igen', en: 'Reopen survey' },
  },

  // Report page
  report: {
    maturityReport: { sv: 'AI-Mognadsrapport', en: 'AI Maturity Report' },
    reportDescription: { sv: 'AI-mognadsbedömning för organisationen', en: 'AI maturity assessment for the organization' },
    project: { sv: 'Projekt', en: 'Project' },
    client: { sv: 'Kund', en: 'Client' },
    responseCount: { sv: 'Antal svar', en: 'Number of responses' },
    collectionEnded: { sv: 'Insamlingsperiod avslutad:', en: 'Collection period ended:' },
    overallMaturityLevel: { sv: 'Övergripande AI-mognadsnivå', en: 'Overall AI maturity level' },
    dimensionAnalysis: { sv: 'Dimensionsanalys', en: 'Dimension analysis' },
    maturityJourney: { sv: 'AI-mognadsresan', en: 'AI maturity journey' },
    dimensionsInDetail: { sv: 'Dimensioner i detalj', en: 'Dimensions in detail' },
    noCompletedResponses: { sv: 'Inga slutförda svar ännu', en: 'No completed responses yet' },
    reportShownWhen: { sv: 'Rapporten visas när minst en respondent har slutfört enkäten.', en: 'The report will be shown when at least one respondent has completed the survey.' },
    loadingReport: { sv: 'Laddar rapport...', en: 'Loading report...' },
    exportPdf: { sv: 'Exportera PDF', en: 'Export PDF' },
    generatedBy: { sv: 'Genererad av AI-Mognadsmätaren', en: 'Generated by AI Maturity Meter' },
  },

  // Assessment
  assessment: {
    title: { sv: 'AI-Mognadsmätning', en: 'AI Maturity Assessment' },
    description: { sv: 'Svara på frågorna för att bedöma er AI-mognad', en: 'Answer the questions to assess your AI maturity' },
    tip: { sv: 'Tips: Svara utifrån hur det faktiskt ser ut idag, inte hur ni vill att det ska vara', en: 'Tip: Answer based on how things actually are today, not how you want them to be' },
    question: { sv: 'Fråga', en: 'Question' },
    of: { sv: 'av', en: 'of' },
    previousButton: { sv: '← Föregående', en: '← Previous' },
    nextButton: { sv: 'Nästa →', en: 'Next →' },
    viewResults: { sv: 'Se resultat →', en: 'View results →' },
    progress: { sv: 'Framsteg', en: 'Progress' },
  },

  // Results dashboard
  results: {
    yourResults: { sv: 'Ert AI-mognadsresultat', en: 'Your AI maturity results' },
    resultsDescription: { sv: 'AI-mognadsbedömning baserad på 8 strategiska dimensioner', en: 'AI maturity assessment based on 8 strategic dimensions' },
    overallMaturityLevel: { sv: 'Övergripande AI-mognadsnivå', en: 'Overall AI maturity level' },
    dimensionAnalysis: { sv: 'Dimensionsanalys', en: 'Dimension analysis' },
    maturityJourney: { sv: 'AI-mognadsresan', en: 'AI maturity journey' },
    quote: {
      sv: '"AI-mognad är inte en teknikfråga – det är en ledningsfråga"',
      en: '"AI maturity is not a technology question – it\'s a leadership question"'
    },
    dimensionsInDetail: { sv: 'Dimensioner i detalj', en: 'Dimensions in detail' },
    aiInsights: { sv: 'AI-genererade insikter', en: 'AI-generated insights' },
    retakeAssessment: { sv: 'Gör om bedömningen', en: 'Retake assessment' },
    downloadReport: { sv: 'Ladda ner rapport', en: 'Download report' },
    shareWithTeam: { sv: 'Dela med teamet', en: 'Share with team' },
    pdfComingSoon: { sv: 'PDF-export kommer snart!', en: 'PDF export coming soon!' },
    shareComingSoon: { sv: 'Delningsfunktion kommer snart!', en: 'Share feature coming soon!' },
  },

  // Dimensions
  dimensions: {
    strategiLedarskap: { sv: 'Strategi & Ledarskap', en: 'Strategy & Leadership' },
    anvandsfall: { sv: 'Användningsfall & Värde', en: 'Use Cases & Value' },
    dataInfrastruktur: { sv: 'Data & Infrastruktur', en: 'Data & Infrastructure' },
    kompetensKultur: { sv: 'Kompetens & Kultur', en: 'Competence & Culture' },
    styrningEtik: { sv: 'Styrning & Etik', en: 'Governance & Ethics' },
    teknikArkitektur: { sv: 'Teknik & Arkitektur', en: 'Technology & Architecture' },
    organisationProcesser: { sv: 'Organisation & Processer', en: 'Organization & Processes' },
    ekosystemInnovation: { sv: 'Ekosystem & Innovation', en: 'Ecosystem & Innovation' },
  },

  // Landing page specific
  landing: {
    heroTitle: { sv: 'AI-Mognadsmätaren', en: 'AI Maturity Meter' },
    heroSubtitle: { sv: 'Mät er organisations AI-mognad inom 8 strategiska dimensioner', en: 'Measure your organization\'s AI maturity across 8 strategic dimensions' },
    startAssessment: { sv: 'Starta AI-bedömningen', en: 'Start AI assessment' },
    whyMeasure: { sv: 'Varför mäta AI-mognad?', en: 'Why measure AI maturity?' },
    howItWorks: { sv: 'Så här fungerar det', en: 'How it works' },
    startNow: { sv: 'Börja nu – det tar ca 15-20 minuter', en: 'Start now – it takes about 15-20 minutes' },
  },

  // Survey page (shared assessment)
  survey: {
    loadingSurvey: { sv: 'Laddar enkät...', en: 'Loading survey...' },
    surveyNotFound: { sv: 'Enkäten kunde inte hittas', en: 'Survey not found' },
    surveyClosed: { sv: 'Enkäten är stängd', en: 'Survey is closed' },
    surveyClosedDescription: { sv: 'Denna enkät är inte längre öppen för svar.', en: 'This survey is no longer accepting responses.' },
    thankYou: { sv: 'Tack för ditt svar!', en: 'Thank you for your response!' },
    responsesRecorded: { sv: 'Dina svar har registrerats. Vi återkommer med en samlad analys av organisationens AI-mognadsresultat.', en: 'Your responses have been recorded. We will follow up with a comprehensive analysis of the organization\'s AI maturity results.' },
    digitalMaturityFor: { sv: 'AI-mognadsmätning för', en: 'AI maturity assessment for' },
    yourEmail: { sv: 'Din e-postadress', en: 'Your email address' },
    onlyDomainCanParticipate: { sv: 'Endast @{domain} kan delta', en: 'Only @{domain} can participate' },
    yourName: { sv: 'Ditt namn (valfritt)', en: 'Your name (optional)' },
    namePlaceholder: { sv: 'Förnamn Efternamn', en: 'First name Last name' },
    startSurvey: { sv: 'Starta enkäten', en: 'Start survey' },
    starting: { sv: 'Startar...', en: 'Starting...' },
    surveyDuration: { sv: 'Enkäten tar ca 15-20 minuter att genomföra', en: 'The survey takes approximately 15-20 minutes to complete' },
    question: { sv: 'Fråga', en: 'Question' },
    of: { sv: 'av', en: 'of' },
    previous: { sv: 'Föregående', en: 'Previous' },
    next: { sv: 'Nästa', en: 'Next' },
    submitResponses: { sv: 'Skicka in svar', en: 'Submit responses' },
    submitting: { sv: 'Skickar...', en: 'Submitting...' },
    submitError: { sv: 'Något gick fel vid inskickning', en: 'Something went wrong while submitting' },
    // Rating scale
    rating1: { sv: 'Stämmer inte alls', en: 'Strongly disagree' },
    rating2: { sv: 'Stämmer till viss del', en: 'Somewhat disagree' },
    rating3: { sv: 'Stämmer delvis', en: 'Neutral' },
    rating4: { sv: 'Stämmer till stor del', en: 'Somewhat agree' },
    rating5: { sv: 'Stämmer helt', en: 'Strongly agree' },
  },
} as const;

// Helper function to get a translation
export function t(key: string, locale: Locale): string {
  const keys = key.split('.');
  let value: unknown = translations;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  if (value && typeof value === 'object' && locale in value) {
    return (value as Record<string, string>)[locale];
  }

  return key;
}

// Hook-friendly helper - returns the translation object for a section
export function getTranslations<T extends keyof typeof translations>(
  section: T,
  locale: Locale
): Record<keyof typeof translations[T], string> {
  const sectionTranslations = translations[section];
  const result: Record<string, string> = {};

  for (const key in sectionTranslations) {
    const item = sectionTranslations[key as keyof typeof sectionTranslations] as Record<Locale, string>;
    result[key] = item[locale];
  }

  return result as Record<keyof typeof translations[T], string>;
}
