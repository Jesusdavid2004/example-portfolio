'use client';

import { useCallback, useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' | null;
    if (current) setTheme(current);
  }, []);

  const toggle = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setTheme(next);
  }, [theme]);

  return (
    <button
      onClick={toggle}
      className="px-3 py-2 rounded-lg text-sm font-bold border border-grey bg-background text-white"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {theme === 'light' ? '🌞 Light' : '🌙 Dark'}
    </button>
  );
}
