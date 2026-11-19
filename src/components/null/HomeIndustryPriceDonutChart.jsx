"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  PieChart,
  Table as TableIcon,
  ShieldCheck,
  TrendingDown,
  Info,
} from "lucide-react";
import { formatVnd } from "@/app/services/api/nullCommerceService";

export const INDUSTRY_PRICE_DATA = [
  {
    id: "ao-thun",
    name: "Áo thun",
    shopeePrice: "99 - 159k",
    shopeeSource: "Shopee Blog",
    retailPrice: "Uniqlo áo cổ tròn 293k, Supima 391k",
    retailSource: "Uniqlo VN",
    targetPrice: "129 - 199k",
    targetAvg: 164000,
    retailAvg: 342000,
    shopeeAvg: 129000,
    saving: "Tiết kiệm 52%",
    color: "#15095D",
    spec: "Cotton Supima sợi dài 260 GSM, bo cổ rib đôi 2.2cm giặt không dão",
    costSegments: {
      material: 74000,
      labor: 36000,
      packaging: 25000,
      qc: 29000,
    },
  },
  {
    id: "polo",
    name: "Polo",
    shopeePrice: "78 - 130k",
    shopeeSource: "Lazada",
    retailPrice: "Coolmate 279 - 329k",
    retailSource: "Shopee Blog",
    targetPrice: "199 - 279k",
    targetAvg: 239000,
    retailAvg: 304000,
    shopeeAvg: 104000,
    saving: "Tiết kiệm 22%",
    color: "#2C1B8E",
    spec: "Sợi Tencel Piqué 230 GSM mát lạnh, kháng khuẩn, cổ dệt chống cong",
    costSegments: {
      material: 108000,
      labor: 53000,
      packaging: 36000,
      qc: 42000,
    },
  },
  {
    id: "ao-ni",
    name: "Áo nỉ dài tay",
    shopeePrice: "65 - 175k",
    shopeeSource: "Shopee Blog",
    retailPrice: "Sweater nỉ dày 169k",
    retailSource: "Shopee Blog",
    targetPrice: "249 - 349k",
    targetAvg: 299000,
    retailAvg: 275000,
    shopeeAvg: 120000,
    saving: "Chuẩn định lượng 380 GSM",
    color: "#4338CA",
    spec: "French Terry 380 GSM mặt vảy cá mịn, chống xù lông 50 chu kỳ giặt",
    costSegments: {
      material: 135000,
      labor: 66000,
      packaging: 45000,
      qc: 53000,
    },
  },
  {
    id: "hoodie",
    name: "Hoodie",
    shopeePrice: "66 - 110k",
    shopeeSource: "Shopee Blog",
    retailPrice: "Hoodie nỉ 260 - 389k",
    retailSource: "Shopee Blog",
    targetPrice: "299 - 399k",
    targetAvg: 349000,
    retailAvg: 325000,
    shopeeAvg: 88000,
    saving: "Chất lượng vượt trội",
    color: "#6366F1",
    spec: "Heavyweight Fleece 420 GSM đứng form, túi kangaroo giấu mũi may",
    costSegments: {
      material: 157000,
      labor: 77000,
      packaging: 52000,
      qc: 63000,
    },
  },
  {
    id: "so-mi-linen",
    name: "Sơ mi linen",
    shopeePrice: "—",
    shopeeSource: "Không rõ nguồn sợi",
    retailPrice: "Uniqlo cotton linen 588k, linen cao cấp 784k",
    retailSource: "Uniqlo VN",
    targetPrice: "349 - 399k",
    targetAvg: 374000,
    retailAvg: 686000,
    shopeeAvg: null,
    saving: "Tiết kiệm 45%",
    color: "#8B5CF6",
    spec: "100% sợi lanh European Linen 185 GSM, may cuốn sườn French Seam",
    costSegments: {
      material: 168000,
      labor: 82000,
      packaging: 56000,
      qc: 68000,
    },
  },
  {
    id: "quan",
    name: "Quần",
    shopeePrice: "—",
    shopeeSource: "Hàng gia công trôi nổi",
    retailPrice: "Uniqlo chino Regular Fit 699k",
    retailSource: "Uniqlo VN",
    targetPrice: "299 - 399k",
    targetAvg: 349000,
    retailAvg: 699000,
    shopeeAvg: null,
    saving: "Tiết kiệm 50%",
    color: "#A855F7",
    spec: "Cotton Twill co giãn cạp chun ẩn & Trousers xếp ly relaxed chống nhăn",
    costSegments: {
      material: 157000,
      labor: 77000,
      packaging: 52000,
      qc: 63000,
    },
  },
  {
    id: "tui-canvas",
    name: "Túi canvas",
    shopeePrice: "Chưa khảo sát",
    shopeeSource: "Chưa khảo sát",
    retailPrice: "Chưa khảo sát",
    retailSource: "Chưa khảo sát",
    targetPrice: "149 - 249k",
    targetAvg: 199000,
    retailAvg: 450000,
    shopeeAvg: null,
    saving: "Tiết kiệm 55%",
    color: "#EC4899",
    spec: "Vải bố Canvas mộc dày 16oz, quai da bò Ý nguyên tấm tán đinh đồng",
    costSegments: {
      material: 90000,
      labor: 44000,
      packaging: 30000,
      qc: 35000,
    },
  },
];

