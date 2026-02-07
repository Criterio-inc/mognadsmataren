export type Dimension =
  | 'strategiLedarskap'
  | 'anvandsfall'
  | 'dataInfrastruktur'
  | 'kompetensKultur'
  | 'styrningEtik'
  | 'teknikArkitektur'
  | 'organisationProcesser'
  | 'ekosystemInnovation';

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

export const dimensions: DimensionInfo[] = [
  {
    id: 'strategiLedarskap',
    sv: {
      name: 'Strategi & Ledarskap',
      description: 'Hur väl AI-strategi och ledarskapsengagemang stödjer organisationens AI-resa',
    },
    en: {
      name: 'Strategy & Leadership',
      description: 'How well AI strategy and leadership commitment support the organization\'s AI journey',
    },
    questionIds: [1, 2, 3, 4],
  },
  {
    id: 'anvandsfall',
    sv: {
      name: 'Användningsfall & Värde',
      description: 'Förmåga att identifiera, prioritera och realisera värde från AI-initiativ',
    },
    en: {
      name: 'Use Cases & Value',
      description: 'Ability to identify, prioritize and realize value from AI initiatives',
    },
    questionIds: [5, 6, 7, 8],
  },
  {
    id: 'dataInfrastruktur',
    sv: {
      name: 'Data & Infrastruktur',
      description: 'Datakvalitet, datastrategi och infrastrukturens förmåga att stödja AI-arbetsbelastningar',
    },
    en: {
      name: 'Data & Infrastructure',
      description: 'Data quality, data strategy and infrastructure capability to support AI workloads',
    },
    questionIds: [9, 10, 11, 12],
  },
  {
    id: 'kompetensKultur',
    sv: {
      name: 'Kompetens & Kultur',
      description: 'AI-kompetens, experimentkultur och kontinuerligt lärande inom organisationen',
    },
    en: {
      name: 'Competence & Culture',
      description: 'AI competence, experimentation culture and continuous learning within the organization',
    },
    questionIds: [13, 14, 15, 16],
  },
  {
    id: 'styrningEtik',
    sv: {
      name: 'Styrning & Etik',
      description: 'Ramverk för ansvarsfull AI, regelefterlevnad och riskhantering inklusive EU AI Act',
    },
    en: {
      name: 'Governance & Ethics',
      description: 'Framework for responsible AI, regulatory compliance and risk management including EU AI Act',
    },
    questionIds: [17, 18, 19, 20],
  },
  {
    id: 'teknikArkitektur',
    sv: {
      name: 'Teknik & Arkitektur',
      description: 'Teknisk plattform, MLOps-mognad och säkerhet för AI-utveckling och driftsättning',
    },
    en: {
      name: 'Technology & Architecture',
      description: 'Technical platform, MLOps maturity and security for AI development and deployment',
    },
    questionIds: [21, 22, 23, 24],
  },
  {
    id: 'organisationProcesser',
    sv: {
      name: 'Organisation & Processer',
      description: 'Organisatoriska strukturer, roller och processer som möjliggör AI-adoption',
    },
    en: {
      name: 'Organization & Processes',
      description: 'Organizational structures, roles and processes that enable AI adoption',
    },
    questionIds: [25, 26, 27, 28],
  },
  {
    id: 'ekosystemInnovation',
    sv: {
      name: 'Ekosystem & Innovation',
      description: 'Externt samarbete, teknologibevakning och innovationskultur kring AI',
    },
    en: {
      name: 'Ecosystem & Innovation',
      description: 'External collaboration, technology monitoring and innovation culture around AI',
    },
    questionIds: [29, 30, 31, 32],
  },
];

