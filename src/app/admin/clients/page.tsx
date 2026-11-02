import React from 'react';
import { getClients, getPrograms } from '@/lib/db';
import { ShieldAlert, Lock, UserCheck, AlertTriangle } from 'lucide-react';

export const revalidate = 0;

export default function AdminClientsPage() {
  const clients = getClients();
  const programs = getPrograms();

  const getProgramTitle = (id: string) => {
    return programs.find((p) => p.id === id)?.title || id;
  };

  return (
    <div className="space-y-6">
      {/* Security Warning Banner */}
      <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl flex items-start gap-3 text-amber-900 text-xs">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-sm">Confidential Internal Case Management Records</p>
          <p className="mt-0.5">
            This module contains restricted client and case-worker operational data. In compliance with strict HIPAA,
            state non-profit governance, and privacy guidelines, these records are never accessible via public APIs or
            website pages. Client identities are protected via anonymized client identification codes.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#1E1E1E]">Active Case Management Ledger</h2>
          <p className="text-xs text-gray-500">
            Intake tracking, caseworker assignments, and restricted transitional notes.
          </p>
        </div>
      </div>

      {/* Client Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Client ID Code</th>
                <th className="py-3 px-4">Enrolled Program</th>
                <th className="py-3 px-4">Intake Date</th>
                <th className="py-3 px-4">Case Worker</th>
                <th className="py-3 px-4">Restricted Operational Notes</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clients.map((cli) => (
                <tr key={cli.id} className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-mono font-bold text-[#258C4F]">{cli.client_code}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">{getProgramTitle(cli.program_id)}</td>
                  <td className="py-3 px-4 text-gray-500">{cli.intake_date}</td>
                  <td className="py-3 px-4 text-gray-700 font-semibold">{cli.case_worker}</td>
                  <td className="py-3 px-4 text-gray-600 max-w-xs">{cli.restricted_notes}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-green-50 text-green-700">
                      {cli.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
