import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CursorAura() {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for tracing absolute mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smoothing trailing coordinates offset
  const springX = useSpring(mouseX, { stiffness: 220, damping: 24, mass: 0.15 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 24, mass: 0.15 });

  useEffect(() => {
    // Hide cursor on touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Identify if cursor hovered over interactive nodes
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = 
          target.closest("a") || 
          target.closest("button") || 
          target.closest("input") || 
          target.closest("textarea") || 
          target.closest(".cursor-pointer") ||
          target.closest("[role='button']");
        
        setHovered(!!isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot following exactly */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />
      
      {/* Outer Ring lagging with physics spring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
        animate={{
          width: hovered ? 44 : 22,
          height: hovered ? 44 : 22,
          backgroundColor: hovered ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0)",
          borderColor: hovered ? "rgba(255, 255, 255, 0.45)" : "rgba(255, 255, 255, 0.18)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        style={{
          x: springX,
          y: springY,
        }}
      />
    </>
  );
}
