'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function GuideContent({ markdown }: { markdown: string }) {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none
      prose-headings:text-foreground
      prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-4 prose-h1:border-b prose-h1:border-slate-200 prose-h1:dark:border-slate-700 prose-h1:pb-4
      prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-orange-500
      prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
      prose-h4:text-lg prose-h4:font-medium prose-h4:mt-6 prose-h4:mb-2
      prose-p:text-slate-700 prose-p:dark:text-slate-300 prose-p:leading-relaxed
      prose-li:text-slate-700 prose-li:dark:text-slate-300
      prose-strong:text-foreground
      prose-blockquote:border-l-orange-500 prose-blockquote:bg-slate-50 prose-blockquote:dark:bg-slate-800/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:italic
      prose-table:border-collapse
      prose-th:bg-slate-100 prose-th:dark:bg-slate-800 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-th:text-sm
      prose-td:px-4 prose-td:py-2 prose-td:text-sm prose-td:border-t prose-td:border-slate-200 prose-td:dark:border-slate-700
      prose-code:bg-slate-100 prose-code:dark:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
      prose-hr:border-slate-200 prose-hr:dark:border-slate-700
      prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline
    ">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
