import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { SlideProps } from "@/types";

const codes = ["I love you", "I miss you", "I'm sorry", "I'm here"];

function Authentication({ onChange }: SlideProps) {
  const [code, setCode] = useState("");
  const [debouncedCode, setDebouncedCode] = useState("");

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCode(code);
    }, 500); // 500ms delay

    return () => clearTimeout(handler);
  }, [code]);

  // Validate input when debounced value updates
  useEffect(() => {
    if (codes.includes(debouncedCode.trim())) {
      onChange(true);
    } else {
      onChange(false);
    }
  }, [debouncedCode, onChange]);

  return (
    <div>
      <h2>
        Before you unlock this special experience, you need to prove that you
        truly deserve to see the awesomeness hidden within.
      </h2>
      <p className="mt-8">
        Enter the secret codes—codes only we would know, codes that remind us of
        our special moments.
      </p>

      <div className="mt-8">
        <Input
          className="text-4xl h-16"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <p className="italic text-xs text-center mt-2">Any code at all</p>
      </div>
    </div>
  );
}

export default Authentication;
