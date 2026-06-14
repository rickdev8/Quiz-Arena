import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { LanguagesSection } from "@/components/languages-section"
import { AlgorithmsSection } from "@/components/algorithms-section"
import { QuizArena } from "@/components/quiz-arena"
import { LeaderboardSection } from "@/components/leaderboard-section"
import { AchievementsSection } from "@/components/achievements-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      <HeroSection />
      <LanguagesSection />
      <AlgorithmsSection />
      <QuizArena />
      <LeaderboardSection />
      <AchievementsSection />
      <SiteFooter />
    </main>
  )
}
