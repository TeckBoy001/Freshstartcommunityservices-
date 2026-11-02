import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, setSessionCookie, clearSessionCookie, getCurrentSession } from '@/lib/auth';

export async function GET() {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, session });
}

export async function POST(req: NextRequest) {
  try {
    const { action, email, password } = await req.json();

    if (action === 'logout') {
      await clearSessionCookie();
      return NextResponse.json({ success: true, message: 'Logged out successfully' });
    }

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const admin = authenticateUser(email, password);
    if (!admin) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const sessionData = {
      userId: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    };

    await setSessionCookie(sessionData);

    return NextResponse.json({
      success: true,
      user: { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
    });
  } catch (err: any) {
    console.error('Auth error:', err);
    return NextResponse.json({ error: 'Authentication service error' }, { status: 500 });
  }
}
