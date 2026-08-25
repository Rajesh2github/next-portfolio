"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { DetectiveChallenge } from "../../types";

type DetectiveResultsProps = {
  score: number;
  total: number;
  userAnswers: boolean[];
  challenges: DetectiveChallenge[];
  onRestart: () => void;
};

export default function DetectiveResults({
  score,
  total,
  userAnswers,
  challenges,
  onRestart,
}: DetectiveResultsProps) {
  const accuracy = Math.round((score / total) * 100);

  const getEncouragement = () => {
    if (accuracy === 100) return "🕵️‍♂️ Legendary Detective! Zero bugs escaped your radar!";
    if (accuracy >= 75) return "⚡ Expert Troubleshooter! Brilliant debugging senses!";
    if (accuracy >= 50) return "🔧 Solid Investigator! You squashed some tricky anomalies!";
    return "📖 Keep studying the logs! Every bug is a learning experience!";
  };

  return (
    <div className="w-full text-center">
      {/* Complete Badge */}
      <m.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-4xl border border-primary/20 shadow-[0_0_15px_rgba(52,211,153,0.15)]"
      >
        🔍
      </m.div>

      <m.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-[family:var(--font-display)] text-3xl font-bold tracking-tight text-foreground"
      >
        Case Investigation Closed!
      </m.h2>

      <m.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-2 text-sm text-muted-foreground"
      >
        Here is your investigative file brief
      </m.p>

      {/* Score Stats */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-border/40 bg-[var(--surface-glass)] p-6 shadow-sm"
      >
        <div className="border-r border-border/30 text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Bugs Cleared
          </span>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {score} <span className="text-sm font-normal text-muted-foreground">/ {total}</span>
          </p>
        </div>
        <div className="text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Solve Rate
          </span>
          <p className="mt-2 text-3xl font-bold text-primary">
            {accuracy}%
          </p>
        </div>
      </m.div>

      {/* Encouragement */}
      <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 text-base font-medium text-foreground"
      >
        {getEncouragement()}
      </m.p>

      {/* Case-by-case items list */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-10 overflow-hidden rounded-xl border border-border/40 bg-background/50 text-left shadow-sm"
      >
        <div className="border-b border-border/30 bg-secondary/30 px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-foreground">
          Incident Files Summary
        </div>
        <div className="divide-y divide-border/20">
          {challenges.map((challenge, index) => {
            const isCorrect = userAnswers[index];
            return (
              <div
                key={challenge.id}
                className="flex items-center justify-between px-4 py-3 text-xs md:text-sm"
              >
                <div className="flex flex-col gap-1 pr-4">
                  <span className="font-medium text-foreground">
                    {index + 1}. {challenge.title}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    Difficulty: {challenge.difficulty}
                  </span>
                </div>
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full font-bold ${
                    isCorrect
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-rose-500/10 text-rose-400"
                  }`}
                >
                  {isCorrect ? "✓" : "✗"}
                </span>
              </div>
            );
          })}
        </div>
      </m.div>

      {/* Buttons */}
      <m.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
      >
        <button
          onClick={onRestart}
          className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full bg-primary px-6 py-2.5 font-mono text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.97]"
        >
          Investigate Again
        </button>
        <Link
          href="/play"
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border/40 bg-secondary/30 px-6 py-2.5 font-mono text-xs font-semibold text-foreground transition-all hover:bg-secondary/50 active:scale-[0.97]"
        >
          Exit to Play
        </Link>
      </m.div>
    </div>
  );
}
