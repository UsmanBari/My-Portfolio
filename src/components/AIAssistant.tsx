import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Sparkles, User, Bot, Loader2, ArrowUpRight } from "lucide-react";
import Magnetic from "./ui/Magnetic";

// Pre-defined suggestions for quick questions
const SUGGESTIONS = [
  "What is Usman's education?",
  "What are his main AI/ML projects?",
  "What skills does he possess?",
  "How can I contact him?"
];

// Groq API Key and Endpoint
const GROQ_API_KEY = (import.meta.env.VITE_GROQ_API_KEY as string) || "";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Complete system context prompt containing Usman Bari's portfolio details
const SYSTEM_PROMPT = `
You are the AI Assistant for Muhammad Usman Bari's personal portfolio website. Your job is to answer questions about Usman, his education, projects, skills, and interests in a smart, professional, friendly, and helpful manner.

Key Information about Muhammad Usman Bari:
- Name: Muhammad Usman Bari
- Location: Islamabad, Pakistan
- Education: Undergraduate Computer Science Student (B.S.) at FAST NUCES Islamabad.
- Focus: Highly interested in AI & Machine Learning, building modern web applications, exploring LLM architectures, Custom RAG pipelines, and automated agents.
- Credentials: Meta Front-End Developer Professional Certificate.
- Contact Email: usmanbari2005@gmail.com
- GitHub Profile: https://github.com/UsmanBari

Technical Skills:
1. AI & ML Systems: Large Language Models (LLMs) (70%), Retrieval-Augmented Generation (RAG) (68%), AI Automation & Agents (62%), Vector Databases (65%).
2. Languages: Python (75%), TypeScript / JavaScript (72%), SQL (70%), C++ / OOP Structures (68%).
3. Frontend Craft: React.js / Next.js (74%), Tailwind CSS (78%), Framer Motion (65%), Responsive Layouts (70%).
4. Backend Stack: Node.js / Express.js (64%), Firebase (70%), REST APIs (72%), MySQL / SQLite (68%).
5. Mobile & Pipelines: Android Development (Java) (60%), Git / GitHub (76%), Postman API Suite (70%).

Projects:
1. Enterprise RAG Knowledge Assistant: An advanced Retrieval-Augmented Generation system designed to process multiple documents and provide context-aware QA using vector databases and LLMs.
2. QueryMind: Converts natural language questions directly into SQL queries and generates ERD schemas automatically using LLMs.
3. Intelligent Reading Comprehension System: An NLP-based system designed to analyze text data and perform intelligent question answering.
4. SmartBus Transport System: Java & SQL transport route manager and system scheduler.
5. Socially: Full-stack social media Android application with Agora voice/video calls, SQLite offline sync, pushing notifications.
6. AI Chatbot Application: React/Node Gemini-powered conversation app.
7. Xonix Game: C++ SFML-based arcade game implementing complex data structures and graph traversal algorithms.
8. Game Boy Console Clone: C++ OOP hardware emulator with Wordle, Snake, Hangman.

Guidelines for your answers:
- Act as Usman's portfolio representative. Speak of Usman in the third person (e.g. "Usman is currently studying...", "He built a RAG assistant...").
- Keep answers relatively concise, readable, and structured. Use bullet points and bold text where appropriate.
- If asked about something unrelated to Usman's professional profile, politely steer the conversation back (e.g. "I can help you learn more about Usman's technical projects and skills. What would you like to know?").
- If asked how to contact him, provide his email (usmanbari2005@gmail.com) and link to his GitHub.
`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ProjectCardData {
  keywords: string[];
  title: string;
  desc: string;
  github?: string;
  live?: string;
}

