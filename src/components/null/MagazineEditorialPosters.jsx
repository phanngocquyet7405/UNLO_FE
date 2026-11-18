"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function MagazineEditorialPosters() {
  return (
    <section className="py-12 sm:py-16 space-y-10">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <p className="unlo-display-en text-xs sm:text-[13px] tracking-[0.2em] uppercase text-[#625FBC] font-semibold">
              LOOKBOOK &amp; TẠP CHÍ
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#15095D] tracking-tight">
              Bộ ảnh cơ bản mùa này
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4E567A] max-w-md">
            Mặc đơn giản, chất liệu cao cấp và không logo phô trương. Mọi thiết kế đều tôn vinh người mặc.
          </p>
        </div>

        {/* 3 Main Editorial Posters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* ============================================================
              POSTER 1: THE DREAM (CƠ BẢN DỌC + CUT-NAVY)
              ============================================================ */}
          <Link
            href="/products"
            className="group relative rounded-3xl overflow-hidden aspect-[3/4] bg-[#2E3370] text-white p-7 sm:p-8 flex flex-col justify-between shadow-md hover:shadow-2xl transition-all duration-500 select-none"
          >
            {/* Background Texture & Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#2E3370] via-[#1E2356] to-[#14183D] opacity-95" />

            {/* Vertical Stacked Word "CƠ BẢN" */}
            <div
              className="absolute left-6 sm:left-8 top-10 bottom-10 flex flex-col justify-between text-4xl sm:text-5xl font-black text-white/15 select-none leading-none z-0 tracking-widest font-serif"
              aria-hidden="true"
            >
              <span>C</span>
              <span>Ơ</span>
              <span>B</span>
              <span>Ả</span>
              <span>N</span>
            </div>

            {/* Cutout Model Image */}
            <div className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none">
              <img
                src="/assets/img/cut-navy.webp"
                alt="Người mẫu mặc set chàm"
                className="w-[85%] max-h-[92%] object-contain object-bottom transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>

            {/* Top Micro Label */}
            <div className="relative z-20">
              <span className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase text-[#BBC2DD]">
                THE ESSENTIALS
              </span>
            </div>

            {/* Bottom Info & CTA */}
            <div className="relative z-20 space-y-3">
              <div className="text-[11px] font-medium text-[#BBC2DD] leading-relaxed">
                <p className="font-bold text-white uppercase tracking-wider">BỘ SƯU TẬP MỚI</p>
                <p>#unlobasics · #madeinvietnam</p>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#FCFDF1]">
                <span>Khám phá ngay</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </Link>

          {/* ============================================================
              POSTER 2: Daily EDIT (CUT-CREAM)
              ============================================================ */}
          <Link
            href="/products"
            className="group relative rounded-3xl overflow-hidden aspect-[3/4] bg-[#E8DDD2] text-[#15095D] p-7 sm:p-8 flex flex-col justify-between shadow-md hover:shadow-2xl transition-all duration-500 select-none"
          >
            {/* Background Tone */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#EFE6DC] via-[#E6D9CC] to-[#D5C5B5]" />

            {/* Big Typography behind model */}
            <div className="absolute top-8 inset-x-0 text-center select-none z-0">
              <span className="block font-serif italic text-3xl sm:text-4xl text-[#32259B]/25">
                Daily
              </span>
              <span className="block font-sans font-black text-6xl sm:text-7xl lg:text-8xl tracking-tighter text-[#15095D]/15 -mt-3 sm:-mt-4">
                EDIT
              </span>
            </div>

            {/* Cutout Model Image */}
            <div className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none">
              <img
                src="/assets/img/cut-cream.webp"
                alt="Người mẫu mặc set kem"
                className="w-[88%] max-h-[92%] object-contain object-bottom transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>

            {/* Top Micro Headers */}
            <div className="relative z-20 flex items-center justify-between text-[11px] font-bold text-[#15095D]/80 uppercase tracking-wider">
              <span>TỦ ĐỒ THƯỜNG NGÀY</span>
              <span className="text-right">10 MÓN CƠ BẢN</span>
            </div>

            {/* Bottom CTA */}
            <div className="relative z-20 flex items-center justify-between">
              <span className="text-[11px] text-[#4E567A]">Định hình phong cách tối giản</span>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15095D] group-hover:text-[#32259B]">
                <span>Xem gợi ý</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </Link>

          {/* ============================================================
              POSTER 3: MONOGRAM U (CUT-FLASH + ATELIER)
              ============================================================ */}
          <Link
            href="/#studio-theu-ten"
            className="group relative rounded-3xl overflow-hidden aspect-[3/4] bg-[#F2F3FB] text-[#15095D] p-7 sm:p-8 flex flex-col justify-between shadow-md hover:shadow-2xl transition-all duration-500 select-none border border-[#BBC2DD]/60"
          >
            {/* Giant Letter "U" in the background */}
            <div className="absolute inset-0 flex items-center justify-center select-none z-0 pointer-events-none">
              <span className="font-serif font-black text-[180px] sm:text-[220px] text-[#32259B]/10 leading-none">
                U
              </span>
            </div>

            {/* Cutout Model Image */}
            <div className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none">
              <img
                src="/assets/img/cut-flash.webp"
                alt="Người mẫu áo khoác be"
                className="w-[85%] max-h-[90%] object-contain object-bottom transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>

            {/* Top Micro Labels */}
            <div className="relative z-20 flex items-start justify-between text-[10px] font-bold tracking-widest text-[#4E567A] uppercase">
              <div>
                <p className="text-[#32259B]">— MONOGRAM</p>
                <p className="text-xs font-black text-[#15095D]">UNLO</p>
                <p>CÁ NHÂN HÓA</p>
              </div>
              <div className="text-right">
                <p>EDITORIAL</p>
                <p>BASICS 2026</p>
              </div>
            </div>

            {/* Bottom Info & CTA */}
            <div className="relative z-20 space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#32259B]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MỘT CHỮ CÁI · CÂU CHUYỆN CỦA RIÊNG BẠN</span>
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#15095D] group-hover:text-[#32259B]">
                <span>Thêu chữ của bạn</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* ============================================================
            POSTER 4: WIDE EDITORIAL BANNER "built in CONFIDENCE"
            ============================================================ */}
        <div className="relative rounded-3xl overflow-hidden bg-[#EFF2F9] border border-[#BBC2DD] p-7 sm:p-10 lg:p-14 shadow-sm select-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/logo/unlo-header.png"
                  alt="UNLO"
                  className="h-7 w-auto object-contain"
                />
                <span className="text-xs font-bold text-[#625FBC] uppercase tracking-widest">
                  EST. 2026 · TỐI GIẢN &amp; BỀN BỈ
                </span>
              </div>

              <div className="space-y-1">
                <span className="font-serif italic text-2xl sm:text-3xl text-[#32259B] block">
                  built in
                </span>
                <h3 className="font-sans font-black text-4xl sm:text-6xl lg:text-7xl text-[#15095D] tracking-tight uppercase leading-none">
                  CONFIDENCE
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#4E567A] max-w-lg leading-relaxed font-normal">
                Không cần logo lớn phô trương. Chỉ cần đường cắt may chuẩn xác, chất vải cotton sợi dài dệt dày dặn và cảm giác tự tin tuyệt đối khi khoác lên người.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/products?category=ao-thun"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#15095D] hover:bg-[#32259B] text-white text-xs sm:text-sm font-bold tracking-wide shadow-md transition-colors"
                >
                  <span>Khám phá áo thun Supima</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center gap-2 text-xs font-mono text-[#4E567A] bg-white px-3.5 py-2 rounded-xl border border-[#DCE0E7]">
                  <span className="w-2 h-2 rounded-full bg-[#1D7A5F]" />
                  <span>QC BATCH: AQL 2.5 INSPECTED</span>
                </div>
              </div>
            </div>

            {/* Right Cutout Image */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-[#DCE0E7] shadow-inner">
                <img
                  src="/assets/img/cut-tee-man.webp"
                  alt="Người mẫu áo thun trắng nam"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute bottom-3 inset-x-3 text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#15095D]/90 text-white text-[11px] font-bold backdrop-blur-xs">
                    Mặc đơn giản · Sống tự tin
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
