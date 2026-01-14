const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// GitHub routes
const githubRoutes = require('./routes/github');
app.use('/api/github', githubRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "AI Dev Productivity Hub backend running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
