import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Mail, ArrowRight, Menu, ChevronDown, Sun, Moon } from 'lucide-react';

interface NavbarHeroProps {
  brandName?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  backgroundImage?: string;
  videoUrl?: string;
  emailPlaceholder?: string;
}

const NavbarHero: React.FC<NavbarHeroProps> = ({
  brandName = "nexus",
  heroTitle = "Innovation Meets Simplicity",
  heroDescription = "Discover cutting-edge solutions designed for the modern digital landscape.",
  backgroundImage = "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",
  videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  emailPlaceholder = "enter@email.com"
}) => {
  const [email, setEmail] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(false);
  }, []);

  const handleEmailSubmit = () => {
    console.log('Email submitted:', email);
  };

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsVideoPlaying(true);
      setIsVideoPaused(false);
    }
  };

  const handlePauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsVideoPaused(true);
    }
  };
  
  const handleResumeVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsVideoPaused(false);
    }
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    setIsVideoPaused(false);
  };

  const ThemeToggleButton = () => {
    if (!mounted) return <div className="w-10 h-10" />;
    return (
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="bg-muted hover:bg-border flex-shrink-0 p-2.5 rounded-full transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "light" ? <Moon className="h-5 w-5 text-foreground" /> : <Sun className="h-5 w-5 text-foreground" />}
      </button>
    );
  };

  return (
    <div className="w-full relative rounded-3xl overflow-hidden bg-zinc-950/20 border border-white/5 p-4 sm:p-6 my-8">
      {/* --- Media Header element used as visual focus container --- */}
      <header className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        <img 
          src={backgroundImage} 
          alt="Planetary cosmos focus" 
          className={`w-full h-full absolute inset-0 object-cover transition-opacity duration-1000 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`} 
        />
        <video 
          ref={videoRef} 
          src={videoUrl} 
          className={`w-full h-full absolute inset-0 object-cover transition-opacity duration-1000 ${isVideoPlaying ? 'opacity-100' : 'opacity-0'}`} 
          onEnded={handleVideoEnded} 
          playsInline 
          muted 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        <div className="absolute bottom-5 right-5 z-10">
          {!isVideoPlaying ? (
            <button 
              onClick={handlePlayVideo} 
              className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-brand-green hover:scale-110 hover:text-black hover:border-transparent transition-all duration-300 shadow-2xl text-white group cursor-pointer"
            >
              <Play className="h-6 w-6 ml-1 fill-current" />
            </button>
          ) : (
            <button 
              onClick={isVideoPaused ? handleResumeVideo : handlePauseVideo} 
              className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-brand-green hover:scale-110 hover:text-black hover:border-transparent transition-all duration-300 shadow-2xl text-white group cursor-pointer"
            >
              {isVideoPaused ? <Play className="h-6 w-6 ml-1 fill-current" /> : <Pause className="h-6 w-6" />}
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export { NavbarHero };
