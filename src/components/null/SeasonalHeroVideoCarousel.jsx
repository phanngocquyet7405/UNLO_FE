"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Flower2,
  Sun,
  Leaf,
  Snowflake,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
} from "lucide-react";

export const SEASONS = [
  {
    key: "xuan",
    name: "Xuân",
    icon: Flower2,
    accent: "#F4C9D6",
    badge: "Bộ sưu tập Xuân 2027",
    headlinePart1: "Nhẹ như",
    headlinePart2: "nắng xuân",
    lead: "Sơ mi chambray, áo thun melange và túi canvas cho những ngày nắng ấm đầu năm.",
    video: "/assets/video/hero-xuan.mp4",
    poster: "/assets/img/poster-xuan.jpg",
    ctaLink: "/products?season=xuan",
    b2bLink: "/b2b",
    picks: ["p-chambray", "p-tee-xam", "p-tote", "p-sweat-hong"],
  },
  {
    key: "ha",
    name: "Hạ",
    icon: Sun,
    accent: "#BFE6EC",
    badge: "Bộ sưu tập Hạ",
    headlinePart1: "Mát lành",
    headlinePart2: "từng sợi vải",
    lead: "Cotton Compact 250gsm thấm hút tốt, form chuẩn sau nhiều lần giặt. Áo thun trơn cho cả mùa hè.",
    video: "/assets/video/hero-ha.mp4",
    poster: "/assets/img/poster-ha.jpg",
    ctaLink: "/products?season=ha",
    b2bLink: "/b2b",
    picks: ["p-tee-250", "p-tee-den", "p-jogger", "p-oxford"],
  },
  {
    key: "thu",
    name: "Thu",
    icon: Leaf,
    accent: "#E8D3A8",
    badge: "Bộ sưu tập Thu",
    headlinePart1: "Ấm áp",
    headlinePart2: "vừa đủ",
    lead: "Kaki ống đứng, sơ mi denim và áo nỉ cổ tròn trong bảng màu be, rêu, kem tối giản.",
    video: "/assets/video/hero-thu.mp4",
    poster: "/assets/img/poster-thu.jpg",
    ctaLink: "/products?season=thu",
    b2bLink: "/b2b",
    picks: ["p-kaki", "p-so-mi-denim", "p-sweat", "p-oxford"],
  },
  {
    key: "dong",
    name: "Đông",
    icon: Snowflake,
    accent: "#C6C9F1",
    badge: "Bộ sưu tập Đông 2026",
    headlinePart1: "Ấm êm",
    headlinePart2: "ngày đông lạnh",
    lead: "Heavyweight Hoodie 420gsm, áo nỉ bông French Terry và áo len Merino dày dặn, giữ ấm tối ưu cho những ngày gió lạnh.",
    video: "/assets/video/hero-dong.mp4",
    poster: "/assets/img/poster-dong.jpg",
    ctaLink: "/products?season=dong",
    b2bLink: "/b2b",
    picks: ["p-hoodie", "p-sweat", "p-sweat-hong", "p-kaki"],
  },
];

