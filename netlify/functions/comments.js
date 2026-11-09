import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

function sanitizeUri(rawUri) {
  if (!rawUri) return '';
  let clean = rawUri.trim();
  if (clean.includes('mongodb+srv://kartikjoshi842_db_user:mongodb+srv://')) {
    clean = clean.replace('mongodb+srv://kartikjoshi842_db_user:mongodb+srv://', 'mongodb+srv://');
  }
  return clean;
}

async function connectToDatabase() {
  const rawUri = process.env.MONGODB_URI || '';
  const uri = sanitizeUri(rawUri);
  const dbName = process.env.MONGODB_DB_NAME || 'portfolio';

  if (!uri || uri.includes('<db_password>')) {
    return { client: null, db: null, reason: 'Password not set yet in MONGODB_URI' };
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    await client.connect();
    const db = client.db(dbName);
    cachedClient = client;
    cachedDb = db;
    return { client, db };
  } catch (err) {
    console.error('MongoDB Atlas Connection Error:', err.message);
    return { client: null, db: null, reason: err.message };
  }
}

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const { db, reason } = await connectToDatabase();

  // GET Comments
  if (event.httpMethod === 'GET') {
    if (!db) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          source: 'local_ready',
          note: reason,
          comments: [],
        }),
      };
    }

    try {
      const collection = db.collection('comments');
      const comments = await collection
        .find({})
        .sort({ createdAt: -1 })
        .limit(100)
        .toArray();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          source: 'mongodb_atlas',
          comments: comments || [],
        }),
      };
    } catch (error) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          source: 'error',
          error: error.message,
          comments: [],
        }),
      };
    }
  }

  // POST Comment
  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body || '{}');
      const name = (data.name || '').trim().slice(0, 50);
      const message = (data.message || '').trim().slice(0, 600);

      if (!name || !message) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, error: 'Name and comment are required.' }),
        };
      }

      const newComment = {
        name,
        message,
        createdAt: new Date().toISOString(),
      };

      if (!db) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            source: 'session_cache',
            comment: { ...newComment, _id: 'temp-' + Date.now() },
          }),
        };
      }

      const collection = db.collection('comments');
      const result = await collection.insertOne(newComment);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          source: 'mongodb_atlas',
          comment: { ...newComment, _id: result.insertedId },
        }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, error: error.message }),
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method Not Allowed' }),
  };
};
