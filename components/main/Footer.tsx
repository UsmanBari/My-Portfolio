"use client";

import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="w-full bg-[#030014] py-6 mt-16 border-t border-gray-700 relative z-50">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-6">
        
        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gray-400 text-sm text-center md:text-left"
        >
          © {new Date().getFullYear()} Usman Bari. All rights reserved.
        </motion.p>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex gap-6 text-gray-400 relative z-50"
        >
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/usman-bari-0b6806279/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="hover:text-[#0077b5] transition-colors duration-300 transform hover:scale-110"
          >
            <FaLinkedin size={28} />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/UsmanBari"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="hover:text-white transition-colors duration-300 transform hover:scale-110"
          >
            <FaGithub size={28} />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/usmanbari.ub/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram profile"
            className="hover:text-pink-500 transition-colors duration-300 transform hover:scale-110"
          >
            <FaInstagram size={28} />
          </a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;