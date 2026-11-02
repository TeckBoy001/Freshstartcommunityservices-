import { NextRequest, NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';
import { getPageContent, updatePageContent } from '@/lib/db';

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const pages = getPageContent();
  return NextResponse.json({ pages });
}

export async function POST(req: NextRequest) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const updated = updatePageContent(body);
    return NextResponse.json({ success: true, pages: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error updating page content' }, { status: 500 });
  }
}
