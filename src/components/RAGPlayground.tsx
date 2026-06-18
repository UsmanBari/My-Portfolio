import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Database, Search, ArrowRight, Brain, Terminal, Loader2, Sparkles, Check } from "lucide-react";

interface DocumentChunk {
  title: string;
  content: string;
  score: number;
}

interface SimulatedQuery {
  id: string;
  query: string;
  chunks: DocumentChunk[];
  answer: string;
}

const SIMULATED_DATA: Record<string, SimulatedQuery> = {
  projects: {
    id: "projects",
    query: "What are Usman's primary AI/ML projects?",
    chunks: [
      {
        title: "Enterprise RAG Assistant",
        content: "Usman built a Retrieval-Augmented Generation (RAG) assistant utilizing context-aware question answering, PDF document loaders, and vector indexes.",
        score: 0.94
      },
      {
        title: "QueryMind",
        content: "QueryMind is an AI system that translates natural language text queries into SQL queries and generates ERD database diagrams automatically.",
        score: 0.88
      },
      {
        title: "Intelligent Comprehension System",
        content: "An NLP comprehension tool written in Python to extract insights, perform linguistic analysis, and answer textual questions.",
        score: 0.82
      }
    ],
    answer: "Usman's primary AI/ML projects are: \n\n1. **Enterprise RAG Knowledge Assistant**: A document question-answering tool that processes PDFs and parses them using vector search.\n2. **QueryMind**: A model that translates natural language queries into SQL database scripts and visualizes ERDs using LLMs.\n3. **Intelligent Reading Comprehension System**: An NLP platform focused on semantic content extraction."
  },
  skills: {
    id: "skills",
    query: "What is Usman's technical background?",
    chunks: [
      {
        title: "FAST NUCES Education",
        content: "Usman is an undergraduate Computer Science student at FAST NUCES Islamabad, focusing on AI, Machine Learning, and frontend software engineering.",
        score: 0.95
      },
      {
        title: "AI Stack & Python",
        content: "His primary stack for AI applications is Python, vector databases, Google @google/genai, Groq Llama-3, RAG, and multi-agent orchestrations.",
        score: 0.89
      },
      {
        title: "Meta Professional Certification",
        content: "Usman holds a Meta Front-End Developer Professional Certificate, demonstrating mastery in responsive layouts, React, and UX workflows.",
        score: 0.84
      }
    ],
    answer: "Usman is currently pursuing a **B.S. in Computer Science** at **FAST NUCES Islamabad**. He is certified as a **Meta Front-End Developer** and specializes in Python-based AI development, RAG systems, LLMs, and modular web interfaces (React, Next.js, and Tailwind CSS)."
  }
};

