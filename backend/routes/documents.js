const express = require('express');
const Document = require('../models/document'); // Import Document model
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Dashboard (fetch documents)
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const email = req.user.email;
    const documents = await Document.find({ email });

    if (!documents.length) {
      return res.status(404).json({ message: 'No documents found' });
    }

    res.json({ documents });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Upload document
router.post('/upload', authMiddleware, async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Missing title or content' });
  }

  try {
    const newDoc = new Document({
      email: req.user.email,
      title,
      content,
      tags,
    });

    await newDoc.save();
    res.status(201).json({ message: 'Document uploaded successfully' });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete document
router.delete('/document/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findById(id);

    if (!doc) return res.status(404).json({ message: 'Document not found' });

    if (doc.email !== req.user.email) return res.status(403).json({ message: 'Unauthorized' });

    await doc.deleteOne();
    res.json({ message: 'Document deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
