"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { UnloLogo, UnloAppIcon } from "./UnloLogo";

const FOOTER_COLUMNS = [
  {
    title: "NGÀNH HÀNG XƯỞNG",
    links: [
      { label: "Áo Thun Supima 260 GSM", href: "/products?category=cotton-basics" },
      { label: "Đồ Da Full-Grain Bình Dương", href: "/products?category=leather-goods" },
      { label: "Sơ Mi & Quần European Linen", href: "/products?category=linen-tailoring" },
      { label: "Gốm Sứ Men Lì Bát Tràng", href: "/products?category=ceramics-home" },
    ],
  },
  {
    title: "HỆ SINH THÁI M2C",
    links: [
      { label: "Hồ sơ Nhà máy (Factory Passport)", href: "/factories" },
      { label: "Tự tạo Combo giảm 20%", href: "/bundles" },
      { label: "Gom đơn lô nhỏ MOQ (C2M)", href: "/group-buy" },
      { label: "Đặt hàng doanh nghiệp B2B", href: "/b2b" },
    ],
  },
  {
    title: "CAM KẾT KHÔNG RỦI RO",
    links: [
      { label: "Cổng tự đổi trả 30 ngày", href: "/returns" },
      { label: "Kiểm hàng trước khi thanh toán", href: "/pages/information" },
      { label: "Bảo hành lỗi sản xuất trọn đời", href: "/pages/faq" },
      { label: "Tiêu chuẩn kiểm định QC 12 bước", href: "/factories" },
    ],
  },
  {
    title: "VỀ UNLO M2C",
    links: [
      { label: "Mô hình Brandless M2C", href: "/pages/about" },
      { label: "Đăng ký đối tác nhà máy", href: "/b2b" },
      { label: "Câu hỏi thường gặp", href: "/pages/faq" },
      { label: "Liên hệ hỗ trợ", href: "/pages/contact-us" },
    ],
  },
];

const PAYMENT_PILLS = ["VIETQR", "SEPAY", "MOMO", "ZALOPAY", "COD"];
const SOCIAL_CIRCLES = [
  { label: "IG", href: "#instagram", title: "Instagram @unlo.m2c" },
  { label: "FB", href: "#facebook", title: "Facebook UNLO M2C" },
  { label: "YT", href: "#youtube", title: "YouTube Xưởng UNLO" },
  { label: "TT", href: "#tiktok", title: "TikTok UNLO" },
];

export default function NullFooter() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Đã đăng ký nhận lịch mở lô MOQ giá xưởng từ UNLO!");
    setEmail("");
  };

  return (
    <div className="mt-16 sm:mt-24">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#15095D] via-[#1F0C85] to-[#0B2056] text-white py-16 sm:py-22 px-4 sm:px-6 lg:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#625FBC]/30 blur-3xl"
        />
        <div className="relative max-w-xl mx-auto text-center space-y-4">
          <p className="unlo-display-en text-[12px] sm:text-[13px] tracking-[0.14em] text-[#BBC2DD]">
            UNLO FACTORY ACCESS
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[#FCFDF1]">
            Nhận Lịch Mở Lô Giá Xưởng Sớm Nhất
          </h2>
          <p className="text-sm sm:text-[15px] text-[#DCE0E7]/85 leading-relaxed max-w-md mx-auto">
            Cập nhật các đợt gom đơn MOQ trực tiếp từ xưởng Hưng Yên, Bình Dương, Bắc Ninh &amp; Bát Tràng kèm báo cáo QC minh bạch.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 max-w-md mx-auto pt-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập địa chỉ email của bạn"
              aria-label="Email đăng ký bản tin UNLO"
              className="flex-1 min-w-0 h-12 px-5 rounded-full bg-white/10 border border-[#9EA1D2]/35 text-sm text-white placeholder:text-[#BBC2DD]/75 outline-none focus:border-[#FCFDF1] transition-colors"
            />
            <button
              type="submit"
              className="h-12 px-7 rounded-full unlo-pill-lilac text-xs sm:text-sm font-bold tracking-wide shrink-0 cursor-pointer"
            >
              Đăng ký ngay
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-white text-[#15095D] border-t border-[#DCE0E7]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-6 lg:px-10 py-14 sm:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-10 pb-12">
            <div className="col-span-2 space-y-4">
              <Link href="/" aria-label="UNLO — Trang chủ">
                <UnloLogo className="h-9 w-auto" />
              </Link>
              <p className="font-serif italic text-[14px] text-[#4E567A] leading-relaxed max-w-xs">
                Nền tảng Brandless M2C kết nối trực tiếp nhà máy Tier-1 OEM Việt Nam đến người tiêu dùng — minh bạch giá thành, không trả tiền cho logo.
              </p>

              <div className="inline-flex items-center gap-3 p-2.5 pr-4 rounded-2xl bg-[#EFF2F9] border border-[#DCE0E7]">
                <UnloAppIcon className="w-10 h-10 shrink-0 shadow-xs" />
                <div>
                  <p className="text-xs font-bold text-[#15095D]">UNLO Direct-to-Factory</p>
                  <p className="text-[11px] text-[#4E567A]">
                    Theo dõi tiến độ xưởng &amp; đổi trả 30 ngày
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                {SOCIAL_CIRCLES.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.title}
                    onClick={(e) => {
                      e.preventDefault();
                      toast.info(`Theo dõi UNLO tại ${s.title}`);
                    }}
                    className="w-9 h-9 rounded-full border border-[#DCE0E7] text-[10px] font-bold tracking-wider text-[#4E567A] hover:border-[#32259B] hover:bg-[#32259B] hover:text-white grid place-items-center transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="space-y-4">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#15095D]">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-[13px] text-[#4E567A] hover:text-[#32259B] transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-[#EFF2F9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#4E567A]">
              © {year} UNLO Brandless M2C. Sản xuất trực tiếp tại Việt Nam.
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
              {PAYMENT_PILLS.map((p) => (
                <span
                  key={p}
                  className="px-2.5 py-1 rounded-full bg-[#EFF2F9] border border-[#DCE0E7] text-[10px] font-semibold tracking-wider text-[#15095D]"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
