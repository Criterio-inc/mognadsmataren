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
      description: 'Ledningen saknar en gemensam bild av vad digitalisering innebär och hur det påverkar verksamheten. Digitalisering uppfattas ofta som en renodlad IT-fråga snarare än en strategisk verksamhetsfråga. Det finns begränsad förståelse för hur digital utveckling skiljer sig från traditionell IT-drift och systemförvaltning.',
      characteristics: 'Digitalisering diskuteras sällan i ledningsgruppen. När det sker är det ofta reaktivt och kopplat till enskilda teknikprojekt. Det saknas en gemensam terminologi och referensram för att diskutera digitaliseringens möjligheter och utmaningar. Beslut om digitala initiativ fattas ofta ad hoc utan tydlig koppling till verksamhetsmål.',
      typicalNeeds: 'Grundläggande utbildning och medvetandegörande kring vad digitalisering betyder för er specifika bransch och verksamhet. Workshop för att skapa gemensam förståelse och terminologi. Studiebesök eller benchmarking mot organisationer som kommit längre. Extern facilitering för att starta dialogen om digitaliseringens roll.',
    },
    en: {
      name: 'No awareness',
      description: 'Leadership lacks a shared understanding of what digitalization means and how it affects the business. Digitalization is often perceived as a pure IT issue rather than a strategic business issue. There is limited understanding of how digital development differs from traditional IT operations and system management.',
      characteristics: 'Digitalization is rarely discussed in the leadership team. When it occurs, it is often reactive and linked to individual technology projects. There is a lack of common terminology and reference framework for discussing the opportunities and challenges of digitalization. Decisions about digital initiatives are often made ad hoc without clear connection to business goals.',
      typicalNeeds: 'Basic education and awareness raising about what digitalization means for your specific industry and business. Workshop to create shared understanding and terminology. Study visits or benchmarking against organizations that have progressed further. External facilitation to start the dialogue about the role of digitalization.',
    },
  },
  {
    level: 2,
    scoreRange: [1.5, 2.4],
    sv: {
      name: 'Känner till det',
      description: 'Ledningen förstår grunderna i digitalisering och ser potentialen för verksamheten. Det finns en medvetenhet om att digitalisering är viktigt, men det saknas fortfarande tydliga prioriteringar och en gemensam riktning. Digitalisering diskuteras mer regelbundet, men dialogen är ofta fragmenterad och fokuserad på enskilda projekt snarare än helheten.',
      characteristics: 'Ledningen kan identifiera exempel på hur digitalisering påverkar branschen och kundernas förväntningar. Det finns en vilja att agera, men osäkerhet kring var man ska börja och hur initiativ ska prioriteras. Olika ledningsmedlemmar kan ha skilda uppfattningar om vad som är viktigast. Digitala initiativ drivs ofta av entusiaster snarare än som en gemensam ledningsfråga.',
      typicalNeeds: 'Nulägesanalys för att skapa en tydlig bild av var organisationen befinner sig idag. Omvärldsbevakning och trendanalys för att förstå hur branschen utvecklas. Faciliterade workshops för att formulera gemensamt syfte och värde med digital utveckling. Stöd att identifiera och prioritera de mest lovande möjligheterna.',
    },
    en: {
      name: 'Aware',
      description: 'Leadership understands the basics of digitalization and sees the potential for the business. There is awareness that digitalization is important, but there still lacks clear priorities and a shared direction. Digitalization is discussed more regularly, but the dialogue is often fragmented and focused on individual projects rather than the whole picture.',
      characteristics: 'Leadership can identify examples of how digitalization affects the industry and customer expectations. There is a willingness to act, but uncertainty about where to start and how initiatives should be prioritized. Different leadership members may have varying views on what is most important. Digital initiatives are often driven by enthusiasts rather than as a shared leadership issue.',
      typicalNeeds: 'Current state analysis to create a clear picture of where the organization is today. Environmental scanning and trend analysis to understand how the industry is evolving. Facilitated workshops to formulate shared purpose and value of digital development. Support to identify and prioritize the most promising opportunities.',
    },
  },
  {
    level: 3,
    scoreRange: [2.5, 3.4],
    sv: {
      name: 'Kunnig',
      description: 'Ledningen har nu en gemensam förståelse för digitaliseringens värde och kan diskutera det strategiskt. Man börjar fatta mer datadrivna beslut och ser digitalisering som en verksamhetsfråga, inte bara en teknikfråga. Det finns en grundläggande samsyn kring prioriteringar, men arbetet med att omsätta insikter till konkret handling är fortfarande i ett tidigt skede.',
      characteristics: 'Ledningsgruppen har etablerat ett gemensamt språk för att diskutera digital utveckling. Man kan artikulera hur digitalisering bidrar till verksamhetsmålen och förstår skillnaden mellan IT-drift och digital transformation. Beslut om digitala initiativ grundas i allt större utsträckning på faktaunderlag och analys. Det finns en begynnande förmåga att säga nej till initiativ som inte passar strategin.',
      typicalNeeds: 'Strukturerat strategiarbete för att definiera en tydlig digital ambition och färdriktning. Stöd att identifiera och analysera hinder, möjligheter och beroenden. Ramverk och kriterier för att prioritera mellan konkurrerande initiativ. Utveckling av beslutsunderlag och business cases för digitala satsningar. Coaching för att stärka ledningens förmåga att leda digital förändring.',
    },
    en: {
      name: 'Knowledgeable',
      description: 'Leadership now has a shared understanding of the value of digitalization and can discuss it strategically. They are starting to make more data-driven decisions and see digitalization as a business issue, not just a technology issue. There is a basic consensus around priorities, but the work of translating insights into concrete action is still in an early stage.',
      characteristics: 'The leadership team has established a common language for discussing digital development. They can articulate how digitalization contributes to business goals and understand the difference between IT operations and digital transformation. Decisions about digital initiatives are increasingly based on evidence and analysis. There is a developing ability to say no to initiatives that do not fit the strategy.',
      typicalNeeds: 'Structured strategy work to define a clear digital ambition and direction. Support to identify and analyze obstacles, opportunities and dependencies. Framework and criteria for prioritizing between competing initiatives. Development of decision bases and business cases for digital investments. Coaching to strengthen leadership\'s ability to lead digital change.',
    },
  },
  {
    level: 4,
    scoreRange: [3.5, 4.4],
    sv: {
      name: 'Planerat',
      description: 'Ledningen har definierat en tydlig digital ambition med konkreta fokusområden och prioriteringar. Man förstår att framgångsrikt genomförande kräver mer än teknik – det handlar om förändringsledning och en helhetssyn som inkluderar människa, teknik och process. Planer finns på plats, men den verkliga utmaningen ligger nu i att gå från strategi till handling.',
      characteristics: 'Det finns en dokumenterad digital strategi eller färdplan med tydliga milstolpar och ansvar. Ledningen har identifierat vilka förmågor som behöver utvecklas och vilka kulturella förändringar som krävs. Man har börjat avsätta resurser och etablera strukturer för att driva digital utveckling. Det finns en medvetenhet om att motstånd kommer uppstå och man börjar planera för hur det ska hanteras.',
      typicalNeeds: 'Framtagning av detaljerade färdplaner och utvecklingscharters för prioriterade initiativ. Stöd i att etablera governance-strukturer och styrmodeller för digital utveckling. Konkret hjälp med förändringsledning och kommunikation. Coachning för att stärka ledningens förmåga att hantera motstånd och driva förändring. Uppföljningsmekanismer för att säkerställa framdrift.',
    },
    en: {
      name: 'Planned',
      description: 'Leadership has defined a clear digital ambition with concrete focus areas and priorities. They understand that successful implementation requires more than technology – it\'s about change management and a holistic view that includes people, technology and process. Plans are in place, but the real challenge now lies in moving from strategy to action.',
      characteristics: 'There is a documented digital strategy or roadmap with clear milestones and responsibilities. Leadership has identified which capabilities need to be developed and which cultural changes are required. They have started to allocate resources and establish structures for driving digital development. There is awareness that resistance will arise and they are beginning to plan for how it will be handled.',
      typicalNeeds: 'Development of detailed roadmaps and development charters for prioritized initiatives. Support in establishing governance structures and management models for digital development. Concrete help with change management and communication. Coaching to strengthen leadership\'s ability to handle resistance and drive change. Follow-up mechanisms to ensure progress.',
    },
  },
  {
    level: 5,
    scoreRange: [4.5, 5.0],
    sv: {
      name: 'Igång',
      description: 'Ledningen driver nu aktivt den digitala förändringen och agerar som tydliga förebilder. Man hanterar motstånd konstruktivt och har lärt sig balansera insatser mellan människa, teknik och process. Digital utveckling är en naturlig och integrerad del av hur verksamheten styrs och utvecklas. Fokus ligger på kontinuerlig förbättring och att bygga långsiktig förändringskraft.',
      characteristics: 'Ledningen "walk the talk" och visar genom sitt eget beteende att de omfamnar digitala arbetssätt. Det finns etablerade forum och processer för att hantera digital utveckling som en del av ordinarie verksamhetsstyrning. Motstånd ses som naturligt och hanteras proaktivt genom dialog och involvering. Man mäter och följer upp effekter systematiskt och justerar kursen vid behov. Det finns en kultur av lärande och kontinuerlig förbättring.',
      typicalNeeds: 'Löpande strategisk rådgivning och sparring för ledningen. Effektuppföljning och kvalitetssäkring av pågående initiativ. Stöd vid komplexa förändringsutmaningar och eskaleringar. Hjälp att identifiera nästa horisont av möjligheter. Benchmarking och inspiration från ledande organisationer. Utveckling av interna förmågor för att minska externt beroende.',
    },
    en: {
      name: 'In progress',
      description: 'Leadership is now actively driving digital change and acting as clear role models. They handle resistance constructively and have learned to balance efforts between people, technology and process. Digital development is a natural and integrated part of how the business is managed and developed. Focus is on continuous improvement and building long-term change capacity.',
      characteristics: 'Leadership "walks the talk" and shows through their own behavior that they embrace digital ways of working. There are established forums and processes for handling digital development as part of regular business management. Resistance is seen as natural and handled proactively through dialogue and involvement. Effects are measured and followed up systematically and course is adjusted as needed. There is a culture of learning and continuous improvement.',
      typicalNeeds: 'Ongoing strategic advisory and sparring for leadership. Impact follow-up and quality assurance of ongoing initiatives. Support for complex change challenges and escalations. Help identifying the next horizon of opportunities. Benchmarking and inspiration from leading organizations. Development of internal capabilities to reduce external dependency.',
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
