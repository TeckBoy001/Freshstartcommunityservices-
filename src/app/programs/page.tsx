import React from 'react';
import Link from 'next/link';
import { getPrograms } from '@/lib/db';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Tag, Users } from 'lucide-react';

export const revalidate = 0;

export default function ProgramsPage() {
  const programs = getPrograms(false);

  const categories = ['All', 'Workshops', 'Community Care', 'Empowerment', 'Inspirational', 'Support'];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-[#0D472D] text-white py-20">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl text-center">
          <span className="text-xs font-bold text-[#ADFF1C] uppercase tracking-widest mb-2 block">
            Comprehensive Community Services
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Our 13 Official Community Programs
          </h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto">
            From life-changing career workshops and emergency pantry distributions to senior care and cultural development,
            discover how Fresh Start empowers individuals without judgement.
          </p>
        </div>
      </section>

      {/* Programs Catalog */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((prog) => (
              <Card
                key={prog.id}
                className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between bg-white rounded-2xl"
              >
                <div>
                  <div className="relative h-52 w-full bg-gray-100">
                    <img
                      src={prog.image_url}
                      alt={prog.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#0D472D]/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                      {prog.category}
                    </div>
                    {prog.is_featured && (
                      <div className="absolute top-3 right-3 bg-[#ADFF1C] text-[#1E1E1E] text-xs font-bold px-2 py-0.5 rounded shadow-sm">
                        Featured
                      </div>
                    )}
                  </div>

                  <CardHeader className="p-6 pb-2">
                    <CardTitle className="text-xl font-bold text-[#1E1E1E] leading-snug hover:text-[#258C4F] transition-colors">
                      <Link href={`/programs/${prog.slug}`}>{prog.title}</Link>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-6 pt-2">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {prog.description_short}
                    </p>
                    <div className="flex items-start gap-1.5 text-xs text-gray-500 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      <Users className="w-3.5 h-3.5 text-[#258C4F] shrink-0 mt-0.5" />
                      <span><strong>Target:</strong> {prog.target_population}</span>
                    </div>
                  </CardContent>
                </div>

                <div className="p-6 pt-0 border-t border-gray-100 mt-4 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
                    Status: {prog.status}
                  </span>
                  <Link href={`/programs/${prog.slug}`}>
                    <Button size="sm" className="bg-[#258C4F] hover:bg-[#0D472D] text-white font-bold text-xs">
                      Learn More <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {/* Inquiry Banner */}
          <div className="mt-16 bg-[#258C4F] text-white rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-md">
            <h3 className="text-2xl font-bold mb-3">Want to Refer Someone or Attend a Program?</h3>
            <p className="text-gray-100 text-sm max-w-xl mx-auto mb-6">
              Our doors and phone lines are open. All services are free or donor-subsidized to eliminate financial barriers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/get-involved">
                <Button className="bg-[#ADFF1C] text-[#1E1E1E] hover:bg-[#9de812] font-bold px-6 py-2.5">
                  Refer an Individual
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#258C4F] font-bold px-6 py-2.5">
                  Contact Our Program Coordinators
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
