"use client";

import { useEffect, useState, useRef } from "react";
import { ShoppingBag, ShieldCheck, Eye, Factory, Users } from "lucide-react";

export const STATS_DATA = [
  {
    target: 1280,
    suffix: "+",
    label: "Lượt đặt trước (pre-order) cho bộ sưu tập Đông",
    icon: ShoppingBag,
  },
  {
    target: 864,
    suffix: "",
    label: "Đơn hàng đã nghiệm thu QC và giao thành công",
    icon: ShieldCheck,
  },
  {
    target: 48500,
    suffix: "+",
    label: "Lượt tiếp cận trên TikTok và Instagram",
    icon: Eye,
  },
  {
    target: 3,
    suffix: "",
    label: "Xưởng may đã thẩm định tại chỗ (Hưng Yên, Bình Dương)",
    icon: Factory,
  },
  {
    target: 52,
    suffix: "+",
    label: "CLB và doanh nghiệp tin tưởng đồng hành",
    icon: Users,
  },
];

export default function LiveStatCounterBanner({ season }) {
  const [counts, setCounts] = useState(() => STATS_DATA.map((s) => s.target));
  const containerRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const startTime = performance.now();
          const duration = 1400;

          const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);
            // Cubic ease out
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts(
              STATS_DATA.map((s) => Math.round(s.target * easeOut))
            );

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-20 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 mt-8 sm:mt-12 lg:mt-14 pointer-events-auto"
    >
      <div className="bg-white rounded-3xl border border-[#DCE0E7] shadow-[0_24px_60px_-20px_rgba(21,9,93,0.18)] overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[#DCE0E7]/80">
          {STATS_DATA.map((s, idx) => {
            const Icon = s.icon;
            const currentVal = counts[idx] ?? s.target;
            const displayLabel =
              idx === 0
                ? season?.key === "about"
                  ? "Lượt đặt trước (pre-order) cho dòng sản phẩm xưởng M2C"
                  : `Lượt đặt trước (pre-order) cho bộ sưu tập ${season?.name || "Đông"}`
                : s.label;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 lg:p-7 space-y-2 hover:bg-[#F6F7FC] transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#EFF2F9] text-[#32259B] grid place-items-center group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-[#32259B]" />
                </div>
                <div className="space-y-0.5">
                  <div className="font-serif font-bold text-2xl sm:text-3xl text-[#15095D] tabular-nums tracking-tight flex items-baseline">
                    <span>{currentVal.toLocaleString("vi-VN")}</span>
                    <span className="text-[#32259B] text-lg font-bold ml-0.5">
                      {s.suffix}
                    </span>
                  </div>
                  <p className="text-xs text-[#4E567A] leading-relaxed line-clamp-2">
                    {displayLabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-[11px] text-[#8D8DC7] text-right mt-2 mr-2">
        Số liệu thực tế cập nhật từ hệ thống quản lý đơn hàng UNLO M2C{season?.name ? ` · Bộ sưu tập ${season.name}` : ""}
      </p>
    </div>
  );
}