const PROJECT_CARDS: ProjectCardData[] = [
  {
    keywords: ["rag", "enterprise rag", "knowledge assistant"],
    title: "Enterprise RAG Knowledge Assistant",
    desc: "Multi-document PDF question-answering with vector search embeddings.",
    github: "https://github.com/UsmanBari/Enterprise-RAG-Knowledge-Assistant",
    live: "https://usman-enterprise-rag-knowledge-model.netlify.app/"
  },
  {
    keywords: ["querymind", "sql translator"],
    title: "QueryMind",
    desc: "Natural language translation to SQL queries and automated ERD schemas.",
    github: "https://github.com/UsmanBari/QueryMind",
    live: "https://querymindd.netlify.app/"
  },
  {
    keywords: ["reading comprehension", "nlp comprehension"],
    title: "Reading Comprehension System",
    desc: "NLP semantic document parser and text information extractor.",
    github: "https://github.com/UsmanBari"
  },
  {
    keywords: ["socially", "android application", "smd"],
    title: "Socially",
    desc: "Android client featuring Agora audio/video calls and offline SQLite sync.",
    github: "https://github.com/UsmanBari/23i-0680_23i-0536_SMD_Asignment3"
  },
  {
    keywords: ["ai chatbot", "chatbot application"],
    title: "Gemini Chatbot Application",
    desc: "Full-stack conversation web app powered by Google Gemini API.",
    github: "https://github.com/UsmanBari/Chatbot-App",
    live: "https://chatbot-frontend-tawny-iota.vercel.app/"
  }
];

