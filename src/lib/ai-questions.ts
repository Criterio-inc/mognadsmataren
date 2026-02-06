// AI Maturity Assessment - Criterio
// Inspired by AI Sweden, MITRE AI MM, Gartner, EU AI Act, and OECD frameworks
// Unique synthesis for the Swedish/European organizational context

export type AIDimension =
  | 'strategiLedarskap'
  | 'anvandsfall'
  | 'dataInfrastruktur'
  | 'kompetensKultur'
  | 'styrningEtik'
  | 'teknikArkitektur'
  | 'organisationProcesser'
  | 'ekosystemInnovation';

export interface AIQuestion {
  id: number;
  dimension: AIDimension;
  sv: string;
  en: string;
}

export interface AIDimensionInfo {
  id: AIDimension;
  sv: {
    name: string;
    description: string;
  };
  en: {
    name: string;
    description: string;
  };
  questionIds: number[];
}

export const aiDimensions: AIDimensionInfo[] = [
  {
    id: 'strategiLedarskap',
    sv: {
      name: 'Strategi & Ledarskap',
      description: 'AI-vision, ledningsförankring och strategisk färdplan',
    },
    en: {
      name: 'Strategy & Leadership',
      description: 'AI vision, executive sponsorship and strategic roadmap',
    },
    questionIds: [1, 2, 3, 4],
  },
  {
    id: 'anvandsfall',
    sv: {
      name: 'Användningsfall & Värde',
      description: 'Identifiering, prioritering och realisering av AI-värde',
    },
    en: {
      name: 'Use Cases & Value',
      description: 'Identifying, prioritizing and realizing AI value',
    },
    questionIds: [5, 6, 7, 8],
  },
  {
    id: 'dataInfrastruktur',
    sv: {
      name: 'Data & Infrastruktur',
      description: 'Datakvalitet, tillgänglighet och teknisk kapacitet',
    },
    en: {
      name: 'Data & Infrastructure',
      description: 'Data quality, availability and technical capacity',
    },
    questionIds: [9, 10, 11, 12],
  },
  {
    id: 'kompetensKultur',
    sv: {
      name: 'Kompetens & Kultur',
      description: 'AI-kompetens, lärande och organisationskultur',
    },
    en: {
      name: 'Competence & Culture',
      description: 'AI competence, learning and organizational culture',
    },
    questionIds: [13, 14, 15, 16],
  },
  {
    id: 'styrningEtik',
    sv: {
      name: 'Styrning & Etik',
      description: 'Ansvarsfull AI, EU AI Act-beredskap och riskhantering',
    },
    en: {
      name: 'Governance & Ethics',
      description: 'Responsible AI, EU AI Act readiness and risk management',
    },
    questionIds: [17, 18, 19, 20],
  },
  {
    id: 'teknikArkitektur',
    sv: {
      name: 'Teknik & Arkitektur',
      description: 'AI-plattformar, MLOps och systemintegration',
    },
    en: {
      name: 'Technology & Architecture',
      description: 'AI platforms, MLOps and system integration',
    },
    questionIds: [21, 22, 23, 24],
  },
  {
    id: 'organisationProcesser',
    sv: {
      name: 'Organisation & Processer',
      description: 'Roller, tvärfunktionellt samarbete och förändringsledning',
    },
    en: {
      name: 'Organization & Processes',
      description: 'Roles, cross-functional collaboration and change management',
    },
    questionIds: [25, 26, 27, 28],
  },
  {
    id: 'ekosystemInnovation',
    sv: {
      name: 'Ekosystem & Innovation',
      description: 'Partnerskap, extern kompetens och innovationsförmåga',
    },
    en: {
      name: 'Ecosystem & Innovation',
      description: 'Partnerships, external expertise and innovation capability',
    },
    questionIds: [29, 30, 31, 32],
  },
];

