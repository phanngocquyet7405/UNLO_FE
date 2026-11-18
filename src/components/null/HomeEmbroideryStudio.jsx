"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  SEASONS,
  VIEWS,
  PLACEMENTS,
  FONTS,
  seasonByMonth,
} from "@/lib/seasonalGarments";

const THREADS = [
  { id: "cham", label: "Chàm", hex: "#1F2A6B", dark: true },
  { id: "trang", label: "Trắng ngà", hex: "#F6F2E6", dark: false },
  { id: "lav", label: "Oải hương", hex: "#8E88D6", dark: false },
  { id: "bac", label: "Bạc", hex: "#B9BCC6", dark: false },
  { id: "den", label: "Đen", hex: "#1B1B20", dark: true },
];

const PRODUCT_SLUG =
  "ao-thun-cotton-supima-260gsm-det-kim-nguyen-khoi-690000000000000000000101";

/* ---------- Icon nhỏ cho các bước (giữ nguyên bộ icon cũ của UNLO) ---------- */
function StepIcon({ children }) {
  return (
    <span className="w-8 h-8 rounded-xl bg-[#ECEDFB] grid place-items-center shrink-0">
      <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" aria-hidden="true">
        {children}
      </svg>
    </span>
  );
}

const ICON_SEASON = (
  <>
    <circle cx="12" cy="12" r="4.2" fill="#F2D27A" stroke="#15095D" strokeWidth="1.3" />
    <path
      d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.5 1.5M16.9 16.9l1.5 1.5M5.6 18.4l1.5-1.5M16.9 7.1l1.5-1.5"
      stroke="#15095D"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </>
);
const ICON_NEEDLE = (
  <>
    <path d="M19.5 3.5 6.5 16.5" stroke="#15095D" strokeWidth="1.8" strokeLinecap="round" />
    <path
      d="M18 5.5c-5 1-3 6-8 7.5s-6 4-5 7"
      stroke="#E58FA9"
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
      strokeDasharray="2.2 1.6"
    />
  </>
);
const ICON_AA = (
  <>
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
    <path d="M19.5 3l.7 1.7 1.8.7-1.8.7-.7 1.7-.7-1.7-1.8-.7 1.8-.7z" fill="#8E88D6" />
  </>
);
const ICON_SPOOL = (
  <>
    <rect x="5" y="3.5" width="14" height="3" rx="1.2" fill="#B9B6F2" stroke="#15095D" strokeWidth="1.3" />
    <rect x="5" y="17.5" width="14" height="3" rx="1.2" fill="#B9B6F2" stroke="#15095D" strokeWidth="1.3" />
    <rect x="7" y="6.5" width="10" height="11" fill="#E58FA9" stroke="#15095D" strokeWidth="1.3" />
    <path d="M7 9.5h10M7 12h10M7 14.5h10" stroke="#fff" strokeWidth=".9" opacity=".8" />
  </>
);
const ICON_PIN = (
  <>
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
  </>
);

function StepTitle({ icon, children }) {
  return (
    <div className="flex items-center gap-2.5">
      <StepIcon>{icon}</StepIcon>
      <h3 className="text-sm font-semibold text-[#15095D]">{children}</h3>
    </div>
  );
}

const chipBase =
  "px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#443EB1]";
const chipOn = "bg-[#15095D] text-white border-[#15095D]";
const chipOff = "bg-white text-[#15095D] border-[#DDE0EC] hover:bg-[#F4F5FB]";

