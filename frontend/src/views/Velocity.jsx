import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Gauge, Cpu, BarChart3, Globe } from 'lucide-react';

export const Velocity = ({ selectedRepo }) => {
  // Point 3: Calculate dynamic metrics based on the selected repository's "live" data
  const metrics = useMemo(() => {
    if (!selectedRepo) return [];
    
    // Using stars and issues to "simulate" real engineering metrics
    const stars = selectedRepo.stargazers_count || 0;
    const issues = selectedRepo.open_issues_count || 0;
    
    // Derived values:
    // 1. Lead Time: More stars usually means more complexity/review time
    const leadTime = (4.2 + (stars / 1000)).toFixed(1);
    // 2. Deployment Freq: High activity (stars) correlates to higher frequency
    const deployFreq = Math.floor(12 + (stars / 500));
    // 3. Success Rate: More open issues slightly reduces stability score
    const successRate = (99.8 - (issues / 20)).toFixed(1);

    return [
      { label: 'Avg Lead Time', value: `${leadTime}h`, trend: '+12%', icon: <Zap />, color: 'text-yellow-500' },
      { label: 'Deploy Freq', value: `${deployFreq}/wk`, trend: '+5%', icon: <TrendingUp />, color: 'text-blue-500' },
      { label: 'Success Rate', value: `${successRate}%`, trend: 'Stable', icon: <Gauge />, color: 'text-green-500' }
    ];
  }, [selectedRepo]);

  // Dynamic chart data generation based on the Repo ID (so it's consistent but unique per repo)
  const chartBars = useMemo(() => {
    const seed = selectedRepo?.id || 123;
    return Array.from({ length: 15 }, (_, i) => {
      const val = ((seed * (i + 1)) % 70) + 30; // Creates a pseudo-random height between 30-100
      return val;
    });
  }, [selectedRepo]);

  const squadRankings = [
    { name: 'Alpha-Neural', score: '94', status: 'Peaking', color: 'bg-purple-500' },
    { name: 'Vector-Core', score: '82', status: 'Stable', color: 'bg-blue-500' },
    { name: 'Ghost-Ops', score: '76', status: 'Scaling', color: 'bg-green-500' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 p-4 md:p-0">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white">
            Team <span className="text-blue-500">Velocity</span>
          </h2>
          <div className="flex items-center gap-3 mt-2">
            <Globe size={14} className="text-blue-500 animate-pulse" />
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono">
              Kinetic Analysis: {selectedRepo?.name || 'Global_Stream'} // Epoch 84
            </p>
          </div>
        </div>
        <div className="px-6 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">
                Source: GitHub Live API
            </span>
        </div>
      </header>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((stat, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="glass-morphism p-10 rounded-[2.5rem] border border-white/5 group relative overflow-hidden bg-white/[0.01]"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              {React.cloneElement(stat.icon, { size: 80 })}
            </div>
            <div className={`flex items-center gap-3 mb-6 ${stat.color}`}>
              {React.cloneElement(stat.icon, { size: 18 })}
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{stat.label}</span>
            </div>
            <div className="text-6xl font-black italic text-white mb-4">{stat.value}</div>
            <div className="flex items-center gap-2 text-[10px] text-green-500 font-black uppercase tracking-tighter">
              <TrendingUp size={14} /> {stat.trend} from last epoch
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kinetic Data Visualizer */}
        <div className="lg:col-span-2 glass-morphism rounded-[3rem] border border-white/5 p-12 relative overflow-hidden flex flex-col justify-center min-h-[400px] bg-white/[0.01]">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
          
          <div className="flex items-end gap-3 h-48 mb-8">
            {chartBars.map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ repeat: Infinity, duration: 2.5, repeatType: 'reverse', delay: i * 0.15 }}
                className="flex-1 bg-gradient-to-t from-blue-600/40 via-purple-500/20 to-transparent rounded-t-xl border-t border-white/10"
              />
            ))}
          </div>
          
          <div className="flex justify-between items-center relative z-10 border-t border-white/5 pt-8">
            <div className="flex items-center gap-4">
              <BarChart3 size={20} className="text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 italic">
                {selectedRepo?.name} Kinetic Stream
              </span>
            </div>
            <span className="text-white/20 font-mono text-[9px]">
              ID_SEED: {selectedRepo?.id || 'GLOBAL'}
            </span>
          </div>
        </div>

        {/* Squad Rankings */}
        <div className="glass-morphism rounded-[3rem] border border-white/5 p-10 flex flex-col bg-white/[0.01]">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-10 flex items-center gap-3">
            <Cpu size={16} className="text-purple-500" /> Squad Hierarchy
          </h3>
          <div className="space-y-8 flex-1">
            {squadRankings.map((squad, idx) => (
              <div key={idx} className="group cursor-default">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-black italic text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                    {squad.name}
                  </span>
                  <span className="text-xl font-black italic text-white">{squad.score}</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${squad.score}%` }}
                    transition={{ duration: 1.5, delay: idx * 0.2 }}
                    className={`h-full ${squad.color} shadow-[0_0_15px_rgba(0,0,0,0.5)]`}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[8px] font-black uppercase text-white/20 tracking-widest">{squad.status}</span>
                  <span className="text-[8px] font-black uppercase text-white/20 tracking-widest">Score / 100</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Velocity;