"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Heart, Star, Sparkles, Layers } from "lucide-react";
import { toast } from "sonner";
import { useWishlist } from "@/app/context/WishlistContext";
import { useCart } from "@/app/context/CartContext";
import { formatVnd } from "@/app/services/api/nullCommerceService";
import QuickAddModal from "./QuickAddModal";

function extractColors(variants = []) {
  const seen = new Map();
  for (const v of variants) {
    if (v?.colorName && !seen.has(v.colorName)) {
      seen.set(v.colorName, {
        name: v.colorName,
        hex: v.colorHex || "#32259B",
        variant: v,
      });
    }
  }
  return [...seen.values()];
}

function resolveBadge(product, overrideBadge) {
  if (overrideBadge) return overrideBadge;
  if (product.badge) return product.badge;
  if (product.salePercent > 0) {
    return { label: `SALE -${product.salePercent}%`, tone: "indigo" };
  }
  if ((product.soldCount || 0) >= 250 || (product.rate || 0) >= 4.9) {
    return { label: "BESTSELLER", tone: "dark" };
  }
  if (product.personalizationConfig?.enabled) {
    return { label: "CUSTOM", tone: "periwinkle" };
  }
  return { label: "MỚI", tone: "light" };
}

export default function NullProductCard({
  product,
  variant = "light",
  badge = null,
  showSwatches = true,
  showAddToCart = true,
}) {
  const { isInWishlist, toggleWishlist } = useWishlist() || {};
  const { addToCart, setIsCartOpen } = useCart() || {};
  const colors = extractColors(product?.variants);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [hoverImageIdx, setHoverImageIdx] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // useMemo PHẢI được gọi trước mọi early return (React Hooks rules)
  const imageList = useMemo(() => {
    const raw = product?.images || [];
    const urls = raw.map((img) => (typeof img === "string" ? img : img?.url)).filter(Boolean);
    return urls.length ? urls : ["/assets/placeholder.png"];
  }, [product]);

  if (!product) return null;

  const isDark = variant === "dark";
  const slugUrl = `/products/${product.slug || "san-pham"}-${product._id}`;

  const activeImgUrl = imageList[isHovering ? hoverImageIdx % imageList.length : 0] || imageList[0];
  const activeColor = colors[selectedColorIdx] || colors[0] || null;
  const activeVariant = activeColor?.variant || product.variants?.[0] || null;

  const basePrice = (product.price || 0) + (activeVariant?.priceDelta || 0);
  const displayPrice =
    product.salePercent > 0
      ? Math.round(basePrice * (1 - product.salePercent / 100))
      : basePrice;
  const comparePrice =
    product.salePercent > 0
      ? basePrice
      : product.costBreakdown?.traditionalRetailPrice > displayPrice
        ? product.costBreakdown.traditionalRetailPrice
        : 0;

  const liked = isInWishlist?.(product._id);
  const activeBadge = resolveBadge(product, badge);
  const ratingValue = product.rate > 0 ? Math.round(product.rate) : 5;
  const reviewCount = product.reviewCount || Math.max(24, Math.round((product.soldCount || 40) / 2.5));

  const badgeToneClass =
    activeBadge.tone === "indigo"
      ? "bg-[#32259B] text-white"
      : activeBadge.tone === "dark"
        ? "bg-[#15095D] text-[#FCFDF1]"
        : activeBadge.tone === "periwinkle"
          ? "bg-[#BBC2DD]/95 text-[#15095D]"
          : "bg-[#FCFDF1]/95 text-[#15095D] border border-[#DCE0E7]";

  const handleQuickAdd = () => {
    setQuickAddOpen(true);
  };

  return (
    <article className="group flex flex-col h-full">
      {/* Clean Rounded Portrait Frame on Meteor Canvas (#EFF2F9) */}
      <div
        className={`relative aspect-[4/5] rounded-2xl overflow-hidden border transition-all duration-300 ${
          isDark
            ? "bg-[#121D45] border-white/10"
            : "bg-[#EFF2F9] border-[#DCE0E7]/70"
        }`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setHoverImageIdx(0);
        }}
      >
        <Link href={slugUrl} className="block w-full h-full">
          <img
            src={activeImgUrl}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover null-card-img transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Multi-angle indicator dots if product has multiple images */}
        {imageList.length > 1 && isHovering && (
          <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 z-10 pointer-events-auto">
            {imageList.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                aria-label={`Xem góc ảnh ${dotIdx + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setHoverImageIdx(dotIdx);
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  (isHovering ? hoverImageIdx % imageList.length : 0) === dotIdx
                    ? "w-4 bg-white"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}

        {/* Top-Left Pill Badge */}
        {activeBadge && (
          <span
            className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] pointer-events-none ${badgeToneClass}`}
          >
            {activeBadge.label}
          </span>
        )}

        {/* Top-Right Wishlist Heart (Astera Moodboard Position) */}
        <button
          type="button"
          onClick={() => {
            const added = toggleWishlist?.(product);
            toast.success(added ? "Đã lưu vào yêu thích" : "Đã bỏ khỏi yêu thích");
          }}
          aria-label={liked ? "Bỏ yêu thích" : "Lưu yêu thích"}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full backdrop-blur-sm grid place-items-center transition-[opacity,background-color,transform] duration-150 null-pressable ${
            liked
              ? "bg-white text-[#443EB1] opacity-100 shadow-xs"
              : "bg-white/90 text-[#15095D] opacity-95 hover:bg-white shadow-xs"
          }`}
        >
          <Heart
            className={`w-3.5 h-3.5 stroke-[1.8] ${liked ? "fill-[#443EB1]" : ""}`}
            aria-hidden="true"
          />
        </button>

        {/* Subtle Bottom-Left Customizer Quick Pill on Hover */}
        {product.personalizationConfig?.enabled && (
          <Link
            href={`${slugUrl}#studio`}
            className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/92 backdrop-blur-sm text-[10px] font-semibold text-[#15095D] shadow-xs opacity-95 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 transition-opacity hover:bg-[#15095D] hover:text-white"
          >
            <Sparkles className="w-3 h-3" aria-hidden="true" />
            Tùy chỉnh mẫu
          </Link>
        )}
      </div>

      {/* Product Metadata Stack — Faithful to Astera Best Sellers Row */}
      <div className="pt-3 flex-1 flex flex-col justify-between gap-2.5">
        <div className="space-y-1.5">
          <p
            className={`text-[10px] font-semibold uppercase tracking-[0.14em] truncate ${
              isDark ? "text-[#9EA1D2]" : "text-[#625FBC]"
            }`}
          >
            {product.categoryName || "UNLO Studio"}
            {product.creatorName ? ` · ${product.creatorName}` : ""}
          </p>

          <Link
            href={slugUrl}
            className={`block font-serif text-[14px] sm:text-[15px] font-semibold leading-snug line-clamp-2 hover:text-[#32259B] transition-colors ${
              isDark ? "text-white" : "text-[#15095D]"
            }`}
          >
            {product.name}
          </Link>

          <div className="flex items-baseline gap-2">
            <span
              className={`text-[13px] sm:text-[14px] font-bold tabular-nums ${
                isDark ? "text-[#FCFDF1]" : "text-[#15095D]"
              }`}
            >
              {formatVnd(displayPrice)}
            </span>
            {comparePrice > displayPrice && (
              <span
                className={`text-[11px] line-through tabular-nums ${
                  isDark ? "text-white/45" : "text-[#8D8DC7]"
                }`}
              >
                {formatVnd(comparePrice)}
              </span>
            )}
          </div>

          {/* Color / Paper Finish Swatch Dots + Star Rating */}
          <div className="flex items-center justify-between gap-2 pt-0.5">
            {showSwatches && colors.length > 0 ? (
              <div className="flex items-center gap-1.5" role="group" aria-label="Chọn màu giấy hoặc hoàn thiện">
                {colors.slice(0, 4).map((c, idx) => (
                  <button
                    key={c.name}
                    type="button"
                    title={c.name}
                    aria-label={`Màu ${c.name}`}
                    data-active={selectedColorIdx === idx ? "true" : "false"}
                    onClick={() => setSelectedColorIdx(idx)}
                    className="null-swatch w-3.5 h-3.5 border border-[#15095D]/20 cursor-pointer"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            ) : (
              <span />
            )}

            <div
              className="flex items-center gap-0.5"
              aria-label={`Đánh giá ${ratingValue} trên 5 sao`}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-2.5 h-2.5 ${
                    star <= ratingValue
                      ? "fill-[#443EB1] text-[#443EB1]"
                      : "text-[#DCE0E7]"
                  }`}
                  aria-hidden="true"
                />
              ))}
              <span className="text-[10px] text-[#4E567A] ml-1 tabular-nums">
                ({reviewCount})
              </span>
            </div>
          </div>
        </div>

        {/* Clean Outlined Pill CTA (Exact Astera "ADD TO CART" Treatment) */}
        {showAddToCart && (
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full h-9 rounded-full unlo-pill-outline text-[11px] font-bold uppercase tracking-[0.12em] cursor-pointer mt-1 hover:bg-[#15095D] hover:text-white transition-colors"
          >
            Chọn cỡ &amp; thêm vào giỏ
          </button>
        )}
      </div>

      {/* Quick Add Modal */}
      <QuickAddModal
        product={product}
        isOpen={quickAddOpen}
        onClose={() => setQuickAddOpen(false)}
      />
    </article>
  );
}
