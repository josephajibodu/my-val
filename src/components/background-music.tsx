import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import romanticMusic from "@/assets/romantic-music.mp3";

const BackgroundMusic = ({ canPlay = false }: { canPlay?: boolean }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleCanPlayThrough = () => {
      console.log("Music is fully buffered and ready to play.");
      setIsLoaded(true);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("canplaythrough", handleCanPlayThrough);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener(
          "canplaythrough",
          handleCanPlayThrough
        );
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && !isPlaying && canPlay) {
      audioRef.current
        .play()
        .catch((err) => console.log("Autoplay blocked:", err));
      setIsPlaying(true);
    }
  }, [canPlay, isPlaying]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        if (isLoaded) {
          audioRef.current.play();
        } else {
          console.log("Waiting for music to load...");
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="auto" loop src={romanticMusic}></audio>

      {/* Fixed Play/Pause Button */}
      <Button
        onClick={togglePlayPause}
        className="fixed bottom-5 right-5 z-50 bg-white text-pink-600 font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg hover:bg-pink-100 active:bg-pink-200 transition-all duration-300"
      >
        {isPlaying ? "Pause ⏸️" : "Play ▶️"}
      </Button>
    </div>
  );
};

export default BackgroundMusic;
