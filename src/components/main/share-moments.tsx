"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import type { SlideProps } from "@/types";
import { Button } from "../ui/button";
import { Camera, Heart } from "lucide-react";

const memories = [
  {
    id: 1,
    type: "image",
    src: "/placeholder.svg?height=300&width=300",
    caption: "Our first date",
  },
  {
    id: 2,
    type: "image",
    src: "/placeholder.svg?height=300&width=300",
    caption: "Celebrating your birthday",
  },
  {
    id: 3,
    type: "video",
    src: "/placeholder.mp4",
    caption: "Our favorite song",
  },
  {
    id: 4,
    type: "image",
    src: "/placeholder.svg?height=300&width=300",
    caption: "Our trip to the beach",
  },
  {
    id: 5,
    type: "image",
    src: "/placeholder.svg?height=300&width=300",
    caption: "Cooking together",
  },
];

const MemoryCard: React.FC<{ memory: (typeof memories)[0] }> = ({ memory }) => (
  <motion.div
    className="bg-white rounded-lg shadow-lg overflow-hidden"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {memory.type === "image" ? (
      <img
        src={memory.src || "/placeholder.svg"}
        alt={memory.caption}
        className="w-full h-48 object-cover"
      />
    ) : (
      <video src={memory.src} className="w-full h-48 object-cover" controls />
    )}
    <p className="p-4 text-center text-pink-600 font-medium">
      {memory.caption}
    </p>
  </motion.div>
);

export default function ShareMoments({ onChange }: SlideProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextMemory = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % memories.length);
  };

  const prevMemory = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + memories.length) % memories.length
    );
  };

  return (
    <div className="max-w-4xl h-full mx-auto p-8 bg-gradient-to-br from-pink-100 to-white rounded-3xl shadow-2xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Camera className="w-16 h-16 text-pink-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-pink-600 mb-6">
          Share Some Moments 📸
        </h2>
        <p className="text-sm text-gray-700 mb-8">
          A collection of our happiest moments—pictures, videos, and sweet
          memories that bring smiles to our faces. Reliving these moments is
          like falling in love all over again. 💑
        </p>

        <div className="relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <MemoryCard memory={memories[currentIndex]} />
          </motion.div>

          <Button
            onClick={prevMemory}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white rounded-full p-2"
          >
            ←
          </Button>
          <Button
            onClick={nextMemory}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white rounded-full p-2"
          >
            →
          </Button>
        </div>

        <motion.div
          className="mt-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
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
