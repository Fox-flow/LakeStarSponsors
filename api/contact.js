// Serverless function to handle contact form submissions
// Deploy this to Vercel, Netlify, or Cloudflare Workers (all free)
// This keeps your GitHub token secure

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Create GitHub issue
    const response = await fetch('https://api.github.com/repos/Fox-flow/LakeStarSponsors/issues', {
      method: 'POST',
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: `Contact Form: ${name}`,
        body: `**From:** ${name} (${email})\n\n**Message:**\n${message}\n\n---\n*Submitted via contact form on lakestarsponsors.com*`,
        labels: ['contact-form']
      })
    });

    if (response.ok) {
      const issue = await response.json();
      return res.status(200).json({ 
        success: true, 
        issueUrl: issue.html_url 
      });
    } else {
      const error = await response.json();
      console.error('GitHub API error:', error);
      return res.status(500).json({ error: 'Failed to create issue' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

