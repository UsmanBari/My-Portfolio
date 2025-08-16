"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromTop } from "@/utils/motion";
import Image from "next/image";

const Encryption = () => {
  return (
    <div className="flex flex-col md:flex-row relative items-center justify-center min-h-screen w-full h-full px-4">
      {/* Top Heading */}
      <div className="absolute w-auto h-auto top-5 md:top-0 z-[5]">
        <motion.div
          variants={slideInFromTop}
          className="text-2xl md:text-4xl font-medium text-center text-gray-200"
        >
          Performance
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            {" "}
            &{" "}
          </span>
          Security
        </motion.div>
      </div>

      {/* Lock + Encryption box */}
      <div className="flex flex-col items-center justify-center -translate-y-10 md:-translate-y-14 absolute z-[20] w-auto h-auto">
        <div className="flex flex-col items-center group cursor-pointer w-auto h-auto">
          <Image
            src="/LockTop.png"
            alt="Lock top"
            width={50}
            height={50}
            className="w-[40px] md:w-[50px] translate-y-3 transition-all duration-200 group-hover:translate-y-8"
          />
          <Image
            src="/LockMain.png"
            alt="Lock Main"
            width={70}
            height={70}
            className="z-10 w-[55px] md:w-[70px]"
          />
        </div>

        <div className="Welcome-box px-3 py-1 z-[20] border my-5 border-[#7042f88b] opacity-90 rounded-lg">
          <h1 className="Welcome-text text-xs md:text-sm">Encryption</h1>
        </div>
      </div>

      {/* Bottom tagline */}
      <div className="absolute z-[20] bottom-3 md:bottom-5 px-2 text-center">
        <div className="cursive text-base md:text-lg font-medium text-gray-300">
          Secure your data with end-to-end encryption
        </div>
      </div>

      {/* Background video */}
      <div className="w-full flex items-start justify-center absolute">
        <video
          loop
          muted
          autoPlay
          playsInline
          preload="false"
          className="w-full h-full object-cover"
          src="/encryption.webm"
        />
      </div>
    </div>
  );
};

export default Encryption;
