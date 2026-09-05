"use client";

import React, { useState } from "react";
import { Mcq } from "@/types/learn";
import { Check, X, AlertCircle, Sparkles, ArrowRight, RotateCcw } from "lucide-react";

interface McqQuizProps {
  questions: Mcq[];
}

export default function McqQuiz({ questions }: McqQuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  if (questions.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <AlertCircle className="mx-auto h-8 w-8 text-slate-300 mb-2" />
        <h4 className="font-bold text-slate-800 text-sm">No Quiz Available</h4>
        <p className="text-xs text-slate-400 mt-1">There are no MCQs connected to this topic yet.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];

  const handleOptionSelect = (optionId: string) => {
    if (isSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId || isSubmitted) return;
    setIsSubmitted(true);
    if (selectedOptionId === currentQuestion.correctOptionId) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOptionId(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const scorePercentage = Math.round((score / questions.length) * 100);
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm space-y-4">
        <div className="mx-auto h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 flex shadow-inner">
          <Sparkles className="h-6 w-6" />
        </div>
        <h4 className="font-display text-lg font-bold text-slate-900">Quiz Completed!</h4>
        <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          You scored <strong className="text-slate-800">{score} out of {questions.length}</strong> ({scorePercentage}%). Great effort!
        </p>
        <button
          onClick={handleResetQuiz}
          className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition shadow-sm"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm space-y-5">
      {/* Progress header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Knowledge Check — Question {currentIdx + 1} of {questions.length}
        </span>
        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
          {score} Solved
        </span>
      </div>

      {/* Question */}
      <div className="text-sm font-semibold text-slate-800 whitespace-pre-line leading-relaxed bg-slate-50/50 p-3.5 rounded-lg border border-slate-100/50 font-sans">
        {currentQuestion.question}
      </div>

      {/* Options List */}
      <div className="space-y-2.5">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = option.id === currentQuestion.correctOptionId;
          
          let btnClass = "border-slate-150 hover:bg-slate-50/50";
          if (isSelected) btnClass = "border-blue-500 bg-blue-50/20 text-blue-700 font-bold";
          
          if (isSubmitted) {
            if (isCorrect) {
              btnClass = "border-green-300 bg-green-50/30 text-green-800 font-bold";
            } else if (isSelected) {
              btnClass = "border-red-300 bg-red-50/30 text-red-800 font-bold";
            } else {
              btnClass = "border-slate-100 opacity-65";
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              disabled={isSubmitted}
              className={`w-full flex items-center justify-between text-left text-xs rounded-xl border p-3.5 transition-all duration-300 ${btnClass}`}
            >
              <div className="flex items-center gap-3 pr-4">
                <span className={`flex h-6 w-6 items-center justify-center rounded-lg border text-[10px] font-black uppercase tracking-wider ${
                  isSelected ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200 text-slate-400"
                }`}>
                  {option.id}
                </span>
                <span className="leading-relaxed">{option.text}</span>
              </div>

              {isSubmitted && isCorrect && (
                <Check className="h-4.5 w-4.5 text-green-600 shrink-0" />
              )}
              {isSubmitted && isSelected && !isCorrect && (
                <X className="h-4.5 w-4.5 text-red-600 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Action / Explanation Block */}
      <div className="pt-4 border-t border-slate-50 flex flex-col gap-4">
        {isSubmitted && (
          <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 space-y-1.5 animate-fadeIn">
            <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-blue-500" />
              Explanation
            </h5>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        <div className="flex items-center justify-end">
          {!isSubmitted ? (
            <button
              onClick={handleCheckAnswer}
              disabled={!selectedOptionId}
              className={`rounded-xl px-4 py-2 text-xs font-bold shadow-sm transition ${
                selectedOptionId
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              Verify Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition"
            >
              <span>{currentIdx + 1 === questions.length ? "Finish Quiz" : "Next Question"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
