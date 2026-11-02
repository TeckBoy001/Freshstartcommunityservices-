'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1E1E1E] text-white pt-16 pb-12 border-t-4 border-[#258C4F]">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Organization Intro & Mission Summary */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center bg-[#258C4F] text-white font-bold h-10 w-10 rounded-xl">
                <span className="text-[#ADFF1C] text-lg font-black">FS</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-white leading-tight">Fresh Start</h3>
                <p className="text-xs text-[#ADFF1C] font-semibold tracking-wider uppercase">
                  Community Services, Inc.
                </p>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              Fresh Start Community Services, Incorporated is dedicated to making a tangible difference in the lives of
              youth, young adults, women, men, seniors, and disenfranchised community members through vital food access,
              career workshops, and compassionate fellowship.
            </p>

            <div className="bg-[#2a2a2a] p-4 rounded-xl border border-gray-800">
              <p className="text-xs text-gray-400 font-medium italic">
                &ldquo;Accomplishing community empowerment with love, compassion, integrity, and without
                judgement.&rdquo;
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <label htmlFor="footer-email" className="block text-xs font-semibold text-gray-300 mb-2">
                Stay updated with our community newsletters
              </label>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for subscribing to Fresh Start updates!');
                }}
                className="flex max-w-sm gap-2"
              >
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="bg-[#2D2D2D] border border-gray-700 text-sm text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#ADFF1C] w-full placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  className="bg-[#258C4F] hover:bg-[#1f7340] text-white px-3 py-2 rounded-lg text-xs font-bold transition-colors shrink-0 flex items-center gap-1"
                >
                  Join <ArrowRight className="w-3 h-3" />
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-2">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-[#ADFF1C] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#ADFF1C] transition-colors">
                  About Us & History
                </Link>
              </li>
              <li>
                <Link href="/leadership" className="hover:text-[#ADFF1C] transition-colors">
                  Our Leadership & Board
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-[#ADFF1C] transition-colors">
                  All 13 Community Programs
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-[#ADFF1C] transition-colors">
                  Impact & Transparency
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-[#ADFF1C] transition-colors">
                  News & Blog Stories
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#ADFF1C] transition-colors">
                  Upcoming Community Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Key Programs */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-2">
              Featured Programs
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/programs/circle-of-love-pantry" className="hover:text-[#ADFF1C] transition-colors">
                  Circle of Love Food Pantry
                </Link>
              </li>
              <li>
                <Link href="/programs/getting-ready-for-success" className="hover:text-[#ADFF1C] transition-colors">
                  Getting Ready for Success!
                </Link>
              </li>
              <li>
                <Link href="/programs/self-awareness-workshops" className="hover:text-[#ADFF1C] transition-colors">
                  Beginning the Journey
                </Link>
              </li>
              <li>
                <Link href="/programs/senior-citizen-program" className="hover:text-[#ADFF1C] transition-colors">
                  Senior Citizen Support
                </Link>
              </li>
              <li>
                <Link href="/programs/disenfranchised-indigenous-care" className="hover:text-[#ADFF1C] transition-colors">
                  Indigenous Care Initiative
                </Link>
              </li>
              <li>
                <Link href="/programs/case-management-job-training" className="hover:text-[#ADFF1C] transition-colors">
                  Case Management & Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Engagement */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-2">
              Connect With Us
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#ADFF1C] shrink-0 mt-0.5" />
                <span>Headquarters & Regional Community Outreach Centers</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#ADFF1C] shrink-0" />
                <a href="tel:5553737401" className="hover:text-white transition-colors">
                  (555) 373-7401
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#ADFF1C] shrink-0" />
                <a href="mailto:info@freshstartcommunityservices.com" className="hover:text-white transition-colors">
                  info@freshstartcommunityservices.com
                </a>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/donate">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#258C4F] hover:bg-[#1f7340] text-white text-xs font-bold rounded-lg transition-colors">
                  <Heart className="w-3.5 h-3.5 fill-[#ADFF1C] text-[#ADFF1C]" />
                  Support Our Mission
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Meta Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            &copy; 2026 Fresh Start Community Services, Incorporated. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <span>•</span>
            <Link href="/accessibility" className="hover:text-white transition-colors">
              Accessibility (WCAG 2.1 AA)
            </Link>
            <span>•</span>
            <Link href="/admin/login" className="flex items-center gap-1 hover:text-[#ADFF1C] transition-colors">
              <ShieldCheck className="w-3 h-3" /> Staff CMS Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
