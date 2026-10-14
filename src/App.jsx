// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   Github as GithubIcon, 
//   Mail, 
//   Cpu, 
//   Database, 
//   Cloud, 
//   Mic, 
//   Code2, 
//   Terminal, 
//   Server, 
//   Sparkles, 
//   Workflow, 
//   ExternalLink, 
//   ChevronRight, 
//   Bot, 
//   X, 
//   Send, 
//   Loader2, 
//   BrainCircuit, 
//   Globe, 
//   Layers, 
//   Phone, 
//   MapPin 
// } from "lucide-react";
// import { Linkedin as LinkedinIcon } from 'lucide-react';
// const App = () => {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [chatInput, setChatInput] = useState('');
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [messages, setMessages] = useState([
//     { role: 'assistant', text: "Hello! I'm Shaheer's AI Twin. I can answer technical questions about my work at Brickclay, One Tech & AI, and Zong. How can I help you today?" }
//   ]);
//   const [isLoading, setIsLoading] = useState(false);
//   const chatEndRef = useRef(null);

//   const resumeLink = "https://drive.google.com/file/d/1eIwzeaOCvDBVwBFQH2toOLGMeZZPTpAl/view?usp=sharing";

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, isChatOpen]);

//   const askGemini = async (query) => {
//     // Vercel reads this exact environment variable natively
//     const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
    
//     const systemPrompt = `You are the AI Assistant for Shaheer Ahmad, an AI Engineer.
//     Experience:
//     1. AI Engineer : Multi Agentic Customer Support with HITL, ID verification with OCR and liveliness, AML and Risk Factor.
//     2. Associate Data Scientist at Brickclay: RAG pipelines, Text-to-SQL for billion-row DW, AWS SageMaker.
//     3. AI Engineer at One Tech & AI: Production LLM integration, LangGraph agents.
//     4. Experience at Zong (CMPak): Data analytics and network insights.
//     5. Intern at BehinDev: Time-series forecasting.
//     Education: BS CS from FAST NUCES.
//     Tech: Python, FastAPI, AWS, Azure, Langchain, n8n, Langgraph.
//     Keep responses professional and very brief (max 2 sentences).`;

//     const maxRetries = 5;
//     let delay = 1000;

//     for (let i = 0; i < maxRetries; i++) {
//       try {
//         const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             contents: [{ parts: [{ text: query }] }],
//             systemInstruction: { parts: [{ text: systemPrompt }] }
//           })
//         });

//         if (!response.ok) throw new Error('API Error');
//         const data = await response.json();
//         return data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble thinking right now. Try again?";
//       } catch (err) {
//         if (i === maxRetries - 1) return "Connection issue. Please reach out to Shaheer via email!";
//         await new Promise(resolve => setTimeout(resolve, delay));
//         delay *= 2;
//       }
//     }
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!chatInput.trim()) return;
//     const userMsg = chatInput;
//     setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
//     setChatInput('');
//     setIsLoading(true);
//     const aiResponse = await askGemini(userMsg);
//     setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
//     setIsLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-[#0a0f1c] text-slate-200 font-sans selection:bg-cyan-500/30 relative overflow-x-hidden">
      
//       {/* Background Glow */}
//       <div className="fixed inset-0 z-0 pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full"></div>
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
//       </div>

//       {/* Navbar */}
//       <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-[#0a0f1c]/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
//         <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
//           <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
//             <Sparkles className="w-5 h-5 text-cyan-400" />
//             SHAHEER<span className="text-cyan-400">.AI</span>
//           </div>
//           <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
//             <a href="#experience" className="hover:text-white transition-colors">Experience</a>
//             <a href="#projects" className="hover:text-white transition-colors">Projects</a>
//             <a href="mailto:shaheer14326@gmail.com" className="hover:text-white transition-colors">Contact</a>
//           </div>
//           <div className="flex gap-4">
//             <a href="https://github.com/Shaheer66" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white"><GithubIcon className="w-5 h-5" /></a>
//             <a href="https://www.linkedin.com/in/ahmadshaheer" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white"><LinkedinIcon className="w-5 h-5" /></a>
//           </div>
//         </div>
//       </nav>

