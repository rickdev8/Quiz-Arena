"use client"

import {
  Flame,
  Rocket,
  Zap,
  Brain,
  Trophy,
  Crown,
  Lock,
  type LucideIcon,
} from "lucide-react"
import { SectionHeading } from "./languages-section"

type Achievement = {
  name: string
  description: string
  icon: LucideIcon
  unlocked: boolean
  tint: string
}

const achievements: Achievement[] = [
  {
    name: "Rookie Challenger",
    description: "Play your first game.",
    icon: Rocket,
    unlocked: true,
    tint: "var(--neon-cyan)",
  },
  {
    name: "Hot Streak",
    description: "Answer 5 questions correctly in a row.",
    icon: Flame,
    unlocked: true,
    tint: "var(--bronze)",
  },
  {
    name: "Speed Demon",
    description: "Finish a challenge in record time.",
    icon: Zap,
    unlocked: true,
    tint: "var(--neon-blue)",
  },
  {
    name: "Brain Power",
    description: "Reach a score of 1,000 points.",
    icon: Brain,
    unlocked: true,
    tint: "var(--neon-purple)",
  },
  {
    name: "Top 10",
    description: "Enter the Top 10 players on the leaderboard.",
    icon: Trophy,
    unlocked: true,
    tint: "var(--silver)",
  },
  {
    name: "Champion",
    description: "Claim the #1 position on the leaderboard.",
    icon: Crown,
    unlocked: true,
    tint: "var(--gold)",
  },
];

export function AchievementsSection() {
  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <section id="achievements" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Achievements"
          title="Unlock epic badges"
          subtitle="Every victory brings a reward. Collect them all and become a legend."
        />

        <p className="mt-6 text-center font-mono text-sm text-muted-foreground">
          <span className="text-primary">{unlockedCount}</span> of{" "}
          {achievements.length} unlocked
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a) => (
            <article
              key={a.name}
              className={`group relative overflow-hidden rounded-2xl glass p-6 transition-all duration-300 ${
                a.unlocked
                  ? "hover:-translate-y-1.5 hover:glow-cyan"
                  : "opacity-60"
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{
                    color: a.unlocked ? a.tint : "var(--muted-foreground)",
                    background: a.unlocked
                      ? `color-mix(in oklch, ${a.tint} 16%, transparent)`
                      : "var(--muted)",
                    boxShadow: a.unlocked
                      ? `0 0 22px -8px ${a.tint}`
                      : "none",
                  }}
                >
                  {a.unlocked ? (
                    <a.icon className="h-6 w-6" />
                  ) : (
                    <Lock className="h-6 w-6" />
                  )}
                </span>
                <div>
                  <h3 className="font-mono text-base font-bold text-foreground">
                    {a.name}
                  </h3>
                  <span
                    className={`text-xs font-medium ${
                      a.unlocked ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {a.unlocked ? "Unlocked" : "Locked"}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {a.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
