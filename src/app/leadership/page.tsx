import React from 'react';
import Link from 'next/link';
import { getLeadership } from '@/lib/db';
import { Shield, Mail, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const revalidate = 0;

export default function LeadershipPage() {
  const leaders = getLeadership(true);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <section className="bg-[#0D472D] text-white py-20">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl text-center">
          <span className="text-xs font-bold text-[#ADFF1C] uppercase tracking-widest mb-2 block">
            Fresh Start Community Services, Inc.
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Our Leadership & Board of Directors
          </h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto">
            Experienced, compassionate leaders dedicated to servant leadership, ethical governance,
            and wholehearted community development.
          </p>
        </div>
      </section>

      {/* Leadership Directory Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
          <div className="space-y-12">
            {leaders.map((leader) => (
              <div
                key={leader.id}
                className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200 shadow-sm flex flex-col md:flex-row gap-8 items-start"
              >
                {/* Photo */}
                <div className="shrink-0 w-full md:w-56 flex flex-col items-center">
                  <div className="w-44 h-44 rounded-2xl overflow-hidden border-4 border-green-50 shadow-md mb-4 bg-gray-100">
                    <img
                      src={leader.image_url}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="inline-block px-3 py-1 bg-green-50 text-[#258C4F] text-xs font-bold rounded-full uppercase tracking-wider">
                    {leader.role_type}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#1E1E1E] leading-snug">{leader.name}</h3>
                    <p className="text-sm font-bold text-[#258C4F] uppercase tracking-wide mt-0.5">
                      {leader.title}
                    </p>
                    {leader.credentials && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mt-1">
                        <Award className="w-3.5 h-3.5 text-[#258C4F]" />
                        <span>{leader.credentials}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs font-semibold text-gray-700 italic">
                      &ldquo;{leader.bio_short}&rdquo;
                    </p>
                  </div>

                  <div className="prose prose-sm text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                    {leader.bio_full}
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-[#258C4F]" /> Verified FSC Leadership Member
                    </span>
                    <Link href="/contact" className="text-[#258C4F] font-bold hover:underline">
                      Direct Inquiries via Contact Form &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Admin Management Notice */}
          <div className="mt-16 p-6 rounded-2xl bg-white border border-gray-200 text-center max-w-xl mx-auto shadow-sm">
            <Shield className="w-6 h-6 text-[#258C4F] mx-auto mb-2" />
            <h4 className="text-sm font-bold text-[#1E1E1E]">Leadership & Board Management</h4>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              Authorized staff can add directors, update biographies, replace photographs, and reorder profiles via the CMS.
            </p>
            <Link href="/admin/leadership">
              <Button variant="outline" size="sm" className="text-xs font-bold text-[#258C4F] border-[#258C4F]">
                Access Leadership CMS Module
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
