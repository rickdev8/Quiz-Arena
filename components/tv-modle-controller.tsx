"use client"

import { useCallback, useEffect, useState } from "react"
import { Tv } from "lucide-react"
import { useIdleTimer } from "@/app/utils/use-idle-timer"

const IDLE_TIMEOUT_MS = 5000

const TV_MODE_SECTIONS = [
  "top",
  "code-dna",
  "languages",
  "algorithms",
  "leaderboard",
  "achievements",
  "footer",
]

const TIME_PER_SECTION_MS = 7000

export function TvModeController() {
  const isIdle = useIdleTimer(IDLE_TIMEOUT_MS)

  const [tvModeActive, setTvModeActive] = useState(false)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  useEffect(() => {
    if (isIdle && !tvModeActive) {
      setTvModeActive(true)
      setCurrentSectionIndex(0)
    }
  }, [isIdle, tvModeActive])

  useEffect(() => {
    if (!tvModeActive) return

    const exitTvMode = () => {
      setTvModeActive(false)
    }

    window.addEventListener("mousedown", exitTvMode)
    window.addEventListener("mousemove", exitTvMode)
    window.addEventListener("touchstart", exitTvMode)
    window.addEventListener("keydown", exitTvMode)
    window.addEventListener("wheel", exitTvMode)

    return () => {
      window.removeEventListener("mousedown", exitTvMode)
      window.removeEventListener("mousemove", exitTvMode)
      window.removeEventListener("touchstart", exitTvMode)
      window.removeEventListener("keydown", exitTvMode)
      window.removeEventListener("wheel", exitTvMode)
    }
  }, [tvModeActive])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)

    if (!element) return

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }, [])

  useEffect(() => {
    if (!tvModeActive) return

    scrollToSection(TV_MODE_SECTIONS[currentSectionIndex])

    const timeout = setTimeout(() => {
      setCurrentSectionIndex(
        (prev) => (prev + 1) % TV_MODE_SECTIONS.length
      )
    }, TIME_PER_SECTION_MS)

    return () => clearTimeout(timeout)
  }, [tvModeActive, currentSectionIndex, scrollToSection])

  if (!tvModeActive) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      <div className="absolute inset-0 shadow-[inset_0_0_120px_40px_rgba(0,0,0,0.35)]" />

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-primary/30 bg-background/80 px-4 py-2 font-mono text-xs text-primary backdrop-blur-sm">
        <Tv className="h-3.5 w-3.5 animate-pulse" />
        Presentation mode — touch anywhere to exit
      </div>
    </div>
  )
}