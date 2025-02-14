import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../ui/input";
import { SlideProps } from "@/types";
import { Heart } from "lucide-react";

const codes = [
  "Wuraola",
  "Ayoifeoluwasimi",
  "220896",
  "1872",
  "2019",
  "July",
  "November",
];

function Authentication({ onChange }: SlideProps) {
  const [code, setCode] = useState("");
  const [debouncedCode, setDebouncedCode] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCode(code);
    }, 500); // 500ms delay

    return () => clearTimeout(handler);
  }, [code]);

  // Validate input when debounced value updates
  useEffect(() => {
    const isCodeValid = codes.includes(debouncedCode.trim());
    setIsValid(isCodeValid);
    onChange(isCodeValid);
  }, [debouncedCode, onChange]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-lg mx-auto h-full rounded-3xl text-center flex flex-col items-center justify-center"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Heart className="w-16 h-16 text-pink-500 mb-6" />
      </motion.div>

      <h2 className="mb-6 text-2xl font-bold text-pink-700">
        Unlock Our Love Story
      </h2>

      <p className="mt-4 text-pink-700 text-lg">
        Enter a secret code that only we would know, a key to our special
        moments.
      </p>

      <motion.div
        className="mt-8 w-full max-w-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Input
          className="text-2xl h-16 bg-white bg-opacity-20 border-2 border-pink-300 placeholder:text-pink-300 placeholder:text-2xl rounded-full px-6 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter the secret code"
        />
        <p className="italic text-sm text-center mt-2 text-pink-600">
          It could be a name, date, or a special number.
        </p>
      </motion.div>

      <AnimatePresence>
        {isValid && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 text-green-500 font-bold"
          >
            Code accepted! ❤️ Our love story awaits...
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="mt-8 text-pink-600 underline"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowHint(!showHint)}
      >
        Need a hint?
      </motion.button>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 text-pink-600 italic"
          >
            Think of our names, important dates, or special numbers in our
            relationship.
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Authentication;
