import type { Metadata } from "next";
import { languages } from "../i18n/config";
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

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // 👈 aceptar string (lo que Next te pasa)
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // validar y narrow en runtime
  if (!(languages as readonly string[]).includes(lang)) {
    notFound();
  }

  return (
    <>
      <LangSetter lang={lang} />
      <ThemeProvider />
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <LanguageSwitcher currentLang={lang as any} />
        <ThemeToggle />
      </div>
      {children}
    </>
  );
}
