import type { VercelRequest, VercelResponse } from '@vercel/node';

// Mock user data - in production this would use a proper database
const mockUsers = [
  { id: '1', email: 'demo@quests.dev', name: 'Demo User' }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;
  
  if (method === 'POST') {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    // Mock authentication - in production use proper auth
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'demo') {
      return res.status(200).json({ 
        user,
        token: 'mock-jwt-token' 
      });
    }
    
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}