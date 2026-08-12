"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, Star, ArrowUpDown, ChevronLeft, ChevronRight, Info, RefreshCw } from "lucide-react";
import { COINS_DATA, Coin } from "@/lib/data";
import { useWatchlist } from "@/lib/watchlist-context";
import { Sparkline } from "@/components/sparkline";
import { TableSkeleton } from "@/components/skeleton";

export default function Markets() {
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [blockchainFilter, setBlockchainFilter] = useState("All");
  const [capFilter, setCapFilter] = useState("All");
  const [volumeFilter, setVolumeFilter] = useState("All");

  // Sort States
  const [sortField, setSortField] = useState<keyof Coin | "rank">("marketCap");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10;

  // Simulate premium loading state on mount
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Unique list of Blockchains in our data
  const blockchainsList = useMemo(() => {
    const chains = new Set<string>();
    COINS_DATA.forEach((c) => chains.add(c.blockchain));
    return Array.from(chains).sort();
  }, []);

  // Filter Coins
  const filteredCoins = useMemo(() => {
    return COINS_DATA.filter((coin) => {
      const matchSearch =
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        categoryFilter === "All" || coin.category === categoryFilter;

      const matchBlockchain =
        blockchainFilter === "All" || coin.blockchain === blockchainFilter;

      let matchCap = true;
      if (capFilter === "Large") matchCap = coin.marketCap >= 10e9;
      else if (capFilter === "Mid") matchCap = coin.marketCap >= 1e9 && coin.marketCap < 10e9;
      else if (capFilter === "Small") matchCap = coin.marketCap < 1e9;

      let matchVolume = true;
      if (volumeFilter === "High") matchVolume = coin.volume24h >= 1e9;
      else if (volumeFilter === "Mid") matchVolume = coin.volume24h >= 100e6 && coin.volume24h < 1e9;
      else if (volumeFilter === "Low") matchVolume = coin.volume24h < 100e6;

      return matchSearch && matchCategory && matchBlockchain && matchCap && matchVolume;
    });
  }, [search, categoryFilter, blockchainFilter, capFilter, volumeFilter]);

  // Sort Coins
  const sortedCoins = useMemo(() => {
    const sorted = [...filteredCoins];
    
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
  }, [filteredCoins, sortField, sortOrder]);

  // Paginated Coins
  const paginatedCoins = useMemo(() => {
    const startIndex = (currentPage - 1) * coinsPerPage;
    return sortedCoins.slice(startIndex, startIndex + coinsPerPage);
  }, [sortedCoins, currentPage]);

  const totalPages = Math.ceil(sortedCoins.length / coinsPerPage);

  const handleSort = (field: keyof Coin | "rank") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-white/[0.04]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#00ffd5] font-bold">Trading Center</span>
            <h1 className="text-3xl sm:text-4xl font-extralight tracking-tight mt-1">Markets Live Data</h1>
            <p className="text-gray-400 text-xs mt-1.5 max-w-lg leading-relaxed">
              Track real-time pricing, market capitalization, and 24-hour volume changes with integrated sparkline visual trends.
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 bg-white/[0.02] border border-white/10 hover:border-white px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer text-gray-300 hover:text-white"
          >
            <RefreshCw size={14} className={isLoading ? "animate-spin text-[#00ffd5]" : ""} /> Refresh Markets
          </button>
        </div>

        {/* Unified Linear-style Control Bar */}
        <div className="border border-white/[0.04] bg-[#1a1b3a]/30 backdrop-blur-md rounded-2xl p-4 shadow-lg space-y-3 relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Input Box */}
            <div className="relative flex-grow max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-500">
                <Search size={14} />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search asset name or ticker..."
                className="w-full bg-[#12132a]/80 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#962f79] focus:ring-1 focus:ring-[#962f79]/20 transition"
              />
            </div>

            {/* Filter Dropdowns container */}
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* Category */}
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-[#12132a]/85 border border-white/10 rounded-xl py-2 px-3 text-xs text-gray-300 focus:outline-none focus:border-[#962f79] cursor-pointer"
              >
                <option value="All">Category: All</option>
                <option value="Layer 1">Layer 1</option>
                <option value="Layer 2">Layer 2</option>
                <option value="Meme Coin">Meme Coin</option>
                <option value="AI">AI</option>
                <option value="Gaming">Gaming</option>
                <option value="NFT">NFT</option>
                <option value="DeFi">DeFi</option>
                <option value="Stablecoin">Stablecoin</option>
                <option value="RWA">RWA</option>
              </select>

              {/* Blockchain */}
              <select
                value={blockchainFilter}
                onChange={(e) => {
                  setBlockchainFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-[#12132a]/85 border border-white/10 rounded-xl py-2 px-3 text-xs text-gray-300 focus:outline-none focus:border-[#962f79] cursor-pointer"
              >
                <option value="All">Ecosystem: All</option>
                {blockchainsList.map((chain) => (
                  <option key={chain} value={chain}>
                    {chain}
                  </option>
                ))}
              </select>

              {/* Cap */}
              <select
                value={capFilter}
                onChange={(e) => {
                  setCapFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-[#12132a]/85 border border-white/10 rounded-xl py-2 px-3 text-xs text-gray-300 focus:outline-none focus:border-[#962f79] cursor-pointer"
              >
                <option value="All">Market Cap: All</option>
                <option value="Large">Large Cap (&ge;$10B)</option>
                <option value="Mid">Mid Cap ($1B-$10B)</option>
                <option value="Small">Small Cap (&lt;$1B)</option>
              </select>

              {/* Volume */}
              <select
                value={volumeFilter}
                onChange={(e) => {
                  setVolumeFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-[#12132a]/85 border border-white/10 rounded-xl py-2 px-3 text-xs text-gray-300 focus:outline-none focus:border-[#962f79] cursor-pointer"
              >
                <option value="All">Volume: All</option>
                <option value="High">High Vol (&ge;$1B)</option>
                <option value="Mid">Mid Vol ($100M-$1B)</option>
                <option value="Low">Low Vol (&lt;$100M)</option>
              </select>

            </div>
          </div>
        </div>

        {/* Clean Table Design */}
        <div className="border border-white/[0.04] bg-[#1a1b3a]/15 backdrop-blur-md rounded-3xl p-6 shadow-xl relative overflow-x-auto">
          {isLoading ? (
            <TableSkeleton rows={coinsPerPage} />
          ) : sortedCoins.length > 0 ? (
            <div className="min-w-full">
              <table className="w-full text-left border-collapse">
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
                    <th className="py-3 px-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCoins.map((coin) => {
                    const globalRank = COINS_DATA.findIndex((c) => c.id === coin.id) + 1;
                    const isFav = mounted && isInWatchlist(coin.id);
                    const is24Pos = coin.change24h >= 0;
                    const is7Pos = coin.change7d >= 0;

                    return (
                      <tr
                        key={coin.id}
                        className="border-b border-white/[0.04] hover:bg-white/[0.01] transition duration-200 text-sm group"
                      >
                        {/* Watchlist toggle */}
                        <td className="py-4 px-2">
                          <button
                            onClick={() => toggleWatchlist(coin.id)}
                            className={`cursor-pointer hover:scale-110 transition ${
                              isFav ? "text-amber-400" : "text-gray-600 hover:text-white"
                            }`}
                          >
                            <Star size={14} fill={isFav ? "currentColor" : "none"} />
                          </button>
                        </td>

                        {/* Rank */}
                        <td className="py-4 px-2 text-center text-gray-500 font-mono text-xs">
                          {globalRank}
                        </td>

                        {/* Coin name / ticker */}
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
                              <span className="block lg:hidden text-[9px] text-gray-500 font-mono mt-0.5 font-bold uppercase">
                                {coin.blockchain} • {coin.category}
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

                        {/* 24h % */}
                        <td
                          className={`py-4 px-4 text-right font-mono font-bold ${
                            is24Pos ? "text-emerald-400" : "text-red-400"
                          }`}
                        >
                          {is24Pos ? "+" : ""}
                          {coin.change24h}%
                        </td>

                        {/* 7d % */}
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

                        {/* Mini Sparkline Chart */}
                        <td className="py-4 px-4 hidden xl:table-cell">
                          <div className="flex justify-center">
                            <Sparkline data={coin.sparkline} change24h={coin.change7d} />
                          </div>
                        </td>

                        {/* Action buttons */}
                        <td className="py-4 px-2 text-center">
                          <Link href={`/coin/${coin.id}`}>
                            <button className="bg-white/[0.02] border border-white/10 hover:border-[#00ffd5] text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg text-gray-300 hover:text-white cursor-pointer transition">
                              Detail
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-12 px-4">
              <Info className="mx-auto text-gray-500 mb-3" size={32} />
              <h3 className="text-base font-semibold mb-1">Asset not found</h3>
              <p className="text-gray-500 text-xs max-w-sm mx-auto mb-5 leading-relaxed">
                No coins match the current search or filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategoryFilter("All");
                  setBlockchainFilter("All");
                  setCapFilter("All");
                  setVolumeFilter("All");
                }}
                className="bg-white text-[#12132a] font-bold px-5 py-2.5 rounded-xl cursor-pointer text-[10px] tracking-widest uppercase hover:bg-gray-100 transition"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Minimal Pagination */}
          {!isLoading && sortedCoins.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t border-white/[0.04]">
              <span className="text-[11px] text-gray-500 font-mono">
                Showing {(currentPage - 1) * coinsPerPage + 1} -{" "}
                {Math.min(currentPage * coinsPerPage, sortedCoins.length)} of{" "}
                {sortedCoins.length} coins
              </span>

              {totalPages > 1 && (
                <div className="flex items-center gap-3">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="p-2 border border-white/10 rounded-xl bg-white/[0.01] text-gray-400 hover:text-white disabled:opacity-20 disabled:pointer-events-none transition cursor-pointer"
                  >
                    <ChevronLeft size={14} />
                  </button>

                  <span className="text-xs text-gray-400 font-mono">
                    Page <span className="text-white font-bold">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
                  </span>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="p-2 border border-white/10 rounded-xl bg-white/[0.01] text-gray-400 hover:text-white disabled:opacity-20 disabled:pointer-events-none transition cursor-pointer"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
