"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Check } from "lucide-react";
import { toast } from "sonner";

import { matchQuoteLine } from "@/app/util/cartQuote.mjs";
import { cartLineKey } from "@/app/util/cartLine.mjs";
import { useCart } from "@/app/context/CartContext";
import CartItem from "./cart_item";

const FREE_SHIPPING_THRESHOLD = 499000;

export default function CartDrawer({ open: openProp, setOpen: setOpenProp }) {
  const router = useRouter();
  const {
    cartItems,
    cartCount,
    cartTotal,
    cartQuote,
    isCartOpen,
    setIsCartOpen,
    isMounted,
  } = useCart();

  const open = typeof openProp === "boolean" ? openProp : Boolean(isCartOpen);
  const setOpen = setOpenProp || setIsCartOpen || (() => {});

  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow || "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen]);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (code === "UNLO25") {
      setAppliedPromo({ code, percent: 25 });
      toast.success("Đã áp dụng mã ưu đãi lễ hội 25% (UNLO25)");
    } else if (code === "UNLO10" || code === "NULL10" || code === "WELCOME10") {
      setAppliedPromo({ code, percent: 10 });
      toast.success(`Đã áp dụng mã ưu đãi dự kiến 10% (${code})`);
    } else if (code === "NULL5" || code === "WELCOME5") {
      setAppliedPromo({ code, percent: 5 });
      toast.success(`Đã áp dụng mã ưu đãi dự kiến 5% (${code})`);
    } else {
      setAppliedPromo({ code, percent: 0 });
      toast.info(`Mã "${code}" sẽ được kiểm tra tự động ở bước thanh toán.`);
    }
  };

  const discountAmount = appliedPromo?.percent
    ? Math.round((cartTotal * appliedPromo.percent) / 100)
    : 0;
  const finalTotal = Math.max(0, cartTotal - discountAmount);
  const freeShipping = finalTotal >= FREE_SHIPPING_THRESHOLD;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-70 bg-[#15095D]/45 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Giỏ hàng UNLO"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 bottom-0 z-80 h-[100dvh] w-full sm:w-[440px] bg-white text-[#15095D] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#EFF2F9] flex items-center justify-between shrink-0 pt-[max(1.25rem,env(safe-area-inset-top,0px))]">
              <h2 className="font-serif text-lg font-semibold tracking-tight text-[#15095D]">
                Giỏ Hàng {isMounted ? `(${cartCount || cartItems.length})` : ""}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-9 h-9 -mr-2 rounded-full grid place-items-center text-[#4E567A] hover:text-[#15095D] hover:bg-[#EFF2F9] transition-colors null-pressable"
                aria-label="Đóng giỏ hàng"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Free shipping progress hint */}
            {isMounted && cartItems.length > 0 && (
              <div className="px-6 py-2.5 bg-[#EFF2F9] text-xs text-[#15095D] font-medium">
                {freeShipping ? (
                  <span className="text-[#1D7A5F] font-semibold">
                    Đơn hàng của bạn đã được miễn phí giao hàng toàn quốc!
                  </span>
                ) : (
                  <span>
                    Mua thêm{" "}
                    <strong className="text-[#32259B] tabular-nums">
                      {(FREE_SHIPPING_THRESHOLD - finalTotal).toLocaleString("vi-VN")} ₫
                    </strong>{" "}
                    để được miễn phí vận chuyển
                  </span>
                )}
              </div>
            )}

            {/* Line Items */}
            <div className="flex-1 overflow-y-auto px-6">
              {isMounted && cartItems.length > 0 ? (
                <div>
                  {cartItems.map((p) => (
                    <CartItem
                      key={cartLineKey(p)}
                      product={p}
                      lineTotal={matchQuoteLine(p, cartQuote)?.totalPrice}
                    />
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                  <div className="w-16 h-16 rounded-full bg-[#EFF2F9] grid place-items-center mb-5">
                    <ShoppingBag className="w-7 h-7 text-[#625FBC]" aria-hidden="true" />
                  </div>
                  <p className="font-serif text-2xl font-semibold text-[#15095D] mb-2">
                    Giỏ hàng đang trống
                  </p>
                  <p className="text-sm text-[#4E567A] max-w-[260px] leading-relaxed">
                    Khám phá bộ sưu tập thiệp Giáng Sinh, thiệp cưới và quà tặng cá nhân hóa tại UNLO.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      router.push("/products");
                    }}
                    className="mt-6 min-h-11 px-7 rounded-full unlo-pill-primary text-xs font-bold uppercase tracking-[0.1em] cursor-pointer"
                  >
                    Khám phá thiết kế
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Checkout Summary */}
            {isMounted && cartItems.length > 0 && (
              <div className="px-6 py-5 border-t border-[#EFF2F9] bg-white shrink-0 space-y-4 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]">
                <form onSubmit={handleApplyPromo} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Mã ưu đãi (VD: UNLO25)"
                    aria-label="Nhập mã ưu đãi"
                    className="flex-1 h-10 px-4 rounded-full border border-[#BBC2DD] bg-white text-xs sm:text-sm text-[#15095D] placeholder:text-[#8D8DC7] outline-none focus:border-[#32259B] transition-colors"
                  />
                  <button
                    type="submit"
                    className="h-10 px-5 rounded-full unlo-pill-midnight text-xs font-semibold shrink-0 cursor-pointer"
                  >
                    Áp dụng
                  </button>
                </form>

                {appliedPromo?.percent > 0 && (
                  <p className="flex items-center gap-1.5 text-xs font-medium text-[#1D7A5F]">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    Đã áp dụng ưu đãi {appliedPromo.percent}% ({appliedPromo.code})
                  </p>
                )}

                <div className="space-y-2 text-[13px] pt-1">
                  <div className="flex justify-between text-[#4E567A]">
                    <span>Tạm tính</span>
                    <span className="tabular-nums font-semibold text-[#15095D]">
                      {cartTotal.toLocaleString("vi-VN")} ₫
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#1D7A5F]">
                      <span>Ưu đãi ({appliedPromo.code})</span>
                      <span className="tabular-nums font-semibold">
                        -{discountAmount.toLocaleString("vi-VN")} ₫
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#4E567A]">
                    <span>Vận chuyển</span>
                    <span className="font-semibold text-[#15095D]">
                      {freeShipping ? "Miễn phí" : "Tính khi thanh toán"}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-2.5 border-t border-[#EFF2F9] text-[15px] font-bold text-[#15095D]">
                    <span>Tổng cộng</span>
                    <span className="text-[17px] tabular-nums text-[#32259B]">
                      {finalTotal.toLocaleString("vi-VN")} ₫
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      router.push("/checkout");
                    }}
                    className="w-full h-12 rounded-full unlo-pill-primary text-xs sm:text-sm font-bold uppercase tracking-[0.08em] cursor-pointer"
                  >
                    Tiến Hành Thanh Toán
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      router.push("/cart");
                    }}
                    className="w-full py-1.5 text-xs font-semibold text-[#4E567A] hover:text-[#15095D] transition-colors cursor-pointer"
                  >
                    Xem trang giỏ hàng chi tiết
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
