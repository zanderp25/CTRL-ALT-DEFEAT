// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { loginUser } from '../../../services/authService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ token?: string; message?: string }>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { card_id, password } = req.body;
  if (!card_id || !password) {
    return res.status(400).json({ message: 'card_id and password are required' });
  }

  try {
    const result = await loginUser(card_id, password);
    if (!result) {
      return res.status(401).json({ message: 'Invalid card_id or password' });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
