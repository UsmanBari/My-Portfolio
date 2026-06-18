import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative min-h-[110vh] sm:min-h-[140vh] w-full flex flex-col items-center justify-start overflow-hidden bg-bg-base">
      
      {/* Background Video Container */}
      <div className="absolute top-[15vh] sm:top-[20vh] left-0 w-full h-[95vh] sm:h-[120vh] z-0 pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-100"
        >
          <source 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4" 
            type="video/mp4" 
          />
        </video>
        
        {/* Gradient Mask to blend the video smoothly */}
        <div className="absolute top-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-b from-bg-base to-transparent" />
      </div>

      {/* Hero Content Alignment */}
      <div className="max-w-7xl w-full mx-auto px-8 md:px-16 lg:px-20 relative z-10 grid grid-cols-12 gap-x-4 md:gap-x-8 h-full">
        <div className="col-span-12 md:col-span-10 md:col-start-2 pt-[25vh] sm:pt-[28vh] flex flex-col justify-start">
          
          {/* Hero Header with elegant slide-up fade */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="font-display font-semibold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.1] lowercase text-left select-none"
          >
            <span className="text-[#1a1a1a] block mb-2 sm:mb-4">mentality offers</span>
            <span className="text-[#8e8e8e]">information</span>
            <br />
            <span className="text-[#8e8e8e]">and resources to help you manage</span>
            <br />
            <span className="text-[#8e8e8e] inline-flex items-center flex-wrap gap-x-2">
              your 
              <span className="w-[32px] md:w-[64px] lg:w-[84px] h-5 md:h-10 lg:h-12 border-[2px] border-[#1a1a1a] rounded-full inline-flex items-center justify-center mx-1 md:mx-2 bg-white/10 backdrop-blur-[1px]">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#1a1a1a] block" />
              </span>
              mental wellbeing.
            </span>
          </motion.h1>

          {/* Search Pill Component */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-8 sm:mt-12 max-w-sm sm:max-w-md w-full"
          >
            <div className="bg-white rounded-[6px] border border-black/[0.05] p-1.5 pl-4 flex items-center shadow-sm w-full">
              <input 
                type="text" 
                placeholder="Ask me anything..." 
                className="bg-transparent border-none outline-none text-[#1a1a1a] placeholder-zinc-400 text-xs sm:text-sm flex-1 w-full font-light"
              />
              <button 
                type="button"
                className="bg-[#1a1a1a] text-white w-8 h-8 sm:w-9 sm:h-9 rounded-full relative flex items-center justify-center hover:bg-neutral-800 transition-colors shrink-0"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Architectural Edge Anchors */}
      
      {/* Absolute middle right edge: language switcher */}
      <div className="absolute right-4 sm:right-8 lg:right-12 top-[45vh] transform -translate-y-1/2 z-20 flex sm:flex items-center gap-1 bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/60 p-1 px-3 rounded-full text-[10px] font-mono tracking-widest text-[#1a1a1a] cursor-pointer select-none transition-all">
        <span>pl</span>
        <span className="opacity-30">—</span>
        <span className="font-bold">en</span>
      </div>

      {/* Absolute bottom left corner */}
      <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12 z-20 text-[10px] sm:text-xs font-mono text-[#8e8e8e] tracking-wider">
        2024
      </div>

      {/* Absolute bottom right corner */}
      <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-12 z-20 text-[10px] sm:text-xs font-mono text-[#8e8e8e] tracking-wider lowercase">
        mental health tools
      </div>

    </section>
  );
}
