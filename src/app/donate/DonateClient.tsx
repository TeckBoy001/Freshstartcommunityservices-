'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Heart, ShieldCheck, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function DonateClient() {
  const searchParams = useSearchParams();
  const initialCampaign = searchParams.get('campaign') || 'camp-001';

  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [amount, setAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [campaignId, setCampaignId] = useState<string>(initialCampaign);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [donorType, setDonorType] = useState<'individual' | 'business' | 'church' | 'foundation'>('individual');

  const [processing, setProcessing] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState<any | null>(null);

  const presetAmounts = [25, 50, 100, 250];

  const handleAmountSelect = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    const parsed = parseFloat(e.target.value);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    }
  };

  const handleDonateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      alert('Please select or enter a valid donation amount.');
      return;
    }

    setProcessing(true);

    try {
      const res = await fetch('/api/donations/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          frequency,
          campaignId,
          firstName,
          lastName,
          email,
          phone,
          address,
          donorType,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessReceipt(data.donation);
      } else {
        alert(data.error || 'Payment processing error. Please try again.');
      }
    } catch (err) {
      alert('Network error while processing donation.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-[#0D472D] text-white py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#ADFF1C] text-xs font-bold uppercase tracking-wider mb-4">
            <Heart className="w-3.5 h-3.5 fill-[#ADFF1C]" /> Empower Communities in Need
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Support Fresh Start Community Services
          </h1>
          <p className="text-gray-200 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Your generous gift provides fresh pantry groceries, career training, and emergency relief with dignity and
            without judgement.
          </p>
        </div>
      </section>

      {/* Main Donation Container */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          {successReceipt ? (
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-md text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 text-[#258C4F] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#258C4F]">
                  Donation Successful
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E1E1E] mt-1">
                  Thank You, {successReceipt.donor_name}!
                </h2>
                <p className="text-gray-600 text-sm mt-2">
                  Your generous contribution of{' '}
                  <strong className="text-gray-900">${successReceipt.amount.toFixed(2)} USD</strong> has been securely
                  recorded in our donor database.
                </p>
              </div>

              {/* Receipt Summary Box */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-left text-xs text-gray-700 space-y-2.5 max-w-md mx-auto">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-semibold text-gray-500">Transaction Ref:</span>
                  <span className="font-mono">{successReceipt.payment_processor_ref}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-semibold text-gray-500">Designated Fund:</span>
                  <span>{successReceipt.campaign_name}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-semibold text-gray-500">Gift Type:</span>
                  <span className="capitalize">{successReceipt.frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">Receipt Email:</span>
                  <span>{successReceipt.donor_email}</span>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-xl text-xs text-[#0D472D] flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#258C4F] shrink-0" />
                <span>An automated tax receipt summary has been logged for delivery.</span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                <Button onClick={() => setSuccessReceipt(null)} variant="outline">
                  Make Another Gift
                </Button>
                <Link href="/">
                  <Button className="bg-[#258C4F] text-white">Return to Homepage</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200 shadow-md">
              <form onSubmit={handleDonateSubmit} className="space-y-8">
                {/* 1. Frequency Toggle */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Gift Frequency
                  </label>
                  <div className="grid grid-cols-2 gap-3 bg-gray-100 p-1.5 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setFrequency('one-time')}
                      className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
                        frequency === 'one-time'
                          ? 'bg-white text-[#1E1E1E] shadow-sm'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      One-Time Gift
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      className={`py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${
                        frequency === 'monthly'
                          ? 'bg-[#258C4F] text-white shadow-sm'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#ADFF1C]" />
                      Monthly Sustainer
                    </button>
                  </div>
                </div>

                {/* 2. Amount Selection */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Select Contribution Amount
                  </label>
                  <div className="grid grid-cols-4 gap-3 mb-3">
                    {presetAmounts.map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleAmountSelect(val)}
                        className={`py-3 rounded-xl font-black text-base border transition-all ${
                          amount === val && !customAmount
                            ? 'bg-[#258C4F] text-white border-[#258C4F] shadow-sm'
                            : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        ${val}
                      </button>
                    ))}
                  </div>
                  <div>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-gray-500 font-bold text-sm">$</span>
                      <input
                        type="number"
                        min="5"
                        step="1"
                        value={customAmount}
                        onChange={handleCustomChange}
                        placeholder="Other Custom Amount (USD)"
                        className="w-full pl-8 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#258C4F]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Campaign Designee */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Designate Your Gift
                  </label>
                  <select
                    value={campaignId}
                    onChange={(e) => setCampaignId(e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#258C4F] bg-white text-gray-800"
                  >
                    <option value="camp-001">Circle of Love Pantry Winter Relief Campaign</option>
                    <option value="camp-002">Youth Career Readiness &amp; Laptop Lab</option>
                    <option value="camp-003">General Community Hope Fund (Where Most Needed)</option>
                  </select>
                </div>

                {/* 4. Donor Information */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-gray-800">Donor Information</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#258C4F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#258C4F]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#258C4F]"
                        placeholder="receipts@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Donor Category</label>
                      <select
                        value={donorType}
                        onChange={(e) => setDonorType(e.target.value as any)}
                        className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#258C4F] bg-white"
                      >
                        <option value="individual">Individual</option>
                        <option value="business">Business / Corporate</option>
                        <option value="church">Church / Faith Partner</option>
                        <option value="foundation">Civic Foundation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Mailing Address (Optional, for year-end tax statements)
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#258C4F]"
                      placeholder="Street, City, State, ZIP"
                    />
                  </div>
                </div>

                {/* 5. Trust Statement */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs text-gray-600 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-gray-800">
                    <ShieldCheck className="w-4 h-4 text-[#258C4F]" />
                    <span>Nonprofit Stewardship &amp; Security</span>
                  </div>
                  <p>
                    Fresh Start Community Services, Incorporated complies with strict donor privacy standards. Raw payment
                    card numbers are processed securely via encrypted payment gateway and are never stored on this server.
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-[#258C4F] hover:bg-[#0D472D] text-white font-extrabold py-3.5 text-base rounded-xl shadow-md flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  {processing ? 'Processing Secure Gift...' : `Complete $${amount} ${frequency === 'monthly' ? '/ Month' : ''} Gift`}
                </Button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
