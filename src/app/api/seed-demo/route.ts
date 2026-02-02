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

// Generate a weighted random score (tends toward middle values)
function generateRealisticScore(): number {
  const random = Math.random() + Math.random() + Math.random();
  const normalized = random / 3;
  const score = Math.round(normalized * 4) + 1;
  return Math.max(1, Math.min(5, score));
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
        const value = generateRealisticScore();
        allResponses.push({
          sessionId: assessmentSession.id,
          questionId: q,
          value,
        });

        for (const [dim, questions] of Object.entries(DIMENSION_QUESTIONS)) {
          if (questions.includes(q)) {
            dimensionResponses[dim].push(value);
          }
        }
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
