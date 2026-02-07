import { dimensions, maturityLevels, type Dimension } from './questions';

interface AIInsightsInput {
  dimensionScores: Record<Dimension, number>;
  overallScore: number;
  maturityLevel: number;
  locale: 'sv' | 'en';
}

interface AIInsights {
  summary: string;
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  nextSteps: string[];
}

// Predefined content for hybrid approach (fallback + enhancement)
const predefinedContent = {
  sv: {
    strengths: {
      strategiLedarskap: [
        'Ledningen har en tydlig vision för hur AI ska bidra till verksamhetens mål',
        'Det finns ett uttalat strategiskt ägarskap för AI-initiativ på ledningsnivå',
      ],
      anvandsfall: [
        'Ni har identifierat konkreta AI-användningsfall med tydlig affärsnytta',
        'Det finns en strukturerad process för att utvärdera och prioritera AI-möjligheter',
      ],
      dataInfrastruktur: [
        'Er datainfrastruktur ger en stabil grund för AI-tillämpningar',
        'Ni har god tillgång till kvalitetsdata som kan användas för AI-modeller',
      ],
      kompetensKultur: [
        'Det finns en positiv inställning till AI och en vilja att lära i organisationen',
        'Ni investerar aktivt i AI-kompetens och kompetensutveckling',
      ],
      styrningEtik: [
        'Ni har en medvetenhet om etiska aspekter och ansvarsfull AI-användning',
        'Det finns riktlinjer eller policyer för hur AI får användas i verksamheten',
      ],
      teknikArkitektur: [
        'Er tekniska arkitektur stödjer integrering av AI-lösningar',
        'Ni har en tydlig bild av vilka AI-verktyg och plattformar som passar er verksamhet',
      ],
      organisationProcesser: [
        'AI-initiativ är integrerade i befintliga verksamhetsprocesser',
        'Det finns tydliga roller och ansvar för AI-relaterat arbete',
      ],
      ekosystemInnovation: [
        'Ni samarbetar aktivt med externa partners för att driva AI-innovation',
        'Det finns en kultur av experimenterande och lärande kring nya AI-tillämpningar',
      ],
    },
    improvements: {
      strategiLedarskap: [
        'Formulera en tydlig AI-strategi kopplad till verksamhetens övergripande mål',
        'Säkerställ att ledningen har tillräcklig AI-förståelse för att fatta informerade beslut',
      ],
      anvandsfall: [
        'Kartlägg systematiskt möjliga AI-användningsfall och deras förväntade affärsnytta',
        'Börja med avgränsade pilotprojekt som kan visa konkret värde snabbt',
      ],
      dataInfrastruktur: [
        'Inventera och förbättra datakvaliteten som underlag för AI-tillämpningar',
        'Investera i en modern datainfrastruktur som möjliggör skalbar AI-användning',
      ],
      kompetensKultur: [
        'Utveckla en plan för AI-kompetensutveckling på alla nivåer i organisationen',
        'Skapa en kultur som uppmuntrar experimenterande och lärande kring AI',
      ],
      styrningEtik: [
        'Ta fram tydliga riktlinjer för ansvarsfull AI-användning i linje med EU:s AI-förordning',
        'Inför processer för riskbedömning och konsekvensanalys av AI-system',
      ],
      teknikArkitektur: [
        'Utveckla en teknisk arkitektur som stödjer skalbar AI-integration',
        'Utvärdera och välj AI-plattformar som passar organisationens behov och mognad',
      ],
      organisationProcesser: [
        'Integrera AI-initiativ i befintliga verksamhetsprocesser och beslutsflöden',
        'Definiera tydliga roller och ansvar för AI-relaterat arbete i organisationen',
      ],
      ekosystemInnovation: [
        'Bygg partnerskap med akademi, teknikföretag och branschorganisationer inom AI',
        'Skapa strukturer för att systematiskt bevaka och utvärdera nya AI-möjligheter',
      ],
    },
  },
  en: {
    strengths: {
      strategiLedarskap: [
        'Leadership has a clear vision for how AI should contribute to business goals',
        'There is explicit strategic ownership for AI initiatives at the leadership level',
      ],
      anvandsfall: [
        'You have identified concrete AI use cases with clear business value',
        'There is a structured process for evaluating and prioritizing AI opportunities',
      ],
      dataInfrastruktur: [
        'Your data infrastructure provides a solid foundation for AI applications',
        'You have good access to quality data that can be used for AI models',
      ],
      kompetensKultur: [
        'There is a positive attitude toward AI and a willingness to learn within the organization',
        'You actively invest in AI competence and skills development',
      ],
      styrningEtik: [
        'You have an awareness of ethical aspects and responsible AI use',
        'There are guidelines or policies for how AI may be used in the organization',
      ],
      teknikArkitektur: [
        'Your technical architecture supports integration of AI solutions',
        'You have a clear picture of which AI tools and platforms suit your organization',
      ],
      organisationProcesser: [
        'AI initiatives are integrated into existing business processes',
        'There are clear roles and responsibilities for AI-related work',
      ],
      ekosystemInnovation: [
        'You actively collaborate with external partners to drive AI innovation',
        'There is a culture of experimentation and learning around new AI applications',
      ],
    },
    improvements: {
      strategiLedarskap: [
        'Formulate a clear AI strategy linked to overall business objectives',
        'Ensure leadership has sufficient AI understanding to make informed decisions',
      ],
      anvandsfall: [
        'Systematically map possible AI use cases and their expected business value',
        'Start with focused pilot projects that can demonstrate concrete value quickly',
      ],
      dataInfrastruktur: [
        'Inventory and improve data quality as a foundation for AI applications',
        'Invest in a modern data infrastructure that enables scalable AI usage',
      ],
      kompetensKultur: [
        'Develop a plan for AI skills development at all levels of the organization',
        'Create a culture that encourages experimentation and learning around AI',
      ],
      styrningEtik: [
        'Develop clear guidelines for responsible AI use in line with the EU AI Act',
        'Implement processes for risk assessment and impact analysis of AI systems',
      ],
      teknikArkitektur: [
        'Develop a technical architecture that supports scalable AI integration',
        'Evaluate and select AI platforms that match the organization\'s needs and maturity',
      ],
      organisationProcesser: [
        'Integrate AI initiatives into existing business processes and decision flows',
        'Define clear roles and responsibilities for AI-related work in the organization',
      ],
      ekosystemInnovation: [
        'Build partnerships with academia, technology companies, and industry organizations in AI',
        'Create structures for systematically monitoring and evaluating new AI opportunities',
      ],
    },
  },
};