export const aiQuestions: AIQuestion[] = [
  // STRATEGI & LEDARSKAP (1-4)
  {
    id: 1,
    dimension: 'strategiLedarskap',
    sv: 'Vår organisation har en tydlig AI-strategi som är kopplad till våra övergripande verksamhetsmål',
    en: 'Our organization has a clear AI strategy linked to our overall business goals',
  },
  {
    id: 2,
    dimension: 'strategiLedarskap',
    sv: 'Vår högsta ledning sponsrar och driver aktivt AI-initiativ',
    en: 'Our senior leadership actively sponsors and drives AI initiatives',
  },
  {
    id: 3,
    dimension: 'strategiLedarskap',
    sv: 'Vi har en definierad AI-färdplan med tydliga milstolpar och mätbara mål',
    en: 'We have a defined AI roadmap with clear milestones and measurable goals',
  },
  {
    id: 4,
    dimension: 'strategiLedarskap',
    sv: 'AI-investeringar utvärderas och prioriteras utifrån förväntad verksamhetsnytta',
    en: 'AI investments are evaluated and prioritized based on expected business value',
  },

  // ANVÄNDNINGSFALL & VÄRDE (5-8)
  {
    id: 5,
    dimension: 'anvandsfall',
    sv: 'Vi identifierar systematiskt potentiella AI-användningsfall i vår verksamhet',
    en: 'We systematically identify potential AI use cases in our organization',
  },
  {
    id: 6,
    dimension: 'anvandsfall',
    sv: 'Vi prioriterar AI-användningsfall baserat på affärsnytta, genomförbarhet och risk',
    en: 'We prioritize AI use cases based on business value, feasibility and risk',
  },
  {
    id: 7,
    dimension: 'anvandsfall',
    sv: 'Vi har konkreta exempel på hur AI skapar mätbart värde i vår organisation',
    en: 'We have concrete examples of how AI creates measurable value in our organization',
  },
  {
    id: 8,
    dimension: 'anvandsfall',
    sv: 'Vi har en tydlig process för att gå från AI-pilotprojekt till skalade lösningar i produktion',
    en: 'We have a clear process for moving from AI pilots to scaled production solutions',
  },

  // DATA & INFRASTRUKTUR (9-12)
  {
    id: 9,
    dimension: 'dataInfrastruktur',
    sv: 'Vår datakvalitet är tillräcklig för att bygga tillförlitliga AI-tillämpningar',
    en: 'Our data quality is sufficient for building reliable AI applications',
  },
  {
    id: 10,
    dimension: 'dataInfrastruktur',
    sv: 'Vi har en datastrategi som stödjer våra AI-initiativ och säkerställer datatillgänglighet',
    en: 'We have a data strategy that supports our AI initiatives and ensures data availability',
  },
  {
    id: 11,
    dimension: 'dataInfrastruktur',
    sv: 'Vår tekniska infrastruktur (beräkningskapacitet, lagring, molntjänster) möter behoven för AI-arbetsbelastningar',
    en: 'Our technical infrastructure (compute, storage, cloud services) meets the needs of AI workloads',
  },
  {
    id: 12,
    dimension: 'dataInfrastruktur',
    sv: 'Vår data är väldokumenterad, katalogiserad och tillgänglig för AI-utveckling',
    en: 'Our data is well-documented, catalogued and accessible for AI development',
  },

  // KOMPETENS & KULTUR (13-16)
  {
    id: 13,
    dimension: 'kompetensKultur',
    sv: 'Vår organisation har tillräcklig AI-kompetens eller en konkret plan för att bygga den',
    en: 'Our organization has sufficient AI competence or a concrete plan to build it',
  },
  {
    id: 14,
    dimension: 'kompetensKultur',
    sv: 'Vi har en kultur som uppmuntrar experimentering och lärande kring AI',
    en: 'We have a culture that encourages experimentation and learning around AI',
  },
  {
    id: 15,
    dimension: 'kompetensKultur',
    sv: 'AI-kunskapen sträcker sig bortom teknikavdelningen och når verksamhetens alla delar',
    en: 'AI literacy extends beyond the technology department and reaches all parts of the organization',
  },
  {
    id: 16,
    dimension: 'kompetensKultur',
    sv: 'Vi erbjuder kontinuerlig utbildning och kompetensutveckling inom AI för medarbetare',
    en: 'We offer continuous training and competence development in AI for employees',
  },

  // STYRNING & ETIK (17-20)
  {
    id: 17,
    dimension: 'styrningEtik',
    sv: 'Vi har tydliga riktlinjer och policyer för ansvarsfull och etisk AI-användning',
    en: 'We have clear guidelines and policies for responsible and ethical AI use',
  },
  {
    id: 18,
    dimension: 'styrningEtik',
    sv: 'Vi förstår EU:s AI-förordnings (AI Act) implikationer för vår verksamhet och har påbörjat anpassningen',
    en: 'We understand the EU AI Act implications for our organization and have started adapting',
  },
  {
    id: 19,
    dimension: 'styrningEtik',
    sv: 'Vi har riskhanteringsprocesser anpassade för AI-tillämpningar, inklusive bias och integritet',
    en: 'We have risk management processes adapted for AI applications, including bias and privacy',
  },
  {
    id: 20,
    dimension: 'styrningEtik',
    sv: 'Vi ställer krav på transparens och förklarbarhet i våra AI-system',
    en: 'We require transparency and explainability in our AI systems',
  },

  // TEKNIK & ARKITEKTUR (21-24)
  {
    id: 21,
    dimension: 'teknikArkitektur',
    sv: 'Vår tekniska plattform stödjer AI-utveckling, träning och driftsättning effektivt',
    en: 'Our technical platform efficiently supports AI development, training and deployment',
  },
  {
    id: 22,
    dimension: 'teknikArkitektur',
    sv: 'Vi har MLOps-praxis för att hantera livscykeln för AI-modeller (versionshantering, övervakning, uppdatering)',
    en: 'We have MLOps practices for managing the AI model lifecycle (versioning, monitoring, updating)',
  },
  {
    id: 23,
    dimension: 'teknikArkitektur',
    sv: 'Våra AI-lösningar är integrerade i det befintliga IT-landskapet på ett hållbart sätt',
    en: 'Our AI solutions are integrated into the existing IT landscape in a sustainable way',
  },
  {
    id: 24,
    dimension: 'teknikArkitektur',
    sv: 'Säkerhet och integritetsskydd är inbyggda i våra AI-system från start (security & privacy by design)',
    en: 'Security and privacy protection are built into our AI systems from the start (security & privacy by design)',
  },

  // ORGANISATION & PROCESSER (25-28)
  {
    id: 25,
    dimension: 'organisationProcesser',
    sv: 'Det finns tydliga roller och ansvarsområden för AI-initiativ i vår organisation',
    en: 'There are clear roles and responsibilities for AI initiatives in our organization',
  },
  {
    id: 26,
    dimension: 'organisationProcesser',
    sv: 'Vi arbetar tvärfunktionellt (affär, teknik, juridik) i våra AI-projekt',
    en: 'We work cross-functionally (business, technology, legal) in our AI projects',
  },
  {
    id: 27,
    dimension: 'organisationProcesser',
    sv: 'Vi har en medveten förändringsledningsansats för AI-adoption i verksamheten',
    en: 'We have a deliberate change management approach for AI adoption in the organization',
  },
  {
    id: 28,
    dimension: 'organisationProcesser',
    sv: 'Våra verksamhetsprocesser har anpassats för att dra nytta av AI-stöd',
    en: 'Our business processes have been adapted to leverage AI support',
  },

  // EKOSYSTEM & INNOVATION (29-32)
  {
    id: 29,
    dimension: 'ekosystemInnovation',
    sv: 'Vi engagerar oss aktivt i AI-ekosystemet (partners, akademi, branschsamarbeten)',
    en: 'We actively engage in the AI ecosystem (partners, academia, industry collaborations)',
  },
  {
    id: 30,
    dimension: 'ekosystemInnovation',
    sv: 'Vi har ett systematiskt tillvägagångssätt för att utvärdera nya AI-teknologier och leverantörer',
    en: 'We have a systematic approach for evaluating new AI technologies and vendors',
  },
  {
    id: 31,
    dimension: 'ekosystemInnovation',
    sv: 'Vi samarbetar med extern AI-expertis när vår interna kapacitet inte räcker till',
    en: 'We collaborate with external AI expertise when our internal capacity is insufficient',
  },
  {
    id: 32,
    dimension: 'ekosystemInnovation',
    sv: 'Vi har en innovationskultur som ser AI som en möjliggörare för nya tjänster och affärsmodeller',
    en: 'We have an innovation culture that sees AI as an enabler for new services and business models',
  },
];

