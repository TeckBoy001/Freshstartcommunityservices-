'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@freshstartcommunityservices.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push('/admin');
      } else {
        setError(data.error || 'Authentication failed. Please verify your credentials.');
      }
    } catch {
      setError('Network communication error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-200">
        <div className="text-center">
          <div className="w-14 h-14 bg-[#0D472D] text-[#ADFF1C] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Shield className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#258C4F]">
            Fresh Start Community Services
          </span>
          <h2 className="text-2xl font-extrabold text-[#1E1E1E] mt-1">Staff Administrative Portal</h2>
          <p className="text-xs text-gray-500 mt-2">
            Restricted access for authorized directors, program managers, and communications staff.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Staff Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-sm pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#258C4F]"
                placeholder="staff@freshstartcommunityservices.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-sm pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#258C4F]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#258C4F] hover:bg-[#0D472D] text-white font-bold py-3 text-sm rounded-xl flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : 'Sign In to CMS Dashboard'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* Demo credentials helper */}
        <div className="pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-2">
          <p className="font-semibold text-gray-700">Pre-Configured Staff Accounts:</p>
          <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200 space-y-1 font-mono text-[11px]">
            <div>
              <span className="text-[#258C4F] font-bold">Super Admin:</span> admin@freshstartcommunityservices.com / admin123
            </div>
            <div>
              <span className="text-blue-600 font-bold">Content Lead:</span> content@freshstartcommunityservices.com / fsc2026!
            </div>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-gray-500 hover:text-[#258C4F] font-medium">
            &larr; Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
