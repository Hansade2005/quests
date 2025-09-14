import type { VercelRequest, VercelResponse } from '@vercel/node';

// Mock preferences store - in production this would use a database
const mockPreferences = {
  theme: 'system' as 'light' | 'dark' | 'system',
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;
  
  if (method === 'GET') {
    return res.status(200).json(mockPreferences);
  }
  
  if (method === 'POST') {
    const { theme } = req.body;
    if (theme && ['light', 'dark', 'system'].includes(theme)) {
      mockPreferences.theme = theme;
      return res.status(200).json({ success: true });
    }
    return res.status(400).json({ error: 'Invalid theme' });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}