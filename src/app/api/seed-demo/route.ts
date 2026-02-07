/**
 * API endpoint to seed a demo project with random survey responses
 * Only accessible by consultants (authenticated users)
 *
 * POST /api/seed-demo
 */

import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { db } from '@/db';
import { projects, assessmentSessions, responses, assessmentResults } from '@/db/schema';
import { nanoid } from 'nanoid';

// Swedish first names for realistic demo data
const SWEDISH_NAMES = [
  'Anna Andersson',
  'Erik Eriksson',
  'Maria Johansson',
  'Johan Karlsson',
  'Emma Nilsson',
  'Lars Svensson',
  'Sara Olsson',
  'Magnus Persson',
  'Karin Lindqvist',
  'Anders Bergström',
  'Eva Larsson',
  'Per Gustafsson',
  'Lena Pettersson',
  'Mikael Jonsson',
  'Helena Lindgren',
];

// Question ranges per dimension (4 questions each, 8 dimensions = 32 questions)
const DIMENSION_QUESTIONS: Record<string, number[]> = {
  strategiLedarskap: [1, 2, 3, 4],
  anvandsfall: [5, 6, 7, 8],
  dataInfrastruktur: [9, 10, 11, 12],
  kompetensKultur: [13, 14, 15, 16],
  styrningEtik: [17, 18, 19, 20],
  teknikArkitektur: [21, 22, 23, 24],
  organisationProcesser: [25, 26, 27, 28],
  ekosystemInnovation: [29, 30, 31, 32],
};

// Organization baseline - strong on strategy but weak on governance and ecosystem
const ORG_DIMENSION_BIAS: Record<string, number> = {
  strategiLedarskap: 0.8,
  anvandsfall: 0.3,
  dataInfrastruktur: 0.0,
  kompetensKultur: -0.3,
  styrningEtik: -0.5,
  teknikArkitektur: 0.2,
  organisationProcesser: -0.2,
  ekosystemInnovation: -0.8,
};

// Respondent profiles with different perspectives
const RESPONDENT_PROFILES = [
  { name: 'optimist', bias: 0.8, variance: 0.3 },
  { name: 'pessimist', bias: -0.7, variance: 0.3 },
  { name: 'balanced', bias: 0, variance: 0.5 },
  { name: 'strategic', bias: 0.3, variance: 0.8, dimensionBonus: { strategiLedarskap: 1.0 } },
  { name: 'operational', bias: -0.2, variance: 0.6, dimensionBonus: { organisationProcesser: 0.8 } },
  { name: 'visionary', bias: 0.5, variance: 0.7, dimensionBonus: { ekosystemInnovation: 0.7 } },
  { name: 'critical', bias: -0.5, variance: 0.4 },
  { name: 'enthusiast', bias: 1.0, variance: 0.5 },
  { name: 'realist', bias: 0, variance: 0.3 },
  { name: 'pragmatic', bias: 0.2, variance: 0.6 },
  { name: 'cautious', bias: -0.3, variance: 0.2 },
  { name: 'ambitious', bias: 0.6, variance: 0.7 },
  { name: 'detail-oriented', bias: -0.1, variance: 0.4, dimensionBonus: { styrningEtik: 0.5 } },
  { name: 'big-picture', bias: 0.4, variance: 0.5, dimensionBonus: { strategiLedarskap: 0.5, anvandsfall: 0.5 } },
  { name: 'newcomer', bias: 0.1, variance: 1.0 },
];

// Generate score with profile and dimension context
function generateProfiledScore(
  profile: typeof RESPONDENT_PROFILES[0],
  dimension: string
): number {
  let score = 3;
  score += ORG_DIMENSION_BIAS[dimension] || 0;
  score += profile.bias;

  const bonus = profile.dimensionBonus as Record<string, number> | undefined;
  if (bonus && bonus[dimension]) {
    score += bonus[dimension];
  }

  const variance = (Math.random() - 0.5) * 2 * profile.variance * 1.5;
  score += variance;

  return Math.max(1, Math.min(5, Math.round(score)));
}

function calculateDimensionScore(responseValues: number[]): number {
  const sum = responseValues.reduce((a, b) => a + b, 0);
  return Number((sum / responseValues.length).toFixed(2));
}

export async function POST() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // 1. Create the project
    const shareCode = nanoid(8);
    const projectData = {
      name: 'Demo AI-Mognadsmätning 2025',
      clientName: 'Demo AB',
      clientDomain: 'demo.se',
      shareCode,
      createdById: userId,
      status: 'active' as const,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };

    const [project] = await db.insert(projects).values(projectData).returning();

    // 2. Create 15 assessment sessions with responses
    const createdSessions = [];

    for (let i = 0; i < 15; i++) {
      const name = SWEDISH_NAMES[i];
      const email = `${name.toLowerCase().replace(' ', '.')}@demo.se`;
      const profile = RESPONDENT_PROFILES[i];

      const [assessmentSession] = await db.insert(assessmentSessions).values({
        projectId: project.id,
        respondentEmail: email,
        respondentName: name,
        completedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      }).returning();

      const allResponses: { sessionId: string; questionId: number; value: number }[] = [];
      const dimensionResponses: Record<string, number[]> = {};
      for (const dim of Object.keys(DIMENSION_QUESTIONS)) {
        dimensionResponses[dim] = [];
      }

      for (let q = 1; q <= 32; q++) {
        // Find which dimension this question belongs to
        let questionDimension = 'strategiLedarskap';
        for (const [dim, questions] of Object.entries(DIMENSION_QUESTIONS)) {
          if (questions.includes(q)) {
            questionDimension = dim;
            break;
          }
        }

        const value = generateProfiledScore(profile, questionDimension);
        allResponses.push({
          sessionId: assessmentSession.id,
          questionId: q,
          value,
        });

        dimensionResponses[questionDimension].push(value);
      }

      await db.insert(responses).values(allResponses);

      const dimensionScores: Record<string, number> = {};
      for (const [dim, vals] of Object.entries(dimensionResponses)) {
        dimensionScores[dim] = calculateDimensionScore(vals);
      }

      const dimValues = Object.values(dimensionScores);
      const overallScore = Number((dimValues.reduce((a, b) => a + b, 0) / dimValues.length).toFixed(2));

      let maturityLevel = 1;
      if (overallScore >= 4.3) maturityLevel = 5;
      else if (overallScore >= 3.5) maturityLevel = 4;
      else if (overallScore >= 2.7) maturityLevel = 3;
      else if (overallScore >= 1.9) maturityLevel = 2;

      await db.insert(assessmentResults).values({
        sessionId: assessmentSession.id,
        dimensionScores: dimensionScores as {
          strategiLedarskap: number;
          anvandsfall: number;
          dataInfrastruktur: number;
          kompetensKultur: number;
          styrningEtik: number;
          teknikArkitektur: number;
          organisationProcesser: number;
          ekosystemInnovation: number;
        },
        overallScore: Math.round(overallScore),
        maturityLevel,
      });

      createdSessions.push({ name, email, overallScore });
    }

    return NextResponse.json({
      success: true,
      project: {
        id: project.id,
        name: project.name,
        shareCode: project.shareCode,
      },
      respondents: createdSessions.length,
      message: `Demo-projekt skapat med ${createdSessions.length} respondenter`,
      reportUrl: `/dashboard/project/${project.id}/report`,
    });
  } catch (error) {
    console.error('Error seeding demo project:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to create demo project', details: errorMessage },
      { status: 500 }
    );
  }
}
