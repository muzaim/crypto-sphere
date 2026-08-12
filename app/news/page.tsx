"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, Newspaper, Hash } from "lucide-react";
import { NEWS_DATA } from "@/lib/data";
import { CardSkeleton } from "@/components/skeleton";

export default function News() {
  const [selectedTag, setSelectedTag] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const tagsList = useMemo(() => {
    const tags = new Set<string>();
    NEWS_DATA.forEach((n) => n.tags.forEach((t) => tags.add(t)));
    return ["All", ...Array.from(tags)];
  }, []);

  const filteredArticles = useMemo(() => {
    if (selectedTag === "All") return NEWS_DATA;
    return NEWS_DATA.filter((n) => n.tags.includes(selectedTag));
  }, [selectedTag]);

  const featuredArticle = useMemo(() => {
    return NEWS_DATA[0];
  }, []);

  const remainingArticles = useMemo(() => {
    return filteredArticles.filter((a) => a.id !== featuredArticle?.id);
  }, [filteredArticles, featuredArticle]);

  return (
    <div className="min-h-screen bg-[#12132a] py-8 px-6 md:px-12 text-white page-fade-in">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="pb-4 border-b border-white/[0.04]">
          <span className="text-xs uppercase tracking-widest text-[#00ffd5] font-bold">Insights & Publications</span>
          <h1 className="text-3xl sm:text-4xl font-extralight tracking-tight mt-1">Crypto News Hub</h1>
          <p className="text-gray-400 text-xs mt-1.5 max-w-lg leading-relaxed">
            Temukan analisis mendalam mengenai ekosistem blockchain, pembaruan regulasi, dan riset teknologi Web3 terkini.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap gap-2 items-center pb-2">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-extrabold mr-2 flex items-center gap-1">
            <Hash size={10} /> Filter Tags:
          </span>
          {tagsList.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-mono transition cursor-pointer ${
                selectedTag === tag
                  ? "bg-white text-[#12132a] shadow-md border border-white"
                  : "bg-white/[0.01] border border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              #{tag.toUpperCase()}
            </button>
          ))}
        </div>

        {isLoading ? (
          <CardSkeleton cards={3} />
        ) : (
          <div className="space-y-12">
            
            {/* Spotlight Banner (Only for 'All') */}
            {selectedTag === "All" && featuredArticle && (
              <Link href={`/news/${featuredArticle.id}`} className="block group">
                <div className="border border-white/[0.04] bg-[#1a1b3a]/15 hover:border-white/15 rounded-3xl overflow-hidden p-6 md:p-8 flex flex-col lg:flex-row gap-8 transition-all duration-300 shadow-2xl relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ffd5]/3 rounded-full blur-[80px] pointer-events-none"></div>
                  
                  {/* cover visual */}
                  <div className="flex-1 min-h-[220px] relative rounded-2xl overflow-hidden border border-white/[0.04]">
                    <Image
                      src={featuredArticle.cover}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover group-hover:scale-102 transition-transform duration-500"
                      sizes="(max-w-768px) 100vw, 50vw"
                      priority
                    />
                    <span className="absolute bottom-4 left-4 bg-[#12132a]/95 text-[#00ffd5] text-[10px] font-extrabold px-3.5 py-1.5 rounded-xl border border-white/[0.04] uppercase tracking-wider z-10">
                      Featured
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-2 space-y-4">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-4 text-[10px] text-gray-500 font-mono font-bold">
                        <span className="text-[#962f79]">{featuredArticle.category.toUpperCase()}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Calendar size={10} /> {featuredArticle.publishDate}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock size={10} /> {featuredArticle.readingTime}</span>
                      </div>
                      
                      <h2 className="text-xl sm:text-2xl font-bold leading-snug group-hover:text-[#00ffd5] transition-all">
                        {featuredArticle.title}
                      </h2>
                      
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                        {featuredArticle.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/[0.04] pt-4 mt-4">
                      <span className="text-xs text-gray-500 font-mono">By {featuredArticle.author}</span>
                      <span className="text-xs font-bold text-[#00ffd5] flex items-center gap-1 group-hover:translate-x-0.5 transition-all duration-300">
                        Read Story <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>

                </div>
              </Link>
            )}

            {/* Grid List */}
            {remainingArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {remainingArticles.map((article) => (
                  <Link href={`/news/${article.id}`} key={article.id} className="block group">
                    <div className="border border-white/[0.04] bg-[#1a1b3a]/15 hover:border-white/15 rounded-3xl p-6 h-full flex flex-col justify-between hover:translate-y-[-2px] transition-all duration-300 shadow-md">
                      <div className="space-y-4">
                        
                        <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/[0.04]">
                          <Image
                            src={article.cover}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-102 transition-transform duration-500"
                            sizes="(max-w-768px) 100vw, 33vw"
                          />
                          <span className="absolute bottom-3 left-3 bg-[#12132a]/90 text-[#00ffd5] text-[9px] font-bold px-2.5 py-1 rounded-lg border border-white/[0.04] uppercase tracking-wider z-10">
                            {article.category}
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2.5 text-[10px] text-gray-500 font-mono">
                            <span>{article.publishDate}</span>
                            <span>•</span>
                            <span>{article.readingTime}</span>
                          </div>
                          
                          <h3 className="text-base font-bold text-white group-hover:text-[#00ffd5] transition leading-snug line-clamp-2">
                            {article.title}
                          </h3>
                          
                          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                            {article.summary}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-white/[0.04] pt-4 mt-6">
                        <span className="text-xs text-gray-500 font-mono">By {article.author}</span>
                        <ArrowRight size={12} className="text-[#00ffd5] group-hover:translate-x-0.5 transition" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              selectedTag !== "All" && (
                <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl bg-white/[0.01] max-w-sm mx-auto">
                  <Newspaper size={32} className="mx-auto text-gray-600 mb-2" />
                  <h3 className="text-sm font-semibold">No news articles</h3>
                  <p className="text-gray-500 text-xs mt-1">No articles published under the tag #{selectedTag.toUpperCase()}.</p>
                </div>
              )
            )}

          </div>
        )}

      </div>
    </div>
  );
}