function formatMessageContent(content: string) {
  const parts = content.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index} className="font-bold text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="bg-white/10 px-1.5 py-0.5 rounded font-mono text-[10px] text-zinc-150 border border-white/5">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Usman's AI portfolio agent. Ask me anything about his projects, skills, or CS education at FAST NUCES!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever messages list updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const apiMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map(m => ({ role: m.role, content: m.content })),
        { role: "user", content: textToSend }
      ];

      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with Groq network");
      }

      const data = await response.json();
      const assistantReply = data.choices[0]?.message?.content || "I apologize, I could not retrieve a response. Please try again.";

      setMessages((prev) => [...prev, { role: "assistant", content: assistantReply }]);
    } catch (error) {
      console.error("AI Assistant network error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I had trouble reaching Usman's neural link. Please check your connection and try again!" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
      <div className="fixed bottom-6 right-20 sm:bottom-8 sm:right-24 z-50">
        <Magnetic>
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={!isOpen ? {
              boxShadow: [
                "0 10px 30px rgba(0,0,0,0.8), 0 0 15px rgba(255,255,255,0.06)",
                "0 10px 30px rgba(0,0,0,0.8), 0 0 35px rgba(255,255,255,0.22)",
                "0 10px 30px rgba(0,0,0,0.8), 0 0 15px rgba(255,255,255,0.06)"
              ]
            } : {}}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className={`relative px-5 py-3.5 rounded-full border cursor-pointer backdrop-blur-md transition-colors duration-300 flex items-center gap-3 overflow-hidden ${
              isOpen 
                ? "bg-white border-white text-black shadow-[0_10px_30px_rgba(0,0,0,0.8)]" 
                : "bg-zinc-900 border-white/30 text-white hover:border-white/55"
            }`}
            title="Ask Usman's AI Assistant"
          >
            {/* Sliding premium shimmer reflection */}
            {!isOpen && (
              <motion.span
                animate={{ x: ["-150%", "150%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
              />
            )}

            {/* Pulsing ring echoes (Expanding ripples) */}
            {!isOpen && (
              <>
                <motion.span
                  animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full border border-white/40 pointer-events-none"
                />
                <motion.span
                  animate={{ scale: [1, 1.7, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2.2, delay: 0.7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full border border-white/20 pointer-events-none"
                />
              </>
            )}

            {isOpen ? (
              <>
                <X className="w-4 h-4 text-black" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest leading-none">
                  Close AI
                </span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest leading-none">
                  Ask Usman AI
                </span>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                </span>
              </>
            )}
          </motion.button>
        </Magnetic>
      </div>

      {/* Floating Chat Window Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 sm:right-8 w-[calc(100vw-32px)] sm:w-[380px] h-[500px] bg-zinc-950/90 border border-white/10 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.95)] z-50 flex flex-col justify-between overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-white/5 rounded-xl border border-white/10 relative">
                  <Bot className="w-4 h-4 text-white" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-black animate-pulse" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    Usman's AI Agent
                    <Sparkles className="w-3 h-3 text-white/50 animate-pulse" />
                  </h4>
                  <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
                    POWERED BY GROQ / LLAMA 3
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/5 rounded-full text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Message History Area */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 text-xs select-text">
              {messages.map((msg, idx) => {
                const isUser = msg.role === "user";
                return (
                  <div 
                    key={idx} 
                    className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Icon */}
                    <div className={`p-1.5 rounded-lg border shrink-0 ${
                      isUser ? "bg-white/10 border-white/10 text-white" : "bg-white/5 border-white/5 text-zinc-400"
                    }`}>
                      {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    {/* Chat Bubble content */}
                    <div className="space-y-2 max-w-[80%]">
                      <div className={`p-3 rounded-2xl border text-left leading-relaxed whitespace-pre-line ${
                        isUser 
                          ? "bg-white text-black border-white/10 rounded-tr-none font-medium" 
                          : "bg-white/[0.02] text-zinc-300 border-white/5 rounded-tl-none font-light"
                      }`}>
                        {isUser ? msg.content : formatMessageContent(msg.content)}
                      </div>

                      {/* Attached project links if relevant */}
                      {!isUser && (() => {
                        const contentLower = msg.content.toLowerCase();
                        const matchingProjects = PROJECT_CARDS.filter(proj => 
                          proj.keywords.some(keyword => contentLower.includes(keyword))
                        );

                        if (matchingProjects.length === 0) return null;

                        return (
                          <div className="space-y-1.5 pt-1">
                            <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-600 block text-left">
                              Attached Reference
                            </span>
                            {matchingProjects.map((proj, pIdx) => (
                              <div key={pIdx} className="bg-white/[0.01] border border-white/5 rounded-xl p-2.5 space-y-1.5 text-left relative overflow-hidden">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="min-w-0">
                                    <h5 className="font-bold text-white text-[10px] truncate">{proj.title}</h5>
                                    <p className="text-[8.5px] text-zinc-400 font-light leading-normal mt-0.5">{proj.desc}</p>
                                  </div>
                                </div>
                                <div className="flex gap-2.5 pt-1 border-t border-white/[0.03] text-[8px] font-mono">
                                  {proj.github && (
                                    <a 
                                      href={proj.github} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="text-brand-green hover:underline flex items-center gap-0.5 animate-pulse"
                                    >
                                      github() <ArrowUpRight className="w-2.5 h-2.5" />
                                    </a>
                                  )}
                                  {proj.live && (
                                    <a 
                                      href={proj.live} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="text-[#89AACC] hover:underline flex items-center gap-0.5 animate-pulse"
                                    >
                                      live_demo() <ArrowUpRight className="w-2.5 h-2.5" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                );
              })}

              {/* Loader/Typing indicator */}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg border shrink-0 bg-white/5 border-white/5 text-zinc-400 animate-pulse">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-3 bg-white/[0.02] text-zinc-500 border border-white/5 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Connecting nodes...
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Footer Container containing suggestion chips and text input */}
            <div className="border-t border-white/5 bg-white/[0.01] pt-3 pb-3">
              {/* Suggested prompts horizontal list (always accessible when not loading) */}
              {!isLoading && (
                <div className="px-4 pb-2.5 select-none">
                  <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleSendMessage(s)}
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] text-zinc-300 hover:text-white transition-all whitespace-nowrap cursor-pointer active:scale-95 hover:border-white/25 hover:shadow-[0_0_8px_rgba(255,255,255,0.05)] shrink-0"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Input Row */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(input);
                }}
                className="px-3 flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-grow bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 bg-white text-black disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black rounded-xl hover:bg-white/95 hover:text-black active:scale-95 transition-all cursor-pointer flex items-center justify-center shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
