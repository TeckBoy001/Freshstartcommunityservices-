import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE_NAME = 'fsc_admin_session';
const SECRET = process.env.ADMIN_SESSION_SECRET || 'fsc_dev_secret_key_change_in_production_2026';

const encoder = new TextEncoder();
let hmacKeyPromise: Promise<CryptoKey> | null = null;

function getHmacKey(): Promise<CryptoKey> {
  if (!hmacKeyPromise) {
    hmacKeyPromise = crypto.subtle.importKey(
      'raw',
      encoder.encode(SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
  }
  return hmacKeyPromise;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlToString(input: string): string {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// Edge-compatible equivalent of verifyToken in src/lib/auth.ts (Web Crypto instead of Node crypto)
async function verifyToken(token: string): Promise<boolean> {
  try {
    const [payload, signature] = token.split('.');
    if (!payload || !signature) return false;
    const key = await getHmacKey();
    const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
    const expectedSignature = bytesToBase64Url(new Uint8Array(sig));
    if (!timingSafeEqual(signature, expectedSignature)) return false;
    const data = JSON.parse(base64UrlToString(payload));
    if (Date.now() > data.expiresAt) return false;
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin/* routes except the login page and its API
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';
  const isAuthApi = pathname === '/api/admin/auth';

  if (isAdminRoute && !isLoginPage) {
    const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionToken || !(await verifyToken(sessionToken))) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
