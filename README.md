# Vegas/LA/SD Trip Planner 2025 🎰🌴🌊

A fully synced trip planner app for your crew! All changes sync in real-time across all devices worldwide.

## Features

- 🔐 **Password Protected** - Keep your trip private
- 👥 **Crew Management** - See all travelers
- ✅ **Personal Checklists** - Private to each user
- 📋 **Crew Checklists** - Shared across all users
- 📝 **Important Notes** - Highlighted banner with author & timestamp
- 🔄 **Real-time Sync** - All changes sync across devices via Neon PostgreSQL
- 📱 **Mobile Friendly** - Works great on phones and tablets

## Tech Stack

- **Frontend**: React 18 + Tailwind CSS (CDN-based)
- **Backend**: Netlify Functions (Serverless)
- **Database**: Neon PostgreSQL (Serverless)
- **Hosting**: Netlify

## Deployment on Netlify

### 1. Connect GitHub Repository
1. Go to [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and select this repository
4. Deploy settings are auto-configured via `netlify.toml`

### 2. Set Environment Variable
After deployment, add your database connection:

1. Go to Site Settings → Environment Variables
2. Add: `DATABASE_URL` = your Neon connection string

**Your Neon connection string:**
```
postgresql://neondb_owner:npg_SPgiLzW63Hnv@ep-wild-mode-ahtvkpwm-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### 3. Redeploy
Trigger a new deployment for the environment variable to take effect.

## Usage

1. Visit your Netlify site URL
2. Enter password: `VegasTrip202$!`
3. Enter your name
4. Start planning!

## Local Development

```bash
# Install dependencies
npm install

# Run with Netlify Dev (includes functions)
npx netlify dev
```

## Project Structure

```
trip/
├── index.html              # Main React app
├── netlify.toml           # Netlify configuration
├── package.json           # Dependencies
├── netlify/
│   └── functions/
│       └── db.js          # Serverless database API
└── README.md
```

## Crew Password

`VegasTrip202$!`

---

Have an amazing trip! 🎉
