import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell
} from 'recharts';
import { 
  Sparkles, Folder, Activity, Loader2, Zap, MousePointerClick, 
  Info, Database, Github, LogOut, RefreshCw, Cpu, ChevronRight, Box, LayoutTemplate,
  Target, Rocket, Layers, ShieldCheck, Terminal, HelpCircle, Briefcase, Users, SearchCode,
  AlertTriangle, ArrowUpDown, Flame, Gauge, History, TrendingUp, TrendingDown, Map, 
  Fingerprint, Compass, Radio
} from 'lucide-react'; 
import AISidebar from './components/AISidebar'; 
import Auth from './components/Auth';
import { supabase } from './supabaseClient'; 

import { Simulator } from './views/Simulator';
import { Velocity } from './views/Velocity';
import { Healing } from './views/Healing';

// --- SPATIAL & MAGICAL COMPONENTS ---

const BackgroundLayers = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        x: [0, 50, 0],
        y: [0, 30, 0]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-purple-600/10 blur-[120px]" 
    />
    <motion.div 
      animate={{ 
        scale: [1.2, 1, 1.2],
        x: [0, -50, 0],
        y: [0, -30, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-blue-600/10 blur-[120px]" 
    />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
  </div>
);

const Spotlight = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
  const handleMouseMove = (e) => {
    // Your logic for the spotlight position
    const { clientX, clientY } = e;
    // ... update state or refs
  };

  window.addEventListener('mousemove', handleMouseMove);

  // CORRECT CLEANUP
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
}, []);

  return (
    <motion.div
      style={{ left: springX, top: springY }}
      className="pointer-events-none fixed -inset-px z-10 rounded-full w-[800px] h-[800px] magical-glow -translate-x-1/2 -translate-y-1/2 opacity-60"
    />
  );
};

// --- FEATURE: NEURAL TOPOLOGY ---

