"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/useLanguage";

export const SEASONAL_COLLECTIONS = [
  {
    key: "xuan",
    titleVi: "BỘ SƯU TẬP XUÂN",
    titleEn: "SPRING COLLECTION",
    descVi: "Nhẹ như nắng xuân — Sơ mi chambray & túi canvas dệt thoi mộc.",
    descEn: "Light as Spring — Chambray shirts & natural woven canvas.",
    img: "/assets/img/poster-xuan.jpg",
    link: "/products?season=xuan",
    accent: "#F4C9D6",
  },
  {
    key: "ha",
    titleVi: "BỘ SƯU TẬP HẠ",
    titleEn: "SUMMER COLLECTION",
    descVi: "Mát lành từng sợi vải — Cotton Compact 250gsm thoáng khí.",
    descEn: "Pure Breathable Comfort — Cotton Compact 250gsm for all-day freshness.",
    img: "/assets/img/poster-ha.jpg",
    link: "/products?season=ha",
    accent: "#BFE6EC",
  },
  {
    key: "thu",
    titleVi: "BỘ SƯU TẬP THU",
    titleEn: "AUTUMN COLLECTION",
    descVi: "Ấm áp vừa đủ — Kaki đứng form & sơ mi denim tối giản.",
    descEn: "Just Enough Warmth — Structured chinos & minimalist denim.",
    img: "/assets/img/poster-thu.jpg",
    link: "/products?season=thu",
    accent: "#E8D3A8",
  },
  {
    key: "dong",
    titleVi: "BỘ SƯU TẬP ĐÔNG",
    titleEn: "WINTER COLLECTION",
    descVi: "Ấm êm ngày đông lạnh — Heavyweight Hoodie 420gsm & nỉ bông dày dặn.",
    descEn: "Cozy Winter Days — Heavyweight 420gsm Fleece Hoodies & Merino Wool.",
    img: "/assets/img/poster-dong.jpg",
    link: "/products?season=dong",
    accent: "#C6C9F1",
  },
];

export default function SeasonalCollectionsSection() {
  const { lang, t } = useLanguage();

  return (
    <section
      aria-label="Bộ sưu tập theo 4 mùa"
      className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-20 space-y-10"
    >
      {/* Title with display font supporting full Vietnamese typography */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="font-display font-black uppercase text-3xl sm:text-5xl lg:text-6xl text-[#15095D] tracking-tight">
          {t("BỘ SƯU TẬP THEO MÙA", "SHOP BY COLLECTIONS")}
        </h2>
        <p className="text-xs sm:text-sm text-[#4E567A] uppercase tracking-[0.16em] font-semibold">
          {t(
            "Xuân — Hạ — Thu — Đông · Chuẩn mực vải dệt xuất xưởng",
            "Spring — Summer — Autumn — Winter · Direct From Mills"
          )}
        </p>
      </div>

      {/* 2x2 Grid of 4 Seasons (Ref: Woodera layout in docx) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {SEASONAL_COLLECTIONS.map((c) => {
          const title = lang === "en" ? c.titleEn : c.titleVi;
          const desc = lang === "en" ? c.descEn : c.descVi;

          return (
            <div
              key={c.key}
              className="group relative rounded-3xl overflow-hidden bg-[#F4EFEB] border border-[#DCE0E7] aspect-[16/10] sm:aspect-[16/9] flex items-end p-6 sm:p-10 shadow-sm hover:shadow-md transition-all"
            >
              {/* Background Image */}
              <img
                src={c.img}
                alt={title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Scrim for readable text */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#15095D]/90 via-[#15095D]/40 to-transparent pointer-events-none" />

              {/* Editorial Content */}
              <div className="relative z-10 space-y-2.5 max-w-lg">
                <span
                  className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-[#15095D] shadow-xs"
                  style={{ backgroundColor: c.accent }}
                >
                  {c.key.toUpperCase()}
                </span>

                <h3 className="font-display font-black uppercase text-2xl sm:text-3xl text-white tracking-tight drop-shadow-sm">
                  {title}
                </h3>

                <p className="text-xs sm:text-sm text-white/90 line-clamp-2 font-normal">
                  {desc}
                </p>

                <div className="pt-2">
                  <Link
                    href={c.link}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#15095D] hover:bg-[#FCFDF1] text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-sm"
                  >
                    <span>{t("KHÁM PHÁ NGAY", "SHOP NOW")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
