import { useEffect, useRef } from "react";

interface CosmicStar {
  x: number; // 3D coordinates
  y: number;
  z: number;
  size: number;
  type: "brand" | "accent" | "white";
  hueShift: number;
  speed: number;
  alpha: number;
  hue: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface SpaceDust {
  x: number;
  y: number;
  radius: number;
  color: string;
  angle: number;
  spinSpeed: number;
  distance: number;
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });
  const mousePixelRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef({ current: 0, target: 0 });
  const settingsRef = useRef({
    speedFactor: 8.0,
    warpFactor: 1.0,
    theme: "void",
  });

  useEffect(() => {
    const handleControl = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        if (customEvent.detail.speedFactor !== undefined) {
          settingsRef.current.speedFactor = customEvent.detail.speedFactor;
        }
        if (customEvent.detail.warpFactor !== undefined) {
          settingsRef.current.warpFactor = customEvent.detail.warpFactor;
        }
        if (customEvent.detail.theme !== undefined) {
          settingsRef.current.theme = customEvent.detail.theme;
        }
      }
    };
    window.addEventListener("cosmic-control", handleControl);
    return () => {
      window.removeEventListener("cosmic-control", handleControl);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: CosmicStar[] = [];
    let clouds: SpaceDust[] = [];
    let animationId: number;
    let width = 0;
    let height = 0;

    // Set origin to center for easier 3D projections
    const initCosmos = (w: number, h: number) => {
      stars = [];
      const count = Math.min(w, h) < 768 ? 150 : 380;
      
      // Initialize Stars in 3D Space
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * Math.max(w, h) * 1.2;
        
        let type: "brand" | "accent" | "white" = "white";
        const rand = Math.random();
        if (rand > 0.82) {
          type = "brand";
        } else if (rand > 0.92) {
          type = "accent";
        }

        // Random 3D distribution
        stars.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          z: Math.random() * 800 + 100, // Depth component
          size: Math.random() * 1.5 + 0.5,
          type,
          hueShift: Math.random() * 30 - 15,
          speed: Math.random() * 0.2 + 0.05,
          alpha: Math.random() * 0.7 + 0.3,
          hue: Math.random() * 360,
          pulseSpeed: 0.01 + Math.random() * 0.03,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }

      // Initialize Colorful Cosmic Nebulae clouds
      clouds = [];
      for (let i = 0; i < 7; i++) {
        clouds.push({
          x: (Math.random() - 0.5) * w,
          y: (Math.random() - 0.5) * h,
          radius: Math.random() * (Math.min(w, h) * 0.5) + Math.min(w, h) * 0.3,
          color: "", // Set dynamically during frame render
          angle: Math.random() * Math.PI * 2,
          spinSpeed: (Math.random() - 0.5) * 0.0003,
          distance: Math.random() * (Math.min(w, h) * 0.2)
        });
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initCosmos(width, height);
    };

    const animate = () => {
      const theme = settingsRef.current.theme;
      const speedFactor = settingsRef.current.speedFactor;
      const warpFactor = settingsRef.current.warpFactor;

      // Determine cloud colors based on theme
      let cloudColors = [
        "rgba(0, 210, 255, 0.08)",
        "rgba(59, 130, 246, 0.06)",
        "rgba(147, 51, 234, 0.05)",
        "rgba(20, 20, 25, 0.4)"
      ];

      if (theme === "orange") {
        cloudColors = [
          "rgba(249, 115, 22, 0.08)",
          "rgba(234, 88, 12, 0.06)",
          "rgba(217, 70, 239, 0.05)",
          "rgba(20, 20, 25, 0.4)"
        ];
      } else if (theme === "green") {
        cloudColors = [
          "rgba(16, 185, 129, 0.09)",
          "rgba(5, 150, 105, 0.07)",
          "rgba(6, 182, 212, 0.05)",
          "rgba(20, 20, 25, 0.4)"
        ];
      } else if (theme === "void") {
        cloudColors = [
          "rgba(255, 255, 255, 0.03)",
          "rgba(120, 120, 120, 0.02)",
          "rgba(60, 60, 60, 0.02)",
          "rgba(10, 10, 12, 0.5)"
        ];
      }

      // 1. Solid deep space backdrop
      ctx.fillStyle = "#010101";
      ctx.fillRect(0, 0, width, height);

      // Damp mouse coordinate parallax interpolations smoothly
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Damp scroll tracking for dynamic depth
      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * 0.05;

      const centerX = width / 2;
      const centerY = height / 2;

      // 2. Render Nebular interactive dust streams (Background Layer)
      clouds.forEach((cloud, i) => {
        cloud.angle += cloud.spinSpeed;
        
        // Calculate coordinate projection rotated with absolute spin speed
        const currentDistance = cloud.distance + scrollRef.current.current * 0.1;
        const projX = centerX + cloud.x + Math.cos(cloud.angle) * currentDistance + mouseRef.current.x * 0.22;
        const projY = centerY + cloud.y + Math.sin(cloud.angle) * currentDistance + mouseRef.current.y * 0.22;

        const baseColor = cloudColors[i % cloudColors.length];
        const radialGlow = ctx.createRadialGradient(projX, projY, 0, projX, projY, cloud.radius);
        radialGlow.addColorStop(0, baseColor);
        radialGlow.addColorStop(0.5, baseColor.replace(/[\d.]+\)$/, "0.03)"));
        radialGlow.addColorStop(1, "transparent");

        ctx.fillStyle = radialGlow;
        ctx.beginPath();
        ctx.arc(projX, projY, cloud.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Add elegant abstract celestial space grid guidelines
      let gridStroke = "rgba(0, 210, 255, 0.015)";
      if (theme === "orange") gridStroke = "rgba(249, 115, 22, 0.012)";
      else if (theme === "green") gridStroke = "rgba(16, 185, 129, 0.012)";
      else if (theme === "void") gridStroke = "rgba(255, 255, 255, 0.007)";

      ctx.strokeStyle = gridStroke;
      ctx.lineWidth = 1;
      const radialDensity = Math.min(width, height) * 0.22;
      for (let r = radialDensity; r < Math.max(width, height) * 1.5; r += radialDensity) {
        ctx.beginPath();
        ctx.arc(centerX + mouseRef.current.x * 0.1, centerY + mouseRef.current.y * 0.1, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Base color parameters for stars
      let baseHue = 190; // cyan
      let baseSat = 95;
      let baseLight = 75;
      if (theme === "orange") {
        baseHue = 25; // orange/gold
      } else if (theme === "green") {
        baseHue = 140; // aurora green
      } else if (theme === "void") {
        baseSat = 0;
        baseLight = 85;
      }

      // 3. Render and project Stars in high speed 3D parallax coordinates
      for (const star of stars) {
        // Slow continuous move in 3D space depth z
        star.z -= star.speed * (1 + scrollRef.current.current * 0.015) * speedFactor;
        if (star.z <= 0) {
          star.z = 900; // Reset depth back to background edge
          star.x = (Math.random() - 0.5) * width * 1.8;
          star.y = (Math.random() - 0.5) * height * 1.8;
        }

        // Project relative coordinates to screen with focal length scaling
        const focalLength = 320;
        const scale = focalLength / star.z;
        
        // Mouse coordinates affect camera rotation (3D Parallax offset)
        const parallaxOffsetX = mouseRef.current.x * scale * 0.55;
        const parallaxOffsetY = mouseRef.current.y * scale * 0.55;

        let projectedX = centerX + star.x * scale + parallaxOffsetX;
        let projectedY = centerY + star.y * scale + parallaxOffsetY - (scrollRef.current.current * scale * 0.15);

        // Interactive mouse cursor attraction pull
        if (mouseRef.current.active) {
          const dx = projectedX - mousePixelRef.current.x;
          const dy = projectedY - mousePixelRef.current.y;
          const dist = Math.hypot(dx, dy);
          const threshold = 180; // Attraction range radius
          
          if (dist < threshold && dist > 1) {
            const force = (threshold - dist) / threshold; // Proportional pull force
            const pullStrength = 0.22 * force;
            projectedX -= dx * pullStrength;
            projectedY -= dy * pullStrength;
          }
        }

        // Keep inside bounds projection
        if (
          projectedX >= 0 && 
          projectedX <= width && 
          projectedY >= 0 && 
          projectedY <= height
        ) {
          // Dynamic star pulse shimmer
          star.pulsePhase += star.pulseSpeed;
          const shimmerRatio = Math.sin(star.pulsePhase) * 0.4 + 0.6;
          
          const renderedSize = Math.max(0.4, star.size * scale * shimmerRatio);
          const calculatedAlpha = Math.min(1, star.alpha * (scale * 1.25));

          // Compute star color dynamically
          let starHue = baseHue;
          if (star.type === "accent") {
            starHue = (baseHue + 40) % 360;
          }
          const starColor = star.type === "white"
            ? "#ffffff"
            : `hsl(${starHue + star.hueShift}, ${baseSat}%, ${baseLight}%)`;

          ctx.fillStyle = starColor;
          ctx.strokeStyle = starColor;
          ctx.globalAlpha = calculatedAlpha;

          // Warp Mode Trail Effect
          if (warpFactor > 1.0) {
            const trailLength = star.speed * warpFactor * 3.5;
            const prevScale = focalLength / (star.z + trailLength);
            const prevProjectedX = centerX + star.x * prevScale + mouseRef.current.x * prevScale * 0.55;
            const prevProjectedY = centerY + star.y * prevScale + mouseRef.current.y * prevScale * 0.55 - (scrollRef.current.current * prevScale * 0.15);

            ctx.lineWidth = Math.max(0.5, star.size * scale * 0.6);
            ctx.beginPath();
            ctx.moveTo(prevProjectedX, prevProjectedY);
            ctx.lineTo(projectedX, projectedY);
            ctx.stroke();
          } else {
            // Draw star point
            ctx.beginPath();
            if (star.size > 1.25 && scale > 1.2) {
              // Draw mini sparkles for large prominent markers
              const spSize = renderedSize * 2.2;
              ctx.moveTo(projectedX - spSize, projectedY);
              ctx.quadraticCurveTo(projectedX, projectedY, projectedX, projectedY - spSize);
              ctx.quadraticCurveTo(projectedX, projectedY, projectedX + spSize, projectedY);
              ctx.quadraticCurveTo(projectedX, projectedY, projectedX, projectedY + spSize);
              ctx.quadraticCurveTo(projectedX, projectedY, projectedX - spSize, projectedY);
            } else {
              ctx.arc(projectedX, projectedY, renderedSize, 0, Math.PI * 2);
            }
            ctx.fill();
          }
        }
      }

      ctx.globalAlpha = 1.0; // Reset canvas context state
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const relY = (e.clientY / window.innerHeight - 0.5) * -70;
      const relX = (e.clientX / window.innerWidth - 0.5) * -70;
      mouseRef.current.targetX = relX;
      mouseRef.current.targetY = relY;
      mouseRef.current.active = true;
      
      // Keep track of mouse absolute coordinate pixels
      mousePixelRef.current.x = e.clientX;
      mousePixelRef.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        const relY = (touch.clientY / window.innerHeight - 0.5) * -70;
        const relX = (touch.clientX / window.innerWidth - 0.5) * -70;
        mouseRef.current.targetX = relX;
        mouseRef.current.targetY = relY;
        mouseRef.current.active = true;

        // Keep track of touch coordinate pixels
        mousePixelRef.current.x = touch.clientX;
        mousePixelRef.current.y = touch.clientY;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.active = false;
    };

    const handleScroll = () => {
      scrollRef.current.target = window.scrollY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 bg-[#010101] pointer-events-none transition-opacity duration-1000"
    />
  );
}

