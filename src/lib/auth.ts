import { cookies } from 'next/headers';
import crypto from 'crypto';
import { getDatabase } from './db';
import { AdminAccount, Role } from '@/types/database';

const SESSION_COOKIE_NAME = 'fsc_admin_session';

export interface SessionData {
  userId: string;
  email: string;
  name: string;
  role: Role;
  expiresAt: number;
}

// Simple signed token mechanism using Node crypto
const SECRET = process.env.ADMIN_SESSION_SECRET || 'fsc_dev_secret_key_change_in_production_2026';

export function signToken(data: SessionData): string {
  const payload = Buffer.from(JSON.stringify(data)).toString('base64url');
  const signature = crypto.createHmac('sha256', SECRET).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export function verifyToken(token: string): SessionData | null {
  try {
    const [payload, signature] = token.split('.');
    if (!payload || !signature) return null;

    const expectedSignature = crypto.createHmac('sha256', SECRET).update(payload).digest('base64url');
    if (signature !== expectedSignature) return null;

    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8')) as SessionData;
    if (Date.now() > data.expiresAt) return null;

    return data;
  } catch {
    return null;
  }
}

export async function getCurrentSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionToken) return null;
  return verifyToken(sessionToken);
}

export async function setSessionCookie(session: SessionData) {
  const cookieStore = await cookies();
  const token = signToken(session);
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export function authenticateUser(email: string, passwordAttempt: string): AdminAccount | null {
  const db = getDatabase();
  const admin = db.admins.find((a) => a.email.toLowerCase() === email.toLowerCase());
  if (!admin) return null;

  // Verify password (plain for dev demo; in production use bcrypt/argon2)
  if (admin.password_hash === passwordAttempt) {
    admin.last_login = new Date().toISOString();
    return admin;
  }

  return null;
}
