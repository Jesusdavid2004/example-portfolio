'use client';
import { useEffect } from 'react';

export default function LangSetter({ lang }: { lang: string }) {
  // Cambia el atributo <html lang="..."> en el cliente
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', lang);
    }
  }, [lang]);

  return null; // No renderiza nada
}
