"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/useLanguage";
import CategoryTrustBar from "./CategoryTrustBar";

export const CATEGORY_ITEMS = [
  {
    id: "ao-khoac",
    slug: "jackets",
    labelVi: "ÁO KHOÁC",
    labelEn: "JACKETS",
    img: "/assets/categories/ao-khoac.png",
    link: "/products?category=jackets",
  },
  {
    id: "ao-ni-len",
    slug: "sweat-hoodie",
    labelVi: "ÁO NỈ / ÁO LEN",
    labelEn: "SWEATSHIRT & KNITWEAR",
    img: "/assets/categories/ao-ni-len.png",
    link: "/products?category=sweat-hoodie",
  },
  {
    id: "so-mi",
    slug: "linen-tailoring",
    labelVi: "SƠ MI",
    labelEn: "SHIRTS",
    img: "/assets/categories/so-mi.png",
    link: "/products?category=linen-tailoring",
  },
  {
    id: "ao-polo",
    slug: "polo",
    labelVi: "ÁO POLO",
    labelEn: "POLO SHIRTS",
    img: "/assets/categories/ao-polo.png",
    link: "/products?category=polo",
  },
  {
    id: "ao-thun",
    slug: "cotton-basics",
    labelVi: "ÁO THUN",
    labelEn: "T-SHIRTS",
    img: "/assets/categories/ao-thun.png",
    link: "/products?category=cotton-basics",
  },
  {
    id: "quan",
    slug: "pants-bottoms",
    labelVi: "QUẦN",
    labelEn: "PANTS",
    img: "/assets/categories/quan.png",
    link: "/products?category=pants-bottoms",
  },
  {
    id: "quan-dai-short",
    slug: "shorts",
    labelVi: "QUẦN DÀI / QUẦN SHORT",
    labelEn: "TROUSERS & SHORTS",
    img: "/assets/categories/quan-dai-short.png",
    link: "/products?category=shorts",
  },
  {
    id: "do-lot-mac-nha",
    slug: "loungewear",
    labelVi: "ĐỒ LÓT / ĐỒ MẶC NHÀ",
    labelEn: "UNDERWEAR & LOUNGEWEAR",
    img: "/assets/categories/do-lot-mac-nha.png",
    link: "/products?category=loungewear",
  },
  {
    id: "do-ngu",
    slug: "sleepwear",
    labelVi: "ĐỒ NGỦ",
    labelEn: "SLEEPWEAR",
    img: "/assets/categories/do-ngu.png",
    link: "/products?category=sleepwear",
  },
  {
    id: "phu-kien",
    slug: "canvas-accessories",
    labelVi: "PHỤ KIỆN",
    labelEn: "ACCESSORIES",
    img: "/assets/categories/phu-kien.png",
    link: "/products?category=canvas-accessories",
  },
  {
    id: "bst-hop-tac",
    slug: "collabs",
    labelVi: "BST HỢP TÁC",
    labelEn: "COLLABORATIONS",
    img: "/assets/categories/bst-hop-tac.png",
    link: "/products?category=collabs",
  },
  {
    id: "the-qua-tang",
    slug: "gift-card",
    labelVi: "THẺ QUÀ TẶNG",
    labelEn: "GIFT CARDS",
    img: "/assets/categories/the-qua-tang.png",
    link: "/gift",
  },
];

export default function CategoryBrowser() {
  const { lang, t } = useLanguage();

  return (
    <section
      aria-label="Tìm kiếm theo danh mục sản phẩm"
      className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12"
    >
      {/* Header bar with clean rule */}
      <div className="flex items-center gap-4 mb-6 sm:mb-8">
        <h2 className="font-sans font-bold text-sm sm:text-base tracking-[0.14em] uppercase text-[#15095D] whitespace-nowrap">
          {t("TÌM THEO DANH MỤC", "SEARCH BY CATEGORY")}
        </h2>
        <div className="flex-1 h-[1px] bg-[#15095D]/15" />
      </div>

      {/* Grid: 6 columns on desktop, 3 columns on tablet, horizontal scroll on mobile */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
        {CATEGORY_ITEMS.map((cat) => {
          const label = lang === "en" ? cat.labelEn : cat.labelVi;
          return (
            <Link
              key={cat.id}
              href={cat.link}
              className="group flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl bg-[#F8F9FA]/60 hover:bg-[#EFF2F9]/80 border border-transparent hover:border-[#DCE0E7] transition-all hover:shadow-sm"
            >
              <div className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden mb-2 sm:mb-3">
                <Image
                  src={cat.img}
                  alt={label}
                  width={220}
                  height={150}
                  className="object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="font-sans font-bold text-[11px] sm:text-xs tracking-wider uppercase text-[#15095D] group-hover:text-[#32259B] transition-colors leading-tight">
                {label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Trust & Guarantee Policy Bar (Theo Image 3 ref: Miễn phí giao hàng, Đổi trả 7 ngày, Chính hãng 100%, Hỗ trợ 24/7) */}
      <CategoryTrustBar />
    </section>
  );
}
