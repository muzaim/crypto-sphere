"use client";

import React, { use, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Star, Globe, FileText, Compass, Twitter, MessageCircle, Share2, ArrowLeft, ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { COINS_DATA, NEWS_DATA } from "@/lib/data";
import { useWatchlist } from "@/lib/watchlist-context";
import { CoinChart } from "@/components/coin-chart";
import { Sparkline } from "@/components/sparkline";
import { DetailSkeleton } from "@/components/skeleton";

export default function CoinDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const [isLoading, setIsLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 550);
    return () => clearTimeout(timer);
  }, [id]);

  const coin = useMemo(() => {
    return COINS_DATA.find((c) => c.id === id);
  }, [id]);

  const similarCoins = useMemo(() => {
    if (!coin) return [];
    return COINS_DATA.filter((c) => c.category === coin.category && c.id !== coin.id).slice(0, 4);
  }, [coin]);

  const relatedNews = useMemo(() => {
    if (!coin) return [];
    const matched = NEWS_DATA.filter((n) =>
      n.tags.includes(coin.id) || n.tags.includes(coin.category.toLowerCase().replace(" ", "-"))
    );
    return matched.length > 0 ? matched.slice(0, 2) : NEWS_DATA.slice(0, 2);
  }, [coin]);

  const handleCopyLink = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const renderCoinLogo = (symbol: string, coinId: string, size = "w-10 h-10 text-xs") => {
    const charCodeSum = coinId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = charCodeSum % 360;
    return (
      <div 
        className={`${size} rounded-full flex items-center justify-center font-bold text-white shadow-inner flex-shrink-0`}
        style={{
          background: `linear-gradient(135deg, hsl(${hue}, 70%, 45%), hsl(${(hue + 60) % 360}, 70%, 35%))`
        }}
      >
        {symbol.slice(0, 3)}
      </div>
    );
  };

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (!coin) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 page-fade-in">
        <h2 className="text-2xl font-semibold mb-2">Coin Not Found</h2>
        <p className="text-gray-500 text-xs max-w-sm mb-6">
          The cryptocurrency asset &quot;{id}&quot; is not registered in our system.
        </p>
        <Link href="/markets">
          <button className="bg-white text-[#12132a] font-bold px-6 py-2.5 rounded-xl cursor-pointer text-xs tracking-wider uppercase">
            Back to Markets
          </button>
        </Link>
      </div>
    );
  }

  const isFav = isInWatchlist(coin.id);

  return (
    <div className="min-h-screen bg-[#12132a] py-8 px-6 md:px-12 text-white page-fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Breadcrumb */}
        <div>
          <Link href="/markets" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition text-xs font-semibold uppercase tracking-wider">
            <ArrowLeft size={14} /> Back to Markets List
          </Link>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/[0.04]">
          <div className="flex items-center gap-4">
            {renderCoinLogo(coin.symbol, coin.id, "w-14 h-14 text-sm")}
            <div>
              <div className="flex items-center flex-wrap gap-2.5">
                <h1 className="text-3xl font-extralight tracking-tight">{coin.name}</h1>
                <span className="text-[10px] bg-white/[0.04] border border-white/[0.08] text-gray-400 px-2 py-0.5 rounded font-mono font-bold">{coin.symbol}</span>
                <span className="text-[9px] bg-gradient-to-r from-[#962f79] to-[#00ffd5] text-white font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Rank #{COINS_DATA.findIndex((c) => c.id === coin.id) + 1}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1.5 font-semibold">
                Network: <span className="text-[#00ffd5]">{coin.blockchain}</span> • Category: <span className="text-gray-400">{coin.category}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Watchlist toggle */}
            <button
              onClick={() => toggleWatchlist(coin.id)}
              className={`flex-grow md:flex-grow-0 flex items-center justify-center gap-2 border px-5 py-2.5 rounded-xl transition cursor-pointer text-xs font-bold uppercase tracking-wider ${
                isFav
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                  : "border-white/10 hover:border-white hover:bg-white/5"
              }`}
            >
              <Star size={14} fill={isFav ? "currentColor" : "none"} />
              {isFav ? "Watchlisted" : "Add Tracker"}
            </button>

            {/* Share */}
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center p-2.5 border border-white/10 rounded-xl hover:bg-white/5 hover:border-white transition cursor-pointer text-gray-300 hover:text-white"
              title="Copy URL"
            >
              {copiedLink ? <Check size={14} className="text-[#00ffd5]" /> : <Share2 size={14} />}
            </button>
          </div>
        </div>

        {/* 2:1 Dashboard Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 2/3 COLUMN */}
          <div className="lg:col-span-8 space-y-8">
            {/* Interactive SVG Chart */}
            <CoinChart historyData={coin.history30d} coinSymbol={coin.symbol} change24h={coin.change24h} />

            {/* About Coin Block */}
            <div className="border border-white/[0.04] bg-[#1a1b3a]/15 rounded-3xl p-8 shadow-xl relative">
              <h2 className="text-lg font-bold mb-4 text-white">About {coin.name}</h2>
              <div className="text-gray-400 text-sm leading-relaxed space-y-4">
                <p>{coin.about}</p>
                <p>
                  The {coin.name} asset ({coin.symbol}) is a cryptographic token operating in a decentralized manner within the {coin.blockchain} blockchain ecosystem. Utilizing a public ledger consensus structure, this coin can be sent directly peer-to-peer without traditional financial intermediaries.
                </p>
              </div>

              {/* Tags Grid */}
              <div className="mt-6 pt-6 border-t border-white/[0.04]">
                <h4 className="text-[10px] uppercase tracking-widest text-[#962f79] font-bold mb-3">Tags & Classifications</h4>
                <div className="flex flex-wrap gap-2">
                  {coin.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] bg-white/[0.02] border border-white/10 px-2.5 py-1 rounded-xl text-gray-400 font-mono font-bold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Accordion Section */}
            <div className="border border-white/[0.04] bg-[#1a1b3a]/15 rounded-3xl p-8 shadow-xl">
              <h2 className="text-lg font-bold mb-6 text-white">Frequently Asked Questions (FAQ)</h2>
              <div className="space-y-4">
                {coin.faq.map((item, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div key={idx} className="border-b border-white/[0.04] pb-4 last:border-b-0 last:pb-0">
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full flex justify-between items-center text-left py-2.5 cursor-pointer group"
                      >
                        <span className="font-semibold text-white group-hover:text-[#00ffd5] transition text-sm">
                          {item.question}
                        </span>
                        <ChevronDown 
                          size={16} 
                          className={`text-gray-500 transition-all duration-300 ${isOpen ? "rotate-180 text-[#00ffd5]" : ""}`} 
                        />
                      </button>
                      <div
                        className={`transition-all duration-300 overflow-hidden text-gray-400 text-xs sm:text-sm leading-relaxed ${
                          isOpen ? "max-h-[300px] mt-2 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="bg-[#12132a]/60 p-4 rounded-2xl border border-white/[0.04]">{item.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT 1/3 COLUMN (Sidebar Stats) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Price Stats Card */}
            <div className="border border-white/[0.04] bg-[#1a1b3a]/30 rounded-3xl p-6 shadow-xl space-y-5">
              <h3 className="text-xs uppercase tracking-widest text-[#00ffd5] font-bold border-b border-white/[0.04] pb-3">Market Metrics</h3>
              
              <div className="space-y-4 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-500">Current Price</span>
                  <span className="font-bold text-white">
                    ${coin.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Market Capitalization</span>
                  <span className="font-bold text-white">${coin.marketCap.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">24H Trading Volume</span>
                  <span className="font-semibold text-gray-200">${coin.volume24h.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-white/[0.04] pt-4">
                  <span className="text-gray-500">All Time High (ATH)</span>
                  <div className="text-right">
                    <p className="font-bold text-[#00ffd5]">${coin.ath.toLocaleString()}</p>
                    <p className="text-[9px] text-gray-500">2 months ago</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">All Time Low (ATL)</span>
                  <div className="text-right">
                    <p className="font-bold text-red-400">${coin.atl.toLocaleString()}</p>
                    <p className="text-[9px] text-gray-500">3 years ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Supply Metrics Card */}
            <div className="border border-white/[0.04] bg-[#1a1b3a]/30 rounded-3xl p-6 shadow-xl space-y-5">
              <h3 className="text-xs uppercase tracking-widest text-[#962f79] font-bold border-b border-white/[0.04] pb-3">Supply Statistics</h3>
              
              <div className="space-y-4 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-500">Circulating Supply</span>
                  <span className="font-bold text-white">{coin.circulatingSupply.toLocaleString()} {coin.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Supply</span>
                  <span className="font-semibold text-gray-200">{coin.totalSupply.toLocaleString()} {coin.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Max Supply</span>
                  <span className="font-semibold text-gray-200">
                    {coin.maxSupply ? `${coin.maxSupply.toLocaleString()} ${coin.symbol}` : "Unlimited"}
                  </span>
                </div>
                
                {coin.maxSupply && (
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-[9px] text-gray-500">
                      <span>Circulation Progress</span>
                      <span>{((coin.circulatingSupply / coin.maxSupply) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#962f79] to-[#00ffd5]"
                        style={{ width: `${(coin.circulatingSupply / coin.maxSupply) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Official Links Card */}
            <div className="border border-white/[0.04] bg-[#1a1b3a]/30 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold border-b border-white/[0.04] pb-2">Official Channels</h3>
              
              <div className="flex flex-col gap-2 text-xs">
                <a
                  href={coin.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/[0.02] border border-white/10 hover:border-white p-2.5 rounded-xl transition cursor-pointer"
                >
                  <Globe size={14} className="text-[#00ffd5]" />
                  <span className="font-semibold text-gray-300">Official Website</span>
                  <ArrowUpRight size={12} className="ml-auto text-gray-500" />
                </a>

                <a
                  href={coin.whitepaper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/[0.02] border border-white/10 hover:border-white p-2.5 rounded-xl transition cursor-pointer"
                >
                  <FileText size={14} className="text-[#962f79]" />
                  <span className="font-semibold text-gray-300">Whitepaper Contract</span>
                  <ArrowUpRight size={12} className="ml-auto text-gray-500" />
                </a>

                <a
                  href={coin.explorer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/[0.02] border border-white/10 hover:border-white p-2.5 rounded-xl transition cursor-pointer"
                >
                  <Compass size={14} className="text-blue-400" />
                  <span className="font-semibold text-gray-300">Blockchain Explorer</span>
                  <ArrowUpRight size={12} className="ml-auto text-gray-500" />
                </a>
              </div>

              <div className="flex gap-2 pt-2">
                {coin.socialLinks.twitter && (
                  <a
                    href={coin.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex justify-center py-2 bg-[#12132a] border border-white/10 hover:border-white rounded-lg text-gray-400 hover:text-white transition cursor-pointer"
                  >
                    <Twitter size={14} />
                  </a>
                )}
                {coin.socialLinks.telegram && (
                  <a
                    href={coin.socialLinks.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex justify-center py-2 bg-[#12132a] border border-white/10 hover:border-white rounded-lg text-gray-400 hover:text-white transition cursor-pointer"
                  >
                    <MessageCircle size={14} />
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Related News section */}
        <div className="border border-white/[0.04] bg-[#1a1b3a]/15 rounded-3xl p-8 shadow-xl">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-lg font-bold text-white">Related News for {coin.name}</h2>
            <Link href="/news" className="text-[#00ffd5] hover:underline text-xs font-semibold">
              View All News
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedNews.map((article) => (
              <Link href={`/news/${article.id}`} key={article.id} className="block group">
                <div className="border border-white/[0.04] bg-[#12132a]/60 hover:bg-[#12132a] hover:border-[#962f79] rounded-2xl p-5 h-full flex flex-col justify-between transition duration-300">
                  <div className="space-y-2">
                    <span className="text-[9px] text-[#00ffd5] bg-[#00ffd5]/10 px-2 py-0.5 rounded font-extrabold uppercase tracking-wider">
                      {article.category}
                    </span>
                    <h3 className="font-bold text-sm text-white group-hover:text-[#00ffd5] transition leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2">{article.summary}</p>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-4 border-t border-white/[0.04] pt-3">
                    {article.author} • {article.publishDate}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Similar Coins Carousel */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-white">Similar Coins ({coin.category})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarCoins.map((sc) => {
              const isScPos = sc.change24h >= 0;
              return (
                <Link href={`/coin/${sc.id}`} key={sc.id} className="block group">
                  <div className="border border-white/[0.04] bg-[#1a1b3a]/25 hover:bg-[#1a1b3a] hover:border-[#00ffd5] rounded-2xl p-5 transition duration-300 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2.5">
                          {renderCoinLogo(sc.symbol, sc.id, "w-8 h-8 text-[10px]")}
                          <div>
                            <h4 className="font-bold text-xs text-white group-hover:text-[#00ffd5] transition">{sc.symbol}</h4>
                            <p className="text-[9px] text-gray-500">{sc.name}</p>
                          </div>
                        </div>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${isScPos ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                          {isScPos ? "+" : ""}{sc.change24h}%
                        </span>
                      </div>
                      
                      <div className="space-y-0.5">
                        <span className="text-[9px] text-gray-500 uppercase font-bold">Price</span>
                        <p className="font-bold font-mono text-sm">${sc.price.toLocaleString("en-US", { maximumFractionDigits: 4 })}</p>
                      </div>
                    </div>

                    <div className="flex justify-center pt-4 border-t border-white/[0.04] mt-4">
                      <Sparkline data={sc.sparkline} change24h={sc.change7d} width={130} height={25} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
