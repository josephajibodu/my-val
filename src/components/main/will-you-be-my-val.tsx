"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { SlideProps } from "@/types";
import { Button } from "../ui/button";
import { Heart, Gift } from "lucide-react";
import confetti from "canvas-confetti";

export default function WillYouBeMyVal({ onChange }: SlideProps) {
  const [answered, setAnswered] = useState(false);

  const handleYes = () => {
    setAnswered(true);
    onChange(true);
    confetti({
      particleCount: 1000,
      spread: 150,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="max-w-4xl h-full mx-auto p-8 bg-gradient-to-br from-pink-100 to-white rounded-3xl shadow-2xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Gift className="w-16 h-16 text-pink-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-pink-600 mb-6">
          Moving Forward: Will You Be My Val? 🌹
        </h2>
        <p className="text-sm text-gray-700 mb-8">
          Now that you've gone through our journey, my love, I have one final
          question:
        </p>

        <motion.div
          className="text-2xl font-bold text-pink-600 mb-8"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          Will you be my Valentine, Esther Alade?
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleYes}
            className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-xl transition text-xl"
            disabled={answered}
          >
            YES! <Heart className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>

        {answered && (
          <motion.p
            className="mt-8 text-xl text-pink-600 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Thank you, my love! ❤️ Let's continue our beautiful journey
            together.
          </motion.p>
        )}

        <p className="mt-4 text-gray-600 italic">
          (Click YES to continue… because there is no other acceptable answer
          😜)
        </p>
      </motion.div>
    </div>
  );
}
