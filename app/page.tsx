"use client"

import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { LanguagesSection } from "@/components/languages-section"
import { AlgorithmsSection } from "@/components/algorithms-section"
import { QuizArena } from "@/components/quiz-arena"
import { LeaderboardSection, Player } from "@/components/leaderboard-section"
import { AchievementsSection } from "@/components/achievements-section"
import { SiteFooter } from "@/components/site-footer"
import { useCallback, useEffect, useState } from "react"
import { ListPlayers } from "./services/list-players-service"
import { CodeDnaSection } from "@/components/code-dna-section"
import { TvModeController } from "@/components/tv-modle-controller"

export default function Page() {
  const [players, setPlayers] = useState<Player[]>([]);

  const GetPlayers = useCallback(async () => {
    try {
      const users = await ListPlayers();
      setPlayers(users.data)
    } catch (error) {
      console.error("Erro ao buscar jogadores:", error);
    }
  }, []);

  useEffect(() => {
    GetPlayers();
  }, [GetPlayers]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      <HeroSection />
      <CodeDnaSection />
      <LanguagesSection />
      <AlgorithmsSection />
      <QuizArena updateList={GetPlayers} />
      <LeaderboardSection players={players} />
      <AchievementsSection />
      <SiteFooter />
      <TvModeController/>
    </main>
  )
}