export const questions: Question[] = [
  // STRATEGI & LEDARSKAP (1-4)
  {
    id: 1,
    dimension: 'strategiLedarskap',
    sv: 'Vi har en dokumenterad AI-strategi som är tydligt kopplad till våra övergripande verksamhetsmål och affärsstrategi',
    en: 'We have a documented AI strategy that is clearly linked to our overall business goals and business strategy',
  },
  {
    id: 2,
    dimension: 'strategiLedarskap',
    sv: 'Vår högsta ledning sponsrar och driver AI-initiativ aktivt, inte bara godkänner dem',
    en: 'Our senior leadership actively sponsors and drives AI initiatives, not just approves them',
  },
  {
    id: 3,
    dimension: 'strategiLedarskap',
    sv: 'Vi har en definierad AI-färdplan med tydliga milstolpar, tidsramar och ansvariga',
    en: 'We have a defined AI roadmap with clear milestones, timelines and accountable owners',
  },
  {
    id: 4,
    dimension: 'strategiLedarskap',
    sv: 'Våra AI-investeringar utvärderas systematiskt utifrån konkret affärsvärde och avkastning, inte bara teknisk potential',
    en: 'Our AI investments are systematically evaluated based on concrete business value and return, not just technical potential',
  },

  // ANVÄNDNINGSFALL & VÄRDE (5-8)
  {
    id: 5,
    dimension: 'anvandsfall',
    sv: 'Vi har en systematisk process för att identifiera och kartlägga AI-användningsfall i hela verksamheten',
    en: 'We have a systematic process for identifying and mapping AI use cases across the entire organization',
  },
  {
    id: 6,
    dimension: 'anvandsfall',
    sv: 'Vi prioriterar AI-användningsfall baserat på en balanserad bedömning av affärsvärde, genomförbarhet och risk',
    en: 'We prioritize AI use cases based on a balanced assessment of business value, feasibility and risk',
  },
  {
    id: 7,
    dimension: 'anvandsfall',
    sv: 'Vi har konkreta exempel där AI redan skapar mätbart värde i vår verksamhet',
    en: 'We have concrete examples where AI is already creating measurable value in our operations',
  },
  {
    id: 8,
    dimension: 'anvandsfall',
    sv: 'Vi har en tydlig och beprövad process för att ta AI-lösningar från pilotfas till produktion och skalning',
    en: 'We have a clear and proven process for taking AI solutions from pilot phase to production and scaling',
  },

  // DATA & INFRASTRUKTUR (9-12)
  {
    id: 9,
    dimension: 'dataInfrastruktur',
    sv: 'Vår datakvalitet är tillräckligt hög för att träna och driftsätta pålitliga AI-modeller',
    en: 'Our data quality is sufficiently high to train and deploy reliable AI models',
  },
  {
    id: 10,
    dimension: 'dataInfrastruktur',
    sv: 'Vi har en datastrategi som explicit stödjer AI-utveckling, inklusive datainsamling, lagring och tillgänglighet',
    en: 'We have a data strategy that explicitly supports AI development, including data collection, storage and accessibility',
  },
  {
    id: 11,
    dimension: 'dataInfrastruktur',
    sv: 'Vår infrastruktur (beräkningskraft, molntjänster, GPU-resurser) möter kraven från våra AI-arbetsbelastningar',
    en: 'Our infrastructure (compute power, cloud services, GPU resources) meets the demands of our AI workloads',
  },
  {
    id: 12,
    dimension: 'dataInfrastruktur',
    sv: 'Vår data är väldokumenterad med tydliga metadata, datakatalog och linjespårning som underlättar AI-utveckling',
    en: 'Our data is well-documented with clear metadata, data catalog and lineage tracking that facilitates AI development',
  },

  // KOMPETENS & KULTUR (13-16)
  {
    id: 13,
    dimension: 'kompetensKultur',
    sv: 'Vi har tillräcklig AI-kompetens internt eller en konkret plan för att bygga upp den kompetens som behövs',
    en: 'We have sufficient AI competence internally or a concrete plan to build the competence that is needed',
  },
  {
    id: 14,
    dimension: 'kompetensKultur',
    sv: 'Vår organisationskultur uppmuntrar till AI-experiment och accepterar att alla försök inte lyckas',
    en: 'Our organizational culture encourages AI experimentation and accepts that not all attempts will succeed',
  },
  {
    id: 15,
    dimension: 'kompetensKultur',
    sv: 'AI-förståelse och AI-litteracitet sträcker sig bortom teknikavdelningen till verksamheten i stort',
    en: 'AI understanding and AI literacy extends beyond the technology department to the wider organization',
  },
  {
    id: 16,
    dimension: 'kompetensKultur',
    sv: 'Vi investerar kontinuerligt i AI-utbildning och kompetensutveckling för medarbetare på alla nivåer',
    en: 'We continuously invest in AI training and competence development for employees at all levels',
  },

  // STYRNING & ETIK (17-20)
  {
    id: 17,
    dimension: 'styrningEtik',
    sv: 'Vi har tydliga policyer och riktlinjer för ansvarsfull AI-användning som efterlevs i praktiken',
    en: 'We have clear policies and guidelines for responsible AI use that are followed in practice',
  },
  {
    id: 18,
    dimension: 'styrningEtik',
    sv: 'Vi förstår EU AI Act och dess implikationer för vår verksamhet och har påbörjat anpassningen',
    en: 'We understand the EU AI Act and its implications for our operations and have started adapting to it',
  },
  {
    id: 19,
    dimension: 'styrningEtik',
    sv: 'Vi har etablerade processer för att hantera AI-risker som partiskhet, integritetsintrång och felaktiga resultat',
    en: 'We have established processes for managing AI risks such as bias, privacy violations and erroneous outputs',
  },
  {
    id: 20,
    dimension: 'styrningEtik',
    sv: 'Vi ställer krav på transparens och förklarbarhet i de AI-system vi utvecklar och använder',
    en: 'We require transparency and explainability in the AI systems we develop and use',
  },

  // TEKNIK & ARKITEKTUR (21-24)
  {
    id: 21,
    dimension: 'teknikArkitektur',
    sv: 'Vår tekniska plattform stödjer hela AI-livscykeln: utveckling, träning, testning och driftsättning av modeller',
    en: 'Our technical platform supports the entire AI lifecycle: development, training, testing and deployment of models',
  },
  {
    id: 22,
    dimension: 'teknikArkitektur',
    sv: 'Vi har etablerade MLOps-praktiker för att hantera modellers livscykel, versionering och övervakning i produktion',
    en: 'We have established MLOps practices for managing model lifecycle, versioning and monitoring in production',
  },
  {
    id: 23,
    dimension: 'teknikArkitektur',
    sv: 'AI-lösningar är integrerade i vårt befintliga IT-landskap med tydliga gränssnitt och dataflöden',
    en: 'AI solutions are integrated into our existing IT landscape with clear interfaces and data flows',
  },
  {
    id: 24,
    dimension: 'teknikArkitektur',
    sv: 'Vi tillämpar säkerhet och integritetsskydd genom hela designprocessen (security and privacy by design) för våra AI-system',
    en: 'We apply security and privacy protection throughout the design process (security and privacy by design) for our AI systems',
  },

  // ORGANISATION & PROCESSER (25-28)
  {
    id: 25,
    dimension: 'organisationProcesser',
    sv: 'Vi har tydliga roller och ansvarsområden definierade för AI-arbetet i organisationen',
    en: 'We have clear roles and areas of responsibility defined for AI work in the organization',
  },
  {
    id: 26,
    dimension: 'organisationProcesser',
    sv: 'Det finns etablerat tvärfunktionellt samarbete mellan teknik, verksamhet och ledning kring AI-initiativ',
    en: 'There is established cross-functional collaboration between technology, business and leadership around AI initiatives',
  },
  {
    id: 27,
    dimension: 'organisationProcesser',
    sv: 'Vi har en strukturerad förändringsledningsprocess för att stödja AI-adoption bland medarbetare och intressenter',
    en: 'We have a structured change management process to support AI adoption among employees and stakeholders',
  },
  {
    id: 28,
    dimension: 'organisationProcesser',
    sv: 'Våra verksamhetsprocesser har anpassats för att integrera och dra nytta av AI-drivna insikter och automatisering',
    en: 'Our business processes have been adapted to integrate and benefit from AI-driven insights and automation',
  },

  // EKOSYSTEM & INNOVATION (29-32)
  {
    id: 29,
    dimension: 'ekosystemInnovation',
    sv: 'Vi deltar aktivt i AI-ekosystemet genom branschforum, partnerskap, konferenser eller forskningssamarbeten',
    en: 'We actively participate in the AI ecosystem through industry forums, partnerships, conferences or research collaborations',
  },
  {
    id: 30,
    dimension: 'ekosystemInnovation',
    sv: 'Vi utvärderar systematiskt nya AI-teknologier och bedömer deras relevans och mognad för vår verksamhet',
    en: 'We systematically evaluate new AI technologies and assess their relevance and maturity for our operations',
  },
  {
    id: 31,
    dimension: 'ekosystemInnovation',
    sv: 'Vi samarbetar med extern AI-expertis (konsulter, akademi, teknikpartners) för att komplettera vår interna förmåga',
    en: 'We collaborate with external AI expertise (consultants, academia, technology partners) to complement our internal capability',
  },
  {
    id: 32,
    dimension: 'ekosystemInnovation',
    sv: 'Vår innovationskultur ser AI som en möjliggörare för nya affärsmodeller, produkter och tjänster',
    en: 'Our innovation culture sees AI as an enabler for new business models, products and services',
  },
];

