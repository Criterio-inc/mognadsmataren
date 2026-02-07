/**
 * Seed script to create a demo project with random survey responses
 * Run with: npx tsx scripts/seed-demo-project.ts
 */

import { db } from '../src/db';
import { projects, assessmentSessions, responses, assessmentResults } from '../src/db/schema';
import { nanoid } from 'nanoid';

const CONSULTANT_USER_ID = 'demo-par-levander'; // Placeholder Supabase user ID
const CONSULTANT_EMAIL = 'par.levander@curago.se';

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

// Generate a weighted random score (tends toward middle values, realistic for organizations)
function generateRealisticScore(): number {
  // Use a bell curve distribution centered around 3
  const random = Math.random() + Math.random() + Math.random();
  const normalized = random / 3; // 0-1, bell curve
  const score = Math.round(normalized * 4) + 1; // 1-5
  return Math.max(1, Math.min(5, score));
}

// Calculate dimension score from responses
function calculateDimensionScore(responseValues: number[]): number {
  const sum = responseValues.reduce((a, b) => a + b, 0);
  return Number((sum / responseValues.length).toFixed(2));
}

async function seedDemoProject() {
  console.log('Starting demo project seed...\n');

  // 1. Create the project
  const shareCode = nanoid(8);
  const projectData = {
    name: 'Demo AI-Mognadsmätning 2025',
    clientName: 'Demo AB',
    clientDomain: 'demo.se',
    shareCode,
    createdById: CONSULTANT_USER_ID,
    status: 'active' as const,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  };

  console.log('Creating project:', projectData.name);
  const [project] = await db.insert(projects).values(projectData).returning();
  console.log(`Project created with ID: ${project.id}`);
  console.log(`Share code: ${shareCode}`);
  console.log(`Survey link: /p/${shareCode}\n`);

  // 2. Create 15 assessment sessions with responses
  console.log('Creating 15 respondents with random answers...\n');

  for (let i = 0; i < 15; i++) {
    const name = SWEDISH_NAMES[i];
    const email = `${name.toLowerCase().replace(' ', '.')}@demo.se`;

    // Create session
    const [session] = await db.insert(assessmentSessions).values({
      projectId: project.id,
      respondentEmail: email,
      respondentName: name,
      completedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    }).returning();

    // Generate responses for all 32 questions
    const allResponses: { sessionId: string; questionId: number; value: number }[] = [];
    const dimensionResponses: Record<string, number[]> = {};
    for (const dim of Object.keys(DIMENSION_QUESTIONS)) {
      dimensionResponses[dim] = [];
    }

    for (let q = 1; q <= 32; q++) {
      const value = generateRealisticScore();
      allResponses.push({
        sessionId: session.id,
        questionId: q,
        value,
      });

      // Track by dimension
      for (const [dim, questions] of Object.entries(DIMENSION_QUESTIONS)) {
        if (questions.includes(q)) {
          dimensionResponses[dim].push(value);
        }
      }
    }

    // Insert all responses
    await db.insert(responses).values(allResponses);

    // Calculate scores
    const dimensionScores = {
      strategiLedarskap: calculateDimensionScore(dimensionResponses.strategiLedarskap),
      anvandsfall: calculateDimensionScore(dimensionResponses.anvandsfall),
      dataInfrastruktur: calculateDimensionScore(dimensionResponses.dataInfrastruktur),
      kompetensKultur: calculateDimensionScore(dimensionResponses.kompetensKultur),
      styrningEtik: calculateDimensionScore(dimensionResponses.styrningEtik),
      teknikArkitektur: calculateDimensionScore(dimensionResponses.teknikArkitektur),
      organisationProcesser: calculateDimensionScore(dimensionResponses.organisationProcesser),
      ekosystemInnovation: calculateDimensionScore(dimensionResponses.ekosystemInnovation),
    };

    const dimValues = Object.values(dimensionScores);
    const overallScore = Number((dimValues.reduce((a, b) => a + b, 0) / dimValues.length).toFixed(2));

    let maturityLevel = 1;
    if (overallScore >= 4.3) maturityLevel = 5;
    else if (overallScore >= 3.5) maturityLevel = 4;
    else if (overallScore >= 2.7) maturityLevel = 3;
    else if (overallScore >= 1.9) maturityLevel = 2;

    // Create assessment result
    await db.insert(assessmentResults).values({
      sessionId: session.id,
      dimensionScores,
      overallScore: Math.round(overallScore),
      maturityLevel,
    });

    console.log(`  ${i + 1}. ${name} - Overall: ${overallScore.toFixed(2)}`);
  }

  console.log('\n--- Summary ---');
  console.log(`Project ID: ${project.id}`);
  console.log(`Share code: ${shareCode}`);
  console.log(`Respondents: 15`);
  console.log(`\nTo view the report, log in as ${CONSULTANT_EMAIL} and navigate to:`);
  console.log(`  /dashboard/project/${project.id}/report`);
  console.log('\nNote: You need to associate this project with your actual Supabase user ID.');
  console.log('Run this SQL to update the project owner:\n');
  console.log(`  UPDATE projects SET created_by_id = 'YOUR_SUPABASE_USER_ID' WHERE id = '${project.id}';`);
}

seedDemoProject()
  .then(() => {
    console.log('\nDone!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });
