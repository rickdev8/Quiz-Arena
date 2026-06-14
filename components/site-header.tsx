"use client"

import { Terminal } from "lucide-react"

const navLinks = [
  { label: "Languages", href: "#languages" },
  { label: "Algorithms", href: "#algorithms" },
  { label: "Quiz", href: "#quiz" },
  { label: "Ranking", href: "#leaderboard" },
  { label: "Achievements", href: "#achievements" },
]

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between gap-4 rounded-2xl glass px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary glow-cyan">
            <Terminal className="h-5 w-5" />
          </span>
          <span className="font-mono text-sm font-bold tracking-tight text-foreground sm:text-base">
            Code Challenge <span className="text-primary">Arena</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#quiz"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
        >
          Play now
        </a>
      </div>
    </header>
  )
}
