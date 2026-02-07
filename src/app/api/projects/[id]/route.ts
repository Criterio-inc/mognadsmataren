import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { db } from '@/db';
import { projects, assessmentSessions, assessmentResults } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

type Params = Promise<{ id: string }>;

// GET /api/projects/[id] - Get project details with responses
export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get project (verify ownership)
  const [project] = await db
    .select()
    .from(projects)
    .where(and(eq(projects.id, id), eq(projects.createdById, user.id)));

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  // Get all assessment sessions with their results
  const sessionsWithResults = await db
    .select({
      session: assessmentSessions,
      result: assessmentResults,
    })
    .from(assessmentSessions)
    .leftJoin(assessmentResults, eq(assessmentSessions.id, assessmentResults.sessionId))
    .where(eq(assessmentSessions.projectId, id));

  // Calculate aggregated scores if there are completed sessions
  const completedSessions = sessionsWithResults.filter((s) => s.result !== null);
  let aggregatedScores = null;

  if (completedSessions.length > 0) {
    const dimensions = [
      'strategiLedarskap', 'anvandsfall', 'dataInfrastruktur', 'kompetensKultur',
      'styrningEtik', 'teknikArkitektur', 'organisationProcesser', 'ekosystemInnovation',
    ] as const;

    aggregatedScores = {
      dimensionScores: {} as Record<string, number>,
      overallScore: 0,
      responseCount: completedSessions.length,
    };

    for (const dim of dimensions) {
      const sum = completedSessions.reduce((acc, s) => {
        const scores = s.result?.dimensionScores as Record<string, number> | null;
        return acc + (scores?.[dim] || 0);
      }, 0);
      aggregatedScores.dimensionScores[dim] = sum / completedSessions.length;
    }

    aggregatedScores.overallScore =
      completedSessions.reduce((acc, s) => acc + (s.result?.overallScore || 0), 0) /
      completedSessions.length;
  }

  return NextResponse.json({
    project,
    sessions: sessionsWithResults.map((s) => ({
      id: s.session.id,
      respondentEmail: s.session.respondentEmail,
      respondentName: s.session.respondentName,
      completedAt: s.session.completedAt,
      createdAt: s.session.createdAt,
      result: s.result
        ? {
            dimensionScores: s.result.dimensionScores,
            overallScore: s.result.overallScore,
            maturityLevel: s.result.maturityLevel,
          }
        : null,
    })),
    aggregatedScores,
  });
}

// PATCH /api/projects/[id] - Update project
export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Verify ownership
  const [existing] = await db
    .select()
    .from(projects)
    .where(and(eq(projects.id, id), eq(projects.createdById, user.id)));

  if (!existing) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const body = await req.json();
  const { name, clientName, clientDomain, deadline, status } = body;

  const [updated] = await db
    .update(projects)
    .set({
      ...(name && { name }),
      ...(clientName && { clientName }),
      ...(clientDomain && { clientDomain: clientDomain.replace('@', '').toLowerCase() }),
      ...(deadline !== undefined && { deadline: deadline ? new Date(deadline) : null }),
      ...(status && { status }),
      updatedAt: new Date(),
    })
    .where(eq(projects.id, id))
    .returning();

  return NextResponse.json(updated);
}

// DELETE /api/projects/[id] - Delete project
export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Verify ownership
  const [existing] = await db
    .select()
    .from(projects)
    .where(and(eq(projects.id, id), eq(projects.createdById, user.id)));

  if (!existing) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  await db.delete(projects).where(eq(projects.id, id));

  return NextResponse.json({ success: true });
}