export default function RAGPlayground() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [step, setStep] = useState(0); // 0: Idle, 1: Query Embedding, 2: Cosine Similarity DB, 3: Context Assembly, 4: LLM Generation
  const [streamedText, setStreamedText] = useState("");
  const [currentQuery, setCurrentQuery] = useState<SimulatedQuery | null>(null);

  // Trigger RAG pipeline sequence
  const startPipeline = (queryId: string) => {
    setSelectedId(queryId);
    setCurrentQuery(SIMULATED_DATA[queryId]);
    setStep(1);
    setStreamedText("");
  };

  useEffect(() => {
    if (step === 0 || !currentQuery) return;

    let timer: NodeJS.Timeout;

    if (step === 1) {
      // Step 1 -> Step 2: Embedding computation (1.2s)
      timer = setTimeout(() => setStep(2), 1200);
    } else if (step === 2) {
      // Step 2 -> Step 3: DB Scan (1.5s)
      timer = setTimeout(() => setStep(3), 1500);
    } else if (step === 3) {
      // Step 3 -> Step 4: Prompt Context inject (1.2s)
      timer = setTimeout(() => setStep(4), 1200);
    } else if (step === 4) {
      // Step 4: Token stream generation (char by char)
      let charIdx = 0;
      const targetText = currentQuery.answer;
      
      const textInterval = setInterval(() => {
        if (charIdx < targetText.length) {
          setStreamedText(targetText.substring(0, charIdx + 1));
          charIdx++;
        } else {
          clearInterval(textInterval);
        }
      }, 15);

      return () => clearInterval(textInterval);
    }

    return () => clearTimeout(timer);
  }, [step, currentQuery]);

  const resetSimulator = () => {
    setSelectedId(null);
    setStep(0);
    setStreamedText("");
    setCurrentQuery(null);
  };

  return (
    <div className="bg-[#0b0b0d]/40 border border-white/5 p-6 sm:p-10 rounded-3xl relative overflow-hidden shadow-2xl backdrop-blur-md text-left space-y-8">
      {/* Grid halftone texture overlay */}
      <div className="absolute inset-0 halftone-grid opacity-10 pointer-events-none" />

      {/* Header and Telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/5 gap-4 relative z-10">
        <div>
          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block mb-1">
            01.5 // COGNITIVE SIMULATOR
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-1.5">
            RAG Vector Playground
            <Brain className="w-4 h-4 text-white/40" />
          </h3>
        </div>

        <div className="flex items-center gap-4 text-[9px] font-mono text-zinc-500 tracking-wider">
          <span className="flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${step > 0 ? "bg-white animate-ping" : "bg-zinc-700"}`} />
            STATUS: {step === 0 ? "IDLE" : step === 4 ? "GENERATING" : "SEARCHING"}
          </span>
          <span>|</span>
          <span>PIPELINE: ACTIVE</span>
        </div>
      </div>

      {/* Grid: Inputs left, Pipeline visualizer right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-stretch">
        
        {/* Left Column: Sample prompts and Trigger buttons */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#89AACC] font-bold">
              Select Semantic Query
            </h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Click a question to run a simulated real-time vector search. Watch how chunks are calculated, matched, and context-injected to synthesize the answer.
            </p>

            <div className="space-y-2.5 pt-2">
              {Object.keys(SIMULATED_DATA).map((key) => {
                const item = SIMULATED_DATA[key];
                const isSelected = selectedId === key;
                return (
                  <button
                    key={key}
                    onClick={() => startPipeline(key)}
                    disabled={step > 0 && step < 4}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? "bg-white border-white text-black"
                        : "bg-black/40 border-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <Search className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-black" : "text-zinc-500 group-hover:text-white"}`} />
                      <span className="text-xs font-mono truncate leading-none">{item.query}</span>
                    </div>
                    <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isSelected ? "text-black translate-x-1" : "text-zinc-500 group-hover:text-white group-hover:translate-x-1"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reset widget button */}
          {step > 0 && (
            <button
              onClick={resetSimulator}
              className="px-5 py-2.5 bg-transparent border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-xl text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors cursor-pointer self-start active:scale-95"
            >
              Reset Pipeline
            </button>
          )}
        </div>

        {/* Right Column: High-tech Visual Pipeline Steps */}
        <div className="lg:col-span-7 bg-black/40 border border-white/5 rounded-2xl p-5 sm:p-6 space-y-6 flex flex-col justify-between relative min-h-[350px]">
          
          <AnimatePresence mode="wait">
            {step === 0 ? (
              /* State 0: Waiting for selection */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-grow flex flex-col items-center justify-center text-center p-8 space-y-3"
              >
                <Terminal className="w-8 h-8 text-zinc-650 animate-pulse" />
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  Awaiting cognitive transmission input...
                </p>
              </motion.div>
            ) : (
              /* State > 0: RAG Pipeline Active steps */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4 flex-grow flex flex-col justify-between"
              >
                {/* Step Indicators Tracker */}
                <div className="grid grid-cols-4 gap-1 pb-4 border-b border-white/5 text-[8px] font-mono text-zinc-500 tracking-wider">
                  <div className={`flex flex-col gap-1 pb-1.5 border-b-2 transition-colors ${step >= 1 ? "border-white text-white" : "border-zinc-900"}`}>
                    <span>1. EMBED</span>
                  </div>
                  <div className={`flex flex-col gap-1 pb-1.5 border-b-2 transition-colors ${step >= 2 ? "border-white text-white" : "border-zinc-900"}`}>
                    <span>2. RETRIEVE</span>
                  </div>
                  <div className={`flex flex-col gap-1 pb-1.5 border-b-2 transition-colors ${step >= 3 ? "border-white text-white" : "border-zinc-900"}`}>
                    <span>3. AUGMENT</span>
                  </div>
                  <div className={`flex flex-col gap-1 pb-1.5 border-b-2 transition-colors ${step >= 4 ? "border-white text-white" : "border-zinc-900"}`}>
                    <span>4. STREAM</span>
                  </div>
                </div>

                <div className="space-y-4 my-auto py-2">
                  {/* Pipeline Console Panel */}
                  <div className="bg-[#0c0c0e]/95 border border-white/5 p-4 rounded-xl font-mono text-[10px] space-y-2 text-zinc-400 max-h-[200px] overflow-y-auto">
                    
                    {/* Log 1: Query Embeddings */}
                    {step >= 1 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                        <p className="text-zinc-650 flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-400" />
                          [EMBED] COMPUTING SEMANTIC ARRAYS...
                        </p>
                        <p className="text-[9px] pl-4 text-zinc-500">Query Vector: [0.084, -0.119, 0.442, ... d=1536]</p>
                      </motion.div>
                    )}

                    {/* Log 2: Vector Database Search */}
                    {step >= 2 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1 pt-1 border-t border-white/5">
                        <p className="text-zinc-650 flex items-center gap-1.5">
                          {step > 2 ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Loader2 className="w-3 h-3 text-white animate-spin" />
                          )}
                          [DB_RETRIEVAL] RUNNING COSINE SIMILARITY SCAN...
                        </p>
                        <div className="pl-4 space-y-0.5 text-zinc-500 text-[9px]">
                          {currentQuery?.chunks.map((c, i) => (
                            <p key={i} className={step > 2 ? "text-white/80" : ""}>
                              - Match Node: "{c.title}" &rarr; <span className="font-bold">Score: {c.score.toFixed(2)}</span>
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Log 3: Augmented Prompt Assembly */}
                    {step >= 3 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1 pt-1 border-t border-white/5">
                        <p className="text-zinc-650 flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-400" />
                          [PROMPT_INJECT] CONTEXT SCAFFOLDED
                        </p>
                        <p className="text-[8.5px] pl-4 text-zinc-500 italic max-w-sm truncate">
                          "System Prompt: Answer using Context... Context: {currentQuery?.chunks.map(c => c.content).join(" ")}"
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* retrieved visual cards overlay (When step is 2 or 3) */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="grid grid-cols-3 gap-2 text-[8px] font-mono text-zinc-400 pt-1"
                    >
                      {currentQuery?.chunks.map((c, i) => (
                        <div key={i} className="p-2 bg-white/5 border border-white/10 rounded-lg text-center space-y-1 relative">
                          <Database className="w-3 h-3 text-white/50 mx-auto" />
                          <p className="font-bold text-white truncate">{c.title}</p>
                          <span className="text-emerald-400">{(c.score * 100).toFixed(0)}% Match</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Final step output streaming */}
                <div className="mt-auto pt-4 border-t border-white/5 space-y-2 text-left">
                  <span className="text-[8px] font-mono uppercase text-[#89AACC] tracking-widest block font-bold">
                    [RESPONSE SYNTHESIS STREAM]
                  </span>
                  <div className="bg-zinc-950/50 border border-white/5 p-4 rounded-xl min-h-[120px] text-xs leading-relaxed text-zinc-300 font-light select-text relative">
                    {step < 4 ? (
                      <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[10px]">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Generating response matrix...
                      </div>
                    ) : (
                      <>
                        <div className="whitespace-pre-line text-zinc-200">
                          {streamedText}
                          {streamedText.length < (currentQuery?.answer.length || 0) && (
                            <span className="w-1 h-3.5 bg-white inline-block animate-pulse ml-0.5" />
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
