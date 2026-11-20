"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowRight, Phone, MapPin, Mail } from "lucide-react";
import { useLanguage } from "@/i18n/useLanguage";

export default function NullFooter() {
  const { lang, t } = useLanguage();
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success(
      t(
        "Cảm ơn bạn đã đăng ký nhận thông báo lô xuất xưởng từ UNLO!",
        "Thank you for subscribing to UNLO factory releases!"
      )
    );
    setEmail("");
  };

  const UNLO_LINKS = [
    { label: t("Về UNLO", "About UNLO"), href: "/pages/about-us" },
    { label: t("Mô hình trực tiếp xưởng M2C", "Direct M2C Model"), href: "/pages/about-us#m2c-model" },
    { label: t("Giá trị cốt lõi", "Our Core Values"), href: "/pages/about-us#values" },
    { label: t("Hồ sơ xưởng đối tác", "Our Partner Factories"), href: "/factories" },
    { label: t("Bền vững & Xanh", "Sustainability"), href: "/pages/about-us#sustainability" },
  ];

  const CUSTOMER_SERVICE_LINKS = [
    { label: t("Tài khoản của tôi", "My Account"), href: "/profile" },
    { label: t("Câu hỏi thường gặp", "FAQ"), href: "/pages/faq" },
    { label: t("Tra cứu đơn hàng", "Track Orders"), href: "/profile/orders" },
    { label: t("Cổng đổi trả 30 ngày", "30-Day Returns"), href: "/returns" },
    { label: t("Vận chuyển & Giao nhận", "Shipping Policy"), href: "/pages/information" },
    { label: t("Chính sách bảo mật", "Privacy Policy"), href: "/pages/information" },
  ];

  const BUSINESS_LINKS = [
    { label: t("Giải pháp đồng phục doanh nghiệp", "Corporate Uniforms"), href: "/b2b" },
    { label: t("Quà tặng doanh nghiệp B2B", "Corporate Gifting"), href: "/b2b" },
    { label: t("Gom đơn nhóm giá xưởng", "Group Buy"), href: "/group-buy" },
    { label: t("Đăng ký xưởng đối tác", "Factory Partnership"), href: "/b2b" },
  ];

  return (
    <footer className="w-full bg-[#15095D] text-white border-t border-[#261587] mt-16 sm:mt-24">
      {/* Top Value Footnote & Navigation */}
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Column 1: UNLO Brand Manifesto & Contact (DOC-04 Mục 9 & Footnote) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-2">
              <span className="font-display uppercase text-2xl sm:text-3xl tracking-wider text-white block">
                UNLO
              </span>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#F4C9D6]">
                {t("GIÁ TRỊ KHÔNG CẦN GỌI TÊN", "VALUE DOES NOT NEED A NAME")}
              </p>
            </div>

            {/* Đoạn trích dẫn triết lý thương hiệu theo đúng bản docx của chị Linh Chi */}
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-normal">
              {t(
                "UNLO ra đời với niềm tin rằng giá trị thật không nằm ở nhãn mác, mà ở chất lượng bên trong. Chúng tôi gỡ bỏ logo để tập trung vào form dáng chuẩn, đường may chỉn chu và mức giá minh bạch. Bởi một chiếc áo không cần tên tuổi lớn để xứng đáng được lựa chọn, cũng như giá trị mỗi người không nằm ở cái tên họ mang trên mình.",
                "UNLO was born from the belief that authentic value lies in intrinsic craftsmanship rather than superficial brand labels. We strip away logo markups to focus entirely on precision tailoring, premium mills, and radically honest pricing. Because garments do not need a luxury label to be worthy of your everyday life."
              )}
            </p>

            {/* Thông tin liên hệ UNLO theo đúng docx */}
            <div className="pt-2 space-y-2 border-t border-white/10 text-xs text-white/90">
              <div className="font-bold tracking-wider uppercase text-[11px] text-[#BBC2DD]">
                {t("LIÊN HỆ UNLO", "CONTACT UNLO")}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#EB6D48] shrink-0" />
                <span>{t("Hà Nội & TP. Hồ Chí Minh, Việt Nam", "Hanoi & Ho Chi Minh City, Vietnam")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#EB6D48] shrink-0" />
                <a href="tel:0948586486" className="font-bold hover:underline tracking-wider">
                  0948586486
                </a>
                <span className="text-white/60">({t("Hotline / Zalo hỗ trợ", "Hotline / Zalo Support")})</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
              {t("VỀ UNLO", "ABOUT US")}
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              {UNLO_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
              {t("DỊCH VỤ KHÁCH HÀNG", "CUSTOMER CARE")}
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              {CUSTOMER_SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & B2B */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
              {t("DOANH NGHIỆP & B2B", "BUSINESS & B2B")}
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80 pb-3">
              {BUSINESS_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter input */}
            <div className="pt-2 space-y-2 border-t border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white block">
                {t("NHẬN THÔNG BÁO LÔ XUẤT XƯỞNG", "RECEIVE RELEASE ALERTS")}
              </span>
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("Nhập địa chỉ email...", "Enter your email...")}
                  className="w-full h-10 pl-3.5 pr-10 rounded-full bg-white/10 border border-white/20 text-xs text-white placeholder:text-white/50 outline-none focus:border-white transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Đăng ký nhận tin"
                  className="absolute right-1 top-1 h-8 w-8 rounded-full bg-white text-[#15095D] grid place-items-center hover:bg-[#F4C9D6] transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {year} UNLO Vietnam. {t("Mô hình sản xuất M2C trực tiếp từ xưởng may.", "Direct-from-mill M2C model.")}</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/pages/information" className="hover:text-white transition-colors">
              {t("Chính sách bảo mật", "Privacy Policy")}
            </Link>
            <Link href="/pages/information" className="hover:text-white transition-colors">
              {t("Điều khoản dịch vụ", "Terms of Service")}
            </Link>
            <Link href="/factories" className="hover:text-white transition-colors">
              {t("Minh bạch chuỗi cung ứng", "Supply Chain Transparency")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
