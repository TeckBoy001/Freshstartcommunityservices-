'use client';

import React, { useState, useEffect } from 'react';
import { Article } from '@/types/database';
import { FileText, Plus, Edit2, Trash2, CheckCircle2, X, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArt, setEditingArt] = useState<Partial<Article> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/admin/articles');
      if (res.ok) {
        const data = await res.json();
        setArticles(data.list || []);
      }
    } catch {
      console.error('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArt?.title) {
      alert('Article title is required.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingArt),
      });

      if (res.ok) {
        setEditingArt(null);
        await fetchArticles();
      } else {
        alert('Failed to save article.');
      }
    } catch {
      alert('Error updating article.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this article?')) return;

    try {
      const res = await fetch(`/api/admin/articles?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchArticles();
      }
    } catch {
      alert('Error deleting article.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1E1E1E]">News & Blog Publishing</h2>
          <p className="text-xs text-gray-500">
            Publish announcements, impact stories, and community updates with draft/publish workflows.
          </p>
        </div>
        <Button
          onClick={() =>
            setEditingArt({
              title: '',
              category: 'Organization News',
              excerpt: '',
              content: '',
              author_name: 'FSC Editorial Team',
              featured_image:
                'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
              status: 'draft',
            })
          }
          className="bg-[#258C4F] text-white font-bold text-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create New Article
        </Button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-400 text-xs">Loading articles...</div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm divide-y divide-gray-100">
          {articles.map((art) => (
            <div key={art.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                  <img src={art.featured_image} alt={art.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-[#1E1E1E]">{art.title}</h3>
                    <span
                      className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                        art.status === 'published'
                          ? 'bg-green-50 text-green-700'
                          : art.status === 'draft'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {art.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {art.category} • By {art.author_name} •{' '}
                    {art.published_at ? new Date(art.published_at).toLocaleDateString() : 'Unpublished draft'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => setEditingArt(art)}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-[#258C4F] transition-colors"
                  title="Edit Article"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(art.id)}
                  className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete Article"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {editingArt && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-5 my-8 shadow-xl">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="font-bold text-lg text-[#1E1E1E]">
                {editingArt.id ? 'Edit Article' : 'Draft New Article'}
              </h3>
              <button onClick={() => setEditingArt(null)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Article Headline *</label>
                <input
                  type="text"
                  required
                  value={editingArt.title || ''}
                  onChange={(e) => setEditingArt({ ...editingArt, title: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#258C4F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={editingArt.category || 'Organization News'}
                    onChange={(e) => setEditingArt({ ...editingArt, category: e.target.value as any })}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-white"
                  >
                    <option value="Organization News">Organization News</option>
                    <option value="Community Stories">Community Stories</option>
                    <option value="Program Updates">Program Updates</option>
                    <option value="Events">Events</option>
                    <option value="Volunteer Opportunities">Volunteer Opportunities</option>
                    <option value="Fundraising News">Fundraising News</option>
                    <option value="Announcements">Announcements</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                  <select
                    value={editingArt.status || 'draft'}
                    onChange={(e) => setEditingArt({ ...editingArt, status: e.target.value as any })}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-white font-bold"
                  >
                    <option value="draft">Draft (Private)</option>
                    <option value="published">Published (Live)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={editingArt.author_name || ''}
                    onChange={(e) => setEditingArt({ ...editingArt, author_name: e.target.value })}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Featured Image URL</label>
                <input
                  type="url"
                  value={editingArt.featured_image || ''}
                  onChange={(e) => setEditingArt({ ...editingArt, featured_image: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Excerpt / Summary (2-3 sentences)</label>
                <textarea
                  rows={2}
                  value={editingArt.excerpt || ''}
                  onChange={(e) => setEditingArt({ ...editingArt, excerpt: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Article Content</label>
                <textarea
                  rows={8}
                  value={editingArt.content || ''}
                  onChange={(e) => setEditingArt({ ...editingArt, content: e.target.value })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5 font-mono text-xs leading-relaxed"
                  placeholder="Write story content using paragraphs, bullet lists, or quotes..."
                />
              </div>

              <div className="pt-4 border-t flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setEditingArt(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="bg-[#258C4F] text-white">
                  {saving ? 'Saving...' : 'Save & Update Article'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
