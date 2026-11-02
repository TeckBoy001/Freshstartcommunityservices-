'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Users, Handshake, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function GetInvolvedPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'volunteer' as 'volunteer' | 'partnership' | 'program_referral',
    message: '',
    interests: [] as string[],
    availability: '',
  });

  const availableInterests = [
    'Circle of Love Food Pantry (Food packing & sorting)',
    'Senior Wellness Check-ins & Food Delivery',
    'Career & Resume Mentoring (Getting Ready for Success)',
    'Youth & Young Adult Mentoring',
    'Clothing Drive & Wardrobe Organization',
    'Event Setup & Community Outreach',
  ];

  const handleInterestToggle = (interest: string) => {
    if (formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter((i) => i !== interest),
      });
    } else {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          type: formData.type,
          message: `${formData.message} | Interests: ${formData.interests.join(', ')} | Availability: ${formData.availability}`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('There was an issue submitting your request. Please try again.');
      }
    } catch (err) {
      alert('Unable to submit inquiry at this moment.');
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
            Join the Movement
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Get Involved With Fresh Start
          </h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto">
            Discover meaningful ways to share your time, skills, or organization resources to lift up youth, seniors, and
            families in our neighborhood.
          </p>
        </div>
      </section>

      {/* Pathways Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-[#258C4F] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1E1E1E]">Volunteer With Us</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Join our Saturday pantry packing crews, tutor youth, or assist seniors with tech literacy.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-[#258C4F] flex items-center justify-center">
                <Handshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1E1E1E]">Community Partnerships</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Businesses, churches, and civic foundations can partner for food drives, grant funding, and employee giving.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-[#258C4F] flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1E1E1E]">Refer an Individual</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Know a family or young adult who could benefit from our free career workshops or pantry? Connect them today.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm max-w-3xl mx-auto">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-[#258C4F] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#1E1E1E]">Thank You for Reaching Out!</h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto">
                  Your inquiry has been logged in our community engagement system. A Fresh Start coordinator will follow up
                  with you shortly.
                </p>
                <div className="pt-4">
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        type: 'volunteer',
                        message: '',
                        interests: [],
                        availability: '',
                      });
                    }}
                    variant="outline"
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#1E1E1E] mb-1">Get Involved Application & Inquiry</h3>
                  <p className="text-xs text-gray-500">
                    Fill out this form and our team will connect with you directly.
                  </p>
                </div>

                {/* Inquiry Type Radio */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    I would like to:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'volunteer', label: 'Volunteer Time' },
                      { id: 'partnership', label: 'Become a Partner' },
                      { id: 'program_referral', label: 'Refer Someone' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, type: opt.id as any })}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold border text-center transition-colors ${
                          formData.type === opt.id
                            ? 'bg-[#258C4F] text-white border-[#258C4F]'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personal Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#258C4F]"
                      placeholder="Your name"
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
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

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

                {/* Volunteer specific questions */}
                {formData.type === 'volunteer' && (
                  <div className="space-y-4 pt-2 border-t border-gray-100">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Areas of Interest (Select all that apply):
                    </label>
                    <div className="space-y-2">
                      {availableInterests.map((interest, idx) => (
                        <label
                          key={idx}
                          className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer select-none"
                        >
                          <input
                            type="checkbox"
                            checked={formData.interests.includes(interest)}
                            onChange={() => handleInterestToggle(interest)}
                            className="rounded text-[#258C4F] focus:ring-[#258C4F] w-4 h-4"
                          />
                          <span>{interest}</span>
                        </label>
                      ))}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        General Availability (e.g., Saturday mornings, Weekdays after 5pm)
                      </label>
                      <input
                        type="text"
                        value={formData.availability}
                        onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                        className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#258C4F]"
                        placeholder="Your preferred schedule"
                      />
                    </div>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Tell us more about how you'd like to get involved *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#258C4F]"
                    placeholder="Share any relevant skills, ideas, or questions..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#258C4F] hover:bg-[#0D472D] text-white font-bold py-3 text-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Submitting...' : 'Submit Engagement Inquiry'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
