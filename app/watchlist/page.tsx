"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Star, Heart, Trash2, ArrowUpDown } from "lucide-react";
import { COINS_DATA, Coin } from "@/lib/data";
import { useWatchlist } from "@/lib/watchlist-context";
import { Sparkline } from "@/components/sparkline";
import { TableSkeleton } from "@/components/skeleton";

export default function WatchlistPage() {
  const { watchlist, toggleWatchlist } = useWatchlist();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sorting inside watchlist
  const [sortField, setSortField] = useState<keyof Coin | "rank">("marketCap");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const watchlistedCoins = useMemo(() => {
    if (!mounted) return [];
    return COINS_DATA.filter((c) => watchlist.includes(c.id));
  }, [watchlist, mounted]);

  const sortedCoins = useMemo(() => {
    const sorted = [...watchlistedCoins];
    sorted.sort((a, b) => {
      const aVal = sortField === "rank" ? COINS_DATA.findIndex((c) => c.id === a.id) : a[sortField as keyof Coin];
      const bVal = sortField === "rank" ? COINS_DATA.findIndex((c) => c.id === b.id) : b[sortField as keyof Coin];

      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      } else if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
    return sorted;
  }, [watchlistedCoins, sortField, sortOrder]);

  const handleSort = (field: keyof Coin | "rank") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

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
    <div className="min-h-screen bg-[#12132a] py-8 px-6 md:px-12 text-white page-fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="pb-4 border-b border-white/[0.04]">
          <span className="text-xs uppercase tracking-widest text-[#00ffd5] font-bold">Personal Tracker</span>
          <h1 className="text-3xl sm:text-4xl font-extralight tracking-tight mt-1">My Watchlist</h1>
          <p className="text-gray-400 text-xs mt-1.5 max-w-lg leading-relaxed">
            Monitor your selected crypto assets in real-time. Manage your tracking portfolio with a simplified dashboard.
          </p>
        </div>

        {/* Watchlist Main Container */}
        {isLoading ? (
          <div className="border border-white/[0.04] bg-[#1a1b3a]/30 rounded-3xl p-6 shadow-xl">
            <TableSkeleton rows={3} />
          </div>
        ) : mounted && watchlistedCoins.length > 0 ? (
          <div className="border border-white/[0.04] bg-[#1a1b3a]/15 backdrop-blur-md rounded-3xl p-6 shadow-xl relative overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/[0.04] text-gray-500 text-xs tracking-wider uppercase font-semibold">
                  <th className="py-3 px-2 w-8"></th>
                  <th className="py-3 px-2 cursor-pointer select-none text-center w-12" onClick={() => handleSort("rank")}>
                    <div className="flex items-center justify-center gap-1 font-mono"># <ArrowUpDown size={10} /></div>
                  </th>
                  <th className="py-3 px-4 cursor-pointer select-none" onClick={() => handleSort("name")}>
                    <div className="flex items-center gap-1">Coin Asset <ArrowUpDown size={10} /></div>
                  </th>
                  <th className="py-3 px-4 text-right cursor-pointer select-none" onClick={() => handleSort("price")}>
                    <div className="flex items-center justify-end gap-1">Price <ArrowUpDown size={10} /></div>
                  </th>
                  <th className="py-3 px-4 text-right cursor-pointer select-none" onClick={() => handleSort("change24h")}>
                    <div className="flex items-center justify-end gap-1">24H % <ArrowUpDown size={10} /></div>
                  </th>
                  <th className="py-3 px-4 text-right cursor-pointer select-none hidden sm:table-cell" onClick={() => handleSort("change7d")}>
                    <div className="flex items-center justify-end gap-1">7D % <ArrowUpDown size={10} /></div>
                  </th>
                  <th className="py-3 px-4 text-right cursor-pointer select-none hidden md:table-cell" onClick={() => handleSort("marketCap")}>
                    <div className="flex items-center justify-end gap-1">Market Cap <ArrowUpDown size={10} /></div>
                  </th>
                  <th className="py-3 px-4 text-right cursor-pointer select-none hidden lg:table-cell" onClick={() => handleSort("volume24h")}>
                    <div className="flex items-center justify-end gap-1">Volume (24H) <ArrowUpDown size={10} /></div>
                  </th>
                  <th className="py-3 px-4 text-center hidden xl:table-cell">7D Trend</th>
                  <th className="py-3 px-2 text-center">Remove</th>
                </tr>
              </thead>
              <tbody>
                {sortedCoins.map((coin) => {
                  const globalRank = COINS_DATA.findIndex((c) => c.id === coin.id) + 1;
                  const is24Pos = coin.change24h >= 0;
                  const is7Pos = coin.change7d >= 0;

                  return (
                    <tr
                      key={coin.id}
                      className="border-b border-white/[0.04] hover:bg-white/[0.01] transition duration-200 text-sm group"
                    >
                      {/* Star active */}
                      <td className="py-4 px-2">
                        <button
                          onClick={() => toggleWatchlist(coin.id)}
                          className="cursor-pointer text-amber-400 hover:scale-110 transition"
                        >
                          <Star size={14} fill="currentColor" />
                        </button>
                      </td>

                      {/* Rank */}
                      <td className="py-4 px-2 text-center text-gray-500 font-mono text-xs">
                        {globalRank}
                      </td>

                      {/* Logo + Name */}
                      <td className="py-4 px-4">
                        <Link href={`/coin/${coin.id}`} className="flex items-center gap-3">
                          {renderCoinLogo(coin.symbol, coin.id)}
                          <div>
                            <span className="font-bold text-white group-hover:text-[#00ffd5] transition">
                              {coin.name}
                            </span>
                            <span className="ml-2 text-[10px] bg-white/[0.04] border border-white/[0.08] text-gray-400 px-1.5 py-0.5 rounded font-mono font-bold">
                              {coin.symbol}
                            </span>
                          </div>
                        </Link>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 text-right font-mono font-bold text-gray-100">
                        ${coin.price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 8,
                        })}
                      </td>

                      {/* 24h change */}
                      <td
                        className={`py-4 px-4 text-right font-mono font-bold ${
                          is24Pos ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {is24Pos ? "+" : ""}
                        {coin.change24h}%
                      </td>

                      {/* 7d change */}
                      <td
                        className={`py-4 px-4 text-right font-mono font-bold hidden sm:table-cell ${
                          is7Pos ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {is7Pos ? "+" : ""}
                        {coin.change7d}%
                      </td>

                      {/* Market Cap */}
                      <td className="py-4 px-4 text-right font-mono text-gray-300 text-xs hidden md:table-cell">
                        ${coin.marketCap.toLocaleString()}
                      </td>

                      {/* Volume */}
                      <td className="py-4 px-4 text-right font-mono text-gray-300 text-xs hidden lg:table-cell">
                        ${coin.volume24h.toLocaleString()}
                      </td>

                      {/* Sparkline */}
                      <td className="py-4 px-4 hidden xl:table-cell">
                        <div className="flex justify-center">
                          <Sparkline data={coin.sparkline} change24h={coin.change7d} />
                        </div>
                      </td>

                      {/* Delete */}
                      <td className="py-4 px-2 text-center">
                        <button
                          onClick={() => toggleWatchlist(coin.id)}
                          className="text-gray-500 hover:text-red-400 transition cursor-pointer p-1.5 hover:bg-red-500/10 rounded-lg"
                          title="Remove from watchlist"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty Watchlist State */
          <div className="border border-white/[0.04] bg-[#1a1b3a]/15 rounded-3xl p-16 text-center max-w-md mx-auto shadow-2xl relative overflow-hidden page-fade-in glow-purple">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#962f79]/5 rounded-full blur-xl animate-pulse"></div>
            <Heart className="mx-auto text-gray-600 mb-4 animate-pulse text-[#962f79]/80" size={48} />
            <h3 className="text-base font-bold mb-1">Your Watchlist is Empty</h3>
            <p className="text-gray-400 text-xs max-w-xs mx-auto mb-6 leading-relaxed">
              You have not watchlisted any coins yet. Mark your favorite assets on the markets page to track them in real-time.
            </p>
            <Link href="/markets">
              <button className="bg-white text-[#12132a] font-bold px-6 py-2.5 rounded-xl cursor-pointer text-[10px] tracking-widest uppercase hover:bg-gray-100 transition shadow-lg">
                Explore Markets
              </button>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
