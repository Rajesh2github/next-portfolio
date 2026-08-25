"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { javascriptChallenges } from "../data/challenges";
import ProgressBar from "../../components/ProgressBar";
import JavaScriptQuestion from "./JavaScriptQuestion";
import JavaScriptResults from "./JavaScriptResults";

export default function JavaScriptChallenge() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentChallenge = javascriptChallenges[currentIndex];
  const totalQuestions = javascriptChallenges.length;

  const handleAnswerSelected = (isCorrect: boolean) => {
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
            {/* Progress bar */}
            <ProgressBar current={currentIndex + 1} total={totalQuestions} />

            {/* Inner glass card with subtle design matching portfolio */}
            <div className="rounded-[28px] border border-border/40 bg-[var(--surface-glass)] px-6 py-8 shadow-[var(--shadow-card-strong)] sm:px-8">
              <AnimatePresence mode="wait">
                <m.div
                  key={currentChallenge.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <JavaScriptQuestion
                    challenge={currentChallenge}
                    onAnswerSelected={handleAnswerSelected}
                    onNext={handleNext}
                    isLastQuestion={currentIndex === totalQuestions - 1}
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
            className="rounded-[28px] border border-border/40 bg-[var(--surface-glass)] px-6 py-8 shadow-[var(--shadow-card-strong)] sm:px-8"
          >
            <JavaScriptResults
              score={score}
              totalQuestions={totalQuestions}
              userAnswers={answers}
              challenges={javascriptChallenges}
              onRestart={handleRestart}
            />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
