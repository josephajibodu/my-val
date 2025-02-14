import React, { useState, useEffect } from "react";
import { useStep } from "./hooks/useStep";
import Authentication from "./components/main/authentication";
import { Button } from "./components/ui/button";
import AnimatedBackground from "./components/animated-background";
import RomanticQuiz from "./components/main/romantic-quiz";

function App() {
  const [currentStep, { goToNextStep, canGoToPrevStep, goToPrevStep }] =
    useStep(10);

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
  }

  function handlePrevStep(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    event.preventDefault();
    goToPrevStep();
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-2xl text-white bg-gradient-to-r from-pink-300 to-pink-200 px-8 py-16 overflow-hidden h-[100vh]">
      <AnimatedBackground />

      {/* Content */}
      <div className="relative z-10 mb-8 h-[5vh]">
        <h1 className="text-5xl font-bold">Hiiiiiii 🫶🏼</h1>
      </div>

      <div className="relative z-10 max-w-lg mx-auto flex-1 h-[90vh]">
        {currentStep === 1 && (
          <Authentication onChange={setCurrentStageComplete} />
        )}
        {currentStep === 2 && (
          <RomanticQuiz onChange={setCurrentStageComplete} />
        )}
      </div>

      <div className="relative z-10 flex justify-between gap-4 w-full max-w-lg mx-auto mt-8 h-[5vh]">
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
