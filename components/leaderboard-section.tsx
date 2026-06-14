"use client"

import { Medal, Crown, TrendingUp } from "lucide-react"
import { SectionHeading } from "./languages-section"

type Player = {
  rank: number
  name: string
  score: number
  level: string
}

const players: Player[] = [
  { rank: 1, name: "Ana_Dev", score: 9840, level: "Code Legend" },
  { rank: 2, name: "ByteKnight", score: 9120, level: "Code Legend" },
  { rank: 3, name: "Lia.codes", score: 8760, level: "Mastermind" },
  { rank: 4, name: "joao_404", score: 7430, level: "Architect" },
  { rank: 5, name: "PixelPaula", score: 6890, level: "Engineer" },
  { rank: 6, name: "Neo_Script", score: 6210, level: "Developer" },
  { rank: 7, name: "MariaLogic", score: 5580, level: "Coder" },
];
const medalColor: Record<number, string> = {
  1: "var(--gold)",
  2: "var(--silver)",
  3: "var(--bronze)",
}

export function LeaderboardSection() {
  const podium = [players[1], players[0], players[2]] 

  return (
    <section id="leaderboard" className="relative px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Ranking"
          title="Top Arena players"
          subtitle="Step onto the podium and prove you're the best coder in the class."
        />

        {/* Podium */}
        <div className="mt-12 grid grid-cols-3 items-end gap-3 sm:gap-6">
          {podium.map((p) => {
            const heights: Record<number, string> = {
              1: "h-40",
              2: "h-32",
              3: "h-24",
            }
            return (
              <div key={p.rank} className="flex flex-col items-center">
                <div className="relative mb-3">
                  {p.rank === 1 && (
                    <Crown className="absolute -top-7 left-1/2 h-6 w-6 -translate-x-1/2 text-gold" />
                  )}
                  <span
                    className="flex h-16 w-16 items-center justify-center rounded-2xl font-mono text-lg font-bold glass"
                    style={{
                      color: medalColor[p.rank],
                      boxShadow: `0 0 24px -6px ${medalColor[p.rank]}`,
                    }}
                  >
                    {p.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <p className="max-w-full truncate text-sm font-semibold text-foreground">
                  {p.name}
                </p>
                <p className="font-mono text-xs text-primary">
                  {p.score.toLocaleString("pt-BR")}
                </p>
                <div
                  className={`mt-3 flex w-full ${heights[p.rank]} items-start justify-center rounded-t-xl glass pt-3`}
                  style={{
                    borderTop: `2px solid ${medalColor[p.rank]}`,
                  }}
                >
                  <span
                    className="font-mono text-2xl font-extrabold"
                    style={{ color: medalColor[p.rank] }}
                  >
                    {p.rank}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* List */}
        <div className="mt-10 overflow-hidden rounded-2xl glass">
          {players.map((p, i) => (
            <div
              key={p.rank}
              className={`flex items-center gap-4 px-5 py-4 transition-colors hover:bg-primary/5 ${
                i !== players.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="flex w-8 justify-center">
                {p.rank <= 3 ? (
                  <Medal
                    className="h-5 w-5"
                    style={{ color: medalColor[p.rank] }}
                  />
                ) : (
                  <span className="font-mono text-sm text-muted-foreground">
                    {p.rank}
                  </span>
                )}
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 font-mono text-xs font-bold text-primary">
                {p.name.slice(0, 2).toUpperCase()}
              </span>
              <span className="flex-1 text-sm font-medium text-foreground">
                {p.name}
              </span>
              <span className="hidden rounded-full border border-border px-3 py-1 text-xs text-muted-foreground sm:inline">
                {p.level}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-sm font-semibold text-foreground">
                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                {p.score.toLocaleString("pt-BR")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
