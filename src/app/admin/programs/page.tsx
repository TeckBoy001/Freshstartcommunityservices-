'use client';

import React, { useState, useEffect } from 'react';
import { Program } from '@/types/database';
import { BookOpen, Plus, Edit2, Trash2, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProg, setEditingProg] = useState<Partial<Program> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchPrograms = async () => {
    try {
      const res = await fetch('/api/admin/programs');
      if (res.ok) {
        const data = await res.json();
        setPrograms(data.list || []);
      }
    } catch {
      console.error('Failed to load programs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProg?.title) {
      alert('Program title is required.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProg),
      });

      if (res.ok) {
        setEditingProg(null);
        await fetchPrograms();
      } else {
        alert('Failed to save program details.');
      }
    } catch {
      alert('Error updating program.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this program?')) return;

    try {
      const res = await fetch(`/api/admin/programs?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchPrograms();
      }
    } catch {
      alert('Error deleting program.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1E1E1E]">Programs Management (13 Core Initiatives)</h2>
          <p className="text-xs text-gray-500">
            Edit descriptions, target populations, categories, and homepage display settings.
          </p>
        </div>
        <Button
          onClick={() =>
            setEditingProg({
              title: '',
              category: 'Workshops',
              description_short: '',
              description_full: '',
              target_population: 'Youth, families & community members',
              status: 'active',
              image_url:
                'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80',
              is_featured: false,
              display_order: programs.length + 1,
            })
          }
          className="bg-[#258C4F] text-white font-bold text-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Program
        </Button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-400 text-xs">Loading programs...</div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm divide-y divide-gray-100">
          {programs.map((prog) => (
            <div key={prog.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                  <img src={prog.image_url} alt={prog.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-[#1E1E1E]">{prog.title}</h3>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-green-50 text-[#258C4F]">
                      {prog.category}
                    </span>
                    {prog.is_featured && (
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Target: {prog.target_population}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => setEditingProg(prog)}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-[#258C4F] transition-colors"
                  title="Edit Program"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(prog.id)}
                  className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete Program"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingProg && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-5 my-8 shadow-xl">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="font-bold text-lg text-[#1E1E1E]">
                {editingProg.id ? 'Edit Program Details' : 'Add New Program'}
              </h3>
              <button onClick={() => setEditingProg(null)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Program Title *</label>
                <input
                  type="text"
                  required
                  value={editingProg.title || ''}
                  onChange={(e) => setEditingProg({ ...editingProg, title: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#258C4F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={editingProg.category || 'Workshops'}
                    onChange={(e) => setEditingProg({ ...editingProg, category: e.target.value as any })}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-white"
                  >
                    <option value="Workshops">Workshops</option>
                    <option value="Community Care">Community Care</option>
                    <option value="Empowerment">Empowerment</option>
                    <option value="Inspirational">Inspirational</option>
                    <option value="Support">Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                  <select
                    value={editingProg.status || 'active'}
                    onChange={(e) => setEditingProg({ ...editingProg, status: e.target.value as any })}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-white"
                  >
                    <option value="active">Active</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingProg.display_order ?? 1}
                    onChange={(e) => setEditingProg({ ...editingProg, display_order: parseInt(e.target.value) || 1 })}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Target Population</label>
                <input
                  type="text"
                  value={editingProg.target_population || ''}
                  onChange={(e) => setEditingProg({ ...editingProg, target_population: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={editingProg.image_url || ''}
                  onChange={(e) => setEditingProg({ ...editingProg, image_url: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Short Description (Cards)</label>
                <textarea
                  rows={2}
                  value={editingProg.description_short || ''}
                  onChange={(e) => setEditingProg({ ...editingProg, description_short: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Detailed Description</label>
                <textarea
                  rows={4}
                  value={editingProg.description_full || ''}
                  onChange={(e) => setEditingProg({ ...editingProg, description_full: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="feat"
                  checked={editingProg.is_featured ?? false}
                  onChange={(e) => setEditingProg({ ...editingProg, is_featured: e.target.checked })}
                  className="rounded text-[#258C4F]"
                />
                <label htmlFor="feat" className="text-xs font-semibold text-gray-700 cursor-pointer">
                  Feature on Homepage Programs Grid
                </label>
              </div>

              <div className="pt-4 border-t flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setEditingProg(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="bg-[#258C4F] text-white">
                  {saving ? 'Saving...' : 'Save Program'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
