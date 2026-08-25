"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { secureChallenges } from "../data/challenges";
import ProgressBar from "../../components/ProgressBar";
import DetectiveWorkspace from "../../engine/detective/DetectiveWorkspace";
import DetectiveResults from "../../engine/detective/DetectiveResults";

export default function SecureChallenge() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentChallenge = secureChallenges[currentIndex];
  const totalCases = secureChallenges.length;

  const handleAnswerSelected = (isCorrect: boolean) => {
    setAnswers((prev) => [...prev, isCorrect]);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalCases) {
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
            {/* Progress Bar */}
            <ProgressBar current={currentIndex + 1} total={totalCases} />

            {/* Detective Workspace */}
            <DetectiveWorkspace
              key={currentIndex}
              challenge={currentChallenge}
              onAnswerSelected={handleAnswerSelected}
              onNext={handleNext}
              isLast={currentIndex === totalCases - 1}
            />
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
            <DetectiveResults
              score={score}
              total={totalCases}
              userAnswers={answers}
              challenges={secureChallenges}
              onRestart={handleRestart}
            />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
