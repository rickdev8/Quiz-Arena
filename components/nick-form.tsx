"use client";

import { useState, useRef, useEffect } from "react";
import { Zap } from "lucide-react";

type Props = {
  onStart: (nickname: string) => void;
};

export default function NicknameScreen({ onStart }: Props) {
  const [nickname, setNickname] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleStart = () => {
    const trimmed = nickname.trim();

    if (trimmed.length < 3) return;

    onStart(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isValid) {
      handleStart();
    }
  };

  const isValid = nickname.trim().length >= 3;
  const remaining = Math.max(0, 3 - nickname.trim().length);

  return (
    <div className="flex flex-col items-center py-4">
      {/* Icon */}
      <div className="flex h-[78px] w-[78px] items-center justify-center rounded-3xl border border-primary/35 bg-primary/10 text-primary">
        <Zap size={34} />
      </div>

      {/* Title */}
      <h2 className="mt-8 text-center text-3xl font-bold text-foreground sm:text-4xl">
        Enter your nickname
      </h2>

      <p className="mt-3 max-w-sm text-center text-sm leading-relaxed text-muted-foreground">
        Choose a nickname to enter the leaderboard and begin your challenge.
      </p>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Your nickname..."
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        onKeyDown={handleKeyDown}
        maxLength={20}
        className="
          mt-8 w-full max-w-sm rounded-2xl border border-border
          bg-background/80 px-5 py-4 text-sm text-foreground
          placeholder:text-muted-foreground/60
          outline-none transition-all duration-300
          focus:border-primary
          focus:shadow-[0_0_20px_rgba(0,225,255,0.2)]
        "
      />

      {/* Character Counter */}
      <div className="mt-3 flex w-full max-w-sm items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {isValid
            ? "Ready to start!"
            : `${remaining} more character${
                remaining > 1 ? "s" : ""
              } required`}
        </span>

        <span className="font-mono text-xs text-muted-foreground/60">
          {nickname.length}/20
        </span>
      </div>

      {/* Button */}
      <button
        type="button"
        onClick={handleStart}
        disabled={!isValid}
        className={`
          mt-6 flex h-14 items-center gap-2 rounded-full px-8
          text-sm font-bold transition-all duration-300

          ${
            isValid
              ? `
                cursor-pointer
                bg-gradient-to-r
                from-neon-cyan
                via-primary
                to-neon-blue
                text-background
                hover:-translate-y-0.5
                hover:shadow-[0_0_25px_rgba(0,225,255,0.45)]
              `
              : `
                cursor-not-allowed
                border border-border/50
                bg-muted/40
                text-muted-foreground/60
              `
          }
        `}
      >
        <Zap size={18} />
        Continue
      </button>
    </div>
  );
}