// AI Maturity Levels
export interface AIMaturityLevel {
  level: number;
  sv: {
    name: string;
    description: string;
    characteristics: string;
    typicalNeeds: string;
  };
  en: {
    name: string;
    description: string;
    characteristics: string;
    typicalNeeds: string;
  };
  scoreRange: [number, number];
}

export const aiMaturityLevels: AIMaturityLevel[] = [
  {
    level: 1,
    scoreRange: [1.0, 1.8],
    sv: {
      name: 'Utforskande',
      description: 'Organisationen är medveten om AI:s potential men har inte påbörjat något systematiskt arbete. AI diskuteras sporadiskt och ofta i abstrakta termer. Det saknas en gemensam förståelse för vad AI konkret kan bidra med i verksamheten.',
      characteristics: 'AI nämns ibland i ledningsgruppen men saknar strategisk förankring. Det finns enskilda medarbetare som experimenterar på eget initiativ, men inget koordinerat arbete. Datahantering och infrastruktur är inte dimensionerade för AI. Kunskapen om EU:s AI-förordning och dess konsekvenser är begränsad.',
      typicalNeeds: 'Grundläggande AI-utbildning för ledning och nyckelpersoner. Omvärldsbevakning och inspiration kring hur AI används i branschen. Kartläggning av datamognad och teknisk beredskap. Inledande workshop för att identifiera potentiella AI-användningsfall.',
    },
    en: {
      name: 'Exploring',
      description: 'The organization is aware of AI\'s potential but has not started any systematic work. AI is discussed sporadically and often in abstract terms. There is no shared understanding of what AI can concretely contribute to the business.',
      characteristics: 'AI is occasionally mentioned in the leadership team but lacks strategic anchoring. There are individual employees experimenting on their own initiative, but no coordinated effort. Data management and infrastructure are not dimensioned for AI. Knowledge of the EU AI Act and its implications is limited.',
      typicalNeeds: 'Basic AI education for leadership and key personnel. Environmental scanning and inspiration on how AI is used in the industry. Assessment of data maturity and technical readiness. Initial workshop to identify potential AI use cases.',
    },
  },
  {
    level: 2,
    scoreRange: [1.9, 2.6],
    sv: {
      name: 'Experimenterande',
      description: 'Organisationen har påbörjat enstaka AI-experiment och pilotprojekt. Det finns en växande medvetenhet men arbetet är fortfarande fragmenterat och drivs ofta av teknikintresse snarare än verksamhetsnytta. Piloterna saknar tydlig koppling till affärsstrategi.',
      characteristics: 'Några AI-piloter har genomförts eller pågår, men de är isolerade initiativ. Det finns engagerade individer och team men inget organisationsövergripande mandat. Datakvalitet och tillgänglighet identifieras som utmaningar. Man börjar diskutera behov av AI-policyer och riktlinjer men har inte formaliserat något.',
      typicalNeeds: 'Strukturerad bedömning av pågående piloters potential att skalas. Stöd att formulera en initial AI-strategi kopplad till verksamhetsmål. Kartläggning av datamognad och identifiering av data-gaps. Utbildning om ansvarsfull AI och regulatoriska krav (EU AI Act).',
    },
    en: {
      name: 'Experimenting',
      description: 'The organization has started individual AI experiments and pilot projects. There is growing awareness but the work is still fragmented and often driven by technical interest rather than business value. Pilots lack clear connection to business strategy.',
      characteristics: 'Some AI pilots have been conducted or are ongoing, but they are isolated initiatives. There are engaged individuals and teams but no organization-wide mandate. Data quality and availability are identified as challenges. There is beginning discussion of the need for AI policies and guidelines but nothing has been formalized.',
      typicalNeeds: 'Structured assessment of ongoing pilots\' potential to scale. Support in formulating an initial AI strategy linked to business goals. Data maturity mapping and identification of data gaps. Education on responsible AI and regulatory requirements (EU AI Act).',
    },
  },
  {
    level: 3,
    scoreRange: [2.7, 3.4],
    sv: {
      name: 'Formaliserande',
      description: 'Organisationen börjar formalisera sitt AI-arbete. En AI-strategi tar form, roller och ansvar definieras, och det finns en växande förståelse för att AI kräver systematisk styrning. Fokus skiftar från enskilda experiment till ett mer koordinerat angreppssätt.',
      characteristics: 'En AI-strategi eller handlingsplan är under framtagning eller nyligen etablerad. Tväfunktionella team har börjat bildas runt AI-initiativ. Datastyrning och datakvalitetsarbete prioriteras alltmer. Grundläggande riktlinjer för ansvarsfull AI finns på plats. Man har börjat utvärdera och välja AI-plattformar och verktyg. EU AI Act-anpassning har inletts.',
      typicalNeeds: 'Stöd att förfina och förankra AI-strategin i hela organisationen. Etablering av en AI-styrmodell (governance) med tydliga mandat. Utveckling av ett ramverk för att utvärdera och prioritera AI-användningsfall. Investering i dataplattformar och infrastruktur för AI. Program för att bygga bredare AI-kompetens i organisationen.',
    },
    en: {
      name: 'Formalizing',
      description: 'The organization is beginning to formalize its AI work. An AI strategy is taking shape, roles and responsibilities are being defined, and there is a growing understanding that AI requires systematic governance. Focus is shifting from individual experiments to a more coordinated approach.',
      characteristics: 'An AI strategy or action plan is being developed or recently established. Cross-functional teams have started forming around AI initiatives. Data governance and data quality work are increasingly prioritized. Basic guidelines for responsible AI are in place. Evaluation and selection of AI platforms and tools has begun. EU AI Act adaptation has been initiated.',
      typicalNeeds: 'Support to refine and anchor the AI strategy across the organization. Establishment of an AI governance model with clear mandates. Development of a framework for evaluating and prioritizing AI use cases. Investment in data platforms and infrastructure for AI. Programs to build broader AI competence across the organization.',
    },
  },
  {
    level: 4,
    scoreRange: [3.5, 4.2],
    sv: {
      name: 'Skalande',
      description: 'AI är inbäddad i verksamhetens processer och styrmodeller. Organisationen har gått bortom piloter och skalar AI-lösningar i produktion. Det finns etablerade strukturer för styrning, kompetens och teknisk kapacitet. AI-arbetet drivs av verksamhetsnytta med tydlig mätbarhet.',
      characteristics: 'Flera AI-lösningar är i produktion och levererar mätbar affärsnytta. Det finns ett AI-kompetenscenter eller motsvarande samordningsfunktion. MLOps-praxis är etablerad med modellövervakning och kontinuerlig förbättring. Dataplattformar är mogna och stödjer AI-utveckling i skala. EU AI Act-compliance är integrerad i utvecklingsprocesserna. Ledningen följer systematiskt upp AI-initiativens resultat och ROI.',
      typicalNeeds: 'Optimering av AI-portföljstyrning och resursallokering. Avancerad MLOps och automatisering av modellhantering. Utveckling av interna center of excellence-funktioner. Strategisk leverantörshantering och partnerskap. Erfarenhetsdelning och benchmarking med branschledare. Löpande kompetenshöjning och specialisering.',
    },
    en: {
      name: 'Scaling',
      description: 'AI is embedded in the organization\'s processes and governance models. The organization has moved beyond pilots and is scaling AI solutions in production. There are established structures for governance, competence and technical capacity. AI work is driven by business value with clear measurability.',
      characteristics: 'Multiple AI solutions are in production and delivering measurable business value. There is an AI Center of Excellence or equivalent coordinating function. MLOps practices are established with model monitoring and continuous improvement. Data platforms are mature and support AI development at scale. EU AI Act compliance is integrated into development processes. Leadership systematically follows up on AI initiatives\' results and ROI.',
      typicalNeeds: 'Optimization of AI portfolio management and resource allocation. Advanced MLOps and automation of model management. Development of internal center of excellence functions. Strategic vendor management and partnerships. Experience sharing and benchmarking with industry leaders. Continuous competence building and specialization.',
    },
  },
  {
    level: 5,
    scoreRange: [4.3, 5.0],
    sv: {
      name: 'Transformerande',
      description: 'AI är en central del av organisationens affärsmodell och kultur. Organisationen använder AI inte bara för effektivisering utan för att skapa helt nya värdepropositioner och konkurrensfördelar. AI-mognad genomsyrar alla nivåer och funktioner.',
      characteristics: 'AI driver affärsinnovation och nya intäktsströmmar. Organisationen är en referens i branschen för AI-användning. Det finns en stark kultur av datadriven innovation och kontinuerligt lärande. AI-governance är mogen, proaktiv och integrerad i företagsstyrningen. Organisationen bidrar aktivt till AI-ekosystemet genom forskning, öppen innovation och kunskapsdelning. Etisk AI och compliance ses som en konkurrensfördel, inte bara en skyldighet.',
      typicalNeeds: 'Strategisk rådgivning kring nästa generations AI-möjligheter. Utforskning av generativ AI och autonoma system. Thought leadership och positionering i branschens AI-agenda. Kontinuerlig utvärdering av emerging technologies. Stöd vid komplexa transformationsutmaningar. Utveckling av interna förmågor som minskar externt beroende.',
    },
    en: {
      name: 'Transforming',
      description: 'AI is a central part of the organization\'s business model and culture. The organization uses AI not only for efficiency but to create entirely new value propositions and competitive advantages. AI maturity permeates all levels and functions.',
      characteristics: 'AI drives business innovation and new revenue streams. The organization is a reference in the industry for AI usage. There is a strong culture of data-driven innovation and continuous learning. AI governance is mature, proactive and integrated into corporate governance. The organization actively contributes to the AI ecosystem through research, open innovation and knowledge sharing. Ethical AI and compliance are seen as competitive advantages, not just obligations.',
      typicalNeeds: 'Strategic advisory on next-generation AI opportunities. Exploration of generative AI and autonomous systems. Thought leadership and positioning in the industry\'s AI agenda. Continuous evaluation of emerging technologies. Support for complex transformation challenges. Development of internal capabilities that reduce external dependency.',
    },
  },
];

// Helper functions
export function getAIDimensionById(id: AIDimension): AIDimensionInfo | undefined {
  return aiDimensions.find(d => d.id === id);
}

export function getAIQuestionsByDimension(dimension: AIDimension): AIQuestion[] {
  return aiQuestions.filter(q => q.dimension === dimension);
}

export function getAIMaturityLevel(score: number): AIMaturityLevel {
  const level = aiMaturityLevels.find(
    l => score >= l.scoreRange[0] && score <= l.scoreRange[1]
  );
  return level || aiMaturityLevels[0];
}

export function calculateAIDimensionScore(
  responses: Map<number, number>,
  dimension: AIDimension
): number {
  const dimQuestions = getAIQuestionsByDimension(dimension);
  const scores = dimQuestions
    .map(q => responses.get(q.id))
    .filter((v): v is number => v !== undefined);

  if (scores.length === 0) return 0;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

export function calculateAIOverallScore(responses: Map<number, number>): number {
  const allScores = Array.from(responses.values());
  if (allScores.length === 0) return 0;
  return allScores.reduce((a, b) => a + b, 0) / allScores.length;
}
