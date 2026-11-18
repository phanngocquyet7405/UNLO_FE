"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react";
import { cartLineKey } from "@/app/util/cartLine.mjs";
import NullHeader from "@/components/null/NullHeader";
import NullFooter from "@/components/null/NullFooter";
import CartItem from "@/app/(client)/components/Cart_component/cart_item";
import { useCart } from "@/app/context/CartContext";

function EmptyCartState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-[#EFF2F9]/60 rounded-3xl border border-[#DCE0E7]">
      <div className="w-20 h-20 bg-white border border-[#DCE0E7] rounded-full flex items-center justify-center mb-5">
        <ShoppingBag className="h-8 w-8 text-[#625FBC]" />
      </div>
      <h2 className="font-serif text-2xl font-semibold text-[#15095D] mb-2">
        Giỏ hàng của bạn đang trống
      </h2>
      <p className="text-sm text-[#4E567A] leading-relaxed max-w-sm mb-6">
        Hãy khám phá bộ sưu tập thiệp Giáng Sinh, bộ thiệp cưới và quà tặng cá nhân hóa của UNLO Studio nhé!
      </p>
      <Link
        href="/products"
        className="inline-flex items-center gap-2 unlo-pill-primary px-7 py-3.5 text-xs font-bold uppercase tracking-[0.1em]"
      >
        Khám phá thiết kế
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

function CartSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 border border-[#DCE0E7] animate-pulse flex gap-4 items-center"
          >
            <div className="w-20 h-24 bg-[#EFF2F9] rounded-xl shrink-0" />
            <div className="flex-1 space-y-2.5">
              <div className="h-4 bg-[#EFF2F9] rounded w-2/3" />
              <div className="h-3 bg-[#EFF2F9] rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#EFF2F9] rounded-3xl p-6 space-y-4 animate-pulse h-64" />
    </div>
  );
}

export default function CartPage() {
  const router = useRouter();
  const { cartItems, cartTotal, isMounted } = useCart();
  const hasItems = isMounted && cartItems.length > 0;
  const freeShipping = cartTotal >= 499000;

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15095D]">
      <NullHeader />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8 md:py-12">
        <div className="flex items-center gap-4 mb-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full border border-[#BBC2DD] flex items-center justify-center text-[#15095D] hover:bg-[#EFF2F9] transition-colors shrink-0 cursor-pointer"
            aria-label="Quay lại trang trước"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <p className="unlo-display-en text-[10px] tracking-[0.14em] text-[#625FBC]">
              YOUR BAG
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#15095D] tracking-tight">
              Giỏ Hàng Của Bạn
            </h1>
            {isMounted && (
              <p className="text-xs text-[#4E567A] mt-0.5">
                {cartItems.length > 0
                  ? `${cartItems.length} thiết kế trong giỏ hàng`
                  : "Chưa có thiết kế nào"}
              </p>
            )}
          </div>
        </div>

        {!isMounted ? (
          <CartSkeleton />
        ) : !hasItems ? (
          <EmptyCartState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
            <div className="bg-white rounded-3xl border border-[#DCE0E7] px-6 py-2">
              {cartItems.map((p) => (
                <CartItem key={cartLineKey(p)} product={p} />
              ))}
            </div>

            <div className="bg-[#EFF2F9] rounded-3xl border border-[#DCE0E7] p-6 sm:p-7 lg:sticky lg:top-24 space-y-5">
              <h2 className="font-serif text-xl font-semibold text-[#15095D]">
                Tóm Tắt Đơn Hàng
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[#4E567A]">
                  <span>Tạm tính</span>
                  <span className="font-bold text-[#15095D] tabular-nums">
                    {cartTotal.toLocaleString("vi-VN")} ₫
                  </span>
                </div>
                <div className="flex justify-between text-[#4E567A]">
                  <span>Vận chuyển</span>
                  <span className="font-semibold text-[#15095D]">
                    {freeShipping ? "Miễn phí" : "Tính ở bước sau"}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#DCE0E7] flex justify-between items-baseline">
                  <span className="font-bold text-[#15095D]">Tổng cộng dự kiến</span>
                  <span className="text-xl font-bold text-[#32259B] tabular-nums">
                    {cartTotal.toLocaleString("vi-VN")} ₫
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => router.push("/checkout")}
                  className="w-full h-12 rounded-full unlo-pill-primary text-xs font-bold uppercase tracking-[0.1em] inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Tiến Hành Thanh Toán</span>
                  <ArrowRight size={16} />
                </button>
                <Link
                  href="/products"
                  className="w-full h-11 rounded-full unlo-pill-outline text-xs font-bold uppercase tracking-[0.1em] inline-flex items-center justify-center"
                >
                  Tiếp Tục Chọn Mẫu
                </Link>
              </div>

              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#FCFDF1] border border-[#DCE0E7] text-xs text-[#4E567A]">
                <ShieldCheck className="w-4 h-4 text-[#32259B] shrink-0 mt-0.5" />
                <span>
                  Cam kết 100% hài lòng từ UNLO — hỗ trợ kiểm duyệt bản in trước khi xuất xưởng.
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      <NullFooter />
    </div>
  );
}
