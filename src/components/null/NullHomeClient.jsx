"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  ShieldCheck,
  RefreshCw,
  Factory,
  Layers,
  CheckCircle2,
} from "lucide-react";
import NullHeader from "./NullHeader";
import NullFooter from "./NullFooter";
import NullProductCard from "./NullProductCard";
import TransparencyCostChart from "./TransparencyCostChart";
import { UNLO_CATEGORIES, UNLO_PRODUCTS } from "@/lib/unloCatalog";
import { UNLO_FACTORIES } from "@/lib/unloFactories";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85";

const EDITORIAL_PROMOS = [
  {
    enTag: "FACTORY PASSPORT",
    title: "Hộ Chiếu Nhà Máy",
    subtitle: "Khám phá 4 xưởng Tier-1 OEM xuất Nhật, Đức, Bắc Âu cùng chứng chỉ LWG & OEKO-TEX.",
    href: "/factories",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=85",
  },
  {
    enTag: "BUILD YOUR BUNDLE",
    title: "Tự Tạo Combo -20%",
    subtitle: "Tự phối 3–5 món thiết yếu cùng xưởng để nhận chiết khấu bậc thang & Freeship.",
    href: "/bundles",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85",
  },
  {
    enTag: "C2M GROUP-BUY",
    title: "Gom Đơn Lô Nhỏ MOQ",
    subtitle: "Đặt trước theo lô sản xuất 3–5 ngày để mở khóa giá gốc tại xưởng, không tồn kho.",
    href: "/group-buy",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85",
  },
];

const BESTSELLER_TABS = [
  { id: "all", label: "Tất Cả" },
  { id: "cotton-basics", label: "Dệt Kim" },
  { id: "leather-goods", label: "Đồ Da" },
  { id: "linen-tailoring", label: "Linen" },
  { id: "ceramics-home", label: "Gốm Sứ" },
  { id: "canvas-accessories", label: "Phụ Kiện" },
];

const TRUST_FEATURES = [
  {
    icon: Eye,
    title: "Kiểm Hàng Trước Thanh Toán",
    desc: "Mở gói kiểm tra chất vải, vân da và đường may trước khi trả tiền.",
  },
  {
    icon: RefreshCw,
    title: "Đổi Trả Miễn Phí 30 Ngày",
    desc: "Cổng tự đổi size & hoàn tiền 100% tận nhà không rủi ro.",
  },
  {
    icon: Factory,
    title: "Hộ Chiếu Xưởng Minh Bạch",
    desc: "Công khai giá vốn, nhân công, xưởng sản xuất & chứng chỉ QC.",
  },
  {
    icon: ShieldCheck,
    title: "Bảo Hành Lỗi Sản Xuất",
    desc: "Đổi mới trọn đời nếu lỗi đường may, khóa kéo YKK hoặc men gốm.",
  },
];

