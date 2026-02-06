import { handleGenerateAIMaturityInsights } from '@/lib/ai-maturity-insights';

export async function POST(request: Request) {
  return handleGenerateAIMaturityInsights(request);
}
