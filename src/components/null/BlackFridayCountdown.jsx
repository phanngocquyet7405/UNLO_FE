"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/useLanguage";

const BF_TARGET = new Date("2026-11-27T00:00:00+07:00").getTime();

/**
 * BlackFridayCountdown:
 * Thiết kế chính xác theo mẫu tham chiếu khách gửi (media_1795190475411_e189951c.png & Ersa Nails ref):
 * - Thanh ngang tinh giản, nền sáng sang trọng, không chiếm diện tích màn hình.
 * - Trái: "ƯU ĐÃI ĐẾN 50%", Tiêu đề đỏ serif "Black Friday Flashsale", Nút đen "XEM ƯU ĐÃI" / "SHOP SALE".
 * - Phải: Số đếm ngược lớn (NGÀY / GIỜ / PHÚT / GIÂY).
 * - Tối ưu cho mobile: Gọn gàng, không che khuất danh mục sản phẩm phía dưới.
 */
export default function BlackFridayCountdown() {
  const { lang, t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 1,
    minutes: 12,
    seconds: 45,
  });

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime();
      const difference = BF_TARGET - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      aria-label="Khuyến mại Black Friday Flashsale"
      className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-3 sm:py-5"
    >
      {/* Banner thiết kế chuẩn xác theo mẫu tham chiếu khách gửi (Image 1): Tinh giản, nền sáng sang trọng, không chiếm diện tích trên mobile */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#FAFAFA] border border-[#F3E8D0] sm:border-gray-200/80 py-5 sm:py-6 px-5 sm:px-10 lg:px-14 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-8">
          {/* CỘT TRÁI (THEO ẢNH MẪU 1): Kicker + Tiêu đề đỏ Serif + Nút đen pill */}
          <div className="space-y-1.5 sm:space-y-2">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500 block">
              {t("ƯU ĐÃI ĐẾN 50%", "ENJOY UP TO 50% OFF")}
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#C92A2A] leading-tight">
              {t("Black Friday Flashsale", "Birthday Flashsale")}
            </h3>

            <div className="pt-1.5">
              <Link
                href="/products?sale=blackfriday"
                className="inline-flex items-center justify-center h-8 sm:h-9 px-5 sm:px-6 rounded-full bg-black hover:bg-neutral-800 text-white text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase transition-all hover:scale-105 active:scale-95 shadow-xs"
              >
                <span>{t("XEM ƯU ĐÃI", "SHOP SALE")}</span>
              </Link>
            </div>
          </div>

          {/* CỘT PHẢI (THEO ẢNH MẪU 1): 4 Cụm Số Đếm Ngược Tinh Tế (01 DAYS 12 HOURS 12 MINUTES 41 SECONDS) */}
          <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-7 lg:gap-10 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-200/60">
            {[
              { label: t("NGÀY", "DAYS"), val: timeLeft.days },
              { label: t("GIỜ", "HOURS"), val: timeLeft.hours },
              { label: t("PHÚT", "MINUTES"), val: timeLeft.minutes },
              { label: t("GIÂY", "SECONDS"), val: timeLeft.seconds },
            ].map((d, i) => (
              <div key={i} className="text-center min-w-[50px] sm:min-w-[60px]">
                <div className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-neutral-900 tabular-nums tracking-tight leading-none">
                  {String(d.val).padStart(2, "0")}
                </div>
                <div className="text-[9px] sm:text-[10px] font-semibold tracking-[0.16em] uppercase text-gray-400 mt-1 sm:mt-1.5">
                  {d.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
