import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Lang, languages } from "../i18n/config";
import "../globals.css";
import { notFound } from "next/navigation";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

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
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;

  if (!(languages as readonly string[]).includes(lang)) {
    notFound();
  }

  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Aplica el tema guardado */}
        <ThemeProvider />

        {/* Barra fija superior derecha: idioma + theme */}
        <div className="fixed top-6 right-6 z-50 flex gap-2">
          <LanguageSwitcher currentLang={lang} />
          <ThemeToggle />
        </div>

        {children}
      </body>
    </html>
  );
}
