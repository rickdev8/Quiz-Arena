"use client"

import { ArrowLeftRight, Search, Brain } from "lucide-react"
import { SectionHeading } from "./languages-section"

function BubbleSortViz() {
  const bars = [40, 75, 30, 90, 55, 65]
  return (
    <div className="flex h-24 items-end justify-center gap-2">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-5 rounded-t-md bg-gradient-to-t from-neon-blue to-neon-cyan transition-all"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  )
}

function BinarySearchViz() {

  const values = [1, 3, 5, 7, 9, 11]
  return (
    <div className="flex h-24 flex-col items-center justify-center gap-3">
      <div className="flex gap-1 sm:gap-1.5">
        {values.map((n, i) => (
          <span
            key={n}
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-[11px] transition-colors sm:h-8 sm:w-8 sm:text-xs ${
              i === 4
                ? "bg-primary text-primary-foreground glow-cyan"
                : i >= 3
                  ? "bg-primary/15 text-primary"
                  : "bg-background/50 text-muted-foreground/50"
            }`}
          >
            {n}
          </span>
        ))}
      </div>
      <span className="font-mono text-xs text-muted-foreground">
        target = 9 → log₂(n) steps
      </span>
    </div>
  )
}

function LogicViz() {
  return (
    <div className="flex h-24 flex-wrap items-center justify-center gap-2 font-mono text-sm sm:gap-3">
      <span className="rounded-lg bg-background/50 px-3 py-1.5 text-foreground">
        true
      </span>
      <span className="text-primary">&&</span>
      <span className="rounded-lg bg-background/50 px-3 py-1.5 text-foreground">
        false
      </span>
      <span className="text-muted-foreground">=</span>
      <span className="rounded-lg bg-destructive/20 px-3 py-1.5 text-destructive">
        false
      </span>
    </div>
  )
}

const algorithms = [
  {
    name: "Bubble Sort",
    icon: ArrowLeftRight,
    description:
      "Watch numbers move into place as adjacent elements are compared and swapped.",
    complexity: "O(n²)",
    viz: <BubbleSortViz />,
  },
  {
    name: "Binary Search",
    icon: Search,
    description:
      "Find a target value in seconds by repeatedly splitting a sorted list in half.",
    complexity: "O(log n)",
    viz: <BinarySearchViz />,
  },
  {
    name: "Logic Challenges",
    icon: Brain,
    description:
      "Test your problem-solving skills with Boolean logic and decision-making puzzles.",
    complexity: "Boolean",
    viz: <LogicViz />,
  },
];

export function AlgorithmsSection() {
  return (
    <section
      id="algorithms"
      className="relative overflow-x-hidden px-4 py-24 sm:px-6 lg:px-8"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-neon-purple/15 blur-[120px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Algorithms"
          title="See the logic in action."
          subtitle="Abstract concepts become visual challenges that are easy to understand."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-4 lg:gap-6">
          {algorithms.map((algo) => (
            <article
              key={algo.name}
              className="group min-w-0 rounded-2xl glass p-4 transition-all duration-300 hover:-translate-y-1.5 hover:glow-cyan md:p-4 lg:p-6"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <algo.icon className="h-5 w-5" />
                </span>
                <span className="shrink-0 rounded-full border border-border bg-background/50 px-3 py-1 font-mono text-xs text-primary">
                  {algo.complexity}
                </span>
              </div>

              <div className="my-6 min-w-0 overflow-x-auto rounded-xl border border-border bg-background/40 p-4">
                {algo.viz}
              </div>

              <h3 className="font-mono text-lg font-bold text-foreground">
                {algo.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {algo.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}