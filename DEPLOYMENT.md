# Contact Form Deployment Guide

## Quick Setup (5 minutes)

### Step 1: Create GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name: "Contact Form"
4. Select scope: `public_repo` (or `repo` if private)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)

### Step 2: Deploy to Vercel (Free, Recommended)

1. Go to: https://vercel.com
2. Sign up/login with GitHub
3. Click "Add New Project"
4. Import `Fox-flow/LakeStarSponsors` repository
5. Go to Project Settings → Environment Variables
6. Add:
   - Name: `GITHUB_TOKEN`
   - Value: (paste your token)
7. Deploy

Your function will be at: `https://your-site.vercel.app/api/contact`

### Step 3: Update JavaScript

Update `js/main.js` line 144 to use your Vercel URL:
```javascript
const apiUrl = 'https://your-site.vercel.app/api/contact';
```

Or if deploying to same domain, keep: `const apiUrl = '/api/contact';`

### Alternative: Netlify

1. Go to: https://app.netlify.com
2. Sign up/login
3. "Add new site" → "Import an existing project"
4. Connect GitHub → Select repository
5. Build settings: Leave default
6. Go to Site settings → Environment variables
7. Add `GITHUB_TOKEN` with your token
8. Deploy

## How It Works

1. User submits form → JavaScript calls your serverless function
2. Serverless function creates GitHub Issue (using secure token)
3. GitHub sends you email notification
4. You can reply directly from GitHub or email

## Benefits

- ✅ Free (Vercel/Netlify free tier)
- ✅ Secure (token never exposed to client)
- ✅ Automatic email notifications
- ✅ All submissions tracked as GitHub Issues
- ✅ No external service dependency

