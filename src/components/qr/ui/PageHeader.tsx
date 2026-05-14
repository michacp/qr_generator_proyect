// src/components/qr/ui/PageHeader.tsx
import type { Translations } from '../types';

interface PageHeaderProps {
  t: Translations;
}

export function PageHeader({ t }: PageHeaderProps) {
  return (
    <header className="text-center mb-10 animate-fade-up">
      <span className="inline-block bg-violet-900/60 text-violet-300 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-3 border border-violet-700/40">
        {t.header.badge}
      </span>
      <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-tight">
        {t.header.title_line1}<br className="sm:hidden" /> {t.header.title_line2}
      </h1>
      <p className="mt-2 text-violet-400 text-sm font-medium">
        {t.header.subtitle}
      </p>
    </header>
  );
}