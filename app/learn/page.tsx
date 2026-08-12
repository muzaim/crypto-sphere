"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { HelpCircle, Database, Wallet, TrendingUp, Image as ImageIcon, Shield, BookOpen, GraduationCap, ChevronRight, Award } from "lucide-react";
import { LEARN_DATA } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  "HelpCircle": <HelpCircle className="text-yellow-400" size={20} />,
  "Database": <Database className="text-blue-400" size={20} />,
  "Wallet": <Wallet className="text-[#00ffd5]" size={20} />,
  "TrendingUp": <TrendingUp className="text-emerald-400" size={20} />,
  "Image": <ImageIcon className="text-pink-400" size={20} />,
  "Shield": <Shield className="text-purple-400" size={20} />,
  "BookOpen": <BookOpen className="text-[#962f79]" size={20} />
};

const difficultyColors = {
  "Beginner": "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  "Intermediate": "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  "Advanced": "bg-purple-500/10 text-purple-400 border border-purple-500/20"
};

export default function Learn() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<"All" | "Beginner" | "Intermediate" | "Advanced">("All");

  const filteredGuides = useMemo(() => {
    if (selectedDifficulty === "All") return LEARN_DATA;
    return LEARN_DATA.filter((g) => g.difficulty === selectedDifficulty);
  }, [selectedDifficulty]);

  return (
    <div className="min-h-screen bg-[#12132a] py-8 px-6 md:px-12 text-white page-fade-in">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-4 border-b border-white/[0.04]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#00ffd5] font-bold">Educational Academy</span>
            <h1 className="text-3xl sm:text-4xl font-extralight tracking-tight mt-1 flex items-center gap-2.5">
              <GraduationCap size={36} className="text-[#962f79]" /> Learn Academy
            </h1>
            <p className="text-gray-400 text-xs mt-1.5 max-w-lg leading-relaxed">
              Master fundamental blockchain concepts to advanced analysis techniques through our structured curriculum.
            </p>
          </div>

          <div className="border border-white/10 bg-[#1a1b3a]/40 p-4 rounded-2xl flex items-center gap-3 text-xs max-w-xs shadow-md">
            <Award className="text-[#00ffd5]" size={28} />
            <div>
              <p className="font-bold text-white">Academy Syllabus</p>
              <p className="text-gray-500 mt-0.5">{LEARN_DATA.length} free learning modules</p>
            </div>
          </div>
        </div>

        {/* Difficulty Filter Tabs */}
        <div className="flex border-b border-white/[0.04] pb-4">
          <div className="flex bg-[#1a1b3a]/60 border border-white/10 p-1.5 rounded-2xl text-xs sm:text-sm">
            {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-5 py-2 rounded-xl font-semibold transition cursor-pointer ${
                  selectedDifficulty === diff
                    ? "bg-white text-[#12132a] shadow-md font-bold"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {diff === "All" ? "All Levels" : diff}
              </button>
            ))}
          </div>
        </div>

        {/* Sequential Curriculum Track (Figma-grade asymmetrical list) */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredGuides.map((guide, idx) => (
            <Link href={`/learn/${guide.id}`} key={guide.id} className="block group">
              <div className="border border-white/[0.04] bg-[#1a1b3a]/15 hover:bg-[#1a1b3a]/30 hover:border-[#00ffd5]/40 rounded-2xl p-6 transition-all duration-300 shadow-md relative flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                
                {/* Step indicator number */}
                <div className="font-mono text-2xl font-black text-white/10 group-hover:text-[#00ffd5]/40 transition duration-300 w-8">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                {/* Icon wrapper */}
                <div className="bg-[#12132a] p-3 rounded-2xl border border-white/5 flex-shrink-0 group-hover:scale-105 transition-all">
                  {iconMap[guide.iconName] || <HelpCircle size={20} />}
                </div>

                {/* Text Content */}
                <div className="flex-grow space-y-1.5">
                  <div className="flex flex-wrap items-center gap-3.5 text-[10px] text-gray-500 font-mono">
                    <span className="text-[#962f79] font-bold">{guide.category.toUpperCase()}</span>
                    <span>•</span>
                    <span>{guide.readTime}</span>
                  </div>
                  
                  <h3 className="text-base font-bold text-white group-hover:text-[#00ffd5] transition leading-snug">
                    {guide.title}
                  </h3>
                  
                  <p className="text-xs text-gray-400 leading-relaxed max-w-xl">
                    {guide.summary}
                  </p>
                </div>

                {/* Difficulty tag + Action trigger */}
                <div className="flex sm:flex-col items-end gap-3 sm:gap-2.5 w-full sm:w-auto justify-between sm:justify-start border-t sm:border-t-0 border-white/[0.04] pt-4 sm:pt-0">
                  <span className={`text-[9px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${difficultyColors[guide.difficulty]}`}>
                    {guide.difficulty}
                  </span>
                  <span className="text-[10px] font-bold text-[#00ffd5] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition duration-300">
                    Syllabus <ChevronRight size={12} />
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