// Maturity levels
export const maturityLevels: MaturityLevel[] = [
  {
    level: 1,
    scoreRange: [1.0, 1.8],
    sv: {
      name: 'Utforskande',
      description:
        'Organisationen är medveten om AI som fenomen men har inte påbörjat något systematiskt arbete. AI diskuteras ibland men det saknas en gemensam förståelse för vad det innebär i praktiken. Ledningen har ännu inte tagit ställning till AI:s roll i verksamheten. Det finns inga dedikerade resurser, ingen strategi och inga pågående initiativ. Organisationen riskerar att hamna efter konkurrenter som redan börjat agera.',
      characteristics:
        'AI nämns ibland i ledningsgruppen men utan konkreta beslut eller åtgärder. Enskilda medarbetare kan ha experimenterat med AI-verktyg på egen hand, men det sker inte samordnat. Det finns ingen samlad bild av hur AI kan skapa värde eller vilka risker det medför. Organisationen saknar grundläggande AI-kompetens och har inte börjat förstå implikationerna av EU AI Act. Datakvalitet och infrastruktur har inte utvärderats ur ett AI-perspektiv.',
      typicalNeeds:
        'Grundläggande utbildning och medvetandehöjning om AI för ledning och nyckelpersoner. Omvärldsbevakning för att förstå hur branschen och konkurrenter använder AI. En initial kartläggning av potentiella AI-användningsfall och datamognad. Introduktion till EU AI Act och vad det innebär för organisationen. Studiebesök eller inspirationsföreläsningar från organisationer som påbörjat sin AI-resa.',
    },
    en: {
      name: 'Exploring',
      description:
        'The organization is aware of AI as a phenomenon but has not begun any systematic work. AI is discussed occasionally but there is no shared understanding of what it means in practice. Leadership has not yet taken a position on the role of AI in the business. There are no dedicated resources, no strategy and no ongoing initiatives. The organization risks falling behind competitors who have already started acting.',
      characteristics:
        'AI is mentioned sometimes in the leadership team but without concrete decisions or actions. Individual employees may have experimented with AI tools on their own, but this is not coordinated. There is no unified picture of how AI can create value or what risks it entails. The organization lacks basic AI competence and has not started understanding the implications of the EU AI Act. Data quality and infrastructure have not been evaluated from an AI perspective.',
      typicalNeeds:
        'Basic education and awareness raising about AI for leadership and key personnel. Environmental scanning to understand how the industry and competitors are using AI. An initial mapping of potential AI use cases and data maturity. Introduction to the EU AI Act and what it means for the organization. Study visits or inspirational lectures from organizations that have begun their AI journey.',
    },
  },
  {
    level: 2,
    scoreRange: [1.9, 2.6],
    sv: {
      name: 'Experimenterande',
      description:
        'Organisationen har börjat experimentera med AI genom enstaka pilotprojekt och proof-of-concepts. Dessa initiativ drivs ofta av entusiaster eller enskilda avdelningar snarare än som en samordnad insats. Det finns en växande insikt om AI:s potential men arbetet är fragmenterat och saknar strategisk styrning. Resultat från experiment är lovande men svåra att skala. Det saknas ofta en tydlig koppling mellan AI-piloternas utfall och verksamhetens övergripande mål.',
      characteristics:
        'Ett fåtal AI-piloter pågår eller har genomförts, ofta inom avgränsade områden. Dessa drivs vanligen av teknikintresserade medarbetare utan formellt mandat eller tillräckliga resurser. Datakvaliteten varierar kraftigt och det saknas en sammanhållen datastrategi. AI-kompetensen är koncentrerad till några få individer. Det finns en begynnande medvetenhet om EU AI Act men inga konkreta åtgärder har vidtagits. Framgångsrika experiment fastnar ofta i pilotfasen utan väg till produktion.',
      typicalNeeds:
        'En initial AI-strategi som kopplar experiment till verksamhetsmål och prioriterar insatser. Ledningsförankring och tydligare sponsorskap för att ge AI-initiativ legitimitet och resurser. Datakvalitetsgranskning och en plan för att bygga en datagrund som stödjer AI. Inventering av kompetensbehovet och rekryteringsplan eller utbildningssatsning. En första konsekvensanalys av EU AI Act med fokus på de mest relevanta riskklasserna. Stöd för att identifiera vilka piloter som har potential att skalas.',
    },
    en: {
      name: 'Experimenting',
      description:
        'The organization has started experimenting with AI through individual pilot projects and proof-of-concepts. These initiatives are often driven by enthusiasts or individual departments rather than as a coordinated effort. There is a growing insight into the potential of AI but the work is fragmented and lacks strategic direction. Results from experiments are promising but difficult to scale. There is often a lack of clear connection between the outcomes of AI pilots and the organization\'s overall goals.',
      characteristics:
        'A handful of AI pilots are underway or have been completed, often in limited areas. These are typically driven by technology-interested employees without formal mandate or sufficient resources. Data quality varies significantly and there is no cohesive data strategy. AI competence is concentrated in a few individuals. There is an emerging awareness of the EU AI Act but no concrete measures have been taken. Successful experiments often get stuck in the pilot phase without a path to production.',
      typicalNeeds:
        'An initial AI strategy that connects experiments to business goals and prioritizes efforts. Leadership anchoring and clearer sponsorship to give AI initiatives legitimacy and resources. Data quality review and a plan to build a data foundation that supports AI. Inventory of competence needs and recruitment plan or training investment. An initial impact analysis of the EU AI Act focusing on the most relevant risk classes. Support to identify which pilots have potential to be scaled.',
    },
  },
  {
    level: 3,
    scoreRange: [2.7, 3.4],
    sv: {
      name: 'Formaliserande',
      description:
        'Organisationen har börjat ta ett mer strukturerat grepp om AI. En AI-strategi håller på att ta form och det finns en växande förståelse på ledningsnivå för att AI kräver dedikerade resurser och styrning. Roller och ansvar börjar definieras och de första policyerna för ansvarsfull AI har formulerats. Arbetet med att förstå och anpassa sig till EU AI Act har påbörjats. Övergången från fragmenterade experiment till samordnad satsning är i full gång men ännu inte fullbordad.',
      characteristics:
        'En AI-strategi eller handlingsplan finns dokumenterad, om än inte alltid fullt förankrad i hela organisationen. Ledningen har utsett ansvariga för AI och avsatt dedikerade resurser. Datastrategi och datakvalitetsarbete har påbörjats med fokus på AI-behov. De första riktlinjerna för ansvarsfull AI och EU AI Act-efterlevnad har utarbetats. AI-kompetens byggs genom utbildningsprogram och rekrytering. Tvärfunktionellt samarbete kring AI börjar etableras men är ännu inte moget.',
      typicalNeeds:
        'Förankring av AI-strategin genom hela organisationen med tydlig kommunikation och förväntansbild. Stöd i att bygga ett robust styrningsramverk (AI governance) som balanserar innovation med ansvar. Vidareutveckling av datastrategin till en praktisk implementationsplan. Djupare EU AI Act-analys med klassificering av organisationens AI-system efter riskklasser. Formalisering av tvärfunktionella samarbetsstrukturer och beslutsprocesser. En MLOps-färdplan för att professionalisera modellhanteringen.',
    },
    en: {
      name: 'Formalizing',
      description:
        'The organization has begun to take a more structured approach to AI. An AI strategy is taking shape and there is growing understanding at the leadership level that AI requires dedicated resources and governance. Roles and responsibilities are being defined and the first policies for responsible AI have been formulated. Work to understand and adapt to the EU AI Act has begun. The transition from fragmented experiments to coordinated investment is in full swing but not yet complete.',
      characteristics:
        'An AI strategy or action plan is documented, although not always fully anchored across the entire organization. Leadership has appointed people responsible for AI and allocated dedicated resources. Data strategy and data quality work has begun with a focus on AI needs. The first guidelines for responsible AI and EU AI Act compliance have been developed. AI competence is being built through training programs and recruitment. Cross-functional collaboration around AI is beginning to be established but is not yet mature.',
      typicalNeeds:
        'Anchoring the AI strategy throughout the organization with clear communication and expectation setting. Support in building a robust governance framework (AI governance) that balances innovation with responsibility. Further development of the data strategy into a practical implementation plan. Deeper EU AI Act analysis with classification of the organization\'s AI systems by risk classes. Formalization of cross-functional collaboration structures and decision processes. An MLOps roadmap to professionalize model management.',
    },
  },
  {
    level: 4,
    scoreRange: [3.5, 4.2],
    sv: {
      name: 'Skalande',
      description:
        'AI är inbäddat i organisationens verksamhet och skalas bortom enstaka pilotprojekt. Det finns en tydlig styrningsmodell, mogna processer och dedikerade team som driver AI-utveckling. Ledningen förstår och kommunicerar AI:s strategiska värde. Organisationen har byggt kompetens på bred front och kan flytta AI-lösningar från utveckling till produktion med förutsägbarhet. EU AI Act-efterlevnad är integrerad i utvecklingsprocessen. Fokus skiftar från att bevisa AI:s värde till att optimera och skala dess påverkan.',
      characteristics:
        'AI-strategi och färdplan är väl förankrad och styr resursallokering och prioritering. Flera AI-lösningar är i produktion och levererar mätbart affärsvärde. MLOps-praktiker säkerställer modellkvalitet, versionering och övervakning. Ett AI-styrningsramverk hanterar etik, risk och EU AI Act-krav systematiskt. Tvärfunktionella team samarbetar effektivt och det finns etablerade processer för att ta initiativ från idé till produktion. Dataplattformen är robust och stödjer AI-utveckling i stor skala.',
      typicalNeeds:
        'Optimering av AI-operationer för att förbättra effektivitet, kostnad och skalbarhet. Avancerad EU AI Act-implementering inklusive kontinuerlig övervakning och riskbedömning av AI-system i produktion. Strategiskt arbete med att identifiera nästa generations AI-möjligheter och förbereda organisationen. Fördjupad kompetens inom specialistområden som MLOps, AI-säkerhet och förklarbar AI. Kulturförändring som institutionaliserar AI-tänkande i hela verksamheten, inte bara i teknikteamen. Systematisk kunskapsdelning och best practice-spridning.',
    },
    en: {
      name: 'Scaling',
      description:
        'AI is embedded in the organization\'s operations and is being scaled beyond individual pilot projects. There is a clear governance model, mature processes and dedicated teams driving AI development. Leadership understands and communicates the strategic value of AI. The organization has built broad competence and can move AI solutions from development to production with predictability. EU AI Act compliance is integrated into the development process. Focus shifts from proving AI\'s value to optimizing and scaling its impact.',
      characteristics:
        'AI strategy and roadmap are well-anchored and guide resource allocation and prioritization. Multiple AI solutions are in production and delivering measurable business value. MLOps practices ensure model quality, versioning and monitoring. An AI governance framework handles ethics, risk and EU AI Act requirements systematically. Cross-functional teams collaborate effectively and there are established processes for taking initiatives from idea to production. The data platform is robust and supports AI development at scale.',
      typicalNeeds:
        'Optimization of AI operations to improve efficiency, cost and scalability. Advanced EU AI Act implementation including continuous monitoring and risk assessment of AI systems in production. Strategic work to identify the next generation of AI opportunities and prepare the organization. Deepened expertise in specialist areas such as MLOps, AI security and explainable AI. Culture change that institutionalizes AI thinking across the entire business, not just in technology teams. Systematic knowledge sharing and best practice dissemination.',
    },
  },
  {
    level: 5,
    scoreRange: [4.3, 5.0],
    sv: {
      name: 'Transformerande',
      description:
        'AI är en central del av organisationens affärsmodell och strategiska identitet. Organisationen använder AI inte bara för att optimera befintliga processer utan för att skapa helt nya värdeerbjudanden, affärsmodeller och konkurrensfördelar. AI-mognad genomsyrar hela kulturen och alla beslutsnivåer. Organisationen är en förebild inom ansvarsfull AI och har EU AI Act-efterlevnad som en naturlig del av sin verksamhet. Förmågan att anpassa sig till nya AI-genombrott är en kärnkompetens.',
      characteristics:
        'AI driver strategiska beslut och möjliggör nya affärsmodeller och intäktskällor. Organisationen har en självförstärkande cykel av AI-innovation, datainsamling och lärande. Alla nivåer i organisationen förstår och arbetar aktivt med AI. EU AI Act-efterlevnad och ansvarsfull AI är en konkurrensfördel, inte bara ett krav. Avancerade MLOps-miljöer möjliggör snabb, säker och tillförlitlig modellhantering i stor skala. Organisationen bidrar aktivt till AI-ekosystemet och sätter branschstandarder.',
      typicalNeeds:
        'Kontinuerlig strategisk förnyelse för att behålla ledarposition i en snabbrörlig AI-marknad. Avancerad forskning och utveckling inom framväxande AI-områden som generativ AI, agenter och autonoma system. Proaktivt deltagande i utformningen av framtida AI-reglering och branschstandarder. Mentorskap och kunskapsdelning med partnerorganisationer och det bredare AI-ekosystemet. Arbete med att balansera AI-transformation med organisatorisk hållbarhet och medarbetarnas välbefinnande. Förberedelse för nästa teknologiska paradigmskifte och kontinuerlig omvärldsbevakning.',
    },
    en: {
      name: 'Transforming',
      description:
        'AI is a core part of the organization\'s business model and strategic identity. The organization uses AI not only to optimize existing processes but to create entirely new value propositions, business models and competitive advantages. AI maturity permeates the entire culture and all decision-making levels. The organization is a role model in responsible AI and has EU AI Act compliance as a natural part of its operations. The ability to adapt to new AI breakthroughs is a core competence.',
      characteristics:
        'AI drives strategic decisions and enables new business models and revenue streams. The organization has a self-reinforcing cycle of AI innovation, data collection and learning. All levels of the organization understand and actively work with AI. EU AI Act compliance and responsible AI are a competitive advantage, not just a requirement. Advanced MLOps environments enable fast, secure and reliable model management at scale. The organization actively contributes to the AI ecosystem and sets industry standards.',
      typicalNeeds:
        'Continuous strategic renewal to maintain a leadership position in a fast-moving AI market. Advanced research and development in emerging AI areas such as generative AI, agents and autonomous systems. Proactive participation in shaping future AI regulation and industry standards. Mentorship and knowledge sharing with partner organizations and the broader AI ecosystem. Work to balance AI transformation with organizational sustainability and employee well-being. Preparation for the next technological paradigm shift and continuous environmental scanning.',
    },
  },
];

// Helper functions
export function getDimensionById(id: Dimension): DimensionInfo | undefined {
  return dimensions.find((d) => d.id === id);
}

export function getQuestionsByDimension(dimension: Dimension): Question[] {
  return questions.filter((q) => q.dimension === dimension);
}

export function getMaturityLevel(score: number): MaturityLevel {
  const level = maturityLevels.find(
    (l) => score >= l.scoreRange[0] && score <= l.scoreRange[1]
  );
  return level || maturityLevels[0];
}

export function calculateDimensionScore(
  responses: Map<number, number>,
  dimension: Dimension
): number {
  const dimQuestions = getQuestionsByDimension(dimension);
  const scores = dimQuestions
    .map((q) => responses.get(q.id))
    .filter((v): v is number => v !== undefined);

  if (scores.length === 0) return 0;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

export function calculateOverallScore(responses: Map<number, number>): number {
  const allScores = Array.from(responses.values());
  if (allScores.length === 0) return 0;
  return allScores.reduce((a, b) => a + b, 0) / allScores.length;
}
