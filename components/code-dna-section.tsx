"use client"

import { useEffect, useState } from "react"
import { Sparkles, Terminal } from "lucide-react"
import { SectionHeading } from "./languages-section"

// ─── Sequência de "DNA" que vai se montar ──────────────────────────────────
// Cada token representa uma peça que voa e se encaixa, em ordem, formando
// a linha de código. O array final junta tudo pra exibir o código completo.

type Token = {
  id: string
  text: string
}

const SEQUENCE: Token[] = [
  { id: "t1", text: "function" },
  { id: "t2", text: "isPalindrome" },
  { id: "t3", text: "(word)" },
  { id: "t4", text: "{" },
  { id: "t5", text: "  return" },
  { id: "t6", text: "word" },
  { id: "t7", text: "===" },
  { id: "t8", text: "reverse(word);" },
  { id: "t9", text: "}" },
]

const OUTPUT_LINES = [
  "> isPalindrome('level')",
  "true ✓",
]

// Posições iniciais "soltas" pra cada token flutuar antes de se encaixar.
// Espalhadas pela área da cena, com leve variação de ângulo/posição.
const SCATTER_POSITIONS = [
  { x: 8, y: 12, r: -8 },
  { x: 78, y: 8, r: 6 },
  { x: 15, y: 70, r: 10 },
  { x: 85, y: 60, r: -6 },
  { x: 45, y: 5, r: -4 },
  { x: 5, y: 45, r: 7 },
  { x: 90, y: 30, r: -10 },
  { x: 60, y: 80, r: 5 },
  { x: 30, y: 85, r: -5 },
]

type Phase = "scattered" | "assembling" | "complete" | "running" | "dissolving"

const PHASE_DURATIONS: Record<Phase, number> = {
  scattered: 1400,
  assembling: SEQUENCE.length * 550 + 400,
  complete: 1200,
  running: 2200,
  dissolving: 900,
}

export function CodeDnaSection() {
  const [phase, setPhase] = useState<Phase>("scattered")
  const [assembledCount, setAssembledCount] = useState(0)

  // Máquina de estados do ciclo de animação
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (phase === "scattered") {
      timeout = setTimeout(() => setPhase("assembling"), PHASE_DURATIONS.scattered)
    } else if (phase === "assembling") {
      timeout = setTimeout(() => setPhase("complete"), PHASE_DURATIONS.assembling)
    } else if (phase === "complete") {
      timeout = setTimeout(() => setPhase("running"), PHASE_DURATIONS.complete)
    } else if (phase === "running") {
      timeout = setTimeout(() => setPhase("dissolving"), PHASE_DURATIONS.running)
    } else if (phase === "dissolving") {
      timeout = setTimeout(() => {
        setAssembledCount(0)
        setPhase("scattered")
      }, PHASE_DURATIONS.dissolving)
    }

    return () => clearTimeout(timeout)
  }, [phase])

  // Durante "assembling", incrementa quantos tokens já se encaixaram,
  // um por um, em intervalos.
  useEffect(() => {
    if (phase !== "assembling") return

    let i = 0
    const interval = setInterval(() => {
      i += 1
      setAssembledCount(i)
      if (i >= SEQUENCE.length) clearInterval(interval)
    }, 550)

    return () => clearInterval(interval)
  }, [phase])

  const isScattered = phase === "scattered" || phase === "dissolving"
  const isAssembling = phase === "assembling"
  const isDone = phase === "complete" || phase === "running"

  return (
    <section id="code-dna" className="relative px-4 py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-purple/10 blur-[140px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Code DNA"
          title="Watch vocabulary become code"
          subtitle="Programming keywords float, lock into place, and run — live, in real time."
        />

        <div className="mt-12 rounded-3xl glass glow-cyan p-1">
          <div className="relative h-[420px] overflow-hidden rounded-[1.35rem] bg-background/80 sm:h-[460px]">
            {/* Background grid, mesmo padrão do site */}
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden />

            {/* Cena: tokens flutuando ou código montado */}
            <div className="relative h-full w-full">
              {SEQUENCE.map((token, i) => {
                const scatter = SCATTER_POSITIONS[i % SCATTER_POSITIONS.length]
                const isAssembled = isDone || (isAssembling && i < assembledCount)

                return (
                  <div
                    key={token.id}
                    className="absolute font-mono text-sm font-semibold transition-all ease-out sm:text-base"
                    style={{
                      left: isAssembled ? "50%" : `${scatter.x}%`,
                      top: isAssembled
                        ? `calc(50% - ${(SEQUENCE.length / 2 - i) * 28}px)`
                        : `${scatter.y}%`,
                      transform: isAssembled
                        ? "translate(-50%, 0) rotate(0deg)"
                        : `translate(-50%, -50%) rotate(${scatter.r}deg)`,
                      transitionDuration: isAssembled ? "700ms" : "2800ms",
                      opacity: isScattered ? 0.5 : 1,
                      color: isAssembled ? "var(--foreground)" : undefined,
                    }}
                  >
                    <span
                      className={`rounded-md px-2 py-0.5 ${
                        isAssembled
                          ? "bg-transparent text-foreground/90"
                          : "border border-primary/30 bg-primary/10 text-primary"
                      }`}
                    >
                      {token.text}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Terminal de output, aparece só na fase "running" */}
            <div
              className={`absolute bottom-5 left-5 right-5 rounded-xl border border-border bg-background/90 px-4 py-3 transition-all duration-500 sm:left-1/2 sm:w-80 sm:-translate-x-1/2 ${
                phase === "running"
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0"
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Terminal className="h-3.5 w-3.5 text-primary" />
                output
              </div>
              <div className="mt-2 font-mono text-xs leading-relaxed text-foreground/90">
                {OUTPUT_LINES.map((line, i) => (
                  <p key={i} className={i === OUTPUT_LINES.length - 1 ? "text-primary" : ""}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Indicador de fase, cantinho superior */}
            <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1 font-mono text-[11px] text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" />
              {phase === "scattered" && "scattering keywords..."}
              {phase === "assembling" && "assembling code..."}
              {phase === "complete" && "ready to run"}
              {phase === "running" && "running..."}
              {phase === "dissolving" && "resetting..."}
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Every keyword you see is real programming vocabulary — in English, exactly as it's used in code.
        </p>
      </div>
    </section>
  )
}