export async function generateAIInsights(input: AIInsightsInput): Promise<AIInsights> {
  const { dimensionScores, overallScore, maturityLevel, locale } = input;

  // Sort dimensions by score
  const sortedDimensions = dimensions
    .map((d) => ({ ...d, score: dimensionScores[d.id] }))
    .sort((a, b) => b.score - a.score);

  const strongestDims = sortedDimensions.filter((d) => d.score >= 3.5);
  const weakestDims = sortedDimensions.filter((d) => d.score < 3.0);

  const currentLevel = maturityLevels.find((l) => l.level === maturityLevel)!;

  // Build context for AI
  const context = {
    overallScore: overallScore.toFixed(1),
    maturityLevel,
    maturityLevelName: currentLevel[locale].name,
    dimensionScores: dimensions.map((d) => ({
      name: d[locale].name,
      score: dimensionScores[d.id].toFixed(1),
    })),
    strongestAreas: strongestDims.map((d) => d[locale].name),
    weakestAreas: weakestDims.map((d) => d[locale].name),
  };

  // Try AI generation via OpenRouter
  try {
    const aiResponse = await callOpenRouter(context, locale);
    if (aiResponse) {
      return aiResponse;
    }
  } catch (error) {
    console.error('AI generation failed, using predefined content:', error);
  }

  // Fallback to predefined content
  return generatePredefinedInsights(input);
}

async function callOpenRouter(
  context: {
    overallScore: string;
    maturityLevel: number;
    maturityLevelName: string;
    dimensionScores: { name: string; score: string }[];
    strongestAreas: string[];
    weakestAreas: string[];
  },
  locale: 'sv' | 'en'
): Promise<AIInsights | null> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return null;
  }

  const systemPrompt = locale === 'sv'
    ? `Du är en expert på AI-strategi, AI-mognad och organisationsutveckling.
       Du har djup kunskap om EU:s AI-förordning (AI Act), AI Swedens ramverk för AI-mognad,
       och OECD:s indikatorer för AI-beredskap.
       Ge konkreta, handlingsbara råd baserat på en AI-mognadsbedömning.
       Svara alltid på svenska. Var professionell men varm i tonen.
       Fokusera på praktiska nästa steg, inte abstrakta koncept.`
    : `You are an expert in AI strategy, AI maturity and organizational development.
       You have deep knowledge of the EU AI Act, AI Sweden's framework for AI maturity,
       and OECD indicators for AI readiness.
       Provide concrete, actionable advice based on an AI maturity assessment.
       Always respond in English. Be professional yet warm in tone.
       Focus on practical next steps, not abstract concepts.`;

  const userPrompt = locale === 'sv'
    ? `Analysera följande AI-mognadsbedömning för en organisation:

       Övergripande poäng: ${context.overallScore}/5 (Nivå ${context.maturityLevel}: ${context.maturityLevelName})

       Dimensionspoäng:
       ${context.dimensionScores.map((d) => `- ${d.name}: ${d.score}/5`).join('\n')}

       Starkaste områden: ${context.strongestAreas.join(', ') || 'Inga tydligt starka'}
       Svagaste områden: ${context.weakestAreas.join(', ') || 'Inga tydligt svaga'}

       Ge en JSON-respons med följande struktur:
       {
         "summary": "2-3 meningar som sammanfattar resultatet med hänsyn till EU:s AI-förordning och branschpraxis",
         "strengths": ["3 styrkor baserat på höga poäng"],
         "improvements": ["3 förbättringsområden baserat på låga poäng"],
         "recommendations": ["3 konkreta rekommendationer anpassade efter AI-mognadsnivån"],
         "nextSteps": ["3 praktiska nästa steg för de kommande 3-6 månaderna"]
       }`
    : `Analyze the following AI maturity assessment for an organization:

       Overall score: ${context.overallScore}/5 (Level ${context.maturityLevel}: ${context.maturityLevelName})

       Dimension scores:
       ${context.dimensionScores.map((d) => `- ${d.name}: ${d.score}/5`).join('\n')}

       Strongest areas: ${context.strongestAreas.join(', ') || 'None clearly strong'}
       Weakest areas: ${context.weakestAreas.join(', ') || 'None clearly weak'}

       Provide a JSON response with the following structure:
       {
         "summary": "2-3 sentences summarizing the result with consideration for the EU AI Act and industry best practices",
         "strengths": ["3 strengths based on high scores"],
         "improvements": ["3 areas for improvement based on low scores"],
         "recommendations": ["3 concrete recommendations adapted to the AI maturity level"],
         "nextSteps": ["3 practical next steps for the coming 3-6 months"]
       }`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      'X-Title': 'AI-Mognadsmätaren',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-3.5-sonnet',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('No content in AI response');
  }

  // Parse JSON from response
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not extract JSON from AI response');
  }

  return JSON.parse(jsonMatch[0]) as AIInsights;
}

