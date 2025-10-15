// src/app/[lang]/layout.tsx
import type { Metadata } from "next";
import { Lang, languages } from "../i18n/config";
import { notFound } from "next/navigation";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LangSetter from "@/components/LangSetter";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Multilenguaje con Next.js App Router",
};

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

// type guard para estrechar de string -> Lang
const isLang = (v: string): v is Lang =>
  (languages as readonly string[]).includes(v);

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // Next 15 entrega string genérico
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLang(lang)) {
    notFound();
  }
  const safeLang: Lang = lang;

  return (
    <>
      {/* Ajusta <html lang="..."> en el cliente sin mismatches */}
      <LangSetter lang={safeLang} />

      {/* Tema (dark/light) */}
      <ThemeProvider />

      {/* Controles fijos */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <LanguageSwitcher currentLang={safeLang} />
        <ThemeToggle />
      </div>

      {children}
    </>
  );
}
