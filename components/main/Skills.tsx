"use client";

import {
  Backend_skill,
  Frontend_skill,
  Full_stack,
  Other_skill,
  Skill_data,
} from "@/constants";
import React from "react";
import SkillDataProvider from "../sub/SkillDataProvider";
import SkillText from "../sub/SkillText";
import { motion } from "framer-motion";
import { slideInFromTop } from "@/utils/motion";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, y: 50, transition: { duration: 0.6, ease: "easeIn" } },
};

const Skills = () => {
  return (
    <>
      {/* Skills Section */}
      <section
        id="skills"
        className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden pb-40 sm:pb-60 py-16 sm:py-20"
      >
        <SkillText />

        {/* SCALE WRAPPER for mobile responsiveness */}
        <div className="origin-top transition-transform duration-300 scale-[0.72] xs:scale-[0.78] sm:scale-[0.88] md:scale-100">
          {/* Skill Categories */}
          <div className="flex flex-row justify-center md:justify-around flex-nowrap md:flex-wrap mt-4 gap-3 sm:gap-5 items-center">
            {Skill_data.map((image, index) => (
              <SkillDataProvider
                key={index}
                src={image.Image}
                width={image.width}
                height={image.height}
                index={index}
              />
            ))}
          </div>

          <div className="flex flex-row justify-center md:justify-around flex-nowrap md:flex-wrap mt-4 gap-3 sm:gap-5 items-center">
            {Frontend_skill.map((image, index) => (
              <SkillDataProvider
                key={index}
                src={image.Image}
                width={image.width}
                height={image.height}
                index={index}
              />
            ))}
          </div>

          <div className="flex flex-row justify-center md:justify-around flex-nowrap md:flex-wrap mt-4 gap-3 sm:gap-5 items-center">
            {Backend_skill.map((image, index) => (
              <SkillDataProvider
                key={index}
                src={image.Image}
                width={image.width}
                height={image.height}
                index={index}
              />
            ))}
          </div>

          <div className="flex flex-row justify-center md:justify-around flex-nowrap md:flex-wrap mt-4 gap-3 sm:gap-5 items-center">
            {Full_stack.map((image, index) => (
              <SkillDataProvider
                key={index}
                src={image.Image}
                width={image.width}
                height={image.height}
                index={index}
              />
            ))}
          </div>

          <div className="flex flex-row justify-center md:justify-around flex-nowrap md:flex-wrap mt-4 gap-3 sm:gap-5 items-center">
            {Other_skill.map((image, index) => (
              <SkillDataProvider
                key={index}
                src={image.Image}
                width={image.width}
                height={image.height}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Background Video */}
        <div className="w-full h-full absolute">
          <div className="w-full h-full z-[-10] opacity-40 absolute flex items-center justify-center bg-cover">
            <video
              className="w-full h-auto"
              preload="false"
              playsInline
              loop
              muted
              autoPlay
              src="/cards-video.webm"
            />
          </div>
        </div>
      </section>
      

      {/* Experience Section */}
      <section
        id="experience"
        className="relative flex flex-col items-center justify-center py-24 px-12 overflow-hidden"
      >
        <motion.div
          variants={slideInFromTop}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-[40px] font-medium text-center text-gray-200 mb-12"
        >
          Experience
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            {" "} Journey
          </span>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{
            scale: 1.03,
            backgroundColor: "rgba(255,255,255,0.08)",
            boxShadow: "0 0 25px rgba(147,197,253,0.3)",
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="backdrop-blur-2xl bg-white/5 border border-white/10 
          rounded-2xl shadow-lg p-10 max-w-5xl w-full text-center text-white 
          transition-all duration-500 hover:shadow-purple-500/30"
        >
          <h3 className="text-2xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Web Development Intern (Remote)
          </h3>
          <p className="text-lg mb-8 text-gray-300 italic">
            CodeAlpha • Summer 2025
          </p>
          <ul className="list-disc list-inside space-y-3 text-gray-300 text-left max-w-3xl mx-auto leading-relaxed">
            <li>Built interactive and responsive UIs with React & Tailwind.</li>
            <li>Collaborated remotely with mentors & peers on real projects.</li>
            <li>Enhanced skills in modern frameworks & industry best practices.</li>
            <li>Delivered functional, optimized components used in live projects.</li>
          </ul>
        </motion.div>

        <div className="w-full h-full absolute">
          <div className="w-full h-full z-[-10] opacity-40 absolute flex items-center justify-center bg-cover">
            <video
              className="w-full h-auto"
              preload="false"
              playsInline
              loop
              muted
              autoPlay
              src="/cards-video.webm"
            />
          </div>
        </div>
      </section>

      {/* Licenses & Certifications Section */}
      <section
        id="certifications"
        className="relative flex flex-col items-center justify-center py-24 px-12 overflow-hidden"
      >
        <motion.div
          variants={slideInFromTop}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-[40px] font-medium text-center text-gray-200 mb-12"
        >
          Licenses & 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            {" "} Certifications
          </span>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
          {/* Meta Frontend */}
          <motion.a
            href="https://www.coursera.org/account/accomplishments/specialization/Y8HCE6SB2DML"
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl shadow-lg p-6 text-center transition-all duration-500 hover:shadow-purple-500/30 cursor-pointer"
          >
            <img src="/certs/meta.png" alt="Meta Frontend Development" className="w-full h-64 object-cover rounded-xl mx-auto mb-4 hover:scale-105 transition-transform" />
            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Meta Front-End Development Specialization
            </h3>
          </motion.a>

          {/* JavaScript */}
          <motion.a
            href="https://www.coursera.org/account/accomplishments/verify/P15VI5XLZDLV"
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl shadow-lg p-6 text-center transition-all duration-500 hover:shadow-purple-500/30 cursor-pointer"
          >
            <img src="/certs/javascript.png" alt="Programming with JavaScript" className="w-full h-64 object-cover rounded-xl mx-auto mb-4 hover:scale-105 transition-transform" />
            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Programming with JavaScript
            </h3>
          </motion.a>

          {/* Google Data Analytics */}
          <motion.a
            href="https://www.coursera.org/account/accomplishments/specialization/8YME4NOLYO7D"
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl shadow-lg p-6 text-center transition-all duration-500 hover:shadow-purple-500/30 cursor-pointer"
          >
            <img src="/certs/google.png" alt="Google Data Analytics" className="w-full h-64 object-cover rounded-xl mx-auto mb-4 hover:scale-105 transition-transform" />
            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Google Data Analytics Specialization
            </h3>
          </motion.a>

          {/* Microsoft Fundamentals */}
          <motion.a
            href="https://www.coursera.org/account/accomplishments/specialization/IECVIQORSLTW"
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl shadow-lg p-6 text-center transition-all duration-500 hover:shadow-purple-500/30 cursor-pointer"
          >
            <img src="/certs/microsoft.png" alt="Microsoft 365 Fundamentals" className="w-full h-64 object-cover rounded-xl mx-auto mb-4 hover:scale-105 transition-transform" />
            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Microsoft 365 Fundamentals
            </h3>
          </motion.a>
        </div>
      </section>
    </>
  );
};

export default Skills;
