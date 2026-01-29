# Lusk.tech Setup Guide

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory (copy from `.env.example`):

   ```bash
   cp .env.example .env
   ```

3. Set up Postmark (free 100 emails/month):
   - Sign up at <https://postmarkapp.com>
   - Create a new server
   - Get your Server API Token
   - Add a verified sender signature (your domain or email)
   - Update `.env` with:
     - `POSTMARK_API_KEY` - Your Server API Token
     - `POSTMARK_FROM_EMAIL` - Your verified sender email
     - `CONTACT_EMAIL` - Where you want to receive submissions

## Running the Application

### Development Mode (Both Frontend & Backend)

```bash
npm run dev:all
```

This runs:

- Frontend on <http://localhost:5173>
- Backend API on <http://localhost:3001>

### Run Separately

Frontend only:

```bash
npm run dev
```

Backend only:

```bash
npm run server
```

## Contact Form Features

- Modal popup when clicking "Get in Touch"
- Sends email notifications to configured address
- Saves all submissions to SQLite database (`server/contacts.db`)
- Form validation
- Success/error feedback

## Database

Contact submissions are stored in `server/contacts.db` for auditing purposes.

To view contacts, you can:

1. Use a SQLite browser tool
2. Access the API endpoint: `GET http://localhost:3001/api/contacts`

## Production Deployment

For production, you'll need to:

1. Get a Postmark account and verify your domain for better deliverability
2. Configure environment variables on your hosting platform
3. Ensure the server can write to the database location
4. Consider adding authentication to the `/api/contacts` endpoint

## Postmark Setup Notes

- Free tier: 100 emails/month
- You must verify a sender signature (email or domain)
- For testing, you can use a single email address
- For production, verify your domain for professional emails
