import React, { useState, useRef, useEffect } from "react";

interface LogLine {
  text: string;
  type: "input" | "output" | "error" | "system";
}

const COGNITIVE_JSON = `{
  "scholar": "Computer Science Student (B.S.)",
  "focus": "Exploring Machine Learning & AI Systems",
  "current_learning": ["LLMs", "RAG Pipelines", "Linguistic Embeddings"],
  "credentials": "Meta Front-End Developer Certified",
  "learning_stack": ["Python", "JavaScript", "React.js", "SQL", "Gemini API"],
  "objective": "Build practical systems to transform complex ideas into usable products"
}`;

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<LogLine[]>([
    { text: "cat cognitive.json", type: "input" },
    { text: COGNITIVE_JSON, type: "output" },
    { text: "\nWelcome to MUB System Shell v1.2.0.\nType 'help' to view available commands.", type: "system" }
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const newLines: LogLine[] = [{ text: cmd, type: "input" }];
    const lowerCmd = cmd.toLowerCase();

    if (lowerCmd === "help") {
      newLines.push({
        text: `Available commands:
  help     - Show list of active shell commands
  about    - Summary of Usman's background
  projects - Detailed list of portfolio projects & builds
  skills   - Technical competency matrix with percentages
  contact  - Routing channels to establish contact
  clear    - Clear console output history
  secret   - Attempt decryption key authorization`,
        type: "output"
      });
    } else if (lowerCmd === "about") {
      newLines.push({
        text: `Muhammad Usman Bari
- Computer Science Undergraduate (B.S.) at FAST NUCES Islamabad.
- Focus: Machine Learning engineering, custom LLM integrations, and RAG architectures.
- Professional: Certified Meta Front-End Developer with mastery in React/Next/Tailwind CSS ecosystems.`,
        type: "output"
      });
    } else if (lowerCmd === "projects") {
      newLines.push({
        text: `Portfolio Projects Matrix:
1. Enterprise RAG Knowledge Assistant
   - Scope: Document question-answering with PDF parsing & vector search.
2. QueryMind
   - Scope: LLM conversion of natural language questions into SQL scripts and ERDs.
3. Intelligent Reading Comprehension System
   - Scope: NLP document comprehension, extracting structured semantic insights.
4. Socially (Android Social Media Application)
   - Scope: Real-time native app (Agora calls, SQLite sync, push metrics).
5. AI Chatbot Application
   - Scope: Google Gemini-powered client interface.
6. C++ SFML Arcade / OOP Emulators
   - Scope: SFML-based Game Boy clone and custom Xonix game engine.

(Type 'cat projects' or browse the 'Work' section for source links)`,
        type: "output"
      });
    } else if (lowerCmd === "skills") {
      newLines.push({
        text: `TECHNICAL Nodes & Skills Calibration:
- Python / ML Stack:  [75%]  ■■■■■■■■■■■■■■■□□□□□
- React.js / Next.js:  [74%]  ■■■■■■■■■■■■■■■□□□□□
- Tailwind CSS:        [78%]  ■■■■■■■■■■■■■■■■□□□□
- SQL / Databases:     [70%]  ■■■■■■■■■■■■■■□□□□□□
- Java / C++:          [68%]  ■■■■■■■■■■■■■□□□□□□□`,
        type: "output"
      });
    } else if (lowerCmd === "contact") {
      newLines.push({
        text: `Routing channels:
- Email   : usmanbari2005@gmail.com
- Github  : https://github.com/UsmanBari
- LinkedIn: Connect link in footer`,
        type: "output"
      });
    } else if (lowerCmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else if (lowerCmd === "secret") {
      newLines.push({
        text: `ACCESS GRANTED. AUTHORIZED DECRYPTION LOGGED:
       
         .________________________.
         |  ____________________  |
         | | MUB SYSTEM ACTIVE  | |
         | |                    | |
         | |  THE VOID ACCEPTS  | |
         | |     YOUR EMBED     | |
         | |____________________| |
         |________________________|
                   |___|
                  /____\\
                 
Welcome to the core engine.`,
        type: "output"
      });
    } else {
      newLines.push({
        text: `bash: command not found: ${cmd}. Type 'help' for instructions.`,
        type: "error"
      });
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInput("");
  };

  return (
    <div
      onClick={focusInput}
      className="bg-[#141416]/80 border border-white/5 rounded-2xl p-6 font-mono text-xs text-zinc-400 shadow-2xl relative backdrop-blur-md cursor-text text-left min-h-[300px] flex flex-col justify-between"
    >
      {/* Halftone grid texture overlay */}
      <div className="absolute inset-0 halftone-grid opacity-10 pointer-events-none" />

      {/* Terminal Title Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.05] mb-4 text-[9px] text-zinc-650 relative z-10 select-none">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-brand-green/20" />
        </div>
        <span>visitor@mub-system:~$ - bash - 80x24</span>
      </div>

      {/* Scrollable history logs buffer */}
      <div className="flex-grow overflow-y-auto space-y-2.5 pr-2 select-text relative z-10 max-h-[300px] custom-scrollbar">
        {history.map((line, idx) => {
          if (line.type === "input") {
            return (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="text-brand-green">visitor@mub-system:~$</span>
                <span className="text-zinc-100">{line.text}</span>
              </div>
            );
          } else if (line.type === "error") {
            return (
              <pre key={idx} className="text-red-400 whitespace-pre-wrap leading-relaxed font-mono">
                {line.text}
              </pre>
            );
          } else if (line.type === "system") {
            return (
              <pre key={idx} className="text-[#89AACC] whitespace-pre-wrap leading-relaxed font-mono font-bold">
                {line.text}
              </pre>
            );
          }
          return (
            <pre key={idx} className="text-zinc-350 whitespace-pre-wrap leading-relaxed font-mono pl-4">
              {line.text}
            </pre>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal input dispatcher bar */}
      <form onSubmit={handleCommand} className="flex items-center gap-1.5 pt-3 border-t border-white/[0.03] mt-3 relative z-10">
        <span className="text-brand-green shrink-0 select-none">visitor@mub-system:~$</span>
        <div className="flex-grow flex items-center relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent border-none outline-none focus:ring-0 text-zinc-100 p-0 font-mono text-xs select-text"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
          {/* Custom blinking terminal cursor block */}
          {inputRef.current !== document.activeElement && (
            <span className="w-1.5 h-3.5 bg-brand-green animate-pulse ml-0.5" />
          )}
        </div>
      </form>
    </div>
  );
}
