const express = require('express');
const cors = require('cors');
const askRoute = require('./routes/ask');
const app = express();
app.use(express.json());
app.use(cors());
// API Endpoint
app.use('/api', askRoute);
// Start server
const port = 3002;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
