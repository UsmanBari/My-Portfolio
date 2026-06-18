import { motion } from "motion/react";
import { 
  Cpu, 
  Code, 
  Terminal, 
  Database, 
  Smartphone, 
  Sparkles, 
  Workflow,
  Globe,
  Radio,
  Server
} from "lucide-react";

interface SkillItem {
  name: string;
  level: number; // percentage
  info: string;
}

interface SkillGroup {
  id: string;
  name: string;
  icon: any;
  skills: SkillItem[];
  color: string;
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "ai-ml",
    name: "AI & ML Systems",
    icon: Cpu,
    color: "from-cyan-600 to-indigo-600",
    skills: [
      { name: "Large Language Models (LLMs)", level: 70, info: "Prompt engineering, Google's @google/genai SDK, agent scaffolding" },
      { name: "Retrieval-Augmented Generation (RAG)", level: 68, info: "Context retrieval loops, token optimization, vector embeddings" },
      { name: "AI Automation & Agents", level: 62, info: "Tool calling pipelines, multi-agent orchestrations" },
      { name: "Vector Databases", level: 65, info: "ChromaDB, Pinecone, similarity index queries" }
    ]
  },
  {
    id: "languages",
    name: "Languages Core",
    icon: Code,
    color: "from-indigo-600 to-purple-700",
    skills: [
      { name: "Python", level: 75, info: "AI prototyping, script automation, data workflows" },
      { name: "TypeScript / JavaScript", level: 72, info: "Engineered robust SPA architectures, strict type compliance" },
      { name: "SQL Queries", level: 70, info: "DML, database structural optimization, DDL setups" },
      { name: "C++ / OOP Structure", level: 68, info: "Computational graphics, game boards, systems programming" }
    ]
  },
  {
    id: "frontend",
    name: "Frontend Craft",
    icon: Terminal,
    color: "from-blue-600 to-cyan-500",
    skills: [
      { name: "React.js / Next.js", level: 74, info: "State synchronizers, modular routing layouts" },
      { name: "Tailwind CSS", level: 78, info: "Chromatic responsive interfaces, fluid viewport alignments" },
      { name: "Framer Motion", level: 65, info: "Staggered transitions, hover reactive microanimations" },
      { name: "Responsive Layout Matrices", level: 70, info: "Denser visual scales, fluid layouts" }
    ]
  },
  {
    id: "backend",
    name: "Backend Stack",
    icon: Database,
    color: "from-emerald-600 to-teal-700",
    skills: [
      { name: "Node.js / Express.js", level: 64, info: "Asynchronous restful route handlers" },
      { name: "Firebase (Firestore / Auth)", level: 70, info: "OAuth integrated auth, Firestore security permissions rules" },
      { name: "REST APIs", level: 72, info: "Clean routing modules, structured json response maps" },
      { name: "MySQL / SQLite", level: 68, info: "Relational tables, schema index optimization" }
    ]
  },
  {
    id: "mobile-tools",
    name: "Mobile & Pipelines",
    icon: Smartphone,
    color: "from-amber-600 to-orange-700",
    skills: [
      { name: "Android Development", level: 60, info: "Java structures, system callbacks, layout managers" },
      { name: "Git / GitHub Engine", level: 76, info: "Semantic commits, team branching, CI/CD pipelines" },
      { name: "Postman API Suite", level: 70, info: "Rest route payload parsing, API mocking" }
    ]
  }
];

