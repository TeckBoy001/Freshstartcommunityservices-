import React from 'react';
import { getInquiries, getVolunteers } from '@/lib/db';
import { MessageSquare, Users, Mail, Phone, Clock, CheckCircle } from 'lucide-react';

export const revalidate = 0;

export default function AdminInquiriesPage() {
  const inquiries = getInquiries();
  const volunteers = getVolunteers();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-[#1E1E1E]">Community Inquiries & Volunteer Intake</h2>
        <p className="text-xs text-gray-500">
          Review submissions from the Contact form and Get Involved volunteer applications.
        </p>
      </div>

      {/* Inquiries List */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#1E1E1E] flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#258C4F]" />
            Recent Inquiries ({inquiries.length})
          </h3>
        </div>

        <div className="divide-y divide-gray-100 text-xs">
          {inquiries.length === 0 ? (
            <p className="p-8 text-center text-gray-400">No community inquiries recorded yet.</p>
          ) : (
            inquiries.map((inq) => (
              <div key={inq.id} className="p-5 space-y-2 hover:bg-gray-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">{inq.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-green-50 text-[#258C4F]">
                      {inq.type}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-gray-100 text-gray-600">
                      {inq.status}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400 font-mono">
                    {new Date(inq.created_at).toLocaleString()}
                  </span>
                </div>

                <div className="text-gray-500 text-[11px] flex flex-wrap gap-4">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-[#258C4F]" /> {inq.email}
                  </span>
                  {inq.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#258C4F]" /> {inq.phone}
                    </span>
                  )}
                </div>

                <p className="text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100 leading-relaxed text-xs">
                  {inq.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Volunteer Applications */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#1E1E1E] flex items-center gap-2">
            <Users className="w-4 h-4 text-[#258C4F]" />
            Registered Volunteer Applications ({volunteers.length})
          </h3>
        </div>

        <div className="divide-y divide-gray-100 text-xs">
          {volunteers.map((vol) => (
            <div key={vol.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm text-gray-900">{vol.name}</p>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-700">
                    {vol.status}
                  </span>
                </div>
                <p className="text-gray-500 text-[11px] mt-0.5">{vol.email} • {vol.phone}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {vol.interests.map((int, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-gray-100 text-[10px] text-gray-600 font-medium">
                      {int}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-[#258C4F]">{vol.hours_logged} hrs logged</span>
                <p className="text-[10px] text-gray-400 mt-0.5">{vol.availability}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
