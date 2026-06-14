import { Terminal, GraduationCap, Globe, Cpu } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border px-4 py-14">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary glow-cyan">
                <Terminal className="h-5 w-5" />
              </span>
              <span className="font-mono text-base font-bold text-foreground">
                Code Challenge <span className="text-primary">Arena</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Project developed for the Technology and English Fair at the school. 
              Combining language learning and programming through interactive challenges and gamification.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
              Fair Theme
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                 Education & Technology
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                 English applied to the code
              </li>
              <li className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-primary" />
                 Logic and algorithms
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
             Navigation
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                { label: "Languages", href: "#languages" },
                { label: "Algorithms", href: "#algorithms" },
                { label: "Quiz Arena", href: "#quiz" },
                { label: "Ranking", href: "#leaderboard" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Code Challenge Arena • Feira de
            Ciências e Tecnologia
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Built with React • Learn • Code • Compete
          </p>
        </div>
      </div>
    </footer>
  )
}
