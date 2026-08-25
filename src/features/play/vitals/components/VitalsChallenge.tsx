"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { vitalsChallenges } from "../data/challenges";
import ProgressBar from "../../components/ProgressBar";
import QuizWorkspace from "../../engine/quiz/QuizWorkspace";
import QuizResults from "../../engine/quiz/QuizResults";

export default function VitalsChallenge() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentChallenge = vitalsChallenges[currentIndex];
  const totalQuestions = vitalsChallenges.length;

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
                  <QuizWorkspace
                    challenge={currentChallenge}
                    onAnswer={handleAnswer}
                    onNext={handleNext}
                    isLast={currentIndex === totalQuestions - 1}
                    snippetHeader="Markup.html"
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
            <QuizResults
              score={score}
              total={totalQuestions}
              answers={answers}
              challenges={vitalsChallenges}
              onRestart={handleRestart}
              icon="⚡"
              title="Core Web Vitals Lab Complete!"
              subtitle="Review your paint speeds and layout shift results"
              encouragementMap={{
                perfect: "⚡ Web Vitals Guru! Shipped at lightspeed with 0.00 CLS!",
                great: "🔥 Outstanding speed profiling and rendering metrics knowledge!",
                good: "💪 Great job! Keep auditing loading delays!",
                poor: "📚 Study painting thresholds! Give it another shot!",
              }}
            />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
