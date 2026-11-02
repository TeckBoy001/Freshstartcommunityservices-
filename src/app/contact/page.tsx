'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, CheckCircle2, Send, ShieldCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    type: 'general' as const,
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('There was a problem submitting your message. Please try again.');
      }
    } catch {
      alert('Unable to submit inquiry at this time.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-[#0D472D] text-white py-20">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl text-center">
          <span className="text-xs font-bold text-[#ADFF1C] uppercase tracking-widest mb-2 block">
            We Are Here For You
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Contact Fresh Start Community Services
          </h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto">
            Whether inquiring about our pantry hours, enrolling in career workshops, or offering community partnership,
            we look forward to connecting with you.
          </p>
        </div>
      </section>

      {/* Contact Content Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Left 1 Col: Verified Contact Information */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="font-bold text-lg text-[#1E1E1E]">General Inquiries</h3>
                <div className="space-y-4 text-xs text-gray-600">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#258C4F] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-800">Phone</p>
                      <a href="tel:5553737401" className="text-[#258C4F] hover:underline">
                        (555) 373-7401
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#258C4F] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-800">Email</p>
                      <a href="mailto:info@freshstartcommunityservices.com" className="text-[#258C4F] hover:underline">
                        info@freshstartcommunityservices.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#258C4F] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-800">Headquarters</p>
                      <p>Fresh Start Community Services, Incorporated</p>
                      <p className="text-[11px] text-gray-400">Services provided at regional outreach locations.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                  <Clock className="w-4 h-4 text-[#258C4F]" />
                  <span>Circle of Love Pantry Hours</span>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <p><strong>Tuesdays & Thursdays:</strong> 10:00 AM – 2:00 PM</p>
                  <p><strong>Saturdays:</strong> 9:00 AM – 1:00 PM</p>
                  <p className="text-[11px] text-gray-400 pt-1">No appointment necessary for food assistance.</p>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-2xl border border-green-200 text-xs text-[#0D472D] space-y-2">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#258C4F]" />
                  <span>Privacy Notice</span>
                </div>
                <p>
                  To protect personal privacy and prevent spam, individual staff phone numbers and emails are not published publicly.
                  All messages are routed immediately to the authorized coordinator.
                </p>
              </div>
            </div>

            {/* Right 2 Cols: Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200 shadow-sm">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-green-100 text-[#258C4F] rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1E1E1E]">Message Received!</h3>
                    <p className="text-gray-600 text-sm max-w-md mx-auto">
                      Thank you for contacting Fresh Start Community Services. A team member will respond to your message shortly.
                    </p>
                    <div className="pt-4">
                      <Button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: '', email: '', phone: '', subject: '', type: 'general', message: '' });
                        }}
                        variant="outline"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-[#1E1E1E] mb-1">Send Us a Message</h3>
                      <p className="text-xs text-gray-500">
                        Please provide your contact details and message below.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#258C4F]"
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#258C4F]"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number (Optional)</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#258C4F]"
                          placeholder="(555) 000-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Inquiry Subject *</label>
                        <input
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#258C4F]"
                          placeholder="How can we help you?"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Message Details *</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#258C4F]"
                        placeholder="Write your message here..."
                      />
                    </div>

                    <div className="flex items-start gap-2.5 text-xs text-gray-500">
                      <input type="checkbox" required id="consent" className="mt-1 rounded text-[#258C4F]" />
                      <label htmlFor="consent">
                        I agree to allow Fresh Start Community Services, Inc. to contact me regarding this inquiry.
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#258C4F] hover:bg-[#0D472D] text-white font-bold py-3 text-sm flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      {submitting ? 'Sending Message...' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
