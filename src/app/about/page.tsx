import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Heart, Shield, Users, ArrowRight } from 'lucide-react';
import { getOrganization } from '@/lib/db';
import { Button } from '@/components/ui/Button';

export const revalidate = 0;

export const metadata = {
  title: "About Us",
  description:
    "Learn about Fresh Start Community Services — our mission, vision, values, and commitment to empowering individuals and strengthening communities.",
};

export default function AboutPage() {
  const org = getOrganization();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <section className="bg-[#0D472D] text-white py-20">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl text-center">
          <span className="text-xs font-bold text-[#ADFF1C] uppercase tracking-widest mb-2 block">
            About Fresh Start Community Services, Inc.
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Building Community, Restoring Dignity
          </h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto">
            Founded on the conviction that every person deserves an encouraging sanctuary, compassionate support,
            and real pathways to self-sufficiency.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Mission */}
            <div className="bg-gray-50 rounded-2xl p-8 md:p-10 border-2 border-[#258C4F]/30 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#258C4F] block mb-2">
                  Official Mission Statement
                </span>
                <h2 className="text-2xl font-bold text-[#1E1E1E] mb-4">Our Mission</h2>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed italic mb-6">
                  &ldquo;{org.mission}&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-gray-200 flex items-center gap-2 text-xs font-semibold text-[#258C4F]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Preserved verbatim from official organizational charter.
              </div>
            </div>

            {/* Vision */}
            <div className="bg-[#1E1E1E] text-white rounded-2xl p-8 md:p-10 border border-gray-800 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#ADFF1C] block mb-2">
                  Official Vision Statement
                </span>
                <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed italic mb-6">
                  &ldquo;{org.vision}&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-gray-800 flex items-center gap-2 text-xs font-semibold text-[#ADFF1C]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Enhancing cultural and community development for long-term integration.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#258C4F] mb-2">How We Serve</h2>
            <h3 className="text-3xl font-extrabold text-[#1E1E1E]">Our Foundational Values</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Love & Warmth',
                description:
                  'Every person is welcomed with deep respect, sincere interest in their passions, and personal affirmation.',
                icon: Heart,
              },
              {
                title: 'Compassion',
                description:
                  'Meeting individuals exactly where they are without shame, unrealistic prerequisites, or moralizing barriers.',
                icon: Users,
              },
              {
                title: 'Integrity',
                description:
                  'Complete transparency, ethical stewardship of community resources, and accountability in every initiative.',
                icon: Shield,
              },
              {
                title: 'Without Judgement',
                description:
                  'We recognize that hardship, transition, and systemic barriers happen to all walks of life. Dignity is unconditional.',
                icon: CheckCircle2,
              },
            ].map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-[#258C4F] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-[#1E1E1E]">{val.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Focus */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#258C4F] mb-2">
              Who We Serve
            </h2>
            <h3 className="text-3xl font-extrabold text-[#1E1E1E]">Our Community Focus</h3>
            <p className="text-gray-600 text-sm mt-3 max-w-xl mx-auto">
              Our holistic programs are designed specifically to support individuals across diverse life stages and community backgrounds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { label: 'Youth & Young Adults', note: 'Mentorship, leadership workshops, career readiness, and positive social avenues.' },
              { label: 'Women & Men in Transition', note: 'Self-confidence rebuilding, home environment stability, and workforce re-entry.' },
              { label: 'Senior Citizens', note: 'Combating elder isolation with food delivery, check-ins, and fellowship.' },
              { label: 'Disenfranchised Households', note: 'Nutritional food distribution, warm clothing, and emergency crisis relief.' },
              { label: 'Indigenous Communities', note: 'Culturally responsive partnership, collaborative advocacy, and shared resources.' },
              { label: 'Community Neighbors', note: 'Civic workshops, budgeting classes, and cultural networking gatherings.' },
            ].map((item, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-gray-200 bg-gray-50/50">
                <h4 className="font-bold text-sm text-[#1E1E1E] mb-1.5 text-[#258C4F]">{item.label}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link href="/leadership">
              <Button className="bg-[#258C4F] hover:bg-[#0D472D] text-white font-bold px-6 py-2.5">
                Meet Our Board & Leadership <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
