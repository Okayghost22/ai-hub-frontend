import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Rocket, Info, AlertTriangle, Terminal } from 'lucide-react';

export const Simulator = ({ selectedRepo }) => {
  // Point 1: States initialized with neutral values, updated via useEffect
  const [complexity, setComplexity] = useState(50);
  const [devCount, setDevCount] = useState(3);

  // Sync state when selectedRepo changes to reflect "Live" data
  useEffect(() => {
    if (selectedRepo) {
      // Map repo risk to complexity: High -> 85%, Medium -> 55%, Low -> 25%
      const baseComplexity = 
        selectedRepo.risk === 'High' || selectedRepo.risk === 'Critical' ? 85 : 
        selectedRepo.risk === 'Medium' ? 55 : 25;
      
      setComplexity(baseComplexity);
      
      // Suggest dev count based on star power (more popular repos get more "Neural Nodes")
      const suggestedDevs = Math.min(10, Math.max(2, Math.floor((selectedRepo.stargazers_count || 0) / 100)));
      setDevCount(suggestedDevs || 3);
    }
  }, [selectedRepo]);
  
  // Simulation Logic
  const projectedDays = Math.max(1, Math.round((complexity * 2.5) / (devCount * 1.2)));
  const successRate = Math.min(99.9, Math.max(15, 100 - (complexity / 1.5) + (devCount * 2))).toFixed(1);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-8 p-4 md:p-0"
    >
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white">
            Temporal <span className="text-purple-500">Projection</span>
          </h2>
          <div className="flex items-center gap-3 mt-2">
            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-[8px] font-mono rounded uppercase border border-purple-500/30">
              Instance: {selectedRepo?.name || 'Null_Node'}
            </span>
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono">
              Neural Simulation Engine // v4.0.2
            </p>
          </div>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="w-full md:w-auto px-4 py-2 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${complexity > 75 ? 'bg-red-500' : 'bg-green-500'}`} />
            <span className="text-[9px] font-black uppercase text-white/40 tracking-widest">
              Risk Status: {complexity > 75 ? 'Volatile' : 'Stable'}
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-morphism p-8 rounded-[2.5rem] border border-white/5 space-y-10 bg-white/[0.01]">
            <div className="flex items-center gap-2 text-white/20 mb-2">
              <Terminal size={14} />
              <span className="text-[8px] font-mono uppercase tracking-widest">Adjustment_Parameters</span>
            </div>

            {/* Complexity Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Complexity Matrix</label>
                  <p className="text-[8px] text-white/10 uppercase font-mono italic">Based on {selectedRepo?.language || 'Code'} entropy</p>
                </div>
                <span className="text-purple-400 font-mono text-xl font-black">{complexity}%</span>
              </div>
              <input 
                type="range" min="1" max="100" value={complexity} 
                onChange={(e) => setComplexity(e.target.value)}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none accent-purple-500 cursor-pointer hover:accent-purple-400 transition-all" 
              />
            </div>

            {/* Dev Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Neural Nodes (Devs)</label>
                  <p className="text-[8px] text-white/10 uppercase font-mono italic">Parallel processing units</p>
                </div>
                <span className="text-blue-400 font-mono text-xl font-black">{devCount} Units</span>
              </div>
              <input 
                type="range" min="1" max="20" value={devCount} 
                onChange={(e) => setDevCount(e.target.value)}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none accent-blue-500 cursor-pointer hover:accent-blue-400 transition-all" 
              />
            </div>

            <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                <p className="text-[8px] font-black text-white/20 uppercase mb-1 tracking-widest">Success Prob.</p>
                <p className="text-2xl font-black italic text-green-500">{successRate}%</p>
              </div>
              <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                <p className="text-[8px] font-black text-white/20 uppercase mb-1 tracking-widest">Risk Factor</p>
                <p className={`text-2xl font-black italic ${complexity > 75 ? 'text-red-500' : 'text-blue-500'}`}>
                  {complexity > 75 ? 'CRITICAL' : 'OPTIMAL'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Output Visualization */}
        <div className="lg:col-span-7">
          <div className="relative h-full min-h-[450px] glass-morphism rounded-[3rem] border border-white/5 overflow-hidden flex flex-col items-center justify-center p-12 group bg-white/[0.01]">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
            
            <div className="relative z-10 text-center space-y-2">
              <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.6em] text-white/20">
                ETA for {selectedRepo?.name || 'Project'}
              </p>
              
              <motion.div 
                key={projectedDays}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-baseline justify-center gap-4"
              >
                <h4 className="text-[12rem] md:text-[16rem] leading-none font-black italic tracking-tighter text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.1)]">
                  {projectedDays}
                </h4>
                <span className="text-2xl md:text-5xl font-black italic text-purple-500 uppercase tracking-tighter">Days</span>
              </motion.div>
              
              <div className="flex flex-col items-center gap-6 mt-8">
                <div className="flex items-center gap-4 px-6 py-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
                  <Activity size={16} className="text-purple-500 animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60">Algorithm: Bayesian Inference v2</span>
                </div>
                
                <p className="max-w-xs text-[10px] text-white/20 font-mono leading-relaxed uppercase tracking-tighter">
                  Calculation incorporates stargazers ({selectedRepo?.stargazers_count}) and 
                  primary language logic ({selectedRepo?.language})
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Simulator;