import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ["service", "patient resources", "about us", "education center"];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-6 md:py-10 bg-gradient-to-b from-[#f1f1f1]/80 to-transparent backdrop-blur-[2px] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div id="nav-grid" className="grid grid-cols-12 items-center w-full">
          
          {/* Left (Cols 1-3) */}
          <div className="col-span-6 md:col-span-3 flex items-center gap-2">
            <svg 
              className="w-6 h-6 fill-[#1a1a1a]" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="12" cy="7" rx="3" ry="3" />
              <ellipse cx="12" cy="17" rx="3" ry="3" />
              <ellipse cx="7" cy="12" rx="3" ry="3" />
              <ellipse cx="17" cy="12" rx="3" ry="3" />
            </svg>
            <span className="font-display font-black text-xl tracking-tight text-[#1a1a1a] lowercase select-none">
              mėntality
            </span>
          </div>

          {/* Center (Cols 4-9) - Desktop hidden */}
          <div className="hidden md:flex md:col-span-6 justify-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.replace(/\s+/g, "-")}`}
                className="text-xs font-medium text-zinc-600 hover:text-[#1a1a1a] transition-all duration-200 lowercase tracking-wide relative group"
              >
                {link}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[1.5px] bg-[#1a1a1a] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right (Cols 10-12) */}
          <div className="col-span-6 md:col-span-3 flex items-center justify-end gap-3 md:gap-5">
            <a
              href="#find-help"
              className="hidden sm:inline-block text-xs font-medium text-zinc-650 hover:text-[#1a1a1a] transition-colors duration-200 lowercase"
            >
              find help
            </a>
            
            <a
              href="#get-started"
              className="bg-[#1a1a1a] text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-neutral-800 transition-all duration-300 hover:shadow-lg shadow-black/10 flex items-center gap-1.5"
            >
              get started <span className="text-[10px]">→</span>
            </a>

            {/* Elegant hamburger for mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center p-1.5 rounded-full hover:bg-black/5 transition-all w-8 h-8 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-4 h-4 text-zinc-900" /> : <Menu className="w-4 h-4 text-zinc-900" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Slide Down */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden w-full bg-white/95 backdrop-blur-md border-b border-black/[0.05] overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.replace(/\s+/g, "-")}`}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold text-zinc-700 hover:text-[#1a1a1a] py-1 transition-colors lowercase"
                >
                  {link}
                </a>
              ))}
              <hr className="border-black/[0.05] my-2" />
              <div className="flex items-center justify-between">
                <a
                  href="#find-help"
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-zinc-550 lowercase"
                >
                  find help
                </a>
                <span className="text-[10px] text-zinc-400 font-mono">mėntality // platform</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
}
