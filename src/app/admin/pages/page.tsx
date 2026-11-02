'use client';

import React, { useState, useEffect } from 'react';
import { PageContent } from '@/types/database';
import { Sliders, Save, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminPagesPage() {
  const [content, setContent] = useState<PageContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/pages')
      .then((res) => res.json())
      .then((data) => setContent(data.pages))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert('Failed to update page settings.');
      }
    } catch {
      alert('Error updating content.');
    } finally {
      setSaving(false);
    }
  };

  if (!content) {
    return <div className="p-8 text-center text-gray-400 text-xs">Loading page content settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-[#1E1E1E]">Homepage & Content Settings</h2>
        <p className="text-xs text-gray-500">
          Modify hero banner text, call-to-action buttons, and headline metrics directly without changing code.
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Page settings updated successfully! Changes are immediately live on the homepage.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 text-xs">
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-[#1E1E1E] border-b pb-2">Hero Section Configuration</h3>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Hero Main Headline</label>
            <input
              type="text"
              required
              value={content.hero_headline}
              onChange={(e) => setContent({ ...content, hero_headline: e.target.value })}
              className="w-full text-sm border border-gray-300 rounded-lg p-2.5 font-bold"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Hero Sub-headline (Supporting text)</label>
            <textarea
              rows={3}
              required
              value={content.hero_subheadline}
              onChange={(e) => setContent({ ...content, hero_subheadline: e.target.value })}
              className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Primary CTA Button Label</label>
              <input
                type="text"
                value={content.hero_cta_primary}
                onChange={(e) => setContent({ ...content, hero_cta_primary: e.target.value })}
                className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Secondary CTA Button Label</label>
              <input
                type="text"
                value={content.hero_cta_secondary}
                onChange={(e) => setContent({ ...content, hero_cta_secondary: e.target.value })}
                className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="font-bold text-sm text-[#1E1E1E] border-b pb-2">Community Impact Counters</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Families Served Counter</label>
              <input
                type="number"
                value={content.impact_families_served}
                onChange={(e) =>
                  setContent({ ...content, impact_families_served: parseInt(e.target.value) || 0 })
                }
                className="w-full text-sm border border-gray-300 rounded-lg p-2.5 font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Meals & Groceries Distributed</label>
              <input
                type="number"
                value={content.impact_meals_provided}
                onChange={(e) =>
                  setContent({ ...content, impact_meals_provided: parseInt(e.target.value) || 0 })
                }
                className="w-full text-sm border border-gray-300 rounded-lg p-2.5 font-bold"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t flex justify-end">
          <Button type="submit" disabled={saving} className="bg-[#258C4F] text-white font-bold flex items-center gap-1.5">
            <Save className="w-4 h-4" />
            {saving ? 'Saving Changes...' : 'Save & Publish Live'}
          </Button>
        </div>
      </form>
    </div>
  );
}
