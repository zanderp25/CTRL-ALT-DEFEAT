import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// utils.ts authMiddleware
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: number;
    name: string;
    card_id: string;
    role: string;
  }
}

export const adminOnly = (handler: NextApiHandler) => {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    // Expecting the header format: "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token missing' });
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: number; name: string; card_id: string; role: string };
      if (decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Access forbidden: admin only' });
      }
      // Attach the decoded user info to the request for further use if needed.
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};
