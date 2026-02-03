/**
 * API endpoint to seed a demo project with random survey responses
 * Only accessible by Curago consultants (authenticated users)
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

// Question ranges per dimension
const DIMENSION_QUESTIONS = {
  gemesamBild: [1, 2, 3, 4, 5, 6],
  strategiskKoppling: [7, 8, 9, 10, 11],
  prioriteringBeslut: [12, 13, 14, 15, 16],
  agarskapGenomforande: [17, 18, 19, 20, 21, 22],
};

// Organization baseline - this org is strong on strategy but weak on execution
const ORG_DIMENSION_BIAS: Record<string, number> = {
  gemesamBild: 0.5,           // Decent shared understanding
  strategiskKoppling: 1.0,    // Strong strategic alignment (their strength)
  prioriteringBeslut: -0.3,   // Slightly weak on prioritization
  agarskapGenomforande: -1.0, // Weak on execution (their challenge)
};

// Respondent profiles with different perspectives
const RESPONDENT_PROFILES = [
  { name: 'optimist', bias: 0.8, variance: 0.3 },      // Sees things positively
  { name: 'pessimist', bias: -0.7, variance: 0.3 },    // More critical
  { name: 'balanced', bias: 0, variance: 0.5 },        // Middle ground
  { name: 'strategic', bias: 0.3, variance: 0.8, dimensionBonus: { strategiskKoppling: 1.0 } },
  { name: 'operational', bias: -0.2, variance: 0.6, dimensionBonus: { agarskapGenomforande: 0.8 } },
  { name: 'visionary', bias: 0.5, variance: 0.7, dimensionBonus: { gemesamBild: 0.7 } },
  { name: 'critical', bias: -0.5, variance: 0.4 },     // Very analytical
  { name: 'enthusiast', bias: 1.0, variance: 0.5 },    // Very positive
  { name: 'realist', bias: 0, variance: 0.3 },         // Consistent, moderate
  { name: 'pragmatic', bias: 0.2, variance: 0.6 },
  { name: 'cautious', bias: -0.3, variance: 0.2 },     // Conservative answers
  { name: 'ambitious', bias: 0.6, variance: 0.7 },
  { name: 'detail-oriented', bias: -0.1, variance: 0.4, dimensionBonus: { prioriteringBeslut: 0.5 } },
  { name: 'big-picture', bias: 0.4, variance: 0.5, dimensionBonus: { gemesamBild: 0.5, strategiskKoppling: 0.5 } },
  { name: 'newcomer', bias: 0.1, variance: 1.0 },      // High variance, new to org
];

// Generate score with profile and dimension context
function generateProfiledScore(
  profile: typeof RESPONDENT_PROFILES[0],
  dimension: string
): number {
  // Base score around 3
  let score = 3;

  // Add organization dimension bias
  score += ORG_DIMENSION_BIAS[dimension] || 0;

  // Add respondent profile bias
  score += profile.bias;

  // Add dimension-specific bonus for this profile
  const bonus = profile.dimensionBonus as Record<string, number> | undefined;
  if (bonus && bonus[dimension]) {
    score += bonus[dimension];
  }

  // Add variance (random factor)
  const variance = (Math.random() - 0.5) * 2 * profile.variance * 1.5;
  score += variance;

  // Clamp to 1-5 and round
  return Math.max(1, Math.min(5, Math.round(score)));
}

function calculateDimensionScore(responseValues: number[]): number {
  const sum = responseValues.reduce((a, b) => a + b, 0);
  return Number((sum / responseValues.length).toFixed(2));
}

export async function POST() {
  try {
    // Verify authentication
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // 1. Create the project
    const shareCode = nanoid(8);
    const projectData = {
      name: 'Demo Ledningsgrupp 2025',
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
      const dimensionResponses: Record<string, number[]> = {
        gemesamBild: [],
        strategiskKoppling: [],
        prioriteringBeslut: [],
        agarskapGenomforande: [],
      };

      for (let q = 1; q <= 22; q++) {
        // Find which dimension this question belongs to
        let questionDimension = 'gemesamBild';
        for (const [dim, questions] of Object.entries(DIMENSION_QUESTIONS)) {
          if (questions.includes(q)) {
            questionDimension = dim;
            break;
          }
        }

        // Generate score based on profile and dimension
        const value = generateProfiledScore(profile, questionDimension);
        allResponses.push({
          sessionId: assessmentSession.id,
          questionId: q,
          value,
        });

        dimensionResponses[questionDimension].push(value);
      }

      await db.insert(responses).values(allResponses);

      const dimensionScores = {
        gemesamBild: calculateDimensionScore(dimensionResponses.gemesamBild),
        strategiskKoppling: calculateDimensionScore(dimensionResponses.strategiskKoppling),
        prioriteringBeslut: calculateDimensionScore(dimensionResponses.prioriteringBeslut),
        agarskapGenomforande: calculateDimensionScore(dimensionResponses.agarskapGenomforande),
      };

      const overallScore = Number((
        (dimensionScores.gemesamBild + dimensionScores.strategiskKoppling +
          dimensionScores.prioriteringBeslut + dimensionScores.agarskapGenomforande) / 4
      ).toFixed(2));

      const maturityLevel = Math.round(overallScore);

      await db.insert(assessmentResults).values({
        sessionId: assessmentSession.id,
        dimensionScores,
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
