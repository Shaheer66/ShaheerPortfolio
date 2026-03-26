import React, { useState, useEffect, useRef } from 'react';
import * as Lucide from "lucide-react";

// Manually pull the icons to ensure they exist regardless of naming convention
const GithubIcon = Lucide.Github || Lucide.GithubIcon;
const LinkedinIcon = Lucide.Linkedin || Lucide.LinkedinIcon;
const { 
  Mail, Cpu, Database, Cloud, Mic, Code2, Terminal, Server, 
  Sparkles, Workflow, ExternalLink, ChevronRight, Bot, X, 
  Send, Loader2, BrainCircuit, Globe, Layers, Phone, MapPin 
} = Lucide;
const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hello! I'm Shaheer's AI Twin. I can answer technical questions about my work at Brickclay, One Tech & AI, and Zong. How can I help you today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const resumeLink = "https://drive.google.com/file/d/1eIwzeaOCvDBVwBFQH2toOLGMeZZPTpAl/view?usp=sharing";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isChatOpen]);

  const askGemini = async (query) => {
    // Vercel reads this exact environment variable natively
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
    
    const systemPrompt = `You are the AI Assistant for Shaheer Ahmad, an AI Engineer.
    Experience:
    1. Associate Data Scientist at Brickclay: RAG pipelines, Text-to-SQL for billion-row DW, AWS SageMaker.
    2. AI Engineer at One Tech & AI: Production LLM integration, LangGraph agents.
    3. Experience at Zong (CMPak): Data analytics and network insights.
    4. Intern at BehinDev: Time-series forecasting.
    Education: BS CS from FAST NUCES.
    Tech: Python, FastAPI, AWS, Azure, Langchain.
    Keep responses professional and very brief (max 2 sentences).`;

    const maxRetries = 5;
    let delay = 1000;

    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: query }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        });

        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble thinking right now. Try again?";
      } catch (err) {
        if (i === maxRetries - 1) return "Connection issue. Please reach out to Shaheer via email!";
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsLoading(true);
    const aiResponse = await askGemini(userMsg);
    setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200 font-sans selection:bg-cyan-500/30 relative overflow-x-hidden">
      
      {/* Background Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-[#0a0f1c]/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            SHAHEER<span className="text-cyan-400">.AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="mailto:shaheer14326@gmail.com" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/Shaheer66" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white"><GithubIcon className="w-5 h-5" /></a>
            <a href="https://www.linkedin.com/in/ahmadshaheer" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white"><LinkedinIcon className="w-5 h-5" /></a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24 space-y-32">
        <section className="min-h-[50vh] flex flex-col justify-center items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase mb-8">
            <Globe className="w-3.5 h-3.5" /> AI Engineer | Pakistan
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
            Building The <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Future of Agents.
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed">
            From billion-row Text-to-SQL systems to autonomous voice agents. 
            I specialize in production-grade Generative AI and LLMOps.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setIsChatOpen(true)} className="px-6 py-3 rounded-lg bg-white text-slate-900 font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors">
              <Bot className="w-5 h-5" /> Chat with AI Twin
            </button>
            <a href={resumeLink} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center gap-2 transition-colors">
              <ExternalLink className="w-5 h-5" /> View Full Resume
            </a>
          </div>
        </section>

        {/* Combined Experience & Info */}
        <section id="experience" className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-white">Experience</h2>
            <div className="h-px bg-gradient-to-r from-purple-500/50 to-transparent flex-1"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Experience Column */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Brickclay */}
              <div className="relative pl-8 border-l-2 border-purple-500/30">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500" />
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-bold text-white">Associate Data Scientist</h3>
                  <span className="text-xs font-bold text-purple-400">2025 - Present</span>
                </div>
                <p className="text-slate-400 text-sm mb-4">Brickclay &bull; Pakistan</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>&bull; Built Text-to-SQL RAG over billion-row data warehouse with strict governance.</li>
                  <li>&bull; Deployed churn prediction models on AWS SageMaker with Lambda pipelines.</li>
                  <li>&bull; Developed autonomous outbound voice agents using LangGraph.</li>
                </ul>
              </div>

              {/* One Tech & AI */}
              <div className="relative pl-8 border-l-2 border-blue-500/30">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500" />
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-bold text-white">AI Engineer</h3>
                  <span className="text-xs font-bold text-blue-400">2024 - 2025</span>
                </div>
                <p className="text-slate-400 text-sm mb-4">One Tech &amp; AI</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>&bull; Production LLM integration focusing on latency and cost optimization.</li>
                  <li>&bull; Built multi-agent reasoning workflows for enterprise automation.</li>
                </ul>
              </div>

              {/* Zong */}
              <div className="relative pl-8 border-l-2 border-pink-500/30">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-pink-500" />
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-bold text-white">Data Analytics</h3>
                  <span className="text-xs font-bold text-pink-400">Experience</span>
                </div>
                <p className="text-slate-400 text-sm mb-4">Zong (CMPak)</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>&bull; Large-scale telecom data analysis for network performance insights.</li>
                  <li>&bull; Pattern recognition in high-velocity streaming data using Python.</li>
                </ul>
              </div>

              {/* BehinDev */}
              <div className="relative pl-8 border-l-2 border-cyan-500/30">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyan-500" />
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-bold text-white">Data Science Intern</h3>
                  <span className="text-xs font-bold text-cyan-400">2023 - 2024</span>
                </div>
                <p className="text-slate-400 text-sm mb-4">BehinDev</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>&bull; Developed time-series forecasting models for e-commerce demand.</li>
                </ul>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-6">Expertise Stack</h4>
                <div className="grid grid-cols-2 gap-4">
                  {['PyTorch', 'FastAPI', 'AWS', 'Azure', 'LangGraph', 'FAISS', 'Docker', 'SQL'].map(skill => (
                    <div key={skill} className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-xs text-center font-semibold text-slate-300">
                      {skill}
                    </div>
                  ))}
                </div>
                
                {/* Visual Fixes applied here */}
                <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
                  <div className="flex items-center gap-3">
                    <Cloud className="w-5 h-5 text-orange-500" />
                    <span className="text-xs text-slate-300">AWS Bedrock, SageMaker</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-500" />
                    <span className="text-xs text-slate-300">Azure AI, Container Registry</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <a 
                    href={resumeLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all group"
                  >
                    View Full Portfolio <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-mt-32 pb-20">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-white">System Architecture</h2>
            <div className="h-px bg-gradient-to-r from-emerald-500/50 to-transparent flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-emerald-500/30 transition-all">
              <Layers className="w-8 h-8 text-emerald-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-2">Billion-Row Text-to-SQL</h3>
              <p className="text-slate-400 text-sm">RAG architecture ensuring zero raw-row exposure for massive enterprise databases.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-purple-500/30 transition-all">
              <Mic className="w-8 h-8 text-purple-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-2">Autonomous Voice Agents</h3>
              <p className="text-slate-400 text-sm">LangGraph-powered agents handling real-time customer support tickets.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isChatOpen && (
          <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-[#0f1523] border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
            <div className="p-4 bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border-b border-slate-700/50 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-white" />
                <span className="text-sm font-bold text-white">Shaheer&apos;s AI Twin</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl text-sm ${m.role === 'user' ? 'bg-cyan-600 text-white' : 'bg-[#1a2235] text-slate-200 border border-slate-700'}`}>{m.text}</div>
                </div>
              ))}
              {isLoading && <div className="p-3 text-cyan-400 animate-pulse text-xs italic">Typing...</div>}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-3 bg-[#0f1523] border-t border-slate-700/50 flex gap-2">
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} type="text" placeholder="Ask about experience..." className="flex-1 bg-[#1a2235] border border-slate-700 rounded-xl px-4 py-2 text-sm text-white" />
              <button type="submit" className="bg-cyan-600 p-2 rounded-xl text-white"><Send className="w-4 h-4" /></button>
            </form>
          </div>
        )}
        {!isChatOpen && (
          <button onClick={() => setIsChatOpen(true)} className="flex items-center gap-3 bg-white text-slate-900 px-6 py-4 rounded-full font-bold shadow-2xl hover:scale-105 transition-all">
            <Bot className="w-6 h-6 text-cyan-600" /> Ask AI Twin
          </button>
        )}
      </div>

      <footer className="py-12 text-center text-xs text-slate-600 border-t border-white/5">
        <p>&copy; 2025 Shaheer Ahmad. Built for high-performance AI roles.</p>
      </footer>
    </div>
  );
};

export default App;
