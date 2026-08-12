"use client";

import React, { use, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Share2, Check, CheckSquare, ChevronRight } from "lucide-react";
import { LEARN_DATA } from "@/lib/data";

const difficultyColors = {
  "Beginner": "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  "Intermediate": "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  "Advanced": "bg-purple-500/10 text-purple-400 border border-purple-500/20"
};

export default function LearnDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Checkbox states
  const [progressChecked, setProgressChecked] = useState<boolean[]>([true, false, false]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [id]);

  const guide = useMemo(() => {
    return LEARN_DATA.find((g) => g.id === id);
  }, [id]);

  const otherGuides = useMemo(() => {
    if (!guide) return [];
    return LEARN_DATA.filter((g) => g.id !== guide.id).slice(0, 3);
  }, [guide]);

  const handleCopyLink = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const toggleProgress = (idx: number) => {
    setProgressChecked((prev) => {
      const copy = [...prev];
      copy[idx] = !copy[idx];
      return copy;
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse px-6 py-12">
        <div className="h-4 bg-white/10 rounded w-24"></div>
        <div className="h-10 bg-white/10 rounded w-full"></div>
        <div className="h-4 bg-white/10 rounded w-1/3"></div>
        <div className="h-80 bg-white/10 rounded-2xl"></div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 page-fade-in">
        <h2 className="text-2xl font-semibold mb-2">Guide Not Found</h2>
        <p className="text-gray-500 text-xs max-w-sm mb-6">
          The educational module &quot;{id}&quot; is not registered on our platform.
        </p>
        <Link href="/learn">
          <button className="bg-white text-[#12132a] font-bold px-6 py-2.5 rounded-xl cursor-pointer text-xs tracking-wider uppercase">
            Back to Academy
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#12132a] py-8 px-6 md:px-12 text-white page-fade-in">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Back Link */}
        <div>
          <Link href="/learn" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition text-xs font-semibold uppercase tracking-wider">
            <ArrowLeft size={14} /> Back to Academy
          </Link>
        </div>

        {/* Reader Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Reading Container */}
          <div className="lg:col-span-8 border border-white/[0.04] bg-[#1a1b3a]/15 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3.5 text-[10px] text-gray-500 font-mono font-bold">
              <span className="bg-[#962f79]/10 text-[#962f79] border border-[#962f79]/20 px-2.5 py-1 rounded-md">
                {guide.category.toUpperCase()}
              </span>
              <span className={`px-2 py-0.5 rounded ${difficultyColors[guide.difficulty]}`}>
                {guide.difficulty}
              </span>
              <span className="flex items-center gap-1"><Clock size={12} /> {guide.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-semibold leading-tight text-white">
              {guide.title}
            </h1>

            {/* Summary Box */}
            <div className="border-l-4 border-[#00ffd5] bg-[#12132a]/60 p-4 rounded-r-xl">
              <p className="text-xs sm:text-sm text-gray-300 italic leading-relaxed">
                &quot;{guide.summary}&quot;
              </p>
            </div>

            {/* Rich Article Content */}
            <div 
              className="text-gray-300 text-sm sm:text-base leading-relaxed space-y-4 
                         [&>p]:text-gray-300 [&>p]:mb-4 [&>p]:leading-relaxed
                         [&>strong]:text-white [&>strong]:font-semibold
                         [&>h3]:text-base sm:[&>h3]:text-lg [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:text-white [&>h3]:border-b [&>h3]:border-white/[0.04] [&>h3]:pb-2
                         [&>h4]:text-sm sm:[&>h4]:text-base [&>h4]:font-semibold [&>h4]:mt-6 [&>h4]:mb-2 [&>h4]:text-gray-200
                         [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul]:mb-4 [&>ul]:text-xs sm:[&>ul]:text-sm
                         [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-2 [&>ol]:mb-4"
              dangerouslySetInnerHTML={{ __html: guide.content }}
            />

            {/* Share / Done bar */}
            <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                onClick={handleCopyLink}
                className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/10 hover:border-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              >
                <Share2 size={12} className="text-[#00ffd5]" />
                {copiedLink ? "Link Copied!" : "Copy Article Link"}
              </button>

              <Link href="/learn" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-gradient-to-r from-[#962f79] to-[#00ffd5] text-[#12132a] font-bold px-8 py-3 rounded-xl cursor-pointer text-xs tracking-wider uppercase transition">
                  Complete Module
                </button>
              </Link>
            </div>

          </div>

          {/* Sidebar (1/3 width) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Reading Progress Tracker */}
            <div className="border border-white/[0.04] bg-[#1a1b3a]/30 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[#00ffd5] font-bold border-b border-white/[0.04] pb-2 flex items-center gap-2">
                <CheckSquare size={14} className="text-[#00ffd5]" /> Learning Objectives
              </h3>
              
              <div className="space-y-2.5 text-xs">
                {[
                  "Introduction to core and basic fundamentals",
                  "Understanding technical architecture operations",
                  "Key takeaways and case study analysis"
                ].map((step, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleProgress(idx)}
                    className="flex items-start gap-3 p-2 bg-[#12132a]/40 rounded-lg border border-white/[0.04] hover:border-white/10 cursor-pointer select-none transition"
                  >
                    <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center transition-all ${
                      progressChecked[idx]
                        ? "bg-[#00ffd5] border-transparent text-[#12132a]"
                        : "border-white/20"
                    }`}>
                      {progressChecked[idx] && <Check size={10} strokeWidth={3} />}
                    </div>
                    <span className={progressChecked[idx] ? "text-gray-500 line-through" : "text-gray-300"}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5 pt-2 border-t border-white/[0.04]">
                <div className="flex justify-between text-[9px] text-gray-500 font-mono">
                  <span>Reading Progress</span>
                  <span>{Math.round((progressChecked.filter(Boolean).length / progressChecked.length) * 100)}%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00ffd5] transition-all duration-300"
                    style={{ width: `${(progressChecked.filter(Boolean).length / progressChecked.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Other topics list */}
            <div className="border border-white/[0.04] bg-[#1a1b3a]/30 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[#962f79] font-bold border-b border-white/[0.04] pb-2">Other Topics</h3>
              
              <div className="space-y-4">
                {otherGuides.map((g) => (
                  <Link href={`/learn/${g.id}`} key={g.id} className="block group">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1 max-w-[90%]">
                        <span className="text-[9px] text-[#962f79] font-bold tracking-wider font-mono uppercase">{g.difficulty}</span>
                        <h4 className="font-bold text-xs leading-snug group-hover:text-[#00ffd5] transition line-clamp-1">
                          {g.title}
                        </h4>
                        <p className="text-[9px] text-gray-500 font-mono">{g.category} • {g.readTime}</p>
                      </div>
                      <ChevronRight size={12} className="text-gray-600 group-hover:text-white transition group-hover:translate-x-0.5" />
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
