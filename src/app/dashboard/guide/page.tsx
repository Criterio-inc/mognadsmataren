import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { GuideContent } from './GuideContent';

export default function GuidePage() {
  const filePath = path.join(process.cwd(), 'KONSULTGUIDE_DIGITAL.md');
  const markdown = fs.readFileSync(filePath, 'utf-8');

  return (
    <div>
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Tillbaka till projekt
      </Link>

      <GuideContent markdown={markdown} />
    </div>
  );
}
