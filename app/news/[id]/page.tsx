"use client";

import React, { use, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, Twitter, Compass } from "lucide-react";
import { NEWS_DATA } from "@/lib/data";

export default function NewsDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [id]);

  const article = useMemo(() => {
    return NEWS_DATA.find((a) => a.id === id);
  }, [id]);

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return NEWS_DATA.filter((a) => a.id !== article.id).slice(0, 3);
  }, [article]);

  const handleCopyLink = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse px-6 py-12">
        <div className="h-4 bg-white/10 rounded w-24"></div>
        <div className="h-10 bg-white/10 rounded w-full"></div>
        <div className="h-4 bg-white/10 rounded w-1/3"></div>
        <div className="w-full h-80 bg-white/10 rounded-2xl"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 page-fade-in">
        <h2 className="text-2xl font-semibold mb-2">Article Not Found</h2>
        <p className="text-gray-500 text-xs max-w-sm mb-6">
          The news article &quot;{id}&quot; is not registered on our platform.
        </p>
        <Link href="/news">
          <button className="bg-white text-[#12132a] font-bold px-6 py-2.5 rounded-xl cursor-pointer text-xs tracking-wider uppercase">
            Back to News Hub
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#12132a] py-8 px-6 md:px-12 text-white page-fade-in">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Back Link */}
        <div>
          <Link href="/news" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition text-xs font-semibold uppercase tracking-wider">
            <ArrowLeft size={14} /> Back to News Hub
          </Link>
        </div>

        {/* 2:1 Split Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Article (2/3 width) */}
          <div className="lg:col-span-8 border border-white/[0.04] bg-[#1a1b3a]/15 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3.5 text-[10px] text-gray-500 font-mono font-bold">
              <span className="bg-[#00ffd5]/10 text-[#00ffd5] border border-[#00ffd5]/20 px-2.5 py-1 rounded-md">
                {article.category.toUpperCase()}
              </span>
              <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(article.publishDate).toLocaleDateString("en-US", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {article.readingTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-semibold leading-tight text-white">
              {article.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3 border-b border-white/[0.04] pb-5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#962f79] to-[#00ffd5] flex items-center justify-center font-bold text-xs text-[#12132a] uppercase">
                {article.author.slice(0, 2)}
              </div>
              <div>
                <p className="text-xs font-semibold text-white">{article.author}</p>
                <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Reporter</span>
              </div>
            </div>

            {/* Cover Image */}
            <div className="relative w-full h-[220px] sm:h-[300px] rounded-2xl overflow-hidden border border-white/[0.04]">
              <Image
                src={article.cover}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-w-768px) 100vw, 66vw"
                priority
              />
            </div>

            {/* Content Renders HTML */}
            <div 
              className="text-gray-300 text-sm sm:text-base leading-relaxed space-y-4 
                         [&>p]:mb-4 [&>p]:text-gray-300 [&>p]:leading-relaxed
                         [&>blockquote]:border-l-4 [&>blockquote]:border-[#00ffd5] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-6 [&>blockquote]:text-white
                         [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-white
                         [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul]:mb-4 [&>ul]:text-xs sm:[&>ul]:text-sm"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            <div className="pt-5 border-t border-white/[0.04] flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] bg-white/[0.02] border border-white/10 px-2.5 py-1 rounded-xl text-gray-500 font-mono font-bold"
                >
                  #{tag}
                </span>
              ))}
            </div>

          </div>

          {/* Sidebar Columns (1/3 width) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Share */}
            <div className="border border-white/[0.04] bg-[#1a1b3a]/30 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[#00ffd5] font-bold border-b border-white/[0.04] pb-2">Share Article</h3>
              
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-3 bg-white/[0.02] border border-white/10 hover:border-white p-2.5 rounded-xl transition cursor-pointer text-xs font-semibold"
                >
                  <Compass size={14} className="text-[#00ffd5]" />
                  <span>{copiedLink ? "Link Copied!" : "Copy Link"}</span>
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 bg-white/[0.02] border border-white/10 hover:border-white p-2.5 rounded-xl transition cursor-pointer text-xs font-semibold"
                >
                  <Twitter size={14} className="text-blue-400" />
                  <span>Share on Twitter</span>
                </a>
              </div>
            </div>

            {/* Related Articles */}
            <div className="border border-white/[0.04] bg-[#1a1b3a]/30 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[#962f79] font-bold border-b border-white/[0.04] pb-3">Related News</h3>
              
              <div className="space-y-4">
                {relatedArticles.map((ra) => (
                  <Link href={`/news/${ra.id}`} key={ra.id} className="block group">
                    <div className="space-y-1">
                      <span className="text-[9px] text-[#00ffd5] font-bold uppercase tracking-wider font-mono">{ra.category}</span>
                      <h4 className="font-bold text-xs leading-snug group-hover:text-[#00ffd5] transition line-clamp-2">
                        {ra.title}
                      </h4>
                      <p className="text-[9px] text-gray-500 font-mono">{ra.publishDate}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
