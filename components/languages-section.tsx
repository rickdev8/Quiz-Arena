"use client"

import { useState } from "react"
import { Lightbulb } from "lucide-react"

type Language = {
  name: string
  tag: string
  description: string
  fact: string
  accent: string
}

const languages: Language[] = [
  {
    name: "JavaScript",
    tag: "JS",
    description: "The language of the web. Runs in browsers and on servers.",
    fact: "It was created in just 10 days in 1995.",
    accent: "oklch(0.84 0.16 90)",
  },
  {
    name: "Python",
    tag: "PY",
    description: "Simple and powerful. Ideal for AI, data science, and automation.",
    fact: "Its name comes from the comedy group Monty Python.",
    accent: "oklch(0.65 0.2 255)",
  },
  {
    name: "Java",
    tag: "JV",
    description: "Robust and cross-platform: 'write once, run anywhere.'",
    fact: "More than 3 billion devices run Java.",
    accent: "oklch(0.62 0.2 30)",
  },
  {
    name: "C",
    tag: "C",
    description: "The foundation of modern programming. Fast, efficient, and timeless.",
    fact: "Almost every modern operating system uses C.",
    accent: "oklch(0.7 0.13 220)",
  },
  {
    name: "TypeScript",
    tag: "TS",
    description: "JavaScript with superpowers: static typing and better reliability.",
    fact: "It was created by Microsoft for large-scale applications.",
    accent: "oklch(0.6 0.22 270)",
  },
  {
    name: "C#",
    tag: "C#",
    description: "Powerful and versatile. Widely used for web, desktop, and game development.",
    fact: "It is the main language used with Unity, one of the world's most popular game engines.",
    accent: "oklch(0.68 0.22 310)",
  },
];

export function LanguagesSection() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section id="languages" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Programming languages"
          title="Choose your weapon code."
          subtitle="Each language presents unique challenges. Hover your mouse over it to discover interesting facts."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {languages.map((lang) => {
            const isActive = active === lang.name
            return (
              <article
                key={lang.name}
                onMouseEnter={() => setActive(lang.name)}
                onMouseLeave={() => setActive(null)}
                className="group relative overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1.5 hover:glow-cyan"
              >
                <div
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-50"
                  style={{ background: lang.accent }}
                  aria-hidden
                />
                <div className="flex items-center gap-4">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-xl font-mono text-lg font-bold"
                    style={{
                      color: lang.accent,
                      background: `color-mix(in oklch, ${lang.accent} 16%, transparent)`,
                      border: `1px solid color-mix(in oklch, ${lang.accent} 35%, transparent)`,
                    }}
                  >
                    {lang.tag}
                  </span>
                  <h3 className="font-mono text-xl font-bold text-foreground">
                    {lang.name}
                  </h3>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {lang.description}
                </p>

                <div
                  className={`mt-4 flex items-start gap-2 rounded-xl border border-border bg-background/40 p-3 text-xs transition-all duration-300 ${
                    isActive ? "opacity-100" : "opacity-70"
                  }`}
                >
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Fun fact:{" "}
                    </span>
                    {lang.fact}
                  </span>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-pretty text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
        {subtitle}
      </p>
    </div>
  )
}
