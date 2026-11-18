"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  ShieldCheck,
  RefreshCw,
  Factory,
  Layers,
  CheckCircle2,
  Sparkles,
  Upload,
  X,
  ZoomIn,
  ZoomOut,
  Shirt,
  Type,
  Image as ImageIcon,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";
import NullHeader from "./NullHeader";
import NullFooter from "./NullFooter";
import NullProductCard from "./NullProductCard";
import TransparencyCostChart from "./TransparencyCostChart";
import RealisticEmbroideryOverlay, {
  REALISTIC_PLACEMENTS,
} from "./RealisticEmbroideryOverlay";
import {
  autoRemoveBackground,
  EMBROIDERY_SAMPLE_LOGOS,
} from "@/lib/embroideryUtils";
import { useCart } from "@/app/context/CartContext";
import { formatVnd } from "@/app/services/api/nullCommerceService";
import { UNLO_CATEGORIES, UNLO_PRODUCTS } from "@/lib/unloCatalog";
import { UNLO_FACTORIES } from "@/lib/unloFactories";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85";

const EDITORIAL_PROMOS = [
  {
    enTag: "ATELIER EMBROIDERY",
    title: "Thêu Tên & Logo Riêng",
    subtitle: "Cá nhân hóa kín đáo chữ viết tắt hoặc logo công ty trực tiếp tại xưởng không qua trung gian.",
    href: "#studio-theu-ten",
    image:
      "/assets/tshirt-model.jpg",
  },
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

const HOME_STUDIO_PLACEMENTS = [
  {
    id: "chest_pocket",
    label: "Ngực trái",
    sublabel: "Kinh điển, tinh tế",
    coords: REALISTIC_PLACEMENTS.chest_pocket.coords,
  },
  {
    id: "left_cuff",
    label: "Bo tay áo",
    sublabel: "Viền gấu tay áo",
    coords: REALISTIC_PLACEMENTS.left_cuff.coords,
  },
  {
    id: "hem",
    label: "Góc tà áo",
    sublabel: "Mép gấu áo",
    coords: REALISTIC_PLACEMENTS.hem.coords,
  },
  {
    id: "inner_neck",
    label: "Gáy cổ áo",
    sublabel: "Sau gáy cổ trong",
    coords: REALISTIC_PLACEMENTS.inner_neck.coords,
  },
];

const HOME_STUDIO_FONTS = [
  { id: "serif_minimal", label: "Cổ điển", fontName: "Bodoni", previewClass: "font-serif font-bold tracking-widest" },
  { id: "italic_atelier", label: "Viết tay", fontName: "Italic", previewClass: "font-serif italic font-semibold tracking-wider" },
  { id: "sans_architect", label: "Hiện đại", fontName: "Sans", previewClass: "font-sans font-bold uppercase tracking-widest text-[0.88em]" },
];

const HOME_STUDIO_THREADS = [
  { name: "Chàm Indigo", hex: "#15095D" },
  { name: "Trắng sữa", hex: "#FCFDF1" },
  { name: "Vàng đồng", hex: "#C59B27" },
  { name: "Xanh khói", hex: "#8D8DC7" },
  { name: "Đỏ rượu", hex: "#8B1E2D" },
  { name: "Đen tuyền", hex: "#1A1A1A" },
];

const HOME_GARMENT_COLORS = [
  { id: "ivory", label: "Trắng sữa", hex: "#FCFDF1", textDark: true },
  { id: "navy", label: "Xanh Chàm", hex: "#15095D", textDark: false },
  { id: "black", label: "Đen than", hex: "#1A1A1A", textDark: false },
  { id: "periwinkle", label: "Periwinkle", hex: "#8D8DC7", textDark: false },
];

export default function NullHomeClient() {
  const { addToCart, setIsCartOpen } = useCart() || {};
  const [activeTab, setActiveTab] = useState("all");
  const [selectedDemoIdx, setSelectedDemoIdx] = useState(0);

  // Home Atelier Studio interactive state
  const [studioState, setStudioState] = useState({
    customType: "text", // "text" | "logo"
    monogramText: "H.L",
    logoUrl: "",
    logoSvg: null,
    logoName: "",
    logoMonochrome: false,
    font: "serif_minimal",
    threadColor: "#15095D",
    placement: "chest_pocket",
    garmentColor: "ivory",
    zoom: false,
  });
  const fileInputRef = useRef(null);

  const displayedProducts = useMemo(() => {
    const filtered =
      activeTab === "all"
        ? UNLO_PRODUCTS
        : UNLO_PRODUCTS.filter((p) => p.categorySlug === activeTab);
    return filtered.slice(0, 5);
  }, [activeTab]);

  const demoProduct = UNLO_PRODUCTS[selectedDemoIdx] || UNLO_PRODUCTS[0];

  const currentPlacement =
    HOME_STUDIO_PLACEMENTS.find((p) => p.id === studioState.placement) ||
    HOME_STUDIO_PLACEMENTS[0];
  const currentFont =
    HOME_STUDIO_FONTS.find((f) => f.id === studioState.font) ||
    HOME_STUDIO_FONTS[0];
  const activeGarment =
    HOME_GARMENT_COLORS.find((c) => c.id === studioState.garmentColor) ||
    HOME_GARMENT_COLORS[0];

  const handleHomeLogoUpload = (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File logo tối đa 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      const rawDataUrl = e.target?.result;
      const cleanDataUrl = await autoRemoveBackground(rawDataUrl);
      setStudioState((prev) => ({
        ...prev,
        customType: "logo",
        logoUrl: cleanDataUrl,
        logoSvg: null,
        logoName: file.name,
      }));
      toast.success(`Đã xử lý & gắn logo lên áo: ${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  const handleOrderCustomShirt = () => {
    const supimaShirt = UNLO_PRODUCTS[0];
    if (!supimaShirt) return;
    const isLogo =
      studioState.customType === "logo" &&
      Boolean(studioState.logoUrl || studioState.logoSvg);
    const fee = isLogo ? 45000 : 35000;

    const customPayload = {
      ...supimaShirt,
      _id: supimaShirt._id,
      id: supimaShirt._id,
      productId: supimaShirt._id,
      itemType: "product",
      price: supimaShirt.price + fee,
      image: "/assets/tshirt-model.jpg",
      variantSummary: {
        size: "M",
        colorName: activeGarment.label,
        colorHex: activeGarment.hex,
      },
      customization: {
        enabled: true,
        customType: studioState.customType,
        monogramText: (isLogo ? "LOGO" : studioState.monogramText || "H.L")
          .slice(0, 5)
          .toUpperCase(),
        font: studioState.font,
        threadColor: studioState.threadColor,
        placement: studioState.placement,
        innerLabelText: isLogo
          ? `Logo: ${(studioState.logoName || "Custom").slice(0, 20)}`
          : "",
        giftBoxType: "none",
        giftNote: isLogo
          ? `[Thêu Logo: ${studioState.logoName || "Custom"}]`
          : `Thêu tên ${studioState.monogramText || "H.L"}`,
        ...(isLogo
          ? {
              logoUrl: studioState.logoUrl,
              logoSvg: studioState.logoSvg,
              logoName: studioState.logoName,
            }
          : {}),
      },
    };

    addToCart?.(customPayload, 1);
    toast.success(
      `Đã thêm "Áo thun Supima thêu ${isLogo ? "Logo" : studioState.monogramText}" vào giỏ hàng!`,
    );
    setIsCartOpen?.(true);
  };

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

                  <a
                    href="#studio-theu-ten"
                    className="inline-flex items-center gap-2 h-11 sm:h-12 px-6 rounded-full border border-[#BBC2DD]/55 bg-white/10 backdrop-blur-xs text-xs sm:text-[13px] font-semibold text-[#FCFDF1] hover:bg-white/20 transition-colors null-pressable"
                  >
                    <Sparkles className="w-4 h-4 text-[#BBC2DD]" aria-hidden="true" />
                    <span>Thử Thêu Tên Lên Áo</span>
                  </a>
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
            2. CIRCULAR CATEGORY ROW — Including "Thêu Tên" & "Combo"
            ================================================================ */}
        <section
          aria-label="Danh mục ngành hàng xưởng"
          className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-12 pb-6"
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-5 items-start">
            {UNLO_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                className="group flex flex-col items-center text-center gap-2.5"
              >
                <div className="w-20 h-20 sm:w-26 sm:h-26 md:w-28 md:h-28 rounded-full overflow-hidden bg-[#EFF2F9] border-2 border-[#DCE0E7] group-hover:border-[#443EB1] transition-colors p-1">
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

            {/* 6th Signature Circle: THÊU TÊN (CÁ NHÂN HÓA) */}
            <a
              href="#studio-theu-ten"
              className="group flex flex-col items-center text-center gap-2.5"
            >
              <div className="w-20 h-20 sm:w-26 sm:h-26 md:w-28 md:h-28 rounded-full overflow-hidden bg-gradient-to-br from-[#EFF2F9] via-[#BBC2DD] to-[#8D8DC7] border-2 border-[#8D8DC7] group-hover:border-[#15095D] transition-colors p-1 grid place-items-center shadow-xs">
                <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center p-2 group-hover:scale-105 transition-transform">
                  <span className="font-serif italic text-lg sm:text-xl font-bold text-[#15095D] leading-tight">
                    Thêu tên
                  </span>
                  <span className="text-[9px] font-mono text-[#32259B] uppercase font-bold tracking-tight">
                    Cá nhân hóa
                  </span>
                </div>
              </div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.09em] text-[#32259B]">
                Thêu Tên &amp; Logo
              </span>
            </a>

            {/* 7th Signature Lilac Combo/Sale Circle */}
            <Link
              href="/bundles"
              className="group flex flex-col items-center text-center gap-2.5"
            >
              <div className="w-20 h-20 sm:w-26 sm:h-26 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#DCE0F4] via-[#BBC2DD] to-[#9EA1D2] border-2 border-[#BBC2DD] group-hover:border-[#32259B] transition-colors grid place-items-center shadow-xs">
                <span className="font-serif italic text-xl sm:text-2xl font-semibold text-[#15095D] group-hover:scale-105 transition-transform">
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
            5. DEDICATED SECTION: "THÊU TÊN CỦA BẠN LÊN ĐỒ CƠ BẢN" (ATELIER)
            ================================================================ */}
        <section
          id="studio-theu-ten"
          className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16 space-y-8 scroll-mt-20"
        >
          {/* Section Header */}
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <p className="unlo-display-en text-[11px] sm:text-xs tracking-[0.16em] text-[#625FBC] uppercase">
              UNLO · CÁ NHÂN HÓA TẠI XƯỞNG
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#15095D] leading-tight">
              Thêu tên của bạn lên đồ cơ bản
            </h2>
            <p className="text-xs sm:text-sm text-[#4E567A] leading-relaxed">
              Tùy biến chữ viết tắt (Monogram) hoặc tải logo công ty/nhóm thêu vi tính 14 mũi/inch trực tiếp lên áo Supima Cotton chất lượng cao — hoàn thành chỉ trong 1–2 ngày.
            </p>
          </div>

          {/* Interactive Studio Frame */}
          <div className="rounded-3xl border border-[#DCE0E7] bg-[#EFF2F9]/80 p-5 sm:p-8 lg:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT: Live Interactive T-Shirt Preview Canvas */}
              <div className="lg:col-span-6 space-y-4">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#BBC2DD] bg-white shadow-md select-none">
                  {/* Zoom Container */}
                  <div
                    className="w-full h-full relative transition-transform duration-500 ease-out"
                    style={
                      studioState.zoom
                        ? {
                            transform: "scale(2.2)",
                            transformOrigin: `${currentPlacement.coords.left} ${currentPlacement.coords.top}`,
                          }
                        : { transform: "scale(1)" }
                    }
                  >
                    <img
                      src="/assets/tshirt-model.jpg"
                      alt="Áo thun cotton supima thêu tên và logo"
                      className="w-full h-full object-cover object-top"
                    />

                    {/* Garment Color Tint */}
                    {studioState.garmentColor !== "ivory" && (
                      <div
                        className="absolute inset-0 mix-blend-multiply opacity-80 pointer-events-none"
                        style={{ backgroundColor: activeGarment.hex }}
                      />
                    )}

                    {/* Realistic Live Embroidery / Logo with Direct Touchpoints on Shirt */}
                    <RealisticEmbroideryOverlay
                      customization={{
                        ...studioState,
                        enabled: true,
                      }}
                      garmentColorHex={activeGarment.hex}
                      interactiveHotspots={true}
                      onSelectPlacement={(placement) =>
                        setStudioState((prev) => ({ ...prev, placement }))
                      }
                    />
                  </div>

                  {/* Overlaid Badges & Zoom Switcher */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#15095D] text-xs font-bold shadow-xs border border-[#DCE0E7]">
                      <Shirt className="w-3.5 h-3.5 text-[#32259B]" />
                      Vị trí: {currentPlacement.label}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setStudioState((prev) => ({ ...prev, zoom: !prev.zoom }))
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 hover:bg-white text-[#15095D] text-xs font-bold shadow-xs border border-[#DCE0E7] cursor-pointer transition-colors"
                    >
                      {studioState.zoom ? (
                        <>
                          <ZoomOut className="w-3.5 h-3.5" /> Toàn cảnh
                        </>
                      ) : (
                        <>
                          <ZoomIn className="w-3.5 h-3.5" /> Cận cảnh thớ chỉ
                        </>
                      )}
                    </button>
                  </div>

                  <div className="absolute bottom-16 inset-x-4 text-center pointer-events-none">
                    <p className="inline-block px-3 py-1 rounded-full bg-[#15095D]/90 text-[#FCFDF1] text-[11px] backdrop-blur-xs shadow-sm">
                      Chạm trực tiếp các điểm tròn trên áo để đổi vị trí thêu tức thì
                    </p>
                  </div>

                  {/* Garment Color Swatches on bottom of preview */}
                  <div className="absolute bottom-4 inset-x-4 flex items-center justify-between bg-white/92 backdrop-blur-md p-2.5 rounded-2xl border border-[#DCE0E7]">
                    <span className="text-[11px] font-bold text-[#15095D]">
                      Màu áo: <strong className="text-[#32259B]">{activeGarment.label}</strong>
                    </span>
                    <div className="flex items-center gap-2">
                      {HOME_GARMENT_COLORS.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() =>
                            setStudioState((prev) => ({ ...prev, garmentColor: c.id }))
                          }
                          className={`w-6 h-6 rounded-full border transition-transform cursor-pointer ${
                            studioState.garmentColor === c.id
                              ? "ring-2 ring-[#32259B] ring-offset-1 scale-110 border-[#15095D]"
                              : "border-[#15095D]/20 hover:scale-105"
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.label}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#4E567A] px-1">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1D7A5F]" />
                    Chỉ thêu chống phai màu khi giặt máy
                  </span>
                  <span>Hoàn thành trong 1–2 ngày</span>
                </div>
              </div>

              {/* RIGHT: Studio Control Panel */}
              <div className="lg:col-span-6 space-y-5">
                {/* Mode Selector Tabs */}
                <div className="grid grid-cols-2 p-1.5 bg-white rounded-2xl border border-[#BBC2DD]">
                  <button
                    type="button"
                    onClick={() =>
                      setStudioState((prev) => ({ ...prev, customType: "text" }))
                    }
                    className={`h-11 rounded-xl text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      studioState.customType === "text"
                        ? "bg-[#15095D] text-white shadow-xs"
                        : "text-[#4E567A] hover:text-[#15095D]"
                    }`}
                  >
                    <Type className="w-4 h-4" />
                    <span>Thêu Chữ / Monogram</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setStudioState((prev) => ({ ...prev, customType: "logo" }))
                    }
                    className={`h-11 rounded-xl text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      studioState.customType === "logo"
                        ? "bg-[#15095D] text-white shadow-xs"
                        : "text-[#4E567A] hover:text-[#15095D]"
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Thêu / Tải Logo</span>
                  </button>
                </div>

                {/* MODE A: TEXT MONOGRAM */}
                {studioState.customType === "text" ? (
                  <div className="space-y-4 bg-white p-5 rounded-2xl border border-[#DCE0E7]">
                    <div>
                      <label
                        htmlFor="home-monogram-input"
                        className="block text-xs font-bold text-[#15095D] mb-1.5"
                      >
                        NỘI DUNG THÊU
                      </label>
                      <input
                        id="home-monogram-input"
                        type="text"
                        maxLength={5}
                        value={studioState.monogramText}
                        onChange={(e) =>
                          setStudioState((prev) => ({
                            ...prev,
                            monogramText: e.target.value.slice(0, 5).toUpperCase(),
                          }))
                        }
                        placeholder="VD: H.L hoặc NAM"
                        className="w-full h-12 px-4 rounded-xl border border-[#BBC2DD] bg-[#F6F7FC] text-base font-bold text-[#15095D] tracking-wider placeholder:text-[#8D8DC7] outline-none focus:border-[#32259B] focus:bg-white"
                      />
                      <p className="text-[11px] text-[#4E567A] mt-1">
                        Hiển thị ngay trên áo bên trái. Tối đa 5 ký tự viết tắt.
                      </p>
                    </div>

                    <div>
                      <span className="block text-xs font-bold text-[#15095D] mb-1.5">
                        KIỂU CHỮ
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {HOME_STUDIO_FONTS.map((f) => {
                          const active = studioState.font === f.id;
                          return (
                            <button
                              key={f.id}
                              type="button"
                              onClick={() =>
                                setStudioState((prev) => ({ ...prev, font: f.id }))
                              }
                              className={`h-12 px-3 rounded-xl border flex flex-col justify-center items-center transition-all cursor-pointer ${
                                active
                                  ? "bg-[#15095D] text-white border-[#15095D] shadow-xs"
                                  : "bg-[#F6F7FC] text-[#15095D] border-[#DCE0E7] hover:border-[#625FBC]"
                              }`}
                            >
                              <span className="text-xs font-bold">{f.label}</span>
                              <span
                                className={`text-[10px] ${
                                  active ? "text-[#BBC2DD]" : "text-[#4E567A]"
                                }`}
                              >
                                {f.fontName}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* MODE B: LOGO UPLOAD */
                  <div className="space-y-4 bg-white p-5 rounded-2xl border border-[#DCE0E7]">
                    <div>
                      <span className="block text-xs font-bold text-[#15095D] mb-1.5">
                        TẢI ẢNH LOGO LÊN ÁO (PNG NỀN TRONG SUỐT, SVG, JPG)
                      </span>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/svg+xml, image/webp"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleHomeLogoUpload(e.target.files[0]);
                        }}
                      />

                      {studioState.logoUrl ? (
                        <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#32259B] bg-[#EFF2F9]">
                          <div className="flex items-center gap-3">
                            <img
                              src={studioState.logoUrl}
                              alt="Logo preview"
                              className="w-12 h-12 object-contain rounded-lg bg-white border border-[#BBC2DD] p-1 shadow-xs"
                            />
                            <div>
                              <p className="text-xs font-bold text-[#15095D] line-clamp-1">
                                {studioState.logoName || "Logo đã tải lên"}
                              </p>
                              <p className="text-[10px] text-[#1D7A5F] font-semibold">
                                ✓ Đang hiển thị trực tiếp trên ngực áo
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="text-xs font-semibold text-[#32259B] hover:underline cursor-pointer"
                            >
                              Đổi logo
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setStudioState((prev) => ({
                                  ...prev,
                                  logoUrl: "",
                                  logoName: "",
                                }))
                              }
                              className="w-7 h-7 rounded-full bg-white text-[#8D8DC7] hover:text-[#A52735] grid place-items-center border border-[#DCE0E7] cursor-pointer"
                              title="Xóa logo"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-[#BBC2DD] hover:border-[#32259B] bg-[#F6F7FC] rounded-2xl p-6 text-center cursor-pointer transition-colors"
                        >
                          <Upload className="w-7 h-7 text-[#32259B] mx-auto mb-2" />
                          <p className="text-xs font-bold text-[#15095D]">
                            Bấm vào đây để tải file logo từ máy
                          </p>
                          <p className="text-[10px] text-[#4E567A] mt-1">
                            Hỗ trợ PNG trong suốt, JPG, SVG tối đa 5MB
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Preset Sample Logos */}
                    <div className="pt-1 space-y-1.5">
                      <span className="text-[10px] font-bold text-[#4E567A] uppercase tracking-wider">
                        Hoặc thử nhanh logo mẫu xưởng:
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        {EMBROIDERY_SAMPLE_LOGOS.map((sample) => {
                          const active = studioState.logoSvg === sample.svg;
                          return (
                            <button
                              key={sample.id}
                              type="button"
                              onClick={() =>
                                setStudioState((prev) => ({
                                  ...prev,
                                  customType: "logo",
                                  logoUrl: null,
                                  logoSvg: sample.svg,
                                  logoName: sample.label,
                                }))
                              }
                              className={`px-3 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer ${
                                active
                                  ? "bg-[#15095D] text-white border-[#15095D] shadow-xs"
                                  : "bg-[#EFF2F9] text-[#32259B] border-[#BBC2DD] hover:bg-[#15095D] hover:text-white hover:border-[#15095D]"
                              }`}
                            >
                              + {sample.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Common Thread Colors */}
                <div className="space-y-2 bg-white p-5 rounded-2xl border border-[#DCE0E7]">
                  <span className="block text-xs font-bold text-[#15095D]">
                    MÀU CHỈ THÊU
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    {HOME_STUDIO_THREADS.map((t) => {
                      const active = studioState.threadColor === t.hex;
                      return (
                        <button
                          key={t.name}
                          type="button"
                          onClick={() =>
                            setStudioState((prev) => ({ ...prev, threadColor: t.hex }))
                          }
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                            active
                              ? "bg-[#15095D] text-white border-[#15095D] shadow-xs"
                              : "bg-[#F6F7FC] text-[#15095D] border-[#DCE0E7] hover:border-[#BBC2DD]"
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: t.hex }}
                          />
                          <span>{t.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Common Placements */}
                <div className="space-y-2 bg-white p-5 rounded-2xl border border-[#DCE0E7]">
                  <span className="block text-xs font-bold text-[#15095D]">
                    VỊ TRÍ THÊU
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {HOME_STUDIO_PLACEMENTS.map((p) => {
                      const active = studioState.placement === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() =>
                            setStudioState((prev) => ({ ...prev, placement: p.id }))
                          }
                          className={`h-11 px-2 rounded-xl text-xs font-bold border flex flex-col justify-center items-center transition-all cursor-pointer ${
                            active
                              ? "bg-[#15095D] text-white border-[#15095D] shadow-xs"
                              : "bg-[#F6F7FC] text-[#15095D] border-[#DCE0E7] hover:border-[#625FBC]"
                          }`}
                        >
                          <span>{p.label}</span>
                          <span
                            className={`text-[9px] font-normal line-clamp-1 ${
                              active ? "text-[#BBC2DD]" : "text-[#4E567A]"
                            }`}
                          >
                            {p.sublabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pricing & Call to Action */}
                <div className="rounded-2xl bg-[#FCFDF1] border border-[#BBC2DD] p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#4E567A]">
                        Áo Thun Supima Cotton 260 GSM + Thêu Riêng
                      </p>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-2xl font-bold text-[#15095D] tabular-nums">
                          {formatVnd(245000 + (studioState.customType === "logo" ? 45000 : 35000))}
                        </span>
                        <span className="text-xs text-[#8D8DC7] line-through tabular-nums">
                          690.000đ
                        </span>
                        <span className="text-[10px] font-bold text-[#1D7A5F] bg-[#1D7A5F]/10 px-2 py-0.5 rounded-full">
                          Tiết kiệm -59%
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-[#4E567A]">
                      Xưởng Dệt Kim Số 04
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={handleOrderCustomShirt}
                      className="h-12 px-6 rounded-full unlo-pill-primary text-xs font-bold uppercase tracking-[0.1em] inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-transform"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>
                        CHỌN ÁO ĐỂ THÊU NGAY
                      </span>
                    </button>

                    <Link
                      href="/products/ao-thun-cotton-supima-260gsm-det-kim-nguyen-khoi-690000000000000000000101#studio"
                      className="h-12 px-5 rounded-full border border-[#15095D] text-[#15095D] hover:bg-[#15095D] hover:text-white text-xs font-bold uppercase tracking-[0.08em] inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Xem Bảng Size Chi Tiết</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            6. INTERACTIVE TRUST-TECH TRANSPARENT PRICING EXPLORER
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
            7. SHOP BY FACTORY PREVIEW STRIP (4 VERIFIED FACTORIES)
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
            8. 4-COLUMN ZERO-RISK GUARANTEE STRIP
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
            9. CLOSING EDITORIAL BANNER
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