export default function HomeEmbroideryStudio() {
  const [pickedSeason, setPickedSeason] = useState(null);
  const [viewId, setViewId] = useState("flat");
  const [text, setText] = useState("H.L");
  const [fontIdx, setFontIdx] = useState(1);
  const [threadIdx, setThreadIdx] = useState(0);
  const [placementId, setPlacementId] = useState("chest");

  /* Mặc định mở đúng mùa hiện tại. Server luôn trả "summer" nên không lệch khi hydrate;
     sau khi hydrate, client tự chuyển sang mùa theo tháng (trừ khi người dùng đã chọn). */
  const autoSeasonId = useSyncExternalStore(
    () => () => {},
    () => seasonByMonth(new Date().getMonth() + 1),
    () => "summer",
  );
  const seasonId = pickedSeason ?? autoSeasonId;

  const season = SEASONS.find((s) => s.id === seasonId) || SEASONS[0];
  const view = season.views[viewId];
  const font = FONTS[fontIdx];
  const thread = THREADS[threadIdx];
  const placement = PLACEMENTS.find((p) => p.id === placementId) || PLACEMENTS[0];
  const spot = view.spots[placementId];

  const labelOf = (p) => p.label || season.centerLabel;

  /* Chữ dài thì thu nhỏ để không tràn khỏi vùng thêu */
  const len = Math.max(text.trim().length, 1);
  const fit = len > 6 ? Math.max(6 / len, 0.6) : 1;
  const fontSizeCqw = spot.size * view.k * font.factor * fit;

  const href =
    `/products/${PRODUCT_SLUG}?pers=true` +
    `&season=${season.id}` +
    `&text=${encodeURIComponent(text || "H.L")}` +
    `&font=${font.productFont}` +
    `&thread=${encodeURIComponent(thread.hex)}` +
    `&pos=${placement.productPos}#studio`;

  return (
    <section
      id="studio-theu-ten"
      className="w-full bg-white py-12 sm:py-16 scroll-mt-20"
      aria-label="Xưởng thêu tên cá nhân hóa theo mùa"
    >
      <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* ============================ SÂN KHẤU ============================ */}
          <div className="lg:col-span-6 flex flex-col items-center gap-3 lg:sticky lg:top-24">
            <div
              className="relative w-full max-w-[560px] aspect-[4/5] rounded-3xl overflow-hidden bg-[#E9ECF5] border border-[#DDE0EC] select-none"
              style={{ containerType: "inline-size" }}
            >
              {/* Bộ lọc tạo vân chỉ thêu */}
              <svg className="absolute w-0 h-0" aria-hidden="true">
                <defs>
                  <filter id="unlo-home-thread" x="-10%" y="-10%" width="120%" height="120%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.95 0.15" numOctaves="2" result="grain" />
                    <feDisplacementMap in="SourceGraphic" in2="grain" scale="0.8" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
              </svg>

              {/* Xếp chồng cả 6 ảnh, chỉ ảnh đang chọn hiện ra (chuyển cảnh mượt) */}
              {SEASONS.flatMap((s) =>
                VIEWS.map((v) => {
                  const active = s.id === season.id && v.id === viewId;
                  return (
                    <Image
                      key={`${s.id}-${v.id}`}
                      src={s.views[v.id].src}
                      alt={active ? `${s.product} trắng, ${v.label.toLowerCase()}` : ""}
                      aria-hidden={!active}
                      fill
                      sizes="(min-width: 1024px) 560px, 100vw"
                      priority={s.id === "summer" && v.id === "flat"}
                      className={`object-cover transition-opacity duration-500 motion-reduce:transition-none ${
                        active ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  );
                }),
              )}

              {/* Chấm chạm để đổi vị trí thêu */}
              {PLACEMENTS.map((p) => {
                const s = view.spots[p.id];
                const on = p.id === placementId;
                if (on) return null;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlacementId(p.id)}
                    aria-label={`Thêu ở ${labelOf(p).toLowerCase()}`}
                    className="absolute w-9 h-9 -translate-x-1/2 -translate-y-1/2 grid place-items-center cursor-pointer group focus-visible:outline-2 focus-visible:outline-[#443EB1] rounded-full"
                    style={{ left: `${s.x}%`, top: `${s.y}%` }}
                  >
                    <span className="w-3 h-3 rounded-full bg-white/90 border border-[#15095D]/40 shadow-sm group-hover:bg-[#15095D] group-hover:border-white transition-colors" />
                  </button>
                );
              })}

              {/* Chữ thêu */}
              <div
                className="absolute pointer-events-none z-10 transition-all duration-500 motion-reduce:transition-none"
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  transform: `translate(-50%, -50%) rotate(${spot.rot}deg)`,
                }}
              >
                <span
                  className="block whitespace-nowrap leading-none"
                  role="img"
                  aria-label={`Chữ thêu: ${text || "H.L"}`}
                  style={{
                    fontFamily: font.family,
                    fontWeight: font.weight,
                    fontSize: `${fontSizeCqw}cqw`,
                    color: thread.hex,
                    letterSpacing: "0.08em",
                    filter: "url(#unlo-home-thread)",
                    textShadow: thread.dark
                      ? "0.5px 0.5px 0 rgba(255,255,255,0.55), -0.4px -0.4px 0 rgba(0,0,0,0.35), 0 1px 1.5px rgba(0,0,0,0.35)"
                      : "0.5px 0.5px 0 rgba(255,255,255,0.7), -0.5px -0.5px 0 rgba(0,0,0,0.3), 0 1px 1.5px rgba(0,0,0,0.4)",
                  }}
                >
                  {text || " "}
                </span>
              </div>

              {/* Chuyển góc nhìn */}
              <div
                className="absolute right-3 bottom-3 z-20 flex rounded-full bg-white/95 border border-[#DDE0EC] p-0.5 shadow-xs"
                role="group"
                aria-label="Góc nhìn"
              >
                {VIEWS.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setViewId(v.id)}
                    aria-pressed={viewId === v.id}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[#443EB1] ${
                      viewId === v.id ? "bg-[#15095D] text-white" : "text-[#15095D] hover:bg-[#F4F5FB]"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>

              <span className="absolute left-3 bottom-3 z-20 bg-white/95 rounded-full px-3 py-1.5 text-xs font-semibold text-[#15095D] border border-[#DDE0EC] shadow-xs">
                {season.product}, màu trắng
              </span>
            </div>
          </div>

          {/* ============================ ĐIỀU KHIỂN ============================ */}
          <div className="lg:col-span-6 space-y-7">
            <div>
              <p className="text-sm font-semibold text-[#443EB1]">UNLO Studio</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#15095D] leading-tight mt-1.5">
                Chọn áo theo mùa, thêu tên của bạn
              </h2>
              <p className="text-sm text-[#5E607E] leading-relaxed mt-2.5 max-w-xl">
                Thêu ở công đoạn cuối, sau khi áo đã qua QC. Tối đa 12 ký tự, chỉ thêu cao cấp, hoàn tất
                trong 1–2 ngày.
              </p>
            </div>

            {/* Bước 1: Mùa */}
            <div className="space-y-3">
              <StepTitle icon={ICON_SEASON}>1. Chọn mùa</StepTitle>
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {SEASONS.map((s) => {
                  const on = s.id === seasonId;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setPickedSeason(s.id);
                      }}
                      aria-pressed={on}
                      className={`text-left rounded-2xl border-2 p-2 bg-white cursor-pointer transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#443EB1] ${
                        on
                          ? "border-[#15095D] shadow-md -translate-y-0.5"
                          : "border-[#DDE0EC] hover:border-[#9EA1D2]"
                      }`}
                    >
                      <span className="relative block aspect-[4/5] rounded-xl overflow-hidden bg-[#E9ECF5]">
                        <Image
                          src={s.views.flat.src}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 180px, 30vw"
                          className="object-cover"
                        />
                      </span>
                      <span className="block px-1 pt-2 pb-1">
                        <span className="block font-serif italic text-base sm:text-lg text-[#15095D] leading-tight">
                          {s.label}
                        </span>
                        <span className="block text-xs font-semibold text-[#15095D] mt-0.5">{s.product}</span>
                        <span className="hidden sm:block text-[11px] text-[#5E607E] mt-0.5 leading-snug">
                          {s.tagline}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bước 2: Nội dung */}
            <div className="space-y-2">
              <StepTitle icon={ICON_NEEDLE}>2. Nội dung thêu</StepTitle>
              <input
                type="text"
                maxLength={12}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ví dụ: H.L hoặc K65"
                aria-label="Nội dung thêu"
                className="w-full border-2 border-[#DDE0EC] focus:border-[#443EB1] bg-white rounded-xl px-4 py-3 text-base text-[#15095D] font-medium outline-none transition-colors"
              />
              <p className="text-xs text-[#5E607E] tabular-nums">{text.length}/12 ký tự</p>
            </div>

            {/* Bước 3: Kiểu chữ */}
            <div className="space-y-2.5">
              <StepTitle icon={ICON_AA}>3. Kiểu chữ</StepTitle>
              <div className="flex flex-wrap gap-2.5">
                {FONTS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFontIdx(f.id)}
                    aria-pressed={fontIdx === f.id}
                    style={{ fontFamily: f.family }}
                    className={`${chipBase} ${fontIdx === f.id ? chipOn : chipOff}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bước 4: Màu chỉ */}
            <div className="space-y-2.5">
              <StepTitle icon={ICON_SPOOL}>4. Màu chỉ</StepTitle>
              <div className="grid grid-cols-5 gap-2.5 max-w-md">
                {THREADS.map((t, idx) => {
                  const on = threadIdx === idx;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setThreadIdx(idx)}
                      aria-pressed={on}
                      className={`rounded-xl p-2 bg-white border-2 flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#443EB1] ${
                        on ? "border-[#15095D] -translate-y-0.5 shadow-md" : "border-[#DDE0EC] hover:border-[#9EA1D2]"
                      }`}
                    >
                      <span
                        className="w-8 h-8 rounded-full grid place-items-center shadow-inner border border-black/5"
                        style={{ backgroundColor: t.hex }}
                      >
                        {on && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={t.dark ? "#ffffff" : "#15095D"}
                            strokeWidth="2.5"
                            className="w-3.5 h-3.5"
                            aria-hidden="true"
                          >
                            <path d="M5 12.5l4.2 4.2L19 7" />
                          </svg>
                        )}
                      </span>
                      <span className="text-[11px] font-semibold text-[#15095D]">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bước 5: Vị trí */}
            <div className="space-y-2.5">
              <StepTitle icon={ICON_PIN}>5. Vị trí</StepTitle>
              <div className="flex flex-wrap gap-2.5">
                {PLACEMENTS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlacementId(p.id)}
                    aria-pressed={placementId === p.id}
                    className={`${chipBase} ${placementId === p.id ? chipOn : chipOff}`}
                  >
                    {labelOf(p)}
                  </button>
                ))}
              </div>
            </div>

            {/* Chi phí */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#F4F5FB] border border-[#DDE0EC] text-sm">
              <span className="font-medium text-[#5E607E]">Chi phí thêu</span>
              <b className="font-bold text-[#15095D] text-base tabular-nums">+35.000đ / sản phẩm</b>
            </div>

            {/* Hành động */}
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href={href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#15095D] text-white hover:bg-[#1F0C85] text-sm font-bold shadow-sm transition-colors duration-200"
              >
                <span>Chọn áo để thêu</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/returns"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 border-[#15095D] text-[#15095D] hover:bg-[#15095D] hover:text-white text-sm font-bold transition-colors duration-200"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
