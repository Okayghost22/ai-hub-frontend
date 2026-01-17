import { supabase } from '../supabaseClient';
import { Github, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export default function Auth() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        // This ensures they come back to your app after clicking 'Authorize'
        redirectTo: window.location.origin 
      }
    });
    if (error) console.error("Login error:", error.message);
  };

  return (
    <div style={{
      height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', 
      justifyContent: 'center', background: '#0f0f23', color: 'white', overflow: 'hidden'
    }}>
      <div style={{
        padding: '3.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '32px',
        border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', maxWidth: '480px',
        backdropFilter: 'blur(30px)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        position: 'relative'
      }}>
        <div style={{ 
          width: '70px', height: '70px', background: 'linear-gradient(45deg, #a855f7, #7c3aed)',
          borderRadius: '20px', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
        }}>
          <Sparkles size={32} color="white" />
        </div>
        
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.5px' }}>
            AI Dev Hub
        </h1>
        <p style={{ color: '#a1a1aa', marginBottom: '2.5rem', lineHeight: '1.6', fontSize: '1.05rem' }}>
          Connect your GitHub to analyze PR velocity, track cycle times, and get AI-powered productivity coaching.
        </p>

        <button 
          onClick={handleLogin}
          style={{
            width: '100%', padding: '1.2rem', background: 'white', color: '#0f0f23',
            borderRadius: '16px', fontWeight: '700', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
            fontSize: '1rem', transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(255,255,255,0.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          <Github size={22} /> Continue with GitHub
        </button>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '20px', opacity: 0.5 }}>
            <span style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}><ShieldCheck size={14}/> Secure OAuth</span>
            <span style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}><Zap size={14}/> Instant Sync</span>
        </div>
      </div>
    </div>
  );
}