//       {/* Hero */}
//       <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24 space-y-32">
//         <section className="min-h-[50vh] flex flex-col justify-center items-start">
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase mb-8">
//             <Globe className="w-3.5 h-3.5" /> AI Engineer | Pakistan
//           </div>
//           <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
//             Building The <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
//               Future of Agents.
//             </span>
//           </h1>
//           <p className="text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed">
//             From billion-row Text-to-SQL systems to autonomous voice agents. 
//             I specialize in production-grade Generative AI and LLMOps.
//           </p>
//           <div className="flex flex-wrap gap-4">
//             <button onClick={() => setIsChatOpen(true)} className="px-6 py-3 rounded-lg bg-white text-slate-900 font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors">
//               <Bot className="w-5 h-5" /> Chat with AI Twin
//             </button>
//             <a href={resumeLink} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center gap-2 transition-colors">
//               <ExternalLink className="w-5 h-5" /> View Full Resume
//             </a>
//           </div>
//         </section>

//         {/* Combined Experience & Info */}
//         <section id="experience" className="scroll-mt-32">
//           <div className="flex items-center gap-4 mb-12">
//             <h2 className="text-3xl font-bold text-white">Experience</h2>
//             <div className="h-px bg-gradient-to-r from-purple-500/50 to-transparent flex-1"></div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//             {/* Experience Column */}
//             <div className="lg:col-span-2 space-y-12">
              
//               {/* Brickclay */}
//               <div className="relative pl-8 border-l-2 border-purple-500/30">
//                 <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500" />
//                 <div className="flex justify-between items-start mb-1">
//                   <h3 className="text-xl font-bold text-white">Associate Data Scientist</h3>
//                   <span className="text-xs font-bold text-purple-400">2025 - Present</span>
//                 </div>
//                 <p className="text-slate-400 text-sm mb-4">Brickclay &bull; Pakistan</p>
//                 <ul className="space-y-2 text-sm text-slate-300">
//                   <li>&bull; Built Text-to-SQL RAG over billion-row data warehouse with strict governance.</li>
//                   <li>&bull; Deployed churn prediction models on AWS SageMaker with Lambda pipelines.</li>
//                   <li>&bull; Developed autonomous outbound voice agents using LangGraph.</li>
//                 </ul>
//               </div>

//               {/* One Tech & AI */}
//               <div className="relative pl-8 border-l-2 border-blue-500/30">
//                 <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500" />
//                 <div className="flex justify-between items-start mb-1">
//                   <h3 className="text-xl font-bold text-white">AI Engineer</h3>
//                   <span className="text-xs font-bold text-blue-400">2024 - 2025</span>
//                 </div>
//                 <p className="text-slate-400 text-sm mb-4">One Tech &amp; AI</p>
//                 <ul className="space-y-2 text-sm text-slate-300">
//                   <li>&bull; Production LLM integration focusing on latency and cost optimization.</li>
//                   <li>&bull; Built multi-agent reasoning workflows for enterprise automation.</li>
//                 </ul>
//               </div>

//               {/* Zong */}
//               <div className="relative pl-8 border-l-2 border-pink-500/30">
//                 <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-pink-500" />
//                 <div className="flex justify-between items-start mb-1">
//                   <h3 className="text-xl font-bold text-white">Data Analytics</h3>
//                   <span className="text-xs font-bold text-pink-400">Experience</span>
//                 </div>
//                 <p className="text-slate-400 text-sm mb-4">Zong (CMPak)</p>
//                 <ul className="space-y-2 text-sm text-slate-300">
//                   <li>&bull; Large-scale telecom data analysis for network performance insights.</li>
//                   <li>&bull; Pattern recognition in high-velocity streaming data using Python.</li>
//                 </ul>
//               </div>

//               {/* BehinDev */}
//               <div className="relative pl-8 border-l-2 border-cyan-500/30">
//                 <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyan-500" />
//                 <div className="flex justify-between items-start mb-1">
//                   <h3 className="text-xl font-bold text-white">Data Science Intern</h3>
//                   <span className="text-xs font-bold text-cyan-400">2023 - 2024</span>
//                 </div>
//                 <p className="text-slate-400 text-sm mb-4">BehinDev</p>
//                 <ul className="space-y-2 text-sm text-slate-300">
//                   <li>&bull; Developed time-series forecasting models for e-commerce demand.</li>
//                 </ul>
//               </div>
//             </div>

