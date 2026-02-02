import { pgTable, text, timestamp, integer, uuid, jsonb, boolean, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const roleEnum = pgEnum('role', ['owner', 'admin', 'member']);
export const localeEnum = pgEnum('locale', ['sv', 'en']);

// Organizations (Teams)
export const organizations = pgTable('organizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Users
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  image: text('image'),
  locale: localeEnum('locale').default('sv'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Organization Members (join table)
export const organizationMembers = pgTable('organization_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: roleEnum('role').default('member').notNull(),
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
});

// Assessment Sessions
export const assessmentSessions = pgTable('assessment_sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }),
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
export const organizationsRelations = relations(organizations, ({ many }) => ({
  members: many(organizationMembers),
  sessions: many(assessmentSessions),
}));

export const usersRelations = relations(users, ({ many }) => ({
  memberships: many(organizationMembers),
  sessions: many(assessmentSessions),
}));

export const organizationMembersRelations = relations(organizationMembers, ({ one }) => ({
  organization: one(organizations, {
    fields: [organizationMembers.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [organizationMembers.userId],
    references: [users.id],
  }),
}));

export const assessmentSessionsRelations = relations(assessmentSessions, ({ one, many }) => ({
  user: one(users, {
    fields: [assessmentSessions.userId],
    references: [users.id],
  }),
  organization: one(organizations, {
    fields: [assessmentSessions.organizationId],
    references: [organizations.id],
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
