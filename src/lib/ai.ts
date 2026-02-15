import { dimensions, maturityLevels, type Dimension } from './questions';

interface AIInsightsInput {
  dimensionScores: Record<Dimension, number>;
  overallScore: number;
  maturityLevel: number;
  locale: 'sv' | 'en';
  notApplicableCounts?: Record<Dimension, number> | null;
  totalNotApplicable?: number;
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
      gemesamBild: [
        'Ni har en god grundförståelse för vad digitalisering innebär',
        'Ledningen delar en gemensam bild av digitaliseringens betydelse',
      ],
      strategiskKoppling: [
        'Digital utveckling är kopplad till verksamhetsmålen',
        'Digitalisering diskuteras som en affärsfråga, inte bara teknik',
      ],
      prioriteringBeslut: [
        'Ni har etablerade principer för prioritering',
        'Beslut fattas baserat på faktaunderlag och analys',
      ],
      agarskapGenomforande: [
        'Ledningen tar aktivt ansvar för digital utveckling',
        'Ni förstår vikten av förändringsledning',
      ],
    },
    improvements: {
      gemesamBild: [
        'Fördjupa förståelsen för skillnaden mellan IT-drift och digital utveckling',
        'Skapa en gemensam definition av digital mognad',
      ],
      strategiskKoppling: [
        'Koppla digitala initiativ tydligare till verksamhetsmål',
        'Integrera digital planering i den strategiska processen',
      ],
      prioriteringBeslut: [
        'Utveckla tydligare prioriteringsprinciper',
        'Inför systematisk uppföljning av digitala satsningar',
      ],
      agarskapGenomforande: [
        'Stärk ledningens aktiva engagemang i digital transformation',
        'Investera mer i kompetens och kultur, inte bara teknik',
      ],
    },
  },
  en: {
    strengths: {
      gemesamBild: [
        'You have a good basic understanding of what digitalization means',
        'Leadership shares a common view of the significance of digitalization',
      ],
      strategiskKoppling: [
        'Digital development is connected to business goals',
        'Digitalization is discussed as a business issue, not just technology',
      ],
      prioriteringBeslut: [
        'You have established principles for prioritization',
        'Decisions are made based on evidence and analysis',
      ],
      agarskapGenomforande: [
        'Leadership actively takes responsibility for digital development',
        'You understand the importance of change management',
      ],
    },
    improvements: {
      gemesamBild: [
        'Deepen understanding of the difference between IT operations and digital development',
        'Create a shared definition of digital maturity',
      ],
      strategiskKoppling: [
        'Connect digital initiatives more clearly to business goals',
        'Integrate digital planning into the strategic process',
      ],
      prioriteringBeslut: [
        'Develop clearer prioritization principles',
        'Implement systematic follow-up of digital investments',
      ],
      agarskapGenomforande: [
        'Strengthen leadership\'s active engagement in digital transformation',
        'Invest more in competence and culture, not just technology',
      ],
    },
  },
};

