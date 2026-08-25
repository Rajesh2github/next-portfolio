"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { JavaScriptChallenge } from "../../types";

type JavaScriptQuestionProps = {
  challenge: JavaScriptChallenge;
  onAnswerSelected: (isCorrect: boolean) => void;
  onNext: () => void;
  isLastQuestion: boolean;
};

export default function JavaScriptQuestion({
  challenge,
  onAnswerSelected,
  onNext,
  isLastQuestion,
}: JavaScriptQuestionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleOptionClick = (optionId: string) => {
    if (hasSubmitted) return;
    setSelectedId(optionId);
    setHasSubmitted(true);
    const isCorrect = optionId === challenge.correctAnswer;
    onAnswerSelected(isCorrect);
  };

  const getOptionStyle = (optionId: string) => {
    if (!hasSubmitted) {
      return clsx(
        "border-border/40 bg-secondary/30 hover:border-primary/40 hover:bg-primary/[0.02]",
        selectedId === optionId
          ? "border-primary bg-primary/5 text-primary"
          : "text-foreground"
      );
    }

    // After submission
    const isThisOptionSelected = selectedId === optionId;
    const isThisOptionCorrect = optionId === challenge.correctAnswer;

    if (isThisOptionCorrect) {
      // Correct choice is always highlighted in green
      return "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-semibold";
    }

    if (isThisOptionSelected) {
      // Selected wrong choice highlighted in red
      return "border-rose-500/50 bg-rose-500/10 text-rose-400";
    }

    // Unselected wrong choices are faded out
    return "border-border/20 bg-secondary/10 text-muted-foreground opacity-50";
  };

  return (
    <div className="w-full">
      {/* Category and Difficulty header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
          {challenge.category}
        </span>
        <span
          className={clsx(
            "rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase border",
            challenge.difficulty === "easy" && "border-emerald-500/30 bg-emerald-500/5 text-emerald-400",
            challenge.difficulty === "medium" && "border-amber-500/30 bg-amber-500/5 text-amber-400",
            challenge.difficulty === "hard" && "border-rose-500/30 bg-rose-500/5 text-rose-400"
          )}
        >
          {challenge.difficulty}
        </span>
      </div>

      {/* Question Title */}
      <h2 className="font-[family:var(--font-display)] text-xl font-semibold leading-relaxed text-foreground md:text-2xl">
        {challenge.question}
      </h2>

      {/* Code Terminal Snippet */}
      {challenge.code && (
        <div className="relative mt-6 overflow-hidden rounded-xl border border-border/40 bg-zinc-950 p-4 font-mono text-xs text-zinc-100 shadow-[var(--shadow-card)] md:text-sm">
          {/* Mac Terminal Dots */}
          <div className="mb-3.5 flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/70" />
            <span className="h-3 w-3 rounded-full bg-amber-500/70" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
            <span className="ml-2 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
              challenge.js
            </span>
          </div>
          <pre className="overflow-x-auto whitespace-pre leading-relaxed select-all">
            <code>{challenge.code}</code>
          </pre>
        </div>
      )}

      {/* Options List */}
      <div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {challenge.options.map((option) => (
          <button
            key={option.id}
            disabled={hasSubmitted}
            onClick={() => handleOptionClick(option.id)}
            className={clsx(
              "flex w-full items-center justify-between rounded-xl border p-4 text-left font-mono text-xs font-medium leading-normal transition-all md:text-sm shadow-sm",
              getOptionStyle(option.id),
              !hasSubmitted && "cursor-pointer active:scale-[0.98]"
            )}
          >
            <span>{option.label}</span>
            {hasSubmitted && option.id === challenge.correctAnswer && (
              <span className="text-emerald-400 font-bold">✓</span>
            )}
            {hasSubmitted && selectedId === option.id && option.id !== challenge.correctAnswer && (
              <span className="text-rose-400 font-bold">✗</span>
            )}
          </button>
        ))}
      </div>

      {/* Explanation and Next Button Block */}
      <AnimatePresence>
        {hasSubmitted && (
          <m.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 overflow-hidden rounded-xl border border-border/40 bg-[var(--surface-glass-strong)] p-5 shadow-sm"
          >
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
              💡 Technical Explanation
            </h4>
            <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground select-text">
              {challenge.explanation}
            </p>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setSelectedId(null);
                  setHasSubmitted(false);
                  onNext();
                }}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-5 py-2 font-mono text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.97]"
              >
                {isLastQuestion ? "See Results" : "Next Question"}
                <span>→</span>
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
