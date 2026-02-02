export type Dimension =
  | 'gemesamBild'
  | 'strategiskKoppling'
  | 'prioriteringBeslut'
  | 'agarskapGenomforande';

export interface Question {
  id: number;
  dimension: Dimension;
  sv: string;
  en: string;
}

export interface DimensionInfo {
  id: Dimension;
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

export const dimensions: DimensionInfo[] = [
  {
    id: 'gemesamBild',
    sv: {
      name: 'Gemensam Bild',
      description: 'Förståelse för digitaliseringens innebörd',
    },
    en: {
      name: 'Shared Understanding',
      description: 'Understanding the meaning of digitalization',
    },
    questionIds: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 'strategiskKoppling',
    sv: {
      name: 'Strategisk Koppling',
      description: 'Koppling till verksamhetsmål',
    },
    en: {
      name: 'Strategic Alignment',
      description: 'Connection to business goals',
    },
    questionIds: [7, 8, 9, 10, 11],
  },
  {
    id: 'prioriteringBeslut',
    sv: {
      name: 'Prioritering & Beslut',
      description: 'Förmåga att prioritera och besluta',
    },
    en: {
      name: 'Prioritization & Decisions',
      description: 'Ability to prioritize and make decisions',
    },
    questionIds: [12, 13, 14, 15, 16],
  },
  {
    id: 'agarskapGenomforande',
    sv: {
      name: 'Ägarskap & Genomförande',
      description: 'Ansvar, förändringsledning och helhetssyn',
    },
    en: {
      name: 'Ownership & Execution',
      description: 'Responsibility, change management and holistic view',
    },
    questionIds: [17, 18, 19, 20, 21, 22],
  },
];

export const questions: Question[] = [
  // GEMENSAM BILD – Förståelse för digitaliseringens innebörd (1-6)
  {
    id: 1,
    dimension: 'gemesamBild',
    sv: 'Vi i ledningen har en gemensam uppfattning om vad digitalisering innebär för vår verksamhet',
    en: 'We in leadership have a shared understanding of what digitalization means for our organization',
  },
  {
    id: 2,
    dimension: 'gemesamBild',
    sv: 'Vi kan förklara hur digital utveckling skiljer sig från IT-drift och systemförvaltning',
    en: 'We can explain how digital development differs from IT operations and system management',
  },
  {
    id: 3,
    dimension: 'gemesamBild',
    sv: 'Vi har diskuterat och är överens om vilka möjligheter digitalisering skapar för oss',
    en: 'We have discussed and agree on what opportunities digitalization creates for us',
  },
  {
    id: 4,
    dimension: 'gemesamBild',
    sv: 'Vi förstår hur digitalisering påverkar våra kunder/brukare, medarbetare och processer',
    en: 'We understand how digitalization affects our customers/users, employees and processes',
  },
  {
    id: 5,
    dimension: 'gemesamBild',
    sv: 'Vi har en gemensam bild av var vi befinner oss idag i vår digitala utveckling',
    en: 'We have a shared picture of where we are today in our digital development',
  },
  {
    id: 6,
    dimension: 'gemesamBild',
    sv: 'Vi är överens om vad vi menar med "digital mognad" i vår organisation',
    en: 'We agree on what we mean by "digital maturity" in our organization',
  },

  // STRATEGISK KOPPLING – Koppling till verksamhetsmål (7-11)
  {
    id: 7,
    dimension: 'strategiskKoppling',
    sv: 'Vår digitala utveckling utgår tydligt från verksamhetens mål och uppdrag',
    en: 'Our digital development clearly starts from the organization\'s goals and mission',
  },
  {
    id: 8,
    dimension: 'strategiskKoppling',
    sv: 'Vi diskuterar digitalisering som en verksamhetsfråga, inte primärt som en IT-fråga',
    en: 'We discuss digitalization as a business issue, not primarily as an IT issue',
  },
  {
    id: 9,
    dimension: 'strategiskKoppling',
    sv: 'Vi kan beskriva hur digital utveckling bidrar till våra övergripande mål',
    en: 'We can describe how digital development contributes to our overall goals',
  },
  {
    id: 10,
    dimension: 'strategiskKoppling',
    sv: 'Digital utveckling är en naturlig del av vår strategiska planering',
    en: 'Digital development is a natural part of our strategic planning',
  },
  {
    id: 11,
    dimension: 'strategiskKoppling',
    sv: 'Vi fattar beslut om digitala initiativ baserat på verksamhetsnytta, inte teknikintresse',
    en: 'We make decisions about digital initiatives based on business value, not technical interest',
  },

  // PRIORITERING & BESLUT – Förmåga att prioritera och besluta (12-16)
  {
    id: 12,
    dimension: 'prioriteringBeslut',
    sv: 'Vi har tydliga principer för hur vi prioriterar mellan digitala initiativ',
    en: 'We have clear principles for how we prioritize between digital initiatives',
  },
  {
    id: 13,
    dimension: 'prioriteringBeslut',
    sv: 'Vi fattar beslut om digitala satsningar baserat på faktaunderlag och analys',
    en: 'We make decisions about digital investments based on evidence and analysis',
  },
  {
    id: 14,
    dimension: 'prioriteringBeslut',
    sv: 'Vi kan säga nej till initiativ som inte passar vår strategi, även om de verkar lockande',
    en: 'We can say no to initiatives that don\'t fit our strategy, even if they seem attractive',
  },
  {
    id: 15,
    dimension: 'prioriteringBeslut',
    sv: 'Vi har en gemensam bild av vilka digitala initiativ som är viktigast just nu',
    en: 'We have a shared view of which digital initiatives are most important right now',
  },
  {
    id: 16,
    dimension: 'prioriteringBeslut',
    sv: 'Vi följer upp och utvärderar digitala satsningar systematiskt',
    en: 'We follow up and evaluate digital investments systematically',
  },

  // ÄGARSKAP & GENOMFÖRANDE – Ansvar, förändringsledning och helhetssyn (17-22)
  {
    id: 17,
    dimension: 'agarskapGenomforande',
    sv: 'Ledningen tar aktivt ansvar för att driva vår digitala utveckling framåt',
    en: 'Leadership actively takes responsibility for driving our digital development forward',
  },
  {
    id: 18,
    dimension: 'agarskapGenomforande',
    sv: 'Vi förstår att digitalisering är organisationsförändring och leder den som sådan',
    en: 'We understand that digitalization is organizational change and lead it as such',
  },
  {
    id: 19,
    dimension: 'agarskapGenomforande',
    sv: 'Vi förväntar oss motstånd vid förändring och har strategier för att möta det',
    en: 'We expect resistance to change and have strategies to address it',
  },
  {
    id: 20,
    dimension: 'agarskapGenomforande',
    sv: 'Vi i ledningen visar genom vårt eget agerande att vi anammar digitala arbetssätt',
    en: 'We in leadership show through our own actions that we embrace digital ways of working',
  },
  {
    id: 21,
    dimension: 'agarskapGenomforande',
    sv: 'Vi investerar i kompetens och kultur, inte bara i teknik',
    en: 'We invest in competence and culture, not just in technology',
  },
  {
    id: 22,
    dimension: 'agarskapGenomforande',
    sv: 'Vi förändrar processer och arbetssätt parallellt med teknikförändringar',
    en: 'We change processes and ways of working in parallel with technology changes',
  },
];

// Maturity levels
export interface MaturityLevel {
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

export const maturityLevels: MaturityLevel[] = [
  {
    level: 1,
    scoreRange: [1.0, 1.4],
    sv: {
      name: 'Ingen aning',
      description: 'Ledningen saknar gemensam bild av vad digitalisering innebär och hur det påverkar verksamheten.',
      characteristics: 'Ledningen saknar gemensam bild av vad digitalisering innebär och hur det påverkar verksamheten.',
      typicalNeeds: 'Grundläggande utbildning och medvetandegörande. Workshop för att skapa gemensam förståelse.',
    },
    en: {
      name: 'No awareness',
      description: 'Leadership lacks a shared understanding of what digitalization means and how it affects the business.',
      characteristics: 'Leadership lacks a shared understanding of what digitalization means and how it affects the business.',
      typicalNeeds: 'Basic education and awareness raising. Workshop to create shared understanding.',
    },
  },
  {
    level: 2,
    scoreRange: [1.5, 2.4],
    sv: {
      name: 'Känner till det',
      description: 'Ledningen förstår grunderna och ser potentialen, men saknar tydliga prioriteringar och riktning.',
      characteristics: 'Ledningen förstår grunderna och ser potentialen, men saknar tydliga prioriteringar och riktning.',
      typicalNeeds: 'Nulägesanalys och omvärldsbevakning. Stöd att formulera syfte och värde.',
    },
    en: {
      name: 'Aware',
      description: 'Leadership understands the basics and sees the potential, but lacks clear priorities and direction.',
      characteristics: 'Leadership understands the basics and sees the potential, but lacks clear priorities and direction.',
      typicalNeeds: 'Current state analysis and environmental scanning. Support to formulate purpose and value.',
    },
  },
  {
    level: 3,
    scoreRange: [2.5, 3.4],
    sv: {
      name: 'Kunnig',
      description: 'Ledningen har gemensam förståelse för värdet, kan diskutera digitalisering strategiskt och börjar fatta mer datadrivna beslut.',
      characteristics: 'Ledningen har gemensam förståelse för värdet, kan diskutera digitalisering strategiskt och börjar fatta mer datadrivna beslut.',
      typicalNeeds: 'Strukturerat strategiarbete. Stöd att identifiera hinder, möjligheter och prioritera.',
    },
    en: {
      name: 'Knowledgeable',
      description: 'Leadership has a shared understanding of the value, can discuss digitalization strategically and is starting to make more data-driven decisions.',
      characteristics: 'Leadership has a shared understanding of the value, can discuss digitalization strategically and is starting to make more data-driven decisions.',
      typicalNeeds: 'Structured strategy work. Support to identify obstacles, opportunities and prioritize.',
    },
  },
  {
    level: 4,
    scoreRange: [3.5, 4.4],
    sv: {
      name: 'Planerat',
      description: 'Ledningen har definierat ambition, fokusområden och prioriteringar. Förstår att genomförande kräver förändringsledning och helhetssyn på människa, teknik och process.',
      characteristics: 'Ledningen har definierat ambition, fokusområden och prioriteringar. Förstår att genomförande kräver förändringsledning och helhetssyn på människa, teknik och process.',
      typicalNeeds: 'Framtagning av färdplan och utvecklingscharters. Stöd i förändringsledning och att gå från plan till handling.',
    },
    en: {
      name: 'Planned',
      description: 'Leadership has defined ambition, focus areas and priorities. Understands that implementation requires change management and a holistic view of people, technology and process.',
      characteristics: 'Leadership has defined ambition, focus areas and priorities. Understands that implementation requires change management and a holistic view of people, technology and process.',
      typicalNeeds: 'Development of roadmap and development charters. Support in change management and moving from plan to action.',
    },
  },
  {
    level: 5,
    scoreRange: [4.5, 5.0],
    sv: {
      name: 'Igång',
      description: 'Ledningen driver aktivt förändringen, agerar som förebilder, hanterar motstånd konstruktivt och balanserar insatser mellan människa, teknik och process.',
      characteristics: 'Ledningen driver aktivt förändringen, agerar som förebilder, hanterar motstånd konstruktivt och balanserar insatser mellan människa, teknik och process.',
      typicalNeeds: 'Löpande rådgivning, effektuppföljning och kvalitetssäkring. Stöd vid komplexa förändringsutmaningar.',
    },
    en: {
      name: 'In progress',
      description: 'Leadership actively drives the change, acts as role models, handles resistance constructively and balances efforts between people, technology and process.',
      characteristics: 'Leadership actively drives the change, acts as role models, handles resistance constructively and balances efforts between people, technology and process.',
      typicalNeeds: 'Ongoing advisory, impact monitoring and quality assurance. Support for complex change challenges.',
    },
  },
];

// Helper functions
export function getDimensionById(id: Dimension): DimensionInfo | undefined {
  return dimensions.find(d => d.id === id);
}

export function getQuestionsByDimension(dimension: Dimension): Question[] {
  return questions.filter(q => q.dimension === dimension);
}

export function getMaturityLevel(score: number): MaturityLevel {
  const level = maturityLevels.find(
    l => score >= l.scoreRange[0] && score <= l.scoreRange[1]
  );
  return level || maturityLevels[0];
}

export function calculateDimensionScore(
  responses: Map<number, number>,
  dimension: Dimension
): number {
  const dimQuestions = getQuestionsByDimension(dimension);
  const scores = dimQuestions
    .map(q => responses.get(q.id))
    .filter((v): v is number => v !== undefined);

  if (scores.length === 0) return 0;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

export function calculateOverallScore(responses: Map<number, number>): number {
  const allScores = Array.from(responses.values());
  if (allScores.length === 0) return 0;
  return allScores.reduce((a, b) => a + b, 0) / allScores.length;
}
