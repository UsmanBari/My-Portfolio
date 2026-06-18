import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoaderProps {
  onComplete: () => void;
}

const CYCLING_WORDS = ["Build", "Learn", "Create"];

export default function Loader({ onComplete }: LoaderProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2700; // 2.7 seconds load time

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(progress * 100);

      setCount(currentCount);

      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        setCount(100);
        const timeout = setTimeout(() => {
          onComplete();
        }, 400);
        return () => clearTimeout(timeout);
      }
    };

    requestAnimationFrame(step);
  }, [onComplete]);

  // Determine current cycling word based on percentage
  const currentWordIdx = Math.min(
    CYCLING_WORDS.length - 1,
    Math.floor(count / (100 / CYCLING_WORDS.length))
  );
  const activeWord = CYCLING_WORDS[currentWordIdx];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(15px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col justify-between p-8 sm:p-14 select-none font-sans"
    >
      {/* Top Header Row */}
      <div className="flex justify-between items-start">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-[0.3em]"
        >
          Portfolio // Usman Bari
        </motion.div>
        <div className="text-[9px] sm:text-[10px] text-zinc-650 font-mono tracking-wider uppercase">
          EST. 2026 // SYSTEM SECURE
        </div>
      </div>

      {/* Center Section: Animating Word */}
      <div className="relative flex justify-center items-center h-40">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeWord}
            initial={{ y: 30, opacity: 0, filter: "blur(5px)" }}
            animate={{ y: 0, opacity: 0.8, filter: "blur(0px)" }}
            exit={{ y: -30, opacity: 0, filter: "blur(5px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="font-display italic text-6xl sm:text-7xl md:text-8xl text-[#f5f5f5] tracking-tight absolute text-center"
          >
            {activeWord}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Footer Section */}
      <div className="w-full space-y-6">
        <div className="flex justify-between items-end">
          {/* Metadata */}
          <div className="max-w-xs text-[9px] sm:text-[10px] text-zinc-400 space-y-1 font-mono uppercase tracking-widest leading-relaxed text-left">
            <div>FAST NUCES Islamabad</div>
            <div>AI & Machine Learning</div>
          </div>

          {/* Large Tabular Counter */}
          <div className="text-7xl sm:text-8xl md:text-9xl font-display italic font-light text-[#f5f5f5] tabular-nums tracking-tighter leading-none select-none">
            {String(count).padStart(3, "0")}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-[2px] bg-zinc-900 w-full rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-white"
            style={{ 
              width: `${count}%`,
              boxShadow: "0 0 12px rgba(255, 255, 255, 0.6)"
            }}
            transition={{ ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
