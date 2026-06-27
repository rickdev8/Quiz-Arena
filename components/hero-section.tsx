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
      className="relative overflow-hidden px-4 pb-24 pt-44 sm:pt-44"
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

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Learn by playing • English + Code
          </span>

          <h1 className="mt-6 text-pretty font-mono text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-gradient">Code Challenge</span>
            <br />
            <span className="text-foreground">Arena</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Learn English, programming languages, and algorithms through interactive challenges. Level up, earn badges, and compete for the top of the leaderboard.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#quiz"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 glow-cyan"
            >
              <Play className="h-4 w-4 fill-current" />
              Start Challenge
            </a>

            <a
              href="#languages"
              className="group inline-flex items-center gap-2 rounded-xl glass px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              <Code2 className="h-4 w-4" />
              Explore Languages
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-4">
            {[
              { v: "5+", l: "Linguagens" },
              { v: "120+", l: "Desafios" },
              { v: "30+", l: "Conquistas" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl glass px-4 py-3 text-center">
                <dt className="font-mono text-2xl font-bold text-primary">
                  {s.v}
                </dt>
                <dd className="mt-1 text-xs text-muted-foreground">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Animated code window + QR code */}
        <div className="relative flex flex-col gap-5">
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-neon-cyan/20 via-neon-blue/10 to-neon-purple/20 blur-2xl" />
            <div className="relative rounded-2xl glass p-1 glow-cyan">
              <div className="rounded-xl bg-background/80">
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-destructive/80" />
                  <span className="h-3 w-3 rounded-full bg-gold/80" />
                  <span className="h-3 w-3 rounded-full bg-primary/80" />
                  <span className="ml-2 font-mono text-xs text-muted-foreground">
                    arena.ts
                  </span>
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
                  <code>
                    {codeLines.map((line, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="select-none text-muted-foreground/50">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-foreground/90">{line}</span>
                      </div>
                    ))}
                    <div className="mt-2 flex gap-4">
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
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-neon-purple/15 via-neon-blue/10 to-neon-cyan/15 blur-2xl" />
            <div className="relative rounded-2xl glass p-1 glow-cyan">
              <div className="rounded-xl bg-background/80">
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-destructive/80" />
                  <span className="h-3 w-3 rounded-full bg-gold/80" />
                  <span className="h-3 w-3 rounded-full bg-primary/80" />
                  <span className="ml-2 font-mono text-xs text-muted-foreground">
                    scan-me.qr
                  </span>
                </div>

                <div className="flex items-center gap-5 p-5">
                  <div className="rounded-xl bg-white p-2.5">
                    <QRCodeSVG
                      value={QUIZ_URL}
                      size={104}
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
                    <p className="mt-2 max-w-[14rem] text-sm leading-relaxed text-muted-foreground">
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