//             {/* Sidebar Column */}
//             <div className="space-y-6">
//               <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
//                 <h4 className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-6">Expertise Stack</h4>
//                 <div className="grid grid-cols-2 gap-4">
//                   {['PyTorch', 'FastAPI', 'AWS', 'Azure', 'LangGraph', 'FAISS', 'Docker', 'SQL'].map(skill => (
//                     <div key={skill} className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-xs text-center font-semibold text-slate-300">
//                       {skill}
//                     </div>
//                   ))}
//                 </div>
                
//                 {/* Visual Fixes applied here */}
//                 <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
//                   <div className="flex items-center gap-3">
//                     <Cloud className="w-5 h-5 text-orange-500" />
//                     <span className="text-xs text-slate-300">AWS Bedrock, SageMaker</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Globe className="w-5 h-5 text-blue-500" />
//                     <span className="text-xs text-slate-300">Azure AI, Container Registry</span>
//                   </div>
//                 </div>

//                 <div className="mt-8 pt-6 border-t border-white/5">
//                   <a 
//                     href={resumeLink} 
//                     target="_blank" 
//                     rel="noreferrer"
//                     className="w-full flex items-center justify-between p-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all group"
//                   >
//                     View Full Portfolio <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Projects */}
//         <section id="projects" className="scroll-mt-32 pb-20">
//           <div className="flex items-center gap-4 mb-12">
//             <h2 className="text-3xl font-bold text-white">System Architecture</h2>
//             <div className="h-px bg-gradient-to-r from-emerald-500/50 to-transparent flex-1"></div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-emerald-500/30 transition-all">
//               <Layers className="w-8 h-8 text-emerald-400 mb-6" />
//               <h3 className="text-xl font-bold text-white mb-2">Billion-Row Text-to-SQL</h3>
//               <p className="text-slate-400 text-sm">RAG architecture ensuring zero raw-row exposure for massive enterprise databases.</p>
//             </div>
//             <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-purple-500/30 transition-all">
//               <Mic className="w-8 h-8 text-purple-400 mb-6" />
//               <h3 className="text-xl font-bold text-white mb-2">Autonomous Voice Agents</h3>
//               <p className="text-slate-400 text-sm">LangGraph-powered agents handling real-time customer support tickets.</p>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Chat Widget */}
//       <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
//         {isChatOpen && (
//           <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-[#0f1523] border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
//             <div className="p-4 bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border-b border-slate-700/50 flex justify-between items-center backdrop-blur-md">
//               <div className="flex items-center gap-2">
//                 <Bot className="w-5 h-5 text-white" />
//                 <span className="text-sm font-bold text-white">Shaheer&apos;s AI Twin</span>
//               </div>
//               <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
//             </div>
//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//               {messages.map((m, i) => (
//                 <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//                   <div className={`max-w-[85%] p-3 rounded-xl text-sm ${m.role === 'user' ? 'bg-cyan-600 text-white' : 'bg-[#1a2235] text-slate-200 border border-slate-700'}`}>{m.text}</div>
//                 </div>
//               ))}
//               {isLoading && <div className="p-3 text-cyan-400 animate-pulse text-xs italic">Typing...</div>}
//               <div ref={chatEndRef} />
//             </div>
//             <form onSubmit={handleSendMessage} className="p-3 bg-[#0f1523] border-t border-slate-700/50 flex gap-2">
//               <input value={chatInput} onChange={e => setChatInput(e.target.value)} type="text" placeholder="Ask about experience..." className="flex-1 bg-[#1a2235] border border-slate-700 rounded-xl px-4 py-2 text-sm text-white" />
//               <button type="submit" className="bg-cyan-600 p-2 rounded-xl text-white"><Send className="w-4 h-4" /></button>
//             </form>
//           </div>
//         )}
//         {!isChatOpen && (
//           <button onClick={() => setIsChatOpen(true)} className="flex items-center gap-3 bg-white text-slate-900 px-6 py-4 rounded-full font-bold shadow-2xl hover:scale-105 transition-all">
//             <Bot className="w-6 h-6 text-cyan-600" /> Ask AI Twin
//           </button>
//         )}
//       </div>

