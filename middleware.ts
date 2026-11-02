import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const SESSION_COOKIE_NAME = 'fsc_admin_session';
const SECRET = process.env.ADMIN_SESSION_SECRET || 'fsc_dev_secret_key_change_in_production_2026';

function verifyToken(token: string): boolean {
  try {
    const [payload, signature] = token.split('.');
    if (!payload || !signature) return false;
    const expectedSignature = crypto.createHmac('sha256', SECRET).update(payload).digest('base64url');
    if (signature !== expectedSignature) return false;
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));
    if (Date.now() > data.expiresAt) return false;
    return true;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin/* routes except the login page and its API
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';
  const isAuthApi = pathname === '/api/admin/auth';

  if (isAdminRoute && !isLoginPage) {
    const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionToken || !verifyToken(sessionToken)) {
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