export default function NullHomeClient() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedDemoIdx, setSelectedDemoIdx] = useState(0);

  const displayedProducts = useMemo(() => {
    const filtered =
      activeTab === "all"
        ? UNLO_PRODUCTS
        : UNLO_PRODUCTS.filter((p) => p.categorySlug === activeTab);
    return filtered.slice(0, 5);
  }, [activeTab]);

  const demoProduct = UNLO_PRODUCTS[selectedDemoIdx] || UNLO_PRODUCTS[0];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15095D]">
      <NullHeader />

      <main className="flex-1">
        {/* ================================================================
            1. HERO BANNER — Moodboard Split Layout × Brandless M2C Value
            ================================================================ */}
        <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 pt-5 sm:pt-7">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0E2447] via-[#2B467C] to-[#5775B8] text-white">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 left-1/3 w-96 h-96 rounded-full bg-[#8D8DC7]/30 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 right-1/4 w-80 h-80 rounded-full bg-[#15095D]/50 blur-3xl"
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center min-h-[430px] sm:min-h-[490px]">
              <div className="lg:col-span-6 px-6 py-10 sm:px-10 lg:px-14 lg:py-14 space-y-5 z-10 null-hero-reveal">
                <p className="unlo-display-en text-[11px] sm:text-xs tracking-[0.14em] text-[#D4E4F7]">
                  BRANDLESS M2C · DIRECT FACTORY
                </p>

                <h1 className="font-serif text-4xl sm:text-5xl xl:text-[54px] font-semibold leading-[1.08] tracking-tight text-[#FCFDF1]">
                  Chuẩn Xuất Khẩu, Minh Bạch Giá Thực Tại Xưởng
                </h1>

                <p className="text-sm sm:text-[15px] text-[#EFF2F9]/90 leading-relaxed max-w-md">
                  Kết nối thẳng tới 4 nhà máy Tier-1 OEM tại Hưng Yên, Bình Dương, Bắc Ninh &amp; Bát Tràng. Bóc tách 100% cấu thành giá — cắt bỏ chi phí mặt bằng và logo phô trương.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 h-11 sm:h-12 px-7 rounded-full unlo-pill-lilac text-xs sm:text-[13px] font-bold uppercase tracking-[0.1em]"
                  >
                    <span>Khám Phá Ngay</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>

                  <Link
                    href="/factories"
                    className="inline-flex items-center gap-2 h-11 sm:h-12 px-6 rounded-full border border-[#BBC2DD]/55 bg-white/10 backdrop-blur-xs text-xs sm:text-[13px] font-semibold text-[#FCFDF1] hover:bg-white/20 transition-colors null-pressable"
                  >
                    <Factory className="w-4 h-4 text-[#BBC2DD]" aria-hidden="true" />
                    <span>Xem Hộ Chiếu Xưởng</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 relative h-[300px] sm:h-[380px] lg:h-full min-h-[300px]">
                <img
                  src={HERO_IMAGE}
                  alt="Sản phẩm thiết yếu chuẩn xuất khẩu sản xuất trực tiếp tại xưởng UNLO"
                  className="w-full h-full object-cover object-center lg:rounded-l-[40px]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0E2447]/65 via-transparent to-[#15095D]/15 lg:bg-gradient-to-r lg:from-[#2B467C]/40 lg:via-transparent lg:to-transparent"
                />

                {/* Grounded Factory Passport Specimen Card */}
                <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 bg-[#FCFDF1]/96 backdrop-blur-md text-[#15095D] rounded-2xl px-5 py-4 shadow-[0_18px_40px_-14px_rgba(11,32,86,0.45)] border border-[#DCE0E7] max-w-[255px] null-hero-reveal-delay">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#625FBC]">
                    Xưởng Số 04 · OEKO-TEX 100
                  </p>
                  <p className="font-serif text-lg font-bold leading-tight mt-1 text-[#15095D]">
                    Supima Cotton 260 GSM
                  </p>
                  <p className="text-xs text-[#4E567A] mt-1 tabular-nums">
                    Giá xưởng <strong className="text-[#32259B]">245.000đ</strong>{" "}
                    <span className="line-through text-[#8D8DC7]">690.000đ</span> (-64%)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            2. CIRCULAR CATEGORY ROW — Moodboard 6-Circle Strip
            ================================================================ */}
        <section
          aria-label="Danh mục ngành hàng xưởng"
          className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-12 pb-6"
        >
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6 items-start">
            {UNLO_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                className="group flex flex-col items-center text-center gap-2.5"
              >
                <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-[#EFF2F9] border-2 border-[#DCE0E7] group-hover:border-[#443EB1] transition-colors p-1">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.label}
                      loading="lazy"
                      className="w-full h-full object-cover null-card-img"
                    />
                  </div>
                </div>
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.09em] text-[#15095D] group-hover:text-[#32259B] transition-colors">
                  {cat.shortLabel}
                </span>
              </Link>
            ))}

            {/* 6th Signature Lilac Combo/Sale Circle */}
            <Link
              href="/bundles"
              className="group flex flex-col items-center text-center gap-2.5"
            >
              <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#DCE0F4] via-[#BBC2DD] to-[#9EA1D2] border-2 border-[#BBC2DD] group-hover:border-[#32259B] transition-colors grid place-items-center shadow-xs">
                <span className="font-serif italic text-2xl sm:text-3xl font-semibold text-[#15095D] group-hover:scale-105 transition-transform">
                  Combo
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.09em] text-[#32259B]">
                Giảm Đến -20%
              </span>
            </Link>
          </div>
        </section>

        {/* ================================================================
            3. 3-COLUMN M2C PILLAR PROMO CARDS
            ================================================================ */}
        <section
          aria-label="Trụ cột mô hình M2C"
          className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {EDITORIAL_PROMOS.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group relative overflow-hidden rounded-2xl min-h-[235px] sm:min-h-[260px] bg-[#EFF2F9] border border-[#DCE0E7] flex items-end"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover null-card-img"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-[#EFF2F9]/96 via-[#EFF2F9]/80 to-[#15095D]/15"
                />
                <div className="relative z-10 p-6 sm:p-7 max-w-[80%] space-y-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#443EB1]">
                    {card.enTag}
                  </p>
                  <h2 className="font-serif text-2xl sm:text-[26px] font-semibold leading-tight text-[#15095D]">
                    {card.title}
                  </h2>
                  <p className="text-xs sm:text-[13px] text-[#4E567A] leading-relaxed">
                    {card.subtitle}
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-1 px-4 py-1.5 rounded-full bg-white/95 border border-[#BBC2DD] text-[11px] font-bold uppercase tracking-[0.08em] text-[#15095D] group-hover:bg-[#15095D] group-hover:text-white group-hover:border-[#15095D] transition-colors">
                    Khám phá
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ================================================================
            4. BEST SELLERS 5-COLUMN PRODUCT GRID
            ================================================================ */}
        <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 space-y-7">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#625FBC]">
                FACTORY DIRECT BEST SELLERS
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#15095D]">
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

          <div className="text-center pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 h-11 px-7 rounded-full unlo-pill-outline text-xs font-bold uppercase tracking-[0.12em]"
            >
              <span>Xem Toàn Bộ {UNLO_PRODUCTS.length} Sản Phẩm M2C</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* ================================================================
            5. INTERACTIVE TRUST-TECH TRANSPARENT PRICING EXPLORER
            ================================================================ */}
        <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4E567A]">
              Chọn 1 sản phẩm để xem bóc tách giá thành thực tế tại xưởng:
            </p>
            <div className="flex flex-wrap gap-2">
              {UNLO_PRODUCTS.slice(0, 4).map((p, idx) => (
                <button
                  key={p._id}
                  type="button"
                  onClick={() => setSelectedDemoIdx(idx)}
                  className={`h-9 px-4 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    selectedDemoIdx === idx
                      ? "bg-[#32259B] text-white"
                      : "bg-[#EFF2F9] text-[#15095D] hover:bg-[#DCE0E7]"
                  }`}
                >
                  {p.name.split("—")[0].trim()}
                </button>
              ))}
            </div>
          </div>

          <TransparencyCostChart product={demoProduct} />

          <div className="flex flex-wrap items-center justify-between gap-4 px-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#4E567A]">
              <CheckCircle2 className="w-4 h-4 text-[#32259B]" />
              <span>
                Đang hiển thị cấu thành giá của{" "}
                <strong className="text-[#15095D]">{demoProduct.name}</strong> ({demoProduct.creatorName})
              </span>
            </div>
            <Link
              href={`/products/${demoProduct.slug}-${demoProduct._id}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#32259B] hover:underline"
            >
              Xem trang chi tiết 7 khối minh bạch của sản phẩm này
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* ================================================================
            6. SHOP BY FACTORY PREVIEW STRIP (4 VERIFIED FACTORIES)
            ================================================================ */}
        <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-10 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-1">
              <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#625FBC]">
                VERIFIED FACTORIES
              </p>
              <h2 className="font-serif text-3xl font-semibold text-[#15095D]">
                Mua Sắm Theo Từng Nhà Máy Đối Tác
              </h2>
            </div>
            <Link
              href="/factories"
              className="text-xs font-bold text-[#32259B] hover:underline inline-flex items-center gap-1"
            >
              Xem tất cả Hồ Sơ Nhà Máy <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {UNLO_FACTORIES.map((fac) => (
              <Link
                key={fac._id}
                href={`/factories/${fac.slug}`}
                className="group rounded-2xl border border-[#DCE0E7] bg-white p-5 space-y-3 hover:border-[#443EB1] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#32259B] bg-[#EFF2F9] px-2.5 py-1 rounded-full">
                    {fac.code}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#1D7A5F]">
                    QC {fac.qcPassRate}%
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#15095D] group-hover:text-[#32259B] leading-snug">
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
            7. 4-COLUMN ZERO-RISK GUARANTEE STRIP
            ================================================================ */}
        <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 py-7 px-6 sm:px-8 rounded-2xl bg-[#FCFDF1] border border-[#DCE0E7]">
            {TRUST_FEATURES.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#EFF2F9] border border-[#DCE0E7] text-[#32259B] grid place-items-center shrink-0">
                    <Icon className="w-4 h-4 stroke-[1.8]" aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-[13px] font-bold text-[#15095D]">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#4E567A] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================
            8. CLOSING EDITORIAL BANNER
            ================================================================ */}
        <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 pt-4">
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
              <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#BBC2DD]">
                NO LOGO MARKUP
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#FCFDF1] leading-tight">
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
      </main>

      <NullFooter />
    </div>
  );
}
