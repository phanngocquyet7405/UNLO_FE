"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Đường cong vector giải phẫu áo thun tiêu chuẩn UNLO (400x420)
 * Từ prototype index.html
 */
const TEE_PATH =
  "M150 36 Q200 54 250 36 L322 66 Q350 78 362 104 L384 156 Q388 166 378 170 L330 188 Q320 191 316 182 L304 158 L304 392 Q304 404 292 404 L108 404 Q96 404 96 392 L96 158 L84 182 Q80 191 70 188 L22 170 Q12 166 16 156 L38 104 Q50 78 78 66 Z";

const GARMENTS = [
  { id: "trang", label: "Trắng ngà", hex: "#F3F1EA", dark: false },
  { id: "cham", label: "Chàm", hex: "#2A2F6B", dark: true },
  { id: "xam", label: "Xám mây", hex: "#B9BCC8", dark: false },
  { id: "den", label: "Đen than", hex: "#202026", dark: true },
  { id: "lav", label: "Tím nhạt", hex: "#B7B4E3", dark: false },
  { id: "hong", label: "Hồng phấn", hex: "#E9C9CF", dark: false },
  { id: "be", label: "Be cát", hex: "#D8C8AA", dark: false },
  { id: "reu", label: "Xanh rêu", hex: "#5D6650", dark: true },
];

const THREADS = [
  { id: "cham", label: "Chàm", hex: "#1F2A6B", dark: true },
  { id: "trang", label: "Trắng ngà", hex: "#F6F2E6", dark: false },
  { id: "lav", label: "Oải hương", hex: "#8E88D6", dark: false },
  { id: "bac", label: "Bạc", hex: "#B9BCC6", dark: false },
  { id: "den", label: "Đen", hex: "#1B1B20", dark: true },
];

const FONTS = [
  {
    id: 0,
    label: "Cổ điển",
    sublabel: "Libre Bodoni",
    family: "var(--font-serif), 'Libre Bodoni', serif",
    weight: "600",
    baseSize: 20,
  },
  {
    id: 1,
    label: "Viết tay",
    sublabel: "Great Vibes",
    family: "var(--font-script), 'Great Vibes', cursive",
    weight: "400",
    baseSize: 30,
  },
  {
    id: 2,
    label: "Hiện đại",
    sublabel: "Montserrat",
    family: "var(--font-sans), 'Montserrat', sans-serif",
    weight: "700",
    baseSize: 20,
  },
];

const POSITIONS = [
  { id: 0, label: "Ngực trái", x: 256, y: 136, scale: 1 },
  { id: 1, label: "Thân ngực", x: 200, y: 176, scale: 1.5 },
  { id: 2, label: "Gấu áo", x: 262, y: 378, scale: 0.9 },
];

/* Biểu tượng cute minh họa các bước tùy chỉnh (từ index.html) */
function CuteShirtIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]">
      <path
        d="M8.5 3.5 4 5.8 2.6 10l3 1.2V20.5h12.8V11.2l3-1.2L20 5.8l-4.5-2.3c-.6 1.6-2 2.4-3.5 2.4S9.1 5.1 8.5 3.5z"
        fill="#C6C9F1"
        stroke="#15095D"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="9.7" cy="12.6" r=".9" fill="#15095D" />
      <circle cx="14.3" cy="12.6" r=".9" fill="#15095D" />
      <path
        d="M10.8 14.8c.7.6 1.7.6 2.4 0"
        stroke="#15095D"
        strokeWidth="1.1"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="8.4" cy="14.6" rx="1" ry=".6" fill="#F2B8C6" />
      <ellipse cx="15.6" cy="14.6" rx="1" ry=".6" fill="#F2B8C6" />
    </svg>
  );
}

function CuteNeedleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]">
      <path
        d="M19.5 3.5 6.5 16.5"
        stroke="#15095D"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <ellipse
        cx="18.2"
        cy="4.8"
        rx="1.5"
        ry=".7"
        transform="rotate(-45 18.2 4.8)"
        fill="#fff"
        stroke="#15095D"
        strokeWidth="1"
      />
      <path
        d="M18 5.5c-5 1-3 6-8 7.5s-6 4-5 7"
        stroke="#E58FA9"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="2.2 1.6"
      />
    </svg>
  );
}

function CuteAaIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]">
      <text
        x="2.5"
        y="18"
        fontFamily="var(--font-serif), 'Libre Bodoni', serif"
        fontSize="15"
        fontWeight="600"
        fill="#15095D"
      >
        Aa
      </text>
      <path
        d="M19.5 3l.7 1.7 1.8.7-1.8.7-.7 1.7-.7-1.7-1.8-.7 1.8-.7z"
        fill="#8E88D6"
      />
    </svg>
  );
}

function CuteSpoolIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]">
      <rect
        x="5"
        y="3.5"
        width="14"
        height="3"
        rx="1.2"
        fill="#B9B6F2"
        stroke="#15095D"
        strokeWidth="1.3"
      />
      <rect
        x="5"
        y="17.5"
        width="14"
        height="3"
        rx="1.2"
        fill="#B9B6F2"
        stroke="#15095D"
        strokeWidth="1.3"
      />
      <rect
        x="7"
        y="6.5"
        width="10"
        height="11"
        fill="#E58FA9"
        stroke="#15095D"
        strokeWidth="1.3"
      />
      <path
        d="M7 9.5h10M7 12h10M7 14.5h10"
        stroke="#fff"
        strokeWidth=".9"
        opacity=".8"
      />
    </svg>
  );
}

function CutePinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]">
      <path
        d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z"
        fill="#C6C9F1"
        stroke="#15095D"
        strokeWidth="1.4"
      />
      <path
        d="M12 12.6s-2.6-1.6-2.6-3.3a1.4 1.4 0 0 1 2.6-.7 1.4 1.4 0 0 1 2.6.7c0 1.7-2.6 3.3-2.6 3.3z"
        fill="#E58FA9"
      />
    </svg>
  );
}