function buildNotApplicableContext(
  input: AIInsightsInput,
  locale: 'sv' | 'en'
): string {
  const { notApplicableCounts, totalNotApplicable } = input;
  if (!totalNotApplicable || totalNotApplicable === 0) return '';

  const naDimensions = dimensions
    .filter((d) => notApplicableCounts && notApplicableCounts[d.id] > 0)
    .map((d) => ({
      name: d[locale].name,
      count: notApplicableCounts![d.id],
      total: d.questionIds.length,
    }));

  if (locale === 'sv') {
    return `\n\n       Observera: ${totalNotApplicable} av 22 påståenden markerades som "Ej aktuellt".
       ${naDimensions.map((d) => `- ${d.name}: ${d.count} av ${d.total} påståenden "Ej aktuellt"`).join('\n       ')}
       Detta är en viktig signal – områden markerade som "Ej aktuellt" kan indikera att frågan inte har adresserats eller diskuterats i ledningsgruppen, vilket i sig är ett värdefullt resultat att reflektera över.`;
  }

  return `\n\n       Note: ${totalNotApplicable} of 22 statements were marked as "Not applicable".
       ${naDimensions.map((d) => `- ${d.name}: ${d.count} of ${d.total} statements "Not applicable"`).join('\n       ')}
       This is an important signal – areas marked as "Not applicable" may indicate that the topic has not been addressed or discussed in the leadership team, which itself is a valuable finding to reflect on.`;
}

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
    notApplicableContext: buildNotApplicableContext(input, locale),
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
    notApplicableContext: string;
  },
  locale: 'sv' | 'en'
): Promise<AIInsights | null> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return null;
  }

  const systemPrompt = locale === 'sv'
    ? `Du är en expert på digital transformation och organisationsutveckling.
       Ge konkreta, handlingsbara råd baserat på en digital mognadsbedömning.
       Svara alltid på svenska. Var professionell men varm i tonen.
       Fokusera på praktiska nästa steg, inte abstrakta koncept.
       Om påståenden har markerats som "Ej aktuellt" är detta en viktig signal som bör adresseras i analysen – det kan tyda på att området inte har uppmärksammats eller diskuterats.`
    : `You are an expert in digital transformation and organizational development.
       Provide concrete, actionable advice based on a digital maturity assessment.
       Always respond in English. Be professional yet warm in tone.
       Focus on practical next steps, not abstract concepts.
       If statements were marked as "Not applicable", this is an important signal that should be addressed in the analysis – it may indicate that the area has not been recognized or discussed.`;

  const userPrompt = locale === 'sv'
    ? `Analysera följande digital mognadsbedömning för en ledningsgrupp:

       Övergripande poäng: ${context.overallScore}/5 (Nivå ${context.maturityLevel}: ${context.maturityLevelName})

       Dimensionspoäng:
       ${context.dimensionScores.map((d) => `- ${d.name}: ${d.score}/5`).join('\n')}

       Starkaste områden: ${context.strongestAreas.join(', ') || 'Inga tydligt starka'}
       Svagaste områden: ${context.weakestAreas.join(', ') || 'Inga tydligt svaga'}${context.notApplicableContext}

       Ge en JSON-respons med följande struktur:
       {
         "summary": "2-3 meningar som sammanfattar resultatet, inkludera observation om eventuella 'Ej aktuellt'-svar",
         "strengths": ["3 styrkor baserat på höga poäng"],
         "improvements": ["3 förbättringsområden baserat på låga poäng och/eller 'Ej aktuellt'-svar"],
         "recommendations": ["3 konkreta rekommendationer anpassade efter mognadsnivån"],
         "nextSteps": ["3 praktiska nästa steg för de kommande 3-6 månaderna"]
       }`
    : `Analyze the following digital maturity assessment for a leadership team:

       Overall score: ${context.overallScore}/5 (Level ${context.maturityLevel}: ${context.maturityLevelName})

       Dimension scores:
       ${context.dimensionScores.map((d) => `- ${d.name}: ${d.score}/5`).join('\n')}

       Strongest areas: ${context.strongestAreas.join(', ') || 'None clearly strong'}
       Weakest areas: ${context.weakestAreas.join(', ') || 'None clearly weak'}${context.notApplicableContext}

       Provide a JSON response with the following structure:
       {
         "summary": "2-3 sentences summarizing the result, include observation about any 'Not applicable' answers",
         "strengths": ["3 strengths based on high scores"],
         "improvements": ["3 areas for improvement based on low scores and/or 'Not applicable' answers"],
         "recommendations": ["3 concrete recommendations adapted to the maturity level"],
         "nextSteps": ["3 practical next steps for the coming 3-6 months"]
       }`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      'X-Title': 'Mognadsmätaren',
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
  const { dimensionScores, overallScore, maturityLevel, locale, notApplicableCounts, totalNotApplicable } = input;

  const sortedDimensions = dimensions
    .map((d) => ({ ...d, score: dimensionScores[d.id] }))
    .sort((a, b) => b.score - a.score);

  const strongestDim = sortedDimensions[0];
  const weakestDim = sortedDimensions[sortedDimensions.length - 1];

  const currentLevel = maturityLevels.find((l) => l.level === maturityLevel)!;
  const content = predefinedContent[locale];

  // Build N/A observation for summary
  let naSummary = '';
  if (totalNotApplicable && totalNotApplicable > 0) {
    const naDimNames = dimensions
      .filter((d) => notApplicableCounts && notApplicableCounts[d.id] > 0)
      .map((d) => d[locale].name);

    if (locale === 'sv') {
      naSummary = ` Noterbart är att ${totalNotApplicable} påståenden markerades som "Ej aktuellt"${naDimNames.length > 0 ? `, främst inom ${naDimNames.join(' och ')}` : ''} – detta tyder på att vissa områden ännu inte har adresserats.`;
    } else {
      naSummary = ` Notably, ${totalNotApplicable} statements were marked as "Not applicable"${naDimNames.length > 0 ? `, primarily in ${naDimNames.join(' and ')}` : ''} – this suggests some areas have not yet been addressed.`;
    }
  }

  const summary = locale === 'sv'
    ? `Er ledningsgrupp befinner sig på nivå ${maturityLevel} (${currentLevel.sv.name}) med en övergripande poäng på ${overallScore.toFixed(1)}/5. ${strongestDim[locale].name} är ert starkaste område medan ${weakestDim[locale].name} har störst utvecklingspotential.${naSummary}`
    : `Your leadership team is at level ${maturityLevel} (${currentLevel.en.name}) with an overall score of ${overallScore.toFixed(1)}/5. ${strongestDim[locale].name} is your strongest area while ${weakestDim[locale].name} has the most development potential.${naSummary}`;

  const strengths = content.strengths[strongestDim.id as keyof typeof content.strengths] || [];

  // Build improvements including N/A observations
  const baseImprovements = content.improvements[weakestDim.id as keyof typeof content.improvements] || [];
  const improvements = [...baseImprovements];

  // Add N/A-specific improvement if applicable
  if (totalNotApplicable && totalNotApplicable > 0) {
    const highNaDims = dimensions.filter(
      (d) => notApplicableCounts && notApplicableCounts[d.id] >= Math.ceil(d.questionIds.length / 2)
    );
    if (highNaDims.length > 0) {
      const dimNames = highNaDims.map((d) => d[locale].name).join(', ');
      if (locale === 'sv') {
        improvements.push(`Att frågor inom ${dimNames} bedöms som "Ej aktuellt" indikerar ett behov av att lyfta dessa ämnen i ledningsgruppen`);
      } else {
        improvements.push(`Questions in ${dimNames} being rated "Not applicable" indicates a need to raise these topics in the leadership team`);
      }
    }
  }

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
        'Genomför en uppföljande mätning om 6 månader',
        'Sätt konkreta mål för de två svagaste dimensionerna',
        'Involvera fler i ledningsgruppen i digitala initiativ',
      ]
    : [
        'Conduct a follow-up assessment in 6 months',
        'Set concrete goals for the two weakest dimensions',
        'Involve more leadership team members in digital initiatives',
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