//       <footer className="py-12 text-center text-xs text-slate-600 border-t border-white/5">
//         <p>&copy; 2025 Shaheer Ahmad. Built for high-performance AI roles.</p>
//       </footer>
//     </div>
//   );
// };

// export default App;


import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  FileSearch,
  Fingerprint,
  Github,
  Globe,
  Layers,
  Linkedin,
  Mail,
  Mic,
  Network,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";

const resumeLink =
  "https://drive.google.com/file/d/1eIwzeaOCvDBVwBFQH2toOLGMeZZPTpAl/view?usp=sharing";
const githubLink = "https://github.com/Shaheer66";
const linkedinLink = "https://www.linkedin.com/in/ahmadshaheer";
const emailAddress = "shaheer14326@gmail.com";

const projects = [
  {
    title: "Intelligent Data Concierge",
    label: "Enterprise AI · RAG · Tool Calling",
    icon: FileSearch,
    accent: "text-emerald-300",
    border: "hover:border-emerald-400/40",
    description:
      "A business-empowerment pipeline for working with government agreements through natural language. Search agreement content at runtime, inspect specific clauses, surface key terms, and request database updates conversationally.",
    highlights: [
      "Runtime search across government agreements",
      "Clause-level retrieval and focused review",
      "Natural-language interface for database operations",
    ],
    stack: ["Python", "LLMs", "RAG", "SQL", "API integration"],
  },
  {
    title: "Zero-Cloud ID Verification",
    label: "Production · OCR · Liveness",
    icon: Fingerprint,
    accent: "text-cyan-300",
    border: "hover:border-cyan-400/40",
    description:
      "A locally deployed identity-verification workflow combining OCR and liveness checks for ID document verification, designed to run without sending the verification workflow to cloud services.",
    highlights: [
      "OCR-based identity document processing",
      "Liveness checks in the verification flow",
      "Privacy-focused, zero-cloud deployment approach",
    ],
    stack: ["Python", "OCR", "Computer Vision", "FastAPI", "Local inference"],
  },
  {
    title: "FinTech AML Customer Risk Scoring",
    label: "Production · Predictive ML · Compliance",
    icon: ShieldAlert,
    accent: "text-amber-300",
    border: "hover:border-amber-400/40",
    description:
      "A deployed predictive risk-scoring solution designed to support customer-risk assessment and AML/compliance workflows in fintech, translating available customer signals into a risk score for further review.",
    highlights: [
      "Customer risk-score prediction",
      "AML and compliance-oriented decision support",
      "Model pipeline integrated into a business workflow",
    ],
    stack: ["Python", "Machine Learning", "Feature Engineering", "FinTech"],
  },
  {
    title: "Enterprise RAG & Text-to-SQL",
    label: "Data Concierge · Governed Analytics",
    icon: Database,
    accent: "text-purple-300",
    border: "hover:border-purple-400/40",
    description:
      "Natural-language access to large data-warehouse environments, combining retrieval and SQL generation so users can ask business questions without needing to write queries themselves.",
    highlights: [
      "Text-to-SQL over a billion-row-scale warehouse",
      "Retrieval and schema-aware query context",
      "Emphasis on controlled data access and governance",
    ],
    stack: ["Python", "SQL", "RAG", "Vector Search", "Data Engineering"],
  },
  {
    title: "Human-in-the-Loop AI Support Agents",
    label: "Agents · APIs · Workflow Automation",
    icon: BrainCircuit,
    accent: "text-pink-300",
    border: "hover:border-pink-400/40",
    description:
      "Conversational support workflows that route user requests, preserve context, collect missing information, call backend services, and use human review where a controlled decision is required.",
    highlights: [
      "Multi-turn dialogue and session-aware routing",
      "Tool/API integration with deterministic validation",
      "Human-in-the-loop escalation for controlled actions",
    ],
    stack: ["Python", "LangGraph", "FastAPI", "LLMs", "HITL"],
  },
  {
    title: "Voice AI & Business Workflows",
    label: "Voice · LLMs · Integration",
    icon: Mic,
    accent: "text-blue-300",
    border: "hover:border-blue-400/40",
    description:
      "Voice and language-model workflows connected to operational data and business services, with attention to response quality, structured data, and reliable downstream processing.",
    highlights: [
      "Voice-based interaction and speech processing",
      "Integration with APIs, databases, and business data",
      "LLM workflows designed around operational requirements",
    ],
    stack: ["Python", "Speech AI", "LLMs", "APIs", "SQL"],
  },
];