const NeuralLink = ({ startRect, endRect }) => {
  if (!startRect || !endRect) return null;

  const startX = startRect.left + startRect.width / 2;
  const startY = startRect.top + startRect.height / 2;
  const endX = endRect.left + endRect.width / 2;
  const endY = endRect.top + endRect.height / 2;

  return (
    <svg className="fixed inset-0 pointer-events-none z-30 w-full h-full">
      <motion.path
        d={`M ${startX} ${startY} C ${(startX + endX) / 2} ${startY}, ${(startX + endX) / 2} ${endY}, ${endX} ${endY}`}
        stroke="url(#neuralGradient)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      <defs>
        <linearGradient id="neuralGradient" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const RiskIndicator = ({ level }) => {
  const colors = {
    High: "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]",
    Medium: "bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]",
    Low: "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full animate-pulse ${colors[level] || colors.Low}`} />
      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40">Risk: {level}</span>
    </div>
  );
};

const SpatialCard = ({ children, onClick, active }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 100, damping: 30 });

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  return (
    <motion.div
      layout
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative group transition-all duration-500 rounded-3xl ${
        active ? 'ring-1 ring-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.2)]' : ''
      }`}
    >
      <div className={`
        relative h-full glass-morphism rounded-3xl p-6 
        hover:bg-white/[0.05] transition-all cursor-pointer overflow-hidden
      `}>
        <div style={{ transform: "translateZ(30px)" }} className="relative z-10">{children}</div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
};

// --- DATASET & CONSTANTS ---

const LOADING_STEPS = [
  "Connecting to Supabase...",
  "Querying PostgreSQL...",
  "Analyzing commit frequency...",
  "Calculating merge velocity...",
  "Finalizing AI context..."
];

const DEMO_DATA = {
  username: "Elite-Dev-Demo",
  repos: [
    { id: 101, name: "hyper-engine-core", language: "TypeScript", stargazers_count: 1250, owner: { login: "demo" }, risk: "High", dependencies: [102, 103], velocity_rank: 2 },
    { id: 102, name: "neural-api-gateway", language: "Go", stargazers_count: 840, owner: { login: "demo" }, risk: "Low", dependencies: [101], velocity_rank: 1 },
    { id: 103, name: "react-quantum-ui", language: "JavaScript", stargazers_count: 2100, owner: { login: "demo" }, risk: "Medium", dependencies: [101], velocity_rank: 3 }
  ],
  metrics: { avg_cycle: 1.4, total: 85 },
  prs: [
    { title: "feat: optimized webgl renderer", cycle_days: 0.8, riskScore: 20, timestamp: '2023-10-01' },
    { title: "fix: race condition in auth flow", cycle_days: 2.1, riskScore: 85, timestamp: '2023-10-05' }, 
    { title: "refactor: implemented atomic state", cycle_days: 1.5, riskScore: 45, timestamp: '2023-10-10' },
    { title: "feat: add telemetry hooks", cycle_days: 0.4, riskScore: 10, timestamp: '2023-10-15' },
    { title: "docs: update architecture map", cycle_days: 1.2, riskScore: 5, timestamp: '2023-10-20' }
  ]
};

// --- MAIN APPLICATION LOGIC ---

function App() {
  const [status, setStatus] = useState('Checking Supabase...')
  const [activeTab, setActiveTab] = useState('dashboard');
  const [githubUsername, setGithubUsername] = useState('')
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [prs, setPrs] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [loadingPRs, setLoadingPRs] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [loaderStep, setLoaderStep] = useState(0);
  const [dataSource, setDataSource] = useState(null); 
  const [session, setSession] = useState(null);
  const [showHero, setShowHero] = useState(true);
  const [sortBy, setSortBy] = useState('none');
  const [activePage, setActivePage] = useState('terminal'); // terminal | simulator | leaderboard | healing
  const [timeTravelRange, setTimeTravelRange] = useState(100);

  const [hoveredRepo, setHoveredRepo] = useState(null);
  const repoRefs = useRef({});

  useEffect(() => {
  // Check session on mount
  const initAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setSession(session);
      setGithubUsername(session.user.user_metadata.user_name || '');
    }
  };
  initAuth();

    const checkSupabase = async () => {
      const { data, error } = await supabase.from('repositories').select('count', { count: 'exact', head: true });
      setStatus(error ? '❌ Supabase Error' : '✅ Supabase Connected');
    }
    checkSupabase();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        setGithubUsername(session.user.user_metadata.user_name || '');
        setShowHero(false);
        setDataSource('supabase');
      } else {
        setShowHero(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [])

  useEffect(() => {
    let interval;
    if (loading || loadingPRs) {
      interval = setInterval(() => {
        setLoaderStep((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 800);
    } else {
      setLoaderStep(0);
    }
    return () => clearInterval(interval);
  }, [loading, loadingPRs]);

  // Derived Velocity Logic for Time Travel
  const visiblePrs = prs.slice(0, Math.floor((timeTravelRange / 100) * prs.length));
  const currentAvg = visiblePrs.length > 0 
    ? visiblePrs.reduce((a, b) => a + b.cycle_days, 0) / visiblePrs.length 
    : 0;
  const debtDiff = currentAvg - (metrics?.avg_cycle || 0);

  const getSortedRepos = () => {
    let sorted = [...repos];
    if (sortBy === 'risk') {
      const riskMap = { High: 3, Medium: 2, Low: 1 };
      sorted.sort((a, b) => riskMap[b.risk || 'Low'] - riskMap[a.risk || 'Low']);
    } else if (sortBy === 'velocity') {
      sorted.sort((a, b) => (a.velocity_rank || 0) - (b.velocity_rank || 0));
    }
    return sorted;
  };

  const handleLogout = async () => {
  if (dataSource === 'demo') {
    setSession(null);
    setDataSource(null);
  } else {
    // FIX: Change signInWithOAuth to signOut
    await supabase.auth.signOut(); 
    setSession(null);
  }
  setRepos([]);
  setSelectedRepo(null);
  setGithubUsername(''); // Also clear the username
  setShowHero(true);    // Return to landing page
};

  const handleDemoMode = () => {
    setLoading(true);
    setShowHero(false);
    setDataSource('demo');
    
    const mockSession = {
      user: {
        id: 'demo-id',
        user_metadata: {
          full_name: "Demo Architect",
          user_name: "Elite-Dev-Demo",
          avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=shivam"
        }
      }
    };
    setSession(mockSession);

    setTimeout(() => {
      setGithubUsername(DEMO_DATA.username);
      setRepos(DEMO_DATA.repos);
      setSelectedRepo(DEMO_DATA.repos[0]);
      setPrs(DEMO_DATA.prs);
      setMetrics(DEMO_DATA.metrics);
      setLoading(false);
    }, 2000);
  };

    const API_BASE_URL = "https://ai-hub-backend-ogv1.onrender.com"

    const fetchRepos = async (forceRefresh = false) => {
    if (!githubUsername || dataSource === 'demo') return;
    setLoading(true);
    if (!forceRefresh) { setRepos([]); setSelectedRepo(null); }
    
    try {
      const { data: dbRepos } = await supabase
        .from('repositories').select('*')
        .eq('owner_username', githubUsername.toLowerCase())
        .eq('user_id', session.user.id);

      if (dbRepos?.length > 0 && !forceRefresh) {
        setRepos(dbRepos.map(r => ({ ...r, owner: r.owner_json || { login: githubUsername } })));
        setDataSource('supabase');
      } else {
        const res = await fetch(`${API_BASE_URL}/api/github/repos?username=${githubUsername}`);
        const gitData = await res.json();
        
        if (res.ok && gitData.length > 0) {
          setRepos(gitData);
          setDataSource('github');
          
          const toSave = gitData.map(r => ({
            id: r.id, 
            name: r.name, 
            user_id: session.user.id,
            owner_username: githubUsername.toLowerCase(),
            language: r.language, 
            stargazers_count: r.stargazers_count, 
            owner_json: r.owner 
          }));

          const { error: upsertError } = await supabase.from('repositories').upsert(toSave);
          if (upsertError) console.error("Supabase Error:", upsertError.message);
        }
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  }; // <--- This closing brace was likely missing!

    const fetchPRs = async (repo, forceRefresh = false) => {
      if (dataSource === 'demo') {
          setSelectedRepo(repo);
          return;
      }
      setLoadingPRs(true);
      setSelectedRepo(repo);
      if (!forceRefresh) { setPrs([]); setMetrics(null); }
      try {
        const { data: dbPrs } = await supabase
          .from('pull_requests').select('*')
          .eq('repo_id', repo.id)
          .eq('user_id', session.user.id);

      if (dbPrs?.length > 0 && !forceRefresh) {
        setPrs(dbPrs);
        const avg = dbPrs.reduce((acc, curr) => acc + curr.cycle_days, 0) / dbPrs.length;
        setMetrics({ avg_cycle: avg.toFixed(1), total: dbPrs.length });
      } else {
        const ownerName = repo.owner?.login || repo.owner_username;
        const prRes = await fetch(`${API_BASE_URL}/api/github/prs?owner=${ownerName}&repo=${repo.name}`);
        const prData = await prRes.json();
        if (prRes.ok) {
          setPrs(prData.prs || []);
          setMetrics({ avg_cycle: prData.avg_cycle_days, total: prData.total_closed_prs });
          if (prData.prs?.length > 0) {
            const prsToSave = prData.prs.map((pr, idx) => ({
                id: pr.id || (repo.id + idx), repo_id: repo.id,
                user_id: session.user.id, title: pr.title,
                cycle_days: pr.cycle_days, owner_username: githubUsername.toLowerCase()
            }));
            await supabase.from('pull_requests').upsert(prsToSave);
          }
        }
      }
    } catch (e) { console.error(e) }
    setLoadingPRs(false);
  };

  return (
    <div className="min-h-screen bg-obsidian text-white relative font-sans overflow-x-hidden flex">
      <BackgroundLayers />
      <Spotlight />
      
      {/* --- NEW SIDEBAR APP DOCK --- */}
      {session && !showHero && (
        <motion.div 
          initial={{ x: -100 }} animate={{ x: 0 }}
          className="fixed left-0 top-0 h-full w-20 z-[60] flex flex-col items-center py-12 gap-8 border-r border-white/5 glass-morphism"
        >
          <div className="p-4 bg-purple-500/20 rounded-2xl mb-8">
            <Cpu className="text-purple-500" size={24} />
          </div>
          
          {[
            { id: 'terminal', icon: <Terminal size={20} />, label: 'Dashboard' },
            { id: 'simulator', icon: <Rocket size={20} />, label: 'Simulator' },
            { id: 'leaderboard', icon: <Target size={20} />, label: 'Velocity' },
            { id: 'healing', icon: <ShieldCheck size={20} />, label: 'Healing' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`group relative p-4 rounded-2xl transition-all ${
                activePage === item.id ? 'bg-white/10 text-white' : 'text-white/20 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="absolute left-20 bg-white text-black text-[10px] font-black px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest whitespace-nowrap pointer-events-none shadow-xl z-50">
                {item.label}
              </span>
            </button>
          ))}
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {showHero && !session ? (
          <motion.div 
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              clipPath: "circle(0% at 50% 50%)",
              opacity: 0,
              scale: 0.8,
              transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
            }}
            className="flex-grow flex flex-col items-center py-32 relative z-20 px-6 overflow-y-auto custom-scrollbar"
          >
            <div className="text-center relative max-w-7xl mx-auto">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -inset-40 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 blur-[150px] rounded-full pointer-events-none" />
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  <h1 className="text-8xl md:text-[14rem] font-black tracking-tighter leading-none uppercase italic relative">AI <span className="outline-text">HUB</span></h1>
                  <p className="text-purple-400 font-mono text-xs tracking-[1.2em] uppercase mt-8 animate-pulse">Spatial Intelligence v4.0</p>
                </motion.div>
              <div className="flex flex-col md:flex-row gap-6 justify-center mt-20 relative z-30">
                <button onClick={() => setShowHero(false)} className="px-16 py-6 bg-white text-black font-black uppercase tracking-[0.2em] rounded-full hover:scale-110 hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all duration-500">Get Started</button>
                <button onClick={handleDemoMode} className="px-16 py-6 border border-white/10 glass-morphism text-white font-black uppercase tracking-[0.2em] rounded-full hover:bg-white/10 transition-all duration-500">Live Demo</button>
              </div>
              <InfoBentoGrid />
            </div>
          </motion.div>
        ) : !session ? (
          <motion.div key="auth" initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 0 }} animate={{ clipPath: "circle(150% at 50% 50%)", opacity: 1 }} transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} className="w-full">
            <Auth />
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard-container"
            className="flex-grow pl-24 relative z-20 max-w-[1500px] mx-auto p-8 md:p-16 overflow-y-auto custom-scrollbar"
          >
            <AnimatePresence mode="wait">
              {activePage === 'terminal' && (
                <motion.div key="term" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                  <header className="flex justify-between items-start mb-24">
                    <div>
                      <h1 className="text-7xl font-black uppercase italic tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Terminal <span className="text-purple-500">01</span></h1>
                      <div className="flex items-center gap-4 mt-6">
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                          <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">{status}</span>
                        </div>
                        {dataSource && <span className="text-[10px] px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 font-bold uppercase tracking-widest">Node: {dataSource}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 glass-morphism p-2 pr-6 rounded-full">
                      <img src={session.user.user_metadata.avatar_url} className="w-10 h-10 rounded-full border-2 border-purple-500" alt="avatar" />
                      <div className="text-left">
                        <p className="text-xs font-black uppercase tracking-widest">{session.user.user_metadata.full_name}</p>
                        <p className="text-[9px] text-white/40 uppercase">@{session.user.user_metadata.user_name}</p>
                      </div>
                      <button onClick={handleLogout} className="ml-4 p-2 hover:bg-white/10 rounded-full transition-colors"><LogOut size={18} className="text-purple-400" /></button>
                    </div>
                  </header>

                  <div className="grid grid-cols-12 gap-12">
                    <div className="col-span-12 lg:col-span-4 space-y-8">
                      <div className="relative group">
                        <input type="text" placeholder="GIVE ME A USERNAME..." value={githubUsername} onChange={(e) => setGithubUsername(e.target.value)} readOnly={dataSource === 'demo'} className={`w-full bg-white/[0.03] border border-white/10 p-6 rounded-2xl outline-none focus:border-purple-500 transition-all font-mono tracking-widest text-sm ${dataSource === 'demo' ? 'opacity-50 cursor-not-allowed' : ''}`} />
                        <button onClick={() => fetchRepos(false)} disabled={loading || dataSource === 'demo'} className="absolute right-4 top-4 p-3 bg-purple-500 rounded-xl hover:scale-110 transition-transform disabled:bg-white/10">
                          {loading ? <Loader2 className="animate-spin" /> : <RefreshCw size={18} />}
                        </button>
                        {loading && <p className="absolute -bottom-6 left-2 text-[9px] text-purple-400 uppercase tracking-[0.2em] font-bold">{LOADING_STEPS[loaderStep]}</p>}
                      </div>
                      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 flex items-center gap-3"><Box size={14} className="text-purple-500" /> Discovered Nodes</h2>
                          <div className="flex gap-2">
                             <button onClick={() => setSortBy('risk')} className={`p-2 rounded-lg border border-white/5 transition-colors ${sortBy === 'risk' ? 'bg-red-500/20 text-red-500' : 'text-white/20 hover:text-white'}`}><Flame size={12} /></button>
                             <button onClick={() => setSortBy('velocity')} className={`p-2 rounded-lg border border-white/5 transition-colors ${sortBy === 'velocity' ? 'bg-blue-500/20 text-blue-500' : 'text-white/20 hover:text-white'}`}><Gauge size={12} /></button>
                          </div>
                        </div>
                        <motion.div layout className="space-y-4">
                          {getSortedRepos().map((repo) => (
                            <div key={repo.id} ref={el => repoRefs.current[repo.id] = el} onMouseEnter={() => setHoveredRepo(repo)} onMouseLeave={() => setHoveredRepo(null)}>
                              <SpatialCard active={selectedRepo?.id === repo.id} onClick={() => fetchPRs(repo, false)}>
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-lg font-black uppercase italic tracking-tighter truncate w-2/3">{repo.name}</h3>
                                  <RiskIndicator level={repo.risk || "Low"} />
                                </div>
                                <div className="flex justify-between mt-4 items-center">
                                  <span className="text-[9px] font-bold bg-white/10 px-2 py-1 rounded text-purple-300 uppercase tracking-widest">{repo.language || 'DATA'}</span>
                                  <span className="text-xs text-white/40 font-mono">ID: {repo.id.toString().slice(0, 5)}</span>
                                </div>
                              </SpatialCard>
                            </div>
                          ))}
                        </motion.div>
                      </div>
                    </div>

                    <div className="col-span-12 lg:col-span-8">
                      <AnimatePresence mode="wait">
                        {!selectedRepo ? (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full min-h-[500px] flex flex-col items-center justify-center border border-white/5 rounded-[3rem] bg-white/[0.01] opacity-20"><LayoutTemplate size={80} className="mb-8" /><p className="font-mono text-xs tracking-[1em] uppercase italic">Select Node to Synchronize</p></motion.div>
                        ) : (
                          <motion.div key={selectedRepo.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                            {/* TIME TRAVEL DEBUGGER */}
                            <div className="glass-morphism p-8 rounded-[2rem] border border-white/5 relative overflow-hidden">
                               <div className="flex justify-between items-center mb-6">
                                  <div className="flex items-center gap-3">
                                     <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><History size={16} /></div>
                                     <h5 className="text-[10px] font-black uppercase tracking-widest">Chronos Debugger</h5>
                                  </div>
                                  <span className="text-[10px] font-mono text-white/40 uppercase">History Depth: {timeTravelRange}%</span>
                               </div>
                               <input type="range" min="10" max="100" value={timeTravelRange} onChange={(e) => setTimeTravelRange(e.target.value)} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                               <div className="flex justify-between mt-2 text-[8px] font-mono opacity-30 uppercase tracking-tighter"><span>Initial Commit</span><span>Current Head</span></div>
                            </div>

                            <div className="grid grid-cols-2 gap-10">
                              <div className="glass-morphism p-10 rounded-[2.5rem] relative overflow-hidden group border border-white/5">
                                  <div className="relative z-10">
                                     <p className="text-[10px] font-black tracking-[0.5em] text-purple-400 uppercase mb-4">Metric: Velocity</p>
                                     <div className="flex items-baseline gap-4">
                                       <h4 className="text-8xl font-black italic tracking-tighter">{currentAvg.toFixed(1)}</h4>
                                       <div className={`flex items-center gap-1 ${debtDiff > 0 ? 'text-red-500' : 'text-green-500'}`}>
                                          {debtDiff > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                          <span className="text-xs font-bold">{Math.abs(debtDiff).toFixed(1)}</span>
                                       </div>
                                     </div>
                                  </div>
                                  <Activity size={120} className="absolute -right-4 -bottom-4 text-white/[0.02] group-hover:text-purple-500/[0.03] transition-colors" />
                              </div>
                              <div className="glass-morphism p-10 rounded-[2.5rem] relative overflow-hidden group border border-white/5">
                                  <div className="relative z-10">
                                     <p className="text-[10px] font-black tracking-[0.5em] text-white/30 uppercase mb-4">Metric: Throughput</p>
                                     <h4 className="text-8xl font-black italic tracking-tighter">{visiblePrs.length}</h4>
                                  </div>
                                  <Database size={120} className="absolute -right-4 -bottom-4 text-white/[0.02] group-hover:text-white/[0.04] transition-colors" />
                              </div>
                            </div>

                            <div className="glass-morphism rounded-[3rem] p-12 relative mb-24 border border-white/5">
                              <div className="flex justify-between items-center mb-12">
                                  <h3 className="text-sm font-black tracking-[0.4em] uppercase flex items-center gap-4"><Zap className="text-purple-500 fill-purple-500/20" size={20} /> Neural Flow Map</h3>
                                  <button onClick={() => setIsAiOpen(true)} className="px-10 py-3 bg-purple-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:scale-105 transition-all">Launch AI Analysis</button>
                              </div>
                              <div className="h-[350px]">
                                {loadingPRs ? (
                                  <div className="h-full flex flex-col items-center justify-center gap-4"><Loader2 className="animate-spin text-purple-500" size={48} /><p className="text-[9px] font-mono uppercase tracking-widest text-white/30">{LOADING_STEPS[loaderStep]}</p></div>
                                ) : (
                                  <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={visiblePrs.slice(0, 15)}>
                                      <defs>
                                        <linearGradient id="riskHigh" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={1}/><stop offset="95%" stopColor="#ef4444" stopOpacity={0.2}/></linearGradient>
                                        <linearGradient id="riskLow" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#a855f7" stopOpacity={1}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0.2}/></linearGradient>
                                      </defs>
                                      <Bar dataKey="cycle_days" radius={[10, 10, 10, 10]}>
                                        {visiblePrs.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.riskScore > 70 ? "url(#riskHigh)" : "url(#riskLow)"} />))}
                                      </Bar>
                                      <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} content={({ active, payload }) => {
                                          if (active && payload && payload.length) {
                                            const data = payload[0].payload;
                                            return (
                                              <div className="glass-morphism p-4 border border-white/10 rounded-xl shadow-2xl backdrop-blur-md">
                                                <p className="text-[10px] font-bold text-purple-400 uppercase mb-1">{data.title}</p>
                                                <p className="text-lg font-black italic">{payload[0].value} Days</p>
                                                <div className="h-[1px] w-full bg-white/10 my-2" />
                                                <div className="flex flex-col gap-1">
                                                  <p className="text-[9px] text-white/40 uppercase">Complexity: {data.riskScore}%</p>
                                                  {data.riskScore > 70 && <div className="flex items-center gap-2 text-red-500 animate-pulse"><AlertTriangle size={12} /><p className="text-[8px] font-bold uppercase tracking-tighter">Conflict Risk</p></div>}
                                                </div>
                                              </div>
                                            );
                                          }
                                          return null;
                                        }}
                                      />
                                    </BarChart>
                                  </ResponsiveContainer>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}

              {activePage === 'simulator' && (
                <motion.div key="sim" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center py-20 w-full px-4">
                  <div className="w-full max-w-6xl">
                    <Simulator selectedRepo={selectedRepo} />
                  </div>
                </motion.div>
              )}

              {activePage === 'leaderboard' && (
                <motion.div key="leaderboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center py-20 w-full px-4">
                  <div className="w-full max-w-6xl">
                    <Velocity metrics={metrics} />
                  </div>
                </motion.div>
              )}

              {activePage === 'healing' && (
                <motion.div key="healing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center py-20 w-full px-4">
                  <div className="w-full max-w-6xl">
                    <Healing />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <footer className="w-full flex flex-col items-center justify-center pt-20 pb-10 opacity-30">
                <p className="text-[9px] uppercase tracking-[0.8em] text-white/50 mb-4 italic">"Spatial intelligence is the new compute"</p>
                <div className="flex items-center gap-8">
                  <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-white/10" />
                  <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/40">DESIGNED BY SHIVAM</span>
                  <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-white/10" />
                </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hoveredRepo && hoveredRepo.dependencies?.map(depId => {
          const startNode = repoRefs.current[hoveredRepo.id];
          const endNode = repoRefs.current[depId];
          if (startNode && endNode) {
            return (
              <NeuralLink key={`${hoveredRepo.id}-${depId}`} startRect={startNode.getBoundingClientRect()} endRect={endNode.getBoundingClientRect()} />
            );
          }
          return null;
        })}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsAiOpen(true)}
        className="fixed bottom-10 right-10 z-[70] bg-white text-black px-8 py-5 rounded-2xl font-black flex items-center gap-4 shadow-[0_0_50px_rgba(168,85,247,0.4)] transition-all"
      >
        <Sparkles size={20} fill="black" />
        <span className="tracking-tighter italic uppercase text-xs">AI Assistant</span>
      </motion.button>

      <AISidebar 
        isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} 
        userMetrics={repos} selectedRepo={selectedRepo} prs={prs} metrics={metrics}
      />
    </div>
  )
}
const FlipCard = ({ card, idx }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className={`${card.span} h-64 perspective-1000 cursor-pointer group`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 260, damping: 20 }}
        className="relative w-full h-full preserve-3d"
      >
        {/* --- FRONT FACE --- */}
        <div className={`absolute inset-0 backface-hidden ${card.bg} border border-white/10 rounded-[2.5rem] p-8 glass-morphism flex flex-col justify-between overflow-hidden`}>
          <div className="relative z-10">
            <div className="p-3 bg-black/40 rounded-2xl w-fit mb-6 border border-white/5">
              {card.icon}
            </div>
            <h3 className="text-xl font-black italic uppercase tracking-tighter mb-2">
              {card.title}
            </h3>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">
              Click to reveal mission
            </p>
          </div>
        </div>

        {/* --- BACK FACE --- */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white/5 border border-purple-500/40 rounded-[2.5rem] p-8 glass-morphism flex flex-col justify-center overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-purple-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4">
              {card.detailHeader}
            </h4>
            <p className="text-sm text-white/80 leading-relaxed italic font-medium">
              {card.detailBody}
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-30" />
        </div>
      </motion.div>
    </motion.div>
  );
};



