import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertCircle, RefreshCcw, CheckCircle2 } from 'lucide-react';

export const Healing = ({ selectedRepo }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [incidents, setIncidents] = useState([]);

  // Point 2: Generate dynamic "Live" data based on selectedRepo
  useEffect(() => {
    if (!selectedRepo) return;

    // Determine extension based on language
    const lang = selectedRepo.language?.toLowerCase() || 'js';
    const ext = lang === 'typescript' ? '.ts' : lang === 'python' ? '.py' : lang === 'go' ? '.go' : '.js';
    
    // Create specific incidents tied to the repo's metadata
    const repoIncidents = [
      { 
        id: `0x${selectedRepo.id?.toString().slice(0, 2) || 'A1'}`, 
        site: `Root_Logic${ext}`, 
        threat: selectedRepo.risk || 'Medium', 
        desc: `${selectedRepo.name} Entropy Leak`, 
        status: 'pending' 
      },
      { 
        id: `0x${selectedRepo.id?.toString().slice(2, 4) || 'B2'}`, 
        site: `Network_Layer${ext}`, 
        threat: 'Low', 
        desc: 'Inverted Data Stream', 
        status: 'pending' 
      }
    ];

    setIncidents(repoIncidents);
  }, [selectedRepo]);

  const triggerScan = () => {
    setIsScanning(true);
    // Simulate network delay
    setTimeout(() => setIsScanning(false), 2000);
  };

  const resolvePatch = (id) => {
    setIncidents(prev => prev.map(inc => 
      inc.id === id ? { ...inc, status: 'resolved' } : inc
    ));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 p-4 md:p-0">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white">
            System <span className="text-green-500">Healing</span>
          </h2>
          <div className="flex items-center gap-3 mt-2">
            <span className="px-2 py-0.5 bg-white/10 text-white/60 text-[8px] font-mono rounded uppercase">
              Target: {selectedRepo?.name || 'Global_Cluster'}
            </span>
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono">
              Neural Auto-Correction Protocol // Active
            </p>
          </div>
        </div>

        <button 
          onClick={triggerScan}
          disabled={isScanning}
          className="group relative w-full md:w-auto px-10 py-4 bg-green-500 text-black rounded-xl font-black uppercase text-[10px] transition-all hover:scale-105 active:scale-95 disabled:opacity-50 overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            <RefreshCcw size={16} className={isScanning ? 'animate-spin' : ''} />
            {isScanning ? 'Scanning Cluster...' : 'Initiate Pulse Scan'}
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
        </button>
      </header>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {incidents.map((incident, idx) => (
            <motion.div 
              key={incident.id} 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.1 }}
              className="group p-6 md:p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] flex flex-col sm:flex-row items-center justify-between hover:bg-white/[0.04] transition-all border-l-4 border-l-transparent hover:border-l-green-500"
            >
              <div className="flex items-center gap-8 w-full">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                  incident.status === 'resolved' ? 'bg-green-500/20 text-green-500' :
                  incident.threat === 'Critical' || incident.threat === 'High' ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-orange-500/20 text-orange-500'
                }`}>
                  {incident.status === 'resolved' ? <CheckCircle2 size={32} /> : 
                   (incident.threat === 'Critical' || incident.threat === 'High') ? <AlertCircle size={32} /> : <ShieldCheck size={32} />}
                </div>
                
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <p className={`text-lg font-black uppercase italic tracking-wider ${incident.status === 'resolved' ? 'text-white/40 line-through' : 'text-white'}`}>
                      {incident.desc}
                    </p>
                    {incident.status === 'resolved' && (
                      <span className="text-[8px] bg-green-500 text-black px-2 py-0.5 rounded font-black">STABLE</span>
                    )}
                  </div>
                  <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-[10px] font-mono uppercase tracking-tighter">
                    <span className="text-white/20">Node: <span className="text-white/60">{incident.id}</span></span>
                    <span className="text-white/20">File: <span className="text-white/60">{incident.site}</span></span>
                    <span className={`font-bold ${incident.threat === 'Critical' || incident.threat === 'High' ? 'text-red-500' : 'text-orange-500'}`}>
                      [{incident.threat}]
                    </span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => resolvePatch(incident.id)}
                disabled={incident.status === 'resolved'}
                className={`mt-6 sm:mt-0 w-full sm:w-auto px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                  incident.status === 'resolved' 
                  ? 'bg-white/5 text-white/20 cursor-default border border-transparent' 
                  : 'bg-white/5 text-white/60 border border-white/10 hover:border-green-500 hover:text-green-500 hover:bg-green-500/5'
                }`}
              >
                {incident.status === 'resolved' ? 'Node Patched' : 'Apply Neural Patch'}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {incidents.length === 0 && (
        <div className="text-center py-20 bg-white/[0.01] rounded-[3rem] border border-dashed border-white/5">
          <p className="text-white/20 font-mono text-[10px] uppercase tracking-[0.5em]">No Active Threats Detected in {selectedRepo?.name}</p>
        </div>
      )}
    </div>
  );
};

export default Healing;