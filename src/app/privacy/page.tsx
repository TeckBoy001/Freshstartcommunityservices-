import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-3xl bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-sm space-y-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#258C4F] hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#258C4F]">Data Privacy & Security</span>
          <h1 className="text-3xl font-extrabold text-[#1E1E1E] mt-1">Privacy Policy</h1>
          <p className="text-xs text-gray-400 mt-1">Effective Date: January 1, 2026 | Last Updated: October 2026</p>
        </div>

        <div className="prose prose-sm text-gray-700 space-y-6 text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#1E1E1E]">1. Our Commitment to Your Privacy</h2>
            <p>
              Fresh Start Community Services, Incorporated (&ldquo;FSC&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is
              deeply dedicated to protecting the privacy, confidentiality, and dignity of our donors, clients,
              volunteers, and website visitors. We collect only the information necessary to fulfill our charitable
              mission and provide safe, supportive services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#1E1E1E]">2. Confidential Internal Client Records</h2>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 font-medium">
              <strong>Strict Confidentiality Boundary:</strong> Client and case-management records are internal operational
              data, never public website content. We do not publish client names, personal histories, intake notes, or
              sensitive health/support information without explicit written consent and valid lawful authorization.
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#1E1E1E]">3. Donor Privacy & Payment Processing</h2>
            <p>
              Donor Personally Identifiable Information (PII) including name, email, phone number, and mailing address is
              encrypted at rest and accessible strictly to authorized administrative roles for tax receipt generation,
              audit compliance, and donor stewardship.
            </p>
            <p>
              <strong>PCI Compliance:</strong> All card payments and electronic fund transfers are processed securely
              through PCI-DSS Level 1 compliant gateways (such as Stripe). Fresh Start Community Services never stores,
              logs, or possesses raw payment card numbers on our application servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#1E1E1E]">4. Information Sharing & Third Parties</h2>
            <p>
              We do not sell, rent, trade, or lease donor or client contact information to any commercial mailing list or
              external marketing agency. Information is shared only with certified service providers assisting with direct
              operational delivery (e.g. transactional email delivery, secure database hosting).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#1E1E1E]">5. Contact Us Regarding Your Data</h2>
            <p>
              If you wish to review, update, or request deletion of your donor record, please contact our Board Privacy
              Officer at <a href="mailto:privacy@freshstartcommunityservices.com" className="text-[#258C4F] underline">privacy@freshstartcommunityservices.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
