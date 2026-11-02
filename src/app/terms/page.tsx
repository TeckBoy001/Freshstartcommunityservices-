import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-3xl bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-sm space-y-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#258C4F] hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>
        <h1 className="text-3xl font-extrabold text-[#1E1E1E]">Terms of Use</h1>
        <p className="text-xs text-gray-400">Effective Date: January 1, 2026</p>
        <div className="text-sm text-gray-700 space-y-4 leading-relaxed">
          <p>
            Welcome to the official website of Fresh Start Community Services, Incorporated. By accessing or using this
            website, you agree to comply with and be bound by these terms.
          </p>
          <h2 className="text-base font-bold text-[#1E1E1E]">1. Purpose of the Website</h2>
          <p>
            This website provides public information on our non-profit community services, workshops, volunteer pathways,
            and secure online donation opportunities.
          </p>
          <h2 className="text-base font-bold text-[#1E1E1E]">2. Intellectual Property</h2>
          <p>
            All original text, program curricula descriptions, organizational trademarks, and logos are the property of
            Fresh Start Community Services, Inc. Unauthorized reproduction, modification, or commercial exploitation is
            strictly prohibited.
          </p>
          <h2 className="text-base font-bold text-[#1E1E1E]">3. Charitable Contributions</h2>
          <p>
            Donations made through this website support designated charitable funds and general community programs in
            accordance with organizational bylaws.
          </p>
        </div>
      </div>
    </div>
  );
}
