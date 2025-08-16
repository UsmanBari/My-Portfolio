"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col-reverse md:flex-row items-center justify-center px-6 sm:px-10 md:px-20 mt-20 md:mt-40 w-full z-[20] gap-10 md:gap-20"
    >
      {/* Left Content */}
      <div className="w-full flex flex-col gap-5 justify-center text-start">
        {/* Small top badge */}
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-2 px-3 border border-[#7042f88b] opacity-90 flex items-center text-sm sm:text-base"
        >
          <SparklesIcon className="text-[#b49bff] mr-2 h-5 w-5" />
          <h1 className="Welcome-text">
            Usman Bari – BS-CS Student at FAST NUCES Islamabad
          </h1>
        </motion.div>

        {/* Main heading */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-white max-w-[600px] leading-tight"
        >
          <span>
            Learning,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Building,
            </span>{" "}
            Improving
          </span>
        </motion.div>

        {/* Short bio */}
<motion.p
  variants={slideInFromLeft(0.8)}
  className="text-base sm:text-lg text-gray-400 my-5 max-w-[600px] text-justify"
>
  I&apos;m{" "}
  <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
    Usman Bari
  </span>
  , a 3rd-year BS Computer Science student at FAST NUCES Islamabad.
  I am interested in web development, with a major focus on front-end development,
  where I have built a number of projects. I also have experience developing C++ projects
  including games using SFML and GLUT, with my work spanning from sleek web designs
  to problem-solving through programming.
</motion.p>

        {/* Button */}
        <motion.a
          variants={slideInFromLeft(1)}
          href="#projects"
          className="py-2 px-6 button-primary text-center text-white cursor-pointer rounded-lg max-w-[180px] sm:max-w-[200px] text-sm sm:text-base"
        >
          View My Work
        </motion.a>
      </div>

      {/* Right Image */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="flex justify-center items-center w-full"
      >
        <Image
          src="/mainIconsdark.svg"
          alt="Development illustration"
          width={600}
          height={600}
          className="w-[280px] sm:w-[400px] md:w-[600px] h-auto"
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
