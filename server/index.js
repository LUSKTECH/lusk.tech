import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import Database from 'better-sqlite3';
import postmark from 'postmark';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Disable X-Powered-By header for security
app.disable('x-powered-by');

// Rate limiting - 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});

// Stricter rate limit for contact form - 5 submissions per hour
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many contact submissions, please try again later.' }
});

// Apply general rate limiting to all requests
app.use(limiter);

// Initialize Postmark client
const postmarkClient = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new Database(join(__dirname, 'contacts.db'));

// Create contacts table
db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, phone, company, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  try {
    // Save to database
    const stmt = db.prepare(`
      INSERT INTO contacts (name, email, phone, company, message)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(name, email, phone || null, company || null, message);

    // Send email via Postmark
    if (process.env.POSTMARK_API_KEY && process.env.POSTMARK_FROM_EMAIL) {
      try {
        await postmarkClient.sendEmail({
          From: process.env.POSTMARK_FROM_EMAIL,
          To: process.env.CONTACT_EMAIL || 'sales@lusk.tech',
          Subject: `New Contact Form Submission from ${name}`,
          HtmlBody: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Company:</strong> ${company || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr>
            <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
          `,
          TextBody: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Company: ${company || 'N/A'}

Message:
${message}

Submitted at: ${new Date().toLocaleString()}
          `,
          ReplyTo: email,
          MessageStream: 'outbound'
        });
      } catch (emailError) {
        console.error('Postmark email error:', emailError);
        // Don't fail the request if email fails, data is still saved
      }
    }

    res.json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      id: result.lastInsertRowid
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ error: 'Failed to process contact form' });
  }
});

// Get all contacts (for admin/auditing)
app.get('/api/contacts', (req, res) => {
  try {
    const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
