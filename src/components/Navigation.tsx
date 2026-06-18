import { Github, Linkedin, Mail, Command } from "lucide-react";
import { motion } from "motion/react";

export default function Navigation() {
  return (
    <motion.div 
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-4 right-4 z-50 flex justify-center pointer-events-none"
    >
      <nav className="w-full max-w-4xl flex items-center justify-between px-4 py-2 sm:px-6 sm:py-3 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.8)] pointer-events-auto">
        
        {/* Animated Brand Head */}
        <div className="flex items-center gap-4">
          <a href="#hero" className="font-bold text-sm text-white tracking-tight flex items-center gap-2 group p-1.5 rounded-full hover:bg-white/5 transition-colors">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#2C5C88] to-cyan-400 flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
              <Command className="w-3.5 h-3.5 text-black" />
            </div>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-black text-white/95">
              USman BAri
            </span>
          </a>
        </div>

        {/* Floating Centered Hub pills */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
          {[
            { label: "01. About", path: "#about" },
            { label: "02. Core Skills", path: "#skills" },
            { label: "03. Systems Deck", path: "#projects" },
            { label: "04. History Node", path: "#experience" },
            { label: "05. Channel", path: "#contact" }
          ].map((nav) => (
            <motion.a
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
              whileTap={{ scale: 0.95 }}
              key={nav.label}
              href={nav.path}
              className="px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-white/80 hover:text-white rounded-full transition-colors duration-150"
            >
              {nav.label}
            </motion.a>
          ))}
        </div>

        {/* Dynamic Connect Hub */}
        <div className="flex items-center gap-1 bg-white/5 sm:bg-transparent rounded-full px-1 py-1">
          <motion.a
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.06)" }}
            href="https://github.com/UsmanBari"
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-all p-1.5 sm:p-2 rounded-full"
            aria-label="GitHub"
          >
            <Github className="w-3.5 h-3.5" />
          </motion.a>
          
          <motion.a
            whileHover={{ scale: 1.1, backgroundColor: "rgba(44,92,136,0.15)" }}
            href="https://linkedin.com"
            target="_blank"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-[#2C5C88] transition-all p-1.5 sm:p-2 rounded-full"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.06)" }}
            href="mailto:usmanbari2005@gmail.com"
            className="text-white/60 hover:text-white transition-all p-1.5 sm:p-2 rounded-full"
            aria-label="Email"
          >
            <Mail className="w-3.5 h-3.5" />
          </motion.a>
        </div>

      </nav>
    </motion.div>
  );
}

