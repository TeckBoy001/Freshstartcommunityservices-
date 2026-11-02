import { NextRequest, NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';
import { getPrograms, saveProgram, deleteProgram } from '@/lib/db';

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const list = getPrograms(false);
  return NextResponse.json({ list });
}

export async function POST(req: NextRequest) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const program = saveProgram(body);
    return NextResponse.json({ success: true, program });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error saving program' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const ok = deleteProgram(id);
  return NextResponse.json({ success: ok });
}
