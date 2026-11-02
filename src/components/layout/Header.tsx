'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart, Shield, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Leadership', href: '/leadership' },
    { name: 'Programs', href: '/programs' },
    { name: 'Impact', href: '/impact' },
    { name: 'News & Blog', href: '/news' },
    { name: 'Events', href: '/events' },
    { name: 'Get Involved', href: '/get-involved' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md">
      {/* Top micro bar for non-profit transparency */}
      <div className="bg-[#0D472D] text-white text-xs py-1.5 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <p className="font-medium tracking-wide flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#ADFF1C]"></span>
            Fresh Start Community Services, Inc. — Serving with Compassion & Without Judgement
          </p>
          <div className="hidden sm:flex items-center gap-4 text-gray-200">
            <Link href="/contact" className="hover:text-white transition-colors">
              (555) 373-7401
            </Link>
            <span>|</span>
            <Link href="/admin/login" className="flex items-center gap-1 hover:text-[#ADFF1C] transition-colors">
              <Shield className="w-3 h-3" /> Staff Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center bg-[#0D472D] text-white font-bold h-11 w-11 rounded-xl shadow-sm group-hover:bg-[#258C4F] transition-colors">
            <span className="text-[#ADFF1C] text-xl font-extrabold tracking-tighter">FS</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight text-[#1E1E1E] tracking-tight group-hover:text-[#258C4F] transition-colors">
              Fresh Start
            </span>
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              Community Services, Inc.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                isActive(link.href)
                  ? 'text-[#258C4F] bg-green-50'
                  : 'text-[#1E1E1E] hover:text-[#258C4F] hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/donate">
            <Button
              variant="primary"
              className="bg-[#258C4F] hover:bg-[#0D472D] text-white font-bold shadow-sm flex items-center gap-2 px-5 py-2.5 rounded-lg border-none"
            >
              <Heart className="w-4 h-4 fill-[#ADFF1C] text-[#ADFF1C]" />
              <span>Donate</span>
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 xl:hidden">
          <Link href="/donate" className="sm:hidden">
            <Button size="sm" className="bg-[#258C4F] text-white font-bold text-xs px-3">
              Donate
            </Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-700 hover:text-[#258C4F] focus:outline-none focus:ring-2 focus:ring-[#258C4F] rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-gray-200 bg-white px-4 pt-4 pb-6 shadow-lg animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-[#258C4F] bg-green-50 font-bold'
                    : 'text-gray-800 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
              <Link href="/donate" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-[#258C4F] hover:bg-[#0D472D] text-white font-bold py-3 flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4 fill-[#ADFF1C] text-[#ADFF1C]" />
                  <span>Donate to Fresh Start</span>
                </Button>
              </Link>
              <Link href="/admin/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full text-xs text-gray-500 py-2">
                  Staff Administrative Portal
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
