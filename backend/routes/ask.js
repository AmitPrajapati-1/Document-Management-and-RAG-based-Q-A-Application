const express = require('express');
const router = express.Router();
const getRankedDocuments = require('../docsrank/getRankedDocuments');
const generateResponseWithGemini = require('../genres/generateResponseWithGemini');

router.post('/ask', async (req, res) => {
  const { question, documents } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  if (!documents || !Array.isArray(documents) || documents.length === 0) {
    return res.status(400).json({ error: "Documents are required and must be a non-empty array" });
  }

  const rankedDocs = getRankedDocuments(question, documents);
  const topDocs = rankedDocs.slice(0, 3);

  const answer = await generateResponseWithGemini(question, topDocs);
  res.json({ answer });
});

module.exports = router;
