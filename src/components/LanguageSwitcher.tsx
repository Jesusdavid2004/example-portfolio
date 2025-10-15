'use client';

import Link from 'next/link';
import { Lang, languages } from '@/app/i18n/config';

export default function LanguageSwitcher({ currentLang }: { currentLang: Lang }) {
  return (
    <nav className="flex gap-2">
      {languages.map((l) => {
        const active = currentLang === l;
        return (
          <Link
            key={l}
            href={`/${l}`}
            className={`px-3 py-2 rounded-lg text-sm font-semibold border transition-colors
              ${active
                ? 'bg-surface text-text border-border shadow-sm'
                : 'bg-surface-2 text-text border-border hover:bg-surface'
              }`}
            aria-current={active ? 'true' : undefined}
          >
            {l.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
