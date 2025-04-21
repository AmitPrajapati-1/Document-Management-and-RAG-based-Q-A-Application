const bm25Score = (queryTokens, documentTokens, avgDocLength, totalDocs, allDocs) => {
    const k1 = 1.5, b = 0.75;
    let score = 0;
  
    queryTokens.forEach(token => {
      const df = allDocs.filter(doc => doc.includes(token)).length || 1;
      const idf = Math.log(1 + (totalDocs - df + 0.5) / (df + 0.5));
  
      const tf = documentTokens.filter(t => t === token).length;
      score += idf * ((tf * (k1 + 1)) / (tf + k1 * (1 - b + b * (documentTokens.length / avgDocLength))));
    });
  
    return score;
  };
  module.exports=bm25Score
  