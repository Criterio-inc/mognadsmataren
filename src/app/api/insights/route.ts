import { handleGenerateInsights } from '@/lib/ai';

export async function POST(request: Request) {
  return handleGenerateInsights(request);
}
