const axios = require('axios');
require('dotenv').config();
async function generateResponseWithGemini(question, topDocs) {
  const contextText = topDocs.map(doc => doc.document.content).join('\n');
  const apiUrl = process.env.GEMINI_API_URL;
  const payload = {
    contents: [
      {
        parts: [
          { text: `Use the following documents to answer the question:\n\n${contextText}\n\nQuestion: ${question}` }
        ]
      }
    ]
  };

  try {
    const response = await axios.post(apiUrl, payload);
    const modelResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return modelResponse || "No response from Gemini.";
  } catch (error) {
    console.error('Error calling Gemini API:', error.response?.data || error.message);
    return "Error generating response from Gemini.";
  }
}
module.exports= generateResponseWithGemini;