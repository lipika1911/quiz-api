// api/quiz.js
const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const quizPath = path.join(__dirname, "..", "quiz.json");
  const quizData = JSON.parse(fs.readFileSync(quizPath, "utf-8"));

  const url = req.url.split("?")[0];
  const match = url.match(/^\/api\/quiz\/([^\/]+)\/([^\/]+)$/);

  if (match) {
    const category = match[1];
    const difficulty = match[2];

    const categoryData = quizData[category];
    if (!categoryData)
      return res.status(404).json({ error: "Invalid category" });

    const difficultyData = categoryData[difficulty];
    if (!difficultyData)
      return res.status(404).json({ error: "Invalid difficulty level" });

    return res.status(200).json(difficultyData);
  }

  // Fallback welcome
  res.status(200).send("🎯 Quiz API is up and running!");
};
