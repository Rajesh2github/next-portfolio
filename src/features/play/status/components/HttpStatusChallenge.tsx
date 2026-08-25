"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";
import { httpStatusChallenges } from "../data/challenges";
import ProgressBar from "../../components/ProgressBar";

type QuestionProps = {
  challenge: typeof httpStatusChallenges[0];
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
  isLast: boolean;
};

function HttpStatusQuestion({ challenge, onAnswer, onNext, isLast }: QuestionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleOptionClick = (optionId: string) => {
    if (hasSubmitted) return;
    setSelectedId(optionId);
    setHasSubmitted(true);
    const isCorrect = optionId === challenge.correctAnswer;
    onAnswer(isCorrect);
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

    const isThisOptionSelected = selectedId === optionId;
    const isThisOptionCorrect = optionId === challenge.correctAnswer;

    if (isThisOptionCorrect) {
      return "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-semibold";
    }

    if (isThisOptionSelected) {
      return "border-rose-500/50 bg-rose-500/10 text-rose-400";
    }

    return "border-border/20 bg-secondary/10 text-muted-foreground opacity-50";
  };

  return (
    <div className="w-full">
      {/* Category header */}
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

      {/* Scenario Question */}
      <h2 className="font-[family:var(--font-display)] text-lg font-semibold leading-relaxed text-foreground md:text-xl">
        {challenge.question}
      </h2>

      {/* Browser Network Request Simulation Bar */}
      <div className="relative mt-6 overflow-hidden rounded-xl border border-border/40 bg-zinc-950 p-4 font-mono text-xs text-zinc-100 shadow-[var(--shadow-card)]">
        <div className="mb-3.5 flex gap-1.5 border-b border-zinc-800/60 pb-2">
          <span className="h-2 w-2 rounded-full bg-zinc-700" />
          <span className="h-2 w-2 rounded-full bg-zinc-700" />
          <span className="h-2 w-2 rounded-full bg-zinc-700" />
          <span className="ml-2 font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
            Network Headers Inspector
          </span>
        </div>
        <div className="flex flex-col gap-1.5 text-zinc-400 font-mono text-[11px] select-all">
          <div><span className="text-zinc-500">Request URL:</span> https://api.portfolio.com/endpoint</div>
          <div><span className="text-zinc-500">Request Method:</span> GET</div>
          <div><span className="text-zinc-500">Referrer Policy:</span> strict-origin-when-cross-origin</div>
          <div>
            <span className="text-zinc-500">Status Code:</span>{" "}
            {hasSubmitted ? (
              <span
                className={clsx(
                  "rounded px-1.5 py-0.5 font-bold text-zinc-950",
                  challenge.correctAnswer.startsWith("2") && "bg-emerald-400",
                  challenge.correctAnswer.startsWith("3") && "bg-blue-400",
                  challenge.correctAnswer.startsWith("4") && "bg-amber-400",
                  challenge.correctAnswer.startsWith("5") && "bg-rose-400"
                )}
              >
                {challenge.correctAnswer}{" "}
                {challenge.correctAnswer === "200" && "OK"}
                {challenge.correctAnswer === "301" && "Moved Permanently"}
                {challenge.correctAnswer === "400" && "Bad Request"}
                {challenge.correctAnswer === "401" && "Unauthorized"}
                {challenge.correctAnswer === "403" && "Forbidden"}
                {challenge.correctAnswer === "404" && "Not Found"}
                {challenge.correctAnswer === "429" && "Too Many Requests"}
                {challenge.correctAnswer === "500" && "Internal Server Error"}
                {challenge.correctAnswer === "502" && "Bad Gateway"}
                {challenge.correctAnswer === "503" && "Service Unavailable"}
              </span>
            ) : (
              <span className="animate-pulse bg-zinc-800 text-zinc-400 rounded px-1.5 py-0.5">PENDING...</span>
            )}
          </div>
        </div>
      </div>

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

      {/* Explanation reveal */}
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
              💡 Status Definition
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
                {isLast ? "See Summary" : "Next Question"}
                <span>→</span>
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type ResultsProps = {
  score: number;
  total: number;
  answers: boolean[];
  onRestart: () => void;
};

function HttpStatusResults({ score, total, answers, onRestart }: ResultsProps) {
  const accuracy = Math.round((score / total) * 100);

  const getEncouragement = () => {
    if (accuracy === 100) return "👑 HTTP Overlord! Absolute routing masterclass!";
    if (accuracy >= 80) return "🚀 Amazing! Excellent networking vocabulary!";
    if (accuracy >= 50) return "📡 Decent connection! You know your standard codes!";
    return "🔌 Connection Refused! Time to read the RFC specs again!";
  };

  return (
    <div className="w-full text-center">
      <m.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-4xl border border-primary/20 shadow-[0_0_15px_rgba(52,211,153,0.15)]"
      >
        🌐
      </m.div>

      <m.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-[family:var(--font-display)] text-3xl font-bold tracking-tight text-foreground"
      >
        Challenge Closed!
      </m.h2>

      <m.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-2 text-sm text-muted-foreground"
      >
        Here is your networking metrics outline
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
            Codes Matched
          </span>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {score} <span className="text-sm font-normal text-muted-foreground">/ {total}</span>
          </p>
        </div>
        <div className="text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Accuracy
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

      {/* Review summary */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-10 overflow-hidden rounded-xl border border-border/40 bg-background/50 text-left shadow-sm"
      >
        <div className="border-b border-border/30 bg-secondary/30 px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-foreground">
          Packet Log Review
        </div>
        <div className="divide-y divide-border/20">
          {httpStatusChallenges.map((challenge, index) => {
            const isCorrect = answers[index];
            return (
              <div
                key={challenge.id}
                className="flex items-center justify-between px-4 py-3 text-xs md:text-sm"
              >
                <div className="flex flex-col gap-1 pr-4">
                  <span className="font-medium text-foreground">
                    {index + 1}. HTTP {challenge.correctAnswer} Definition
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    Class: {challenge.category}
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
          Ping Again
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

export default function HttpStatusChallenge() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentChallenge = httpStatusChallenges[currentIndex];
  const totalQuestions = httpStatusChallenges.length;

  const handleAnswer = (isCorrect: boolean) => {
    setAnswers((prev) => [...prev, isCorrect]);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setIsFinished(false);
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <m.div
            key="game-round"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <ProgressBar current={currentIndex + 1} total={totalQuestions} />

            <div className="rounded-[28px] border border-border/40 bg-[var(--surface-glass)] px-6 py-8 shadow-[var(--shadow-card-strong)] sm:px-8">
              <AnimatePresence mode="wait">
                <m.div
                  key={currentChallenge.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <HttpStatusQuestion
                    challenge={currentChallenge}
                    onAnswer={handleAnswer}
                    onNext={handleNext}
                    isLast={currentIndex === totalQuestions - 1}
                  />
                </m.div>
              </AnimatePresence>
            </div>
          </m.div>
        ) : (
          <m.div
            key="game-results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[28px] border border-border/40 bg-[var(--surface-glass)] px-6 py-8 shadow-[var(--shadow-card-strong)] sm:px-8 max-w-2xl mx-auto"
          >
            <HttpStatusResults
              score={score}
              total={totalQuestions}
              answers={answers}
              onRestart={handleRestart}
            />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
