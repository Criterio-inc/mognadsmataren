import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { assessmentSessions, responses, assessmentResults, projects } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { isDeadlinePassed } from '@/lib/utils';

type Params = Promise<{ sessionId: string }>;

// Calculate dimension scores from responses
function calculateScores(responsesMap: Record<number, number>) {
  const dimensions = {
    gemesamBild: [1, 2, 3, 4, 5, 6],
    strategiskKoppling: [7, 8, 9, 10, 11],
    prioriteringBeslut: [12, 13, 14, 15, 16],
    agarskapGenomforande: [17, 18, 19, 20, 21, 22],
  };

  const dimensionScores: Record<string, number> = {};

  for (const [key, questionIds] of Object.entries(dimensions)) {
    const values = questionIds.map((id) => responsesMap[id]).filter((v) => v !== undefined);
    if (values.length > 0) {
      dimensionScores[key] = values.reduce((a, b) => a + b, 0) / values.length;
    } else {
      dimensionScores[key] = 0;
    }
  }

  const allValues = Object.values(responsesMap).filter((v) => v !== undefined);
  const overallScore = allValues.length > 0 ? allValues.reduce((a, b) => a + b, 0) / allValues.length : 0;

  // Map to maturity level (1-5)
  let maturityLevel = 1;
  if (overallScore >= 4.5) maturityLevel = 5;
  else if (overallScore >= 3.5) maturityLevel = 4;
  else if (overallScore >= 2.5) maturityLevel = 3;
  else if (overallScore >= 1.5) maturityLevel = 2;

  return { dimensionScores, overallScore, maturityLevel };
}

// PATCH /api/survey/[sessionId] - Save responses
export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  const { sessionId } = await params;
  const body = await req.json();
  const { questionId, value } = body;

  if (!questionId || !value) {
    return NextResponse.json({ error: 'questionId and value are required' }, { status: 400 });
  }

  // Verify session exists and is not completed
  const [session] = await db
    .select()
    .from(assessmentSessions)
    .where(eq(assessmentSessions.id, sessionId));

  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  if (session.completedAt) {
    return NextResponse.json({ error: 'Session already completed' }, { status: 403 });
  }

  // Check if project is still open
  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, session.projectId));

  if (!project || project.status === 'closed' || isDeadlinePassed(project.deadline)) {
    return NextResponse.json({ error: 'Survey is closed' }, { status: 403 });
  }

  // Upsert response
  const [existingResponse] = await db
    .select()
    .from(responses)
    .where(eq(responses.sessionId, sessionId));

  // Check if response for this question exists
  const existingResponses = await db
    .select()
    .from(responses)
    .where(eq(responses.sessionId, sessionId));

  const existing = existingResponses.find((r) => r.questionId === questionId);

  if (existing) {
    await db
      .update(responses)
      .set({ value })
      .where(eq(responses.id, existing.id));
  } else {
    await db.insert(responses).values({
      sessionId,
      questionId,
      value,
    });
  }

  return NextResponse.json({ success: true });
}

// POST /api/survey/[sessionId] - Complete the survey
export async function POST(req: NextRequest, { params }: { params: Params }) {
  const { sessionId } = await params;

  // Verify session exists and is not completed
  const [session] = await db
    .select()
    .from(assessmentSessions)
    .where(eq(assessmentSessions.id, sessionId));

  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  if (session.completedAt) {
    return NextResponse.json({ error: 'Session already completed' }, { status: 403 });
  }

  // Get all responses
  const sessionResponses = await db
    .select()
    .from(responses)
    .where(eq(responses.sessionId, sessionId));

  // Check if all 22 questions are answered
  if (sessionResponses.length < 22) {
    return NextResponse.json(
      { error: `Please answer all questions (${sessionResponses.length}/22 completed)` },
      { status: 400 }
    );
  }

  // Calculate scores
  const responsesMap = sessionResponses.reduce(
    (acc, r) => ({ ...acc, [r.questionId]: r.value }),
    {} as Record<number, number>
  );

  const { dimensionScores, overallScore, maturityLevel } = calculateScores(responsesMap);

  // Save results
  await db.insert(assessmentResults).values({
    sessionId,
    dimensionScores: dimensionScores as {
      gemesamBild: number;
      strategiskKoppling: number;
      prioriteringBeslut: number;
      agarskapGenomforande: number;
    },
    overallScore: Math.round(overallScore * 10) / 10,
    maturityLevel,
  });

  // Mark session as completed
  await db
    .update(assessmentSessions)
    .set({ completedAt: new Date() })
    .where(eq(assessmentSessions.id, sessionId));

  return NextResponse.json({ success: true });
}
