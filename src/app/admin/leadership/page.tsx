'use client';

import React, { useState, useEffect } from 'react';
import { LeadershipProfile } from '@/types/database';
import { Users, Plus, Edit2, Trash2, CheckCircle2, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminLeadershipPage() {
  const [leaders, setLeaders] = useState<LeadershipProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLeader, setEditingLeader] = useState<Partial<LeadershipProfile> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchLeaders = async () => {
    try {
      const res = await fetch('/api/admin/leadership');
      if (res.ok) {
        const data = await res.json();
        setLeaders(data.list || []);
      }
    } catch {
      console.error('Failed to load leaders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLeader?.name || !editingLeader?.title) {
      alert('Name and title are required.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/leadership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingLeader),
      });

      if (res.ok) {
        setEditingLeader(null);
        await fetchLeaders();
      } else {
        alert('Failed to save leadership profile.');
      }
    } catch {
      alert('Error updating profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove or archive this leadership profile?')) return;

    try {
      const res = await fetch(`/api/admin/leadership?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchLeaders();
      }
    } catch {
      alert('Error deleting profile.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1E1E1E]">Leadership & Board Management</h2>
          <p className="text-xs text-gray-500">
            Add, update biographies, replace photos, and adjust display order for public leadership profiles.
          </p>
        </div>
        <Button
          onClick={() =>
            setEditingLeader({
              name: '',
              title: '',
              role_type: 'director',
              bio_short: '',
              bio_full: '',
              credentials: '',
              image_url:
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
              display_order: leaders.length + 1,
              published: true,
            })
          }
          className="bg-[#258C4F] text-white font-bold text-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Director Profile
        </Button>
      </div>

      {/* Directory Table / Cards */}
      {loading ? (
        <div className="p-8 text-center text-gray-400 text-xs">Loading leadership profiles...</div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm divide-y divide-gray-100">
          {leaders.map((leader) => (
            <div key={leader.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                  <img src={leader.image_url} alt={leader.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-[#1E1E1E]">{leader.name}</h3>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-green-50 text-[#258C4F]">
                      {leader.role_type}
                    </span>
                    {!leader.published && (
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                        Draft / Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 font-semibold">{leader.title}</p>
                  <p className="text-[11px] text-gray-400 line-clamp-1 max-w-xl mt-0.5">{leader.bio_short}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => setEditingLeader(leader)}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-[#258C4F] transition-colors"
                  title="Edit Biography"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(leader.id)}
                  className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete Profile"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Modal */}
      {editingLeader && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-5 my-8 shadow-xl">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="font-bold text-lg text-[#1E1E1E]">
                {editingLeader.id ? 'Edit Leadership Profile' : 'Add New Director'}
              </h3>
              <button onClick={() => setEditingLeader(null)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingLeader.name || ''}
                    onChange={(e) => setEditingLeader({ ...editingLeader, name: e.target.value })}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#258C4F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Official Position / Title *</label>
                  <input
                    type="text"
                    required
                    value={editingLeader.title || ''}
                    onChange={(e) => setEditingLeader({ ...editingLeader, title: e.target.value })}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#258C4F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Role Type</label>
                  <select
                    value={editingLeader.role_type || 'director'}
                    onChange={(e) => setEditingLeader({ ...editingLeader, role_type: e.target.value as any })}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-white"
                  >
                    <option value="executive">Executive</option>
                    <option value="board">Board Member</option>
                    <option value="director">Director</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Credentials (Optional)</label>
                  <input
                    type="text"
                    value={editingLeader.credentials || ''}
                    onChange={(e) => setEditingLeader({ ...editingLeader, credentials: e.target.value })}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                    placeholder="e.g. MSW, LCSW"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingLeader.display_order ?? 1}
                    onChange={(e) => setEditingLeader({ ...editingLeader, display_order: parseInt(e.target.value) || 1 })}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Portrait Image URL</label>
                <input
                  type="url"
                  value={editingLeader.image_url || ''}
                  onChange={(e) => setEditingLeader({ ...editingLeader, image_url: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Short Biography Preview</label>
                <textarea
                  rows={2}
                  value={editingLeader.bio_short || ''}
                  onChange={(e) => setEditingLeader({ ...editingLeader, bio_short: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                  placeholder="1-2 sentences highlighting community experience..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Biography Text</label>
                <textarea
                  rows={5}
                  value={editingLeader.bio_full || ''}
                  onChange={(e) => setEditingLeader({ ...editingLeader, bio_full: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                  placeholder="Comprehensive professional background and dedication to Fresh Start..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pub"
                  checked={editingLeader.published ?? true}
                  onChange={(e) => setEditingLeader({ ...editingLeader, published: e.target.checked })}
                  className="rounded text-[#258C4F]"
                />
                <label htmlFor="pub" className="text-xs font-semibold text-gray-700 cursor-pointer">
                  Publish profile on public Leadership page
                </label>
              </div>

              <div className="pt-4 border-t flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setEditingLeader(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="bg-[#258C4F] text-white">
                  {saving ? 'Saving...' : 'Save Profile'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
