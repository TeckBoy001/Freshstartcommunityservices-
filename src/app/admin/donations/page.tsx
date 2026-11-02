'use client';

import React, { useState, useEffect } from 'react';
import { Donation, Donor } from '@/types/database';
import { DollarSign, Download, Plus, Search, Filter, CheckCircle2, Shield, User, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [loggingOffline, setLoggingOffline] = useState(false);
  const [offlineForm, setOfflineForm] = useState({
    amount: '',
    donor_name: '',
    donor_email: '',
    campaign_id: 'camp-001',
    payment_method: 'check' as 'check' | 'cash' | 'ach',
    notes: '',
  });

  const fetchDonations = async () => {
    try {
      const url = search ? `/api/admin/donations?search=${encodeURIComponent(search)}` : '/api/admin/donations';
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setDonations(data.donations || []);
      }
    } catch {
      console.error('Failed to load donations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [search]);

  const handleExportCSV = () => {
    window.location.href = '/api/admin/donations?format=csv';
  };

  const handleLogOffline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!offlineForm.amount || !offlineForm.donor_name || !offlineForm.donor_email) {
      alert('Please fill out amount, donor name, and email.');
      return;
    }

    try {
      const res = await fetch('/api/admin/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offlineForm),
      });

      if (res.ok) {
        setLoggingOffline(false);
        setOfflineForm({
          amount: '',
          donor_name: '',
          donor_email: '',
          campaign_id: 'camp-001',
          payment_method: 'check',
          notes: '',
        });
        await fetchDonations();
      } else {
        alert('Failed to log donation');
      }
    } catch {
      alert('Error recording offline gift');
    }
  };

  const totalRaised = donations.reduce((sum, d) => (d.status === 'completed' ? sum + d.amount : sum), 0);

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1E1E1E]">Donor Database & Financial Ledger</h2>
          <p className="text-xs text-gray-500">
            Encrypted donor records, giving histories, manual check/cash intake, and board reporting exports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleExportCSV}
            variant="outline"
            size="sm"
            className="text-xs font-bold border-gray-300 flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-[#258C4F]" /> Export to CSV
          </Button>

          <Button
            onClick={() => setLoggingOffline(true)}
            size="sm"
            className="bg-[#258C4F] text-white font-bold text-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Log Offline Gift
          </Button>
        </div>
      </div>

      {/* Overview Stat Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold uppercase">Total Filtered Contributions</span>
          <p className="text-2xl font-black text-[#258C4F] mt-1">${totalRaised.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold uppercase">Confirmed Transactions</span>
          <p className="text-2xl font-black text-[#1E1E1E] mt-1">{donations.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
          <Shield className="w-8 h-8 text-[#258C4F] shrink-0" />
          <div className="text-[11px] text-gray-500 leading-tight">
            <strong>PCI Compliant:</strong> No cardholder credentials stored. Internal staff audit log active.
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-2">
        <Search className="w-4 h-4 text-gray-400 ml-2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by donor name, email, or donation ID..."
          className="w-full text-xs outline-none bg-transparent"
        />
      </div>

      {/* Donations Table */}
      {loading ? (
        <div className="p-8 text-center text-gray-400 text-xs">Loading donor database records...</div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Donor Name & Contact</th>
                  <th className="py-3 px-4">Designated Campaign</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Ref / Check #</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {donations.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50/50">
                    <td className="py-3 px-4 text-gray-500 font-mono text-[11px]">
                      {new Date(d.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-gray-900">{d.donor_name}</p>
                      <p className="text-gray-400 text-[11px]">{d.donor_email}</p>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-700">{d.campaign_name || 'General Fund'}</td>
                    <td className="py-3 px-4 font-black text-sm text-[#258C4F]">${d.amount.toFixed(2)}</td>
                    <td className="py-3 px-4 uppercase font-semibold text-[10px] text-gray-500">{d.payment_method}</td>
                    <td className="py-3 px-4 font-mono text-[10px] text-gray-400 max-w-[120px] truncate">
                      {d.payment_processor_ref}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-green-50 text-green-700">
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Manual Offline Modal */}
      {loggingOffline && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-[#1E1E1E]">Log Offline Contribution (Check / Cash)</h3>
              <button onClick={() => setLoggingOffline(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLogOffline} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Donation Amount ($ USD) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={offlineForm.amount}
                    onChange={(e) => setOfflineForm({ ...offlineForm, amount: e.target.value })}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5 font-bold"
                    placeholder="100.00"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Payment Method</label>
                  <select
                    value={offlineForm.payment_method}
                    onChange={(e) => setOfflineForm({ ...offlineForm, payment_method: e.target.value as any })}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-white"
                  >
                    <option value="check">Personal / Business Check</option>
                    <option value="cash">Cash Donation</option>
                    <option value="ach">Direct Bank ACH</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Donor Full Name or Church / Org *</label>
                <input
                  type="text"
                  required
                  value={offlineForm.donor_name}
                  onChange={(e) => setOfflineForm({ ...offlineForm, donor_name: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                  placeholder="e.g. Bethel Fellowship or Jane Smith"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Donor Email Address *</label>
                <input
                  type="email"
                  required
                  value={offlineForm.donor_email}
                  onChange={(e) => setOfflineForm({ ...offlineForm, donor_email: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                  placeholder="donor@example.com"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Designated Campaign</label>
                <select
                  value={offlineForm.campaign_id}
                  onChange={(e) => setOfflineForm({ ...offlineForm, campaign_id: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-white"
                >
                  <option value="camp-001">Circle of Love Pantry Winter Relief Campaign</option>
                  <option value="camp-002">Youth Career Readiness & Laptop Lab</option>
                  <option value="camp-003">General Community Hope Fund</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Staff Notes / Check Number</label>
                <input
                  type="text"
                  value={offlineForm.notes}
                  onChange={(e) => setOfflineForm({ ...offlineForm, notes: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                  placeholder="e.g. Check #4092 received at church drop-off"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setLoggingOffline(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#258C4F] text-white font-bold">
                  Record to Database
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
