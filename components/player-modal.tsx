"use client";

import { useEffect } from "react";
import {
  X,
  Trophy,
  Rocket,
  Flame,
  Zap,
  Brain,
  ListOrdered,
  Crown,
} from "lucide-react";
import type { Player, Badge } from "./leaderboard-section";

const medalColor: Record<number, string> = {
  1: "var(--gold)",
  2: "var(--silver)",
  3: "var(--bronze)",
};

const BADGE_LABEL: Record<Badge, string> = {
  rookie: "Rookie Challenger",
  hot_streak: "Hot Streak",
  speed_demon: "Speed Demon",
  brain_power: "Brain Power",
  top_10: "Top 10",
  champion: "Champion",
};

const BADGE_DESCRIPTION: Record<Badge, string> = {
  rookie: "Play your first game.",
  hot_streak: "Answer 5 questions correctly in a row.",
  speed_demon: "Finish a challenge in record time.",
  brain_power: "Reach a score of 1,000 points.",
  top_10: "Enter the Top 10 players on the leaderboard.",
  champion: "Claim the #1 position on the leaderboard.",
};

const BADGE_ICON: Record<Badge, React.ReactNode> = {
  rookie: <Rocket className="h-5 w-5" />,
  hot_streak: <Flame className="h-5 w-5" />,
  speed_demon: <Zap className="h-5 w-5" />,
  brain_power: <Brain className="h-5 w-5" />,
  top_10: <ListOrdered className="h-5 w-5" />,
  champion: <Crown className="h-5 w-5" />,
};

type PlayerWithBadges = Player & { badges?: Badge[] };

export function PlayerModal({
  player,
  onClose,
}: {
  player: PlayerWithBadges | null;
  onClose: () => void;
}) {
  // Fecha com ESC
  useEffect(() => {
    if (!player) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [player, onClose]);

  if (!player) return null;

  const badges = player.badges ?? [];
  const accent = medalColor[player.rank] ?? "var(--primary)";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl glass glow-cyan p-1"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-[1.35rem] bg-background/80 p-6 sm:p-7">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <span
              className="flex h-16 w-16 items-center justify-center rounded-2xl font-mono text-lg font-bold"
              style={{
                color: accent,
                boxShadow: `0 0 24px -6px ${accent}`,
                border: `1px solid ${accent}40`,
              }}
            >
              {player.nick.slice(0, 2).toUpperCase()}
            </span>

            <h3 className="mt-4 text-xl font-bold text-foreground">
              {player.nick}
            </h3>

            <span className="mt-1 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              {player.level}
            </span>

            <div className="mt-4 flex items-center gap-2 font-mono text-2xl font-extrabold text-gradient">
              <Trophy className="h-5 w-5 text-gold" />
              {player.score.toLocaleString("pt-BR")}
            </div>
            <p className="text-xs text-muted-foreground">
              #{player.rank} on the leaderboard
            </p>
          </div>

          {/* Badges */}
          <div className="mt-6">
            <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              Badges
            </p>

            {badges.length > 0 ? (
              <div className="mt-3 grid grid-cols-1 gap-2">
                {badges.map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2.5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      {BADGE_ICON[badge]}
                    </span>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-foreground">
                        {BADGE_LABEL[badge]}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {BADGE_DESCRIPTION[badge]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 rounded-xl border border-border bg-background/50 px-3 py-3 text-center text-xs text-muted-foreground">
                No badges unlocked yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}