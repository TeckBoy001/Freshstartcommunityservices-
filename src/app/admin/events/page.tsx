'use client';

import React, { useState, useEffect } from 'react';
import { EventItem } from '@/types/database';
import { Calendar, Plus, Edit2, Trash2, X, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvt, setEditingEvt] = useState<Partial<EventItem> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/admin/events');
      if (res.ok) {
        const data = await res.json();
        setEvents(data.list || []);
      }
    } catch {
      console.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvt?.title) {
      alert('Event title is required.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingEvt),
      });

      if (res.ok) {
        setEditingEvt(null);
        await fetchEvents();
      } else {
        alert('Failed to save event.');
      }
    } catch {
      alert('Error updating event.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this event?')) return;

    try {
      const res = await fetch(`/api/admin/events?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchEvents();
      }
    } catch {
      alert('Error deleting event.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1E1E1E]">Events & Community Gatherings</h2>
          <p className="text-xs text-gray-500">
            Create and manage upcoming community distributions, workshops, and fellowship days.
          </p>
        </div>
        <Button
          onClick={() =>
            setEditingEvt({
              title: '',
              category: 'Workshop',
              description: '',
              date_time: '2026-11-20T10:00:00',
              location: 'FSC Main Pavilion',
              image_url:
                'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
              status: 'upcoming',
              rsvp_link: '/contact',
            })
          }
          className="bg-[#258C4F] text-white font-bold text-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Event
        </Button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-400 text-xs">Loading events...</div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm divide-y divide-gray-100">
          {events.map((evt) => (
            <div key={evt.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                  <img src={evt.image_url} alt={evt.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-[#1E1E1E]">{evt.title}</h3>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-green-50 text-[#258C4F]">
                      {evt.category}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                        evt.status === 'upcoming'
                          ? 'bg-blue-50 text-blue-700'
                          : evt.status === 'completed'
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-red-50 text-red-600'
                      }`}
                    >
                      {evt.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                    <span>{new Date(evt.date_time).toLocaleString()}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <MapPin className="w-3 h-3" /> {evt.location}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => setEditingEvt(evt)}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-[#258C4F] transition-colors"
                  title="Edit Event"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(evt.id)}
                  className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete Event"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingEvt && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-[#1E1E1E]">
                {editingEvt.id ? 'Edit Event Details' : 'Create New Event'}
              </h3>
              <button onClick={() => setEditingEvt(null)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={editingEvt.title || ''}
                  onChange={(e) => setEditingEvt({ ...editingEvt, title: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Date & Time *</label>
                  <input
                    type="datetime-local"
                    required
                    value={(editingEvt.date_time || '').slice(0, 16)}
                    onChange={(e) => setEditingEvt({ ...editingEvt, date_time: e.target.value })}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={editingEvt.category || 'Special Event'}
                    onChange={(e) => setEditingEvt({ ...editingEvt, category: e.target.value as any })}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-white"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Food Distribution">Food Distribution</option>
                    <option value="Fundraiser">Fundraiser</option>
                    <option value="Community Meeting">Community Meeting</option>
                    <option value="Special Event">Special Event</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingEvt.location || ''}
                    onChange={(e) => setEditingEvt({ ...editingEvt, location: e.target.value })}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Status</label>
                  <select
                    value={editingEvt.status || 'upcoming'}
                    onChange={(e) => setEditingEvt({ ...editingEvt, status: e.target.value as any })}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-white font-bold"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingEvt.description || ''}
                  onChange={(e) => setEditingEvt({ ...editingEvt, description: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setEditingEvt(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} size="sm" className="bg-[#258C4F] text-white font-bold">
                  {saving ? 'Saving...' : 'Save Event'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
