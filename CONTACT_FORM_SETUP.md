# Contact Form Setup with GitHub Actions

## How It Works

The contact form creates a GitHub Issue when submitted, which sends you email notifications automatically.

## Setup Instructions

### Option 1: Using GitHub Personal Access Token (Recommended)

1. **Create a GitHub Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name it: "Contact Form Token"
   - Select scopes: `repo` (full control of private repositories) or `public_repo` (if repo is public)
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again)

2. **Add Token to GitHub Secrets:**
   - Go to: https://github.com/Fox-flow/LakeStarSponsors/settings/secrets/actions
   - Click "New repository secret"
   - Name: `CONTACT_FORM_TOKEN`
   - Value: Paste your token
   - Click "Add secret"

3. **Update the JavaScript:**
   - The token will be used via a serverless function or proxy
   - For a static site, you'll need a simple serverless function to hide the token

### Option 2: Use Serverless Function (Free)

Since we can't expose the token in client-side code, create a free serverless function:

**Using Vercel (Free):**
1. Create `api/contact.js`:
```javascript
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;
  
  const response = await fetch('https://api.github.com/repos/Fox-flow/LakeStarSponsors/issues', {
    method: 'POST',
    headers: {
      'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: `Contact Form: ${name}`,
      body: `**From:** ${name} (${email})\n\n**Message:**\n${message}`,
      labels: ['contact-form']
    })
  });

  if (response.ok) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(500).json({ error: 'Failed to create issue' });
  }
}
```

2. Deploy to Vercel (free)
3. Add `GITHUB_TOKEN` as environment variable
4. Update form to POST to your Vercel function URL

### Option 3: Current Implementation (Mailto Fallback)

The current code uses mailto as a fallback, which works but requires user to send email manually.

## Current Status

- ✅ GitHub Action workflow created (`.github/workflows/contact-form.yml`)
- ✅ JavaScript updated to call GitHub API
- ⚠️ Needs token setup or serverless function to work securely

