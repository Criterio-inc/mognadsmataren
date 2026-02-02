import { pgTable, text, timestamp, integer, uuid, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const localeEnum = pgEnum('locale', ['sv', 'en']);
export const userRoleEnum = pgEnum('user_role', ['curago_admin', 'respondent']);
export const projectStatusEnum = pgEnum('project_status', ['draft', 'active', 'closed']);

// Users (Curago consultants who log in with Google)
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  name: text('name'),
  image: text('image'),
  role: userRoleEnum('role').default('curago_admin').notNull(),
  locale: localeEnum('locale').default('sv'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// NextAuth.js required tables
export const accounts = pgTable('accounts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
});

export const sessions = pgTable('sessions', {
  sessionToken: text('session_token').primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull().unique(),
  expires: timestamp('expires').notNull(),
});

// Projects (created by Curago consultants for clients)
export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(), // "Volvo Ledningsgrupp Q1 2025"
  clientName: text('client_name').notNull(), // "Volvo"
  clientDomain: text('client_domain').notNull(), // "volvo.se" - for email validation
  shareCode: text('share_code').notNull().unique(), // Short unique code for URL
  createdById: uuid('created_by_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
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
  questionId: integer('question_id').notNull(), // Maps to question number 1-22
  value: integer('value').notNull(), // 1-5 scale
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Assessment Results (calculated)
export const assessmentResults = pgTable('assessment_results', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionId: uuid('session_id').notNull().references(() => assessmentSessions.id, { onDelete: 'cascade' }).unique(),

  // Dimension scores (averages)
  dimensionScores: jsonb('dimension_scores').notNull().$type<{
    gemesamBild: number;      // Q1-6
    strategiskKoppling: number; // Q7-11
    prioriteringBeslut: number; // Q12-16
    agarskapGenomforande: number; // Q17-22
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
export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [projects.createdById],
    references: [users.id],
  }),
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
