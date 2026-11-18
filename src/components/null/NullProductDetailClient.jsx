"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  RefreshCw,
  ShieldCheck,
  Star,
  Minus,
  Plus,
  Play,
  Ruler,
  Factory,
  MapPin,
  ArrowRight,
  Check,
  CheckCircle2,
  Layers,
  X,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import PersonalizationStudio, {
  computePersonalizationFee,
} from "@/components/null/PersonalizationStudio";
import RealisticEmbroideryOverlay, {
  REALISTIC_PLACEMENTS,
} from "@/components/null/RealisticEmbroideryOverlay";
import TransparencyCostChart from "@/components/null/TransparencyCostChart";
import VerifiedFitReviews from "@/components/null/VerifiedFitReviews";
import NullProductCard from "@/components/null/NullProductCard";
import { formatVnd } from "@/app/services/api/nullCommerceService";
import { UNLO_PRODUCTS, getProductsByFactorySlug } from "@/lib/unloCatalog";
import { findFactoryBySlug, UNLO_FACTORIES } from "@/lib/unloFactories";

export default function NullProductDetailClient({ initialProduct }) {
  const router = useRouter();
  const product = initialProduct;
  const { addToCart, setIsCartOpen } = useCart() || {};
  const { isInWishlist, toggleWishlist } = useWishlist() || {};

  const factory =
    findFactoryBySlug(product?.factorySlug) || UNLO_FACTORIES[0];

  const variants = useMemo(() => product?.variants || [], [product]);
  const colors = useMemo(() => {
    const map = new Map();
    for (const v of variants) {
      if (!map.has(v.colorName)) {
        map.set(v.colorName, { name: v.colorName, hex: v.colorHex || "#32259B" });
      }
    }
    return [...map.values()];
  }, [variants]);

  const [selectedColor, setSelectedColor] = useState(colors[0]?.name || "");
  const sizesForColor = useMemo(
    () => variants.filter((v) => !selectedColor || v.colorName === selectedColor),
    [variants, selectedColor],
  );
  const [selectedVariantId, setSelectedVariantId] = useState(
    () => sizesForColor.find((v) => v.stock > 0)?._id || sizesForColor[0]?._id || null,
  );
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [showFactoryVideo, setShowFactoryVideo] = useState(false);
  const [heroZoom, setHeroZoom] = useState(false);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Smart Bundling (Block 5): Quick 3-pack color selection
  const [bundleColors, setBundleColors] = useState(() => [
    colors[0]?.name || "",
    colors[1]?.name || colors[0]?.name || "",
    colors[2]?.name || colors[0]?.name || "",
  ]);

  const [customization, setCustomization] = useState({
    enabled: false,
    customType: "text",
    monogramText: product?.personalizationConfig?.defaultHeadline || "H.L",
    logoUrl: "",
    logoName: "",
    font: "serif_minimal",
    threadColor: "",
    placement: "chest_pocket",
    innerLabelText: "",
    giftBoxType: "none",
    giftNote: "",
  });

  const handleCustomizationChange = (next) => {
    setCustomization(next);
    if (next?.enabled && selectedImageIdx !== 0) {
      setSelectedImageIdx(0);
      setShowFactoryVideo(false);
    }
  };

  const activeVariant = useMemo(
    () => variants.find((v) => v._id === selectedVariantId) || variants[0] || null,
    [variants, selectedVariantId],
  );

  const handleSelectColor = (colorName) => {
    setSelectedColor(colorName);
    setSelectedImageIdx(0);
    setShowFactoryVideo(false);
    const matches = variants.filter((v) => v.colorName === colorName);
    const sameSize = matches.find(
      (v) => v.size === activeVariant?.size && v.stock > 0,
    );
    setSelectedVariantId(
      sameSize?._id || matches.find((v) => v.stock > 0)?._id || matches[0]?._id || null,
    );
  };

  const galleryImages = useMemo(() => {
    const vImgs = activeVariant?.images?.length ? activeVariant.images : [];
    const pImgs = product?.images || [];
    const merged = [...vImgs, ...pImgs]
      .map((i) => (typeof i === "string" ? i : i.url))
      .filter(Boolean);
    return merged.length ? [...new Set(merged)] : ["/assets/placeholder.png"];
  }, [activeVariant, product]);

  const activeHeroImage = galleryImages[selectedImageIdx] || galleryImages[0];

  const baseUnitPrice = useMemo(() => {
    const raw = (product?.price || 0) + (activeVariant?.priceDelta || 0);
    const sale = product?.salePercent || 0;
    return sale > 0 ? Math.round(raw * (1 - sale / 100)) : raw;
  }, [product, activeVariant]);

  const comparePrice =
    product?.costBreakdown?.traditionalRetailPrice ||
    Math.round(baseUnitPrice * 2.5);

  const savingsPct =
    comparePrice > baseUnitPrice
      ? Math.round(((comparePrice - baseUnitPrice) / comparePrice) * 100)
      : 0;

  const personalizationFee = computePersonalizationFee(
    customization,
    product?.personalizationConfig,
  );
  const totalUnitPrice = baseUnitPrice + personalizationFee;
  const availableStock = variants.length
    ? activeVariant?.stock ?? 0
    : product?.stock ?? 0;

  const bundleUnitPrice = Math.round(baseUnitPrice * 0.88);
  const bundleTotalPrice = bundleUnitPrice * 3;
  const bundleSavings = baseUnitPrice * 3 - bundleTotalPrice;

  const sameFactoryProducts = getProductsByFactorySlug(factory?.slug).filter(
    (p) => p._id !== product?._id,
  );
  const relatedProducts =
    sameFactoryProducts.length >= 2
      ? sameFactoryProducts.slice(0, 5)
      : UNLO_PRODUCTS.filter((p) => p._id !== product?._id).slice(0, 5);

  const buildCartItem = (overrideVariant = activeVariant, overridePrice = totalUnitPrice) => ({
    ...product,
    _id: product._id,
    id: product._id,
    productId: product._id,
    itemType: "product",
    price: overridePrice,
    image: galleryImages[0],
    ...(overrideVariant
      ? {
          variantId: overrideVariant._id,
          variantSummary: {
            size: overrideVariant.size,
            colorName: overrideVariant.colorName,
            colorHex: overrideVariant.colorHex,
          },
        }
      : {}),
    ...(customization.enabled
      ? {
          customization: {
            ...customization,
            monogramText: String(
              customization.customType === "logo"
                ? (customization.monogramText || "LOGO")
                : (customization.monogramText || "")
            ).trim().slice(0, 5),
            innerLabelText: String(
              customization.innerLabelText ||
              (customization.logoName ? `Logo: ${customization.logoName}` : "")
            ).slice(0, 30),
            giftNote: String(
              customization.logoName
                ? `[Thêu Logo: ${customization.logoName}] ${customization.giftNote || ""}`
                : (customization.giftNote || "")
            ).slice(0, 250),
          },
        }
      : {}),
  });

  const handleAddToCart = () => {
    if (!addToCart) return;
    addToCart(buildCartItem(), quantity);
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng`);
    setIsCartOpen?.(true);
  };

  const handleAddSmartBundle = () => {
    if (!addToCart) return;
    bundleColors.forEach((colorName) => {
      const match =
        variants.find(
          (v) => v.colorName === colorName && v.size === activeVariant?.size,
        ) ||
        variants.find((v) => v.colorName === colorName) ||
        activeVariant;
      addToCart(buildCartItem(match, bundleUnitPrice), 1);
    });
    toast.success(
      `Đã thêm Combo 3 món (${formatVnd(bundleTotalPrice)} · Tiết kiệm ${formatVnd(bundleSavings)}) vào giỏ hàng!`,
    );
    setIsCartOpen?.(true);
  };

  const liked = isInWishlist?.(product._id);
  const ratingValue = product.rate > 0 ? Math.round(product.rate) : 5;
  const specRows = product?.specComparison?.length
    ? product.specComparison
    : [
        {
          label: "Thành phần chất liệu",
          unlo: product?.specs?.fabricComposition || "Vật liệu chuẩn xuất khẩu",
          retail: "Vật liệu pha tạp phổ thông",
        },
        {
          label: "Định lượng / Độ dày",
          unlo: product?.specs?.gsmWeight ? `${product.specs.gsmWeight} GSM` : "Chuẩn cao cấp",
          retail: "Không công bố định lượng",
        },
        {
          label: "Kiểm định QC trước xuất kho",
          unlo: "12 bước kiểm tra độc lập AQL 2.5",
          retail: "Kiểm tra ngẫu nhiên",
        },
      ];

  return (
    <div className="space-y-14 sm:space-y-18 pb-20 lg:pb-0">
      {/* ====================================================================
          KHỐI 1: ABOVE THE FOLD — Ấn tượng đầu tiên, Video xưởng & Mua nhanh
          ==================================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Gallery + 10s Factory Video Toggle */}
        <div className="lg:col-span-6 space-y-3 lg:sticky lg:top-24">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#EFF2F9] border border-[#DCE0E7]">
            {showFactoryVideo ? (
              <div className="w-full h-full bg-[#15095D] text-[#FCFDF1] flex flex-col justify-between p-6 sm:p-8 relative">
                <img
                  src={factory?.coverImage || activeHeroImage}
                  alt="Dây chuyền sản xuất tại xưởng"
                  className="absolute inset-0 w-full h-full object-cover opacity-45"
                />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#32259B] text-[11px] font-bold uppercase tracking-wider">
                    <Play className="w-3 h-3 fill-white" /> Video dây chuyền 10s
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowFactoryVideo(false)}
                    className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 grid place-items-center cursor-pointer"
                    aria-label="Quay lại ảnh sản phẩm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="relative z-10 space-y-2 bg-[#15095D]/85 backdrop-blur-md p-5 rounded-2xl border border-[#9EA1D2]/30">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#BBC2DD]">
                    {factory?.code} · {factory?.location}
                  </p>
                  <p className="font-serif text-xl font-semibold">
                    {product.factoryVideoCaption ||
                      "Quay trực tiếp công đoạn hoàn thiện & kiểm định QC tại xưởng đối tác."}
                  </p>
                  <Link
                    href={`/factories/${factory?.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#BBC2DD] hover:text-white pt-1"
                  >
                    Xem toàn bộ 4 bước dây chuyền xưởng <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full overflow-hidden">
                <div
                  className="w-full h-full relative transition-transform duration-500 ease-out"
                  style={
                    heroZoom && customization.enabled
                      ? {
                          transform: "scale(2.2)",
                          transformOrigin: `${
                            REALISTIC_PLACEMENTS[customization.placement || "chest_pocket"]?.coords.left
                          } ${
                            REALISTIC_PLACEMENTS[customization.placement || "chest_pocket"]?.coords.top
                          }`,
                        }
                      : { transform: "scale(1)" }
                  }
                >
                  <img
                    src={activeHeroImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Live Realistic Embroidery / Logo Overlay directly on the main product image */}
                  {customization.enabled && selectedImageIdx === 0 && (
                    <RealisticEmbroideryOverlay
                      customization={customization}
                      garmentColorHex={activeVariant?.colorHex}
                      interactiveHotspots={true}
                      onSelectPlacement={(placement) =>
                        setCustomization((prev) => ({ ...prev, placement }))
                      }
                    />
                  )}
                </div>

                {savingsPct > 0 && (
                  <span className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-[#32259B] text-white text-xs font-bold tracking-wide">
                    Tiết kiệm {savingsPct}% nhờ cắt trung gian
                  </span>
                )}

                {/* Floating Live Badge when Customization is Enabled */}
                {customization.enabled && selectedImageIdx === 0 && (
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#DCE0E7] shadow-sm text-xs">
                    <span className="w-2 h-2 rounded-full bg-[#1D7A5F] animate-ping" />
                    <span className="text-[#15095D] font-bold">
                      {customization.customType === "logo" ? "Thêu logo thật:" : "Thêu tên thật:"}
                    </span>
                    <span className="text-[#32259B] font-semibold">
                      {REALISTIC_PLACEMENTS[customization.placement || "chest_pocket"]?.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => setHeroZoom(!heroZoom)}
                      className="ml-1 pl-2 border-l border-[#BBC2DD] text-[11px] font-bold text-[#443EB1] hover:underline cursor-pointer"
                    >
                      {heroZoom ? "Thu nhỏ" : "Phóng to xem thớ chỉ"}
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    const added = toggleWishlist?.(product);
                    toast.success(added ? "Đã lưu vào yêu thích" : "Đã bỏ khỏi yêu thích");
                  }}
                  aria-label={liked ? "Bỏ yêu thích" : "Lưu yêu thích"}
                  className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/95 text-[#15095D] shadow-sm grid place-items-center null-pressable cursor-pointer"
                >
                  <Heart
                    className={`w-5 h-5 ${liked ? "fill-[#443EB1] text-[#443EB1]" : ""}`}
                  />
                </button>
              </div>
            )}
          </div>

          {/* Thumbnails + Video 10s Trigger */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {galleryImages.map((src, idx) => (
              <button
                key={src}
                type="button"
                onClick={() => {
                  setShowFactoryVideo(false);
                  setSelectedImageIdx(idx);
                }}
                aria-label={`Xem ảnh ${idx + 1}`}
                className={`w-20 h-24 rounded-2xl overflow-hidden border-2 shrink-0 transition-colors cursor-pointer ${
                  !showFactoryVideo && selectedImageIdx === idx
                    ? "border-[#32259B]"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}

            <button
              type="button"
              onClick={() => setShowFactoryVideo(true)}
              className={`w-24 h-24 rounded-2xl border-2 shrink-0 bg-[#15095D] text-[#FCFDF1] flex flex-col items-center justify-center gap-1.5 p-2 text-center cursor-pointer transition-colors ${
                showFactoryVideo ? "border-[#625FBC]" : "border-[#DCE0E7]"
              }`}
            >
              <Play className="w-5 h-5 fill-[#BBC2DD] text-[#BBC2DD]" />
              <span className="text-[10px] font-bold leading-tight">Video xưởng 10s</span>
            </button>
          </div>
        </div>

        {/* Right: Material Title, Direct Price Comparison, Variant & Buy Box */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Link
                href={`/factories/${factory?.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF2F9] text-[#32259B] font-bold hover:bg-[#32259B] hover:text-white transition-colors"
              >
                <Factory className="w-3.5 h-3.5" aria-hidden="true" />
                {factory?.shortName || product.creatorName}
              </Link>
              {product.specs?.gsmWeight && (
                <span className="px-2.5 py-1 rounded-full bg-[#FCFDF1] border border-[#DCE0E7] text-[#15095D] font-mono font-semibold">
                  {product.specs.gsmWeight} GSM
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-[#15095D]">
              {product.name}
            </h1>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${
                      s <= ratingValue ? "fill-[#443EB1] text-[#443EB1]" : "text-[#DCE0E7]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#4E567A]">
                {product.rate || 4.9} ({product.reviewCount || 128} đánh giá xác thực)
              </span>
            </div>

            {/* Direct Price Comparison Block */}
            <div className="rounded-2xl bg-[#FCFDF1] border border-[#DCE0E7] p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#4E567A]">
                  Giá M2C trực tiếp từ xưởng
                </p>
                <div className="flex items-baseline gap-2.5 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-bold text-[#15095D] tabular-nums">
                    {formatVnd(totalUnitPrice)}
                  </span>
                  <span className="text-sm text-[#8D8DC7] line-through tabular-nums">
                    {formatVnd(comparePrice)}
                  </span>
                </div>
              </div>
              {savingsPct > 0 && (
                <span className="px-3.5 py-1.5 rounded-full bg-[#EFF2F9] border border-[#BBC2DD] text-xs font-bold text-[#32259B]">
                  Tiết kiệm {savingsPct}% (cắt trung gian)
                </span>
              )}
            </div>

            <p className="text-sm text-[#4E567A] leading-relaxed">{product.descriptions}</p>
          </div>

          {/* Color Selector */}
          {colors.length > 0 && (
            <div className="space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4E567A]">
                Màu sắc: <strong className="text-[#15095D]">{selectedColor}</strong>
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => handleSelectColor(c.name)}
                    data-active={selectedColor === c.name ? "true" : "false"}
                    aria-label={`Chọn màu ${c.name}`}
                    className="null-swatch w-9 h-9 border border-[#15095D]/25 cursor-pointer"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selector + Size Chart Modal Trigger */}
          {sizesForColor.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4E567A]">
                  Kích cỡ / Phiên bản
                </p>
                {product.sizeChart?.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSizeModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#32259B] hover:underline cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" aria-hidden="true" />
                    Bảng thông số đo thực tế
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {sizesForColor.map((v) => {
                  const active = activeVariant?._id === v._id;
                  return (
                    <button
                      key={v._id}
                      type="button"
                      onClick={() => setSelectedVariantId(v._id)}
                      className={`h-10 px-5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                        active
                          ? "bg-[#15095D] text-[#FCFDF1] border-[#15095D]"
                          : "bg-white text-[#15095D] border-[#BBC2DD] hover:border-[#32259B]"
                      }`}
                    >
                      {v.size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Subtle Customization (No-Logo Monogram / Engraving) */}
          <PersonalizationStudio
            config={product.personalizationConfig}
            value={customization}
            onChange={handleCustomizationChange}
            garmentColorHex={activeVariant?.colorHex || "#15095D"}
          />

          {/* Quantity + Primary Buy Actions */}
          <div className="space-y-3 pt-1">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-[#BBC2DD] bg-white h-12 px-1.5">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Giảm số lượng"
                  className="w-9 h-9 rounded-full grid place-items-center text-[#15095D] hover:bg-[#EFF2F9] cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="min-w-10 text-center text-sm font-bold text-[#15095D] tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(availableStock || 99, q + 1))}
                  aria-label="Tăng số lượng"
                  className="w-9 h-9 rounded-full grid place-items-center text-[#15095D] hover:bg-[#EFF2F9] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 min-w-[210px] h-12 px-6 rounded-full unlo-pill-primary text-xs sm:text-sm font-bold uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                <span>Thêm vào giỏ · {formatVnd(totalUnitPrice * quantity)}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                addToCart?.(buildCartItem(), quantity);
                router.push("/checkout");
              }}
              className="w-full h-12 rounded-full unlo-pill-outline text-xs sm:text-sm font-bold uppercase tracking-[0.08em] cursor-pointer"
            >
              Mua Ngay — Kiểm Hàng Trước Khi Thanh Toán
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          KHỐI 2: BIỂU ĐỒ BÓC TÁCH CHI PHÍ MINH BẠCH (4 PHÂN ĐOẠN)
          ==================================================================== */}
      <TransparencyCostChart product={product} />

      {/* ====================================================================
          KHỐI 3: THẺ HỒ SƠ NHÀ MÁY SẢN XUẤT (FACTORY PASSPORT CARD)
          ==================================================================== */}
      {factory && (
        <section
          aria-label="Hồ sơ nhà máy sản xuất"
          className="rounded-3xl bg-gradient-to-br from-[#15095D] via-[#1F0C85] to-[#0B2056] text-[#FCFDF1] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-5 aspect-[16/10] rounded-2xl overflow-hidden border border-white/15">
            <img
              src={factory.coverImage}
              alt={factory.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-7 space-y-4">
            <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#BBC2DD]">
              FACTORY PASSPORT
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight text-[#FCFDF1]">
              {factory.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#DCE0E7] inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#9EA1D2]" aria-hidden="true" />
              {factory.location} · {factory.yearsExperience} năm kinh nghiệm xuất khẩu
            </p>
            <p className="text-sm text-[#EFF2F9]/90 leading-relaxed">
              {factory.ndaTrackRecord}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {factory.certifications.map((cert) => (
                <span
                  key={cert.code}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-[#9EA1D2]/35 text-xs font-semibold text-[#FCFDF1]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#BBC2DD]" aria-hidden="true" />
                  {cert.code}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href={`/factories/${factory.slug}`}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full unlo-pill-lilac text-xs font-bold uppercase tracking-[0.1em]"
              >
                <span>Khám phá nhà máy này</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ====================================================================
          KHỐI 4: BẢNG SO SÁNH THÔNG SỐ VẬT LIỆU (SPEC-BY-SPEC) & QC LOG
          ==================================================================== */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#625FBC]">
              SPEC-BY-SPEC &amp; QC LOG
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#15095D]">
              Thông Số Kỹ Thuật &amp; Nhật Ký Kiểm Định Vật Liệu
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FCFDF1] border border-[#DCE0E7] text-xs font-semibold text-[#15095D]">
            <CheckCircle2 className="w-4 h-4 text-[#1D7A5F]" aria-hidden="true" />
            <span>{product.specs?.qcBatchCode || "Vượt qua 12/12 bước kiểm định QC AQL 2.5"}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[600px] rounded-3xl border border-[#DCE0E7] bg-white overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#DCE0E7] text-xs uppercase tracking-[0.12em]">
                  <th className="py-4 px-6 font-bold text-[#4E567A] w-[30%]">Thông số đo lường</th>
                  <th className="py-4 px-6 bg-[#15095D] text-[#FCFDF1] font-serif text-sm w-[38%]">
                    UNLO M2C (Tại xưởng)
                  </th>
                  <th className="py-4 px-6 font-bold text-[#4E567A] w-[32%]">
                    Thương hiệu bán lẻ truyền thống
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFF2F9] text-sm">
                {specRows.map((row) => (
                  <tr key={row.label}>
                    <td className="py-4 px-6 font-semibold text-[#15095D]">{row.label}</td>
                    <td className="py-4 px-6 bg-[#EFF2F9]/55 font-semibold text-[#15095D]">
                      <span className="inline-flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#32259B] shrink-0" aria-hidden="true" />
                        {row.unlo}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-[#4E567A]">{row.retail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====================================================================
          KHỐI 5: GỢI Ý MUA THEO BỘ TIẾT KIỆM (SMART BUNDLING NGAY TRÊN PDP)
          ==================================================================== */}
      <section className="rounded-3xl bg-[#FCFDF1] border border-[#DCE0E7] p-6 sm:p-9 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#625FBC]">
              SMART BUNDLING
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#15095D]">
              Mua Theo Bộ 3 Món — Tiết Kiệm Thêm 12% &amp; Freeship Toàn Quốc
            </h2>
            <p className="text-sm text-[#4E567A]">
              Mua lẻ 1 món: <strong className="tabular-nums">{formatVnd(baseUnitPrice)}</strong> · Combo 3 món tự chọn màu chỉ còn{" "}
              <strong className="text-[#32259B] tabular-nums">{formatVnd(bundleUnitPrice)}/món</strong> (Tổng{" "}
              <strong className="text-[#15095D] tabular-nums">{formatVnd(bundleTotalPrice)}</strong>, tiết kiệm{" "}
              <strong className="text-[#1D7A5F] tabular-nums">{formatVnd(bundleSavings)}</strong>).
            </p>
          </div>
          <Link
            href="/bundles"
            className="text-xs font-bold text-[#32259B] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <Layers className="w-4 h-4" /> Tự phối Combo 3–5 món khác
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0, 1, 2].map((slotIdx) => (
            <div
              key={slotIdx}
              className="rounded-2xl bg-white border border-[#DCE0E7] p-4 space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs font-bold text-[#15095D]">
                <span>Món #{slotIdx + 1}</span>
                <span className="text-[#32259B] tabular-nums">{formatVnd(bundleUnitPrice)}</span>
              </div>
              <select
                aria-label={`Chọn màu cho món thứ ${slotIdx + 1}`}
                value={bundleColors[slotIdx]}
                onChange={(e) =>
                  setBundleColors((prev) =>
                    prev.map((val, idx) => (idx === slotIdx ? e.target.value : val)),
                  )
                }
                className="w-full h-10 px-3 rounded-xl bg-[#EFF2F9] border border-[#BBC2DD] text-xs font-semibold text-[#15095D] outline-none focus:border-[#32259B]"
              >
                {(colors.length ? colors : [{ name: "Mặc định" }]).map((c) => (
                  <option key={c.name} value={c.name}>
                    Màu: {c.name} · Size {activeVariant?.size || "Tiêu chuẩn"}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <p className="text-xs text-[#4E567A]">
            Gom chung 1 kiện từ <strong>{factory?.shortName}</strong> giúp tối ưu chi phí vận chuyển.
          </p>
          <button
            type="button"
            onClick={handleAddSmartBundle}
            className="h-12 px-7 rounded-full unlo-pill-primary text-xs font-bold uppercase tracking-[0.1em] inline-flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            Thêm Nhanh Combo 3 Món ({formatVnd(bundleTotalPrice)})
          </button>
        </div>
      </section>

      {/* ====================================================================
          KHỐI 6: CAM KẾT BẢO CHỨNG KHÔNG RỦI RO (ZERO-RISK GUARANTEE)
          ==================================================================== */}
      <section aria-label="Cam kết bảo chứng không rủi ro" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: Eye,
            title: "Kiểm Hàng Trước Khi Thanh Toán",
            desc: "Được mở gói kiểm tra trực tiếp độ dày vải, vân da và đường may ngay trước khi trả tiền cho shipper.",
          },
          {
            icon: RefreshCw,
            title: "Đổi Trả Miễn Phí 30 Ngày",
            desc: "Hỗ trợ đổi kích cỡ hoặc hoàn tiền 100% tận nhà qua Cổng Tự Đổi Trả nếu không đúng mô tả.",
          },
          {
            icon: ShieldCheck,
            title: "Bảo Hành Lỗi Sản Xuất Trọn Đời",
            desc: "Đổi mới lập tức nếu phát hiện lỗi đường may, bung chỉ, kẹt khóa kéo YKK hoặc lỗi kỹ thuật từ xưởng.",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-2xl bg-[#EFF2F9] border border-[#DCE0E7] p-6 space-y-2.5"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-[#DCE0E7] text-[#32259B] grid place-items-center">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#15095D]">{item.title}</h3>
              <p className="text-xs sm:text-[13px] text-[#4E567A] leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </section>

      {/* ====================================================================
          KHỐI 7: ĐÁNH GIÁ THEO VÓC DÁNG & HỎI ĐÁP CÙNG QUẢN ĐỐC XƯỞNG
          ==================================================================== */}
      <VerifiedFitReviews product={product} factory={factory} />

      {/* Shop by Factory / Related Products */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#625FBC]">
              SHOP BY FACTORY
            </p>
            <h2 className="font-serif text-3xl font-semibold text-[#15095D]">
              Sản Phẩm Cùng Xưởng &amp; Đề Xuất Gộp Kiện
            </h2>
          </div>
          {factory && (
            <Link
              href={`/factories/${factory.slug}`}
              className="text-xs font-bold text-[#32259B] hover:underline inline-flex items-center gap-1"
            >
              Xem toàn bộ sản phẩm từ {factory.code} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {relatedProducts.map((item) => (
            <NullProductCard key={item._id} product={item} />
          ))}
        </div>
      </section>

      {/* Mobile Sticky Bottom Buy Bar (Wireframe Khối 1) */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-[#DCE0E7] px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-8px_24px_-12px_rgba(21,9,93,0.18)]">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#625FBC]">
            Giá M2C · Tiết kiệm {savingsPct}%
          </p>
          <p className="text-base font-bold text-[#15095D] tabular-nums">
            {formatVnd(totalUnitPrice * quantity)}
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="h-11 px-6 rounded-full unlo-pill-primary text-xs font-bold uppercase tracking-[0.08em] inline-flex items-center gap-1.5 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          Thêm vào giỏ
        </button>
      </div>

      {/* Modal Bảng Thông Số Đo Thực Tế */}
      {sizeModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Bảng thông số đo thực tế"
          className="fixed inset-0 z-70 bg-[#15095D]/45 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSizeModalOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-3xl bg-white border border-[#DCE0E7] p-6 sm:p-7 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-semibold text-[#15095D]">
                Bảng Thông Số Đo Thực Tế Tại Xưởng
              </h3>
              <button
                type="button"
                onClick={() => setSizeModalOpen(false)}
                aria-label="Đóng bảng size"
                className="w-9 h-9 rounded-full grid place-items-center text-[#4E567A] hover:bg-[#EFF2F9]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#EFF2F9] text-[#15095D]">
                    <th className="py-2.5 px-3 font-bold">Size</th>
                    <th className="py-2.5 px-3 font-bold">Chiều cao</th>
                    <th className="py-2.5 px-3 font-bold">Cân nặng</th>
                    <th className="py-2.5 px-3 font-bold">Rộng / Ngực</th>
                    <th className="py-2.5 px-3 font-bold">Chiều dài</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFF2F9]">
                  {(product.sizeChart || []).map((row) => (
                    <tr key={row.size}>
                      <td className="py-2.5 px-3 font-bold text-[#32259B]">{row.size}</td>
                      <td className="py-2.5 px-3 text-[#15095D]">{row.height}</td>
                      <td className="py-2.5 px-3 text-[#15095D]">{row.weight}</td>
                      <td className="py-2.5 px-3 text-[#4E567A]">{row.chest}</td>
                      <td className="py-2.5 px-3 text-[#4E567A]">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#4E567A]">
              Sai số đo thực tế tại xưởng: ±0.5cm. Miễn phí đổi size tận nhà trong 30 ngày.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
