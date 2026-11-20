"use client";

import React from "react";

const MARQUEE_ITEMS = [
  "GIÁ TRỊ KHÔNG CẦN GỌI TÊN",
  "CHẤT LƯỢNG",
  "MINH BẠCH",
  "GIÁ CẢ XỨNG ĐÁNG",
  "BLACK FRIDAY",
];

function MarqueeGroup({ ariaHidden = false }) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="flex items-center shrink-0 space-x-6 sm:space-x-10 pr-6 sm:pr-10"
    >
      {/* Lặp 3 lần chu kỳ để đảm bảo track luôn phủ kín mọi màn hình siêu rộng */}
      {[0, 1, 2].map((cycle) => (
        <React.Fragment key={cycle}>
          {MARQUEE_ITEMS.map((item, idx) => (
            <span
              key={`${cycle}-${idx}`}
              className="inline-flex items-center space-x-6 sm:space-x-10 whitespace-nowrap"
            >
              <span className="font-semibold tracking-[0.18em] uppercase text-[11px] sm:text-xs text-[#FCFDF1]">
                {item}
              </span>
              <span
                className="text-[#9EA1D2] font-serif text-xs select-none not-italic"
                aria-hidden="true"
              >
                ✦
              </span>
            </span>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function BrandMarquee() {
  return (
    <aside
      aria-label="Thông điệp thương hiệu UNLO"
      tabIndex={0}
      className="relative w-full overflow-hidden bg-[#15095D] border-y border-[#1F0C85] py-2.5 sm:py-3 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-[#9EA1D2] select-none"
    >
      <div className="flex w-max animate-marquee">
        <MarqueeGroup />
        <MarqueeGroup ariaHidden={true} />
      </div>
    </aside>
  );
}
