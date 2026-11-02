import React from 'react';
import Link from 'next/link';
import { getArticles } from '@/lib/db';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

export const revalidate = 0;

export default function NewsPage() {
  const articles = getArticles(true);
  const featuredArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-[#0D472D] text-white py-20">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl text-center">
          <span className="text-xs font-bold text-[#ADFF1C] uppercase tracking-widest mb-2 block">
            Stories of Hope & Progress
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            News, Updates & Community Stories
          </h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto">
            Discover the latest announcements, program expansions, participant milestones,
            and inspiring moments happening across Fresh Start Community Services.
          </p>
        </div>
      </section>

      {/* Articles Container */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
          {/* Featured Article */}
          {featuredArticle && (
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow mb-16 grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-full bg-gray-100 min-h-[280px]">
                <img
                  src={featuredArticle.featured_image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#258C4F] text-white text-xs font-bold px-3 py-1 rounded-md">
                  Featured Story
                </div>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredArticle.published_at ? new Date(featuredArticle.published_at).toLocaleDateString() : 'Recent'}
                    </span>
                    <span>•</span>
                    <span className="text-[#258C4F] font-bold">{featuredArticle.category}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#1E1E1E] leading-snug mb-4 hover:text-[#258C4F] transition-colors">
                    <Link href={`/news/${featuredArticle.slug}`}>{featuredArticle.title}</Link>
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {featuredArticle.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500 font-medium">By {featuredArticle.author_name}</span>
                  <Link href={`/news/${featuredArticle.slug}`}>
                    <Button size="sm" className="bg-[#258C4F] hover:bg-[#0D472D] text-white font-bold text-xs">
                      Read Full Story &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Remaining Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {remainingArticles.map((art) => (
              <Card key={art.id} className="overflow-hidden border border-gray-200 shadow-sm bg-white rounded-2xl flex flex-col justify-between">
                <div className="h-48 w-full relative bg-gray-100">
                  <img
                    src={art.featured_image}
                    alt={art.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#0D472D] text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                    {art.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{art.published_at ? new Date(art.published_at).toLocaleDateString() : 'Recent'}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1E1E1E] leading-snug mb-3 hover:text-[#258C4F] transition-colors">
                      <Link href={`/news/${art.slug}`}>{art.title}</Link>
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed mb-4">{art.excerpt}</p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] text-gray-500 font-medium">By {art.author_name}</span>
                    <Link
                      href={`/news/${art.slug}`}
                      className="text-xs font-bold text-[#258C4F] hover:underline flex items-center gap-1"
                    >
                      Read story <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