function generatePredefinedInsights(input: AIInsightsInput): AIInsights {
  const { dimensionScores, overallScore, maturityLevel, locale } = input;

  const sortedDimensions = dimensions
    .map((d) => ({ ...d, score: dimensionScores[d.id] }))
    .sort((a, b) => b.score - a.score);

  const strongestDim = sortedDimensions[0];
  const weakestDim = sortedDimensions[sortedDimensions.length - 1];

  const currentLevel = maturityLevels.find((l) => l.level === maturityLevel)!;
  const content = predefinedContent[locale];

  const summary = locale === 'sv'
    ? `Er organisation befinner sig på nivå ${maturityLevel} (${currentLevel.sv.name}) i AI-mognad med en övergripande poäng på ${overallScore.toFixed(1)}/5. Mognadsnivåerna sträcker sig från Utforskande till Ledande, och ert resultat indikerar var ni står i resan mot att bli en AI-driven organisation. ${strongestDim[locale].name} är ert starkaste område medan ${weakestDim[locale].name} har störst utvecklingspotential. Med tanke på EU:s AI-förordning är det viktigt att arbeta strukturerat med styrning och etik parallellt med teknisk utveckling.`
    : `Your organization is at level ${maturityLevel} (${currentLevel.en.name}) in AI maturity with an overall score of ${overallScore.toFixed(1)}/5. The maturity levels range from Exploring to Leading, and your result indicates where you stand on the journey toward becoming an AI-driven organization. ${strongestDim[locale].name} is your strongest area while ${weakestDim[locale].name} has the most development potential. Given the EU AI Act, it is important to work systematically on governance and ethics alongside technical development.`;

  const strengths = content.strengths[strongestDim.id as keyof typeof content.strengths] || [];
  const improvements = content.improvements[weakestDim.id as keyof typeof content.improvements] || [];

  const recommendations = locale === 'sv'
    ? [
        `Börja med en workshop för att fördjupa förståelsen inom ${weakestDim.sv.name}`,
        `Dokumentera och dela goda exempel från ${strongestDim.sv.name}`,
        currentLevel.sv.typicalNeeds.split('.')[0],
      ]
    : [
        `Start with a workshop to deepen understanding of ${weakestDim.en.name}`,
        `Document and share good examples from ${strongestDim.en.name}`,
        currentLevel.en.typicalNeeds.split('.')[0],
      ];

  const nextSteps = locale === 'sv'
    ? [
        'Genomför en uppföljande AI-mognadsmätning om 6 månader',
        'Kartlägg er organisations status gentemot EU:s AI-förordning',
        'Identifiera och prioritera 2\u20133 AI-användningsfall med tydlig affärsnytta',
      ]
    : [
        'Conduct a follow-up AI maturity assessment in 6 months',
        'Map your organization\'s status against the EU AI Act',
        'Identify and prioritize 2\u20133 AI use cases with clear business value',
      ];

  return {
    summary,
    strengths,
    improvements,
    recommendations,
    nextSteps,
  };
}

// API route handler function
export async function handleGenerateInsights(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const insights = await generateAIInsights(body);
    return Response.json(insights);
  } catch (error) {
    console.error('Error generating insights:', error);
    return Response.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    );
  }
}
