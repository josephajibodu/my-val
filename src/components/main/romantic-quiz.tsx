"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import type { SlideProps } from "@/types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

type QuestionType = "short" | "long" | "multiple";

type Question = {
  type: QuestionType;
  question: string;
  hint?: string;
  options?: string[];
  correctAnswer?: string;
};

const questions: Question[] = [
  {
    type: "short",
    question: "Do you remember the exact date we met and how it started?",
    hint: "A moment orchestrated by God",
  },
  {
    type: "multiple",
    question: "Which of these is NOT one of the sweet names you've called me?",
    options: [
      "Agba Programmer 💻",
      "My Sugar Daddy with the Sugar 🤭",
      "Mr. Ayoifeoluwasimi 💕",
      "The Comedian Who Thinks He's Funny 😂",
    ],
    correctAnswer: "The Comedian Who Thinks He's Funny 😂",
  },
  {
    type: "long",
    question: "What’s one thing about me that always makes you smile?",
  },
  {
    type: "long",
    question: "If we could relive one moment together, which would it be?",
  },
  {
    type: "long",
    question: "Describe our love story in three words.",
  },
  {
    type: "long",
    question: "What’s one dream or goal you’d love us to achieve together?",
  },
  {
    type: "long",
    question: "What’s the most memorable gift you've ever received?",
  },
  {
    type: "long",
    question: "Do you prefer sentimental gifts or useful ones?",
  },
  {
    type: "long",
    question: "Would you rather have a fun experience or a meaningful gift?",
  },
  {
    type: "long",
    question: "If I planned a day for you, what 3 things should we do?",
  },
];

function RomanticQuiz({ onChange }: SlideProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    if (Object.keys(answers).length === questions.length) {
      onChange(true);
    } else {
      onChange(false);
    }
  }, [answers, onChange]);

  const currentQuestion: Question = questions[step];

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step]: value }));
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-pink-100 to-white rounded-3xl shadow-2xl text-center h-full overflow-y-auto">
      <div className="mb-8">
        <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-pink-600 mb-2">Our Love Quiz</h1>
        <div className="w-full bg-pink-200 h-2 rounded-full">
          <div
            className="bg-pink-500 h-2 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-pink-600 mb-6">
            {currentQuestion.question}
          </h2>

          {currentQuestion.hint && (
            <p className="mt-2 text-gray-600 italic mb-6">
              {currentQuestion.hint}
            </p>
          )}

          {currentQuestion.type === "short" && (
            <Input
              className="mt-4 text-lg h-12 border-2 border-pink-400 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-pink-900"
              value={answers[step] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder="Type your answer..."
            />
          )}

          {currentQuestion.type === "long" && (
            <Textarea
              className="mt-4 text-lg border-2 border-pink-400 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-pink-900"
              value={answers[step] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder="Write your heartfelt response..."
              rows={5}
            />
          )}

          {currentQuestion.type === "multiple" && (
            <div className="mt-4 space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerChange(option)}
                  className={`block w-full py-3 px-6 border-2 rounded-xl transition text-sm ${
                    answers[step] === option
                      ? "bg-pink-500 text-white border-pink-600"
                      : "bg-white text-pink-600 border-pink-300 hover:bg-pink-100"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-between gap-4">
        {step > 0 && (
          <Button
            className={cn(
              "bg-white text-pink-600 border-2 border-pink-400 hover:bg-pink-100 py-3 rounded-xl transition",
              {
                "w-full": step === questions.length - 1,
                "w-1/3": step < questions.length - 1 && step > 0,
              }
            )}
            onClick={handlePrev}
          >
            Back
          </Button>
        )}

        {step < questions.length - 1 && (
          <Button
            className={cn(
              "bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl transition",
              {
                "w-full": step === 0,
                "w-2/3": step > 0 && step < questions.length - 1,
              }
            )}
            onClick={handleNext}
            disabled={!answers[step]}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

export default RomanticQuiz;
