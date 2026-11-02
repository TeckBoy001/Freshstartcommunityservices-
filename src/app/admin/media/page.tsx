import React from 'react';
import { getMedia } from '@/lib/db';
import { Image as ImageIcon, UploadCloud, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const revalidate = 0;

export default function AdminMediaPage() {
  const media = getMedia();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1E1E1E]">Approved Public Media Library</h2>
          <p className="text-xs text-gray-500">
            Approved photography, graphics, and asset references for articles, programs, and leadership profiles.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-start gap-3 text-blue-900 text-xs">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Brand Guidelines Asset Rule:</p>
          <p>
            All media assets must adhere to Fresh Start brand rules: never stretch, distort, or recolor logos. Stock
            photography must represent authentic community activities and never substitute for actual leadership members.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {media.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="h-44 bg-gray-100 overflow-hidden relative">
              <img src={item.url} alt={item.alt_text} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 space-y-1 text-xs">
              <p className="font-bold text-gray-800 truncate">{item.filename}</p>
              <p className="text-gray-500 text-[11px]">{item.caption || item.alt_text}</p>
              <div className="pt-2 flex justify-between text-[10px] text-gray-400 font-mono">
                <span>{(item.size_bytes / 1024).toFixed(0)} KB</span>
                <span>{item.mime_type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
