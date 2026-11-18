"use client";

import Link from "next/link";

/**
 * PosterConfidence — Editorial Magazine Poster "built in CONFIDENCE"
 * Chuẩn từ posterConfidence() trong index.html
 */
export default function PosterConfidence() {
  return (
    <section className="w-full py-6 sm:py-8" aria-label="Bộ ảnh built in CONFIDENCE">
      <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/products?category=cotton-basics"
          className="group relative block w-full rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/7] min-h-[380px] sm:min-h-[460px] md:min-h-[520px] bg-gradient-to-b from-[#D9DAE1] to-[#C9CAD3] shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 isolate [container-type:inline-size]"
          aria-label="Khám phá bộ sưu tập Áo thun cơ bản — built in CONFIDENCE"
        >
          {/* Top Left Brand Logo */}
          <div className="absolute z-10 top-[4cqw] left-[5cqw]">
            <img
              src="/assets/logo/unlo-header.png"
              alt="UNLO"
              className="h-[clamp(18px,2.4cqw,32px)] w-auto object-contain opacity-85"
            />
          </div>

          {/* Script Text "built in" */}
          <span
            aria-hidden="true"
            className="absolute z-10 left-[5cqw] top-[9cqw] font-serif italic text-[7.5cqw] text-[#4A4A5A] leading-none -rotate-4 pointer-events-none select-none"
            style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
          >
            built in
          </span>

          {/* Big Headline "CONFIDENCE" */}
          <span
            aria-hidden="true"
            className="absolute z-[1] inset-x-[4cqw] top-[14cqw] text-center font-serif font-normal text-[12.5cqw] text-[#56566A] tracking-[0.02em] leading-none pointer-events-none select-none"
            style={{ fontFamily: "var(--font-serif), 'Libre Bodoni', serif" }}
          >
            CONFIDENCE
          </span>

          {/* Center Cutout Model */}
          <img
            src="/assets/img/cut-tee-man.webp"
            alt="Người mẫu áo thun trắng, quần kaki — UNLO Basics"
            loading="lazy"
            className="absolute bottom-0 left-[48%] -translate-x-1/2 z-[2] h-[94%] w-auto max-w-none object-contain pointer-events-none drop-shadow-[0_18px_30px_rgba(0,0,0,0.22)] transition-transform duration-500 ease-out group-hover:-translate-x-1/2 group-hover:-translate-y-1 group-hover:scale-[1.02]"
          />

          {/* Side Editorial Statement */}
          <div className="absolute z-10 right-[6cqw] top-[30cqw] text-[#3E3E52] text-[clamp(0.75rem,1.7cqw,1.25rem)] leading-snug text-left hidden sm:block pointer-events-none">
            <p>không cần logo.</p>
            <p>chỉ cần vừa vặn.</p>
            <i className="block h-[1px] w-[20cqw] bg-[#56566A] mt-2.5" />
          </div>

          {/* Star Sparkle 1 */}
          <span
            aria-hidden="true"
            className="absolute z-10 right-[7cqw] top-[12cqw] w-[3.4cqw] text-[#56566A] pointer-events-none"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-auto">
              <path d="M12 0c.6 6.5 5.5 11.4 12 12-6.5.6-11.4 5.5-12 12-.6-6.5-5.5-11.4-12-12C6.5 11.4 11.4 6.5 12 0z" />
            </svg>
          </span>

          {/* Star Sparkle 2 */}
          <span
            aria-hidden="true"
            className="absolute z-10 right-[5.4cqw] top-[40cqw] w-[1.8cqw] text-[#56566A] pointer-events-none"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-auto">
              <path d="M12 0c.6 6.5 5.5 11.4 12 12-6.5.6-11.4 5.5-12 12-.6-6.5-5.5-11.4-12-12C6.5 11.4 11.4 6.5 12 0z" />
            </svg>
          </span>

          {/* Micro Typography: Bottom Left with Barcode */}
          <div className="absolute z-10 bottom-[5cqw] left-[6cqw] text-[#3E3E52] text-[clamp(0.5rem,1.1cqw,0.75rem)] uppercase tracking-[0.2em] font-medium leading-relaxed pointer-events-none">
            <span className="block w-[18cqw] h-[1px] bg-[#56566A] mb-2" />
            <p>MẶC ĐƠN GIẢN.</p>
            <p>SỐNG TỰ TIN.</p>
            {/* Barcode Graphic */}
            <span
              className="block mt-2.5 w-[16cqw] h-[3.2cqw] max-w-[120px]"
              style={{
                background:
                  "repeating-linear-gradient(90deg, #3E3E52 0 2px, transparent 2px 4px, #3E3E52 4px 5px, transparent 5px 8px, #3E3E52 8px 11px, transparent 11px 12px)",
              }}
            />
          </div>

          {/* Micro Typography: Bottom Right with Stamp */}
          <div className="absolute z-10 bottom-[5cqw] right-[6cqw] text-[#3E3E52] text-[clamp(0.5rem,1.1cqw,0.75rem)] uppercase tracking-[0.2em] font-medium leading-relaxed text-right pointer-events-none hidden sm:block">
            <div className="w-[4.8cqw] h-[4.8cqw] min-w-[34px] min-height-[34px] rounded-full border border-[#56566A] grid place-items-center ml-auto mb-2 font-serif text-[1.4em] font-bold">
              UN
            </div>
            <p>EST. 2026</p>
            <span className="block w-[9cqw] h-[1px] bg-[#56566A] my-2 ml-auto" />
            <p>tối giản.</p>
            <p>bền bỉ.</p>
            <p>của bạn.</p>
          </div>
        </Link>
      </div>
    </section>
  );
}
