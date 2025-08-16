"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";

const SkillText = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromTop}
        className="flex items-center gap-2 py-2 px-3 border border-[#7042f88b] rounded-md opacity-90"
      >
        <SparklesIcon className="text-[#b49bff] h-5 w-5" />
        <h1 className="text-xs sm:text-sm text-gray-200">Think better with Next.js 13</h1>
      </motion.div>

      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-xl sm:text-2xl md:text-3xl text-white font-medium mt-4 text-center"
      >
        Making apps with modern technologies
      </motion.div>

      <motion.div
        variants={slideInFromRight(0.5)}
        className="italic text-base sm:text-lg md:text-xl text-gray-300 mt-3 text-center"
      >
        Never miss a task, deadline or idea
      </motion.div>
    </div>
  );
};

export default SkillText;
