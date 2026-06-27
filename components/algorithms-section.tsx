"use client"

import { ArrowLeftRight, Search, Brain } from "lucide-react"
import { SectionHeading } from "./languages-section"

"use client"

import { Sparkles, Play, Code2, ArrowRight, Smartphone } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

// 🆕 Troque esta variável pelo link real assim que o front estiver no ar.
// Ex: "https://quiz-arena.vercel.app"
const QUIZ_URL = "https://SEU-LINK-AQUI.vercel.app"

const codeLines = [
  "function levelUp(player) {",
  "  player.xp += solveChallenge();",
  "  if (player.xp > 1000) unlock('badge');",
  "  return player;",
  "}",
  "const arena = new CodeArena();",
  "arena.start({ mode: 'english+algorithms' });",
]

const floatingTokens = ["{ }", "</>", "=>", "[ ]", "&&", "404", "0x1F", "fn()"]

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-x-hidden overflow-y-visible px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36 lg:px-8 lg:pt-44"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden />
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-neon-blue/30 blur-[120px] animate-pulse-glow"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-neon-purple/30 blur-[130px] animate-pulse-glow"
        aria-hidden
      />

      {/* Floating code tokens */}
      {floatingTokens.map((token, i) => (
        <span
          key={token}
          className="pointer-events-none absolute hidden select-none font-mono text-sm text-primary/40 md:block animate-float-slow"
          style={{
            left: `${8 + ((i * 12) % 85)}%`,
            top: `${15 + ((i * 9) % 60)}%`,
            animationDelay: `${i * 0.6}s`,
          }}
          aria-hidden
        >
          {token}
        </span>
      ))}

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Learn by playing • English + Code
          </span>

          <h1 className="mt-6 text-pretty font-mono text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-gradient">Code Challenge</span>
            <br />
            <span className="text-foreground">Arena</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Learn English, programming languages, and algorithms through interactive challenges. Level up, earn badges, and compete for the top of the leaderboard.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#quiz"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 glow-cyan sm:px-6 sm:py-3.5"
            >
              <Play className="h-4 w-4 fill-current" />
              Start Challenge
            </a>

            <a
              href="#languages"
              className="group inline-flex items-center gap-2 rounded-xl glass px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:text-primary sm:px-6 sm:py-3.5"
            >
              <Code2 className="h-4 w-4" />
              Explore Languages
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-3 sm:mt-12 sm:gap-4">
            {[
              { v: "5+", l: "Linguagens" },
              { v: "120+", l: "Desafios" },
              { v: "30+", l: "Conquistas" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl glass px-2 py-3 text-center sm:px-4">
                <dt className="font-mono text-xl font-bold text-primary sm:text-2xl">
                  {s.v}
                </dt>
                <dd className="mt-1 text-[11px] text-muted-foreground sm:text-xs">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Animated code window + QR code */}
        <div className="relative flex w-full min-w-0 flex-col gap-5 lg:pr-1">
          <div className="relative min-w-0">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-neon-cyan/20 via-neon-blue/10 to-neon-purple/20 blur-2xl" />
            <div className="relative min-w-0 rounded-2xl glass p-1 glow-cyan">
              <div className="min-w-0 rounded-xl bg-background/80">
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-destructive/80" />
                  <span className="h-3 w-3 rounded-full bg-gold/80" />
                  <span className="h-3 w-3 rounded-full bg-primary/80" />
                  <span className="ml-2 font-mono text-xs text-muted-foreground">
                    arena.ts
                  </span>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed sm:p-5 sm:text-[13px]">
                  <code>
                    {codeLines.map((line, i) => (
                      <div key={i} className="flex gap-3 sm:gap-4">
                        <span className="select-none text-muted-foreground/50">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="whitespace-pre text-foreground/90">{line}</span>
                      </div>
                    ))}
                    <div className="mt-2 flex gap-3 sm:gap-4">
                      <span className="select-none text-muted-foreground/50">
                        08
                      </span>
                      <span className="inline-block h-4 w-2 animate-pulse bg-primary" />
                    </div>
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* 🆕 QR code window — mesmo estilo de "janela" do code window acima */}
          <div className="relative min-w-0">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-neon-purple/15 via-neon-blue/10 to-neon-cyan/15 blur-2xl" />
            <div className="relative min-w-0 rounded-2xl glass p-1 glow-cyan">
              <div className="min-w-0 rounded-xl bg-background/80">
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-destructive/80" />
                  <span className="h-3 w-3 rounded-full bg-gold/80" />
                  <span className="h-3 w-3 rounded-full bg-primary/80" />
                  <span className="ml-2 font-mono text-xs text-muted-foreground">
                    scan-me.qr
                  </span>
                </div>

                <div className="flex flex-col items-center gap-4 p-4 text-center sm:flex-row sm:gap-5 sm:p-5 sm:text-left">
                  <div className="shrink-0 rounded-xl bg-white p-2.5">
                    <QRCodeSVG
                      value={QUIZ_URL}
                      size={96}
                      bgColor="#ffffff"
                      fgColor="#0a0a0f"
                      level="M"
                    />
                  </div>

                  <div>
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary">
                      <Smartphone className="h-3.5 w-3.5" />
                      Play on your phone
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:max-w-[14rem]">
                      Scan to open the Arena and join the challenge from your own device.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}