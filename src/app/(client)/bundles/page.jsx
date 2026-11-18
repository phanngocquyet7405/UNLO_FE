"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ShoppingBag, Layers, Plus, Trash2, Check, Sparkles, Factory } from "lucide-react";
import { toast } from "sonner";
import NullHeader from "@/components/null/NullHeader";
import NullFooter from "@/components/null/NullFooter";
import { useCart } from "@/app/context/CartContext";
import { formatVnd } from "@/app/services/api/nullCommerceService";
import { UNLO_PRODUCTS } from "@/lib/unloCatalog";
import { UNLO_FACTORIES } from "@/lib/unloFactories";

const TIERS = [
  { min: 3, discount: 10, label: "3 món · Giảm 10%" },
  { min: 4, discount: 15, label: "4 món · Giảm 15%" },
  { min: 5, discount: 20, label: "5 món · Giảm 20% + Freeship" },
];

function computeTierDiscount(count) {
  if (count >= 5) return 20;
  if (count >= 4) return 15;
  if (count >= 3) return 10;
  return 0;
}

export default function BundlesPage() {
  const { addToCart, setIsCartOpen } = useCart() || {};
  const [selectedFactory, setSelectedFactory] = useState("all");
  const [bundleItems, setBundleItems] = useState(() => [
    {
      uid: "init-1",
      product: UNLO_PRODUCTS[0],
      variant: UNLO_PRODUCTS[0].variants[1] || UNLO_PRODUCTS[0].variants[0],
    },
    {
      uid: "init-2",
      product: UNLO_PRODUCTS[2],
      variant: UNLO_PRODUCTS[2].variants[0],
    },
  ]);

  const filteredCatalog = useMemo(() => {
    if (selectedFactory === "all") return UNLO_PRODUCTS;
    return UNLO_PRODUCTS.filter((p) => p.factorySlug === selectedFactory);
  }, [selectedFactory]);

  const count = bundleItems.length;
  const discountPct = computeTierDiscount(count);
  const rawTotal = bundleItems.reduce(
    (sum, entry) => sum + (entry.product.price + (entry.variant?.priceDelta || 0)),
    0,
  );
  const discountedTotal = Math.round(rawTotal * (1 - discountPct / 100));
  const savedAmount = rawTotal - discountedTotal;
  const nextTier = TIERS.find((t) => count < t.min) || null;

  const addProductToBundle = (product) => {
    if (bundleItems.length >= 5) {
      toast.info("Combo tối đa 5 món để nhận mức giảm cao nhất 20%!");
      return;
    }
    const defaultVariant = product.variants?.[0] || null;
    setBundleItems((prev) => [
      ...prev,
      { uid: `${product._id}-${Date.now()}-${Math.random()}`, product, variant: defaultVariant },
    ]);
  };

  const removeBundleEntry = (uid) => {
    setBundleItems((prev) => prev.filter((item) => item.uid !== uid));
  };

  const updateEntryVariant = (uid, variantId) => {
    setBundleItems((prev) =>
      prev.map((entry) => {
        if (entry.uid !== uid) return entry;
        const match = entry.product.variants?.find((v) => v._id === variantId) || entry.variant;
        return { ...entry, variant: match };
      }),
    );
  };

  const handleCheckoutBundle = () => {
    if (count < 3) {
      toast.error("Chọn tối thiểu 3 sản phẩm để kích hoạt chiết khấu Combo tiết kiệm.");
      return;
    }
    bundleItems.forEach((entry) => {
      const unitRaw = entry.product.price + (entry.variant?.priceDelta || 0);
      const unitFinal = Math.round(unitRaw * (1 - discountPct / 100));
      addToCart?.(
        {
          ...entry.product,
          _id: entry.product._id,
          id: entry.product._id,
          productId: entry.product._id,
          itemType: "product",
          price: unitFinal,
          image: entry.product.images?.[0]?.url || "/assets/placeholder.png",
          ...(entry.variant
            ? {
                variantId: entry.variant._id,
                variantSummary: {
                  size: entry.variant.size,
                  colorName: entry.variant.colorName,
                  colorHex: entry.variant.colorHex,
                },
              }
            : {}),
        },
        1,
      );
    });
    toast.success(
      `Đã thêm trọn bộ Combo ${count} món (Giảm ${discountPct}% · Tiết kiệm ${formatVnd(savedAmount)}) vào giỏ hàng!`,
    );
    setIsCartOpen?.(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15095D]">
      <NullHeader />

      <main className="flex-1 max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 space-y-10">
        {/* Hero Header */}
        <section className="rounded-3xl bg-gradient-to-r from-[#EFF2F9] via-[#F6F7FC] to-[#FCFDF1] border border-[#DCE0E7] p-7 sm:p-12 space-y-4">
          <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#625FBC]">
            BUILD-YOUR-OWN BUNDLE · AOV BOOSTER
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold max-w-3xl text-[#15095D] leading-tight">
            Tự Tạo Gói Combo 3–5 Món — Chiết Khấu Bậc Thang Tự Động
          </h1>
          <p className="text-sm sm:text-base text-[#4E567A] max-w-2xl leading-relaxed">
            Phối tự do Áo thun Supima, Sơ mi Linen, Ví da Bình Dương hay Cốc gốm Bát Tràng để tự động giảm đến 20% ngay trong giỏ hàng và gom kiện tối ưu phí vận chuyển.
          </p>

          {/* Tier Progress Pills */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            {TIERS.map((tier) => {
              const reached = count >= tier.min;
              return (
                <span
                  key={tier.min}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
                    reached
                      ? "bg-[#15095D] text-[#FCFDF1] border-[#15095D]"
                      : "bg-white text-[#4E567A] border-[#DCE0E7]"
                  }`}
                >
                  {reached ? <Check className="w-3.5 h-3.5 text-[#BBC2DD]" /> : <Sparkles className="w-3.5 h-3.5 text-[#8D8DC7]" />}
                  {tier.label}
                </span>
              );
            })}
          </div>
        </section>

        {/* Main 2-Column Interactive Bundle Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Product Picker with Shop-by-Factory Filter */}
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedFactory("all")}
                className={`h-9 px-4 rounded-full text-xs font-semibold cursor-pointer ${
                  selectedFactory === "all"
                    ? "bg-[#15095D] text-[#FCFDF1]"
                    : "bg-[#EFF2F9] text-[#4E567A] hover:text-[#15095D]"
                }`}
              >
                Tất cả xưởng
              </button>
              {UNLO_FACTORIES.map((f) => (
                <button
                  key={f.slug}
                  type="button"
                  onClick={() => setSelectedFactory(f.slug)}
                  className={`h-9 px-4 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer ${
                    selectedFactory === f.slug
                      ? "bg-[#15095D] text-[#FCFDF1]"
                      : "bg-[#EFF2F9] text-[#4E567A] hover:text-[#15095D]"
                  }`}
                >
                  <Factory className="w-3.5 h-3.5" />
                  {f.code}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredCatalog.map((product) => (
                <article
                  key={product._id}
                  className="rounded-2xl border border-[#DCE0E7] bg-white p-4 flex gap-4 items-center hover:border-[#9EA1D2] transition-colors"
                >
                  <img
                    src={product.images?.[0]?.url}
                    alt={product.name}
                    className="w-20 h-24 rounded-xl object-cover bg-[#EFF2F9] shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#625FBC] truncate">
                      {product.creatorName}
                    </p>
                    <Link
                      href={`/products/${product.slug}-${product._id}`}
                      className="font-serif text-sm font-semibold text-[#15095D] line-clamp-2 hover:text-[#32259B]"
                    >
                      {product.name}
                    </Link>
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <span className="text-sm font-bold text-[#15095D] tabular-nums">
                        {formatVnd(product.price)}
                      </span>
                      <button
                        type="button"
                        onClick={() => addProductToBundle(product)}
                        disabled={count >= 5}
                        className="h-8 px-3.5 rounded-full unlo-pill-outline text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer disabled:opacity-40"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Chọn vào bộ
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right: Sticky Live Combo Cart Summary */}
          <aside className="lg:col-span-4 rounded-3xl bg-[#EFF2F9] border border-[#DCE0E7] p-6 lg:sticky lg:top-24 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold text-[#15095D] inline-flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#32259B]" />
                Combo Của Bạn ({count}/5)
              </h2>
              {discountPct > 0 && (
                <span className="px-3 py-1 rounded-full bg-[#32259B] text-white text-xs font-bold">
                  Giảm {discountPct}%
                </span>
              )}
            </div>

            {/* Next Tier Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-2.5 rounded-full bg-white overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#15095D] to-[#443EB1] transition-[width] duration-300"
                  style={{ width: `${Math.min(100, (count / 5) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-[#4E567A]">
                {nextTier ? (
                  <>
                    Chọn thêm <strong className="text-[#32259B]">{nextTier.min - count} món</strong> để mở khóa mức <strong>{nextTier.label}</strong>
                  </>
                ) : (
                  <span className="font-bold text-[#1D7A5F]">
                    Đã đạt ưu đãi tối đa 20% + Miễn phí giao hàng toàn quốc!
                  </span>
                )}
              </p>
            </div>

            {/* Selected Bundle Items */}
            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {bundleItems.length === 0 ? (
                <p className="text-xs text-[#4E567A] text-center py-6 bg-white/70 rounded-2xl">
                  Chọn tối thiểu 3 sản phẩm bên trái để tạo gói Combo tiết kiệm.
                </p>
              ) : (
                bundleItems.map((entry, idx) => (
                  <div
                    key={entry.uid}
                    className="rounded-2xl bg-white border border-[#DCE0E7] p-3 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-[#15095D] line-clamp-1">
                        {idx + 1}. {entry.product.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeBundleEntry(entry.uid)}
                        aria-label="Xóa món khỏi combo"
                        className="text-[#8D8DC7] hover:text-[#A52735] cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {entry.product.variants?.length > 0 && (
                      <select
                        value={entry.variant?._id || ""}
                        onChange={(e) => updateEntryVariant(entry.uid, e.target.value)}
                        className="w-full h-8 px-2.5 rounded-lg bg-[#EFF2F9] text-[11px] font-semibold text-[#15095D]"
                      >
                        {entry.product.variants.map((v) => (
                          <option key={v._id} value={v._id}>
                            {v.colorName} · {v.size}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Pricing Breakdown */}
            <div className="pt-4 border-t border-[#DCE0E7] space-y-2 text-sm">
              <div className="flex justify-between text-[#4E567A]">
                <span>Giá gốc ({count} món)</span>
                <span className="tabular-nums line-through">{formatVnd(rawTotal)}</span>
              </div>
              <div className="flex justify-between text-[#1D7A5F] font-semibold">
                <span>Chiết khấu Combo ({discountPct}%)</span>
                <span className="tabular-nums">-{formatVnd(savedAmount)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-[#DCE0E7] font-bold text-[#15095D]">
                <span>Tổng thanh toán</span>
                <span className="text-xl text-[#32259B] tabular-nums">
                  {formatVnd(discountedTotal)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckoutBundle}
              className="w-full h-12 rounded-full unlo-pill-primary text-xs font-bold uppercase tracking-[0.1em] inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              Thêm Trọn Combo Vào Giỏ Hàng
            </button>
          </aside>
        </div>
      </main>

      <NullFooter />
    </div>
  );
}
