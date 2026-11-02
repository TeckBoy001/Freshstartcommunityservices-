import React from 'react';
import Link from 'next/link';
import { getCurrentSession } from '@/lib/auth';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  Calendar,
  HeartHandshake,
  DollarSign,
  MessageSquare,
  Sliders,
  LogOut,
  Shield,
  Home,
  Database,
  Image as ImageIcon,
} from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: Props) {
  const session = await getCurrentSession();

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Directors & Leadership', href: '/admin/leadership', icon: Users },
    { label: 'Programs (13)', href: '/admin/programs', icon: BookOpen },
    { label: 'News & Articles', href: '/admin/articles', icon: FileText },
    { label: 'Events', href: '/admin/events', icon: Calendar },
    { label: 'Campaigns', href: '/admin/campaigns', icon: HeartHandshake },
    { label: 'Donations & Donors', href: '/admin/donations', icon: DollarSign },
    { label: 'Inquiries & Leads', href: '/admin/inquiries', icon: MessageSquare },
    { label: 'Page Content & Hero', href: '/admin/pages', icon: Sliders },
    { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
    { label: 'Case Intake (Restricted)', href: '/admin/clients', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1E1E1E] text-white flex flex-col justify-between shrink-0 border-r border-gray-800">
        <div>
          {/* Brand & Portal Header */}
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#258C4F] flex items-center justify-center font-bold text-[#ADFF1C] text-sm">
                FS
              </div>
              <div>
                <p className="font-bold text-sm leading-tight text-white">Fresh Start</p>
                <p className="text-[10px] text-[#ADFF1C] uppercase font-bold tracking-wider">CMS Workspace</p>
              </div>
            </Link>
            <Link href="/" title="Open Public Site" className="text-gray-400 hover:text-white p-1">
              <Home className="w-4 h-4" />
            </Link>
          </div>

          {/* Session User Badge */}
          {session && (
            <div className="px-5 py-3.5 bg-white/5 border-b border-gray-800 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#258C4F] text-white flex items-center justify-center text-xs font-bold">
                {session.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{session.name}</p>
                <span className="text-[10px] px-1.5 py-0.2 bg-[#ADFF1C]/20 text-[#ADFF1C] rounded font-mono font-semibold uppercase">
                  {session.role.replace('_', ' ')}
                </span>
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#ADFF1C]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Logout */}
        <div className="p-4 border-t border-gray-800">
          <form action="/api/admin/auth" method="POST">
            <input type="hidden" name="action" value="logout" />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-950/40 hover:bg-red-900/60 text-red-200 rounded-xl text-xs font-bold transition-colors border border-red-900/40"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h1 className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#258C4F]" />
            Fresh Start Content Management System & Donor Database
          </h1>
          <div className="text-xs text-gray-400">
            Persistent Database Mode: <span className="font-semibold text-green-700">Active</span>
          </div>
        </header>

        <div className="p-6 md:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
