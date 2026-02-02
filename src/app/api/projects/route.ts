import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { db } from '@/db';
import { projects, assessmentSessions } from '@/db/schema';
import { eq, desc, count } from 'drizzle-orm';
import { generateShareCode } from '@/lib/utils';

// GET /api/projects - List all projects for the logged-in consultant
export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userProjects = await db
    .select({
      id: projects.id,
      name: projects.name,
      clientName: projects.clientName,
      clientDomain: projects.clientDomain,
      shareCode: projects.shareCode,
      status: projects.status,
      deadline: projects.deadline,
      createdAt: projects.createdAt,
      responseCount: count(assessmentSessions.id),
    })
    .from(projects)
    .leftJoin(assessmentSessions, eq(projects.id, assessmentSessions.projectId))
    .where(eq(projects.createdById, user.id))
    .groupBy(projects.id)
    .orderBy(desc(projects.createdAt));

  return NextResponse.json(userProjects);
}

// POST /api/projects - Create a new project
export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { name, clientName, clientDomain, deadline, status } = body;

  if (!name || !clientName || !clientDomain) {
    return NextResponse.json(
      { error: 'Name, clientName, and clientDomain are required' },
      { status: 400 }
    );
  }

  // Clean up client domain (remove @ if provided)
  const cleanDomain = clientDomain.replace('@', '').toLowerCase();

  const shareCode = generateShareCode();

  const [newProject] = await db
    .insert(projects)
    .values({
      name,
      clientName,
      clientDomain: cleanDomain,
      shareCode,
      createdById: user.id,
      deadline: deadline ? new Date(deadline) : null,
      status: status || 'active',
    })
    .returning();

  return NextResponse.json(newProject, { status: 201 });
}
