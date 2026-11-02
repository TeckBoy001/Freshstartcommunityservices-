'use client';

import React, { useState, useEffect } from 'react';
import { FundraisingCampaign } from '@/types/database';
import { HeartHandshake, Plus, Edit2, TrendingUp, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<FundraisingCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCamp, setEditingCamp] = useState<Partial<FundraisingCampaign> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch('/api/admin/campaigns');
      if (res.ok) {
        const data = await res.json();
        setCampaigns(data.list || []);
      }
    } catch {
      console.error('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCamp?.name || !editingCamp?.target_goal) {
      alert('Campaign name and target goal are required.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCamp),
      });

      if (res.ok) {
        setEditingCamp(null);
        await fetchCampaigns();
      } else {
        alert('Failed to save campaign');
      }
    } catch {
      alert('Error updating campaign');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1E1E1E]">Fundraising Campaigns & Goals</h2>
          <p className="text-xs text-gray-500">
            Define initiatives, set target amounts, and track live contributions calculated from qualifying donations.
          </p>
        </div>
        <Button
          onClick={() =>
            setEditingCamp({
              name: '',
              target_goal: 10000,
              description: '',
              status: 'active',
              is_featured: true,
              start_date: new Date().toISOString().split('T')[0],
            })
          }
          className="bg-[#258C4F] text-white font-bold text-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create Campaign
        </Button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-400 text-xs">Loading campaigns...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((camp) => {
            const pct = Math.min(Math.round((camp.amount_raised / camp.target_goal) * 100), 100);
            return (
              <div key={camp.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#258C4F]">
                      Status: {camp.status}
                    </span>
                    <h3 className="text-base font-bold text-[#1E1E1E] leading-snug">{camp.name}</h3>
                  </div>
                  <button
                    onClick={() => setEditingCamp(camp)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2">{camp.description}</p>

                <div className="space-y-1.5 pt-2 border-t border-gray-100">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#258C4F]">${camp.amount_raised.toLocaleString()} raised</span>
                    <span className="text-gray-500">Goal: ${camp.target_goal.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#258C4F] h-2 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-right text-[10px] text-gray-400 font-semibold">{pct}% funded</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Modal */}
      {editingCamp && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-[#1E1E1E]">
                {editingCamp.id ? 'Edit Campaign' : 'Create New Campaign'}
              </h3>
              <button onClick={() => setEditingCamp(null)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Campaign Name *</label>
                <input
                  type="text"
                  required
                  value={editingCamp.name || ''}
                  onChange={(e) => setEditingCamp({ ...editingCamp, name: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Target Goal ($ USD) *</label>
                  <input
                    type="number"
                    required
                    value={editingCamp.target_goal ?? 10000}
                    onChange={(e) => setEditingCamp({ ...editingCamp, target_goal: parseFloat(e.target.value) || 0 })}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Status</label>
                  <select
                    value={editingCamp.status || 'active'}
                    onChange={(e) => setEditingCamp({ ...editingCamp, status: e.target.value as any })}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-white font-bold"
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingCamp.description || ''}
                  onChange={(e) => setEditingCamp({ ...editingCamp, description: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setEditingCamp(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} size="sm" className="bg-[#258C4F] text-white font-bold">
                  {saving ? 'Saving...' : 'Save Campaign'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
