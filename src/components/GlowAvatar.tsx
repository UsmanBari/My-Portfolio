import { motion } from "motion/react";
import { Cpu, Terminal, Sparkles, Orbit } from "lucide-react";

export default function GlowAvatar() {
  return (
    <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center pointer-events-auto">
      
      {/* Absolute Ambient Glow Backdrops */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(44,92,136,0.18)_0%,transparent_75%)] animate-pulse pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] bg-cyan-500/10 rounded-full blur-[70px] pointer-events-none" />

      {/* Rotating Tech Ring 1 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-[#2C5C88]/35 p-1 flex items-center justify-center pointer-events-none"
      >
        <span className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-[#2C5C88] shadow-[0_0_8px_#2C5C88]" />
      </motion.div>

      {/* Rotating Tech Ring 2 */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        className="absolute w-[245px] h-[245px] rounded-full border border-double border-white/5 p-1 flex items-center justify-center pointer-events-none"
      >
        <span className="absolute bottom-0 right-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
      </motion.div>

      {/* Core Isometric Hexagonal/Geometric Avatar Case */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative w-[190px] h-[190px] rounded-[40px] bg-gradient-to-tr from-neutral-900 via-neutral-950 to-neutral-900 border-2 border-white/10 flex items-center justify-center shadow-[0_15px_45px_rgba(0,0,0,0.9)] overflow-hidden group select-none cursor-crosshair p-[1.5px]"
      >
        {/* Core interior border glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2C5C88]/30 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Content Box */}
        <div className="w-full h-full rounded-[38px] bg-black/90 flex flex-col items-center justify-center relative p-6">
          
          {/* Abstract futuristic silhouette representation */}
          <div className="relative mb-3 flex items-center justify-center">
            
            {/* Glowing neon background grid inside */}
            <div className="absolute w-24 h-24 rounded-full bg-[#2C5C88]/10 blur-xl pointer-events-none" />
            
            {/* SVG Abstract developer neural brain graphic */}
            <svg 
              className="w-16 h-16 text-white/90 group-hover:text-cyan-400 group-hover:scale-105 transition-all duration-300"
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="40" r="16" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M50 24V14M50 56V66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M26 40H16M84 40H74" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M50 56C36.745 56 26 66.745 26 80H74C74 66.745 63.255 56 50 56Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              {/* Dynamic neural links coordinates */}
              <circle cx="50" cy="14" r="3" fill="#2C5C88" />
              <circle cx="16" cy="40" r="3" fill="cyan" />
              <circle cx="84" cy="40" r="3" fill="#2C5C88" />
            </svg>
          </div>

          <span className="text-[10px] font-mono tracking-[0.25em] text-[#2C5C88] font-bold uppercase mb-1">
            CORE_AGENT
          </span>
          <span className="text-[11px] font-bold text-white tracking-widest uppercase">
            UB_SYS_V26
          </span>

          <div className="absolute bottom-3 flex items-center gap-1.5 text-[8px] font-mono text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>PORTAL READY</span>
          </div>

        </div>
      </motion.div>

      {/* Floating Tactical Data labels surrounding the picture place */}
      <div className="absolute top-1 right-2 bg-black/80 backdrop-blur-xl border border-white/5 py-1 px-3 rounded-lg text-[8px] font-mono text-gray-400 shadow-md">
        SYS_REACTIVE: YES
      </div>

      <div className="absolute bottom-2 left-1 bg-black/80 backdrop-blur-xl border border-[#2C5C88]/20 py-1.5 px-2.5 rounded-lg text-[8px] font-mono text-[#2C5C88] shadow-md flex items-center gap-1.5">
        <Terminal className="w-2.5 h-2.5 animate-pulse" />
        <span>FPS_RATE: 60.00</span>
      </div>

    </div>
  );
}