export default function SeasonalHeroVideoCarousel({
  currentSeasonIdx: controlledIdx,
  onSeasonChange,
}) {
  const [internalIdx, setInternalIdx] = useState(3); // Default to Đông
  const currentIdx = controlledIdx !== undefined ? controlledIdx : internalIdx;
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef([]);
  const containerRef = useRef(null);
  const touchStartRef = useRef(null);

  const onSeasonChangeRef = useRef(onSeasonChange);
  useEffect(() => {
    onSeasonChangeRef.current = onSeasonChange;
  });

  const handleSelectSeason = (idx) => {
    const nextIdx = (idx + SEASONS.length) % SEASONS.length;
    if (controlledIdx === undefined) {
      setInternalIdx(nextIdx);
    }
    onSeasonChangeRef.current?.(nextIdx, SEASONS[nextIdx]);
  };

  useEffect(() => {
    onSeasonChangeRef.current?.(currentIdx, SEASONS[currentIdx]);
  }, [currentIdx]);

  // Tự động chuyển mùa (Xuân -> Hạ -> Thu -> Đông) theo yêu cầu DOCX
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      const nextIdx = (currentIdx + 1) % SEASONS.length;
      if (controlledIdx === undefined) {
        setInternalIdx(nextIdx);
      }
      onSeasonChangeRef.current?.(nextIdx, SEASONS[nextIdx]);
    }, 7000);
    return () => clearInterval(timer);
  }, [currentIdx, isPlaying, controlledIdx]);

  // Play active video, pause others
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === currentIdx && !prefersReducedMotion && isPlaying) {
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise) {
          playPromise.catch(() => {
            // Autoplay might be blocked until user gesture
          });
        }
      } else {
        video.pause();
      }
    });
  }, [currentIdx, isPlaying]);

  // Touch Swipe Gesture
  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartRef.current === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleSelectSeason(currentIdx + 1); // Swipe left -> next
      } else {
        handleSelectSeason(currentIdx - 1); // Swipe right -> prev
      }
    }
    touchStartRef.current = null;
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#15095D] text-white touch-pan-y select-none -mt-[var(--header-h,0px)] lg:mt-0"
      aria-roledescription="carousel"
      aria-label="Trang chủ theo mùa UNLO"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide Track */}
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] will-change-transform"
        style={{ transform: `translateX(-${currentIdx * 100}%)` }}
      >
        {SEASONS.map((s, idx) => {
          const isActive = idx === currentIdx;
          return (
            <div
              key={s.key}
              className="relative shrink-0 w-full min-h-[100svh] lg:min-h-[780px] flex items-end"
              aria-hidden={!isActive}
            >
              {/* Video with fallback poster image */}
              <video
                ref={(el) => (videoRefs.current[idx] = el)}
                src={s.video}
                poster={s.poster}
                muted={isMuted}
                loop
                playsInline
                preload={isActive ? "auto" : "none"}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Gradient Overlays for readable typography */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(21, 9, 93, 0.90) 0%, rgba(21, 9, 93, 0.62) 46%, rgba(21, 9, 93, 0.18) 78%), linear-gradient(0deg, rgba(21, 9, 93, 0.94) 0%, rgba(21, 9, 93, 0) 48%)",
                }}
              />

              {/* Content Panel (Editorial Minimalist Layout) */}
              <div className="relative z-10 max-w-[1380px] w-full mx-auto px-5 sm:px-8 lg:px-12 pb-16 sm:pb-20 lg:pb-24 pt-[calc(var(--header-h,0px)+1.5rem)] lg:pt-20 space-y-4 sm:space-y-5">
                {/* 4-Season Editorial Switcher (Clean, does not block model's face) */}
                <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#15095D]/60 backdrop-blur-md border border-white/20 shadow-md">
                  {SEASONS.map((seasonItem, seasonIdx) => {
                    const Icon = seasonItem.icon;
                    const active = seasonIdx === currentIdx;
                    return (
                      <button
                        key={seasonItem.key}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => handleSelectSeason(seasonIdx)}
                        className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                          active
                            ? "bg-white text-[#15095D] shadow-sm scale-105"
                            : "text-white/80 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <Icon
                          className="w-3.5 h-3.5"
                          style={{ color: active ? "#15095D" : seasonItem.accent }}
                        />
                        <span>{seasonItem.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Season Tag */}
                <div className="flex items-center gap-2.5 text-xs font-bold tracking-[0.22em] uppercase text-white/95 pt-1">
                  <span
                    className="inline-block w-7 h-0.5"
                    style={{ backgroundColor: s.accent }}
                  />
                  <span>{s.badge}</span>
                </div>

                {/* Big Editorial Headline (Đồng nhất font Climate Crisis theo yêu cầu DOCX) */}
                <h1 className="font-display uppercase tracking-tight text-3xl sm:text-5xl lg:text-6xl leading-[1.12] max-w-3xl drop-shadow-md">
                  {s.headlinePart1}{" "}
                  <span style={{ color: s.accent }}>{s.headlinePart2}</span>
                </h1>

                {/* Subtitle / Lead */}
                <p className="text-sm sm:text-base lg:text-lg text-[#EFF2F9]/90 max-w-xl font-normal leading-relaxed">
                  {s.lead}
                </p>

                {/* CTAs theo yêu cầu DOCX: Shop All / Shop Flashsale / Discover Now */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#15095D] text-xs sm:text-sm font-bold tracking-wider uppercase shadow-md hover:bg-[#FCFDF1] transition-transform hover:scale-105 active:scale-95"
                  >
                    <span>Shop All</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="#black-friday"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#EB6D48] text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-md hover:bg-[#D95F3B] transition-transform hover:scale-105 active:scale-95"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Shop Flashsale</span>
                  </Link>

                  <Link
                    href="/pages/about-us"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-white/50 bg-black/25 hover:bg-white hover:text-[#15095D] text-white text-xs sm:text-sm font-bold tracking-wider uppercase backdrop-blur-sm transition-all active:scale-95"
                  >
                    <span>Discover Now</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4-Season Progress Timeline (Bottom Edge) */}
      <div className="absolute z-20 bottom-0 left-0 right-0 h-1 bg-white/15 grid grid-cols-4">
        {SEASONS.map((s, idx) => (
          <button
            key={s.key}
            type="button"
            onClick={() => handleSelectSeason(idx)}
            aria-label={`Chuyển sang mùa ${s.name}`}
            className="h-full w-full transition-all duration-500 cursor-pointer"
            style={{
              backgroundColor: idx === currentIdx ? s.accent : "transparent",
            }}
          />
        ))}
      </div>

      {/* Navigation Controls & Season Counter (Lifted to bottom-24 on mobile to prevent overlapping Chatbot) */}
      <div className="absolute z-20 bottom-24 sm:bottom-12 right-5 sm:right-8 lg:right-12 flex items-center gap-2">
        <span className="font-serif text-sm sm:text-base font-bold text-white/90 mr-2 tracking-widest tabular-nums select-none">
          0{currentIdx + 1} / 0{SEASONS.length}
        </span>

        <button
          type="button"
          onClick={() => handleSelectSeason(currentIdx - 1)}
          aria-label="Xem mùa trước"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/60 bg-white/10 hover:bg-white hover:text-[#15095D] text-white grid place-items-center backdrop-blur-md transition-all active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => handleSelectSeason(currentIdx + 1)}
          aria-label="Xem mùa kế tiếp"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/60 bg-white/10 hover:bg-white hover:text-[#15095D] text-white grid place-items-center backdrop-blur-md transition-all active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Video Audio Mute / Pause Toggle */}
        <button
          type="button"
          onClick={() => setIsMuted(!isMuted)}
          aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          className="w-9 h-9 rounded-full border border-white/30 bg-black/30 hover:bg-white/20 text-white/80 hover:text-white grid place-items-center ml-2 backdrop-blur-sm transition-all cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </section>
  );
}
