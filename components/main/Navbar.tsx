"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = ["About Me", "Skills", "Experience", "Certifications", "Projects", "Contact"];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#030014cc] backdrop-blur-md shadow-lg shadow-[#2A0E61]/50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 sm:px-10 py-3">
        
        {/* Logo + Name */}
        <a href="#about-me" className="flex items-center gap-2">
          <Image
            src="/NavLogo.png"
            alt="logo"
            width={45}
            height={45}
            className="cursor-pointer hover:animate-slowspin"
          />
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent font-bold text-lg sm:text-2xl transition-all duration-500 hover:from-yellow-500 hover:via-red-500 hover:to-pink-500">
            Usman Bari
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center border border-[#7042f861] bg-[#0300145e] px-6 py-2 rounded-full text-gray-200 gap-6">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="cursor-pointer transition-all hover:text-[#7042f8] hover:scale-105"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Desktop Social Icons */}
        <div className="hidden sm:flex flex-row gap-5">
          <a href="https://github.com/UsmanBari" target="_blank" rel="noopener noreferrer" className="group">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="GitHub"
              width={24}
              height={24}
              className="transition-transform duration-300 group-hover:scale-110 invert"
            />
          </a>
          <a href="https://www.linkedin.com/in/usman-bari-0b6806279/" target="_blank" rel="noopener noreferrer" className="group">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
              alt="LinkedIn"
              width={24}
              height={24}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </a>
          <a href="https://instagram.com/usmanbari.ub" target="_blank" rel="noopener noreferrer" className="group">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram"
              width={24}
              height={24}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl focus:outline-none"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden flex flex-col items-center bg-[#030014e6] border-t border-[#7042f861] py-6 gap-6 text-gray-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Nav Links */}
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#7042f8] transition-colors"
              >
                {item}
              </a>
            ))}

            {/* Divider */}
            <div className="w-10 h-[1px] bg-gray-600"></div>

            {/* Social Icons */}
            <div className="flex flex-row gap-6">
              <a href="https://github.com/UsmanBari" target="_blank" rel="noopener noreferrer" className="group">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                  alt="GitHub"
                  width={28}
                  height={28}
                  className="transition-transform duration-300 group-hover:scale-110 invert"
                />
              </a>
              <a href="https://www.linkedin.com/in/usman-bari-0b6806279/" target="_blank" rel="noopener noreferrer" className="group">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                  alt="LinkedIn"
                  width={28}
                  height={28}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </a>
              <a href="https://instagram.com/usmanbari.ub" target="_blank" rel="noopener noreferrer" className="group">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                  alt="Instagram"
                  width={28}
                  height={28}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
