"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Layers, Database, Smile, BrainCircuit, Gamepad2, Image as ImageIcon, Coins, DollarSign, Building, ChevronRight } from "lucide-react";
import { COINS_DATA, CATEGORIES_DATA } from "@/lib/data";

const categoryIcons: Record<string, React.ReactNode> = {
  "Layer 1": <Layers className="text-blue-400" size={24} />,
  "Layer 2": <Database className="text-purple-400" size={24} />,
  "Meme Coin": <Smile className="text-yellow-400" size={24} />,
  "AI": <BrainCircuit className="text-emerald-400" size={24} />,
  "Gaming": <Gamepad2 className="text-red-400" size={24} />,
  "NFT": <ImageIcon className="text-[#00ffd5]" size={24} />,
  "DeFi": <Coins className="text-pink-400" size={24} />,
  "Stablecoin": <DollarSign className="text-green-400" size={24} />,
  "RWA": <Building className="text-orange-400" size={24} />,
};

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Layer 1");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Filter coins matching selected category
  const filteredCoins = useMemo(() => {
    return COINS_DATA.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  const renderCoinLogo = (symbol: string, id: string) => {
    const charCodeSum = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = charCodeSum % 360;
    return (
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-inner flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, hsl(${hue}, 70%, 45%), hsl(${(hue + 60) % 360}, 70%, 35%))`
        }}
      >
        {symbol.slice(0, 3)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#12132a] py-10 px-4 sm:px-8 md:px-20 text-white page-fade-in">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div>
          <span className="text-xs uppercase tracking-widest text-[#00ffd5] font-semibold">Sectors & Themes</span>
          <h1 className="text-3xl md:text-5xl font-light mt-1">Market Categories</h1>
          <p className="text-gray-400 text-sm mt-2 max-w-xl">
            Monitor cryptocurrency performance organized by industry sectors, technology classifications, utility applications, and ecosystem networks.
          </p>
        </div>

        {/* Categories Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_DATA.map((cat, idx) => {
            const isSelected = selectedCategory === cat.name;
            const isPos = cat.avgChange24h >= 0;
            return (
              <div
                key={idx}
                onClick={() => setSelectedCategory(cat.name)}
                className={`border rounded-3xl p-6 shadow-lg cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                  isSelected
                    ? "bg-gradient-to-r from-[#1f2148] to-[#1a1b3a] border-[#00ffd5] ring-1 ring-[#00ffd5]/30 shadow-[0_0_20px_rgba(0,255,213,0.15)]"
                    : "border-white/10 bg-[#1a1b3a]/50 hover:bg-[#1a1b3a] hover:border-white/20"
                }`}
              >
                {/* Glow inside selected card */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#00ffd5]/5 rounded-full blur-xl"></div>
                )}

                <div className="flex justify-between items-start mb-4">
                  <div className="bg-[#12132a] p-3 rounded-2xl border border-white/5 group-hover:scale-105 transition-all">
                    {categoryIcons[cat.name] || <Layers size={24} />}
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                      isPos ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {isPos ? "+" : ""}
                    {cat.avgChange24h}%
                  </span>
                </div>

                <h3 className="font-bold text-lg text-white mb-2 flex items-center gap-1 group-hover:text-[#00ffd5] transition">
                  {cat.name}
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4 min-h-[40px]">
                  {cat.description}
                </p>

                <div className="flex justify-between text-xs text-gray-500 border-t border-white/5 pt-3 font-mono">
                  <span>Tokens: {cat.tokensCount}</span>
                  <span>Total Cap: ${(cat.totalMarketCap / 1e9).toFixed(1)}B</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Category Details Table */}
        <div className="border border-white/10 bg-[#1a1b3a]/30 backdrop-blur-md rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                Asset Coin Listings: <span className="bg-gradient-to-r from-[#00ffd5] to-[#962f79] bg-clip-text text-transparent">{selectedCategory}</span>
              </h2>
              <p className="text-xs text-gray-400 mt-1">Showing all cryptocurrency assets classified under the theme {selectedCategory}.</p>
            </div>
            <span className="text-xs bg-[#12132a] border border-white/10 px-3 py-1.5 rounded-lg text-gray-400 font-mono">
              Total {filteredCoins.length} Listed Coins
            </span>
          </div>

          {isLoading ? (
            <div className="text-center py-10 space-y-2">
              <div className="w-8 h-8 border-2 border-[#00ffd5] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-xs text-gray-400">Loading assets...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/5 text-gray-400 text-xs uppercase tracking-wider font-mono">
                    <th className="py-3 px-2 w-12 text-center">#</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4 text-right">Price</th>
                    <th className="py-3 px-4 text-right">24H %</th>
                    <th className="py-3 px-4 text-right">Market Cap</th>
                    <th className="py-3 px-4 text-right">Volume</th>
                    <th className="py-3 px-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoins.map((coin, idx) => {
                    const isPos = coin.change24h >= 0;
                    return (
                      <tr
                        key={coin.id}
                        className="border-b border-white/5 hover:bg-white/5 transition duration-200"
                      >
                        <td className="py-4 px-2 text-center font-mono text-gray-500 text-xs">
                          {idx + 1}
                        </td>
                        <td className="py-4 px-4">
                          <Link href={`/coin/${coin.id}`} className="flex items-center gap-3 group">
                            {renderCoinLogo(coin.symbol, coin.id)}
                            <div>
                              <span className="font-bold text-white group-hover:text-[#00ffd5] transition">
                                {coin.name}
                              </span>
                              <span className="ml-2 text-xs bg-white/10 text-gray-400 px-1.5 py-0.5 rounded font-mono font-semibold">
                                {coin.symbol}
                              </span>
                            </div>
                          </Link>
                        </td>
                        <td className="py-4 px-4 text-right font-mono font-semibold">
                          ${coin.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                        </td>
                        <td
                          className={`py-4 px-4 text-right font-mono font-bold ${
                            isPos ? "text-emerald-400" : "text-red-400"
                          }`}
                        >
                          {isPos ? "+" : ""}
                          {coin.change24h}%
                        </td>
                        <td className="py-4 px-4 text-right font-mono text-gray-300">
                          ${coin.marketCap.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-right font-mono text-gray-300">
                          ${coin.volume24h.toLocaleString()}
                        </td>
                        <td className="py-4 px-2 text-center">
                          <Link href={`/coin/${coin.id}`}>
                            <button className="bg-[#12132a] border border-white/10 hover:border-[#00ffd5] text-xs font-semibold px-2.5 py-1.5 rounded-lg text-gray-300 hover:text-white cursor-pointer transition">
                              Details
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
