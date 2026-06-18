import React, { useState, useEffect, useRef } from "react";
import { 
  Award, 
  Sparkles, 
  Check, 
  ArrowUpRight, 
  Cpu, 
  Code,
  BookOpen,
  MessageSquare,
  Database,
  Eye,
  Github,
  Linkedin,
  Mail,
  X,
  Send,
  Loader2,
  Terminal as TerminalIcon,
  ShieldAlert,
  ArrowUp
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { HeroSection } from "./components/ui/galaxy-interactive-hero-section";
import Loader from "./components/Loader";
import CosmicSkills from "./components/CosmicSkills";
import NeuralBackground from "./components/NeuralBackground";
import { ReactLenis } from "lenis/react";
import AIAssistant from "./components/AIAssistant";

import TiltCard from "./components/ui/TiltCard";
import TextScramble from "./components/ui/TextScramble";
import Magnetic from "./components/ui/Magnetic";
import CursorAura from "./components/ui/CursorAura";

// Complete unified list of projects for the chronological stagger timeline
const ALL_PROJECTS = [
  {
    id: "rag-assistant",
    title: "Enterprise RAG Knowledge Assistant",
    subtitle: "AI FLAGSHIP",
    scope: "Deep NLP Indexing",
    description: "An advanced Retrieval-Augmented Generation (RAG) system designed to process multiple documents and provide accurate, context-aware question answering using large language models. This project focuses on intelligent knowledge retrieval, semantic search, and AI-driven document understanding.",
    tech: ["Python", "LLMs", "RAG", "NLP", "Vector Databases", "AI Systems"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    highlights: [
      "📄 Multi-document PDF processing",
      "🧠 Context-aware LLM question answering",
      "🔍 Retrieval-Augmented Generation pipeline",
      "⚡ Fast and accurate semantic retrieval",
      "📊 Intelligent document understanding system",
      "🧩 Scalable architecture for enterprise use"
    ],
    github: "https://github.com/UsmanBari/Enterprise-RAG-Knowledge-Assistant",
    live: "https://usman-enterprise-rag-knowledge-model.netlify.app/"
  },
  {
    id: "querymind",
    title: "QueryMind",
    subtitle: "AI FLAGSHIP",
    scope: "Core AI Architecture",
    description: "An AI-powered system that converts natural language into SQL queries and automatically generates ERD diagrams from database structures. Built to simplify database interaction using LLMs and intelligent schema understanding.",
    tech: ["LLMs", "Python", "SQL", "Prompt Engineering", "AI Systems"],
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop",
    highlights: [
      "🧠 Natural language → SQL generation",
      "📊 Automatic ERD diagram generation",
      "⚡ LLM-powered query interpretation",
      "🔍 Database schema understanding",
      "🧩 Developer productivity automation tool"
    ],
    github: "https://github.com/UsmanBari/QueryMind",
    live: "https://querymindd.netlify.app/"
  },
  {
    id: "reading-comprehension",
    title: "Intelligent Reading Comprehension System",
    subtitle: "NLP COMPREHENSION",
    scope: "Linguistic Heuristics",
    description: "An NLP-based system designed to analyze textual content and generate meaningful insights, enabling better understanding and intelligent question answering.",
    tech: ["Python", "NLP", "Machine Learning", "AI Systems"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    highlights: [
      "📄 Text processing and analysis",
      "🧠 NLP-based comprehension engine",
      "❓ Intelligent question answering",
      "🔍 Context extraction from documents",
      "⚡ Efficient structured/unstructured processing"
    ],
    github: "https://github.com/UsmanBari"
  },
  {
    id: "smartbus",
    title: "SmartBus Transport System",
    subtitle: "SYSTEM SCHEDULER",
    scope: "Systems Logic",
    description: "A structured transport management system designed to handle routes, schedules, and bus data efficiently for improved accessibility and organization.",
    tech: ["Java", "SQL", "System Design"],
    image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=800&auto=format&fit=crop",
    highlights: [
      "🗺️ Route & schedule management",
      "📊 Structured transport data handling",
      "🔍 Easy information retrieval system",
      "⚡ Efficient system workflow design",
      "🧩 Modular and scalable architecture"
    ],
    github: "https://github.com/UsmanBari"
  },
  {
    id: "socially-app",
    title: "Socially – Social Media Android Application",
    subtitle: "MOBILE CLIENT",
    scope: "Native Engineering",
    description: "A full-stack social media platform with custom backend architecture, real-time communication, offline-first design, and advanced privacy features.",
    tech: ["Android", "Java", "REST APIs", "MySQL", "Firebase", "SQLite", "Agora"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    highlights: [
      "🔐 Authentication & session management",
      "💬 Real-time messaging system",
      "📸 Stories (24-hour media)",
      "📞 Voice & video calls (Agora API)",
      "🟢 Online/offline presence tracking",
      "📱 Offline-first SQLite architecture",
      "🔔 Push notifications (FCM)"
    ],
    github: "https://github.com/UsmanBari/23i-0680_23i-0536_SMD_Asignment3"
  },
  {
    id: "ai-chatbot",
    title: "AI Chatbot Application",
    subtitle: "GEMINI CLIENT",
    scope: "Conversational AI UX",
    description: "A full-stack chatbot application powered by Google Gemini API enabling real-time conversational AI interactions with a modern web interface.",
    tech: ["React", "Node.js", "Express", "Gemini API"],
    image: "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?q=80&w=800&auto=format&fit=crop",
    highlights: [
      "🤖 Gemini API integration",
      "💬 Real-time conversational AI",
      "⚙️ REST API backend architecture",
      "🎨 Responsive UI design",
      "🧩 Modular full-stack structure"
    ],
    github: "https://github.com/UsmanBari/Chatbot-App",
    live: "https://chatbot-frontend-tawny-iota.vercel.app/"
  },
  {
    id: "xonix-game",
    title: "Xonix Game (Data Structures Project)",
    subtitle: "DSA ARCADE",
    scope: "Data Structures & C++",
    description: "A C++ SFML-based recreation of the classic Xonix game implementing advanced data structures and real-time game logic.",
    tech: ["C++", "SFML", "Data Structures"],
    image: "https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?q=80&w=800&auto=format&fit=crop",
    highlights: [
      "🎮 Grid-based game mechanics",
      "🧠 Graph traversal algorithms",
      "📊 2D array-based state management",
      "⚡ Real-time collision detection",
      "🧩 Efficient memory + performance design"
    ],
    github: "https://github.com/UsmanBari/Xonix-Game-"
  },
  {
    id: "gameboy-clone",
    title: "Game Boy Console Clone",
    subtitle: "OOP HARDWARE",
    scope: "OOP Console Architecture",
    description: "A modular console system built in C++ using SFML featuring multiple mini-games and object-oriented design principles.",
    tech: ["C++", "OOP", "SFML"],
    image: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?q=80&w=800&auto=format&fit=crop",
    highlights: [
      "🎮 Multi-game system architecture",
      "🧩 OOP-based modular design",
      "🕹️ Hangman, Wordle, Snake integration",
      "🎨 SFML-based UI rendering",
      "⚙️ Scalable game engine structure"
    ],
    github: "https://github.com/UsmanBari/GameBoy---Console"
  }
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const footerVideoRef = useRef<HTMLVideoElement | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSending, setFormSending] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("usmanbari2005@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setFormSending(true);

    setTimeout(() => {
      setFormSending(false);
      setFormSuccess(true);
      
      // Open default mail client pre-populated with form state
      const bodyText = `Hi Usman,\n\nMy name is ${formName} (Reply to: ${formEmail}).\n\nMessage body:\n${formMessage}\n\n---\nSent via Portfolio Portal`;
      const mailtoUrl = `mailto:usmanbari2005@gmail.com?subject=${encodeURIComponent(formSubject || "Collaborative Synergy Request")}&body=${encodeURIComponent(bodyText)}`;
      window.location.href = mailtoUrl;

      // Resets after client opens
      setTimeout(() => {
        setFormName("");
        setFormEmail("");
        setFormSubject("");
        setFormMessage("");
        setFormSuccess(false);
      }, 5000);
    }, 1200);
  };

  // Scroll to Top visibility logic
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (loading) return;
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Play footer mirrored loop
  useEffect(() => {
    if (loading) return;
    const video = footerVideoRef.current;
    if (!video) return;
    video.play().catch((err) => console.log("Footer autoplay ignored:", err));
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <ReactLenis root>
          <motion.div 
            id="root-container" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="min-h-screen selection:bg-white/10 selection:text-white min-w-full text-zinc-100 overflow-x-hidden font-sans relative [background:transparent]"
          >
          {/* Animated 3D spatial particle grid backdrop */}
          <NeuralBackground />

          {/* Premium HLS streaming cosmic hero section */}
          <HeroSection />

          <main className="w-full relative z-10">
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 py-12 space-y-36">

              {/* ================= SECTION 2: ABOUT THE CODER ================= */}
              <section id="about-us" className="pt-16 scroll-mt-24">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
                >
                  
                  {/* Left Column Profile Info & Stats */}
                  <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
                    <div>
                      <span className="font-mono text-xs text-brand-green tracking-[0.3em] uppercase block mb-3">
                        01 // SYSTEM STUDIES / PROFILE
                      </span>
                      <h2 className="text-4xl md:text-6xl font-display italic text-white tracking-tight leading-tight">
                        <TextScramble text="Muhammad" /><br />
                        <TextScramble text="Usman Bari" delay={200} />
                      </h2>
                      {/* Gradient Line Accent */}
                      <div className="w-16 h-[2px] accent-gradient mt-4 rounded-full" />
                    </div>

                    {/* Clean interactive metadata box in place of the moved photo */}
                    <div className="bg-[#141416]/40 border border-white/5 rounded-3xl p-6 space-y-4 hover:border-brand-green/20 transition-all">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-ping" />
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#89AACC]">Learning Index Status</span>
                      </div>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        Currently an undergraduate Computer Science student specializing in Artificial Intelligence and Machine Learning, exploring custom retrieval vectors, LLMs, and RAG pipelines.
                      </p>
                    </div>

                    {/* Stats Highlights blocks */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#141416]/50 backdrop-blur-md border border-white/5 p-4 rounded-2xl flex flex-col justify-between hover:border-brand-green/20 transition-all duration-300">
                        <Cpu className="w-4 h-4 text-brand-green mb-2 animate-pulse" />
                        <div>
                          <span className="block text-xl font-display text-white font-medium italic">B.S.</span>
                          <span className="text-[8px] font-mono uppercase text-zinc-500 tracking-wider">COMPUTER SCIENCE</span>
                        </div>
                      </div>

                      <div className="bg-[#141416]/50 backdrop-blur-md border border-white/5 p-4 rounded-2xl flex flex-col justify-between hover:border-[#89AACC]/20 transition-all duration-300">
                        <Award className="w-4 h-4 text-[#89AACC] mb-2" />
                        <div>
                          <span className="block text-xl font-display text-white font-medium italic">META</span>
                          <span className="text-[8px] font-mono uppercase text-zinc-500 tracking-wider">FRONT-END GRAD</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column Narrative */}
                  <div className="lg:col-span-7 space-y-8">
                    <div className="bg-[#141416]/80 border border-white/5 rounded-2xl p-6 font-mono text-xs text-zinc-400 shadow-2xl relative backdrop-blur-md">
                      <div className="flex items-center justify-between pb-3 border-b border-white/[0.05] mb-4 text-[9px] text-zinc-600">
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-500/20" />
                          <span className="w-2 h-2 rounded-full bg-yellow-500/20" />
                          <span className="w-2 h-2 rounded-full bg-brand-green/20" />
                        </div>
                        <span>INTELLIGENCE_METRICS.sh</span>
                      </div>

                      <p className="text-[#89AACC] font-bold mb-2">&gt; cat cognitive.json</p>
                      <div className="pl-4 space-y-1 text-zinc-300">
                        <p>{`{`}</p>
                        <p className="pl-4">"scholar": "Computer Science Student (B.S.)",</p>
                        <p className="pl-4 text-brand-green">"focus": "Exploring Machine Learning & AI Systems",</p>
                        <p className="pl-4">"current_learning": ["LLMs", "RAG Pipelines", "Linguistic Embeddings"],</p>
                        <p className="pl-4">"credentials": "Meta Front-End Developer Certified",</p>
                        <p className="pl-4 text-brand-green">"learning_stack": ["Python", "JavaScript", "React.js", "SQL", "Gemini API"],</p>
                        <p className="pl-4">"objective": "Build practical systems to transform complex ideas into usable products"</p>
                        <p>{`}`}</p>
                      </div>
                      <p className="text-brand-green font-bold mt-4">&gt; _</p>
                    </div>

                    {/* Styled Paragraphs */}
                    <p className="text-base md:text-lg text-zinc-200 font-light leading-relaxed">
                      I am a <strong className="text-white font-semibold">Computer Science student</strong> with a strong foundation in software development and a growing specialization in <strong className="text-brand-green font-semibold">Artificial Intelligence and Machine Learning</strong>.
                    </p>

                    <p className="text-sm sm:text-base text-zinc-350 font-light leading-relaxed">
                      My journey began with frontend and full-stack development, where I worked with technologies like React, Next.js, Tailwind CSS, Node.js, and SQL to build responsive and scalable applications. Over time, my focus has shifted toward AI systems and intelligent software design.
                    </p>

                    <p className="text-sm sm:text-base text-zinc-350 font-light leading-relaxed">
                      I am particularly interested in Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), Natural Language Processing (NLP), and AI automation systems. I enjoy building practical applications that transform complex ideas into usable, intelligent products.
                    </p>

                    <p className="text-sm text-zinc-400 font-light leading-relaxed">
                      Currently, I am deepening my expertise in Python, machine learning fundamentals, and LLM-based application development, with a focus on building production-ready AI systems.
                    </p>
                  </div>

                </motion.div>
              </section>



              {/* ================= SECTION 3: RECTIFIED UNIFIED SKILLS CARD ================= */}
              <section id="service" className="pt-8 scroll-mt-24 border-t border-white/5">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-12"
                >
                  <div className="max-w-xl">
                    <span className="font-mono text-xs text-[#89AACC] tracking-[0.3em] uppercase block mb-3">
                      02 // TECHNICAL NODES
                    </span>
                    <h2 className="text-4xl md:text-6xl font-display italic text-white tracking-tight">
                      <TextScramble text="System" /> *<TextScramble text="capabilities" delay={150} />*
                    </h2>
                    <p className="text-zinc-500 font-light text-sm mt-4">
                      Every skill mapped clearly, displaying quantitative core fluency, machine learning architectures, and framework knowledge structures.
                    </p>
                  </div>

                  <CosmicSkills />
                </motion.div>
              </section>

              {/* ================= SECTION 4: SELECTED WORKS (ALTERNATING CHRONO TIMELINE) ================= */}
              <section id="education-center" className="pt-16 scroll-mt-24 border-t border-white/5">
                
                {/* Section header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6"
                >
                  <div>
                    <span className="font-mono text-xs text-brand-green tracking-[0.3em] uppercase block mb-3">
                      03 // CHRONOLOGICAL TIMELINE MATRIX
                    </span>
                    <h2 className="text-4xl md:text-6xl font-display italic text-white">
                      <TextScramble text="Selected" /> *<TextScramble text="milestones" delay={150} />*
                    </h2>
                    <p className="text-zinc-500 font-light text-sm mt-2">
                      An elite chronological list of built models flowing dynamically on alternating sides of the timeline logic.
                    </p>
                  </div>

                  <a 
                    href="https://github.com/UsmanBari"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest px-5 py-3 rounded-full border border-white/10 hover:border-brand-green/30 hover:bg-white/5 transition-all text-zinc-300 shrink-0 self-start md:self-end"
                  >
                    View Repository Central
                    <ArrowUpRight className="w-3.5 h-3.5 text-brand-green" />
                  </a>
                </motion.div>

                {/* Alternating Centered Timeline for ALL projects */}
                <div className="relative w-full">
                  
                  {/* Real vertical ruler line down the center (desktop) / left margin (mobile) */}
                  <div className="absolute left-[8px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-brand-green via-[#89AACC]/40 to-transparent pointer-events-none z-10" />

                  <div className="space-y-16">
                    {ALL_PROJECTS.map((proj, idx) => {
                      const isEven = idx % 2 === 0;
                      
                      return (
                        <div 
                          key={proj.id} 
                          className={`relative w-full flex flex-col md:flex-row items-stretch justify-between ${
                            isEven ? "flex-row" : "md:flex-row-reverse"
                          }`}
                        >
                          {/* Pulsing focal timeline dot element */}
                          <div className="absolute left-[8px] md:left-1/2 md:-translate-x-1/2 top-8 z-20">
                            <div className="w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-brand-green flex items-center justify-center relative shadow-[0_0_15px_var(--color-brand-green)]">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                            </div>
                          </div>

                          {/* Content block aligned on left or right */}
                          <div className={`w-full md:w-[46%] pl-8 md:pl-0 ${isEven ? "md:pr-10 text-left md:text-right" : "md:pl-10 text-left"}`}>
                            <TiltCard className="h-full w-full">
                              <motion.div
                                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                className="group relative h-full bg-[#141416]/50 backdrop-blur-[12px] border border-white/10 hover:border-brand-green/50 hover:bg-[#141416]/75 hover:shadow-[0_20px_50px_rgba(0,210,255,0.06)] rounded-3xl p-6 sm:p-8 overflow-hidden flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5"
                              >
                                {/* Glowing Accent Corner Overlay */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 blur-3xl rounded-full group-hover:bg-brand-green/10 transition-all duration-500 pointer-events-none" />
                                
                                {/* Horizontal Laser Border */}
                                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-brand-green to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 pointer-events-none" />

                                {/* Generic Halftone Grid Backdrop Overlay */}
                                <div className="absolute inset-0 halftone-grid opacity-15 pointer-events-none" />

                                <div className="relative z-10 space-y-5">
                                  
                                  {/* Status info pills */}
                                  <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : "justify-start"}`}>
                                    <span className="text-[10px] font-mono text-brand-green uppercase tracking-wider px-3 py-1 bg-black/80 rounded-full border border-brand-green/20 shadow-[0_0_10px_rgba(0,210,255,0.08)]">
                                      {proj.subtitle}
                                    </span>
                                    <span className="text-[10px] font-mono text-zinc-350 uppercase tracking-widest px-3 py-1 bg-[#141416]/90 rounded-full border border-white/10">
                                      {proj.scope}
                                    </span>
                                  </div>

                                  {/* Texts */}
                                  <div className="space-y-3">
                                    <h3 className="text-2xl sm:text-3xl font-display italic text-white group-hover:text-brand-green transition-colors leading-tight relative inline-block pb-1">
                                      {proj.title}
                                      <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isEven ? "md:origin-right origin-left" : "origin-left"}`} />
                                    </h3>
                                    <p className="text-xs sm:text-sm text-zinc-350 font-light leading-relaxed max-w-lg">
                                      {proj.description}
                                    </p>

                                    {/* Key highlights bullets */}
                                    {proj.highlights && (
                                      <ul className="text-xs text-zinc-400 space-y-1.5 my-4 pl-0 list-none text-left">
                                        {proj.highlights.map((h, i) => (
                                          <li key={i} className="flex items-start gap-2 text-left justify-start">
                                            <span className="text-brand-green shrink-0">•</span>
                                            <span>{h}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>

                                  {/* Tech labels stack */}
                                  <div className={`flex flex-wrap gap-1.5 pt-1 ${isEven ? "md:justify-end" : "justify-start"}`}>
                                    {proj.tech.map((t) => (
                                      <span key={t} className="text-[9px] font-mono px-2.5 py-1 bg-black/60 text-zinc-300 rounded-lg border border-white/5 group-hover:border-white/10 transition-colors">
                                        {t}
                                      </span>
                                    ))}
                                  </div>

                                  {/* Footer link */}
                                  <div className={`pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-zinc-400 ${
                                    isEven ? "md:flex-row-reverse" : "flex-row"
                                  }`}>
                                    <span className="uppercase tracking-widest text-zinc-500 font-medium">MILESTONE NODE</span>
                                    <div className="flex flex-wrap gap-4 items-center">
                                      {proj.github && (
                                        <a
                                          href={proj.github}
                                          target="_blank"
                                          referrerPolicy="no-referrer"
                                          rel="noopener noreferrer"
                                          className="text-brand-green flex items-center gap-1.5 hover:text-white transition-colors relative pb-0.5 group/link"
                                        >
                                          github()
                                          <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-green scale-x-0 group-hover/link:scale-x-100 origin-left transition-transform duration-200" />
                                        </a>
                                      )}
                                      {proj.live && (
                                        <a
                                          href={proj.live}
                                          target="_blank"
                                          referrerPolicy="no-referrer"
                                          rel="noopener noreferrer"
                                          className="text-[#89AACC] flex items-center gap-1.5 hover:text-white transition-colors relative pb-0.5 group/link"
                                        >
                                          live_demo()
                                          <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#89AACC] scale-x-0 group-hover/link:scale-x-100 origin-left transition-transform duration-200" />
                                        </a>
                                      )}
                                    </div>
                                  </div>

                                </div>
                              </motion.div>
                            </TiltCard>
                          </div>

                          {/* Empty visual column on desktop to offset items symmetrically */}
                          <div className="hidden md:block w-[46%]" />

                        </div>
                      );
                    })}
                  </div>

                </div>

              </section>

              <section id="patient-resources" className="pt-16 scroll-mt-24 border-t border-white/5">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
                >
                  
                  {/* Left Column cert badge */}
                  <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
                    <div>
                      <span className="font-mono text-xs text-brand-green tracking-[0.3em] uppercase block mb-3">
                        04 // SYSTEM EXPERIENCE
                      </span>
                      <h2 className="text-4xl md:text-6xl font-display italic text-white leading-tight">
                        <TextScramble text="Workflow" /> *<TextScramble text="records" delay={150} />*
                      </h2>
                      <div className="w-16 h-[2px] accent-gradient mt-4 rounded-full" />
                    </div>

                    <div className="p-6 bg-[#141416]/50 border border-white/5 rounded-3xl flex gap-4 items-start relative group hover:border-[#89AACC]/20 transition-all duration-300">
                      <Award className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-widest text-brand-green mb-1 font-bold">
                          ACCREDITATION
                        </h4>
                        <p className="text-xs text-white font-medium">
                          Meta Front-End Developer Professional Certificate
                        </p>
                        <p className="text-[9px] font-mono text-zinc-500 uppercase mt-2">
                          Standard Program // Issued by Meta Platforms
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column timeline nodes */}
                  <div className="lg:col-span-7 space-y-12 text-left">
                    
                    {/* Node 1 */}
                    <div className="relative pl-8 pb-4 border-l border-dashed border-white/10 group">
                      <span className="absolute left-0 -translate-x-1/2 top-1.5 w-3 h-3 rounded-full bg-black border border-brand-green group-hover:bg-brand-green transition-all" />
                      
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                            Industrial Practice Node
                          </span>
                          <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-brand-green transition-colors">
                            Web Development Intern
                          </h3>
                        </div>
                        <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono text-zinc-400 border border-white/5">
                          SYS_INTERN_A
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                        Executed modular backend interface points, formatted performant visual panels using standard JavaScript environments, and aligned Git version logs with absolute precision. Configured local databases and stabilized index operations.
                      </p>
                    </div>

                    {/* Node 2 */}
                    <div className="relative pl-8 pb-4 border-l border-none group">
                      <span className="absolute left-0 -translate-x-1/2 top-1.5 w-3 h-3 rounded-full bg-black border border-[#89AACC] group-hover:bg-[#89AACC] transition-all" />
                      
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                            Academic Major Node
                          </span>
                          <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-[#89AACC] transition-colors">
                            Computer Science Scholar Degree
                          </h3>
                        </div>
                        <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono text-[#89AACC] border border-white/5">
                          SYS_SCHOLAR_PROGRESS
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                        Interpreting runtime parameters, relational schema theory, structural logic layouts, complexity matrices, and standard machine learning algorithm models.
                      </p>
                    </div>

                  </div>

                </motion.div>
              </section>

              {/* ================= SECTION 6: QUANTITATIVE STATS ================= */}
              <section className="pt-16 pb-12 scroll-mt-24 border-t border-white/5">
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <div className="bg-[#141416]/20 border border-white/5 p-8 rounded-3xl text-center space-y-2 hover:border-[#89AACC]/20 transition-all hover:-translate-y-1 duration-300">
                    <span className="text-5xl md:text-6xl font-display italic text-white block">2.5+</span>
                    <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-[0.2em] block">Years Systems Progress</span>
                  </div>

                  <div className="bg-[#141416]/20 border border-white/5 p-8 rounded-3xl text-center space-y-2 hover:border-brand-green/20 transition-all hover:-translate-y-1 duration-300">
                    <span className="text-5xl md:text-6xl font-display italic text-white block">10+</span>
                    <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-[0.2em] block">Functional Codebases</span>
                  </div>

                  <div className="bg-[#141416]/20 border border-white/5 p-8 rounded-3xl text-center space-y-2 hover:border-[#89AACC]/20 transition-all hover:-translate-y-1 duration-300">
                    <span className="text-5xl md:text-6xl font-display italic text-white block">100%</span>
                    <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-[0.2em] block">Satisfied Integrity</span>
                  </div>
                </motion.div>
              </section>

              {/* ================= SECTION 7: CONTACT DIRECT MAIL SYSTEM ================= */}
              <section id="contact" className="pt-8 scroll-mt-24">
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#141416]/40 border border-white/5 shadow-3xl rounded-3xl p-6 sm:p-10 md:p-14 relative overflow-hidden backdrop-blur-xl"
                >
                  {/* Subtle background gradient flare */}
                  <div className="absolute right-0 bottom-0 w-96 h-96 bg-gradient-radial from-brand-green/[0.03] to-transparent pointer-events-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-stretch">
                    
                    {/* Left Grid: Contact Meta Channels & Direct Routing Links */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left">
                      <div className="space-y-4">
                        <span className="font-mono text-xs text-brand-green tracking-[0.3em] uppercase block">
                          05 // PORTAL INTEGRITY
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display italic text-white leading-tight">
                          <TextScramble text="Let's build" /> *<TextScramble text="together" delay={150} />*.
                        </h2>
                        <p className="text-zinc-400 font-light text-xs sm:text-sm leading-relaxed max-w-sm">
                          Interested in advanced Machine Learning pipelines, customized deep retrieval loops, or computer science collaborations? Deploy a transmission directly.
                        </p>
                      </div>

                      {/* Stacked quick link panels */}
                      <div className="space-y-3">
                        
                        {/* Direct Email copied status triggers */}
                        <div 
                          onClick={handleCopyEmail}
                          className="bg-black/50 hover:bg-black/80 border border-white/5 hover:border-brand-green/30 p-4 rounded-xl cursor-pointer transition-all duration-300 group flex justify-between items-center"
                        >
                          <div className="min-w-0 mr-2">
                            <span className="text-[8px] font-mono uppercase text-zinc-500 block mb-0.5">DIRECT ROUTING</span>
                            <span className="text-xs font-semibold text-zinc-300 font-mono break-all group-hover:text-brand-green transition-colors">
                              usmanbari2005@gmail.com
                            </span>
                          </div>
                          <div className="text-brand-green shrink-0">
                            {copiedEmail ? (
                              <Check className="w-4 h-4 text-emerald-400 animate-bounce" />
                            ) : (
                              <Check className="w-4 h-4 opacity-0 group-hover:opacity-45 transition-opacity" />
                            )}
                          </div>
                        </div>

                        {/* GitHub channel */}
                        <a 
                          href="https://github.com/UsmanBari"
                          target="_blank"
                          referrerPolicy="no-referrer"
                          rel="noopener noreferrer"
                          className="bg-black/50 hover:bg-black/80 border border-white/5 hover:border-brand-green/30 p-4 rounded-xl transition-all duration-300 flex justify-between items-center group"
                        >
                          <div>
                            <span className="text-[8px] font-mono uppercase text-zinc-500 block mb-0.5">SOURCE LEDGER</span>
                            <span className="text-xs font-semibold text-zinc-300 font-mono group-hover:text-[#89AACC] transition-colors">
                              github.com/UsmanBari
                            </span>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-[#89AACC] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </a>

                        {/* LinkedIn channel */}
                        <a 
                          href="https://www.linkedin.com/in/usman-bari-0b6806279/"
                          target="_blank"
                          referrerPolicy="no-referrer"
                          rel="noopener noreferrer"
                          className="bg-black/50 hover:bg-black/80 border border-white/5 hover:border-[#89AACC]/30 p-4 rounded-xl transition-all duration-300 flex justify-between items-center group"
                        >
                          <div>
                            <span className="text-[8px] font-mono uppercase text-zinc-500 block mb-0.5">PROFESSIONAL HUB</span>
                            <span className="text-xs font-semibold text-zinc-300 font-mono group-hover:text-brand-green transition-colors">
                              linkedin.com/in/usman-bari-0b6806279/
                            </span>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-[#89AACC] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </a>

                        {/* Signal Status block */}
                        <div className="bg-black/20 border border-white/5 p-4 rounded-xl flex justify-between items-center">
                          <div>
                            <span className="text-[8px] font-mono uppercase text-zinc-600 block mb-0.5">COGNITIVE NETWORK STATUS</span>
                            <span className="text-xs text-brand-green font-mono font-medium flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              AVAILABLE_FOR_AI_ML_AND_FULLSTACK_CONTRACTS
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Right Grid: Beautiful Contact Form Dispatcher */}
                    <div className="lg:col-span-7 bg-black/40 border border-white/5 hover:border-brand-green/10 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between text-left relative backdrop-blur-md">
                      
                      {/* Active transmission visual logs panel */}
                      <AnimatePresence>
                        {formSuccess && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-50 bg-black/95 rounded-2xl flex flex-col items-center justify-center p-6 text-center space-y-4"
                          >
                            <div className="w-12 h-12 rounded-full bg-brand-green/10 border border-brand-green flex items-center justify-center text-brand-green">
                              <Check className="w-6 h-6 animate-bounce" />
                            </div>
                            <div className="font-mono text-xs text-zinc-400 space-y-1">
                              <p className="text-brand-green font-bold">TRANSMISSION ENCRYPTED</p>
                              <p className="text-[10px]">REDIRECTING TO MAIL CLIENT...</p>
                            </div>
                            <p className="text-zinc-500 text-[10px] max-w-xs">
                              Thank you! Usman's mailbox handles your inquiry directly. Standard response index: 12-24 hours.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <form onSubmit={handleSubmitMessage} className="space-y-4">
                        
                        {/* Title header inside the form */}
                        <div className="flex items-center justify-between pb-3 border-b border-white/[0.05] text-[9px] font-mono text-zinc-500 select-none">
                          <span>ROUTING PARAMETERS // ALL NODES SECURED</span>
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping" />
                            SYS_DISPATCH: SECURE
                          </span>
                        </div>

                        {/* Staggered double column fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 block pl-1">
                              YOUR NAME
                            </label>
                            <input 
                              type="text" 
                              required
                              placeholder="e.g. Nicola Tesla"
                              value={formName}
                              onChange={(e) => setFormName(e.target.value)}
                              className="w-full bg-[#141416]/45 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-zinc-100 placeholder-zinc-650 focus:outline-none focus:border-brand-green/60 focus:ring-1 focus:ring-brand-green/40 transition-all duration-300"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 block pl-1">
                              EMAIL REFERENCE
                            </label>
                            <input 
                              type="email" 
                              required
                              placeholder="e.g. name@server.com"
                              value={formEmail}
                              onChange={(e) => setFormEmail(e.target.value)}
                              className="w-full bg-[#141416]/45 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-zinc-100 placeholder-zinc-650 focus:outline-none focus:border-brand-green/60 focus:ring-1 focus:ring-brand-green/40 transition-all duration-300"
                            />
                          </div>
                        </div>

                        {/* Subject */}
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 block pl-1">
                            TRANSMISSION TOPIC
                          </label>
                          <input 
                            type="text" 
                            placeholder="e.g. Advanced AI/ML Collaboration"
                            value={formSubject}
                            onChange={(e) => setFormSubject(e.target.value)}
                            className="w-full bg-[#141416]/45 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-zinc-100 placeholder-zinc-650 focus:outline-none focus:border-brand-green/60 focus:ring-1 focus:ring-brand-green/40 transition-all duration-300"
                          />
                        </div>

                        {/* Message */}
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 block pl-1">
                            MESSAGE STREAM
                          </label>
                          <textarea 
                            rows={4}
                            required
                            placeholder="Write your pipeline specifications or business inquiries here..."
                            value={formMessage}
                            onChange={(e) => setFormMessage(e.target.value)}
                            className="w-full bg-[#141416]/45 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-zinc-100 placeholder-zinc-650 focus:outline-none focus:border-brand-green/60 focus:ring-1 focus:ring-brand-green/40 resize-none transition-all duration-300"
                          />
                        </div>

                        {/* Transmit Trigger submit CTA button */}
                        <button
                          type="submit"
                          disabled={formSending}
                          className="w-full group relative inline-flex items-center justify-center p-[1px] rounded-xl overflow-hidden font-mono font-medium text-xs transition-all duration-300 disabled:opacity-50 cursor-pointer"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-brand-green to-[#89AACC] rounded-xl group-hover:rotate-180 transition-all duration-1000" />
                          <span className="relative w-full px-6 py-3.5 bg-[#0a0a0a] rounded-[11px] text-zinc-300 group-hover:text-white transition-all flex items-center justify-center gap-2">
                            {formSending ? (
                              <>
                                <Loader2 className="w-4 h-4 text-brand-green animate-spin" />
                                DISPATCHING_METRICS...
                              </>
                            ) : (
                              <>
                                <Send className="w-3.5 h-3.5 text-brand-green" />
                                TRANSMIT_MESSAGE()
                              </>
                            )}
                          </span>
                        </button>

                      </form>
                      
                    </div>

                  </div>
                </motion.div>
              </section>

            </div>
          </main>

          {/* ================= FOOTER LANDSCAPE MARQUEE & DETAILS ================= */}
          <footer className="relative w-full border-t border-white/5 bg-black/90 backdrop-blur-md pt-16 pb-12 overflow-hidden z-20">
            
            {/* Embedded space loop mirrored in background */}
            <div className="absolute inset-0 z-0 opacity-15 overflow-hidden pointer-events-none">
              <video
                ref={footerVideoRef}
                src="https://assets.mixkit.co/videos/preview/mixkit-starry-outer-space-background-loop-23214-large.mp4"
                muted
                loop
                playsInline
                autoPlay
                className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 transform scale-y-[-1]"
              />
              <div className="absolute inset-0 bg-black/85" />
            </div>

            {/* Marquee Loop (Repeated across background screen) */}
            <div className="relative z-10 w-full overflow-hidden border-b border-white/[0.05] pb-8 mb-8 select-none">
              <div className="flex whitespace-nowrap gap-12 text-zinc-550 text-3xl md:text-5xl font-display italic tracking-[0.1em] lowercase py-2 animate-pulse">
                <span className="flex-shrink-0">building machine learning pipelines •</span>
                <span className="flex-shrink-0">designing deep retrieval loops •</span>
                <span className="flex-shrink-0">establishing modular rag networks •</span>
                <span className="flex-shrink-0">meta development program graduate •</span>
                <span className="flex-shrink-0">securing database indexing schemas •</span>
              </div>
            </div>

            {/* Main credentials block */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6 text-[10px] font-mono text-zinc-500">
              <div className="space-y-1.5 font-mono">
                <p className="uppercase tracking-widest text-[#89AACC]">
                  MOHAMMAD USMAN BARI // COGNITIVE INTEGRATIONS PORTAL
                </p>
                <p className="text-[9px] text-zinc-650">
                  ESTABLISHED TO ACCREDITED LOCAL ACCORDANCES. SHIELD VERIFIED.
                </p>
              </div>

              <div className="text-center md:text-right space-y-1 font-mono">
                <p>© {new Date().getFullYear()} MU_B. NO RIGHTS UNFULFILLED.</p>
                <p className="text-[9px] uppercase tracking-wider text-brand-green">
                  Designed &amp; built in React with standard galactic loops, Instrument Serif &amp; Framer Motion
                </p>
              </div>
            </div>

          </footer>

          {/* Floating Back to Top Button */}
          <AnimatePresence>
            {showScrollTop && (
              <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
                <Magnetic>
                  <motion.button
                    onClick={scrollToTop}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3.5 bg-zinc-950/80 text-white border border-white/10 hover:border-white/20 rounded-full backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.8)] cursor-pointer transition-colors hover:bg-white hover:text-black flex items-center justify-center"
                    title="Scroll to Top"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </motion.button>
                </Magnetic>
              </div>
            )}
          </AnimatePresence>

          {/* Floating AI Assistant Chat Bot */}
          <AIAssistant />

          {/* Trailing Cursor Aura spotlight tracking */}
          <CursorAura />

          </motion.div>
        </ReactLenis>
      )}
    </>
  );
}
