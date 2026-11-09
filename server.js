import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let cachedClient = null;
let cachedDb = null;

// In-memory array for local testing if MongoDB URI has not been provided with password
const localDevComments = [];

function sanitizeUri(rawUri) {
  if (!rawUri) return '';
  let clean = rawUri.trim();
  if (clean.includes('mongodb+srv://kartikjoshi842_db_user:mongodb+srv://')) {
    clean = clean.replace('mongodb+srv://kartikjoshi842_db_user:mongodb+srv://', 'mongodb+srv://');
  }
  return clean;
}

async function getDatabase() {
  const rawUri = process.env.MONGODB_URI || '';
  const uri = sanitizeUri(rawUri);
  const dbName = process.env.MONGODB_DB_NAME || 'portfolio';

  if (!uri || uri.includes('<db_password>')) {
    return { db: null, reason: 'Password not set yet in MONGODB_URI' };
  }

  if (cachedDb) return { db: cachedDb };

  try {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    });
    await client.connect();
    const db = client.db(dbName);
    cachedClient = client;
    cachedDb = db;
    console.log('✅ Connected successfully to MongoDB Atlas database:', dbName);
    return { db };
  } catch (err) {
    console.warn('⚠️ MongoDB Atlas connection notice:', err.message);
    return { db: null, reason: err.message };
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET comments
app.get('/api/comments', async (req, res) => {
  const { db, reason } = await getDatabase();
  if (!db) {
    return res.json({
      success: true,
      source: 'local_dev',
      note: reason,
      comments: localDevComments,
    });
  }

  try {
    const collection = db.collection('comments');
    const comments = await collection.find({}).sort({ createdAt: -1 }).limit(100).toArray();
    res.json({
      success: true,
      source: 'mongodb_atlas',
      comments: comments || [],
    });
  } catch (err) {
    res.json({
      success: true,
      source: 'error',
      error: err.message,
      comments: localDevComments,
    });
  }
});

// POST comments
app.post('/api/comments', async (req, res) => {
  try {
    const { name, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ success: false, error: 'Name and comment are required.' });
    }

    const newComment = {
      name: name.trim().slice(0, 50),
      message: message.trim().slice(0, 600),
      createdAt: new Date().toISOString(),
    };

    const { db } = await getDatabase();
    if (!db) {
      const saved = { ...newComment, _id: 'local-' + Date.now() };
      localDevComments.unshift(saved);
      return res.status(201).json({
        success: true,
        source: 'local_dev',
        comment: saved,
      });
    }

    const collection = db.collection('comments');
    const result = await collection.insertOne(newComment);
    res.status(201).json({
      success: true,
      source: 'mongodb_atlas',
      comment: { ...newComment, _id: result.insertedId },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST contact
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, subject } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
    }

    const recipient = process.env.CONTACT_RECEIVER_EMAIL || 'kartikjoshi842@gmail.com';
    const web3formsKey = process.env.VITE_WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_ACCESS_KEY;

    if (web3formsKey) {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3formsKey,
          name,
          email,
          message,
          subject: subject || `Portfolio Contact from ${name}`,
          from_name: 'Kartik Joshi Portfolio',
        }),
      });
      const data = await response.json();
      if (data.success) {
        return res.json({ success: true, message: 'Delivered to your email via Web3Forms!' });
      }
    }

    console.log(`[Local Contact Lead to ${recipient}]: From: ${name} <${email}>, Message: ${message}`);
    res.json({
      success: true,
      message: 'Message registered! Configure VITE_WEB3FORMS_ACCESS_KEY in .env.local for automatic inbox dispatch.',
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`⚡ Dev API server running at http://localhost:${PORT}`);
});
