"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { flexChallenges } from "../data/challenges";
import { FlexChallenge as FlexChallengeType } from "../../types";
import ProgressBar from "../../components/ProgressBar";
import FlexPreview from "./FlexPreview";
import FlexControls from "./FlexControls";
import GeneratedCSS from "./GeneratedCSS";

type FlexLevelWorkspaceProps = {
  challenge: FlexChallengeType;
  onMatch: (isMatch: boolean) => void;
};

function FlexLevelWorkspace({ challenge, onMatch }: FlexLevelWorkspaceProps) {
  const [currentStyles, setCurrentStyles] = useState<Record<string, string>>(
    challenge.initialStyles
  );
  const [showHint, setShowHint] = useState(false);

  const handleStyleChange = (prop: string, val: string) => {
    const nextStyles = {
      ...currentStyles,
      [prop]: val,
    };
    setCurrentStyles(nextStyles);

    // Check if matching solution styles
    const isMatch = Object.entries(challenge.solution).every(
      ([key, value]) => nextStyles[key] === value
    );
    onMatch(isMatch);
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
      {/* Left Column: Challenge details & controls */}
      <div className="md:col-span-5 flex flex-col gap-6 rounded-[28px] border border-border/40 bg-[var(--surface-glass)] p-6 shadow-sm md:p-8">
        <div>
          <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
            Objective
          </span>
          <h3 className="mt-3.5 font-[family:var(--font-display)] text-xl font-bold tracking-tight text-foreground">
            {challenge.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {challenge.description}
          </p>
        </div>

        {/* Controls */}
        <div className="border-t border-border/20 pt-6">
          <FlexControls
            availableControls={challenge.availableControls}
            currentStyles={currentStyles}
            onStyleChange={handleStyleChange}
          />
        </div>

        {/* Hint System */}
        <div className="border-t border-border/20 pt-5">
          {!showHint ? (
            <button
              onClick={() => setShowHint(true)}
              className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              💡 Need a Hint?
            </button>
          ) : (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="rounded-lg bg-secondary/20 border border-border/20 p-3.5 text-xs text-muted-foreground select-text"
            >
              <p className="font-semibold text-foreground mb-1">💡 Hint</p>
              {challenge.hint}
            </m.div>
          )}
        </div>
      </div>

      {/* Right Column: Previews & Code Output */}
      <div className="md:col-span-7 flex flex-col gap-6">
        {/* Target Visual Goal */}
        <FlexPreview
          title="Target Design"
          styles={challenge.solution}
          items={challenge.items}
          height={challenge.container.height}
          isTarget
        />

        {/* Live Sandbox Workspace */}
        <FlexPreview
          title="Your Workspace (Live Sandbox)"
          styles={currentStyles}
          items={challenge.items}
          height={challenge.container.height}
        />

        {/* Code Generation Panel */}
        <GeneratedCSS styles={currentStyles} />
      </div>
    </div>
  );
}

export default function FlexChallenge() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isFinished, setIsFinished] = useState(false); // Entire lab completed
  const [levelMatch, setLevelMatch] = useState(false); // Match condition for current level

  const challenge = flexChallenges[currentLevel];
  const totalLevels = flexChallenges.length;

  const handleMatch = (matchState: boolean) => {
    setLevelMatch(matchState);
  };

  const handleNextLevel = () => {
    setLevelMatch(false);
    if (currentLevel + 1 < totalLevels) {
      setCurrentLevel((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentLevel(0);
    setLevelMatch(false);
    setIsFinished(false);
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <m.div
            key="flex-lab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Top Level Bar */}
            <ProgressBar current={currentLevel + 1} total={totalLevels} />

            {/* Render level workspace keyed on currentLevel to auto-reset local state on transition */}
            <FlexLevelWorkspace
              key={currentLevel}
              challenge={challenge}
              onMatch={handleMatch}
            />

            {/* Success Celebration Overlay popup */}
            <AnimatePresence>
              {levelMatch && (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                >
                  <m.div
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    className="w-full max-w-md overflow-hidden rounded-[28px] border border-emerald-500/30 bg-zinc-950 p-6 text-center shadow-[0_0_50px_rgba(16,185,129,0.15)] md:p-8"
                  >
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-3xl border border-emerald-500/20">
                      🎉
                    </div>

                    <h3 className="font-[family:var(--font-display)] text-2xl font-bold text-foreground">
                      Challenge Completed!
                    </h3>
                    <p className="mt-2 text-sm text-emerald-400 font-mono font-medium">
                      Perfect alignment achieved!
                    </p>

                    <p className="mt-4 text-xs md:text-sm leading-relaxed text-muted-foreground">
                      You mapped the exact container styles needed to achieve the target layout. Outstanding job!
                    </p>

                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={handleNextLevel}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 px-6 py-2.5 font-mono text-xs font-semibold text-zinc-950 shadow-sm transition-all active:scale-[0.97]"
                      >
                        {currentLevel + 1 === totalLevels ? "Finish Lab" : "Next Challenge"}
                        <span>→</span>
                      </button>
                    </div>
                  </m.div>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        ) : (
          /* Completion Trophy Screen */
          <m.div
            key="flex-completed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[28px] border border-border/40 bg-[var(--surface-glass)] px-6 py-8 text-center shadow-[var(--shadow-card-strong)] sm:px-8 max-w-2xl mx-auto"
          >
            <m.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-4xl border border-primary/20 shadow-[0_0_15px_rgba(52,211,153,0.15)]"
            >
              🏅
            </m.div>

            <h2 className="font-[family:var(--font-display)] text-3xl font-bold tracking-tight text-foreground">
              Flexbox Lab Completed!
            </h2>
            <p className="mt-2.5 text-sm text-muted-foreground">
              You have mastered the foundational core alignments of CSS Flexbox!
            </p>

            <div className="mt-8 rounded-2xl border border-border/30 bg-secondary/10 p-5 text-left max-w-md mx-auto">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                🎓 What you learned:
              </h4>
              <ul className="mt-3.5 flex flex-col gap-2 font-mono text-[11px] text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Container setup (display: flex)
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Main axis centering (justify-content)
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Cross axis centering (align-items)
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Flex orientation direction (flex-direction)
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Modern item gap spacing (gap)
                </li>
              </ul>
            </div>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={handleRestart}
                className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full bg-primary px-6 py-2.5 font-mono text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.97]"
              >
                Play Again
              </button>
              <Link
                href="/play"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border/40 bg-secondary/30 px-6 py-2.5 font-mono text-xs font-semibold text-foreground transition-all hover:bg-secondary/50 active:scale-[0.97]"
              >
                Back to Play
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