const certifications = [
  {
    title: "Claude 101",
    provider: "Anthropic",
    detail: "Foundations for working effectively with Claude.",
  },
  {
    title: "Building with the Claude API",
    provider: "Anthropic",
    detail: "Building applications and integrations with the Claude API.",
  },
  {
    title: "Advanced MCP Features",
    provider: "Anthropic",
    detail: "Advanced Model Context Protocol concepts and capabilities.",
  },
  {
    title: "Claude with Amazon Bedrock",
    provider: "Anthropic / AWS ecosystem",
    detail: "Using Claude through Amazon Bedrock.",
  },
  {
    title: "Introduction to Subagents",
    provider: "Anthropic",
    detail: "Subagent concepts for breaking down work across specialized tasks.",
  },
];

const skills = [
  "Python",
  "FastAPI",
  "LLM Agents",
  "RAG Pipelines",
  "LangGraph",
  "LangChain",
  "Anthropic API",
  "MCP",
  "n8n",
  "Zapier",
  "Tool Calling",
  "SQL / Text-to-SQL",
  "OCR & Computer Vision",
  "Machine Learning",
  "Docker",
  "AWS Bedrock",
  "Azure",
  "Vector Search",
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-10 md:mb-12">
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
          {eyebrow}
        </p>
      )}
      <div className="flex items-end gap-5">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
              {description}
            </p>
          )}
        </div>
        <div className="mb-3 hidden h-px flex-1 bg-gradient-to-r from-cyan-400/40 to-transparent md:block" />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const Icon = project.icon;
  return (
    <article
      className={`group flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900 md:p-7 ${project.border}`}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className={`rounded-2xl border border-white/10 bg-white/[0.04] p-3 ${project.accent}`}>
          <Icon className="h-7 w-7" />
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Project 0{index + 1}
        </span>
      </div>
      <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.15em] ${project.accent}`}>
        {project.label}
      </p>
      <h3 className="text-xl font-bold leading-snug text-white">{project.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-400">{project.description}</p>
      <ul className="mt-5 space-y-2">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2 text-sm text-slate-300">
            <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${project.accent}`} />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[11px] font-medium text-slate-400"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I'm Shaheer's AI Twin. Ask me about production AI agents, the Intelligent Data Concierge, zero-cloud ID verification, AML risk scoring, RAG, workflow automation, or Anthropic training.",
    },
  ]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);

  const askGemini = async (query) => {
    const maxRetries = 2;
    let delay = 700;

    for (let attempt = 0; attempt < maxRetries; attempt += 1) {
      try {
        const response = await fetch("/api/portfolio-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: query }),
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(data.error || `Portfolio chat request failed (${response.status})`);
        }
        return data.reply || "I couldn't produce an answer just now. Please try again or contact Shaheer directly.";
      } catch (error) {
        if (attempt === maxRetries - 1) {
          console.error("Portfolio AI Twin request failed:", error);
          return "I'm having trouble connecting right now. Please contact Shaheer at shaheer14326@gmail.com.";
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
    return "Please contact Shaheer directly at shaheer14326@gmail.com.";
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    const userMessage = chatInput.trim();
    if (!userMessage || isLoading) return;

    setMessages((current) => [...current, { role: "user", text: userMessage }]);
    setChatInput("");
    setIsLoading(true);
    try {
      const reply = await askGemini(userMessage);
      setMessages((current) => [...current, { role: "assistant", text: reply }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#080d18] font-sans text-slate-200 selection:bg-cyan-400/30">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-cyan-500/[0.08] blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-violet-600/[0.09] blur-[140px]" />
        <div className="absolute left-1/2 top-[38rem] h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-emerald-500/[0.035] blur-[120px]" />
      </div>

      <nav
        className={`fixed top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "border-b border-white/[0.07] bg-[#080d18]/90 py-3 backdrop-blur-xl"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#home" className="flex items-center gap-2 text-lg font-black tracking-tight text-white" aria-label="Shaheer AI home">
            <Sparkles className="h-5 w-5 text-cyan-300" />
            SHAHEER<span className="text-cyan-300">.AI</span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-slate-400 md:flex">
            <a href="#projects" className="transition hover:text-white">Projects</a>
            <a href="#experience" className="transition hover:text-white">Experience</a>
            <a href="#skills" className="transition hover:text-white">Stack</a>
            <a href="#certifications" className="transition hover:text-white">Anthropic Training</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <a href={githubLink} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white">
              <Github className="h-5 w-5" />
            </a>
            <a href={linkedinLink} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </nav>

      <main id="home" className="relative z-10 mx-auto max-w-7xl space-y-28 px-5 pb-24 pt-32 md:space-y-36 md:px-8 md:pt-40">
        <section className="grid min-h-[68vh] items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-cyan-200">
              <Globe className="h-4 w-4" /> AI Engineer II · Production AI Systems
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
              I turn AI into
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-400 bg-clip-text pb-2 text-transparent">
                working systems.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              I build production-oriented AI agents, RAG pipelines, workflow automations, and intelligent data products—from a natural-language concierge for government agreements to zero-cloud ID verification and FinTech AML risk scoring.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
              Python-first engineering across LLMs, tool calling, APIs, retrieval, OCR/computer vision, and business process integration—with attention to reliability, privacy, validation, and deployment.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => setIsChatOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-100">
                <Bot className="h-5 w-5" /> Ask my AI Twin
              </button>
              <a href="#projects" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3.5 text-sm font-bold text-white transition hover:border-cyan-300/40 hover:bg-white/[0.06]">
                Explore deployed projects <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href={resumeLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3.5 text-sm font-semibold text-slate-300 transition hover:text-white">
                Resume <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-slate-400">
              {["Production-minded AI", "RAG + Tool Calling", "n8n / Zapier", "Privacy-aware deployment"].map((item) => (
                <span key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-300" />{item}</span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10 blur-xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-[#0c1423]/90 p-6 shadow-2xl shadow-black/20 md:p-7">
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Build profile</p>
                  <h2 className="mt-1 text-xl font-bold text-white">From prompt to production</h2>
                </div>
                <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-200"><BrainCircuit className="h-6 w-6" /></div>
              </div>
              <div className="space-y-3">
                {[
                  { icon: Workflow, title: "Orchestrate", detail: "n8n, Zapier, Python workflows", tone: "text-cyan-300" },
                  { icon: BrainCircuit, title: "Reason & retrieve", detail: "LLMs, RAG, agents, MCP", tone: "text-violet-300" },
                  { icon: Code2, title: "Integrate & validate", detail: "Python, APIs, SQL, tool calling", tone: "text-emerald-300" },
                  { icon: ShieldCheck, title: "Deploy responsibly", detail: "Privacy, guardrails, monitoring", tone: "text-amber-300" },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                      <div className={`rounded-xl bg-white/[0.05] p-3 ${item.tone}`}><Icon className="h-5 w-5" /></div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-white">{item.title}</p>
                        <p className="mt-1 text-xs text-slate-400">{item.detail}</p>
                      </div>
                      <span className="text-xs text-slate-600">0{index + 1}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.05] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-200">Core approach</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">Use the LLM where language and reasoning help; use deterministic code for rules, permissions, validation, and critical actions.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-28">
          <SectionHeading
            eyebrow="Selected work"
            title="AI built for real business workflows"
            description="The strongest part of my work is connecting language models and predictive systems to useful actions: finding the right information, interpreting it, integrating with existing systems, and supporting controlled decisions."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
          </div>
        </section>

        <section id="experience" className="scroll-mt-28">
          <SectionHeading
            eyebrow="Professional background"
            title="AI engineering and applied data science"
            description="Experience across production AI, analytics, data pipelines, conversational systems, and enterprise integrations."
          />
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">Current role</p>
                    <h3 className="mt-2 text-xl font-bold text-white">AI Engineer II</h3>
                    <p className="mt-1 text-sm text-slate-400">White Wings Technologies</p>
                  </div>
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1 text-xs text-cyan-200">2026 – Present</span>
                </div>
                <ul className="mt-5 space-y-2 text-sm leading-6 text-slate-300">
                  <li className="flex gap-2"><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />Building and integrating LLM-powered applications and conversational workflows.</li>
                  <li className="flex gap-2"><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />Working across orchestration, API integration, session context, validation, and operational reliability.</li>
                  <li className="flex gap-2"><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />Applying AI to document understanding, identity verification, and risk-oriented business needs.</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">Associate Data Scientist</h3>
                    <p className="mt-1 text-sm text-slate-400">Brickclay</p>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">2025 – 2026</span>
                </div>
                <ul className="mt-5 space-y-2 text-sm leading-6 text-slate-300">
                  <li className="flex gap-2"><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-violet-300" />Built RAG and natural-language-to-SQL workflows for enterprise data access.</li>
                  <li className="flex gap-2"><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-violet-300" />Worked on churn prediction, LLM evaluation, vector retrieval, and data-engineering pipelines.</li>
                  <li className="flex gap-2"><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-violet-300" />Developed voice and agentic workflows integrated with business systems.</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-300">Additional experience</p>
                <div className="mt-5 space-y-5">
                  <div>
                    <h3 className="font-bold text-white">AI Engineer · One Tech & AI</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">Production LLM integration, agentic workflows, and latency/cost-aware implementation.</p>
                  </div>
                  <div className="h-px bg-white/[0.07]" />
                  <div>
                    <h3 className="font-bold text-white">Data Analytics · Zong (CMPak)</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">Telecom data analysis and network/business insights using data processing and analytical methods.</p>
                  </div>
                  <div className="h-px bg-white/[0.07]" />
                  <div>
                    <h3 className="font-bold text-white">Data Science Intern · BehinDev</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">Time-series forecasting and applied data science.</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-cyan-300/15 bg-gradient-to-br from-cyan-300/[0.07] to-violet-400/[0.04] p-6">
                <div className="flex items-center gap-3">
                  <Layers className="h-6 w-6 text-cyan-200" />
                  <h3 className="font-bold text-white">How I work</h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">Start with the business outcome, design the simplest reliable workflow, validate the model and tool outputs, and make failure paths visible. Use agents when adaptive reasoning adds value—not just because an application can use one.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="scroll-mt-28">
          <SectionHeading
            eyebrow="Technical toolkit"
            title="The pieces needed to ship AI"
            description="A Python-first stack spanning agent orchestration, workflow automation, data retrieval, model integration, and backend services."
          />
          <div className="rounded-3xl border border-white/10 bg-[#0c1423]/80 p-6 md:p-8">
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span key={skill} className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.05]">
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-8 grid gap-4 border-t border-white/[0.08] pt-7 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <Workflow className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                <div><p className="font-semibold text-white">Workflow automation</p><p className="mt-1 text-xs leading-5 text-slate-400">Triggers, branching, API calls, transformations, retries, and error paths.</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Network className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" />
                <div><p className="font-semibold text-white">Agents & MCP</p><p className="mt-1 text-xs leading-5 text-slate-400">Tool orchestration, context exchange, task decomposition, and controlled actions.</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Cloud className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                <div><p className="font-semibold text-white">Deployment options</p><p className="mt-1 text-xs leading-5 text-slate-400">Cloud integrations when useful, plus privacy-focused local inference where required.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="certifications" className="scroll-mt-28">
          <SectionHeading
            eyebrow="Focused upskilling"
            title="Anthropic & Claude training"
            description="Recent learning focused on Claude application development, MCP, Amazon Bedrock, and subagent concepts—directly relevant to modern LLM and agent projects."
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {certifications.map((certification, index) => (
              <article key={certification.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-violet-300/30 hover:bg-white/[0.04]">
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-xl border border-violet-300/15 bg-violet-300/[0.07] p-3 text-violet-200"><BadgeCheck className="h-5 w-5" /></div>
                  <span className="text-xs font-semibold text-slate-600">0{index + 1} / 05</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-300">{certification.provider}</p>
                <h3 className="mt-2 text-lg font-bold text-white">{certification.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{certification.detail}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-500">Course titles are listed here as provided. Add verification links or certificate IDs to each item when you want visitors to validate them directly.</p>
        </section>

        <section className="scroll-mt-28" aria-labelledby="collaboration-title">
          <div className="grid gap-8 rounded-[2rem] border border-cyan-300/15 bg-gradient-to-br from-cyan-300/[0.08] via-[#0c1423] to-violet-400/[0.08] p-7 md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">For teams with an AI backlog</p>
              <h2 id="collaboration-title" className="max-w-3xl text-3xl font-black tracking-tight text-white md:text-4xl">Need an engineer who can connect AI to the workflow?</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">I can contribute across the build cycle—from breaking down a business problem and prototyping an agent to integrating APIs, adding validation, and preparing the workflow for deployment. I’m comfortable adapting to a team’s existing tools and architecture.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a href={`mailto:${emailAddress}?subject=AI%20Engineering%20Collaboration`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-100">
                <Mail className="h-4 w-4" /> Discuss a project <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href={resumeLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.05]">
                View resume <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-28 border-t border-white/[0.08] pt-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Contact</p>
              <h2 className="mt-3 text-2xl font-bold text-white">Let’s build something useful.</h2>
              <a href={`mailto:${emailAddress}`} className="mt-2 inline-flex items-center gap-2 text-sm text-cyan-200 transition hover:text-white"><Mail className="h-4 w-4" />{emailAddress}</a>
            </div>
            <div className="flex gap-3">
              <a href={githubLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:border-cyan-300/30 hover:text-white"><Github className="h-4 w-4" />GitHub</a>
              <a href={linkedinLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:border-cyan-300/30 hover:text-white"><Linkedin className="h-4 w-4" />LinkedIn</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/[0.07] px-5 py-8 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} Shaheer Ahmad · Production-minded AI engineering
      </footer>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
        {isChatOpen && (
          <div className="mb-4 flex h-[min(590px,calc(100vh-110px))] w-[min(390px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-cyan-900/40 to-violet-900/40 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/10 p-2 text-cyan-200"><Bot className="h-5 w-5" /></div>
                <div><p className="text-sm font-bold text-white">Shaheer’s AI Twin</p><p className="mt-0.5 text-[11px] text-slate-400">Portfolio & technical Q&A</p></div>
              </div>
              <button type="button" onClick={() => setIsChatOpen(false)} aria-label="Close chat" className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-3 text-sm leading-6 ${message.role === "user" ? "rounded-br-md bg-cyan-600 text-white" : "rounded-bl-md border border-white/[0.07] bg-white/[0.045] text-slate-200"}`}>
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && <div className="flex items-center gap-2 px-2 py-1 text-xs text-cyan-200"><span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />Thinking through your question…</div>}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-white/10 p-3">
              <input
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                type="text"
                maxLength={1200}
                placeholder="Ask about projects, RAG, MCP…"
                aria-label="Ask the portfolio AI Twin"
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/40"
              />
              <button type="submit" disabled={isLoading || !chatInput.trim()} aria-label="Send message" className="rounded-xl bg-cyan-500 px-4 text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"><Send className="h-4 w-4" /></button>
            </form>
            <p className="px-4 pb-3 text-[10px] text-slate-600">For project enquiries, contact Shaheer directly.</p>
          </div>
        )}
        {!isChatOpen && (
          <button onClick={() => setIsChatOpen(true)} className="inline-flex items-center gap-3 rounded-full border border-slate-800 bg-white px-5 py-4 font-bold text-slate-950 shadow-2xl shadow-black/30 transition hover:-translate-y-0.5 hover:bg-cyan-100">
            <Bot className="h-5 w-5 text-cyan-700" /> Ask my AI Twin
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
