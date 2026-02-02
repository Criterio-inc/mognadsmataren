import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { projects, assessmentSessions, responses, assessmentResults } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { isValidClientEmail, isDeadlinePassed } from '@/lib/utils';

// GET /api/survey?code=xxx - Get project info by share code
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Share code is required' }, { status: 400 });
  }

  const [project] = await db
    .select({
      id: projects.id,
      name: projects.name,
      clientName: projects.clientName,
      clientDomain: projects.clientDomain,
      status: projects.status,
      deadline: projects.deadline,
    })
    .from(projects)
    .where(eq(projects.shareCode, code));

  if (!project) {
    return NextResponse.json({ error: 'Survey not found' }, { status: 404 });
  }

  // Check if survey is closed
  if (project.status === 'closed' || isDeadlinePassed(project.deadline)) {
    return NextResponse.json(
      { error: 'Survey is closed', project: { name: project.name, clientName: project.clientName } },
      { status: 403 }
    );
  }

  return NextResponse.json({
    id: project.id,
    name: project.name,
    clientName: project.clientName,
    clientDomain: project.clientDomain,
  });
}

// POST /api/survey - Start or continue a survey session
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { shareCode, email, name } = body;

  if (!shareCode || !email) {
    return NextResponse.json({ error: 'shareCode and email are required' }, { status: 400 });
  }

  // Get project
  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.shareCode, shareCode));

  if (!project) {
    return NextResponse.json({ error: 'Survey not found' }, { status: 404 });
  }

  // Check if survey is closed
  if (project.status === 'closed' || isDeadlinePassed(project.deadline)) {
    return NextResponse.json({ error: 'Survey is closed' }, { status: 403 });
  }

  // Validate email domain
  if (!isValidClientEmail(email, project.clientDomain)) {
    return NextResponse.json(
      { error: `Only @${project.clientDomain} emails are allowed` },
      { status: 403 }
    );
  }

  // Check if session already exists for this email
  const [existingSession] = await db
    .select()
    .from(assessmentSessions)
    .where(
      and(
        eq(assessmentSessions.projectId, project.id),
        eq(assessmentSessions.respondentEmail, email.toLowerCase())
      )
    );

  if (existingSession) {
    // If already completed, don't allow re-entry
    if (existingSession.completedAt) {
      return NextResponse.json(
        { error: 'You have already completed this survey' },
        { status: 403 }
      );
    }

    // Return existing session to continue
    const existingResponses = await db
      .select()
      .from(responses)
      .where(eq(responses.sessionId, existingSession.id));

    return NextResponse.json({
      sessionId: existingSession.id,
      responses: existingResponses.reduce(
        (acc, r) => ({ ...acc, [r.questionId]: r.value }),
        {} as Record<number, number>
      ),
    });
  }

  // Create new session
  const [newSession] = await db
    .insert(assessmentSessions)
    .values({
      projectId: project.id,
      respondentEmail: email.toLowerCase(),
      respondentName: name || null,
    })
    .returning();

  return NextResponse.json({
    sessionId: newSession.id,
    responses: {},
  });
}
