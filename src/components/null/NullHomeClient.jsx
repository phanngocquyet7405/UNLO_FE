"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import NullHeader from "./NullHeader";
import NullFooter from "./NullFooter";
import NullProductCard from "./NullProductCard";
import { UNLO_CATEGORIES, UNLO_PRODUCTS } from "@/lib/unloCatalog";
import { UNLO_FACTORIES } from "@/lib/unloFactories";
import SeasonalHeroVideoCarousel from "./SeasonalHeroVideoCarousel";
import SupportChatbotDrawer from "./SupportChatbotDrawer";
import TrustBar from "./TrustBar";
import HomeEmbroideryStudio from "./HomeEmbroideryStudio";

const BESTSELLER_TABS = [
  { id: "all", label: "Tất Cả" },
  { id: "cotton-basics", label: "Áo Thun" },
  { id: "linen-tailoring", label: "Sơ Mi" },
  { id: "sweat-hoodie", label: "Nỉ & Hoodie" },
  { id: "pants-bottoms", label: "Quần" },
  { id: "wool-knitwear", label: "Đồ Len" },
  { id: "leather-goods", label: "Đồ Da" },
  { id: "canvas-accessories", label: "Phụ Kiện" },
];

export default function NullHomeClient() {
  const [activeTab, setActiveTab] = useState("all");
  const [, setActiveSeason] = useState(null);

  const displayedProducts = useMemo(() => {
    const filtered =
      activeTab === "all"
        ? UNLO_PRODUCTS
        : UNLO_PRODUCTS.filter((p) => p.categorySlug === activeTab);
    return filtered.slice(0, 10);
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15095D]">
      <NullHeader />

      <main className="flex-1">
        {/* ================================================================
            1. HERO CAROUSEL THEO MÙA (4 MÙA THỜI TRANG: XUÂN, HẠ, THU, ĐÔNG)
            ================================================================ */}
        <SeasonalHeroVideoCarousel onSeasonChange={setActiveSeason} />

        {/* ================================================================
            2. SHOP BY CATEGORY — DANH MỤC NHANH (NGAY DƯỚI HERO)
            ================================================================ */}
        <section
          aria-label="Danh mục ngành hàng xưởng"
          className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14 pb-6"
        >
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="unlo-display-en text-[11px] tracking-[0.16em] text-[#625FBC] uppercase font-bold">
                FACTORY ESSENTIALS
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#15095D]">
                Danh Mục Đồ Cơ Bản Từ Xưởng
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-bold text-[#32259B] hover:underline inline-flex items-center gap-1"
            >
              <span>Xem tất cả</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-4 sm:gap-5 items-start">
            {UNLO_CATEGORIES.slice(0, 8).map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                className="group flex flex-col items-center text-center gap-2.5"
              >
                <div className="w-18 h-18 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-full overflow-hidden bg-[#EFF2F9] border-2 border-[#DCE0E7] group-hover:border-[#443EB1] transition-all p-1 group-hover:scale-105 shadow-xs">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.label}
                      loading="lazy"
                      className="w-full h-full object-cover null-card-img"
                    />
                  </div>
                </div>
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-[#15095D] group-hover:text-[#32259B] transition-colors line-clamp-1">
                  {cat.shortLabel}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ================================================================
            3. BEST SELLERS PRODUCT GRID (KHỐI CHUYỂN ĐỔI CHỦ LỰC)
            ================================================================ */}
        <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 space-y-7">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#625FBC] uppercase font-bold">
                FACTORY DIRECT BEST SELLERS
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#15095D]">
                Sản Phẩm Tiêu Biểu Từ Các Xưởng
              </h2>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {BESTSELLER_TABS.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`h-9 px-4 rounded-full text-xs font-semibold whitespace-nowrap transition-colors null-pressable cursor-pointer ${
                      active
                        ? "bg-[#15095D] text-[#FCFDF1]"
                        : "bg-[#EFF2F9] text-[#4E567A] hover:bg-[#DCE0E7] hover:text-[#15095D]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8 sm:gap-x-5">
            {displayedProducts.map((product) => (
              <NullProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 h-11 px-8 rounded-full unlo-pill-outline text-xs font-bold uppercase tracking-[0.12em] hover:bg-[#15095D] hover:text-white transition-colors"
            >
              <span>Xem Toàn Bộ {UNLO_PRODUCTS.length} Sản Phẩm M2C</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* ================================================================
            4. THE M2C DIFFERENCE — TUYÊN NGÔN GIÁ TRỊ TINH GIẢN (1 KHỐI SANG TRỌNG)
            ================================================================ */}
        <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#FCFDF1] border border-[#DCE0E7] p-8 sm:p-12 lg:p-16 shadow-[0_4px_30px_rgba(21,9,93,0.03)]">
            <div className="relative z-10 max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#BBC2DD] text-[#32259B] text-[11px] font-bold uppercase tracking-[0.16em]">
                <Sparkles className="w-3.5 h-3.5 text-[#EB6D48]" />
                <span>TRIẾT LÝ M2C · KHÔNG LOGO MARKUP</span>
              </div>

              <h2 className="font-unlo-title font-bold text-3xl sm:text-4xl lg:text-5xl text-[#15095D] leading-[1.15]">
                Giá Trị <span className="text-[#EB6D48]">Không Cần Gọi Tên</span>
              </h2>

              <p className="text-sm sm:text-base text-[#4E567A] leading-relaxed sm:leading-8">
                UNLO kết nối trực tiếp các xưởng dệt may đạt chuẩn OEKO-TEX Standard 100 tới tay bạn. Chúng tôi gỡ bỏ logo hào nhoáng và chi phí trung gian đắt đỏ để tập trung vào chất lượng sợi dài, form dáng chuẩn và mức giá xuất xưởng thực chất.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/pages/about-us"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#15095D] text-white text-xs font-bold uppercase tracking-[0.12em] hover:bg-[#1F0C85] transition-colors shadow-sm"
                >
                  <span>Khám phá câu chuyện UNLO</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/factories"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#15095D] text-[#15095D] text-xs font-bold uppercase tracking-[0.12em] hover:bg-[#15095D] hover:text-white transition-colors"
                >
                  <span>Hồ sơ 4 xưởng đối tác</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            5. DEDICATED ATELIER: "THÊU TÊN CỦA BẠN LÊN ĐỒ CƠ BẢN"
            ================================================================ */}
        <HomeEmbroideryStudio />

        {/* ================================================================
            6. SHOP BY FACTORY STRIP (4 VERIFIED FACTORIES)
            ================================================================ */}
        <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-1">
              <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#625FBC] uppercase font-bold">
                VERIFIED FACTORIES
              </p>
              <h2 className="font-serif text-3xl font-medium text-[#15095D]">
                Mua Sắm Theo Từng Nhà Máy Đối Tác
              </h2>
            </div>
            <Link
              href="/factories"
              className="text-xs font-bold text-[#32259B] hover:underline inline-flex items-center gap-1"
            >
              <span>Xem tất cả Hồ Sơ Nhà Máy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {UNLO_FACTORIES.map((fac) => (
              <Link
                key={fac._id}
                href={`/factories/${fac.slug}`}
                className="group rounded-2xl border border-[#DCE0E7] bg-white p-5 space-y-3 hover:border-[#443EB1] transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#32259B] bg-[#EFF2F9] px-2.5 py-1 rounded-full">
                    {fac.code}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#1D7A5F]">
                    QC {fac.qcPassRate}%
                  </span>
                </div>
                <h3 className="font-serif text-lg font-medium text-[#15095D] group-hover:text-[#32259B] leading-snug">
                  {fac.specialty}
                </h3>
                <p className="text-xs text-[#4E567A] line-clamp-2">{fac.location}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {fac.certifications.slice(0, 2).map((c) => (
                    <span
                      key={c.code}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FCFDF1] border border-[#DCE0E7] text-[#15095D]"
                    >
                      {c.code}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ================================================================
            7. CLOSING EDITORIAL BANNER (TỰ PHỐI COMBO)
            ================================================================ */}
        <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <div className="relative overflow-hidden rounded-3xl min-h-[270px] sm:min-h-[320px] bg-[#0B2056] flex items-center justify-end">
            <img
              src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1600&q=85"
              alt="Mua sắm hàng thiết yếu trực tiếp từ xưởng không trả tiền cho logo"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#0B2056]/40 via-[#15095D]/75 to-[#15095D]/95"
            />
            <div className="relative z-10 max-w-xl px-6 py-10 sm:px-12 lg:px-16 text-left sm:text-right space-y-4">
              <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#BBC2DD] uppercase font-bold">
                NO LOGO MARKUP
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#FCFDF1] leading-tight">
                Tự Phối Combo 3–5 Món Thiết Yếu — Giảm Tới 20%
              </h2>
              <p className="text-sm text-[#DCE0E7]/90 leading-relaxed">
                Gom chung kiện hàng trực tiếp từ xưởng đối tác để cắt giảm phí vận chuyển và nhận chiết khấu bậc thang ngay trong giỏ hàng.
              </p>
              <div className="pt-1">
                <Link
                  href="/bundles"
                  className="inline-flex items-center gap-2 h-11 px-7 rounded-full unlo-pill-lilac text-xs font-bold uppercase tracking-[0.1em]"
                >
                  <Layers className="w-4 h-4" aria-hidden="true" />
                  <span>Tự Tạo Combo Ngay</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            8. TRUST BAR — 4 TRỤ CỘT THẨM ĐỊNH & MINH BẠCH
            ================================================================ */}
        <div className="pt-6 pb-2">
          <TrustBar />
        </div>
      </main>

      <SupportChatbotDrawer />

      <NullFooter />
    </div>
  );
}
