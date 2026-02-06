import { aiDimensions, aiMaturityLevels, type AIDimension } from './ai-questions';

interface AIInsightsInput {
  dimensionScores: Record<AIDimension, number>;
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

const predefinedContent = {
  sv: {
    strengths: {
      strategiLedarskap: [
        'Ni har en tydlig AI-vision förankrad i ledningen',
        'AI-strategi är kopplad till verksamhetens övergripande mål',
      ],
      anvandsfall: [
        'Ni identifierar och prioriterar AI-användningsfall systematiskt',
        'Det finns konkreta exempel på AI som skapar mätbart värde',
      ],
      dataInfrastruktur: [
        'Er datakvalitet och infrastruktur stödjer AI-utveckling',
        'Data är väldokumenterad och tillgänglig för AI-arbete',
      ],
      kompetensKultur: [
        'Det finns en stark AI-kompetens och lärande kultur',
        'AI-kunskap sprids bortom teknikavdelningen till hela organisationen',
      ],
      styrningEtik: [
        'Ni har etablerade riktlinjer för ansvarsfull AI-användning',
        'EU AI Act-anpassning och riskhantering är på god väg',
      ],
      teknikArkitektur: [
        'Er tekniska plattform stödjer AI-utveckling och driftsättning effektivt',
        'MLOps-praxis säkerställer kvalitet genom AI-modellernas livscykel',
      ],
      organisationProcesser: [
        'Tydliga roller och tvärfunktionellt samarbete driver AI-initiativ',
        'Förändringsledning för AI-adoption är förankrad i organisationen',
      ],
      ekosystemInnovation: [
        'Aktivt engagemang i AI-ekosystemet stärker er förmåga',
        'Innovationskulturen ser AI som möjliggörare för nya affärsmodeller',
      ],
    },
    improvements: {
      strategiLedarskap: [
        'Förankra AI-strategin tydligare i ledningsgruppen och verksamhetsmålen',
        'Utveckla en konkret AI-färdplan med milstolpar och mätbara mål',
      ],
      anvandsfall: [
        'Etablera en systematisk process för att identifiera och prioritera AI-användningsfall',
        'Bygg en tydlig väg från pilot till produktion för AI-lösningar',
      ],
      dataInfrastruktur: [
        'Förbättra datakvalitet, dokumentation och tillgänglighet för AI-arbete',
        'Investera i infrastruktur som möter kraven för AI-arbetsbelastningar',
      ],
      kompetensKultur: [
        'Bredda AI-kompetensen bortom teknikavdelningen till hela organisationen',
        'Skapa en kultur som uppmuntrar experimentering och lärande kring AI',
      ],
      styrningEtik: [
        'Etablera tydliga riktlinjer och policyer för ansvarsfull AI-användning',
        'Påbörja anpassningen till EU:s AI-förordning och stärk riskhantering för AI',
      ],
      teknikArkitektur: [
        'Utveckla den tekniska plattformen för att bättre stödja AI-arbete',
        'Inför MLOps-praxis för modellhantering, övervakning och uppdatering',
      ],
      organisationProcesser: [
        'Definiera tydliga roller och ansvar för AI-initiativ',
        'Utveckla en förändringsledningsansats specifik för AI-adoption',
      ],
      ekosystemInnovation: [
        'Engagera er mer aktivt med AI-ekosystemet – partners, akademi och bransch',
        'Inför ett systematiskt sätt att utvärdera nya AI-teknologier och leverantörer',
      ],
    },
  },
  en: {
    strengths: {
      strategiLedarskap: [
        'You have a clear AI vision anchored in leadership',
        'AI strategy is connected to overall business goals',
      ],
      anvandsfall: [
        'You systematically identify and prioritize AI use cases',
        'There are concrete examples of AI creating measurable value',
      ],
      dataInfrastruktur: [
        'Your data quality and infrastructure support AI development',
        'Data is well-documented and accessible for AI work',
      ],
      kompetensKultur: [
        'There is strong AI competence and learning culture',
        'AI knowledge extends beyond the technology department across the organization',
      ],
      styrningEtik: [
        'You have established guidelines for responsible AI use',
        'EU AI Act adaptation and risk management are well underway',
      ],
      teknikArkitektur: [
        'Your technical platform efficiently supports AI development and deployment',
        'MLOps practices ensure quality throughout the AI model lifecycle',
      ],
      organisationProcesser: [
        'Clear roles and cross-functional collaboration drive AI initiatives',
        'Change management for AI adoption is anchored in the organization',
      ],
      ekosystemInnovation: [
        'Active engagement in the AI ecosystem strengthens your capabilities',
        'Innovation culture sees AI as an enabler for new business models',
      ],
    },
    improvements: {
      strategiLedarskap: [
        'Anchor the AI strategy more clearly in the leadership team and business goals',
        'Develop a concrete AI roadmap with milestones and measurable goals',
      ],
      anvandsfall: [
        'Establish a systematic process for identifying and prioritizing AI use cases',
        'Build a clear path from pilot to production for AI solutions',
      ],
      dataInfrastruktur: [
        'Improve data quality, documentation and availability for AI work',
        'Invest in infrastructure that meets the demands of AI workloads',
      ],
      kompetensKultur: [
        'Broaden AI competence beyond the tech department across the organization',
        'Create a culture that encourages experimentation and learning around AI',
      ],
      styrningEtik: [
        'Establish clear guidelines and policies for responsible AI use',
        'Begin adapting to the EU AI Act and strengthen risk management for AI',
      ],
      teknikArkitektur: [
        'Develop the technical platform to better support AI work',
        'Implement MLOps practices for model management, monitoring and updating',
      ],
      organisationProcesser: [
        'Define clear roles and responsibilities for AI initiatives',
        'Develop a change management approach specific to AI adoption',
      ],
      ekosystemInnovation: [
        'Engage more actively with the AI ecosystem – partners, academia and industry',
        'Implement a systematic way to evaluate new AI technologies and vendors',
      ],
    },
  },
};

export async function generateAIMaturityInsights(input: AIInsightsInput): Promise<AIInsights> {
  const { dimensionScores, overallScore, maturityLevel, locale } = input;

  const sortedDimensions = aiDimensions
    .map((d) => ({ ...d, score: dimensionScores[d.id] }))
    .sort((a, b) => b.score - a.score);

  const strongestDims = sortedDimensions.filter((d) => d.score >= 3.5);
  const weakestDims = sortedDimensions.filter((d) => d.score < 3.0);

  const currentLevel = aiMaturityLevels.find((l) => l.level === maturityLevel)!;

  const context = {
    overallScore: overallScore.toFixed(1),
    maturityLevel,
    maturityLevelName: currentLevel[locale].name,
    dimensionScores: aiDimensions.map((d) => ({
      name: d[locale].name,
      score: dimensionScores[d.id].toFixed(1),
    })),
    strongestAreas: strongestDims.map((d) => d[locale].name),
    weakestAreas: weakestDims.map((d) => d[locale].name),
  };

  try {
    const aiResponse = await callOpenRouter(context, locale);
    if (aiResponse) {
      return aiResponse;
    }
  } catch (error) {
    console.error('AI generation failed, using predefined content:', error);
  }

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
    ? `Du är en expert på AI-strategi, AI-mognad och organisationsutveckling med djup kunskap om det svenska och europeiska AI-landskapet, inklusive EU:s AI-förordning (AI Act), AI Swedens ramverk, OECD:s AI-indikatorer och svenska AI-kommissionens färdplan.
       Ge konkreta, handlingsbara råd baserat på en AI-mognadsbedömning.
       Svara alltid på svenska. Var professionell men varm i tonen.
       Fokusera på praktiska nästa steg, inte abstrakta koncept.
       Referera till relevanta ramverk och regulatoriska krav där det är lämpligt.`
    : `You are an expert in AI strategy, AI maturity and organizational development with deep knowledge of the Swedish and European AI landscape, including the EU AI Act, AI Sweden's framework, OECD AI indicators and the Swedish AI Commission's roadmap.
       Provide concrete, actionable advice based on an AI maturity assessment.
       Always respond in English. Be professional yet warm in tone.
       Focus on practical next steps, not abstract concepts.
       Reference relevant frameworks and regulatory requirements where appropriate.`;

  const userPrompt = locale === 'sv'
    ? `Analysera följande AI-mognadsbedömning för en organisation:

       Övergripande poäng: ${context.overallScore}/5 (Nivå ${context.maturityLevel}: ${context.maturityLevelName})

       Dimensionspoäng:
       ${context.dimensionScores.map((d) => `- ${d.name}: ${d.score}/5`).join('\n')}

       Starkaste områden: ${context.strongestAreas.join(', ') || 'Inga tydligt starka'}
       Svagaste områden: ${context.weakestAreas.join(', ') || 'Inga tydligt svaga'}

       Kontekst: Svensk organisation som navigerar EU AI Act (full efterlevnad krävs aug 2026), AI Swedens 10-dimensionella ramverk, och OECD:s AI-förmågeindikatorer.

       Ge en JSON-respons med följande struktur:
       {
         "summary": "2-3 meningar som sammanfattar resultatet med koppling till bransch- och regulatorisk kontext",
         "strengths": ["3 styrkor baserat på höga poäng"],
         "improvements": ["3 förbättringsområden baserat på låga poäng, med hänsyn till EU AI Act-krav"],
         "recommendations": ["3 konkreta rekommendationer anpassade efter mognadsnivån och svenska/europeiska förutsättningar"],
         "nextSteps": ["3 praktiska nästa steg för de kommande 3-6 månaderna"]
       }`
    : `Analyze the following AI maturity assessment for an organization:

       Overall score: ${context.overallScore}/5 (Level ${context.maturityLevel}: ${context.maturityLevelName})

       Dimension scores:
       ${context.dimensionScores.map((d) => `- ${d.name}: ${d.score}/5`).join('\n')}

       Strongest areas: ${context.strongestAreas.join(', ') || 'None clearly strong'}
       Weakest areas: ${context.weakestAreas.join(', ') || 'None clearly weak'}

       Context: Swedish organization navigating EU AI Act (full compliance required Aug 2026), AI Sweden's 10-dimension framework, and OECD AI capability indicators.

       Provide a JSON response with the following structure:
       {
         "summary": "2-3 sentences summarizing the result with connection to industry and regulatory context",
         "strengths": ["3 strengths based on high scores"],
         "improvements": ["3 areas for improvement based on low scores, considering EU AI Act requirements"],
         "recommendations": ["3 concrete recommendations adapted to the maturity level and Swedish/European context"],
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
      max_tokens: 1200,
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

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not extract JSON from AI response');
  }

  return JSON.parse(jsonMatch[0]) as AIInsights;
}

function generatePredefinedInsights(input: AIInsightsInput): AIInsights {
  const { dimensionScores, overallScore, maturityLevel, locale } = input;

  const sortedDimensions = aiDimensions
    .map((d) => ({ ...d, score: dimensionScores[d.id] }))
    .sort((a, b) => b.score - a.score);

  const strongestDim = sortedDimensions[0];
  const weakestDim = sortedDimensions[sortedDimensions.length - 1];

  const currentLevel = aiMaturityLevels.find((l) => l.level === maturityLevel)!;
  const content = predefinedContent[locale];

  const summary = locale === 'sv'
    ? `Er organisation befinner sig på AI-mognadsnivå ${maturityLevel} (${currentLevel.sv.name}) med en övergripande poäng på ${overallScore.toFixed(1)}/5. ${strongestDim[locale].name} är ert starkaste område medan ${weakestDim[locale].name} har störst utvecklingspotential. Med EU:s AI-förordning som träder i full kraft i augusti 2026 är det viktigt att systematiskt stärka er AI-mognad.`
    : `Your organization is at AI maturity level ${maturityLevel} (${currentLevel.en.name}) with an overall score of ${overallScore.toFixed(1)}/5. ${strongestDim[locale].name} is your strongest area while ${weakestDim[locale].name} has the most development potential. With the EU AI Act coming into full effect in August 2026, it is important to systematically strengthen your AI maturity.`;

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
        'Identifiera och prioritera 2–3 AI-användningsfall med tydlig affärsnytta',
      ]
    : [
        'Conduct a follow-up AI maturity assessment in 6 months',
        'Map your organization\'s status against the EU AI Act requirements',
        'Identify and prioritize 2-3 AI use cases with clear business value',
      ];

  return {
    summary,
    strengths,
    improvements,
    recommendations,
    nextSteps,
  };
}

export async function handleGenerateAIMaturityInsights(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const insights = await generateAIMaturityInsights(body);
    return Response.json(insights);
  } catch (error) {
    console.error('Error generating AI maturity insights:', error);
    return Response.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    );
  }
}
