import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Heart,
  ArrowRight,
  Users,
  Utensils,
  BookOpen,
  Calendar,
  CheckCircle2,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import {
  getPrograms,
  getCampaigns,
  getLeadership,
  getArticles,
  getImpactMetrics,
  getPageContent,
  getOrganization,
} from '@/lib/db';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const revalidate = 0; // Dynamic on every request to reflect CMS changes

export default function HomePage() {
  const org = getOrganization();
  const page = getPageContent();
  const metrics = getImpactMetrics();
  const featuredPrograms = getPrograms(true).slice(0, 6);
  const activeCampaigns = getCampaigns(true).slice(0, 3);
  const leadershipPreview = getLeadership(true).slice(0, 3);
  const recentArticles = getArticles(true).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0D472D] text-white overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 opacity-15 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1920&q=80"
            alt="Community service gathering"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 lg:px-6 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ADFF1C] text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4" /> Fresh Start Community Services, Inc.
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            {page.hero_headline}
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            {page.hero_subheadline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/donate" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#ADFF1C] hover:bg-[#9de812] text-[#1E1E1E] font-extrabold px-8 py-3.5 shadow-lg border-none flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5 fill-[#1E1E1E]" />
                {page.hero_cta_primary}
              </Button>
            </Link>
            <Link href="/programs" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-[#0D472D] font-bold px-8 py-3.5 flex items-center justify-center gap-2"
              >
                {page.hero_cta_secondary}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/get-involved" className="w-full sm:w-auto">
              <Button
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto text-gray-200 hover:text-white hover:bg-white/10 font-bold px-6 py-3.5"
              >
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION SECTION */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#258C4F]">
              Welcome to Fresh Start Community Services
            </h2>
            <h3 className="text-3xl font-extrabold text-[#1E1E1E] tracking-tight">
              A Safe, Uplifting Sanctuary Dedicated to Real Life Transformation
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              At Fresh Start Community Services, Incorporated (FSC), we walk alongside community members at every step.
              Whether connecting a family with essential nutrition, mentoring a young adult toward their first professional career,
              or offering fellowship to our treasured elders, our mission is driven by love, integrity, and absolute freedom from stigma.
            </p>
          </div>
        </div>
      </section>

      {/* 3. OFFICIAL MISSION & VISION STATEMENTS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#258C4F] mb-2">
              Our Guiding Principles
            </h2>
            <h3 className="text-3xl font-extrabold text-[#1E1E1E]">Authoritative Purpose & Vision</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission Card */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border-2 border-[#258C4F]/20 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#258C4F]/5 rounded-bl-full pointer-events-none" />
              <div>
                <div className="inline-block px-3 py-1 bg-green-100 text-[#258C4F] text-xs font-bold rounded-md mb-4 uppercase tracking-wider">
                  Official Mission Statement
                </div>
                <h4 className="text-2xl font-bold text-[#1E1E1E] mb-4">Our Purpose</h4>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base italic">
                  &ldquo;{org.mission}&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-[#258C4F]">
                <CheckCircle2 className="w-4 h-4 text-[#258C4F]" />
                Accomplished with love, compassion, integrity, and without judgement.
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-[#1E1E1E] p-8 md:p-10 rounded-2xl border border-gray-800 shadow-sm relative overflow-hidden text-white flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#ADFF1C]/10 rounded-bl-full pointer-events-none" />
              <div>
                <div className="inline-block px-3 py-1 bg-white/10 text-[#ADFF1C] text-xs font-bold rounded-md mb-4 uppercase tracking-wider">
                  Official Vision Statement
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Our Vision</h4>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base italic">
                  &ldquo;{org.vision}&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-800 flex items-center gap-2 text-xs font-semibold text-[#ADFF1C]">
                <TrendingUp className="w-4 h-4 text-[#ADFF1C]" />
                Building cultural bridges and lasting community integration.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VERIFIED COMMUNITY IMPACT METRICS */}
      <section className="py-16 bg-[#0D472D] text-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-4 md:pt-0">
              <div className="flex items-center justify-center text-[#ADFF1C] mb-2">
                <Users className="w-7 h-7" />
              </div>
              <p className="text-4xl lg:text-5xl font-black">{metrics.familiesServed.toLocaleString()}+</p>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-300 mt-1">Families Served</p>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="flex items-center justify-center text-[#ADFF1C] mb-2">
                <Utensils className="w-7 h-7" />
              </div>
              <p className="text-4xl lg:text-5xl font-black">{metrics.mealsProvided.toLocaleString()}+</p>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-300 mt-1">Meals & Groceries Distributed</p>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="flex items-center justify-center text-[#ADFF1C] mb-2">
                <BookOpen className="w-7 h-7" />
              </div>
              <p className="text-4xl lg:text-5xl font-black">{metrics.activePrograms}</p>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-300 mt-1">Official Community Programs</p>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="flex items-center justify-center text-[#ADFF1C] mb-2">
                <Heart className="w-7 h-7" />
              </div>
              <p className="text-4xl lg:text-5xl font-black">${metrics.totalRaised.toLocaleString()}</p>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-300 mt-1">Verified Community Contributions</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROGRAMS HIGHLIGHT */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#258C4F] mb-2">What We Do</h2>
              <h3 className="text-3xl font-extrabold text-[#1E1E1E]">Our Community Programs</h3>
            </div>
            <Link href="/programs" className="mt-4 md:mt-0 text-sm font-bold text-[#258C4F] hover:underline flex items-center gap-1">
              Explore all 13 Programs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPrograms.map((program) => (
              <Card key={program.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="relative h-48 w-full bg-gray-100">
                  <img
                    src={program.image_url}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#0D472D]/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                    {program.category}
                  </div>
                </div>
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-xl font-bold text-[#1E1E1E] leading-snug hover:text-[#258C4F] transition-colors">
                    <Link href={`/programs/${program.slug}`}>{program.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-2 flex-1 flex flex-col justify-between">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {program.description_short}
                  </p>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">
                      Target: {program.target_population.split(',')[0]}
                    </span>
                    <Link
                      href={`/programs/${program.slug}`}
                      className="text-xs font-bold text-[#258C4F] hover:text-[#0D472D] flex items-center gap-1"
                    >
                      Learn More <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CURRENT FUNDRAISING CAMPAIGNS */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#258C4F] mb-2">Direct Support</h2>
            <h3 className="text-3xl font-extrabold text-[#1E1E1E]">Active Community Campaigns</h3>
            <p className="text-gray-600 text-sm mt-2">
              Every dollar contributed goes directly toward verified community supplies, workshops, and family meals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {activeCampaigns.map((camp) => {
              const pct = Math.min(Math.round((camp.amount_raised / camp.target_goal) * 100), 100);
              return (
                <div key={camp.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#258C4F] mb-1">
                      Campaign
                    </div>
                    <h4 className="text-lg font-bold text-[#1E1E1E] leading-snug mb-3">{camp.name}</h4>
                    <p className="text-gray-600 text-xs leading-relaxed mb-6">{camp.description}</p>
                  </div>

                  <div>
                    <div className="space-y-1.5 mb-5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-[#258C4F]">${camp.amount_raised.toLocaleString()} raised</span>
                        <span className="text-gray-500">Goal: ${camp.target_goal.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-[#258C4F] h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className="text-right text-[10px] text-gray-400 font-semibold">{pct}% of goal reached</p>
                    </div>

                    <Link href={`/donate?campaign=${camp.id}`}>
                      <Button className="w-full bg-[#258C4F] hover:bg-[#0D472D] text-white font-bold text-xs py-2.5 rounded-lg flex items-center justify-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 fill-[#ADFF1C] text-[#ADFF1C]" />
                        Support This Campaign
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. LEADERSHIP PREVIEW */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#258C4F] mb-2">Our People</h2>
              <h3 className="text-3xl font-extrabold text-[#1E1E1E]">Leadership & Board Preview</h3>
            </div>
            <Link href="/leadership" className="mt-4 md:mt-0 text-sm font-bold text-[#258C4F] hover:underline flex items-center gap-1">
              View All Directors & Biographies <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipPreview.map((leader) => (
              <div key={leader.id} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 p-6 flex flex-col items-center text-center">
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
                  <img
                    src={leader.image_url}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-bold text-[#1E1E1E]">{leader.name}</h4>
                <p className="text-xs font-semibold text-[#258C4F] uppercase tracking-wider mb-1">{leader.title}</p>
                {leader.credentials && (
                  <span className="text-[11px] text-gray-500 font-medium mb-3">{leader.credentials}</span>
                )}
                <p className="text-gray-600 text-xs leading-relaxed mt-2">{leader.bio_short}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. LATEST NEWS & UPDATES */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#258C4F] mb-2">Announcements</h2>
              <h3 className="text-3xl font-extrabold text-[#1E1E1E]">News & Community Stories</h3>
            </div>
            <Link href="/news" className="mt-4 md:mt-0 text-sm font-bold text-[#258C4F] hover:underline flex items-center gap-1">
              Read all articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentArticles.map((art) => (
              <div key={art.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex flex-col justify-between">
                <div className="h-44 w-full relative bg-gray-100">
                  <img
                    src={art.featured_image}
                    alt={art.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#258C4F] text-white text-[11px] font-bold px-2 py-0.5 rounded">
                    {art.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-2">
                      {art.published_at ? new Date(art.published_at).toLocaleDateString() : 'Recent'}
                    </p>
                    <h4 className="text-lg font-bold text-[#1E1E1E] leading-snug mb-3 hover:text-[#258C4F] transition-colors">
                      <Link href={`/news/${art.slug}`}>{art.title}</Link>
                    </h4>
                    <p className="text-gray-600 text-xs leading-relaxed">{art.excerpt}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <Link
                      href={`/news/${art.slug}`}
                      className="text-xs font-bold text-[#258C4F] hover:underline flex items-center gap-1"
                    >
                      Read full story <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. GET INVOLVED TEASER */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="bg-[#258C4F] text-white rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ADFF1C]">
                Get Involved With Fresh Start
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-4 leading-tight">
                Together, We Can Uplift Every Neighbor in Need
              </h3>
              <p className="text-gray-100 text-sm md:text-base leading-relaxed mb-8">
                Whether lending your hands at the Circle of Love pantry, mentoring a career readiness workshop attendee,
                or bringing corporate partnership support, your presence matters.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/get-involved">
                  <Button className="bg-[#ADFF1C] text-[#1E1E1E] hover:bg-[#9de812] font-bold px-6 py-3 rounded-lg border-none">
                    Volunteer With Us
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#258C4F] font-bold px-6 py-3 rounded-lg">
                    Inquire as Community Partner
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CALL TO ACTION */}
      <section className="py-16 bg-gray-50 border-t border-gray-200 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E1E1E] mb-4">
            Help Make Fresh Starts Possible
          </h3>
          <p className="text-gray-600 text-sm sm:text-base mb-8 leading-relaxed">
            Every contribution directly provides essential food, vocational training, and supportive care for individuals in our community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/donate">
              <Button size="lg" className="w-full sm:w-auto bg-[#258C4F] hover:bg-[#0D472D] text-white font-bold px-8">
                Make a Charitable Donation
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-100 font-bold px-8">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
