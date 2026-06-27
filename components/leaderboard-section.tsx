"use client";

import { Medal, Crown, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "./languages-section";
import { useEffect, useMemo, useState } from "react";
import { ListPlayers } from "@/app/services/list-players-service";
import { PlayerModal } from "./player-modal";


export type Player = {
  rank: number;
  nick: string;
  score: number;
  level: string;
  badges?: Badge[]; // 🆕
};

export type Badge =
  | "rookie"
  | "hot_streak"
  | "speed_demon"
  | "brain_power"
  | "top_10"
  | "champion";


const medalColor: Record<number, string> = {
  1: "var(--gold)",
  2: "var(--silver)",
  3: "var(--bronze)",
};

// 🆕 ajuste esse valor pra controlar quantos players aparecem por página
const PLAYERS_PER_PAGE = 10;

export function LeaderboardSection(data: any) {
  const [players, setPlayers] = useState<Player[]>([])
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null) // 🆕
  const [currentPage, setCurrentPage] = useState(1) // 🆕

  useEffect(() => {
    setPlayers(data.players)
    setCurrentPage(1) // 🆕 reseta a página quando os dados mudam
  }, [data])

  const podium = [players[1], players[0], players[2]].filter(Boolean);

  // 🆕 cálculo de paginação
  const totalPages = Math.max(1, Math.ceil(players.length / PLAYERS_PER_PAGE));

  const paginatedPlayers = useMemo(() => {
    const start = (currentPage - 1) * PLAYERS_PER_PAGE;
    return players.slice(start, start + PLAYERS_PER_PAGE);
  }, [players, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  return (
    <section id="leaderboard" className="relative px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Ranking"
          title="Top Arena players"
          subtitle="Step onto the podium and prove you're the best coder in the class."
        />

        {/* Podium */}
        {players.length >= 3 && (
          <div className="mt-12 grid grid-cols-3 items-end gap-3 sm:gap-6">
            {podium.map((p) => {
              const heights: Record<number, string> = {
                1: "h-40",
                2: "h-32",
                3: "h-24",
              };

              return (
                <button
                  type="button"
                  key={p.rank}
                  onClick={() => setSelectedPlayer(p)}
                  className="flex flex-col items-center transition-transform hover:scale-[1.03]"
                >
                  <div className="relative mb-3">
                    {p.rank === 1 && (
                      <Crown className="absolute -top-7 left-1/2 h-6 w-6 -translate-x-1/2 text-gold" />
                    )}

                    <span
                      className="glass flex h-16 w-16 items-center justify-center rounded-2xl font-mono text-lg font-bold"
                      style={{
                        color: medalColor[p.rank],
                        boxShadow: `0 0 24px -6px ${medalColor[p.rank]}`,
                      }}
                    >
                      {p.nick.slice(0, 2).toUpperCase()}
                    </span>
                  </div>

                  <p className="max-w-full truncate text-sm font-semibold text-foreground">
                    {p.nick}
                  </p>

                  <p className="font-mono text-xs text-primary">
                    {p.score.toLocaleString("pt-BR")}
                  </p>

                  <div
                    className={`mt-3 flex w-full ${
                      heights[p.rank]
                    } items-start justify-center rounded-t-xl glass pt-3`}
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
                </button>
              );
            })}
          </div>
        )}

        {/* Lista Completa */}
        <div className="mt-10 overflow-hidden rounded-2xl glass">
          {paginatedPlayers.map((p, i) => (
            <button
              type="button"
              key={`${p.nick}-${p.rank}`}
              onClick={() => setSelectedPlayer(p)}
              className={`flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-primary/5 ${
                i !== paginatedPlayers.length - 1
                  ? "border-b border-border"
                  : ""
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
                {p.nick.slice(0, 2).toUpperCase()}
              </span>

              <span className="flex-1 text-sm font-medium text-foreground">
                {p.nick}
              </span>

              <span className="hidden rounded-full border border-border px-3 py-1 text-xs text-muted-foreground sm:inline">
                {p.level}
              </span>

              <span className="flex items-center gap-1.5 font-mono text-sm font-semibold text-foreground">
                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                {p.score.toLocaleString("pt-BR")}
              </span>
            </button>
          ))}

          {players.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              Carregando ranking...
            </div>
          )}
        </div>

        {players.length > PLAYERS_PER_PAGE && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              style={{cursor: "pointer"}}
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="glass flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-opacity disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="font-mono text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </span>

            <button
              style={{cursor: "pointer"}}
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="glass flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-opacity disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>


      <PlayerModal
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      />
    </section>
  );
}