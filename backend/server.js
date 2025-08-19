const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const Workshop = require('./models/Workshop');
const Question = require('./models/Question');
const Field = require('./models/Field');

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/agritech', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.error(err));

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// Routes

// Weather (mock; can replace with real API)
app.get('/api/weather', (req, res) => {
  res.json({
    temp: 28 + Math.floor(Math.random()*6), // random temp for demo
    desc: ["Sunny","Partly Cloudy","Rainy"][Math.floor(Math.random()*3)],
    humidity: 56 + Math.floor(Math.random()*14)
  });
});

// Register for workshop
app.post('/api/workshop', async (req, res) => {
  try {
    const { name, email } = req.body;
    if(!name || !email)
      return res.status(400).json({ success: false, message: "Name and email required." });
    await Workshop.create({ name, email });
    res.json({ success: true, message: "Workshop registered!" });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// Ask an Expert (store questions)
app.post('/api/ask-expert', async (req, res) => {
  try {
    const { question } = req.body;
    if(!question)
      return res.status(400).json({ success: false, message: "Question is required." });
    await Question.create({ question });
    res.json({ success: true, reply: "Thanks! Our experts will reply soon." });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// List previous questions (for demo Q&A feed)
app.get('/api/questions', async (req, res) => {
  const questions = await Question.find().sort({ askedAt: -1 }).limit(10);
  res.json(questions);
});

// Upload field boundary file (e.g., geojson)
app.post('/api/upload-field', upload.single('fieldFile'), async (req, res) => {
  if(!req.file) return res.status(400).json({ success: false, message: "File required." });
  await Field.create({
    originalName: req.file.originalname,
    fileName: req.file.filename
  });
  res.json({ success: true, filename: req.file.filename, message: "File uploaded!" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT));
