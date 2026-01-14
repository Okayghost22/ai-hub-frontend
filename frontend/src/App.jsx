import { useState, useEffect } from 'react'

function App() {
  const [status, setStatus] = useState('Connected')
  const [githubUsername, setGithubUsername] = useState('')
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)

  // Backend health check
  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(res => res.json())
      .then(data => setStatus(data.message))
      .catch(() => setStatus('❌ Backend down'))
  }, [])

  const fetchRepos = async () => {
    if (!githubUsername) return
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:5000/api/github/repos?username=${githubUsername}`)
      const data = await res.json()
      setRepos(data)
    } catch (error) {
      alert('Failed to fetch repos')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a0033 50%, #0f0f23 100%)',
      color: 'white',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, white, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '2rem'
        }}>
          AI Dev Productivity Hub
        </h1>
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '20px',
          padding: '2rem',
          maxWidth: '600px',
          marginBottom: '2rem'
        }}>
          <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
            Backend: <span style={{ color: '#10b981' }}>{status}</span>
          </p>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Enter GitHub username (e.g. torvalds)"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              style={{
                flex: 1,
                padding: '1rem',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.05)',
                color: 'white',
                fontSize: '1rem'
              }}
            />
            <button
              onClick={fetchRepos}
              disabled={loading}
              style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(45deg, #a855f7, #7c3aed)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Loading...' : 'Fetch Repos'}
            </button>
          </div>
        </div>

        {repos.length > 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '2rem'
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
              {repos.length} Repositories
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {repos.map((repo) => (
                <div key={repo.id} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  transition: 'all 0.3s ease'
                }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                    {repo.name}
                  </h3>
                  <p style={{ color: '#a1a1aa', marginBottom: '0.5rem' }}>
                    {repo.full_name}
                  </p>
                  <p style={{ color: repo.language ? '#a855f7' : '#6b7280', fontWeight: '500' }}>
                    {repo.language || 'No language'} • {repo.stargazers_count} ⭐
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
