import React from 'react';
import Link from 'next/link';
import {
  getImpactMetrics,
  getDatabase,
  getDonations,
  getInquiries,
  getArticles,
  getPrograms,
} from '@/lib/db';
import {
  DollarSign,
  Users,
  BookOpen,
  FileText,
  Calendar,
  HeartHandshake,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
} from 'lucide-react';

export const revalidate = 0;

export default function AdminDashboardPage() {
  const db = getDatabase();
  const metrics = getImpactMetrics();
  const recentDonations = getDonations().slice(0, 5);
  const recentInquiries = getInquiries().slice(0, 5);
  const publishedArticles = db.articles.filter((a) => a.status === 'published');
  const draftArticles = db.articles.filter((a) => a.status === 'draft');

  return (
    <div className="space-y-8">
      {/* Welcome Title */}
      <div>
        <h2 className="text-2xl font-bold text-[#1E1E1E]">Executive Dashboard & System Metrics</h2>
        <p className="text-xs text-gray-500 mt-1">
          Real-time summary calculated directly from persistent database records.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>Total Raised</span>
            <DollarSign className="w-4 h-4 text-[#258C4F]" />
          </div>
          <p className="text-3xl font-black text-[#1E1E1E]">${metrics.totalRaised.toLocaleString()}</p>
          <p className="text-[11px] text-green-700 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> {metrics.donationsCount} confirmed donations
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>Active Programs</span>
            <BookOpen className="w-4 h-4 text-[#258C4F]" />
          </div>
          <p className="text-3xl font-black text-[#1E1E1E]">{metrics.activePrograms}</p>
          <p className="text-[11px] text-gray-500 font-medium">13 total programs defined</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>Active Campaigns</span>
            <HeartHandshake className="w-4 h-4 text-[#258C4F]" />
          </div>
          <p className="text-3xl font-black text-[#1E1E1E]">{metrics.activeCampaigns}</p>
          <p className="text-[11px] text-gray-500 font-medium">Fundraising progress tracked</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>Articles Published</span>
            <FileText className="w-4 h-4 text-[#258C4F]" />
          </div>
          <p className="text-3xl font-black text-[#1E1E1E]">{publishedArticles.length}</p>
          <p className="text-[11px] text-amber-600 font-medium">{draftArticles.length} unpublished drafts</p>
        </div>
      </div>

      {/* Two Column Layout: Recent Donations & Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Donations */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#1E1E1E] flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#258C4F]" />
              Recent Donor Contributions
            </h3>
            <Link href="/admin/donations" className="text-xs font-bold text-[#258C4F] hover:underline flex items-center gap-1">
              View All &rarr;
            </Link>
          </div>

          <div className="divide-y divide-gray-100 text-xs">
            {recentDonations.map((d) => (
              <div key={d.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-800">{d.donor_name}</p>
                  <p className="text-gray-400 text-[11px]">{d.campaign_name || 'General Fund'} • {d.payment_method}</p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-[#258C4F] text-sm">${d.amount.toFixed(2)}</p>
                  <span className="text-[10px] px-1.5 py-0.5 bg-green-50 text-green-700 rounded font-semibold uppercase">
                    {d.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link href="/admin/donations" className="block">
              <button className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-xl border border-gray-200 transition-colors">
                Log Offline Donation (Cash / Check)
              </button>
            </Link>
          </div>
        </div>

        {/* Recent Community Inquiries */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#1E1E1E] flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#258C4F]" />
              Recent Community Inquiries
            </h3>
            <Link href="/admin/inquiries" className="text-xs font-bold text-[#258C4F] hover:underline flex items-center gap-1">
              Manage Leads &rarr;
            </Link>
          </div>

          <div className="divide-y divide-gray-100 text-xs">
            {recentInquiries.length === 0 ? (
              <p className="py-6 text-center text-gray-400">No new inquiries at this moment.</p>
            ) : (
              recentInquiries.map((inq) => (
                <div key={inq.id} className="py-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-800">{inq.name}</span>
                    <span className="text-[10px] uppercase font-bold text-[#258C4F] bg-green-50 px-2 py-0.5 rounded">
                      {inq.type}
                    </span>
                  </div>
                  <p className="text-gray-500 text-[11px] truncate">{inq.message}</p>
                  <p className="text-[10px] text-gray-400">{inq.email} • {new Date(inq.created_at).toLocaleDateString()}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Access Modules Navigation Grid */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h3 className="font-bold text-base text-[#1E1E1E] mb-4">Quick Content Management Shortcuts</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold">
          <Link
            href="/admin/leadership"
            className="p-4 bg-gray-50 rounded-xl hover:bg-green-50 hover:text-[#258C4F] transition-colors border border-gray-200 flex flex-col items-center text-center gap-2"
          >
            <Users className="w-5 h-5 text-[#258C4F]" />
            <span>Manage Directors & Biographies</span>
          </Link>
          <Link
            href="/admin/programs"
            className="p-4 bg-gray-50 rounded-xl hover:bg-green-50 hover:text-[#258C4F] transition-colors border border-gray-200 flex flex-col items-center text-center gap-2"
          >
            <BookOpen className="w-5 h-5 text-[#258C4F]" />
            <span>Update Program Descriptions</span>
          </Link>
          <Link
            href="/admin/articles"
            className="p-4 bg-gray-50 rounded-xl hover:bg-green-50 hover:text-[#258C4F] transition-colors border border-gray-200 flex flex-col items-center text-center gap-2"
          >
            <FileText className="w-5 h-5 text-[#258C4F]" />
            <span>Publish News & Articles</span>
          </Link>
          <Link
            href="/admin/donations"
            className="p-4 bg-gray-50 rounded-xl hover:bg-green-50 hover:text-[#258C4F] transition-colors border border-gray-200 flex flex-col items-center text-center gap-2"
          >
            <DollarSign className="w-5 h-5 text-[#258C4F]" />
            <span>Export CSV & Donor Database</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
