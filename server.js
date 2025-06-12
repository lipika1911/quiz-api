// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Load the quiz data from the JSON file
const quizData = JSON.parse(fs.readFileSync('./quiz.json', 'utf-8'));

// API route: Get questions by category and difficulty
app.get('/api/quiz/:category/:difficulty', (req, res) => {
  const { category, difficulty } = req.params;

  const categoryData = quizData[category];
  if (!categoryData) return res.status(404).json({ error: "Invalid category" });

  const difficultyData = categoryData[difficulty];
  if (!difficultyData) return res.status(404).json({ error: "Invalid difficulty level" });
  res.json(difficultyData);
});

// Welcome route
app.get('/', (req, res) => {
  res.send('🎯 Quiz API is up and running!');
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
