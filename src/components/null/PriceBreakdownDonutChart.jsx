"use client";

import { useState } from "react";
import { formatVnd } from "@/app/services/api/nullCommerceService";
import { PieChart, BarChart3, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export default function PriceBreakdownDonutChart({ product }) {
  const [hoveredKey, setHoveredKey] = useState(null);

  const cost = product?.costBreakdown || {};
  const m2cPrice = cost.nullPrice || product?.price || 245000;
  const retailPrice = cost.traditionalRetailPrice || Math.round(m2cPrice * 2.6);

  const materialCost = cost.materialCost || Math.round(m2cPrice * 0.45);
  const manufacturingCost = cost.manufacturingCost || Math.round(m2cPrice * 0.2);
  const packagingShippingCost =
    cost.packagingShippingCost || Math.round(m2cPrice * 0.15);
  const platformQcCost = Math.max(
    0,
    cost.platformQcCost ??
      m2cPrice - materialCost - manufacturingCost - packagingShippingCost
  );

  const totalCalc = Math.max(
    1,
    materialCost + manufacturingCost + packagingShippingCost + platformQcCost
  );

  const rawSegments = [
    {
      key: "material",
      label: "Nguyên vật liệu & Phụ liệu",
      amount: materialCost,
      color: "#15095D",
      desc: cost.materialDesc || "Cotton Supima 260 GSM, phụ liệu & chỉ may cao cấp.",
      tag: "45% tổng giá thành",
    },
    {
      key: "manufacturing",
      label: "Nhân công & Vận hành",
      amount: manufacturingCost,
      color: "#32259B",
      desc: cost.manufacturingDesc || "Tiền công thợ lành nghề, vận hành chuyền may đạt chuẩn AQL.",
      tag: "Lương công bằng",
    },
    {
      key: "shipping",
      label: "Đóng gói & Vận chuyển",
      amount: packagingShippingCost,
      color: "#5C6AC4",
      desc: cost.packagingShippingDesc || "Hộp carton tái chế, túi màng sinh học và giao trực tiếp.",
      tag: "Kho xưởng thẳng tới bạn",
    },
    {
      key: "qc",
      label: "Phí nền tảng & Kiểm định QC",
      amount: platformQcCost,
      color: "#EB6D48",
      desc: cost.platformQcDesc || "Nghiệm thu 12 bước, bảo hành 30 ngày và hạ tầng M2C.",
      tag: "12 bước AQL 2.5",
    },
  ];

  // Calculate percentages and angles
  let cumulativeAngle = -90; // Start at top (12 o'clock)
  const segments = rawSegments.map((seg) => {
    const pct = Math.round((seg.amount / totalCalc) * 100);
    const angleSpan = (seg.amount / totalCalc) * 360;
    const startAngle = cumulativeAngle;
    const midAngle = cumulativeAngle + angleSpan / 2;
    const endAngle = cumulativeAngle + angleSpan;
    cumulativeAngle = endAngle;

    return {
      ...seg,
      pct,
      angleSpan,
      startAngle,
      midAngle,
      endAngle,
    };
  });

  // SVG Geometry for Donut Chart
  const size = 380;
  const cx = size / 2;
  const cy = size / 2;
  const outerRadius = 120;
  const innerRadius = 76;
  const leaderStartRadius = outerRadius + 6;
  const leaderBreakRadius = outerRadius + 26;

  // Function to calculate SVG arc path
  const createArc = (startAng, endAng, innerR, outerR) => {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const x1 = cx + outerR * Math.cos(toRad(startAng));
    const y1 = cy + outerR * Math.sin(toRad(startAng));
    const x2 = cx + outerR * Math.cos(toRad(endAng));
    const y2 = cy + outerR * Math.sin(toRad(endAng));

    const x3 = cx + innerR * Math.cos(toRad(endAng));
    const y3 = cy + innerR * Math.sin(toRad(endAng));
    const x4 = cx + innerR * Math.cos(toRad(startAng));
    const y4 = cy + innerR * Math.sin(toRad(startAng));

    const largeArc = endAng - startAng > 180 ? 1 : 0;

    return `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4} Z`;
  };

  return (
    <div className="space-y-8">
      {/* Visual Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE0E7] shadow-sm">
        {/* Left / Center: Interactive SVG Donut with Callout Leaders */}
        <div className="relative w-full max-w-[420px] shrink-0 flex items-center justify-center">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-full h-auto max-w-[380px] overflow-visible drop-shadow-sm select-none"
          >
            <defs>
              <filter id="donutShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.12" />
              </filter>
            </defs>

            {/* Slices */}
            {segments.map((seg) => {
              const isHovered = hoveredKey === seg.key;
              const scaleRadius = isHovered ? outerRadius + 6 : outerRadius;
              const pathD = createArc(
                seg.startAngle,
                seg.endAngle,
                innerRadius,
                scaleRadius
              );

              return (
                <path
                  key={seg.key}
                  d={pathD}
                  fill={seg.color}
                  className="cursor-pointer transition-all duration-300"
                  style={{
                    opacity: hoveredKey && !isHovered ? 0.45 : 1,
                    transformOrigin: `${cx}px ${cy}px`,
                  }}
                  onMouseEnter={() => setHoveredKey(seg.key)}
                  onMouseLeave={() => setHoveredKey(null)}
                />
              );
            })}

            {/* Leader Lines and Callout Dots */}
            {segments.map((seg) => {
              const isHovered = hoveredKey === seg.key;
              const toRad = (deg) => (deg * Math.PI) / 180;
              const rad = toRad(seg.midAngle);

              // 1. Point on outer edge of donut
              const xStart = cx + leaderStartRadius * Math.cos(rad);
              const yStart = cy + leaderStartRadius * Math.sin(rad);

              // 2. Knee / inflection point
              const xBreak = cx + leaderBreakRadius * Math.cos(rad);
              const yBreak = cy + leaderBreakRadius * Math.sin(rad);

              // 3. Horizontal tip pointing outwards left or right
              const isRightSide = Math.cos(rad) >= 0;
              const xEnd = isRightSide ? xBreak + 28 : xBreak - 28;

              return (
                <g
                  key={`leader-${seg.key}`}
                  className="transition-opacity duration-300 pointer-events-none"
                  style={{ opacity: hoveredKey && !isHovered ? 0.35 : 1 }}
                >
                  {/* Anchor Dot */}
                  <circle
                    cx={xStart}
                    cy={yStart}
                    r={isHovered ? 4 : 2.5}
                    fill={seg.color}
                  />

                  {/* Two-segment leader line */}
                  <polyline
                    points={`${xStart},${yStart} ${xBreak},${yBreak} ${xEnd},${yBreak}`}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth={isHovered ? 2 : 1.25}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={isHovered ? "none" : "3,2"}
                  />

                  {/* Percentage Callout Tag at end of line */}
                  <circle
                    cx={xEnd}
                    cy={yBreak}
                    r={isHovered ? 4.5 : 3}
                    fill={seg.color}
                  />
                  <text
                    x={isRightSide ? xEnd + 6 : xEnd - 6}
                    y={yBreak + 4}
                    textAnchor={isRightSide ? "start" : "end"}
                    fontSize="11"
                    fontWeight="bold"
                    fill={seg.color}
                    className="font-mono tabular-nums"
                  >
                    {seg.pct}%
                  </text>
                </g>
              );
            })}

            {/* Donut Center: Total M2C Price & Label */}
            <circle cx={cx} cy={cy} r={innerRadius - 4} fill="#FCFDF1" />
            <text
              x={cx}
              y={cy - 14}
              textAnchor="middle"
              fontSize="10"
              fontWeight="bold"
              letterSpacing="0.14em"
              fill="#625FBC"
              className="uppercase font-sans"
            >
              GIÁ XUẤT XƯỞNG
            </text>
            <text
              x={cx}
              y={cy + 10}
              textAnchor="middle"
              fontSize="18"
              fontWeight="800"
              fill="#15095D"
              className="font-serif tabular-nums"
            >
              {formatVnd(m2cPrice)}
            </text>
            <text
              x={cx}
              y={cy + 26}
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              fill="#1D7A5F"
              className="font-sans"
            >
              100% Minh Bạch
            </text>
          </svg>
        </div>

        {/* Right: Detailed Breakdown Cards linked to Donut regions */}
        <div className="w-full flex-1 space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-[#DCE0E7]">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#15095D]">
              4 Phân Vùng Cấu Thành Giá (Chỉ Dẫn Trực Tiếp)
            </span>
            <span className="text-xs font-mono text-[#4E567A]">
              Rà chuột để nổi bật từng vùng
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {segments.map((seg) => {
              const isHovered = hoveredKey === seg.key;
              return (
                <div
                  key={seg.key}
                  onMouseEnter={() => setHoveredKey(seg.key)}
                  onMouseLeave={() => setHoveredKey(null)}
                  className={`rounded-2xl p-4 border transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? "bg-white border-[#32259B] shadow-md scale-[1.02]"
                      : "bg-[#EFF2F9]/60 border-[#DCE0E7] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-xs font-bold text-[#15095D]">
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0"
                        style={{ backgroundColor: seg.color }}
                      />
                      <span>{seg.label}</span>
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white tabular-nums shrink-0"
                      style={{ backgroundColor: seg.color }}
                    >
                      {seg.pct}%
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between pt-2">
                    <span className="text-sm font-bold text-[#15095D] tabular-nums">
                      {formatVnd(seg.amount)}
                    </span>
                    <span className="text-[10px] font-medium text-[#625FBC]">
                      {seg.tag}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#4E567A] leading-relaxed pt-1.5">
                    {seg.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
