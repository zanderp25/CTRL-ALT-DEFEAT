// services/authService.ts
import { getDB } from '../lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export type User = {
  id: number;
  name: string;
  email: string;
  card_id: string;
  password_hash: string;
  role: string;
  created_at: string;
};

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Securely store this in your environment

// Retrieves a user by their simulated CAC card_id
export async function getUserByCardId(card_id: string): Promise<User | undefined> {
  const db = await getDB();
  return db.get<User>('SELECT * FROM users WHERE card_id = ?', card_id);
}

// Logs in a user by verifying the provided password and issuing a JWT
export async function loginUser(card_id: string, password: string): Promise<{ token: string } | null> {
  const user = await getUserByCardId(card_id);
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return null;

  // Generate a JWT token valid for 1 hour
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      card_id: user.card_id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token };
}
