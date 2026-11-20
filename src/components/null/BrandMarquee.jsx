"use client";

import React from "react";
import { useLanguage } from "@/i18n/useLanguage";

const MARQUEE_SEGMENTS_VI = [
  "BLACK FRIDAY 27.11 · GIẢM ĐẾN 50%",
  "MIỄN PHÍ GIAO HÀNG CHO KIỆN TỪ 499.000Đ",
  "GIÁ XƯỞNG GIẢM THEO SỐ LƯỢNG TỪ 10 SẢN PHẨM",
  "TIÊU CHUẨN MINH BẠCH XUẤT XƯỞNG OEM",
];

const MARQUEE_SEGMENTS_EN = [
  "BLACK FRIDAY NOV 27 · UP TO 50% OFF",
  "FREE NATIONWIDE SHIPPING ON ORDERS FROM 499,000₫",
  "FACTORY BULK VOLUME DISCOUNT FOR 10+ ITEMS",
  "OEM EXPORT STANDARD APPAREL",
];

function MarqueeGroup({ segments, ariaHidden = false }) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="flex items-center shrink-0 space-x-6 sm:space-x-10 pr-6 sm:pr-10"
    >
      {[0, 1, 2, 3].map((cycle) => (
        <React.Fragment key={cycle}>
          {segments.map((item, idx) => (
            <span
              key={`${cycle}-${idx}`}
              className="inline-flex items-center space-x-6 sm:space-x-10 whitespace-nowrap"
            >
              <span className="font-semibold tracking-[0.16em] uppercase text-[11px] sm:text-xs text-white">
                {item}
              </span>
              <span
                className="text-white/60 text-xs select-none not-italic font-bold"
                aria-hidden="true"
              >
                –
              </span>
            </span>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function BrandMarquee() {
  const { lang } = useLanguage();
  const segments = lang === "en" ? MARQUEE_SEGMENTS_EN : MARQUEE_SEGMENTS_VI;

  return (
    <aside
      aria-label="Thông báo ưu đãi website UNLO"
      tabIndex={0}
      className="relative w-full overflow-hidden bg-[#15095D] border-b border-[#1F0C85] py-2.5 sm:py-3 focus:outline-none select-none z-10"
    >
      <div className="flex w-max animate-marquee">
        <MarqueeGroup segments={segments} />
        <MarqueeGroup segments={segments} ariaHidden={true} />
      </div>
    </aside>
  );
}
