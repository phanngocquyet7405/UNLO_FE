"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/useLanguage";
import { UNLO_PRODUCTS } from "@/lib/unloCatalog";
import NullProductCard from "./NullProductCard";

const AUDIENCE_TABS = [
  { id: "nam", labelVi: "NAM", labelEn: "MEN" },
  { id: "nu", labelVi: "NỮ", labelEn: "WOMEN" },
  { id: "tre-em", labelVi: "TRẺ EM", labelEn: "KIDS" },
];

export default function BestSellersSection() {
  const { lang, t } = useLanguage();
  const [activeAudience, setActiveAudience] = useState("nam");

  const filteredProducts = useMemo(() => {
    if (activeAudience === "nu") {
      return UNLO_PRODUCTS.filter(
        (p) =>
          p.categorySlug === "linen-tailoring" ||
          p.categorySlug === "canvas-accessories" ||
          p.categorySlug === "cotton-basics"
      ).slice(0, 8);
    }
    if (activeAudience === "tre-em") {
      return UNLO_PRODUCTS.filter(
        (p) =>
          p.categorySlug === "cotton-basics" ||
          p.categorySlug === "sweat-hoodie"
      ).slice(0, 8);
    }
    return UNLO_PRODUCTS.filter(
      (p) =>
        p.categorySlug === "sweat-hoodie" ||
        p.categorySlug === "cotton-basics" ||
        p.categorySlug === "pants-bottoms" ||
        p.categorySlug === "linen-tailoring"
    ).slice(0, 8);
  }, [activeAudience]);

  return (
    <section
      aria-label="Hàng bán chạy tiêu biểu"
      className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16 space-y-8"
    >
      {/* Header Row: Title on Left, 3 Tabs (NAM - NỮ - TRẺ EM) on Right */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#15095D]/10 pb-4">
        <div>
          <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#625FBC] block mb-1">
            {t("SẢN PHẨM ĐƯỢC YÊU THÍCH", "FACTORY DIRECT BEST SELLERS")}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-semibold tracking-tight text-[#15095D]">
            {t("Hàng Bán Chạy Được Yêu Thích", "Best Sellers Loved by Thousands")}
          </h2>
        </div>

        {/* 3 Tabs: NAM – NỮ – TRẺ EM theo đúng yêu cầu DOC-04 */}
        <div className="inline-flex items-center p-1 rounded-full bg-[#EFF2F9] border border-[#DCE0E7] self-start sm:self-auto">
          {AUDIENCE_TABS.map((tab) => {
            const active = activeAudience === tab.id;
            const label = lang === "en" ? tab.labelEn : tab.labelVi;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveAudience(tab.id)}
                className={`px-5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  active
                    ? "bg-[#15095D] text-white shadow-xs"
                    : "text-[#4E567A] hover:text-[#15095D]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lưới 4 sản phẩm / hàng, 1-2 hàng (8 sản phẩm) chuẩn NullProductCard */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((p) => (
          <NullProductCard key={p._id} product={p} />
        ))}
      </div>

      {/* DOC-04 Mục 5: Nút "XEM TẤT CẢ DANH MỤC SẢN PHẨM" ngay dưới */}
      <div className="text-center pt-4">
        <Link
          href="/products"
          className="inline-flex items-center justify-center min-w-[280px] sm:min-w-[340px] h-12 px-8 rounded-full border border-[#15095D] text-[#15095D] hover:bg-[#15095D] hover:text-white text-xs font-bold tracking-[0.14em] uppercase transition-all shadow-xs"
        >
          <span>{t("XEM TẤT CẢ DANH MỤC SẢN PHẨM", "VIEW ALL PRODUCT CATEGORIES")}</span>
        </Link>
      </div>
    </section>
  );
}
