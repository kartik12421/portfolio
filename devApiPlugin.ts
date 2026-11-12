import { Plugin } from 'vite';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load .env
dotenv.config();

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;
const localComments: any[] = [];

function sanitizeUri(rawUri: string) {
  if (!rawUri) return '';
  let clean = rawUri.trim();
  if (clean.includes('mongodb+srv://kartikjoshi842_db_user:mongodb+srv://')) {
    clean = clean.replace('mongodb+srv://kartikjoshi842_db_user:mongodb+srv://', 'mongodb+srv://');
  }
  if (clean.includes('@cluster0.pwvqkig.mongodb.net/@cluster0.pwvqkig.mongodb.net')) {
    clean = clean.replace('@cluster0.pwvqkig.mongodb.net/@cluster0.pwvqkig.mongodb.net', '@cluster0.pwvqkig.mongodb.net');
  }
  if (!clean.includes('retryWrites=true')) {
    clean += clean.includes('?') 
      ? '&retryWrites=true&w=majority' 
      : (clean.endsWith('/') ? 'portfolio?retryWrites=true&w=majority' : '/portfolio?retryWrites=true&w=majority');
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
    console.log('✅ [Vite Dev API] Connected successfully to MongoDB Atlas database:', dbName);
    return { db };
  } catch (err: any) {
    console.warn('⚠️ [Vite Dev API] MongoDB Atlas notice:', err.message);
    return { db: null, reason: err.message };
  }
}

function parseJsonBody(req: any): Promise<any> {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk: any) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch {
        resolve({});
      }
    });
  });
}

function sendJson(res: any, status: number, data: any) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.end(JSON.stringify(data));
}

export function devApiPlugin(): Plugin {
  return {
    name: 'vite-dev-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];

        // Only handle /api/* endpoints
        if (!url || !url.startsWith('/api/')) {
          return next();
        }

        if (req.method === 'OPTIONS') {
          return sendJson(res, 200, {});
        }

        // Health check
        if (url === '/api/health') {
          return sendJson(res, 200, { status: 'ok', time: new Date().toISOString() });
        }

        // Comments API
        if (url === '/api/comments') {
          const { db, reason } = await getDatabase();

          // GET /api/comments
          if (req.method === 'GET') {
            if (!db) {
              return sendJson(res, 200, {
                success: true,
                source: 'local_dev',
                note: reason,
                comments: localComments,
              });
            }

            try {
              const collection = db.collection('comments');
              const comments = await collection
                .find({})
                .sort({ createdAt: -1 })
                .limit(100)
                .toArray();

              return sendJson(res, 200, {
                success: true,
                source: 'mongodb_atlas',
                comments: comments || [],
              });
            } catch (err: any) {
              return sendJson(res, 200, {
                success: true,
                source: 'error',
                error: err.message,
                comments: localComments,
              });
            }
          }

          // POST /api/comments
          if (req.method === 'POST') {
            const body = await parseJsonBody(req);
            const { name, message } = body;

            if (!name || !message) {
              return sendJson(res, 400, { success: false, error: 'Name and comment are required.' });
            }

            const newComment = {
              name: String(name).trim().slice(0, 50),
              message: String(message).trim().slice(0, 600),
              createdAt: new Date().toISOString(),
            };

            if (!db) {
              const saved = { ...newComment, _id: 'local-' + Date.now() };
              localComments.unshift(saved);
              return sendJson(res, 201, {
                success: true,
                source: 'local_dev',
                comment: saved,
              });
            }

            try {
              const collection = db.collection('comments');
              const result = await collection.insertOne(newComment);
              return sendJson(res, 201, {
                success: true,
                source: 'mongodb_atlas',
                comment: { ...newComment, _id: result.insertedId },
              });
            } catch (err: any) {
              return sendJson(res, 500, { success: false, error: err.message });
            }
          }
        }

        // Contact API
        if (url === '/api/contact' && req.method === 'POST') {
          const body = await parseJsonBody(req);
          const { name, email, message, subject } = body;

          if (!name || !email || !message) {
            return sendJson(res, 400, { success: false, error: 'Name, email, and message are required.' });
          }

          const recipient = process.env.CONTACT_RECEIVER_EMAIL || 'kartikjoshi842@gmail.com';
          const web3formsKey = process.env.VITE_WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_ACCESS_KEY;

          if (web3formsKey) {
            try {
              const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                  access_key: web3formsKey,
                  name,
                  email,
                  message,
                  subject: subject || `Portfolio Contact from ${name}`,
                  from_name: 'Kartik Joshi Portfolio Website',
                }),
              });
              const data = await response.json();
              if (data.success) {
                return sendJson(res, 200, {
                  success: true,
                  message: 'Delivered to your email via Web3Forms!',
                });
              }
            } catch (err: any) {
              console.warn('[Vite Dev API] Web3Forms dispatch warning:', err.message);
            }
          }

          console.log(`[Vite Dev API] Contact Message for ${recipient}: From: ${name} <${email}>: "${message}"`);
          return sendJson(res, 200, {
            success: true,
            message: `Message registered! (Configure VITE_WEB3FORMS_ACCESS_KEY in .env for direct inbox dispatch to ${recipient}).`,
          });
        }

        next();
      });
    },
  };
}
