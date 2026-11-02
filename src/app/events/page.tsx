import React from 'react';
import Link from 'next/link';
import { getEvents } from '@/lib/db';
import { Calendar, MapPin, Tag, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const revalidate = 0;

export default function EventsPage() {
  const events = getEvents();
  const upcomingEvents = events.filter((e) => e.status === 'upcoming');
  const pastEvents = events.filter((e) => e.status !== 'upcoming');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-[#0D472D] text-white py-20">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl text-center">
          <span className="text-xs font-bold text-[#ADFF1C] uppercase tracking-widest mb-2 block">
            Community Gatherings & Workshops
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Upcoming Events & Outreach Days
          </h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto">
            Connect with neighbors, receive resources, attend career seminars, and participate in community fellowship.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6 max-w-5xl space-y-16">
          {/* Upcoming Section */}
          <div>
            <h2 className="text-2xl font-bold text-[#1E1E1E] mb-8 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[#258C4F]" /> Upcoming Events
            </h2>

            {upcomingEvents.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-gray-200 text-gray-500">
                No upcoming events scheduled right now. Check back soon!
              </div>
            ) : (
              <div className="space-y-6">
                {upcomingEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-start"
                  >
                    <div className="w-full md:w-48 h-36 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                      <img
                        src={evt.image_url}
                        alt={evt.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#258C4F]">
                        <span className="px-2.5 py-0.5 bg-green-50 rounded text-[#258C4F]">{evt.category}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#1E1E1E] leading-snug">{evt.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{evt.description}</p>

                      <div className="flex flex-wrap gap-4 text-xs text-gray-500 pt-2">
                        <span className="flex items-center gap-1 font-semibold text-gray-700">
                          <Clock className="w-4 h-4 text-[#258C4F]" />
                          {new Date(evt.date_time).toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-[#258C4F]" />
                          {evt.location}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 self-center md:self-end">
                      <Link href={evt.rsvp_link || '/contact'}>
                        <Button className="bg-[#258C4F] hover:bg-[#0D472D] text-white font-bold text-xs px-5 py-2.5">
                          RSVP & Inquire
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past Events Section if available */}
          {pastEvents.length > 0 && (
            <div className="pt-8 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-700 mb-6">Recent Past Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pastEvents.map((pe) => (
                  <div key={pe.id} className="bg-white p-5 rounded-xl border border-gray-200 opacity-80">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{pe.category}</span>
                    <h4 className="font-bold text-base text-[#1E1E1E] mt-1">{pe.title}</h4>
                    <p className="text-xs text-gray-500 mt-2">{pe.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
