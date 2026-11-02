import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles } from '@/lib/db';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';

export const revalidate = 0;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const otherArticles = getArticles(true)
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header / Meta */}
      <section className="bg-[#0D472D] text-white py-14">
        <div className="container mx-auto px-4 lg:px-6 max-w-3xl">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ADFF1C] hover:underline mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to News & Blog
          </Link>
          <div className="inline-block px-2.5 py-0.5 bg-white/10 text-[#ADFF1C] text-xs font-bold rounded mb-4">
            {article.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#ADFF1C]" />
              {article.published_at ? new Date(article.published_at).toLocaleDateString() : 'Recent'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#ADFF1C]" />
              By {article.author_name}
            </span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6 max-w-3xl">
          <div className="h-80 w-full rounded-2xl overflow-hidden shadow-sm bg-gray-100 mb-10">
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-gray-800 text-base md:text-lg leading-relaxed space-y-6 whitespace-pre-line border-b border-gray-100 pb-12">
            {article.content}
          </div>

          {/* Related Articles */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-[#1E1E1E] mb-6">More Recent Stories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherArticles.map((oa) => (
                <Link
                  key={oa.id}
                  href={`/news/${oa.slug}`}
                  className="p-4 rounded-xl border border-gray-200 hover:border-[#258C4F] transition-colors bg-gray-50/50 block group"
                >
                  <span className="text-[10px] font-bold text-[#258C4F] uppercase tracking-wider block mb-1">
                    {oa.category}
                  </span>
                  <h4 className="font-bold text-xs text-[#1E1E1E] group-hover:text-[#258C4F] transition-colors leading-snug line-clamp-2">
                    {oa.title}
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
