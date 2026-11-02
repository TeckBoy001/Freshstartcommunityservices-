import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProgramBySlug, getPrograms } from '@/lib/db';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Users, CheckCircle, Heart, Share2 } from 'lucide-react';

export const revalidate = 0;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  const otherPrograms = getPrograms(true)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumb / Sub-header */}
      <section className="bg-[#0D472D] text-white py-12">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ADFF1C] hover:underline mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Programs
          </Link>
          <div className="inline-block px-2.5 py-0.5 bg-white/10 text-xs font-bold rounded mb-3">
            {program.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{program.title}</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Left 2 Cols: Description & Details */}
            <div className="md:col-span-2 space-y-8">
              <div className="h-72 w-full rounded-2xl overflow-hidden shadow-sm bg-gray-100">
                <img
                  src={program.image_url}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1E1E1E] mb-4">Program Overview</h2>
                <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                  {program.description_full}
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                <h3 className="font-bold text-lg text-[#1E1E1E]">Who is Eligible?</h3>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#258C4F] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Target Population</p>
                    <p className="text-xs text-gray-600 mt-0.5">{program.target_population}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#258C4F] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">No Judgment Commitment</p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      All Fresh Start programs welcome participants regardless of past circumstances, housing status, or background.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 1 Col: Action Box */}
            <div className="space-y-6">
              <div className="bg-[#F8FAF9] p-6 rounded-2xl border-2 border-[#258C4F]/20 shadow-sm space-y-4">
                <h3 className="font-bold text-lg text-[#1E1E1E]">Take Action</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Ready to enroll, refer a friend, or get involved with this specific initiative?
                </p>
                <Link href="/get-involved" className="block">
                  <Button className="w-full bg-[#258C4F] hover:bg-[#0D472D] text-white font-bold text-sm py-2.5">
                    Refer Someone or Enroll
                  </Button>
                </Link>
                <Link href={`/donate?campaign=general`} className="block">
                  <Button variant="outline" className="w-full border-[#258C4F] text-[#258C4F] hover:bg-[#258C4F] hover:text-white font-bold text-sm py-2.5">
                    <Heart className="w-4 h-4 mr-1.5 fill-current" /> Support This Program
                  </Button>
                </Link>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-200 space-y-3">
                <h4 className="font-bold text-sm text-[#1E1E1E]">Questions?</h4>
                <p className="text-xs text-gray-500">
                  Speak directly with our community intake team at:
                </p>
                <p className="text-sm font-bold text-[#258C4F]">(555) 373-7401</p>
                <Link href="/contact" className="text-xs font-semibold text-gray-600 hover:underline block">
                  Send an online inquiry &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Related Programs */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h3 className="text-xl font-bold text-[#1E1E1E] mb-6">Explore Other Programs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherPrograms.map((op) => (
                <Link
                  key={op.id}
                  href={`/programs/${op.slug}`}
                  className="p-4 rounded-xl border border-gray-200 hover:border-[#258C4F] transition-colors bg-white block group"
                >
                  <span className="text-[10px] font-bold text-[#258C4F] uppercase tracking-wider block mb-1">
                    {op.category}
                  </span>
                  <h4 className="font-bold text-sm text-[#1E1E1E] group-hover:text-[#258C4F] transition-colors leading-snug">
                    {op.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
