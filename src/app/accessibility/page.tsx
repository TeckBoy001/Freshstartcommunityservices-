import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-3xl bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-sm space-y-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#258C4F] hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>
        <h1 className="text-3xl font-extrabold text-[#1E1E1E]">Accessibility Statement</h1>
        <p className="text-xs text-gray-400">Target Standard: Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</p>
        <div className="text-sm text-gray-700 space-y-4 leading-relaxed">
          <p>
            Fresh Start Community Services, Incorporated is committed to ensuring digital accessibility for people with
            disabilities. We continually improve the user experience for everyone and apply relevant accessibility
            standards across all digital properties.
          </p>
          <h2 className="text-base font-bold text-[#1E1E1E]">Measures Taken to Support Accessibility</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Semantic HTML elements for logical screen reader navigation.</li>
            <li>High-contrast text ratios conforming to WCAG AA guidelines.</li>
            <li>Keyboard-navigable controls, menus, and forms with visible focus indicators.</li>
            <li>Descriptive alternative text for meaningful imagery and infographics.</li>
            <li>ARIA labels and roles for dynamic dialogs, menus, and alert states.</li>
          </ul>
          <h2 className="text-base font-bold text-[#1E1E1E]">Feedback & Assistance</h2>
          <p>
            If you experience difficulty accessing any content on this website, please contact us at{' '}
            <a href="mailto:accessibility@freshstartcommunityservices.com" className="text-[#258C4F] underline">
              accessibility@freshstartcommunityservices.com
            </a>{' '}
            or call (555) 373-7401. We will work with you to provide the requested information in an accessible format.
          </p>
        </div>
      </div>
    </div>
  );
}
