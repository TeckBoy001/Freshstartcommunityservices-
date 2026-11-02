import { NextRequest, NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';
import { getDonations, recordDonation } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const campaign_id = searchParams.get('campaign_id') || undefined;
  const status = searchParams.get('status') || undefined;
  const search = searchParams.get('search') || undefined;
  const format = searchParams.get('format');

  const donations = getDonations({ campaign_id, status, search });

  // CSV Export support
  if (format === 'csv') {
    const headers = [
      'Donation ID',
      'Date',
      'Donor Name',
      'Donor Email',
      'Amount',
      'Currency',
      'Campaign',
      'Payment Method',
      'Status',
      'Transaction Ref',
      'Notes',
    ];
    const rows = donations.map((d) => [
      d.id,
      d.created_at,
      `"${d.donor_name.replace(/"/g, '""')}"`,
      d.donor_email,
      d.amount,
      d.currency,
      `"${(d.campaign_name || '').replace(/"/g, '""')}"`,
      d.payment_method,
      d.status,
      d.payment_processor_ref || '',
      `"${(d.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    return new Response(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="FSC_Donations_Report_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  }

  return NextResponse.json({ donations });
}

export async function POST(req: NextRequest) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Only Super Admin and Development Admin can record offline donations
  if (session.role !== 'super_admin' && session.role !== 'fundraising_admin') {
    return NextResponse.json({ error: 'Insufficient permission to log donations' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { amount, donor_name, donor_email, campaign_id, payment_method, notes, phone, mailing_address } = body;

    if (!amount || !donor_name || !donor_email) {
      return NextResponse.json({ error: 'Amount, donor name, and email are required' }, { status: 400 });
    }

    const donation = recordDonation({
      amount: Number(amount),
      donor_name,
      donor_email,
      campaign_id,
      payment_method: payment_method || 'check',
      payment_processor_ref: `OFFLINE-MANUAL-${Date.now()}`,
      frequency: 'one-time',
      status: 'completed',
      notes: notes ? `Staff logged: ${notes}` : 'Manually logged offline donation',
      phone,
      mailing_address,
    });

    return NextResponse.json({ success: true, donation });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error recording offline donation' }, { status: 500 });
  }
}
