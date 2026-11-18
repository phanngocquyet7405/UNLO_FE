"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Bell, Check, Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { formatVnd } from "@/app/services/api/nullCommerceService";

const BF_TARGET = new Date("2026-11-27T00:00:00+07:00").getTime();

const BF_DEALS = [
  {
    id: "hoodie-deal",
    slug: "hoodie-ni-bong-360gsm-co-mu-oversize-690000000000000000000104",
    name: "Hoodie Nỉ Bông 360 GSM — Xưởng Tân Phú",
    originalPrice: 560000,
    salePrice: 280000,
    discount: "-50%",
    img: "/assets/img/p-hoodie.jpg",
    tag: "DEAL MÙA ĐÔNG",
  },
  {
    id: "sweat-deal",
    slug: "ao-ni-bong-co-tron-melange-french-terry-320gsm-690000000000000000000105",
    name: "Áo Nỉ Cổ Tròn French Terry 320 GSM",
    originalPrice: 420000,
    salePrice: 210000,
    discount: "-50%",
    img: "/assets/img/p-sweat.jpg",
    tag: "BEST VALUE",
  },
  {
    id: "tee-deal",
    slug: "ao-thun-cotton-supima-260gsm-det-kim-nguyen-khoi-690000000000000000000101",
    name: "Áo Thun Cotton Supima 250 GSM Dệt Kim",
    originalPrice: 290000,
    salePrice: 174000,
    discount: "-40%",
    img: "/assets/img/p-tee-250.jpg",
    tag: "SIÊU BÁN CHẠY",
  },
  {
    id: "tote-deal",
    slug: "tui-tote-canvas-16oz-day-keo-ykk-kho-chua-laptop-690000000000000000000107",
    name: "Túi Tote Canvas 16oz Khóa Kéo YKK",
    originalPrice: 260000,
    salePrice: 182000,
    discount: "-30%",
    img: "/assets/img/p-tote.jpg",
    tag: "PHỤ KIỆN BỀN BỈ",
  },
];

export default function BlackFridayCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [reminded, setReminded] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem("unlo_bf_reminder") === "true";
      } catch {
        return false;
      }
    }
    return false;
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

  const toggleReminder = () => {
    const nextState = !reminded;
    setReminded(nextState);
    try {
      localStorage.setItem("unlo_bf_reminder", String(nextState));
    } catch {}

    if (nextState) {
      toast.success("Đã bật nhắc nhở! UNLO sẽ gửi thông báo khi đợt sale mở bán.");
    } else {
      toast.info("Đã tắt nhắc nhở mở bán.");
    }
  };

  return (
    <section id="black-friday" className="py-12 sm:py-16 space-y-8 scroll-mt-24">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="rounded-3xl bg-[#15095D] text-white p-7 sm:p-10 lg:p-12 border border-[#625FBC]/30 shadow-xl overflow-hidden relative">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#32259B]/50 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Flash Banner Poster */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#1E2356] border border-white/10 shadow-lg">
              <img
                src="/assets/img/ed-flash.jpg"
                alt="Black Friday Flash Sale UNLO"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15095D] via-transparent to-transparent opacity-85" />

              <div className="absolute bottom-6 inset-x-6 space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase text-white">
                  MỘT TUẦN DUY NHẤT
                </span>
                <div className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
                  BLACK FRIDAY
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-extrabold text-[#F4C9D6]">
                    -50%
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#BBC2DD]">
                    ÁP DỤNG TẠI TẤT CẢ XƯỞNG
                  </span>
                </div>
              </div>
            </div>

            {/* Right Timer & Flash Deal Cards */}
            <div className="lg:col-span-7 space-y-6">
              {/* Header & Live Countdown */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#BBC2DD] tracking-widest uppercase">
                    <Clock className="w-4 h-4 text-[#BBC2DD]" />
                    <span>ĐẾM NGƯỢC ĐẾN NGÀY MỞ BÁN (27.11.2026)</span>
                  </div>

                  <button
                    type="button"
                    onClick={toggleReminder}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      reminded
                        ? "bg-[#1D7A5F] text-white"
                        : "bg-white/15 hover:bg-white text-white hover:text-[#15095D]"
                    }`}
                  >
                    {reminded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Đã bật nhắc nhở</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-3.5 h-3.5" />
                        <span>Nhắc tôi khi mở bán</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 4 Digit Boxes */}
                <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-lg">
                  {[
                    { label: "NGÀY", val: timeLeft.days },
                    { label: "GIỜ", val: timeLeft.hours },
                    { label: "PHÚT", val: timeLeft.minutes },
                    { label: "GIÂY", val: timeLeft.seconds },
                  ].map((d, i) => (
                    <div
                      key={i}
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 text-center border border-white/10"
                    >
                      <div className="font-serif font-black text-2xl sm:text-4xl text-white tabular-nums">
                        {String(d.val).padStart(2, "0")}
                      </div>
                      <div className="text-[9px] sm:text-[10px] font-bold tracking-widest text-[#BBC2DD] mt-1">
                        {d.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deal Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-2">
                {BF_DEALS.map((deal) => (
                  <Link
                    key={deal.id}
                    href={`/products/${deal.slug}`}
                    className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3 flex gap-3 transition-colors items-center"
                  >
                    <div className="w-16 h-20 rounded-xl overflow-hidden bg-white/10 shrink-0">
                      <img
                        src={deal.img}
                        alt={deal.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#8B1E2D] text-white">
                        {deal.discount}
                      </span>
                      <p className="text-xs font-semibold text-white truncate">
                        {deal.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#F4C9D6]">
                          {formatVnd(deal.salePrice)}
                        </span>
                        <span className="text-[10px] text-white/50 line-through">
                          {formatVnd(deal.originalPrice)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-[#BBC2DD] pt-1">
                <span>Số lượng sản xuất giới hạn theo từng xưởng liên kết</span>
                <Link
                  href="/products?sale=blackfriday"
                  className="inline-flex items-center gap-1 font-bold text-white hover:underline"
                >
                  <span>Xem toàn bộ 14 deals</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
