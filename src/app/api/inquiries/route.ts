import { NextRequest, NextResponse } from 'next/server';
import { recordInquiry } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, type, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const inquiry = recordInquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone || undefined,
      subject: subject || `${type.toUpperCase()} Submission`,
      type: type || 'general',
      message: message.trim(),
    });

    return NextResponse.json({ success: true, inquiry });
  } catch (err: any) {
    console.error('Inquiry error:', err);
    return NextResponse.json({ error: 'Failed to record inquiry' }, { status: 500 });
  }
}
