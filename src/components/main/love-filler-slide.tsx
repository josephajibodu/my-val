"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import type { SlideProps } from "@/types";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";

export default function LoveFillerSlide({ onChange }: SlideProps) {
  const [fillPercentage, setFillPercentage] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [message, setMessage] = useState(
    "Hold the heart to fill it with love!"
  );

  const fillAnimation = useAnimation();
  const pulseAnimation = useAnimation();

  useEffect(() => {
    if (isHolding && fillPercentage < 100) {
      const interval = setInterval(() => {
        setFillPercentage((prev) => Math.min(prev + 2, 100));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isHolding, fillPercentage]);

  useEffect(() => {
    if (fillPercentage === 100) {
      setMessage("Your heart is full of love! ❤️");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.8 },
      });
      onChange(true);
    } else if (!isHolding && fillPercentage > 0) {
      const timeout = setTimeout(() => {
        setFillPercentage((prev) => Math.max(prev - 1, 0));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [fillPercentage, isHolding, onChange]);

  useEffect(() => {
    fillAnimation.start({
      scale: fillPercentage / 100,
      transition: { duration: 0.1 },
    });
  }, [fillPercentage, fillAnimation]);

  useEffect(() => {
    pulseAnimation.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.5, repeat: Number.POSITIVE_INFINITY },
    });
  }, [pulseAnimation]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHolding(true);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHolding(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHolding(true);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHolding(false);
  };

  return (
    <div className="max-w-md mx-auto h-full p-8 rounded-3xl shadow-2xl text-center flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">
        Fill Your Heart with Love
      </h2>
      <p className="text-lg text-pink-900 mb-8">{message}</p>

      <div className="relative w-48 h-48 mx-auto mb-8">
        {/* Pulsating Background */}
        <motion.div
          className="absolute inset-0 bg-pink-200 rounded-full"
          animate={pulseAnimation}
        />

        {/* Expanding Fill Effect */}
        <motion.div
          className="absolute inset-0 bg-pink-500 rounded-full"
          initial={{ scale: 0 }}
          animate={fillAnimation}
          style={{ transformOrigin: "center" }}
        />

        {/* Heart Icon (Top Layer) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onContextMenu={(e) => e.preventDefault()}
        >
          <Heart className="w-32 h-32 text-white" />
        </motion.div>
      </div>

      <p className="text-pink-600 font-semibold">
        {fillPercentage < 100
          ? `${fillPercentage}% filled with love`
          : "Your heart is overflowing with love!"}
      </p>

      {fillPercentage === 100 && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-lg text-pink-600 font-bold"
        >
          Now, let's begin our romantic journey!
        </motion.p>
      )}
    </div>
  );
}
