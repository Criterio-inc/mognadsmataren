import { pgTable, text, timestamp, integer, uuid, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const localeEnum = pgEnum('locale', ['sv', 'en']);
export const projectStatusEnum = pgEnum('project_status', ['draft', 'active', 'closed']);

// Projects (created by Curago consultants for clients)
// Note: createdById references Supabase Auth user ID (UUID)
export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(), // "AI-Mognadsmätning Q1 2025"
  clientName: text('client_name').notNull(), // "Volvo"
  clientDomain: text('client_domain').notNull(), // "volvo.se" - for email validation
  shareCode: text('share_code').notNull().unique(), // Short unique code for URL
  createdById: text('created_by_id').notNull(), // Supabase Auth user ID
  status: projectStatusEnum('status').default('draft').notNull(),
  deadline: timestamp('deadline'), // When the survey closes
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Assessment Sessions (one per respondent per project)
export const assessmentSessions = pgTable('assessment_sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  respondentEmail: text('respondent_email').notNull(),
  respondentName: text('respondent_name'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Individual Responses
export const responses = pgTable('responses', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionId: uuid('session_id').notNull().references(() => assessmentSessions.id, { onDelete: 'cascade' }),
  questionId: integer('question_id').notNull(), // Maps to question number 1-32
  value: integer('value').notNull(), // 1-5 scale
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Assessment Results (calculated)
export const assessmentResults = pgTable('assessment_results', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionId: uuid('session_id').notNull().references(() => assessmentSessions.id, { onDelete: 'cascade' }).unique(),

  // Dimension scores (averages)
  dimensionScores: jsonb('dimension_scores').notNull().$type<{
    strategiLedarskap: number;       // Q1-4
    anvandsfall: number;             // Q5-8
    dataInfrastruktur: number;       // Q9-12
    kompetensKultur: number;         // Q13-16
    styrningEtik: number;            // Q17-20
    teknikArkitektur: number;        // Q21-24
    organisationProcesser: number;   // Q25-28
    ekosystemInnovation: number;     // Q29-32
  }>(),

  // Overall maturity level (1-5)
  overallScore: integer('overall_score').notNull(),
  maturityLevel: integer('maturity_level').notNull(), // 1-5 mapped level

  // AI-generated insights (cached)
  aiInsights: jsonb('ai_insights').$type<{
    summary: string;
    strengths: string[];
    improvements: string[];
    recommendations: string[];
    nextSteps: string[];
  }>(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const projectsRelations = relations(projects, ({ many }) => ({
  assessmentSessions: many(assessmentSessions),
}));

export const assessmentSessionsRelations = relations(assessmentSessions, ({ one, many }) => ({
  project: one(projects, {
    fields: [assessmentSessions.projectId],
    references: [projects.id],
  }),
  responses: many(responses),
  result: one(assessmentResults),
}));

export const responsesRelations = relations(responses, ({ one }) => ({
  session: one(assessmentSessions, {
    fields: [responses.sessionId],
    references: [assessmentSessions.id],
  }),
}));

export const assessmentResultsRelations = relations(assessmentResults, ({ one }) => ({
  session: one(assessmentSessions, {
    fields: [assessmentResults.sessionId],
    references: [assessmentSessions.id],
  }),
}));