export default function HomeIndustryPriceDonutChart() {
  const [selectedId, setSelectedId] = useState("ao-thun");
  const [hoveredId, setHoveredId] = useState(null);
  const [chartSubView, setChartSubView] = useState("categories"); // 'categories' (7 ngành) | 'cost_breakdown' (4 tầng chi phí)

  const activeItem =
    INDUSTRY_PRICE_DATA.find((item) => item.id === (hoveredId || selectedId)) ||
    INDUSTRY_PRICE_DATA[0];

  const currentSelection =
    INDUSTRY_PRICE_DATA.find((item) => item.id === selectedId) ||
    INDUSTRY_PRICE_DATA[0];

  // SVG Donut Geometry
  const size = 420;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 135;
  const innerR = 82;
  const leaderStartR = outerR + 5;
  const leaderBreakR = outerR + 25;

  // 1. Data calculation for 7 Categories Donut
  const totalTargetPrice = INDUSTRY_PRICE_DATA.reduce(
    (acc, cur) => acc + cur.targetAvg,
    0
  );

  let currentCategoryAngle = -90;
  const categorySlices = INDUSTRY_PRICE_DATA.map((item) => {
    const angleSpan = (item.targetAvg / totalTargetPrice) * 360;
    const startAngle = currentCategoryAngle;
    const midAngle = currentCategoryAngle + angleSpan / 2;
    const endAngle = currentCategoryAngle + angleSpan;
    currentCategoryAngle = endAngle;

    const pct = Math.round((item.targetAvg / totalTargetPrice) * 100);

    return {
      ...item,
      pct,
      angleSpan,
      startAngle,
      midAngle,
      endAngle,
    };
  });

  // 2. Data calculation for Cost Breakdown Donut of selected item
  const selectedCost = currentSelection.costSegments;
  const costSum =
    selectedCost.material +
    selectedCost.labor +
    selectedCost.packaging +
    selectedCost.qc;

  const costBreakdownData = [
    {
      key: "material",
      label: "Nguyên vật liệu & Phụ liệu",
      amount: selectedCost.material,
      color: "#15095D",
      pct: Math.round((selectedCost.material / costSum) * 100),
      desc: "Vải sợi tự nhiên tiêu chuẩn xuất khẩu, phụ liệu chính hãng",
    },
    {
      key: "labor",
      label: "Công thợ & Vận hành xưởng",
      amount: selectedCost.labor,
      color: "#32259B",
      pct: Math.round((selectedCost.labor / costSum) * 100),
      desc: "Lương công bằng cho thợ may lành nghề, khấu hao máy móc",
    },
    {
      key: "packaging",
      label: "Đóng gói & Vận chuyển",
      amount: selectedCost.packaging,
      color: "#6366F1",
      pct: Math.round((selectedCost.packaging / costSum) * 100),
      desc: "Hộp giấy tái chế, túi màng sinh học và vận chuyển từ xưởng",
    },
    {
      key: "qc",
      label: "Kiểm định AQL 2.5 & Nền tảng",
      amount: selectedCost.qc,
      color: "#EB6D48",
      pct: Math.round((selectedCost.qc / costSum) * 100),
      desc: "Nghiệm thu 12 bước, bảo hành 30 ngày và hạ tầng công nghệ",
    },
  ];

  let currentCostAngle = -90;
  const costSlices = costBreakdownData.map((item) => {
    const angleSpan = (item.amount / costSum) * 360;
    const startAngle = currentCostAngle;
    const midAngle = currentCostAngle + angleSpan / 2;
    const endAngle = currentCostAngle + angleSpan;
    currentCostAngle = endAngle;

    return {
      ...item,
      angleSpan,
      startAngle,
      midAngle,
      endAngle,
    };
  });

  // Arc path generator
  const createArc = (startAng, endAng, inR, outR) => {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const x1 = cx + outR * Math.cos(toRad(startAng));
    const y1 = cy + outR * Math.sin(toRad(startAng));
    const x2 = cx + outR * Math.cos(toRad(endAng));
    const y2 = cy + outR * Math.sin(toRad(endAng));

    const x3 = cx + inR * Math.cos(toRad(endAng));
    const y3 = cy + inR * Math.sin(toRad(endAng));
    const x4 = cx + inR * Math.cos(toRad(startAng));
    const y4 = cy + inR * Math.sin(toRad(startAng));

    const largeArc = endAng - startAng > 180 ? 1 : 0;

    return `M ${x1} ${y1} A ${outR} ${outR} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${inR} ${inR} 0 ${largeArc} 0 ${x4} ${y4} Z`;
  };

  const activeSlices =
    chartSubView === "categories" ? categorySlices : costSlices;

  return (
    <section
      aria-label="Biểu đồ tròn so sánh giá và bảng bóc tách giá mục tiêu tại xưởng"
      className="rounded-3xl bg-[#EFF2F9]/75 border border-[#DCE0E7] p-6 sm:p-10 space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#BBC2DD] text-[11px] font-bold uppercase tracking-[0.16em] text-[#32259B] shadow-xs">
            <PieChart className="w-3.5 h-3.5 text-[#EB6D48]" />
            <span>M2C BENCHMARK PRICING · BIỂU ĐỒ SO SÁNH GIÁ XƯỞNG</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#15095D]">
            Biểu Đồ Tròn Đối Chiếu 7 Ngành Hàng Thiết Yếu
          </h2>
          <p className="text-sm text-[#4E567A] leading-relaxed">
            Dữ liệu khảo sát thực tế đối chiếu mức giá giữa **Hàng trôi nổi trên sàn**, **Thương hiệu bán lẻ trong nước / quốc tế** và **Mức giá mục tiêu trực tiếp tại xưởng UNLO**.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="inline-flex items-center p-1 rounded-full bg-white border border-[#DCE0E7] shadow-xs shrink-0">
          <button
            type="button"
            onClick={() => setChartSubView("categories")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              chartSubView === "categories"
                ? "bg-[#15095D] text-white shadow-xs"
                : "text-[#4E567A] hover:text-[#15095D]"
            }`}
          >
            <PieChart className="w-3.5 h-3.5" />
            <span>Cơ Cấu 7 Ngành Hàng</span>
          </button>
          <button
            type="button"
            onClick={() => setChartSubView("cost_breakdown")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              chartSubView === "cost_breakdown"
                ? "bg-[#15095D] text-white shadow-xs"
                : "text-[#4E567A] hover:text-[#15095D]"
            }`}
          >
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Bóc Tách 4 Tầng Chi Phí</span>
          </button>
        </div>
      </div>

      {/* Category Pills Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <span className="text-xs font-bold uppercase tracking-wider text-[#15095D] shrink-0 mr-1">
          Chọn ngành hàng:
        </span>
        {INDUSTRY_PRICE_DATA.map((item) => {
          const isSelected = selectedId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`h-9 px-4 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? "bg-[#15095D] text-white shadow-sm scale-105"
                  : "bg-white text-[#4E567A] border border-[#DCE0E7] hover:border-[#15095D] hover:text-[#15095D]"
              }`}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.name}</span>
              <span className="text-[10px] opacity-80">({item.targetPrice})</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Donut & Focus Info Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-[#DCE0E7] p-6 sm:p-8 shadow-sm">
        {/* Left: SVG Donut with Leader Lines */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          <div className="w-full max-w-[420px]">
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="w-full h-auto overflow-visible select-none drop-shadow-xs"
            >
              {/* Slices */}
              {activeSlices.map((slice) => {
                const isHovered =
                  chartSubView === "categories"
                    ? (hoveredId || selectedId) === slice.id
                    : hoveredId === slice.key;

                const scaleR = isHovered ? outerR + 7 : outerR;
                const pathD = createArc(
                  slice.startAngle,
                  slice.endAngle,
                  innerR,
                  scaleR
                );

                return (
                  <path
                    key={slice.id || slice.key}
                    d={pathD}
                    fill={slice.color}
                    className="cursor-pointer transition-all duration-300"
                    style={{
                      opacity:
                        hoveredId &&
                        hoveredId !== (slice.id || slice.key) &&
                        selectedId !== slice.id
                          ? 0.45
                          : 1,
                      transformOrigin: `${cx}px ${cy}px`,
                    }}
                    onMouseEnter={() =>
                      setHoveredId(slice.id || slice.key)
                    }
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => {
                      if (slice.id) setSelectedId(slice.id);
                    }}
                  />
                );
              })}

              {/* Leader Lines and Callout Labels */}
              {activeSlices.map((slice) => {
                const isHovered =
                  chartSubView === "categories"
                    ? (hoveredId || selectedId) === slice.id
                    : hoveredId === slice.key;

                const toRad = (deg) => (deg * Math.PI) / 180;
                const rad = toRad(slice.midAngle);

                // Start from outer rim
                const xStart = cx + leaderStartR * Math.cos(rad);
                const yStart = cy + leaderStartR * Math.sin(rad);

                // Break/knee point
                const xBreak = cx + leaderBreakR * Math.cos(rad);
                const yBreak = cy + leaderBreakR * Math.sin(rad);

                // Extension horizontal arm
                const isRight = Math.cos(rad) >= 0;
                const xEnd = isRight ? xBreak + 30 : xBreak - 30;

                const labelText =
                  chartSubView === "categories"
                    ? slice.name
                    : slice.label.split("&")[0].trim();

                const subText =
                  chartSubView === "categories"
                    ? slice.targetPrice
                    : `${slice.pct}%`;

                return (
                  <g
                    key={`leader-${slice.id || slice.key}`}
                    className="transition-opacity duration-300 pointer-events-none"
                    style={{
                      opacity: isHovered ? 1 : 0.65,
                    }}
                  >
                    {/* Anchor dot on slice */}
                    <circle
                      cx={xStart}
                      cy={yStart}
                      r={isHovered ? 4 : 2.5}
                      fill={slice.color}
                    />

                    {/* Polyline leader */}
                    <polyline
                      points={`${xStart},${yStart} ${xBreak},${yBreak} ${xEnd},${yBreak}`}
                      fill="none"
                      stroke={slice.color}
                      strokeWidth={isHovered ? 2 : 1.25}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray={isHovered ? "none" : "3,2"}
                    />

                    {/* Dot at knee end */}
                    <circle
                      cx={xEnd}
                      cy={yBreak}
                      r={isHovered ? 4 : 2.5}
                      fill={slice.color}
                    />

                    {/* Callout Text */}
                    <text
                      x={isRight ? xEnd + 6 : xEnd - 6}
                      y={yBreak - 2}
                      textAnchor={isRight ? "start" : "end"}
                      fontSize={isHovered ? "11" : "10"}
                      fontWeight="bold"
                      fill={isHovered ? "#15095D" : slice.color}
                      className="font-sans"
                    >
                      {labelText}
                    </text>
                    <text
                      x={isRight ? xEnd + 6 : xEnd - 6}
                      y={yBreak + 11}
                      textAnchor={isRight ? "start" : "end"}
                      fontSize="9"
                      fontWeight="600"
                      fill={isHovered ? "#EB6D48" : "#6B7280"}
                      className="font-mono tabular-nums"
                    >
                      {subText}
                    </text>
                  </g>
                );
              })}

              {/* Donut Hole Center */}
              <circle cx={cx} cy={cy} r={innerR - 4} fill="#FCFDF1" />
              <text
                x={cx}
                y={cy - 16}
                textAnchor="middle"
                fontSize="9"
                fontWeight="bold"
                letterSpacing="0.14em"
                fill="#625FBC"
                className="uppercase font-sans"
              >
                {chartSubView === "categories"
                  ? "GIÁ MỤC TIÊU"
                  : "TỔNG TẠI XƯỞNG"}
              </text>
              <text
                x={cx}
                y={cy + 8}
                textAnchor="middle"
                fontSize="17"
                fontWeight="800"
                fill="#15095D"
                className="font-serif tabular-nums"
              >
                {chartSubView === "categories"
                  ? activeItem.targetPrice
                  : formatVnd(currentSelection.targetAvg)}
              </text>
              <text
                x={cx}
                y={cy + 25}
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fill="#1D7A5F"
                className="font-sans"
              >
                {chartSubView === "categories"
                  ? activeItem.name
                  : "Chuẩn Xuất Khẩu"}
              </text>
            </svg>
          </div>

          <p className="text-[11px] text-[#8D8DC7] text-center mt-3">
            Rà chuột hoặc nhấn vào các múi tròn để xem phân tích chi tiết của ngành
          </p>
        </div>

        {/* Right: Detailed Card Focus for the Active Industry */}
        <div className="lg:col-span-6 space-y-5">
          <div className="rounded-2xl bg-[#EFF2F9]/70 border border-[#DCE0E7] p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between gap-3 border-b border-[#DCE0E7] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#625FBC]">
                  NGÀNH ĐANG CHỌN
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#15095D]">
                  {currentSelection.name}
                </h3>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-[#15095D] text-white text-xs font-bold shrink-0">
                {currentSelection.saving}
              </div>
            </div>

            <p className="text-xs text-[#4E567A] leading-relaxed">
              <strong className="text-[#15095D]">Tiêu chuẩn UNLO:</strong>{" "}
              {currentSelection.spec}
            </p>

            {/* 3 Price Tiers from the Table */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {/* 1. Hàng trôi nổi */}
              <div className="rounded-xl bg-white p-3.5 border border-[#DCE0E7] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#8C93A8]">
                  Hàng trôi nổi trên sàn
                </span>
                <p className="font-serif font-bold text-base text-[#4E567A]">
                  {currentSelection.shopeePrice}
                </p>
                <p className="text-[10px] text-[#8C93A8] line-clamp-1">
                  Nguồn: {currentSelection.shopeeSource}
                </p>
              </div>

              {/* 2. Bán lẻ trong nước / quốc tế */}
              <div className="rounded-xl bg-white p-3.5 border border-[#DCE0E7] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#8C93A8]">
                  Bán lẻ trong/ngoài nước
                </span>
                <p className="font-serif font-bold text-base text-[#15095D] line-clamp-1">
                  {currentSelection.retailPrice}
                </p>
                <p className="text-[10px] text-[#8C93A8] line-clamp-1">
                  Nguồn: {currentSelection.retailSource}
                </p>
              </div>

              {/* 3. Giá bán mục tiêu UNLO */}
              <div className="rounded-xl bg-[#15095D] text-white p-3.5 space-y-1 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-[#C6C9F1]">
                  Giá mục tiêu UNLO
                </span>
                <p className="font-serif font-bold text-lg text-[#FCFDF1]">
                  {currentSelection.targetPrice}
                </p>
                <p className="text-[10px] text-[#E0E3F5]">
                  Xuất xưởng M2C
                </p>
              </div>
            </div>

            {/* Link to catalog for this industry */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[#4E567A]">
                Không qua trung gian · Tiết kiệm tới 50% chi phí
              </span>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#32259B] hover:text-[#15095D]"
              >
                Xem sản phẩm ngành này
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FULL 4-COLUMN TABLE — EXACTLY AS IN THE USER'S ATTACHMENT */}
      <div className="rounded-3xl bg-white border border-[#DCE0E7] overflow-hidden shadow-xs space-y-0">
        <div className="p-5 sm:p-6 border-b border-[#DCE0E7] flex flex-wrap items-center justify-between gap-3 bg-[#F8F9FD]">
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#15095D]">
              Bảng Số Liệu Đối Chiếu Thị Trường &amp; Giá Mục Tiêu UNLO
            </h3>
            <p className="text-xs text-[#5E607E] mt-0.5">
              Khảo sát giá thành trung bình từ Shopee Blog, Lazada, Uniqlo VN và các thương hiệu nội địa
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-[#15095D] px-3 py-1 bg-white rounded-full border border-[#DCE0E7]">
            7 Ngành Hàng Cơ Bản
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-[#15095D] text-white divide-x divide-white/10">
                <th className="py-4 px-5 font-semibold w-[18%]">Ngành</th>
                <th className="py-4 px-5 font-semibold w-[28%]">
                  Hàng trôi nổi trên sàn
                </th>
                <th className="py-4 px-5 font-semibold w-[36%]">
                  Bán lẻ trong nước / quốc tế
                </th>
                <th className="py-4 px-5 font-semibold w-[18%] bg-[#21127C]">
                  Giá bán mục tiêu
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE0E7]">
              {INDUSTRY_PRICE_DATA.map((row) => {
                const isSelected = selectedId === row.id;
                return (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedId(row.id)}
                    className={`transition-colors cursor-pointer divide-x divide-[#DCE0E7]/60 ${
                      isSelected
                        ? "bg-[#EFF2F9] font-medium"
                        : "hover:bg-[#F9FAFD]"
                    }`}
                  >
                    {/* Col 1: Ngành */}
                    <td className="py-4 px-5 font-semibold text-[#15095D]">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: row.color }}
                        />
                        <span>{row.name}</span>
                      </div>
                    </td>

                    {/* Col 2: Hàng trôi nổi trên sàn */}
                    <td className="py-4 px-5 text-[#4E567A]">
                      <div className="font-medium text-[#15095D]">
                        {row.shopeePrice}
                      </div>
                      {row.shopeeSource !== "—" && (
                        <div className="text-[11px] text-[#625FBC] underline decoration-[#625FBC]/40">
                          ({row.shopeeSource})
                        </div>
                      )}
                    </td>

                    {/* Col 3: Bán lẻ trong nước / quốc tế */}
                    <td className="py-4 px-5 text-[#4E567A]">
                      <div className="font-medium text-[#15095D]">
                        {row.retailPrice}
                      </div>
                      {row.retailSource !== "Chưa khảo sát" &&
                        row.retailSource !== "—" && (
                          <div className="text-[11px] text-[#625FBC] underline decoration-[#625FBC]/40">
                            ({row.retailSource})
                          </div>
                        )}
                    </td>

                    {/* Col 4: Giá bán mục tiêu */}
                    <td className="py-4 px-5 bg-[#FCFDF1]/90">
                      <div className="font-bold text-[#15095D] font-serif text-base">
                        {row.targetPrice}
                      </div>
                      <div className="text-[11px] text-[#EB6D48] font-semibold">
                        {row.saving}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
