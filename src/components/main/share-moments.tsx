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
    src: "/images/moments/first-vacation-i-think.JPG",
    caption: "First vacation, I think",
  },
  {
    id: 2,
    type: "image",
    src: "/images/moments/how-did-you-win-me.JPG",
    caption: "How did you win me?",
  },
  {
    id: 3,
    type: "image",
    src: "/images/moments/my-hair.JPG",
    caption: "My hair",
  },
  {
    id: 4,
    type: "image",
    src: "/images/moments/our-graduate.JPG",
    caption: "Our graduate",
  },
  {
    id: 5,
    type: "video",
    src: "/images/moments/owambe-with-babe.mp4",
    caption: "Owambe with babe",
  },
  {
    id: 6,
    type: "image",
    src: "/images/moments/random-broke-christmas.JPG",
    caption: "Random broke Christmas",
  },
  {
    id: 7,
    type: "image",
    src: "/images/moments/she-loves-food.JPG",
    caption: "She loves food",
  },
  {
    id: 8,
    type: "image",
    src: "/images/moments/very-deligent.JPG",
    caption: "Very diligent",
  },
  {
    id: 9,
    type: "image",
    src: "/images/moments/wearing-my-trouser.JPG",
    caption: "Wearing my trouser",
  },
  {
    id: 10,
    type: "image",
    src: "/images/moments/why-she-open-mouth.JPG",
    caption: "Why she open mouth?",
  },
];

const MemoryCard: React.FC<{ memory: (typeof memories)[0] }> = ({ memory }) => (
  <div className="overflow-hidden flex flex-col h-full">
    <div className="flex-grow flex items-center justify-center p-4">
      {memory.type === "image" ? (
        <img
          src={memory.src || "/placeholder.svg"}
          alt={memory.caption}
          className="max-h-[40vh] w-auto object-contain rounded-lg"
        />
      ) : (
        <video
          src={memory.src}
          className="max-h-[40vh] w-auto object-contain rounded-lg"
          controls
        />
      )}
    </div>
    <p className="p-4 text-center text-pink-600 font-medium">
      {memory.caption}
    </p>
  </div>
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
    <div className="max-w-4xl h-full overflow-y-scroll mx-auto p-8 bg-gradient-to-br from-pink-100 to-white rounded-3xl shadow-2xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Camera className="w-12 h-12 text-pink-500 mx-auto mb-4" />
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