export default function HomeEmbroideryStudio() {
  const [selectedGarment, setSelectedGarment] = useState("den");
  const [monogramText, setMonogramText] = useState("H.L");
  const [selectedFont, setSelectedFont] = useState(1); // 1 = Viết tay (Great Vibes)
  const [selectedThread, setSelectedThread] = useState(1); // 1 = Trắng ngà
  const [selectedPos, setSelectedPos] = useState(0); // 0 = Ngực trái

  const currentGarment =
    GARMENTS.find((g) => g.id === selectedGarment) || GARMENTS[3];
  const currentThread = THREADS[selectedThread] || THREADS[1];
  const currentFont = FONTS[selectedFont] || FONTS[1];
  const currentPos = POSITIONS[selectedPos] || POSITIONS[0];

  const fontSize = currentFont.baseSize * currentPos.scale;
  const isDarkGarment = currentGarment.dark;

  return (
    <section
      id="studio-theu-ten"
      className="w-full bg-white py-12 sm:py-16 scroll-mt-20"
      aria-label="Xưởng thêu tên cá nhân hóa"
    >
      <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* ================================================================
              LEFT COLUMN: Live SVG T-Shirt Canvas (.stage.svgst)
              ================================================================ */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[560px] aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-[#E8EAF2] flex items-center justify-center p-4 sm:p-8 shadow-[0_4px_24px_rgba(21,9,93,0.06)] border border-[#DDE0EC] select-none">
              <svg
                viewBox="0 0 400 420"
                role="img"
                aria-label={`Xem trước áo ${currentGarment.label} thêu ${monogramText}`}
                className="w-full h-full max-h-[92%] object-contain drop-shadow-md"
              >
                <defs>
                  <linearGradient id="unlo-tshade" x1="0" x2="1">
                    <stop offset="0" stopColor="#000" stopOpacity="0.14" />
                    <stop offset="0.22" stopColor="#fff" stopOpacity="0.10" />
                    <stop offset="0.5" stopColor="#000" stopOpacity="0" />
                    <stop offset="0.8" stopColor="#fff" stopOpacity="0.07" />
                    <stop offset="1" stopColor="#000" stopOpacity="0.16" />
                  </linearGradient>
                  <clipPath id="unlo-tclip">
                    <path d={TEE_PATH} />
                  </clipPath>
                  <filter id="unlo-emb">
                    <feDropShadow
                      dx="0"
                      dy="0.8"
                      stdDeviation="0.4"
                      floodOpacity="0.35"
                    />
                  </filter>
                </defs>

                {/* Ground ellipse shadow */}
                <ellipse
                  cx="200"
                  cy="410"
                  rx="150"
                  ry="9"
                  fill="#15095D"
                  opacity="0.08"
                />

                {/* Main garment silhouette path */}
                <path
                  d={TEE_PATH}
                  fill={currentGarment.hex}
                  stroke="rgba(21,9,93,0.18)"
                  strokeWidth="1.2"
                  style={{ transition: "fill 0.4s ease" }}
                />

                {/* Clipped fabric shadows and sewing folds */}
                <g clipPath="url(#unlo-tclip)">
                  <rect width="400" height="420" fill="url(#unlo-tshade)" />
                  <path
                    d="M96 158 Q110 250 100 400M304 158 Q290 250 300 400"
                    stroke="rgba(0,0,0,0.08)"
                    strokeWidth="10"
                    fill="none"
                  />
                  <path
                    d="M140 230 Q170 260 150 330M255 260 Q240 300 262 352"
                    stroke="rgba(0,0,0,0.05)"
                    strokeWidth="6"
                    fill="none"
                  />
                  <path
                    d="M78 66 Q96 120 96 158M322 66 Q304 120 304 158"
                    stroke="rgba(0,0,0,0.12)"
                    strokeWidth="1.4"
                    fill="none"
                    strokeDasharray="3 3"
                  />
                </g>

                {/* Neck ribbing inner depth */}
                <path
                  d="M150 36 Q200 82 250 36 Q200 56 150 36Z"
                  fill={
                    isDarkGarment ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.16)"
                  }
                />
                {/* Collar rib line */}
                <path
                  d="M147 37 Q200 92 253 37"
                  fill="none"
                  stroke={
                    isDarkGarment
                      ? "rgba(255,255,255,0.12)"
                      : "rgba(0,0,0,0.14)"
                  }
                  strokeWidth="7"
                />

                {/* Live Embroidered Monogram with Drop-Shadow & Stitches */}
                <text
                  x={currentPos.x}
                  y={currentPos.y}
                  textAnchor="middle"
                  fontFamily={currentFont.family}
                  fontWeight={currentFont.weight}
                  fontSize={fontSize}
                  fill={currentThread.hex}
                  stroke={currentThread.hex}
                  strokeWidth="0.5"
                  strokeDasharray="1.6 1"
                  filter="url(#unlo-emb)"
                  letterSpacing="1"
                  className="transition-all duration-300"
                >
                  {monogramText || " "}
                </text>
              </svg>

              {/* Tagline Pill */}
              <span className="absolute left-4 sm:left-5 bottom-4 sm:bottom-5 bg-white/95 backdrop-blur-xs rounded-full px-3.5 py-1.5 text-[11px] uppercase tracking-[0.14em] font-semibold text-[#15095D] shadow-xs border border-[#DDE0EC]">
                Màu thực tế · {currentGarment.label}
              </span>
            </div>
          </div>

          {/* ================================================================
              RIGHT COLUMN: Interactive Configuration Form (.form)
              ================================================================ */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#443EB1]">
                UNLO Studio · Cá nhân hóa
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#15095D] leading-tight mt-1.5">
                Thêu tên của bạn lên đồ cơ bản
              </h2>
              <p className="text-xs sm:text-sm text-[#5E607E] leading-relaxed mt-2.5">
                Thêu ở công đoạn cuối, sau khi áo đã qua QC. Tối đa 12 ký tự, chỉ
                thêu cao cấp, hoàn tất trong 1–2 ngày.
              </p>
            </div>

            <div className="space-y-5">
              {/* Step 1: Màu áo */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-[#ECEDFB] grid place-items-center shrink-0">
                    <CuteShirtIcon />
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#15095D]">
                    MÀU ÁO
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                  {GARMENTS.map((g) => {
                    const isSelected = selectedGarment === g.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setSelectedGarment(g.id)}
                        aria-pressed={isSelected}
                        className={`rounded-xl p-1.5 bg-white border-2 text-center flex flex-col items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "border-[#15095D] -translate-y-1 shadow-md"
                            : "border-[#DDE0EC] hover:-translate-y-0.5"
                        }`}
                      >
                        <span
                          className="w-full aspect-[1.1] rounded-lg grid place-items-center shadow-inner"
                          style={{ backgroundColor: g.hex }}
                        >
                          {isSelected && (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={g.dark ? "#ffffff" : "#15095D"}
                              strokeWidth="2.5"
                              className="w-4 h-4"
                            >
                              <path d="M5 12.5l4.2 4.2L19 7" />
                            </svg>
                          )}
                        </span>
                        <span className="text-[10px] font-semibold text-[#15095D] line-clamp-1">
                          {g.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Nội dung thêu */}
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-[#ECEDFB] grid place-items-center shrink-0">
                    <CuteNeedleIcon />
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#15095D]">
                    NỘI DUNG THÊU
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={12}
                  value={monogramText}
                  onChange={(e) => setMonogramText(e.target.value)}
                  placeholder="Ví dụ: H.L hoặc K65"
                  aria-label="Nội dung thêu"
                  className="w-full border-2 border-[#DDE0EC] focus:border-[#443EB1] bg-white rounded-xl px-4 py-3 text-sm sm:text-base text-[#15095D] font-medium outline-none transition-colors"
                />
              </div>

              {/* Step 3: Kiểu chữ */}
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-[#ECEDFB] grid place-items-center shrink-0">
                    <CuteAaIcon />
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#15095D]">
                    KIỂU CHỮ
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {FONTS.map((f) => {
                    const isSelected = selectedFont === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setSelectedFont(f.id)}
                        aria-pressed={isSelected}
                        style={{ fontFamily: f.family }}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 cursor-pointer border ${
                          isSelected
                            ? "bg-[#15095D] text-white border-[#15095D] shadow-xs"
                            : "bg-white text-[#15095D] border-[#DDE0EC] hover:bg-[#F4F5FB]"
                        }`}
                      >
                        {f.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Màu chỉ */}
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-[#ECEDFB] grid place-items-center shrink-0">
                    <CuteSpoolIcon />
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#15095D]">
                    MÀU CHỈ
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2.5 max-w-md">
                  {THREADS.map((t, idx) => {
                    const isSelected = selectedThread === idx;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedThread(idx)}
                        aria-pressed={isSelected}
                        className={`rounded-xl p-2 bg-white border-2 text-center flex flex-col items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "border-[#15095D] -translate-y-1 shadow-md"
                            : "border-[#DDE0EC] hover:-translate-y-0.5"
                        }`}
                      >
                        <span
                          className="w-8 h-8 rounded-full grid place-items-center shadow-inner"
                          style={{ backgroundColor: t.hex }}
                        >
                          {isSelected && (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={t.dark ? "#ffffff" : "#15095D"}
                              strokeWidth="2.5"
                              className="w-3.5 h-3.5"
                            >
                              <path d="M5 12.5l4.2 4.2L19 7" />
                            </svg>
                          )}
                        </span>
                        <span className="text-[10px] font-semibold text-[#15095D]">
                          {t.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 5: Vị trí */}
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-[#ECEDFB] grid place-items-center shrink-0">
                    <CutePinIcon />
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#15095D]">
                    VỊ TRÍ
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {POSITIONS.map((p) => {
                    const isSelected = selectedPos === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPos(p.id)}
                        aria-pressed={isSelected}
                        className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer border ${
                          isSelected
                            ? "bg-[#15095D] text-white border-[#15095D] shadow-xs"
                            : "bg-white text-[#15095D] border-[#DDE0EC] hover:bg-[#F4F5FB]"
                        }`}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fee notice box */}
              <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-[#F4F5FB] border border-[#DDE0EC] text-xs sm:text-sm">
                <span className="font-medium text-[#5E607E]">Chi phí thêu:</span>
                <b className="font-bold text-[#15095D] text-sm sm:text-base">
                  +35.000đ / sản phẩm
                </b>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-1 flex-wrap">
                <Link
                  href={`/products/ao-thun-cotton-supima-260gsm-det-kim-nguyen-khoi-690000000000000000000101?pers=true&text=${encodeURIComponent(
                    monogramText || "H.L",
                  )}&font=${
                    selectedFont === 1
                      ? "italic_atelier"
                      : selectedFont === 2
                      ? "sans_architect"
                      : "serif_minimal"
                  }&thread=${encodeURIComponent(
                    currentThread.hex,
                  )}&pos=${
                    selectedPos === 1 ? "chest_pocket" : selectedPos === 2 ? "hem" : "left_cuff"
                  }#studio`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#15095D] text-white hover:bg-[#1F0C85] text-xs sm:text-sm font-bold uppercase tracking-[0.08em] shadow-sm transition-all duration-200"
                >
                  <span>Chọn áo để thêu</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/returns"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 border-[#15095D] text-[#15095D] hover:bg-[#15095D] hover:text-white text-xs sm:text-sm font-bold uppercase tracking-[0.08em] transition-all duration-200"
                >
                  Tìm hiểu thêm
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
