// backend/routes/github.js
const express = require('express');
const router = express.Router();

router.get('/repos', async (req, res) => {
  try {
    const username = req.query.username;
    if (!username) {
      return res.status(400).json({ error: 'Username required' });
    }

    // Fetch ALL repos (paginated)
    let allRepos = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`,
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_PAT}`,
            'User-Agent': 'dev-productivity-hub'
          }
        }
      );

      const repos = await response.json();
      
      // If empty array or error, stop
      if (!repos || repos.length === 0) {
        hasMore = false;
        break;
      }

      allRepos = allRepos.concat(repos);
      page++;
      
      // Stop if less than 100 returned (last page)
      if (repos.length < 100) hasMore = false;
    }

    res.json(allRepos);
  } catch (error) {
    console.error('GitHub API error:', error);
    res.status(500).json({ error: 'Failed to fetch repos' });
  }
});

module.exports = router;
