import React from "react";

// Table Row Loading Skeleton
export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 10 }) => {
  return (
    <div className="w-full animate-pulse border-collapse">
      <div className="space-y-4">
        {/* Table Header mock */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 px-4">
          <div className="h-4 bg-white/10 rounded w-8"></div>
          <div className="h-4 bg-white/10 rounded w-28"></div>
          <div className="h-4 bg-white/10 rounded w-20"></div>
          <div className="h-4 bg-white/10 rounded w-16"></div>
          <div className="h-4 bg-white/10 rounded w-16 flex-1 max-w-[120px] hidden sm:block"></div>
          <div className="h-4 bg-white/10 rounded w-28 hidden md:block"></div>
          <div className="h-4 bg-white/10 rounded w-28 hidden lg:block"></div>
          <div className="h-4 bg-white/10 rounded w-24 hidden xl:block"></div>
          <div className="h-4 bg-white/10 rounded w-12"></div>
        </div>

        {/* Table Rows mock */}
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-4 border-b border-white/5 px-4"
          >
            {/* ID */}
            <div className="h-4 bg-white/10 rounded w-4"></div>
            {/* Coin Name / Symbol */}
            <div className="flex items-center gap-3 w-28">
              <div className="w-8 h-8 rounded-full bg-white/10"></div>
              <div className="space-y-2">
                <div className="h-3 bg-white/10 rounded w-16"></div>
                <div className="h-2 bg-white/10 rounded w-10"></div>
              </div>
            </div>
            {/* Price */}
            <div className="h-4 bg-white/10 rounded w-16"></div>
            {/* 24h Change */}
            <div className="h-4 bg-white/10 rounded w-12"></div>
            {/* 7d Change */}
            <div className="h-4 bg-white/10 rounded w-12 hidden sm:block"></div>
            {/* Market Cap */}
            <div className="h-4 bg-white/10 rounded w-20 hidden md:block"></div>
            {/* Volume */}
            <div className="h-4 bg-white/10 rounded w-20 hidden lg:block"></div>
            {/* Sparkline */}
            <div className="h-10 bg-white/5 rounded w-28 hidden xl:block"></div>
            {/* Action button */}
            <div className="h-8 bg-white/10 rounded-full w-10"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Grid Card Loading Skeleton (for News, Learn articles)
export const CardSkeleton: React.FC<{ cards?: number }> = ({ cards = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: cards }).map((_, i) => (
        <div
          key={i}
          className="border border-white/10 bg-white/5 rounded-3xl p-6 space-y-4 animate-pulse"
        >
          {/* Cover image */}
          <div className="w-full h-48 bg-white/10 rounded-2xl"></div>
          {/* Tag */}
          <div className="h-3 bg-white/10 rounded w-1/4"></div>
          {/* Title */}
          <div className="space-y-2">
            <div className="h-4 bg-white/10 rounded w-full"></div>
            <div className="h-4 bg-white/10 rounded w-3/4"></div>
          </div>
          {/* Author / Date */}
          <div className="flex items-center gap-2 pt-2">
            <div className="w-6 h-6 rounded-full bg-white/10"></div>
            <div className="h-3 bg-white/10 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Detailed view page loading skeleton
export const DetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-pulse px-6 py-12">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/10"></div>
          <div className="space-y-2">
            <div className="h-6 bg-white/10 rounded w-32"></div>
            <div className="h-4 bg-white/10 rounded w-16"></div>
          </div>
        </div>
        <div className="space-y-2 w-full md:w-auto">
          <div className="h-8 bg-white/10 rounded w-36"></div>
          <div className="h-4 bg-white/10 rounded w-24"></div>
        </div>
      </div>

      {/* Main Grid: Chart + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart mock */}
        <div className="lg:col-span-2 h-[400px] border border-white/10 bg-white/5 rounded-3xl p-6">
          <div className="h-full bg-white/5 rounded-2xl"></div>
        </div>

        {/* Sidebar mock */}
        <div className="space-y-6">
          <div className="border border-white/10 bg-white/5 rounded-3xl p-6 space-y-4">
            <div className="h-4 bg-white/10 rounded w-1/2 mb-4"></div>
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="flex justify-between">
                <div className="h-3 bg-white/10 rounded w-1/3"></div>
                <div className="h-3 bg-white/10 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Text mock */}
      <div className="space-y-4 border border-white/10 bg-white/5 rounded-3xl p-6">
        <div className="h-4 bg-white/10 rounded w-1/4"></div>
        <div className="h-3 bg-white/10 rounded w-full"></div>
        <div className="h-3 bg-white/10 rounded w-full"></div>
        <div className="h-3 bg-white/10 rounded w-2/3"></div>
      </div>
    </div>
  );
};
