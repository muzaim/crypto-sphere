"use client";

import React, { useState, useMemo, useRef } from "react";

interface HistoryPoint {
  date: string;
  price: number;
}

interface CoinChartProps {
  historyData: HistoryPoint[];
  coinSymbol: string;
  change24h: number;
}

export const CoinChart: React.FC<CoinChartProps> = ({
  historyData,
  coinSymbol,
  change24h,
}) => {
  const [timeframe, setTimeframe] = useState<7 | 14 | 30>(30);
  const [hoveredPoint, setHoveredPoint] = useState<HistoryPoint & { x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // SVG coordinate space
  const svgWidth = 800;
  const svgHeight = 350;
  const paddingLeft = 60;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 40;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  // Filter history data based on timeframe
  const filteredData = useMemo(() => {
    return historyData.slice(-timeframe);
  }, [historyData, timeframe]);

  // Compute stats
  const { min, max, points } = useMemo(() => {
    const prices = filteredData.map((d) => d.price);
    const minVal = Math.min(...prices);
    const maxVal = Math.max(...prices);
    const range = maxVal - minVal === 0 ? 1 : maxVal - minVal;

    const pts = filteredData.map((d, idx) => {
      const x = paddingLeft + (idx / (filteredData.length - 1)) * chartWidth;
      const y = paddingTop + chartHeight - ((d.price - minVal) / range) * chartHeight;
      return { ...d, x, y };
    });

    return { min: minVal, max: maxVal, points: pts };
  }, [filteredData, chartWidth, chartHeight]);

  // Generate SVG path strings
  const { linePath, areaPath } = useMemo(() => {
    if (points.length === 0) return { linePath: "", areaPath: "" };
    
    const line = points
      .map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(" ");

    const area = `${line} L ${points[points.length - 1].x.toFixed(1)} ${(svgHeight - paddingBottom).toFixed(1)} L ${points[0].x.toFixed(1)} ${(svgHeight - paddingBottom).toFixed(1)} Z`;

    return { linePath: line, areaPath: area };
  }, [points]);

  // Handle mouse moves to trigger tooltip
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!svgRef.current || points.length === 0) return;

    const rect = svgRef.current.getBoundingClientRect();
    // Convert client X to SVG viewBox X coordinate
    const clientX = e.clientX - rect.left;
    const svgX = (clientX / rect.width) * svgWidth;

    // Find closest point by X coordinate
    let closest = points[0];
    let minDiff = Math.abs(points[0].x - svgX);

    for (let i = 1; i < points.length; i++) {
      const diff = Math.abs(points[i].x - svgX);
      if (diff < minDiff) {
        minDiff = diff;
        closest = points[i];
      }
    }

    setHoveredPoint(closest);
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  const isPositive = change24h >= 0;
  const strokeColor = isPositive ? "#00ffd5" : "#ef4444"; // teal vs red
  const gradientId = "coin-detail-chart-grad";

  // Generate grid ticks
  const gridTicks = 5;
  const priceTicks = useMemo(() => {
    const ticks = [];
    for (let i = 0; i < gridTicks; i++) {
      const val = min + (i / (gridTicks - 1)) * (max - min);
      ticks.push(val);
    }
    return ticks.reverse(); // top to bottom
  }, [min, max]);

  return (
    <div className="w-full border border-white/10 bg-[#1a1b3a]/60 backdrop-blur-md rounded-3xl p-6 shadow-2xl relative overflow-hidden">
      {/* Glow */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>

      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative z-10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#962f79] font-semibold">{coinSymbol} Price Performance History</span>
          <div className="flex items-baseline gap-3 mt-1">
            <h3 className="text-2xl font-bold">
              {hoveredPoint ? `$${hoveredPoint.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 8 })}` : `$${points[points.length - 1]?.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 8 })}`}
            </h3>
            <span className={`text-sm font-semibold ${isPositive ? "text-[#00ffd5]" : "text-red-400"}`}>
              {isPositive ? "+" : ""}{change24h}% (24H)
            </span>
          </div>
          {hoveredPoint && (
            <p className="text-xs text-gray-400 mt-0.5">
              Price at {new Date(hoveredPoint.date).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          )}
        </div>

        {/* Timeframe Buttons */}
        <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 text-xs">
          {([7, 14, 30] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer ${
                timeframe === tf
                  ? "bg-gradient-to-r from-[#962f79] to-[#00ffd5] text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tf}D
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative w-full overflow-hidden">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto select-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines (horizontal) */}
          {priceTicks.map((tick, idx) => {
            const y = paddingTop + (idx / (gridTicks - 1)) * chartHeight;
            return (
              <g key={idx}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={svgWidth - paddingRight}
                  y2={y}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 10}
                  y={y + 4}
                  fill="#94a3b8"
                  fontSize="10"
                  textAnchor="end"
                  className="font-mono"
                >
                  {tick >= 1000
                    ? `$${Math.round(tick).toLocaleString()}`
                    : tick >= 1
                    ? `$${tick.toFixed(2)}`
                    : `$${tick.toFixed(4)}`}
                </text>
              </g>
            );
          })}

          {/* X Axis dates */}
          {points.length > 0 &&
            [0, Math.floor(points.length / 2), points.length - 1].map((idx) => {
              const p = points[idx];
              if (!p) return null;
              const formattedDate = new Date(p.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
              return (
                <text
                  key={idx}
                  x={p.x}
                  y={svgHeight - paddingBottom + 20}
                  fill="#94a3b8"
                  fontSize="11"
                  textAnchor={idx === 0 ? "start" : idx === points.length - 1 ? "end" : "middle"}
                  className="font-medium"
                >
                  {formattedDate}
                </text>
              );
            })}

          {/* Area Path */}
          <path d={areaPath} fill={`url(#${gradientId})`} />

          {/* Line Path */}
          <path
            d={linePath}
            fill="none"
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Hover effects */}
          {hoveredPoint && (
            <g>
              {/* Vertical indicator line */}
              <line
                x1={hoveredPoint.x}
                y1={paddingTop}
                x2={hoveredPoint.x}
                y2={svgHeight - paddingBottom}
                stroke={strokeColor}
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.7"
              />

              {/* Glowing anchor circle */}
              <circle
                cx={hoveredPoint.x}
                cy={hoveredPoint.y}
                r="7"
                fill={strokeColor}
                stroke="#12132a"
                strokeWidth="2.5"
                className="animate-pulse"
              />
              <circle
                cx={hoveredPoint.x}
                cy={hoveredPoint.y}
                r="3"
                fill="#ffffff"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-center text-xs text-gray-500 mt-4 border-t border-white/5 pt-4">
        <span>Timezone: UTC+7</span>
        <span className="font-mono">Real-time simulation data</span>
      </div>
    </div>
  );
};
