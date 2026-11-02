import React from 'react';
import Link from 'next/link';
import { getImpactMetrics, getCampaigns, getPrograms } from '@/lib/db';
import { Users, Utensils, Award, Heart, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const revalidate = 0;

export default function ImpactPage() {
  const metrics = getImpactMetrics();
  const campaigns = getCampaigns(true);
  const programs = getPrograms(true);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-[#0D472D] text-white py-20">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl text-center">
          <span className="text-xs font-bold text-[#ADFF1C] uppercase tracking-widest mb-2 block">
            Stewardship & Accountability
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Our Community Impact & Transparency
          </h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto">
            We believe that lasting trust is built through transparent action. See how our community contributions,
            volunteers, and partners make a verified difference every single day.
          </p>
        </div>
      </section>

      {/* Live Verified Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#258C4F]">Verified Database Records</span>
            <h2 className="text-3xl font-extrabold text-[#1E1E1E] mt-1">Live Program & Resource Metrics</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-center space-y-2">
              <Users className="w-8 h-8 text-[#258C4F] mx-auto" />
              <p className="text-4xl font-black text-[#1E1E1E]">{metrics.familiesServed.toLocaleString()}+</p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Individuals & Families Served</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-center space-y-2">
              <Utensils className="w-8 h-8 text-[#258C4F] mx-auto" />
              <p className="text-4xl font-black text-[#1E1E1E]">{metrics.mealsProvided.toLocaleString()}+</p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Meals & Pantry Bags Distributed</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-center space-y-2">
              <Award className="w-8 h-8 text-[#258C4F] mx-auto" />
              <p className="text-4xl font-black text-[#1E1E1E]">{metrics.activePrograms}</p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Community Programs</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-center space-y-2">
              <Heart className="w-8 h-8 text-[#258C4F] mx-auto" />
              <p className="text-4xl font-black text-[#1E1E1E]">${metrics.totalRaised.toLocaleString()}</p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Verified Contributions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stewardship Breakdown */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl space-y-12">
          <div className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#258C4F] mb-2">Nonprofit Integrity</h2>
            <h3 className="text-3xl font-extrabold text-[#1E1E1E]">How Every Dollar is Stewarded</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-[#258C4F] flex items-center justify-center font-bold">
                85%
              </div>
              <h4 className="font-bold text-base text-[#1E1E1E]">Direct Program Services</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Bulk food purchasing for the Circle of Love pantry, workshop training materials, and emergency family assistance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-[#258C4F] flex items-center justify-center font-bold">
                10%
              </div>
              <h4 className="font-bold text-base text-[#1E1E1E]">Community Facilities & Logistics</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Pantry refrigeration, refrigerated transport vans for fresh produce pick-ups, and safe classroom spaces.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-[#258C4F] flex items-center justify-center font-bold">
                5%
              </div>
              <h4 className="font-bold text-base text-[#1E1E1E]">Administration & Audits</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Donor database management, annual tax compliance, state filings, and independent financial verification.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-[#258C4F] shrink-0 mt-1" />
            <div className="text-xs text-gray-600 space-y-1">
              <p className="font-bold text-gray-800 text-sm">Our Transparency Policy</p>
              <p>
                Fresh Start Community Services maintains strict segregation of donor records, audit logs, and independent review.
                Financial reports and annual filings are available upon written request to our Board of Directors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="container mx-auto px-4 max-w-2xl space-y-4">
          <h3 className="text-2xl font-bold text-[#1E1E1E]">Help Us Deepen Our Community Reach</h3>
          <p className="text-sm text-gray-600">
            Join hands with Fresh Start Community Services today through monthly giving, volunteer service, or corporate sponsorship.
          </p>
          <div className="pt-2">
            <Link href="/donate">
              <Button className="bg-[#258C4F] hover:bg-[#0D472D] text-white font-bold px-8 py-3">
                Donate to FSC Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
