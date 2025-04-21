const bm25Score = require('./bm25score.js');

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove non-word characters
    .split(/\s+/)             // Split by whitespace
    .filter(Boolean);         // Remove empty strings
}

function getRankedDocuments(query, documents) {
  const queryTokens = tokenize(query);
  const bm25Docs = documents.map(doc => tokenize(doc.content));
  const avgDocLength = bm25Docs.reduce((sum, d) => sum + d.length, 0) / bm25Docs.length;

  const ranked = documents.map((doc, idx) => {
    return {
      document: doc,
      score: bm25Score(queryTokens, bm25Docs[idx], avgDocLength, bm25Docs.length, bm25Docs)
    };
  });

  return ranked.sort((a, b) => b.score - a.score);
}

module.exports = getRankedDocuments;
