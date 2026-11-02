import { NextRequest, NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';
import { getLeadership, saveLeadership, deleteLeadership } from '@/lib/db';

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const list = getLeadership(false);
  return NextResponse.json({ list });
}

export async function POST(req: NextRequest) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const leader = saveLeadership(body);
    return NextResponse.json({ success: true, leader });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error saving profile' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const ok = deleteLeadership(id);
  return NextResponse.json({ success: ok });
}
