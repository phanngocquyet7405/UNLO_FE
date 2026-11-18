"use client";

import React from "react";
import { cartLineKey } from "@/app/util/cartLine.mjs";
import { Plus, Minus, X, Sparkles, Gift } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

export default function CartItem({ product, lineTotal }) {
  const { updateQuantity, removeFromCart } = useCart();

  const imageUrl =
    product.images?.[0]?.url || product.image || "/assets/placeholder.png";
  const productId = cartLineKey(product);
  const unitTotal = lineTotal ?? product.price * (product.quantity || 1);

  const variantSize = product.variantSummary?.size;
  const variantColor = product.variantSummary?.colorName;
  const variantHex = product.variantSummary?.colorHex;
  const monogram = product.customization?.enabled
    ? product.customization?.innerLabelText?.trim() ||
      product.customization?.monogramText?.trim()
    : "";
  const giftBox =
    product.customization?.enabled &&
    product.customization?.giftBoxType &&
    product.customization.giftBoxType !== "none"
      ? product.customization.giftBoxType
      : null;

  return (
    <div className="flex gap-4 py-5 border-b border-[#EFF2F9] last:border-b-0">
      <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-[#EFF2F9] border border-[#DCE0E7] shrink-0">
        <img
          src={imageUrl}
          alt={product.name || "Sản phẩm UNLO"}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#625FBC]">
              {product.categoryName || "UNLO STUDIO"}
            </p>
            <p className="font-serif text-[14px] font-semibold text-[#15095D] leading-snug line-clamp-2 mt-0.5">
              {product.name}
            </p>
          </div>
          <button
            type="button"
            aria-label={`Xóa ${product.name} khỏi giỏ`}
            onClick={() => removeFromCart(productId)}
            className="w-7 h-7 -mr-1 -mt-1 rounded-full grid place-items-center text-[#8D8DC7] hover:text-[#15095D] hover:bg-[#EFF2F9] transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-[#4E567A]">
          {variantSize && <span>{variantSize}</span>}
          {variantHex && (
            <span
              title={variantColor || "Màu sắc"}
              className="w-3.5 h-3.5 rounded-full border border-[#15095D]/20 inline-block"
              style={{ backgroundColor: variantHex }}
            />
          )}
          {monogram && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EFF2F9] text-[11px] font-semibold text-[#32259B]">
              <Sparkles className="w-3 h-3" aria-hidden="true" />
              {product.customization?.customType === "logo" ? "Thêu Logo" : `Thêu: ${monogram}`}
            </span>
          )}
          {giftBox && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FCFDF1] border border-[#DCE0E7] text-[11px] font-semibold text-[#15095D]">
              <Gift className="w-3 h-3 text-[#443EB1]" aria-hidden="true" />
              Hộp quà
            </span>
          )}
        </div>

        {product.quantity && (
          <div className="flex items-center justify-between gap-3 mt-3">
            <div className="inline-flex items-center rounded-full border border-[#BBC2DD] bg-white h-8 px-1">
              <button
                type="button"
                aria-label={`Giảm số lượng ${product.name}`}
                onClick={() => updateQuantity(productId, -1)}
                className="w-7 h-7 rounded-full grid place-items-center text-[#4E567A] hover:text-[#15095D] hover:bg-[#EFF2F9] transition-colors cursor-pointer"
              >
                <Minus className="w-3 h-3" aria-hidden="true" />
              </button>
              <span className="min-w-7 text-center text-xs font-bold text-[#15095D] tabular-nums">
                {product.quantity}
              </span>
              <button
                type="button"
                aria-label={`Tăng số lượng ${product.name}`}
                onClick={() => updateQuantity(productId, 1)}
                className="w-7 h-7 rounded-full grid place-items-center text-[#4E567A] hover:text-[#15095D] hover:bg-[#EFF2F9] transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3" aria-hidden="true" />
              </button>
            </div>

            <p className="text-[14px] font-bold text-[#15095D] tabular-nums text-right">
              {Number(unitTotal || 0).toLocaleString("vi-VN")} ₫
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
