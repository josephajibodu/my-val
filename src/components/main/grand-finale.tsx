"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { SlideProps } from "@/types";
import { Button } from "../ui/button";
import { Heart, Music, Video, Mail } from "lucide-react";

const playlist = [
  { title: "Perfect", artist: "Ed Sheeran" },
  { title: "All of Me", artist: "John Legend" },
  { title: "Can't Help Falling in Love", artist: "Elvis Presley" },
  { title: "Thinking Out Loud", artist: "Ed Sheeran" },
  { title: "At Last", artist: "Etta James" },
];

export default function GrandFinale({ onChange }: SlideProps) {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-pink-100 to-white rounded-3xl shadow-2xl text-center h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-pink-600 mb-6">
          The Grand Finale: Love in Action 💖
        </h2>
        <p className="text-sm text-gray-700 mb-8">
          What's a love story without a little show of romance? Here's something
          special: a curated love video, a playlist of our songs, and a final
          heartfelt message from me to you, sealed with love. 🎶💌
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-md h-fit"
            whileHover={{ scale: 1.05 }}
          >
            <Video className="w-9 h-9 text-pink-500 mx-auto mb-2" />
            <h3 className="text-base font-semibold text-pink-600 mb-2">
              Our Love Story Video
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              A special video montage of our journey together.
            </p>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white">
              Watch Video
            </Button>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-md h-fit"
            whileHover={{ scale: 1.05 }}
          >
            <Music className="w-9 h-9 text-pink-500 mx-auto mb-2" />
            <h3 className="text-base font-semibold text-pink-600 mb-2">
              Our Love Playlist
            </h3>
            <ul className="text-left mb-4 hidden">
              {playlist.map((song, index) => (
                <li key={index} className="mb-2">
                  <span className="font-medium">{song.title}</span> -{" "}
                  {song.artist}
                </li>
              ))}
            </ul>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white">
              Listen to Playlist
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="mb-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => setShowMessage(true)}
            className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-xl transition"
          >
            Read My Final Message <Mail className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>

        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h3 className="text-base font-semibold text-pink-600 mb-4">
              My Heartfelt Message to You
            </h3>
            <p className="text-gray-700 mb-4 text-sm">
              Esther, my love, words cannot express how much you mean to me.
              Every day with you is a blessing, and I'm grateful for the love we
              share. You're not just my partner; you're my best friend, my
              confidant, and my soulmate. I promise to love, cherish, and
              support you always. Here's to many more beautiful moments
              together.
            </p>
            <p className="text-pink-600 font-semibold text-sm italic">
              Forever yours,
              <br />
              Joseph Oluwayomi Ajibodu 💕
            </p>
          </motion.div>
        )}

        <motion.div
          className="mt-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => onChange(true)}
            className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-xl transition"
          >
            Complete Our Journey <Heart className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
