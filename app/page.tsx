"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { TrendingUp, TrendingDown, Heart, ChevronRight, ArrowRight } from "lucide-react";
import { COINS_DATA, NEWS_DATA, CATEGORIES_DATA } from "@/lib/data";
import { useWatchlist } from "@/lib/watchlist-context";
import { Sparkline } from "@/components/sparkline";
import Partner from "@/components/partner";
import Portfolio from "@/components/portfolio";
import Features from "@/components/features";
import Member from "@/components/member";
import Support from "@/components/support";
import Group from "@/components/group";
import Testimonials from "@/components/testimonials";

export default function Home() {
  const { watchlist } = useWatchlist();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute Homepage lists
  const topGainers = [...COINS_DATA].sort((a, b) => b.change24h - a.change24h).slice(0, 4);
  const topLosers = [...COINS_DATA].sort((a, b) => a.change24h - b.change24h).slice(0, 4);
  
  // Featured large coins
  const featuredCoins = COINS_DATA.filter(c => ["bitcoin", "ethereum", "solana"].includes(c.id));
  
  // Watchlist Coins
  const watchlistCoins = COINS_DATA.filter(c => watchlist.includes(c.id)).slice(0, 3);

  // Latest 3 news articles
  const latestNews = NEWS_DATA.slice(0, 3);

  // Fear & Greed Index (Greed 72)
  const fearGreedScore = 72;
  const fearGreedLabel = "Greed";

  // Helper to draw fallback coin initials logo with a unique gradient background
  const renderCoinLogo = (symbol: string, id: string) => {
    const charCodeSum = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = charCodeSum % 360;
    return (
      <div 
        className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] text-white shadow-inner flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, hsl(${hue}, 70%, 45%), hsl(${(hue + 60) % 360}, 70%, 35%))`
        }}
      >
        {symbol.slice(0, 3)}
      </div>
    );
  };

  return (
    <div className="page-fade-in flex flex-col min-h-screen bg-[#12132a]">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 md:px-12 py-20 text-white overflow-hidden">
        {/* Glow */}
        <div className="absolute top-[10%] left-[5%] w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[30rem] h-[30rem] bg-[#962f79]/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>

        {/* Hero content grid */}
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Text */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <span className="text-[10px] bg-white/[0.04] border border-white/[0.08] text-[#00ffd5] font-extrabold px-3 py-1.5 rounded-full tracking-widest uppercase inline-block">
              Introducing CryptoSphere 2.0
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tighter leading-[1.05] text-white">
              Live and <span className="block font-medium bg-gradient-to-r from-[#00ffd5] to-[#962f79] bg-clip-text text-transparent">on-demand</span> market analysis
            </h1>
            <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              The leading independent platform to research the global crypto market. Access real-time data visualizations, interactive trend charts, and trusted learning guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link href="/markets" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-white text-[#12132a] font-bold px-8 py-3.5 rounded-xl transition duration-300 hover:bg-[#00ffd5] cursor-pointer text-xs tracking-wider uppercase shadow-lg hover:shadow-[0_0_25px_rgba(0,255,213,0.3)]">
                  Explore Markets
                </button>
              </Link>
              <Link href="/learn" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-white/[0.02] border border-white/10 hover:border-white text-white font-bold px-8 py-3.5 rounded-xl transition duration-300 hover:bg-white/[0.05] cursor-pointer text-xs tracking-wider uppercase">
                  Learn Academy
                </button>
              </Link>
            </div>
          </div>

          {/* Right graphic */}
          <div className="lg:col-span-5 relative flex justify-center items-center h-[350px] sm:h-[450px]">
            <Image
              src="/img/Wood-Hand.png"
              width={420}
              height={420}
              alt="Hero image"
              className="object-contain relative z-10 w-[280px] sm:w-[360px] md:w-[420px] animate-float"
              priority
            />
            {/* Stars decoration */}
            <Image
              src="/img/acc/Star_4.png"
              alt="star"
              width={40}
              height={40}
              className="absolute z-20 bottom-[20%] right-[10%] animate-twinkle"
            />
            <Image
              src="/img/acc/Star_5.png"
              alt="star"
              width={30}
              height={30}
              className="absolute top-[15%] right-[25%] animate-twinkle delay-700"
            />
          </div>

        </div>
      </section>

      {/* 2. PARTNERS */}
      <Partner />

      {/* 3. ASYMMETRICAL COMMAND CENTER */}
      <section className="py-12 px-6 md:px-12 relative bg-[#12132a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Dashboard Widget (2/3 width) */}
          <div className="lg:col-span-8 border border-white/[0.04] bg-[#1a1b3a]/30 backdrop-blur-md rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative glow-teal">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/[0.04]">
                <h3 className="text-xs uppercase tracking-widest text-[#00ffd5] font-bold">Terminal Overview</h3>
                <span className="text-[10px] text-gray-500 font-mono">Simulated global metrics</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-4">
                <div className="space-y-1">
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider font-bold">Total Cap</p>
                  <p className="text-2xl font-bold font-mono text-white">$2.42T</p>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-0.5"><TrendingUp size={10} /> +1.84%</span>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider font-bold">24H Trading Volume</p>
                  <p className="text-2xl font-bold font-mono text-white">$84.5B</p>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-0.5"><TrendingUp size={10} /> +4.22%</span>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider font-bold">BTC Dominance</p>
                  <p className="text-2xl font-bold font-mono text-white">56.4%</p>
                  <span className="text-[10px] text-gray-500 font-mono">Market leader</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 mt-8 border-t border-white/[0.04] text-[11px] text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                <span>Active Assets: 100 Listed</span>
              </div>
              <div>Gas Price: 12 Gwei</div>
              <div>Markets: 12,482 pair</div>
            </div>
          </div>

          {/* Fear & Greed Gauge (1/3 width) */}
          <div className="lg:col-span-4 border border-white/[0.04] bg-[#1a1b3a]/30 backdrop-blur-md rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative glow-purple">
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[#962f79] font-bold">Market Sentiment</h3>
              <p className="text-xs text-gray-400 leading-relaxed">Cumulative psychological indicator of current market emotions.</p>
            </div>
            
            <div className="my-6 flex justify-center">
              <div className="w-32 h-32 rounded-full border border-dashed border-white/10 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#962f79]/10 to-[#00ffd5]/10 rounded-full blur-xl animate-pulse"></div>
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#1a1b3a] to-[#12132a] border border-white/[0.06] flex flex-col items-center justify-center relative z-10 shadow-inner">
                  <span className="text-3xl font-extrabold font-mono text-[#00ffd5] leading-none">{fearGreedScore}</span>
                  <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400 mt-1">{fearGreedLabel}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between text-[10px] text-gray-500 border-t border-white/[0.04] pt-3 font-mono">
              <span>Yesterday: 70 (Greed)</span>
              <span>Last Week: 65 (Greed)</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. ASYMMETRICAL SPOTLIGHT / ASSETS grid */}
      <section className="py-12 px-6 md:px-12 bg-[#12132a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Spotlight Featured Coins (2/3 width) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-end pb-2">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#962f79] font-bold">Top Spotlight</span>
                <h2 className="text-2xl sm:text-3xl font-light mt-1 text-white">Featured Cryptocurrencies</h2>
              </div>
              <Link href="/markets" className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-semibold transition-all">
                Explore All <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCoins.map((coin) => {
                const isPos = coin.change24h >= 0;
                return (
                  <div key={coin.id} className="border border-white/[0.04] bg-[#1a1b3a]/20 hover:bg-[#1a1b3a]/40 hover:border-white/15 rounded-2xl p-6 transition-all duration-300 shadow-md flex flex-col justify-between min-h-[220px]">
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2.5">
                          {renderCoinLogo(coin.symbol, coin.id)}
                          <div>
                            <h4 className="font-bold text-sm text-white">{coin.name}</h4>
                            <span className="text-[10px] text-gray-500 font-mono font-semibold">{coin.symbol}</span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isPos ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                          {isPos ? "+" : ""}{coin.change24h}%
                        </span>
                      </div>

                      <div className="mt-5 space-y-1">
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Current Price</span>
                        <p className="text-2xl font-extrabold font-mono tracking-tight text-gray-100">
                          ${coin.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.04] mt-5">
                      <div className="w-full flex items-center justify-center">
                        <Sparkline data={coin.sparkline} change24h={coin.change7d} width={180} height={30} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Gainers & Losers compact lists (1/3 width) */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#00ffd5] font-bold">Top Movers</span>
              <h2 className="text-2xl font-light mt-1 text-white">Daily Gainers / Losers</h2>
            </div>

            <div className="border border-white/[0.04] bg-[#1a1b3a]/20 rounded-3xl p-6 shadow-xl space-y-6">
              {/* Gainers */}
              <div className="space-y-3.5">
                <h4 className="text-[10px] uppercase tracking-widest text-emerald-400 font-extrabold flex items-center gap-1.5">
                  <TrendingUp size={12} /> Top Gainers
                </h4>
                <div className="space-y-2.5">
                  {topGainers.slice(0, 3).map((coin) => (
                    <Link href={`/coin/${coin.id}`} key={coin.id} className="flex justify-between items-center p-2 rounded-xl hover:bg-white/[0.02] transition">
                      <div className="flex items-center gap-2">
                        {renderCoinLogo(coin.symbol, coin.id)}
                        <span className="font-bold text-xs">{coin.symbol}</span>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-bold">+{coin.change24h}%</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Losers */}
              <div className="space-y-3.5 border-t border-white/[0.04] pt-5">
                <h4 className="text-[10px] uppercase tracking-widest text-red-400 font-extrabold flex items-center gap-1.5">
                  <TrendingDown size={12} /> Top Losers
                </h4>
                <div className="space-y-2.5">
                  {topLosers.slice(0, 3).map((coin) => (
                    <Link href={`/coin/${coin.id}`} key={coin.id} className="flex justify-between items-center p-2 rounded-xl hover:bg-white/[0.02] transition">
                      <div className="flex items-center gap-2">
                        {renderCoinLogo(coin.symbol, coin.id)}
                        <span className="font-bold text-xs">{coin.symbol}</span>
                      </div>
                      <span className="text-xs font-mono text-red-400 font-bold">{coin.change24h}%</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. WATCHLIST PREVIEW PANEL */}
      <section className="py-12 px-6 md:px-12 bg-[#12132a] border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#962f79] font-bold">My Watchlist</span>
              <h2 className="text-2xl sm:text-3xl font-light mt-1 text-white">Your Tracker Preview</h2>
            </div>
            <Link href="/watchlist" className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-semibold transition-all">
              Manage Tracker <ChevronRight size={14} />
            </Link>
          </div>

          {mounted && watchlistCoins.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {watchlistCoins.map((coin) => {
                const isPos = coin.change24h >= 0;
                return (
                  <Link href={`/coin/${coin.id}`} key={coin.id} className="block group">
                    <div className="border border-white/[0.04] bg-[#1a1b3a]/25 hover:bg-[#1a1b3a]/40 hover:border-[#00ffd5]/40 rounded-2xl p-6 transition-all duration-300 shadow-md">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2.5">
                          {renderCoinLogo(coin.symbol, coin.id)}
                          <div>
                            <h4 className="font-bold text-sm text-white group-hover:text-[#00ffd5] transition">{coin.symbol}</h4>
                            <p className="text-[10px] text-gray-500">{coin.name}</p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isPos ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                          {isPos ? "+" : ""}{coin.change24h}%
                        </span>
                      </div>
                      <p className="text-xl font-bold font-mono text-gray-100">
                        ${coin.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="border border-dashed border-white/10 bg-white/[0.01] rounded-3xl p-10 text-center max-w-md mx-auto">
              <Heart className="mx-auto text-gray-600 mb-3 animate-pulse" size={32} />
              <h4 className="text-sm font-semibold mb-1">Watchlist Empty</h4>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">Mark your favorite coins on the markets page to monitor price changes here.</p>
              <Link href="/markets">
                <button className="bg-white text-[#12132a] font-bold px-5 py-2.5 rounded-lg cursor-pointer text-[10px] tracking-wider uppercase transition">
                  Start Exploring
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 6. ORIGINAL PORTFOLIO, FEATURES SECTION */}
      <Portfolio />
      <Features />

      {/* 7. ASYMMETRICAL SECTORS & CATEGORIES */}
      <section className="py-12 px-6 md:px-12 bg-[#12132a] border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#00ffd5] font-bold">Categories Performance</span>
              <h2 className="text-2xl sm:text-3xl font-light mt-1 text-white">Market Sectors</h2>
            </div>
            <Link href="/categories" className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-semibold transition-all">
              Explore Categories <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES_DATA.slice(0, 4).map((cat, idx) => {
              const isPos = cat.avgChange24h >= 0;
              return (
                <div key={idx} className="border border-white/[0.04] bg-[#1a1b3a]/25 rounded-2xl p-6 hover:border-[#00ffd5]/40 transition duration-300 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-sm text-white">{cat.name}</h3>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${isPos ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                        {isPos ? "+" : ""}{cat.avgChange24h}%
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">{cat.description}</p>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500 border-t border-white/[0.04] pt-3 mt-4 font-mono">
                    <span>Tokens: {cat.tokensCount}</span>
                    <span>Cap: ${(cat.totalMarketCap / 1e9).toFixed(1)}B</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. ORIGINAL USER-CENTRIC SECTIONS */}
      <Member />
      <Support />
      <Group />
      <Testimonials />

      {/* 9. CRYPTO NEWS hub grid preview */}
      <section className="py-16 px-6 md:px-12 bg-[#12132a] border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#962f79] font-bold">Academy & News</span>
              <h2 className="text-2xl sm:text-3xl font-light mt-1 text-white">Latest Insights</h2>
            </div>
            <Link href="/news" className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-semibold transition-all">
              Explore News <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((article) => (
              <Link href={`/news/${article.id}`} key={article.id} className="block group">
                <div className="border border-white/[0.04] bg-[#1a1b3a]/25 hover:border-[#00ffd5] rounded-3xl p-6 h-full flex flex-col justify-between hover:scale-[1.01] transition-all duration-300">
                  <div className="space-y-4">
                    <div className="relative w-full h-44 bg-[#12132a] rounded-2xl overflow-hidden border border-white/[0.04]">
                      <Image
                        src={article.cover}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-w-768px) 100vw, 33vw"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                        <span className="text-[#00ffd5] font-bold">{article.category}</span>
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

                  <div className="flex items-center justify-between border-t border-white/[0.04] pt-4 mt-5 text-[11px] text-gray-500 group-hover:text-white transition">
                    <span>By {article.author}</span>
                    <ArrowRight size={12} className="text-[#00ffd5] group-hover:translate-x-0.5 transition" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10. MODERN VERCEL-STYLE CTA */}
      <section className="bg-[#12132a] py-20 px-6 md:px-12 border-t border-b border-white/[0.04] relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,213,0.03),transparent_60%)] pointer-events-none"></div>
        <div className="max-w-3xl mx-auto relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-light text-white leading-tight">
            Level up your <span className="bg-gradient-to-r from-[#00ffd5] to-[#962f79] bg-clip-text text-transparent font-medium">crypto knowledge</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xl mx-auto">
            Learn the core concepts of blockchain or monitor the real-time performance of hundreds of cryptocurrencies directly on your dashboard for free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/markets" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-white text-[#12132a] font-bold px-8 py-3.5 rounded-xl cursor-pointer text-xs tracking-wider uppercase transition shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                Explore Market
              </button>
            </Link>
            <Link href="/learn" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-white/[0.02] border border-white/10 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/[0.05] cursor-pointer text-xs tracking-wider uppercase transition">
                Learn Academy
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
