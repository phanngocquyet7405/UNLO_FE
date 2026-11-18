"use client";

import { useState, useMemo, useEffect } from "react";
import { X, ShoppingBag, Check, Ruler, Sparkles, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/app/context/CartContext";
import { formatVnd } from "@/app/services/api/nullCommerceService";

export default function QuickAddModal({ product, isOpen, onClose }) {
  const { addToCart, setIsCartOpen } = useCart() || {};

  const variants = useMemo(() => product?.variants || [], [product]);

  // Color options
  const colors = useMemo(() => {
    const map = new Map();
    for (const v of variants) {
      if (!map.has(v.colorName)) {
        map.set(v.colorName, {
          name: v.colorName,
          hex: v.colorHex || "#15095D",
        });
      }
    }
    return [...map.values()];
  }, [variants]);

  const [selectedColor, setSelectedColor] = useState(colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showSizeTable, setShowSizeTable] = useState(false);

  // Sync initial color
  useEffect(() => {
    if (colors.length && !selectedColor) {
      setSelectedColor(colors[0]?.name);
    }
  }, [colors, selectedColor]);

  // Sizes available for selected color
  const availableSizes = useMemo(() => {
    return variants
      .filter((v) => !selectedColor || v.colorName === selectedColor)
      .map((v) => ({
        id: v._id,
        size: v.size,
        stock: v.stock ?? 10,
        priceDelta: v.priceDelta || 0,
      }));
  }, [variants, selectedColor]);

  // Auto select first in-stock size
  useEffect(() => {
    if (availableSizes.length) {
      const inStock = availableSizes.find((s) => s.stock > 0) || availableSizes[0];
      setSelectedSize(inStock?.size || "");
    }
  }, [availableSizes]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const currentVariant = variants.find(
    (v) =>
      (!selectedColor || v.colorName === selectedColor) &&
      (!selectedSize || v.size === selectedSize)
  );

  const price = product.price || 245000;
  const image =
    (typeof product.images?.[0] === "string"
      ? product.images[0]
      : product.images?.[0]?.url) || "/assets/img/p-tee-250.jpg";

  const handleAddToCart = () => {
    if (!currentVariant && variants.length > 0) {
      toast.error("Vui lòng chọn kích thước phù hợp");
      return;
    }

    addToCart?.({
      ...product,
      selectedVariant: currentVariant,
      variantId: currentVariant?._id,
      quantity,
    });

    toast.success(`Đã thêm ${product.name} (Size ${selectedSize}) vào giỏ hàng`);
    onClose();
    setIsCartOpen?.(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-add-title"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#DCE0E7] overflow-hidden select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng cửa sổ mua nhanh"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 text-[#15095D] hover:bg-[#EFF2F9] grid place-items-center shadow-xs transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-12 max-h-[88vh] overflow-y-auto">
          {/* Left Preview Image */}
          <div className="sm:col-span-5 bg-[#EFF2F9] relative aspect-[4/5] sm:aspect-auto">
            <img
              src={image}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
            {product.badge?.label && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#15095D] text-white text-[10px] font-bold tracking-wider uppercase">
                {product.badge.label}
              </span>
            )}
          </div>

          {/* Right Product & Variant Choices */}
          <div className="sm:col-span-7 p-6 sm:p-7 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-bold text-[#625FBC] uppercase tracking-wider">
                  {product.categoryName || "Đồ cơ bản chuẩn xưởng"}
                </p>
                <h3
                  id="quick-add-title"
                  className="font-serif text-lg sm:text-xl font-bold text-[#15095D] leading-snug mt-0.5"
                >
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-serif text-2xl font-bold text-[#15095D]">
                    {formatVnd(price)}
                  </span>
                  {product.costBreakdown?.traditionalRetailPrice && (
                    <span className="text-xs text-[#8D8DC7] line-through">
                      {formatVnd(product.costBreakdown.traditionalRetailPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Color Swatches */}
              {colors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#15095D]">
                    <span>Màu sắc:</span>
                    <span className="font-normal text-[#4E567A]">
                      {selectedColor}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {colors.map((c) => {
                      const active = selectedColor === c.name;
                      return (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                            active
                              ? "border-[#15095D] ring-2 ring-[#BBC2DD] scale-110"
                              : "border-transparent hover:scale-105"
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size Buttons */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#15095D]">
                  <span>Chọn kích thước:</span>
                  <button
                    type="button"
                    onClick={() => setShowSizeTable(!showSizeTable)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#32259B] hover:underline cursor-pointer"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>{showSizeTable ? "Ẩn bảng số đo" : "Bảng số đo"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {availableSizes.map((s) => {
                    const active = selectedSize === s.size;
                    const outOfStock = s.stock <= 0;
                    return (
                      <button
                        key={s.id || s.size}
                        type="button"
                        disabled={outOfStock}
                        onClick={() => setSelectedSize(s.size)}
                        className={`h-11 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          active
                            ? "bg-[#15095D] text-white border-[#15095D] shadow-xs"
                            : outOfStock
                            ? "bg-[#EFF2F9] text-[#8D8DC7] border-transparent opacity-50 cursor-not-allowed line-through"
                            : "bg-[#F6F7FC] text-[#15095D] border-[#DCE0E7] hover:border-[#32259B]"
                        }`}
                      >
                        {s.size}
                      </button>
                    );
                  })}
                </div>

                {/* Collapsible Mini Size Table */}
                {showSizeTable && (
                  <div className="p-3 rounded-xl bg-[#EFF2F9] border border-[#BBC2DD] text-[11px] text-[#4E567A] space-y-1 animate-fade-in">
                    <p className="font-bold text-[#15095D]">Khuyến nghị chọn size theo cân nặng:</p>
                    <div className="grid grid-cols-4 gap-1 text-center font-mono text-[10px] pt-1">
                      <div><strong>S:</strong> 50–59kg</div>
                      <div><strong>M:</strong> 60–68kg</div>
                      <div><strong>L:</strong> 69–77kg</div>
                      <div><strong>XL:</strong> 78–88kg</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#DCE0E7] space-y-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full h-12 rounded-full bg-[#15095D] hover:bg-[#32259B] text-white text-xs sm:text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Thêm vào giỏ hàng · {formatVnd(price * quantity)}</span>
              </button>

              <p className="text-[10px] text-center text-[#8D8DC7]">
                Miễn phí vận chuyển cho đơn hàng từ 499.000đ · Đổi trả 30 ngày
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
