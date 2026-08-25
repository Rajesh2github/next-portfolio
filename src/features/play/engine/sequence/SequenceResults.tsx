"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { SequenceChallenge } from "../../types";

type SequenceResultsProps = {
  challenge: SequenceChallenge;
  onRestart: () => void;
  icon?: string;
  title?: string;
  subtitle?: string;
};

export default function SequenceResults({
  challenge,
  onRestart,
  icon = "🏅",
  title = "Pipeline Audit Complete!",
  subtitle = "You have met all sequence requirements",
}: SequenceResultsProps) {
  return (
    <div className="w-full text-center">
      {/* Badge */}
      <m.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-4xl border border-primary/20 shadow-[0_0_15px_rgba(52,211,153,0.15)]"
      >
        {icon}
      </m.div>

      <m.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-[family:var(--font-display)] text-3xl font-bold tracking-tight text-foreground"
      >
        {title}
      </m.h2>

      <m.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-2 text-sm text-muted-foreground"
      >
        {subtitle}
      </m.p>

      {/* Overview box */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 overflow-hidden rounded-xl border border-border/40 bg-background/50 text-left shadow-sm max-w-md mx-auto"
      >
        <div className="border-b border-border/30 bg-secondary/30 px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-foreground">
          Sequence Brief Details
        </div>
        <div className="p-5 font-mono text-[11px] leading-relaxed text-muted-foreground flex flex-col gap-3">
          <div>
            <span className="font-bold text-foreground">Challenge category:</span> {challenge.category}
          </div>
          <div>
            <span className="font-bold text-foreground">Difficulty rating:</span>{" "}
            <span className="uppercase text-primary">{challenge.difficulty}</span>
          </div>
          <div className="border-t border-border/20 pt-3 mt-1 text-foreground select-text text-xs">
            <p className="font-bold mb-1.5 uppercase text-emerald-400">🎓 Technical Summary:</p>
            {challenge.explanation}
          </div>
        </div>
      </m.div>

      {/* Buttons */}
      <m.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
      >
        <button
          onClick={onRestart}
          className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full bg-primary px-6 py-2.5 font-mono text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.97]"
        >
          Reset Sequence
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
