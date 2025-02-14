import React, { useState, useEffect } from "react";
import { useStep } from "./hooks/useStep";
import Authentication from "./components/main/authentication";
import { Button } from "./components/ui/button";
import AnimatedBackground from "./components/animated-background";
import RomanticQuiz from "./components/main/romantic-quiz";
import MomentsThatTouch from "./components/main/moments-that-touch";
import ShareMoments from "./components/main/share-moments";
import WillYouBeMyVal from "./components/main/will-you-be-my-val";
import GrandFinale from "./components/main/grand-finale";
import LoveFillerSlide from "./components/main/love-filler-slide";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

function App() {
  const [
    currentStep,
    { goToNextStep, canGoToPrevStep, goToPrevStep, canGoToNextStep },
  ] = useStep(7);

  const [currentStageComplete, setCurrentStageComplete] = useState(false);

  useEffect(() => {
    // Reset completion state when changing steps
    setCurrentStageComplete(false);
  }, [currentStep]);

  function handleNextStep(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    event.preventDefault();
    if (currentStageComplete) {
      goToNextStep();
    }

    if (!canGoToNextStep) {
      confetti({
        particleCount: 1000,
        spread: 150,
        origin: { y: 0.6 },
      });
    }
  }

  function handlePrevStep(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    event.preventDefault();
    goToPrevStep();
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-2xl text-white bg-gradient-to-r from-pink-300 to-pink-200 px-8 h-[100vh] gap-2">
      <AnimatedBackground />

      {/* Content */}
      <motion.div
        className="relative z-10 h-[10vh] flex flex-col justify-end items-center w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          Hiiiiiii 🫶🏼
        </h1>
      </motion.div>

      <div className="relative z-10 max-w-lg mx-auto flex-1 h-[80vh]">
        {currentStep === 1 && (
          <LoveFillerSlide onChange={setCurrentStageComplete} />
        )}

        {currentStep === 2 && (
          <Authentication onChange={setCurrentStageComplete} />
        )}

        {currentStep === 3 && (
          <RomanticQuiz onChange={setCurrentStageComplete} />
        )}

        {currentStep === 4 && (
          <ShareMoments onChange={setCurrentStageComplete} />
        )}
        {currentStep === 5 && (
          <MomentsThatTouch onChange={setCurrentStageComplete} />
        )}
        {currentStep === 6 && (
          <WillYouBeMyVal onChange={setCurrentStageComplete} />
        )}
        {currentStep === 7 && (
          <GrandFinale onChange={setCurrentStageComplete} />
        )}
      </div>

      <div className="relative z-10 flex justify-between items-center gap-4 w-full max-w-lg mx-auto h-[10vh]">
        {canGoToPrevStep && (
          <Button
            size="lg"
            className="w-fit bg-white text-pink-600 font-semibold py-3 shadow-md hover:shadow-lg hover:bg-pink-100 active:bg-pink-200 transition-all duration-300"
            onClick={handlePrevStep}
          >
            Back
          </Button>
        )}
        <Button
          size="lg"
          className={`w-full font-semibold py-3 shadow-md transition-all duration-300 ${
            currentStageComplete
              ? "bg-white text-pink-600 hover:shadow-lg hover:bg-pink-100 active:bg-pink-200"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
          onClick={handleNextStep}
          disabled={!currentStageComplete}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default App;
