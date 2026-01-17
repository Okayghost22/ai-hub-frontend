export const DEMO_DATA = {
  username: "EliteDeveloper",
  repos: [
    { id: 1, name: "hyper-engine", language: "TypeScript", stargazers_count: 120, owner: { login: "demo" } },
    { id: 2, name: "ai-processor", language: "Python", stargazers_count: 85, owner: { login: "demo" } }
  ],
  metrics: {
    avg_cycle: 1.8,
    total: 42
  },
  prs: [
    { title: "feat: implement neural bridge", cycle_days: 1.2 },
    { title: "fix: memory leak in buffer", cycle_days: 0.5 },
    { title: "refactor: core logic overhaul", cycle_days: 4.8 }
  ]
};