"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Timer, Trophy, Check, X, RotateCcw, ChevronRight, Flame, Zap, Star, Skull } from "lucide-react"
import { SectionHeading } from "./languages-section"
import NicknameScreen from "./nick-form"
import { postUser } from "@/app/services/post-user-service"

// ─── Types ────────────────────────────────────────────────────────────────────

type Difficulty = "easy" | "medium" | "hard" | "boss"

type Question = {
  category: string
  difficulty: Difficulty
  question: string
  options: string[]
  answer: number
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TIME_PER_QUESTION = 15
const POINTS_PER_SECOND = 10
const MIN_POINTS = 10


const DIFFICULTY_PICKS: Record<Difficulty, number> = {
  easy: 3,
  medium: 3,
  hard: 3,
  boss: 1,
}

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
  boss: "Final Boss",
}

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
  medium: "text-amber-400  border-amber-400/40  bg-amber-400/10",
  hard: "text-orange-500 border-orange-500/40 bg-orange-500/10",
  boss: "text-red-500    border-red-500/40    bg-red-500/10",
}

const DIFFICULTY_ICON: Record<Difficulty, React.ReactNode> = {
  easy: <Star className="h-3 w-3" />,
  medium: <Flame className="h-3 w-3" />,
  hard: <Zap className="h-3 w-3" />,
  boss: <Skull className="h-3 w-3" />,
}

// ─── Question Pool (50+ questions) ───────────────────────────────────────────

