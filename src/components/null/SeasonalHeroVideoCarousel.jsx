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
    headlinePart1: "Giá trị",
    headlinePart2: "không cần gọi tên",
    lead: "Với UNLO, giá trị không nằm ở cái tên mà hiện diện trong từng thớ vải, từng đường kim mũi chỉ và trong mỗi lựa chọn xứng đáng mỗi ngày.",
    video: "/assets/video/hero-dong.mp4",
    poster: "/assets/img/poster-dong.jpg",
    ctaLink: "/products?season=dong",
    b2bLink: "/b2b",
    picks: ["p-hoodie", "p-sweat", "p-sweat-hong", "p-kaki"],
  },
  {
    key: "about",
    name: "Triết lý",
    icon: Sparkles,
    accent: "#EB6D48",
    badge: "BIG IDEA · VỀ UNLO",
    headlinePart1: "Đôi tay",
    headlinePart2: "người thợ Việt",
    lead: "Có những giá trị chẳng cần gọi tên vẫn luôn được trân trọng: đôi tay mẹ khâu lại chiếc cúc áo, hay những đường kim mũi chỉ của người thợ vô danh tại xưởng.",
    video: "/assets/video/hero-dong.mp4",
    poster: "/assets/img/about-image1.png",
    ctaLink: "/pages/about",
    ctaText: "Khám phá câu chuyện",
    b2bLink: "/b2b",
    picks: ["p-tee-250", "p-oxford", "p-kaki", "p-hoodie"],
  },
];

export default function SeasonalHeroVideoCarousel({ onSeasonChange }) {
  const [currentIdx, setCurrentIdx] = useState(3); // Default to Đông (season of campaign)
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef([]);
  const containerRef = useRef(null);
  const touchStartRef = useRef(null);

  const activeSeason = SEASONS[currentIdx];

  const handleSelectSeason = (idx) => {
    const nextIdx = (idx + SEASONS.length) % SEASONS.length;
    setCurrentIdx(nextIdx);
    onSeasonChange?.(SEASONS[nextIdx]);
  };

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
      className="relative overflow-hidden bg-[#15095D] text-white touch-pan-y select-none"
      aria-roledescription="carousel"
      aria-label="Trang chủ theo mùa UNLO"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Floating Season Tabs Pill */}
      <div className="absolute z-30 top-5 sm:top-7 left-1/2 -translate-x-1/2 flex items-center gap-1 sm:gap-2 p-1 sm:p-1.5 rounded-full bg-[#15095D]/65 backdrop-blur-md border border-white/20 shadow-lg">
        {SEASONS.map((s, idx) => {
          const Icon = s.icon;
          const active = idx === currentIdx;
          return (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => handleSelectSeason(idx)}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                active
                  ? "bg-white text-[#15095D] shadow-sm scale-105"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon
                className="w-3.5 h-3.5"
                style={{ color: active ? "#15095D" : s.accent }}
              />
              <span>{s.name}</span>
            </button>
          );
        })}
      </div>

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
              className="relative shrink-0 w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[760px] flex items-end"
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
                    "linear-gradient(90deg, rgba(21, 9, 93, 0.88) 0%, rgba(21, 9, 93, 0.58) 42%, rgba(21, 9, 93, 0.15) 75%), linear-gradient(0deg, rgba(21, 9, 93, 0.92) 0%, rgba(21, 9, 93, 0) 42%)",
                }}
              />

              {/* Content Panel */}
              <div className="relative z-10 max-w-[1380px] w-full mx-auto px-5 sm:px-8 lg:px-12 pb-16 sm:pb-20 lg:pb-24 pt-28 space-y-5">
                {/* Season Tag */}
                <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.22em] uppercase text-white/95">
                  <span
                    className="inline-block w-7 h-0.5"
                    style={{ backgroundColor: s.accent }}
                  />
                  <span>{s.badge}</span>
                </div>

                {/* Big Editorial Headline */}
                <h1 className="font-unlo-title font-bold text-4xl sm:text-6xl lg:text-7xl leading-[1.08] max-w-2xl drop-shadow-sm">
                  {s.headlinePart1}{" "}
                  <span style={{ color: s.accent }}>{s.headlinePart2}</span>
                </h1>

                {/* Subtitle / Lead */}
                <p className="text-sm sm:text-base lg:text-lg text-[#EFF2F9]/90 max-w-xl font-normal leading-relaxed">
                  {s.lead}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href={s.ctaLink || "#cua-hang"}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#15095D] text-xs sm:text-sm font-bold tracking-wide shadow-md hover:bg-[#FCFDF1] transition-transform hover:scale-105 active:scale-95"
                  >
                    <span>{s.ctaText || "Mua bộ sưu tập"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/b2b"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/60 bg-white/10 hover:bg-white hover:text-[#15095D] text-white text-xs sm:text-sm font-bold tracking-wide backdrop-blur-md transition-all active:scale-95"
                  >
                    <span>Đặt số lượng cho CLB</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls & Season Counter (Bottom Right) */}
      <div className="absolute z-20 bottom-8 sm:bottom-12 right-5 sm:right-8 lg:right-12 flex items-center gap-2">
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