const InfoBentoGrid = () => {
  const infoCards = [
    {
      title: "Who requires this platform?",
      detailHeader: "Target Demographic",
      detailBody: "Technical Leads and Engineering Managers who have lost oversight of their repository's health and developer velocity across multiple microservices.",
      icon: <Users className="text-purple-400" size={24} />,
      span: "md:col-span-2",
      bg: "bg-purple-500/5"
    },
    {
      title: "What work will this solve?",
      detailHeader: "Problem Solver",
      detailBody: "Automates the identification of merge-conflicts and bottleneck PRs, reducing technical debt through AI-driven repository auditing.",
      icon: <SearchCode className="text-yellow-400" size={24} />,
      span: "md:col-span-1",
      bg: "bg-yellow-500/5"
    },
    {
      title: "This platform is for whom?",
      detailHeader: "User Profile",
      detailBody: "Organizations transitioning to a data-driven engineering culture where metrics like 'Cycle Time' and 'Throughput' are mission-critical.",
      icon: <Target className="text-blue-400" size={24} />,
      span: "md:col-span-1",
      bg: "bg-blue-500/5"
    },
    {
      title: "Usecase of this platform",
      detailHeader: "Core Functionality",
      detailBody: "Predictive release cycle mapping and neural flow analysis for GitHub repositories, providing architectural clarity for complex codebases.",
      icon: <Briefcase className="text-green-400" size={24} />,
      span: "md:col-span-2",
      bg: "bg-green-500/5"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-24 mb-32">
      {infoCards.map((card, idx) => (
        <FlipCard key={idx} card={card} idx={idx} />
      ))}
    </div>
  );
};

export default App;