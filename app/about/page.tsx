"use client";

import React from "react";
import Image from "next/image";
import { Shield, BrainCircuit, Globe, Users, Target, Compass } from "lucide-react";

export default function AboutPage() {
  const coreValues = [
    {
      icon: <Shield size={24} className="text-[#00ffd5]" />,
      title: "Data Integrity",
      desc: "Protecting market data integrity and user watchlist configurations with industry standard Web3 guidelines."
    },
    {
      icon: <BrainCircuit size={24} className="text-purple-400" />,
      title: "Analytical Innovation",
      desc: "Providing accurate on-chain metrics, circulating supply statistics, and interactive price visualizations."
    },
    {
      icon: <Globe size={24} className="text-[#962f79]" />,
      title: "Absolute Transparency",
      desc: "Ensuring decentralized information delivery is neutral, transparent, and completely accessible."
    },
    {
      icon: <Users size={24} className="text-blue-400" />,
      title: "Community Trust",
      desc: "Developing high-quality interactive tools and learning paths to simplify interface navigation."
    }
  ];

  return (
    <div className="min-h-screen bg-[#12132a] py-8 px-6 md:px-12 text-white page-fade-in">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#00ffd5] font-bold">About Us</span>
          <h1 className="text-4xl md:text-5xl font-extralight tracking-tight">Who We Are</h1>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            CryptoSphere is an independent cryptocurrency analysis and information platform dedicated to bringing clarity to the decentralized finance space.
          </p>
        </div>

        {/* Company Story Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-white/[0.04] bg-[#1a1b3a]/15 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-36 h-36 bg-blue-600/3 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl sm:text-2xl font-light flex items-center gap-2">
              <Compass className="text-[#00ffd5]" size={20} /> Our Founding Story
            </h2>
            <div className="text-gray-400 text-sm leading-relaxed space-y-4">
              <p>
                Founded in 2024, CryptoSphere was born out of a shared realization of the complexity in finding structured Web3 information. The nonstop nature of cryptocurrency markets demands a robust, trusted self-analysis portal that can be navigated simply by users of all backgrounds.
              </p>
              <p>
                We built this platform by combining premium visual design details with simplified data presentations. We aggregate price telemetry for 100 listed assets, track market capitalizations by industry sector, curate comprehensive academy syllabuses, and advocate for self-driven market research.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="absolute w-[18rem] h-[18rem] bg-blue-600/5 rounded-full blur-3xl animate-pulse-slow"></div>
            <Image
              src="/img/Contents.png"
              alt="team group"
              width={350}
              height={350}
              className="object-contain relative z-10 w-full max-w-[300px] h-auto"
            />
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision */}
          <div className="border border-white/[0.04] bg-[#1a1b3a]/30 rounded-3xl p-8 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#962f79]/3 rounded-full blur-xl"></div>
            <div className="bg-[#12132a] p-3 rounded-2xl w-10 h-10 flex items-center justify-center border border-white/5 mb-1">
              <Target className="text-[#962f79]" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white">Our Vision</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              To be the premier gateway for cryptocurrency insights that prioritizes neutral, transparent, and trusted data governance, fostering financial independence in the digital era.
            </p>
          </div>

          {/* Mission */}
          <div className="border border-white/[0.04] bg-[#1a1b3a]/30 rounded-3xl p-8 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00ffd5]/3 rounded-full blur-xl"></div>
            <div className="bg-[#12132a] p-3 rounded-2xl w-10 h-10 flex items-center justify-center border border-white/5 mb-1">
              <Compass className="text-[#00ffd5]" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white">Our Mission</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              To provide calibrated real-time market metrics, disseminate structured blockchain education for free, and reduce the global Web3 literacy gap.
            </p>
          </div>

        </div>

        {/* Core Values Section */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-2xl font-light">Core Values</h2>
            <p className="text-gray-500 text-xs">
              The foundational principles guiding our team in building premium, market-driven information platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, idx) => (
              <div
                key={idx}
                className="border border-white/[0.04] bg-white/[0.01] hover:border-[#00ffd5]/40 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="mb-2">{value.icon}</div>
                  <h4 className="font-bold text-sm text-white">{value.title}</h4>
                  <p className="text-gray-500 text-[11px] leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
