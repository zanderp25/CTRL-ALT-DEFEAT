import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
const bcrypt = require('bcrypt');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { cac } = req.body;

    // Validate the CAC (this is just a placeholder, replace with actual validation logic)
    if (cac === '1234') {
      const sessionData = { cac };
      const saltRounds = 10;
      const encryptedSessionData = await bcrypt.hash(JSON.stringify(sessionData), saltRounds);

      const cookie = serialize('session', encryptedSessionData, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 15, // 15 minutes
        path: '/',
      });

      res.setHeader('Set-Cookie', cookie);
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid CAC' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}