const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Routes
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/documents');
const askRoute = require('./routes/ask');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', documentRoutes);
app.use('/api', askRoute);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB 🚀'))
.catch((err) => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 3001; // IMPORTANT: process.env.PORT for Render
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