const QUESTION_POOL: Question[] = [
  // ── EASY (15 questions) ───────────────────────────────────────────────────
  {
    difficulty: "easy",
    category: "Vocabulary",
    question: "In programming, what is a 'bug'?",
    options: ["A small insect", "An error in the code", "A type of computer", "A fast algorithm"],
    answer: 1,
  },
  {
    difficulty: "easy",
    category: "Vocabulary",
    question: "What does 'print' do in most programming languages?",
    options: ["Saves a file", "Deletes data", "Shows text on the screen", "Creates a loop"],
    answer: 2,
  },
  {
    difficulty: "easy",
    category: "Vocabulary",
    question: "What is a 'variable' in programming?",
    options: ["A type of error", "A box that stores data", "A way to repeat code", "A kind of computer"],
    answer: 1,
  },
  {
    difficulty: "easy",
    category: "Vocabulary",
    question: "What does 'loop' mean in programming?",
    options: ["A circle shape", "Repeating the same code", "Deleting a file", "Connecting to the internet"],
    answer: 1,
  },
  {
    difficulty: "easy",
    category: "Vocabulary",
    question: "What is an 'algorithm'?",
    options: [
      "A step-by-step set of instructions",
      "A programming language",
      "A type of computer virus",
      "A musical instrument",
    ],
    answer: 0,
  },
  {
    difficulty: "easy",
    category: "Vocabulary",
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "How To Make Links",
      "Hyper Transfer Machine Language",
    ],
    answer: 0,
  },
  {
    difficulty: "easy",
    category: "Vocabulary",
    question: "What is a 'function' in code?",
    options: ["A math formula", "A reusable block of code", "A type of data", "An internet connection"],
    answer: 1,
  },
  {
    difficulty: "easy",
    category: "Vocabulary",
    question: "What does 'input' mean in a program?",
    options: [
      "Data that comes OUT of the program",
      "Data that goes INTO the program",
      "A type of error",
      "A programming language",
    ],
    answer: 1,
  },
  {
    difficulty: "easy",
    category: "Vocabulary",
    question: "What is 'output' in programming?",
    options: [
      "What the user types",
      "The result or answer the program shows",
      "A type of loop",
      "A storage unit",
    ],
    answer: 1,
  },
  {
    difficulty: "easy",
    category: "Vocabulary",
    question: "What does it mean to 'run' a program?",
    options: ["To delete it", "To make the computer execute it", "To print it on paper", "To save it"],
    answer: 1,
  },
  {
    difficulty: "easy",
    category: "Vocabulary",
    question: "What is a 'keyboard shortcut'?",
    options: [
      "A small keyboard",
      "A combination of keys that performs an action quickly",
      "A type of code",
      "A broken key",
    ],
    answer: 1,
  },
  {
    difficulty: "easy",
    category: "Vocabulary",
    question: "What does 'save' mean when working on a file?",
    options: [
      "Delete the file",
      "Print the file",
      "Store the file so you don't lose it",
      "Share the file online",
    ],
    answer: 2,
  },
  {
    difficulty: "easy",
    category: "Vocabulary",
    question: "What is a 'screen' also called in tech vocabulary?",
    options: ["Monitor", "Keyboard", "Mouse", "Router"],
    answer: 0,
  },
  {
    difficulty: "easy",
    category: "Vocabulary",
    question: "What does 'click' mean when using a computer?",
    options: [
      "Type on the keyboard",
      "Press a mouse button to select something",
      "Restart the computer",
      "Close a window",
    ],
    answer: 1,
  },
  {
    difficulty: "easy",
    category: "Vocabulary",
    question: "What is a 'password'?",
    options: [
      "A type of algorithm",
      "A secret word or code to access something",
      "A programming language",
      "A computer brand",
    ],
    answer: 1,
  },

  // ── MEDIUM (15 questions) ─────────────────────────────────────────────────
  {
    difficulty: "medium",
    category: "Concepts",
    question: "What is the difference between a 'compiler' and an 'interpreter'?",
    options: [
      "They are the same thing",
      "A compiler translates all code at once; an interpreter does it line by line",
      "A compiler is slower than an interpreter",
      "An interpreter only works with JavaScript",
    ],
    answer: 1,
  },
  {
    difficulty: "medium",
    category: "Concepts",
    question: "What does 'if/else' do in a program?",
    options: [
      "Repeats code forever",
      "Makes a decision based on a condition",
      "Deletes data",
      "Connects to the internet",
    ],
    answer: 1,
  },
  {
    difficulty: "medium",
    category: "Concepts",
    question: "What is an 'array' in programming?",
    options: [
      "A type of error",
      "A single value stored in memory",
      "A list of values stored together",
      "A kind of loop",
    ],
    answer: 2,
  },
  {
    difficulty: "medium",
    category: "Concepts",
    question: "What does CSS stand for?",
    options: [
      "Computer Style Syntax",
      "Cascading Style Sheets",
      "Creative System Software",
      "Central Style Source",
    ],
    answer: 1,
  },
  {
    difficulty: "medium",
    category: "Concepts",
    question: "In programming, what is 'debugging'?",
    options: [
      "Writing new code",
      "Finding and fixing errors in the code",
      "Designing a website",
      "Installing software",
    ],
    answer: 1,
  },
  {
    difficulty: "medium",
    category: "Concepts",
    question: "What does 'open source' mean?",
    options: [
      "Software that costs a lot of money",
      "Software whose code is available for anyone to see and use",
      "A type of computer virus",
      "A very fast program",
    ],
    answer: 1,
  },
  {
    difficulty: "medium",
    category: "Concepts",
    question: "What is a 'database'?",
    options: [
      "A type of programming language",
      "An organized collection of data stored digitally",
      "A web browser",
      "A computer part",
    ],
    answer: 1,
  },
  {
    difficulty: "medium",
    category: "Concepts",
    question: "What is 'version control' used for?",
    options: [
      "Controlling the screen brightness",
      "Tracking changes in code over time",
      "Speeding up the computer",
      "Designing user interfaces",
    ],
    answer: 1,
  },
  {
    difficulty: "medium",
    category: "Concepts",
    question: "What does API stand for?",
    options: [
      "Advanced Programming Interface",
      "Application Programming Interface",
      "Automated Process Integration",
      "Algorithmic Procedural Instruction",
    ],
    answer: 1,
  },
  {
    difficulty: "medium",
    category: "Concepts",
    question: "What is 'RAM' in a computer?",
    options: [
      "A type of keyboard",
      "A long-term storage device",
      "Temporary memory the computer uses while running programs",
      "A programming language",
    ],
    answer: 2,
  },
  {
    difficulty: "medium",
    category: "Algorithms",
    question: "Which data structure works like a queue at a coffee shop — first in, first out?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: 1,
  },
  {
    difficulty: "medium",
    category: "Algorithms",
    question: "What does a 'for loop' typically do?",
    options: [
      "Runs code only once",
      "Repeats code a specific number of times",
      "Stops the program",
      "Connects to a server",
    ],
    answer: 1,
  },
  {
    difficulty: "medium",
    category: "Concepts",
    question: "What is 'syntax' in programming?",
    options: [
      "The speed of a program",
      "The rules that define how code must be written",
      "A type of data",
      "A keyboard shortcut",
    ],
    answer: 1,
  },
  {
    difficulty: "medium",
    category: "Concepts",
    question: "What is a 'boolean' data type?",
    options: [
      "A very large number",
      "A type of image",
      "A value that is either True or False",
      "A list of words",
    ],
    answer: 2,
  },
  {
    difficulty: "medium",
    category: "Concepts",
    question: "What does 'responsive design' mean in web development?",
    options: [
      "A website that loads very fast",
      "A website that looks good on all screen sizes",
      "A website with lots of animations",
      "A website that never crashes",
    ],
    answer: 1,
  },

  // ── HARD (15 questions) ───────────────────────────────────────────────────
  {
    difficulty: "hard",
    category: "Algorithms",
    question: "What is the time complexity of Binary Search?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    answer: 2,
  },
  {
    difficulty: "hard",
    category: "Algorithms",
    question: "Which sorting algorithm has the worst average-case performance?",
    options: ["Quick Sort", "Merge Sort", "Bubble Sort", "Heap Sort"],
    answer: 2,
  },
  {
    difficulty: "hard",
    category: "Concepts",
    question: "What does 'recursion' mean in programming?",
    options: [
      "A loop that never ends",
      "A function that calls itself",
      "A type of database query",
      "Code that runs in parallel",
    ],
    answer: 1,
  },
  {
    difficulty: "hard",
    category: "Concepts",
    question: "What is 'object-oriented programming' (OOP)?",
    options: [
      "Programming that only uses numbers",
      "A style that organizes code into objects with properties and methods",
      "A type of database system",
      "A way to design websites only",
    ],
    answer: 1,
  },
  {
    difficulty: "hard",
    category: "Concepts",
    question: "In JavaScript, what does 'typeof null' return?",
    options: ["'null'", "'undefined'", "'object'", "'string'"],
    answer: 2,
  },
  {
    difficulty: "hard",
    category: "Algorithms",
    question: "What data structure uses LIFO — Last In, First Out?",
    options: ["Queue", "Array", "Stack", "Linked List"],
    answer: 2,
  },
  {
    difficulty: "hard",
    category: "Concepts",
    question: "What is 'inheritance' in OOP?",
    options: [
      "When a class receives money from another class",
      "When a class takes on properties and methods of another class",
      "When a function calls itself",
      "When two programs share the same file",
    ],
    answer: 1,
  },
  {
    difficulty: "hard",
    category: "Concepts",
    question: "What does 'immutable' mean in programming?",
    options: [
      "The value can be changed at any time",
      "The value can never be changed after it is created",
      "The variable is stored in the cloud",
      "The function runs very slowly",
    ],
    answer: 1,
  },
  {
    difficulty: "hard",
    category: "Concepts",
    question: "What is a 'race condition' in programming?",
    options: [
      "A very fast algorithm",
      "A competition between two programs",
      "A bug that happens when two processes access shared data at the same time",
      "A type of sorting race",
    ],
    answer: 2,
  },
  {
    difficulty: "hard",
    category: "Algorithms",
    question: "What does O(1) time complexity mean?",
    options: [
      "The algorithm takes one second",
      "The algorithm slows down as the input grows",
      "The algorithm always takes the same time regardless of input size",
      "The algorithm uses one line of code",
    ],
    answer: 2,
  },
  {
    difficulty: "hard",
    category: "Concepts",
    question: "What is 'encapsulation' in OOP?",
    options: [
      "Hiding internal details and exposing only what is necessary",
      "Making all variables global",
      "A way to repeat code",
      "A type of database",
    ],
    answer: 0,
  },
  {
    difficulty: "hard",
    category: "Concepts",
    question: "What is a 'promise' in JavaScript?",
    options: [
      "A comment in the code",
      "A guarantee that a variable will never change",
      "An object that represents a value that may be available in the future",
      "A type of CSS rule",
    ],
    answer: 2,
  },
  {
    difficulty: "hard",
    category: "Concepts",
    question: "What is the purpose of a 'try/catch' block?",
    options: [
      "To speed up the code",
      "To handle errors gracefully without crashing the program",
      "To create a loop",
      "To declare variables",
    ],
    answer: 1,
  },
  {
    difficulty: "hard",
    category: "Algorithms",
    question: "In a linked list, what is a 'node'?",
    options: [
      "The last element only",
      "An element that stores data and a reference to the next element",
      "A type of loop",
      "The index of an array",
    ],
    answer: 1,
  },
  {
    difficulty: "hard",
    category: "Concepts",
    question: "What does 'async/await' do in JavaScript?",
    options: [
      "Makes the code run faster",
      "Allows you to write asynchronous code in a more readable, synchronous style",
      "Creates a new thread",
      "Stops all other functions from running",
    ],
    answer: 1,
  },

  // ── BOSS (8 questions) ────────────────────────────────────────────────────
  {
    difficulty: "boss",
    category: "🔥 Final Boss",
    question:
      "A function calls itself every time it runs, with no condition to stop. What problem does this cause?",
    options: [
      "The program runs twice as fast",
      "A stack overflow — the program crashes from too many function calls",
      "The output is printed in reverse",
      "The variable becomes undefined",
    ],
    answer: 1,
  },
  {
    difficulty: "boss",
    category: "🔥 Final Boss",
    question:
      "You have a sorted list of 1,024 items. Using Binary Search, what is the MAXIMUM number of steps to find an item?",
    options: ["512", "1024", "10", "256"],
    answer: 2,
  },
  {
    difficulty: "boss",
    category: "🔥 Final Boss",
    question:
      "In JavaScript: `console.log(0.1 + 0.2 === 0.3)`. What does this print, and why?",
    options: [
      "true — because 0.1 + 0.2 is always 0.3",
      "false — because floating point math is not always exact",
      "undefined — because you cannot add decimals",
      "Error — because === does not work with numbers",
    ],
    answer: 1,
  },
  {
    difficulty: "boss",
    category: "🔥 Final Boss",
    question:
      "What is the key difference between 'call by value' and 'call by reference' when passing data to a function?",
    options: [
      "There is no difference",
      "Call by value passes a copy; call by reference passes the original memory location",
      "Call by reference is always faster",
      "Call by value only works with strings",
    ],
    answer: 1,
  },
  {
    difficulty: "boss",
    category: "🔥 Final Boss",
    question:
      "Which of these correctly describes a 'deadlock' in computing?",
    options: [
      "A very secure password",
      "When two processes each wait for the other to release a resource, and neither can continue",
      "A type of infinite loop in a single thread",
      "When the internet connection is blocked",
    ],
    answer: 1,
  },
  {
    difficulty: "boss",
    category: "🔥 Final Boss",
    question:
      "What is 'Big O notation' used for in computer science?",
    options: [
      "Naming programming languages",
      "Describing how the performance of an algorithm scales with input size",
      "Writing comments in code",
      "Measuring internet speed",
    ],
    answer: 1,
  },
  {
    difficulty: "boss",
    category: "🔥 Final Boss",
    question:
      "In SQL, what is the difference between 'WHERE' and 'HAVING'?",
    options: [
      "They do exactly the same thing",
      "WHERE filters rows before grouping; HAVING filters groups after aggregation",
      "HAVING is used only with DELETE statements",
      "WHERE only works with numbers",
    ],
    answer: 1,
  },
  {
    difficulty: "boss",
    category: "🔥 Final Boss",
    question:
      "What makes a 'hash table' very fast for lookups compared to a regular array?",
    options: [
      "It stores less data",
      "It uses a hash function to compute the position of a key directly, giving O(1) average lookup",
      "It sorts data automatically",
      "It uses binary search internally",
    ],
    answer: 1,
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickQuestions(): Question[] {
  const byDifficulty = (d: Difficulty) =>
    shuffle(QUESTION_POOL.filter((q) => q.difficulty === d))

  const result: Question[] = [
    ...byDifficulty("easy").slice(0, DIFFICULTY_PICKS.easy),
    ...byDifficulty("medium").slice(0, DIFFICULTY_PICKS.medium),
    ...byDifficulty("hard").slice(0, DIFFICULTY_PICKS.hard),
    ...byDifficulty("boss").slice(0, DIFFICULTY_PICKS.boss),
  ]

  return result
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StartScreen({ onStart }: { onStart: (nickname: string) => void }) {
  return (
    <div className="py-8 text-center">
      <NicknameScreen onStart={onStart} />
    </div>
  )
}

function ResultScreen({
  score,
  total,
  nickname,
  onRestart,
}: {
  score: number
  total: number
  nickname: string
  onRestart: () => void
}) {
  const maxScore = total * TIME_PER_QUESTION * POINTS_PER_SECOND
  const pct = Math.round((score / maxScore) * 100)
  const message =
    pct >= 80 ? "Legendary! 🏆" : pct >= 50 ? "Great job! 🎉" : "Keep practicing! 💪"

  return (
    <div className="py-8 text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/15 text-gold">
        <Trophy className="h-8 w-8" />
      </span>
      <h3 className="mt-6 text-2xl font-bold text-foreground">{message}</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        <span className="font-semibold text-primary">{nickname}</span> scored points by answering fast and accurately.
      </p>
      <div className="mx-auto mt-6 max-w-xs rounded-2xl border border-border bg-background/50 p-6">
        <p className="font-mono text-5xl font-extrabold text-gradient">{score}</p>
        <p className="mt-1 text-xs text-muted-foreground">points • {pct}%</p>
      </div>
      <button
        type="button"
        onClick={onRestart}
        className="mt-8 inline-flex items-center gap-2 rounded-xl glass px-8 py-3.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
      >
        <RotateCcw className="h-4 w-4" />
        Play again
      </button>
    </div>
  )
}

// ─── Option button styles ─────────────────────────────────────────────────────

type OptionState = "idle" | "correct" | "wrong" | "missed" | "disabled"

function getOptionState(params: {
  index: number
  answer: number
  selected: number | null
  timedOut: boolean
}): OptionState {
  const { index, answer, selected, timedOut } = params
  const answered = selected !== null || timedOut

  if (!answered) return "idle"
  if (index === answer) return timedOut && selected === null ? "missed" : "correct"
  if (index === selected) return "wrong"
  return "disabled"
}

const OPTION_STYLES: Record<OptionState, string> = {
  idle: "border-border bg-background/50 hover:border-primary/60 hover:bg-primary/10 text-foreground cursor-pointer",
  correct: "border-primary bg-primary/20 text-foreground",
  wrong: "border-destructive bg-destructive/20 text-foreground",
  missed: "border-amber-400 bg-amber-400/15 text-foreground",
  disabled: "border-border bg-background/30 text-muted-foreground",
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function QuizArena() {
  const [started, setStarted] = useState(false)
  const [nickname, setNickname] = useState("")
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [timedOut, setTimedOut] = useState(false)
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION)
  const [finished, setFinished] = useState(false)

  // Pick 10 questions on each new game
  const [pickKey, setPickKey] = useState(0)
  const questions = useMemo(() => pickQuestions(), [pickKey]) // eslint-disable-line react-hooks/exhaustive-deps

  const current = questions[index]
  const answered = selected !== null || timedOut
  const progress = (index / questions.length) * 100

  // ── FIX: postUser is called here, once, as an imperative event ──
  const goNext = useCallback(() => {
    if (index + 1 >= questions.length) {
      postUser({ nick: nickname, points: score })
      setFinished(true)
    } else {
      setIndex((i) => i + 1)
      setSelected(null)
      setTimedOut(false)
      setTimeLeft(TIME_PER_QUESTION)
    }
  }, [index, questions.length, nickname, score])

  const handleSelect = useCallback(
    (option: number) => {
      if (answered) return
      setSelected(option)
      if (option === current.answer) {
        setScore((s) => s + Math.max(MIN_POINTS, timeLeft * POINTS_PER_SECOND))
      }
    },
    [answered, current, timeLeft],
  )

  // Timer
  useEffect(() => {
    if (!started || finished || answered) return
    if (timeLeft <= 0) {
      setTimedOut(true)
      return
    }
    const t = setTimeout(() => setTimeLeft((v) => v - 1), 1000)
    return () => clearTimeout(t)
  }, [started, finished, answered, timeLeft])

  const restart = useCallback(() => {
    setStarted(false)
    setIndex(0)
    setScore(0)
    setSelected(null)
    setTimedOut(false)
    setTimeLeft(TIME_PER_QUESTION)
    setFinished(false)
    setNickname("")
    setPickKey((k) => k + 1)
  }, [])

  const isLastQuestion = index + 1 >= questions.length
  const timerPct = (timeLeft / TIME_PER_QUESTION) * 100
  const timerColor =
    timeLeft <= 5
      ? "bg-destructive"
      : timeLeft <= 9
        ? "bg-amber-400"
        : "bg-gradient-to-r from-neon-cyan to-neon-blue"

  return (
    <section id="quiz" className="relative px-4 py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-10 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-neon-blue/15 blur-[130px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Quiz Arena"
          title="Test your knowledge"
          subtitle="Answer fast — the more time you have left, the more points you earn."
        />

        <div className="mt-12 rounded-3xl glass p-1 glow-cyan">
          <div className="rounded-[1.35rem] bg-background/70 p-6 sm:p-8">

            {/* Start */}
            {!started && !finished && (
              <StartScreen
                onStart={(nick) => {
                  setNickname(nick)
                  setStarted(true)
                }}
              />
            )}

            {/* Quiz */}
            {started && !finished && (
              <>
                {/* HUD */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-primary/15 px-3 py-1 font-mono text-xs font-semibold text-primary">
                      {current.category}
                    </span>
                    <span
                      className={`flex items-center gap-1 rounded-full border px-2.5 py-1 font-mono text-xs font-semibold ${DIFFICULTY_COLORS[current.difficulty]}`}
                    >
                      {DIFFICULTY_ICON[current.difficulty]}
                      {DIFFICULTY_LABEL[current.difficulty]}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 font-mono text-sm text-foreground">
                      <Trophy className="h-4 w-4 text-gold" />
                      {score}
                    </span>
                    <span
                      className={`flex items-center gap-1.5 font-mono text-sm transition-colors ${timeLeft <= 5 ? "text-destructive" : "text-foreground"
                        }`}
                    >
                      <Timer className="h-4 w-4" />
                      {timeLeft}s
                    </span>
                  </div>
                </div>

                {/* Question progress bar */}
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Time bar */}
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${timerColor}`}
                    style={{ width: `${timerPct}%` }}
                  />
                </div>

                <p className="mt-2 text-right font-mono text-xs text-muted-foreground">
                  Question {index + 1} of {questions.length}
                </p>

                {/* Timeout notice */}
                {timedOut && (
                  <p className="mt-3 rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-center text-xs font-medium text-amber-400">
                    Time's up! The correct answer is highlighted.
                  </p>
                )}

                {/* Question */}
                <h3 className="mt-6 text-balance text-xl font-semibold leading-snug text-foreground sm:text-2xl">
                  {current.question}
                </h3>

                {/* Options */}
                <div className="mt-6 grid gap-3">
                  {current.options.map((option, i) => {
                    const state = getOptionState({
                      index: i,
                      answer: current.answer,
                      selected,
                      timedOut,
                    })

                    return (
                      <button
                        key={option}
                        type="button"
                        disabled={answered}
                        onClick={() => handleSelect(i)}
                        className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all ${OPTION_STYLES[state]}`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-background/60 font-mono text-xs">
                            {String.fromCharCode(65 + i)}
                          </span>
                          {option}
                        </span>
                        {state === "correct" && <Check className="h-5 w-5 shrink-0 text-primary" />}
                        {state === "missed" && <Check className="h-5 w-5 shrink-0 text-amber-400" />}
                        {state === "wrong" && <X className="h-5 w-5 shrink-0 text-destructive" />}
                      </button>
                    )
                  })}
                </div>

                {/* Next button */}
                {answered && (
                  <button
                    type="button"
                    onClick={goNext}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                  >
                    {isLastQuestion ? "See result" : "Next question"}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </>
            )}

            {/* Result */}
            {finished && (
              <ResultScreen
                score={score}
                total={questions.length}
                nickname={nickname}
                onRestart={restart}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
