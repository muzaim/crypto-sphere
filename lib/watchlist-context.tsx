"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface WatchlistContextType {
  watchlist: string[];
  toggleWatchlist: (coinId: string) => void;
  isInWatchlist: (coinId: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cryptosphere_watchlist");
      if (stored) {
        setWatchlist(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading watchlist from localStorage:", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when watchlist changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("cryptosphere_watchlist", JSON.stringify(watchlist));
    } catch (e) {
      console.error("Error saving watchlist to localStorage:", e);
    }
  }, [watchlist, isLoaded]);

  const toggleWatchlist = (coinId: string) => {
    setWatchlist((prev) =>
      prev.includes(coinId)
        ? prev.filter((id) => id !== coinId)
        : [...prev, coinId]
    );
  };

  const isInWatchlist = (coinId: string) => {
    return watchlist.includes(coinId);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};