export default function CosmicSkills() {
  return (
    <div className="space-y-12 w-full">
      {/* Visual Indicator of the Live Active Core */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        
        {/* Abstract Cosmic Telemetry counters */}
        <div className="bg-[#0b0b0d]/60 border border-white/10 p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between group hover:border-brand-green/20 transition-all duration-300 shadow-xl backdrop-blur-md">
          <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-3">
            <Radio className="w-4 h-4 text-brand-green animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-[#4e96d2] uppercase">CORE_RADAR</span>
          </div>
          <div>
            <span className="text-3xl font-black text-white font-mono block">19</span>
            <span className="text-[10px] font-mono text-zinc-400 lowercase tracking-wider">active modules parsed</span>
          </div>
        </div>

        <div className="bg-[#0b0b0d]/60 border border-white/10 p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between group hover:border-brand-green/20 transition-all duration-300 shadow-xl backdrop-blur-md">
          <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-3">
            <Workflow className="w-4 h-4 text-brand-green" />
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">SYSTEM_KPI</span>
          </div>
          <div>
            <span className="text-3xl font-black text-white font-mono block">70%</span>
            <span className="text-[10px] font-mono text-zinc-400 lowercase tracking-wider">average stack capability</span>
          </div>
        </div>

        <div className="bg-[#0b0b0d]/60 border border-white/10 p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between group hover:border-brand-green/20 transition-all duration-300 shadow-xl backdrop-blur-md">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-3">
            <Server className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">DBX_MAPPED</span>
          </div>
          <div>
            <span className="text-3xl font-black text-white font-mono block">SECURE</span>
            <span className="text-[10px] font-mono text-zinc-400 lowercase tracking-wider">relational system layers</span>
          </div>
        </div>

        <div className="bg-[#0b0b0d]/60 border border-white/10 p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between group hover:border-brand-green/20 transition-all duration-300 shadow-xl backdrop-blur-md">
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">INTERFACE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div>
            <span className="text-3xl font-black text-white font-mono block">FLUID</span>
            <span className="text-[10px] font-mono text-zinc-400 lowercase tracking-wider">viewport matrix alignment</span>
          </div>
        </div>

      </div>

      {/* Unified Bento-Starlight Grid Layout displaying ALL SKILLS on the screen at once! */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {SKILL_GROUPS.map((group, gIdx) => {
          const GroupIcon = group.icon;
          
          return (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: gIdx * 0.1 }}
              key={group.id}
              className="bg-[#0b0b0d]/40 border border-white/5 hover:border-brand-green/20 p-6 rounded-3xl relative overflow-hidden transition-all duration-300 hover:shadow-[0_12px_45px_rgba(159,255,0,0.01)] flex flex-col justify-between group min-h-[380px] backdrop-blur-md"
            >
              {/* Subtle top brand-tint block */}
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-white/5" />
              
              <div className="space-y-6">
                
                {/* Group Title and Icon */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-zinc-300 group-hover:text-brand-green transition-colors">
                      <GroupIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block">subsystem_0{gIdx + 1}</span>
                      <h3 className="text-base font-black text-white tracking-tight">{group.name}</h3>
                    </div>
                  </div>
                  <span className="text-[8px] font-mono text-brand-green px-2 py-0.5 bg-zinc-950/60 rounded border border-white/5">SEC_A</span>
                </div>

                {/* Subskill list with high-end progress bars */}
                <div className="space-y-5">
                  {group.skills.map((skill, sIdx) => (
                    <div key={skill.name} className="space-y-1.5 min-w-0">
                      
                      <div className="flex justify-between items-end gap-2 text-xs">
                        <div className="min-w-0">
                          <h4 className="font-bold text-zinc-200 group-hover:text-white transition-colors truncate">
                            {skill.name}
                          </h4>
                          <p className="text-[10px] text-zinc-450 font-light mt-0.5 leading-relaxed">
                            {skill.info}
                          </p>
                        </div>
                        <span className="font-mono text-[11px] font-black text-brand-green shrink-0 select-none">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Dark progress bar */}
                      <div className="h-1.5 w-full bg-[#141416]/90 rounded-full overflow-hidden p-[0.5px] border border-white/5">
                        <motion.div
                          initial={{ width: "0%" }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: sIdx * 0.1, ease: "easeOut" }}
                          className={`h-full rounded-full bg-gradient-to-r ${group.color}`}
                        />
                      </div>

                    </div>
                  ))}
                </div>

              </div>

              {/* Backing tag */}
              <div className="pt-4 border-t border-white/5 mt-6 flex justify-between items-center text-[9px] font-mono text-zinc-500">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-brand-green animate-pulse" />
                  telemetry steady
                </span>
                <span>0{gIdx + 1}_NODE</span>
              </div>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
