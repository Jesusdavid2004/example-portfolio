// src/app/[lang]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary } from "../i18n/dictionaries";
import { languages } from "../i18n/config";

export const dynamicParams = false;

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

// helper de tipo para validar el idioma en runtime
const isLang = (v: string): v is (typeof languages)[number] =>
  (languages as readonly string[]).includes(v);

export default async function Home({
  params,
}: {
  // ✅ Next 15 pasa `string`, no el union type
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLang(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <div className="font-sans flex justify-center">
      <main
        className="container mx-auto mt-24 px-4 grid grid-cols-12 gap-6
                   sm:grid-cols-6 sm:gap-4
                   lg:grid-cols-12 lg:gap-8"
      >
        {/* Avatar */}
        <span className="flex items-center justify-center col-span-12 sm:col-span-6 lg:col-span-3 lg:row-span-2 card overflow-hidden">
          <Image src="/avatar.jpg" alt="avatar" width={300} height={300} />
        </span>

        {/* Intro */}
        <p className="col-span-12 lg:col-span-9 card p-5 text-base sm:text-lg lg:text-xl text-text">
          {dict.intro}
        </p>

        {/* Interests */}
        <ul className="col-span-12 lg:col-span-9 card p-5 flex flex-wrap items-center gap-3">
          <li className="text-text text-base sm:text-lg font-bold border-r pr-4 border-border">
            {dict.sections.interests.title}
          </li>
          {dict.sections.interests.items.map((item) => (
            <li key={item} className="chip">
              {item}
            </li>
          ))}
        </ul>

        {/* Experience - Freelance */}
        <article className="col-span-12 lg:col-span-6 card p-6 sm:p-8">
          <section className="flex items-center justify-between border-b border-b-border pb-6 sm:pb-8">
            <header className="flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-text">
                {dict.sections.experience.freelance.title}
              </h3>
              <p className="text-muted text-sm">
                {dict.sections.experience.freelance.role}
              </p>
            </header>
            <span className="badge">
              {dict.sections.experience.freelance.period}
            </span>
          </section>
          <ul className="list-disc list-inside text-text text-sm mt-4 sm:mt-6 space-y-2">
            {dict.sections.experience.freelance.bullets.map((b) => (
              <li key={b} className="text-text">
                {b}
              </li>
            ))}
          </ul>
        </article>

        {/* Experience - Meetzed */}
        <article className="col-span-12 lg:col-span-6 card p-6 sm:p-8">
          <section className="flex items-center justify-between border-b border-b-border pb-6 sm:pb-8">
            <header className="flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-text">
                {dict.sections.experience.meetzed.title}
              </h3>
              <p className="text-muted text-sm">
                {dict.sections.experience.meetzed.role}
              </p>
            </header>
            <span className="badge">
              {dict.sections.experience.meetzed.period}
            </span>
          </section>
          <ul className="list-disc list-inside text-text text-sm mt-4 sm:mt-6 space-y-2">
            {dict.sections.experience.meetzed.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </article>

        {/* Design Tools */}
        <ul className="col-span-12 lg:col-span-6 card p-6 sm:p-8 flex flex-wrap items-center gap-3">
          <li className="text-text text-lg font-bold border-r pr-4 border-border">
            {dict.sections.designTools}
          </li>
          <li className="chip" style={{ background: "#360300", color: "#da9f4c" }}>
            Ai
          </li>
          <li className="chip" style={{ background: "#0b172a", color: "#74aaf2" }}>
            Ps
          </li>
          <li className="chip" style={{ background: "#59051e", color: "#d84b6f" }}>
            Id
          </li>
          <li className="chip" style={{ background: "#480d30", color: "#de6ff0" }}>
            Xd
          </li>
        </ul>

        {/* Education (stack) */}
        <section className="col-span-12 lg:col-span-6 lg:row-span-3 card p-6 sm:p-8 flex flex-col gap-4">
          <article className="flex items-center justify-between w-full border-b border-b-border pb-6">
            <span className="flex flex-col">
              <h2 className="text-text text-2xl font-bold">
                {dict.sections.education.highSchool.title}
              </h2>
              <p className="text-muted text-base">
                {dict.sections.education.highSchool.field}
              </p>
              <p className="text-muted text-sm">
                {dict.sections.education.highSchool.location}
              </p>
            </span>
            <span className="badge">
              {dict.sections.education.highSchool.period}
            </span>
          </article>

          <article className="flex items-center justify-between w-full border-b border-b-border pb-6">
            <span className="flex flex-col">
              <h2 className="text-text text-2xl font-bold">
                {dict.sections.education.diploma.title}
              </h2>
              <p className="text-muted text-base">
                {dict.sections.education.diploma.field}
              </p>
              <p className="text-muted text-sm">
                {dict.sections.education.diploma.location}
              </p>
            </span>
            <span className="badge">
              {dict.sections.education.diploma.period}
            </span>
          </article>

          <article className="flex items-center justify-between w-full">
            <span className="flex flex-col">
              <h2 className="text-text text-2xl font-bold">
                {dict.sections.education.graduation.title}
              </h2>
              <p className="text-muted text-base">
                {dict.sections.education.graduation.field}
              </p>
              <p className="text-muted text-sm">
                {dict.sections.education.graduation.location}
              </p>
            </span>
            <span className="badge">
              {dict.sections.education.graduation.period}
            </span>
          </article>
        </section>

        {/* Editing Tools */}
        <ul className="col-span-12 lg:col-span-6 card p-6 sm:p-8 flex flex-wrap items-center gap-3">
          <li className="text-text text-lg font-bold border-r pr-4 border-border">
            {dict.sections.editingTools}
          </li>
          <li className="chip" style={{ background: "#000155", color: "#a0a0f9" }}>
            Ae
          </li>
          <li className="chip" style={{ background: "#02035e", color: "#9997f9" }}>
            Pr
          </li>
        </ul>

        {/* Languages */}
        <ul className="col-span-12 lg:col-span-6 card p-6 sm:p-8 flex items-center gap-4">
          <li className="text-text text-lg font-bold border-r pr-4 border-border">
            {dict.sections.languages}
          </li>
          <li className="text-3xl sm:text-4xl">🇧🇴</li>
          <li className="text-3xl sm:text-4xl">🇬🇧</li>
          <li className="text-3xl sm:text-4xl">🇺🇸</li>
        </ul>

        {/* Projects */}
        <section className="col-span-12 card p-6 sm:p-8">
          <header className="flex items-center justify-between border-b border-b-border pb-4 sm:pb-6">
            <h3 className="text-2xl font-bold text-text">
              {dict.sections.projects.title}
            </h3>
          </header>
          <div className="mt-6 grid grid-cols-12 gap-4 sm:gap-6">
            {dict.sections.projects.items.map((p) => (
              <a
                key={p.name}
                href={p.link}
                className="col-span-12 md:col-span-6 lg:col-span-4 bg-surface-2 border border-border rounded-xl p-5 text-text hover:bg-surface transition-colors"
              >
                <h4 className="text-lg font-bold">{p.name}</h4>
                <p className="text-sm text-muted mt-2">{p.description}</p>
                <span className="inline-block mt-3 text-sm underline">Ver más →</span>
              </a>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="col-span-12 card p-6 sm:p-8">
          <header className="flex items-center justify-between border-b border-b-border pb-4 sm:pb-6">
            <h3 className="text-2xl font-bold text-text">
              {dict.sections.contact.title}
            </h3>
          </header>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-text">
              <span className="text-muted mr-2">
                {dict.sections.contact.emailLabel}:
              </span>
              <a
                className="underline"
                href={`mailto:${dict.sections.contact.email}`}
              >
                {dict.sections.contact.email}
              </a>
            </p>
            <ul className="flex gap-3">
              {dict.sections.contact.links.map((l) => (
                <li key={l.label}>
                  <a className="chip hover:bg-surface" href={l.url}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
