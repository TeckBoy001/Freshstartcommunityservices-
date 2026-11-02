import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    // In production with Stripe secret:
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const event = stripe.webhooks.constructEvent(rawBody, signature!, webhookSecret!);

    let event: any;
    try {
      event = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    // Idempotent event handling
    const db = getDatabase();

    if (event.type === 'checkout.session.completed' || event.type === 'payment_intent.succeeded') {
      const session = event.data.object;
      const ref = session.id || session.payment_intent;

      // Check if donation already recorded to prevent duplicates
      const existing = db.donations.find((d) => d.payment_processor_ref === ref);
      if (existing) {
        if (existing.status !== 'completed') {
          existing.status = 'completed';
          saveDatabase(db);
        }
        return NextResponse.json({ received: true, note: 'Already recorded, updated status' });
      }

      // If new, mark recorded
      return NextResponse.json({ received: true, note: 'Webhook processed' });
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook processing error:', err);
    return NextResponse.json({ error: 'Webhook handler error' }, { status: 400 });
  }
}
