"use client";

import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div
      id="contact"
      className="flex flex-col items-center justify-center py-20 px-4 relative z-20"
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20"
      >
        ✨ Contact Me ✨
      </motion.h1>

      {/* Contact Boxes */}
      <div className="flex flex-col md:flex-row flex-wrap gap-8 w-full max-w-4xl justify-center items-center">
        {/* Email Glass Box */}
        <motion.a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=usmanbari2005@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-full md:w-1/3 p-10 rounded-2xl shadow-xl backdrop-filter backdrop-blur-lg bg-white bg-opacity-10 border border-gray-700 cursor-pointer transition-all duration-300 hover:scale-110 hover:border-purple-500 hover:shadow-purple-500/40"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -10 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center text-center">
            <motion.h2
              whileHover={{ rotate: [0, -10, 10, -5, 0] }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-white mb-2"
            >
              <span className="mr-2">📧</span>Email Me
            </motion.h2>
            <p className="text-base text-gray-300 group-hover:text-purple-400 transition">
              usmanbari2005@gmail.com
            </p>
          </div>
        </motion.a>

        {/* WhatsApp Glass Box */}
        <motion.a
          href="https://wa.me/923251053811"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-full md:w-1/3 p-10 rounded-2xl shadow-xl backdrop-filter backdrop-blur-lg bg-white bg-opacity-10 border border-gray-700 cursor-pointer transition-all duration-300 hover:scale-110 hover:border-cyan-500 hover:shadow-cyan-500/40"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ y: -10 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center text-center">
            <motion.h2
              whileHover={{ rotate: [0, 8, -8, 5, 0] }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-white mb-2"
            >
              <span className="mr-2">📱</span>WhatsApp Me
            </motion.h2>
            <p className="text-base text-gray-300 group-hover:text-cyan-400 transition">
              +92 325 1053811
            </p>
          </div>
        </motion.a>

        {/* LinkedIn Glass Box */}
        <motion.a
          href="https://www.linkedin.com/in/usman-bari-0b6806279/"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-full md:w-1/3 p-10 rounded-2xl shadow-xl backdrop-filter backdrop-blur-lg bg-white bg-opacity-10 border border-gray-700 cursor-pointer transition-all duration-300 hover:scale-110 hover:border-blue-500 hover:shadow-blue-500/40"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ y: -10 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center text-center">
            <motion.h2
              whileHover={{ rotate: [0, -8, 8, -5, 0] }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-white mb-2"
            >
              <span className="mr-2">💼</span>LinkedIn
            </motion.h2>
            <p className="text-base text-gray-300 group-hover:text-blue-400 transition">
              Connect with me
            </p>
          </div>
        </motion.a>
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-12 text-gray-400 text-sm"
      >
        ⚡ Let’s build something amazing together! 🚀
      </motion.p>
    </div>
  );
};

export default Contact;
