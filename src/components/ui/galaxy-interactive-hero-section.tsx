"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Github, Linkedin, Mail, ArrowUpRight, Sparkles, Cpu, BookOpen, Award } from "lucide-react";
import usmanPic from "../../../assets/usman.jpg";
import resumePdf from "../../../assets/resume.pdf";
import Magnetic from "./Magnetic";
import TextScramble from "./TextScramble";

const CYCLING_ROLES = [
  { prefix: "Currently an ", role: "AI & Machine Learning Student", suffix: " exploring RAG architectures." },
  { prefix: "Currently a ", role: "Frontend Developer", suffix: " crafting interactive UX." },
  { prefix: "Currently a ", role: "Computer Science Undergrad", suffix: " living in Islamabad." },
  { prefix: "Currently an ", role: "LLM & RAG Explorer", suffix: " building smart agents." }
];

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");
  const [ping, setPing] = useState(12);

  // Cycle roles descriptions every 2200ms
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIdx((prev) => (prev + 1) % CYCLING_ROLES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Monitor scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Guarantee continuous video play with catch fallback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch((err) => console.log("Hero background video playback note:", err));
  }, []);

  // Live Clock & Ping simulation
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    updateClock();
    const clockTimer = setInterval(updateClock, 1000);

    const pingTimer = setInterval(() => {
      setPing(Math.floor(Math.random() * 6) + 9);
    }, 3000);

    return () => {
      clearInterval(clockTimer);
      clearInterval(pingTimer);
    };
  }, []);

  // Scroll parallax logic for live background animations
  const { scrollY } = useScroll();
  const backgroundScale = useTransform(scrollY, [0, 1000], [1, 1.15]);
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 100]);
  const backgroundOpacity = useTransform(scrollY, [0, 1000], [0.8, 0.1]);
  const backgroundBlur = useTransform(scrollY, [0, 1000], ["blur(0px)", "blur(8px)"]);

  // Scroll parallax layers for content
  const textY = useTransform(scrollY, [0, 1000], [0, 50]);
  const cardY = useTransform(scrollY, [0, 1000], [0, -45]);

  return (
    <div className="relative w-full min-h-screen bg-transparent overflow-hidden flex flex-col justify-between">
      
      {/* ---------------- DEEP SPACE / GALAXY BACKGROUND GRAPHICS ---------------- */}
      <motion.div 
        style={{ 
          scale: backgroundScale, 
          y: backgroundY, 
          opacity: backgroundOpacity,
          filter: backgroundBlur
        }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        
        {/* Solid fallback breathtaking Galactic deep-space visual background illustration */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen scale-110"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1600&auto=format&fit=crop')"
          }}
        />

        {/* Dynamic Galactic space loop video player */}
        <video
          ref={videoRef}
          src="https://assets.mixkit.co/videos/preview/mixkit-starry-outer-space-background-loop-23214-large.mp4"
          muted
          loop
          playsInline
          autoPlay
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-45 filter brightness-[0.5] saturate-[1.1] mix-blend-lighten"
        />

        {/* Live floating glow orbs in back */}
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-green/10 blur-[130px] mix-blend-screen"
        />
        <motion.div
          animate={{
            x: [0, -90, 50, 0],
            y: [0, 70, -50, 0],
            scale: [1, 0.85, 1.1, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[160px] mix-blend-screen"
        />
        <motion.div
          animate={{
            x: [0, 40, -60, 0],
            y: [0, 50, -40, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[100px] mix-blend-screen"
        />

        {/* Cinematic dark gradients to ground the visual depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060608]/50 via-[#060608]/10 to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#0a0a0a]/80" />
      </motion.div>

      {/* ---------------- NAVIGATION HEADER ---------------- */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
        <div
          className={`inline-flex items-center rounded-full border border-white/10 transition-all duration-500 px-3 py-2 bg-black/60 backdrop-blur-md ${
            scrolled 
              ? "shadow-2xl shadow-black/95 scale-95" 
              : ""
          }`}
        >
          {/* Custom logo */}
          <Magnetic>
            <a 
              href="#" 
              className="flex items-center justify-center relative w-8 h-8 rounded-full bg-white/10 hover:scale-105 transition-transform duration-250"
            >
              <span className="text-white font-sans text-[12px] font-semibold">
                <TextScramble text="UB" />
              </span>
            </a>
          </Magnetic>

          {/* Divider */}
          <div className="w-px h-5 bg-white/10 mx-3 hidden sm:block" />

          {/* Nav links */}
          <div className="flex items-center gap-1 sm:gap-2">
            {[
              { label: "Home", href: "#" },
              { label: "About", href: "#about-us" },
              { label: "Skills", href: "#service" },
              { label: "Work", href: "#education-center" },
            ].map((link) => (
              <Magnetic key={link.label}>
                <a
                  href={link.href}
                  className="text-[11px] font-sans font-medium tracking-wide rounded-full px-3 py-1.5 text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <TextScramble text={link.label} />
                </a>
              </Magnetic>
            ))}
          </div>

          {/* Resume link */}
          <Magnetic>
            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              download="Usman_Bari_Resume.pdf"
              className="text-[11px] font-sans font-medium tracking-wide rounded-full px-3 py-1.5 text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <TextScramble text="Resume" />
            </a>
          </Magnetic>

          {/* Divider */}
          <div className="w-px h-5 bg-white/10 mx-3 hidden sm:block" />

          {/* Connect CTA Button */}
          <Magnetic>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-4 py-1.5 bg-white hover:bg-white/90 rounded-full text-[11px] font-sans font-semibold text-black transition-colors flex items-center gap-0.5 active:scale-95"
            >
              Say Hi
              <ArrowUpRight className="w-3 h-3 text-black" />
            </a>
          </Magnetic>
        </div>
      </header>

      {/* ---------------- MAIN HERO CONTENT (No Box) ---------------- */}
      <div className="relative z-10 flex-grow flex items-center justify-center px-4 sm:px-6 md:px-10 max-w-7xl mx-auto pt-36 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* LEFT SIDE: Content Description Panel (col-span-7) */}
          <motion.div 
            style={{ y: textY }}
            className="lg:col-span-7 text-left space-y-6 md:space-y-8 select-none order-1 lg:order-1"
          >
            
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full"
            >
              <Sparkles className="w-3 text-white/50 animate-pulse" />
              <span className="font-mono text-[9px] text-white/60 tracking-[0.25em] uppercase">
                COGNITIVE NETWORK CORE // SPECS
              </span>
            </motion.div>

            {/* Master Display Name */}
            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-5xl sm:text-7xl font-sans font-light tracking-[-0.02em] leading-[1.05] text-white"
              >
                Hi, I'm <br />
                <span className="font-display italic font-normal text-6xl sm:text-8xl text-white block mt-2">
                  Muhammad Usman Bari
                </span>
              </motion.h1>

              {/* Dynamic cycling role sentence with emphasis on AI learning */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="min-h-[3rem] sm:min-h-[2.5rem] flex items-center justify-start text-sm sm:text-base text-white/50 font-normal font-sans tracking-wide"
              >
                <p className="flex items-center flex-wrap">
                  <TextScramble 
                    key={`prefix-${roleIdx}`} 
                    text={CYCLING_ROLES[roleIdx].prefix} 
                    triggerOnHover={false} 
                    speed={20} 
                  />
                  <span className="font-display italic font-normal text-white text-[16px] sm:text-[18px] px-1">
                    <TextScramble 
                      key={`role-${roleIdx}`} 
                      text={CYCLING_ROLES[roleIdx].role} 
                      triggerOnHover={false} 
                      speed={15} 
                    />
                  </span>
                  <TextScramble 
                    key={`suffix-${roleIdx}`} 
                    text={CYCLING_ROLES[roleIdx].suffix} 
                    triggerOnHover={false} 
                    speed={20} 
                  />
                </p>
              </motion.div>
            </div>

            {/* Description paragraphs */}
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-sm sm:text-base text-white/70 leading-[1.6] font-normal"
              >
                I build modern web applications and intelligent AI systems using LLMs, RAG pipelines, and scalable software architectures.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-xs sm:text-sm text-white/50 font-light leading-[1.6]"
              >
                Currently focused on designing AI-driven solutions that combine natural language understanding, automation, and real-world problem solving.
              </motion.p>
            </div>

            {/* CTA action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Magnetic>
                <a
                  href="#education-center"
                  className="px-6 py-3 bg-white text-black hover:bg-white/95 rounded-full font-medium text-xs tracking-tight flex items-center gap-1 active:scale-95 transition-colors cursor-pointer"
                >
                  <TextScramble text="View Projects" />
                  <span className="text-xs">↗</span>
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href={resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Usman_Bari_Resume.pdf"
                  className="px-6 py-3 bg-white text-black hover:bg-white/95 rounded-full font-medium text-xs tracking-tight flex items-center justify-center gap-1 active:scale-95 transition-colors cursor-pointer"
                >
                  <TextScramble text="View CV" /> <span className="text-[10px]">↓</span>
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href="#contact"
                  className="px-6 py-3 bg-transparent hover:bg-white/5 text-white/60 hover:text-white rounded-full text-xs font-mono border border-white/5 active:scale-95 transition-colors flex items-center justify-center cursor-pointer"
                >
                  <TextScramble text="Contact Me" />
                </a>
              </Magnetic>
            </motion.div>

          </motion.div>

          {/* RIGHT SIDE: Exquisite Profile Card & Engine HUD (col-span-5) */}
          <motion.div 
            style={{ y: cardY }}
            className="lg:col-span-5 w-full flex flex-col justify-center items-center order-2 lg:order-2 gap-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] p-4 bg-[#141416]/50 backdrop-blur-xl border border-white/5 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] hover:shadow-[0_0_50px_rgba(0,210,255,0.15)] group hover:border-brand-green/35 transition-all duration-500"
            >
              {/* Spinning interactive scan indicators */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden z-10">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-green to-transparent animate-scan" />
              </div>

              {/* HUD corner lines */}
              <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-2 border-l-2 border-brand-green/30 pointer-events-none rounded-tl-lg" />
              <div className="absolute -top-1.5 -right-1.5 w-6 h-6 border-t-2 border-r-2 border-brand-green/30 pointer-events-none rounded-tr-lg" />
              <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 border-b-2 border-l-2 border-brand-green/30 pointer-events-none rounded-bl-lg" />
              <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-2 border-r-2 border-brand-green/30 pointer-events-none rounded-br-lg" />

              {/* Portrait Container */}
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black/60 shadow-inner">
                {/* Holographic screen coordinates overlay */}
                <div className="absolute top-3 left-3 z-20 font-mono text-[8px] text-zinc-400 bg-black/50 px-2 py-0.5 rounded border border-white/5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping" />
                  COG_LEARN_2026
                </div>

                <div className="absolute bottom-3 right-3 z-20 font-mono text-[8px] text-zinc-400 bg-black/50 px-2 py-0.5 rounded border border-white/5">
                  STUDY_NODE: ACTIVE
                </div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 halftone-grid opacity-30 z-10 pointer-events-none" />
                {/* Deep dramatic shadow block */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 z-10" />

                {/* Cyber overlay color mask */}
                <div className="absolute inset-0 bg-brand-green/5 mix-blend-color z-10 pointer-events-none group-hover:bg-transparent transition-all duration-500" />

                {/* Image of Usman */}
                <img 
                  src={usmanPic} 
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=700&auto=format&fit=crop";
                  }}
                  alt="Mohammad Usman Bari Portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter saturate-[0.8] contrast-[1.05] group-hover:scale-105 transition-transform duration-[1.5s]"
                />
              </div>

              {/* Bottom bio card info box with AI tags */}
              <div className="mt-4 pt-3 border-t border-white/5 space-y-2 text-left font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-zinc-400 font-semibold tracking-wider">USMAN BARI // STUDENT</span>
                  <Award className="w-3.5 h-3.5 text-brand-green" />
                </div>
                <p className="text-[9.5px] text-zinc-500 leading-normal">
                  "Computer Science student learning AI & Machine Learning, building modern web applications, and exploring LLM & RAG architectures."
                </p>
                
                <div className="flex flex-wrap gap-1 pt-1.5 border-t border-white/5">
                  <span className="text-[7.5px] px-1.5 py-0.5 bg-brand-green/10 text-brand-green border border-brand-green/20 rounded">
                    SYS.RAG
                  </span>
                  <span className="text-[7.5px] px-1.5 py-0.5 bg-[#89AACC]/10 text-[#89AACC] border border-[#89AACC]/20 rounded">
                    ML_CORE
                  </span>
                  <span className="text-[7.5px] px-1.5 py-0.5 bg-white/5 text-zinc-300 border border-white/10 rounded">
                    NEURAL_NETS
                  </span>
                </div>
              </div>

            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* ---------------- BOTTOM CYBER HUD STATUS BAR ---------------- */}
      <div className="relative z-10 w-full px-6 sm:px-12 pb-6 flex flex-col items-center gap-6">
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            document.getElementById("about-us")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[9px] font-mono tracking-[0.3em] text-zinc-500 uppercase mb-3">
            SCROLL_MATRIX
          </span>
          <div className="w-[1px] h-11 bg-white/10 relative overflow-hidden rounded-full">
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-brand-green to-transparent animate-scroll-down rounded-full shadow-[0_0_8px_#00d2ff]" />
          </div>
        </motion.div>

        {/* Live HUD metadata statistics bar */}
        <div className="w-full max-w-7xl border-t border-white/5 pt-4 flex flex-wrap justify-between items-center text-[9px] sm:text-[10px] font-mono text-zinc-500 tracking-wider">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-brand-green">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping" />
              SYS_ONLINE
            </span>
            <span>|</span>
            <span>PING: {ping}ms</span>
            <span>|</span>
            <span>LOC: ISLAMABAD, PK</span>
          </div>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <span>TIME: {time || "00:00:00"}</span>
            <span>|</span>
            <span>CORE_FLUX: 98.2%</span>
          </div>
        </div>

      </div>

    </div>
  );
}
