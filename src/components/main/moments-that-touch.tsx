"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SlideProps } from "@/types";
import { MessageCircle, Heart } from "lucide-react";
import { Button } from "../ui/button";

const messages = [
  {
    id: 1,
    type: "prayer",
    content: "May our love grow stronger with each passing day.",
  },
  {
    id: 2,
    type: "encouragement",
    content: "You are capable of amazing things. I believe in you!",
  },
  {
    id: 3,
    type: "support",
    content: "No matter what challenges we face, we'll face them together.",
  },
  {
    id: 4,
    type: "letter",
    content: "My dearest, your love is the greatest gift I've ever received...",
  },
  {
    id: 5,
    type: "message",
    content: "Just wanted to remind you how much you mean to me. ❤️",
  },
];

const MessageCard: React.FC<{ message: (typeof messages)[0] }> = ({
  message,
}) => (
  <motion.div
    className="bg-white rounded-lg shadow-lg py-6 px-2"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-sm font-semibold text-pink-600 mb-2 capitalize">
      {message.type}
    </h3>
    <p className="text-gray-700 text-lg">{message.content}</p>
  </motion.div>
);

export default function MomentsThatTouch({ onChange }: SlideProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextMessage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
  };

  return (
    <div className="max-w-4xl mx-auto h-full overflow-y-scroll p-8 bg-gradient-to-br from-pink-100 to-white rounded-3xl shadow-2xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <MessageCircle className="w-16 h-16 text-pink-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-pink-600 mb-6">
          Moments That Touch ❤️
        </h2>
        <p className="text-sm text-gray-700 mb-8">
          Sometimes, words fail to capture the depth of love, but actions never
          do. Here are some of the ways we've shown love to each other through
          prayers, encouragement, and support.
        </p>

        <div className="h-32 mb-8">
          <AnimatePresence mode="wait">
            <MessageCard key={currentIndex} message={messages[currentIndex]} />
          </AnimatePresence>
        </div>

        <motion.div
          className="mb-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={nextMessage}
            className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-xl transition"
          >
            Next Message <Heart className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => onChange(true)}
            className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-xl transition"
          >
            Continue to Next Step <Heart className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
