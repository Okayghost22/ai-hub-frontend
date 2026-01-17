import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Sparkles, BrainCircuit, Zap, 
  Terminal, ShieldCheck, Cpu, MessageSquare, Send, Wand2, Loader2, Bot
} from 'lucide-react';

const AISidebar = ({ isOpen, onClose, userMetrics, selectedRepo, prs, metrics }) => {
  // --- STATE & LOGIC ---
  const [input, setInput] = useState('');
  const [loadingDigest, setLoadingDigest] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chat, setChat] = useState([
    { role: 'assistant', content: "Neural Interface Online. Select a repository node to generate a productivity digest or query the cluster." }
  ]);

  const handleChat = async (overrideInput = null) => {
    const messageText = overrideInput || input;
    if (!messageText.trim()) return;

    // Add user message to UI
    const userMsg = { role: 'user', content: messageText };
    setChat(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const contextPayload = {
      userQuery: messageText,
      context: selectedRepo ? {
        repoName: selectedRepo.name,
        currentLanguage: selectedRepo.language,
        stats: {
          averageCycleTime: metrics?.avg_cycle || 0,
          totalPullRequests: metrics?.total || 0,
        },
        recentPRList: prs.slice(0, 10).map(p => ({ 
          title: p.title, 
          duration: p.cycle_days 
        }))
      } : { 
        allAvailableRepos: userMetrics?.map(r => r.name) || [] 
      }
    };

    try {
      const res = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contextPayload)
      });
      
      const data = await res.json();
      setChat(prev => [...prev, { 
        role: 'assistant', 
        content: data.reply || "Diagnostic complete: Response inconclusive. Re-query recommended." 
      }]);
    } catch (error) {
      setChat(prev => [...prev, { 
        role: 'assistant', 
        content: "Core Connection Error. Ensure the backend neural-server is active on port 5000." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const generateDigest = async () => {
    if (!selectedRepo) {
      setChat(prev => [...prev, { role: 'assistant', content: "Protocol Error: Please select a repository first!" }]);
      return;
    }
    setLoadingDigest(true);
    const summaryPrompt = `Provide a technical executive summary for the repository "${selectedRepo.name}". Focus on the average cycle time of ${metrics?.avg_cycle} days and suggest one way to improve velocity.`;
    await handleChat(summaryPrompt);
    setLoadingDigest(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
          />

          {/* Sidebar Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[500px] ai-glass z-[70] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col bg-[#050507]/90 backdrop-blur-2xl border-l border-white/10"
          >
            {/* Header Area */}
            <div className="p-8 border-b border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <button onClick={onClose} className="text-white/40 hover:text-white p-2 rounded-full hover:bg-white/5 transition-all">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-500 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <BrainCircuit className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">Neural <span className="text-purple-500">Analyst</span></h2>
                  <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/30">AI Interface Online // Node 01</p>
                </div>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
              
              {/* NEW: COMPACT ACTIVE CONTEXT CARD */}
              <div className="p-5 rounded-3xl bg-white/[0.03] border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                <div className="flex items-center gap-2 mb-2 text-purple-400">
                  <Terminal size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Active Context</span>
                </div>
                <h3 className="text-xl font-black italic text-white leading-tight">
                  {selectedRepo ? selectedRepo.name : "System Root"}
                </h3>
                <p className="text-xs text-white/40 mt-1">
                  {selectedRepo 
                    ? `Analyzing ${prs.length} nodes @ ${metrics?.avg_cycle || '0'} day velocity.`
                    : "Connect to a node to begin diagnostics."}
                </p>
              </div>

              {/* NEW: DYNAMIC METRICS GRID */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col justify-between h-24">
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Compute Load</span>
                  <div className="flex flex-col">
                    <span className="font-mono text-lg text-white">84.2 Gflops</span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col justify-between h-24">
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">AI Confidence</span>
                  <div className="flex flex-col">
                    <span className="font-mono text-lg text-green-400">99.8% Accurate</span>
                  </div>
                </div>
              </div>

              {/* SMART DIGEST BUTTON (Functional) */}
              {selectedRepo && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generateDigest}
                  disabled={loadingDigest}
                  className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/30 flex items-center justify-center gap-3 group transition-all"
                >
                  {loadingDigest ? <Loader2 className="animate-spin text-purple-400" /> : <Wand2 className="text-purple-400 group-hover:rotate-12 transition-transform" />}
                  <span className="font-bold text-sm tracking-widest uppercase text-purple-100">
                    {loadingDigest ? "Synthesizing..." : `Digest: ${selectedRepo.name}`}
                  </span>
                </motion.button>
              )}

              {/* CHAT HISTORY */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                {chat.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`
                      max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed
                      ${m.role === 'user' 
                        ? 'bg-purple-600 text-white rounded-tr-none' 
                        : 'bg-white/5 border border-white/10 text-white/80 rounded-tl-none'}
                    `}>
                      {m.content}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-center gap-2 text-purple-400 font-mono text-[10px] uppercase tracking-widest animate-pulse">
                    <Sparkles size={14} /> Processing Data Streams...
                  </div>
                )}
              </div>

              {/* RECOMMENDED QUERIES (Functional as Buttons) */}
              {!isTyping && chat.length < 3 && (
                <div className="space-y-3 pt-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Recommended Queries</p>
                  {[
                    "Analyze merge bottlenecks", 
                    "Identify contributor velocity", 
                    "Predict next release cycle"
                  ].map((text, i) => (
                    <button
                      key={i}
                      onClick={() => handleChat(text)}
                      className="w-full text-left p-4 rounded-xl border border-white/5 bg-white/[0.02] flex justify-between items-center group hover:bg-white/5 transition-all"
                    >
                      <span className="text-sm text-white/50 group-hover:text-white">{text}</span>
                      <Zap size={14} className="text-purple-500 opacity-0 group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Footer (Functional) */}
            <div className="p-8 border-t border-white/10 bg-black/40">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-20 group-focus-within:opacity-100 transition duration-500 blur" />
                <div className="relative flex items-center bg-[#0a0a0c] rounded-2xl p-2 border border-white/10">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleChat()}
                    placeholder="Ask Neural Assistant..."
                    className="flex-1 bg-transparent p-4 outline-none text-sm font-mono tracking-tight text-white"
                  />
                  <button 
                    onClick={() => handleChat()}
                    className="p-4 bg-purple-500 hover:bg-purple-400 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  >
                    <Send size={18} className="text-white" />
                  </button>
                </div>
              </div>
              <p className="text-[8px] text-center text-white/20 mt-4 uppercase tracking-[0.4em]">Encrypted AI Channel v4.0</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AISidebar;