"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { SequenceChallenge, SequenceStep } from "../../types";

type SequenceWorkspaceProps = {
  challenge: SequenceChallenge;
  onComplete: () => void;
};

// Pure helper to shuffle array
const shuffleArray = (array: SequenceStep[], correctOrder: string[]): SequenceStep[] => {
  const shuffled = [...array];
  let iterations = 0;
  
  // Keep shuffling until it's actually shuffled and not in the correct order
  do {
    shuffled.sort(() => Math.random() - 0.5);
    iterations++;
  } while (
    shuffled.map((s) => s.id).join(",") === correctOrder.join(",") &&
    iterations < 50
  );
  
  return shuffled;
};

export default function SequenceWorkspace({ challenge, onComplete }: SequenceWorkspaceProps) {
  const [steps, setSteps] = useState<SequenceStep[]>(() =>
    shuffleArray(challenge.steps, challenge.correctOrder)
  );
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleMoveUp = (index: number) => {
    if (index === 0 || hasSubmitted) return;
    const nextSteps = [...steps];
    [nextSteps[index - 1], nextSteps[index]] = [nextSteps[index], nextSteps[index - 1]];
    setSteps(nextSteps);
  };

  const handleMoveDown = (index: number) => {
    if (index === steps.length - 1 || hasSubmitted) return;
    const nextSteps = [...steps];
    [nextSteps[index + 1], nextSteps[index]] = [nextSteps[index], nextSteps[index + 1]];
    setSteps(nextSteps);
  };

  const handleVerify = () => {
    const currentOrder = steps.map((s) => s.id);
    const correct = currentOrder.join(",") === challenge.correctOrder.join(",");
    setHasSubmitted(true);
    setIsCorrect(correct);
    if (correct) {
      // Trigger modal celebrate
    }
  };

  const handleReset = () => {
    setSteps(shuffleArray(challenge.steps, challenge.correctOrder));
    setHasSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
      {/* Left Column: Shuffled Sortable Steps (7 cols) */}
      <div className="md:col-span-7 flex flex-col gap-5 rounded-[28px] border border-border/40 bg-[var(--surface-glass)] p-6 shadow-sm md:p-8">
        <div>
          <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
            Step Sequencer
          </span>
          <h3 className="mt-3.5 font-[family:var(--font-display)] text-xl font-bold tracking-tight text-foreground">
            {challenge.title}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Use the ▲ and ▼ controls next to each block to arrange them in the correct chronological or logical sequence order.
          </p>
        </div>

        {/* Shuffled/Reorderable Steps list */}
        <div className="flex flex-col gap-3 border-t border-border/20 pt-5">
          <AnimatePresence mode="popLayout">
            {steps.map((step, index) => {
              const isFirst = index === 0;
              const isLast = index === steps.length - 1;

              return (
                <m.div
                  key={step.id}
                  layout // Employs FLIP animations to slide elements when reordered!
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className={clsx(
                    "flex items-center gap-4 rounded-xl border p-4 bg-secondary/10 shadow-sm border-border/30"
                  )}
                >
                  {/* Sorting Caret controls */}
                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={isFirst || hasSubmitted}
                      className={clsx(
                        "flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-border/30 bg-zinc-950/40 font-mono text-[10px] font-bold text-muted-foreground transition-all hover:bg-secondary/40 hover:text-foreground active:scale-[0.93]",
                        (isFirst || hasSubmitted) && "opacity-30 cursor-not-allowed hover:bg-zinc-950/40 hover:text-muted-foreground active:scale-100"
                      )}
                      title="Move Up"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={isLast || hasSubmitted}
                      className={clsx(
                        "flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-border/30 bg-zinc-950/40 font-mono text-[10px] font-bold text-muted-foreground transition-all hover:bg-secondary/40 hover:text-foreground active:scale-[0.93]",
                        (isLast || hasSubmitted) && "opacity-30 cursor-not-allowed hover:bg-zinc-950/40 hover:text-muted-foreground active:scale-100"
                      )}
                      title="Move Down"
                    >
                      ▼
                    </button>
                  </div>

                  {/* Step Descriptor */}
                  <div className="flex flex-col gap-1 pr-1">
                    <span className="font-mono text-xs font-bold text-foreground">
                      {index + 1}. {step.label}
                    </span>
                    <p className="text-[10px] leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </m.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Action Controls */}
        <div className="flex justify-end gap-3 border-t border-border/20 pt-5">
          {!hasSubmitted ? (
            <button
              onClick={handleVerify}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 font-mono text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.97]"
            >
              Verify Sequence
              <span>→</span>
            </button>
          ) : (
            !isCorrect && (
              <button
                onClick={handleReset}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border/30 bg-secondary/30 px-6 py-2.5 font-mono text-xs font-semibold text-foreground transition-all hover:bg-secondary/50 active:scale-[0.97]"
              >
                Reset Sequence
              </button>
            )
          )}
        </div>
      </div>

      {/* Right Column: Objective Overview & Verify Indicators (5 cols) */}
      <div className="md:col-span-5 flex flex-col gap-6">
        <div className="rounded-2xl border border-border/40 bg-[var(--surface-glass-strong)] p-6 shadow-sm">
          <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
            Verification Board
          </span>

          <h4 className="mt-4 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Goal Sequence:
          </h4>
          <p className="mt-1 text-xs text-foreground font-semibold leading-relaxed">
            {challenge.targetDescription}
          </p>

          <div className="mt-6 border-t border-border/20 pt-6">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Status Console
            </h4>

            {hasSubmitted ? (
              isCorrect ? (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs font-mono leading-relaxed text-emerald-400">
                  <span className="font-bold">✓ SUCCESS:</span> Sequence compiles successfully! Loop is logically sound and verified.
                </div>
              ) : (
                <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-xs font-mono leading-relaxed text-rose-400">
                  <span className="font-bold">✗ FAIL:</span> Compile Error. Sequence mismatch detected. Shuffled variables caused logical blocks to crash. Reset and try again!
                </div>
              )
            ) : (
              <div className="rounded-xl border border-border/20 bg-zinc-950/40 p-4 text-xs font-mono leading-relaxed text-muted-foreground italic">
                Status: WAITING FOR COMPILATION RUN...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Celebration Overlay popup */}
      <AnimatePresence>
        {isCorrect && !showExplanation && (
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
              className="w-full max-w-lg overflow-hidden rounded-[28px] border border-emerald-500/30 bg-zinc-950 p-6 text-center shadow-[0_0_50px_rgba(16,185,129,0.15)] md:p-8"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-3xl border border-emerald-500/20">
                🎉
              </div>

              <h3 className="font-[family:var(--font-display)] text-2xl font-bold text-foreground">
                Sequence Verified!
              </h3>
              <p className="mt-2 text-sm text-emerald-400 font-mono font-medium">
                Logical pipeline checks out!
              </p>

              <div className="mt-5 rounded-xl bg-secondary/10 border border-border/20 p-4 text-left max-h-[180px] overflow-y-auto select-text text-xs leading-relaxed text-muted-foreground">
                <p className="font-semibold text-foreground mb-1.5">📊 Technical Explanation</p>
                {challenge.explanation}
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => {
                    setShowExplanation(true);
                    onComplete();
                  }}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 px-6 py-2.5 font-mono text-xs font-semibold text-zinc-950 shadow-sm transition-all active:scale-[0.97]"
                >
                  See Lab Summary
                  <span>→</span>
                </button>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
