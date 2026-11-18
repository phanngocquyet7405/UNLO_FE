"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowRight, ChevronDown } from "lucide-react";

const PRODUCTS_LINKS = [
  { label: "Nam", href: "/products?keyword=nam" },
  { label: "Nữ", href: "/products?keyword=nu" },
  { label: "Áo thun Supima 260 GSM", href: "/products?category=cotton-basics" },
  { label: "Sơ mi European Linen", href: "/products?category=linen-tailoring" },
  { label: "Áo nỉ & Hoodie 420 GSM", href: "/products?category=sweat-hoodie" },
  { label: "Quần Chino & Trousers", href: "/products?category=pants-bottoms" },
  { label: "Đồ len Merino & Cashmere", href: "/products?category=wool-knitwear" },
  { label: "Đồ da & Túi Canvas 16oz", href: "/products?category=leather-goods" },
  { label: "Quà tặng xưởng & Combos", href: "/bundles" },
  { label: "Sản phẩm mới về", href: "/products?sort=newest" },
];

const UNLO_LINKS = [
  { label: "Về UNLO (About Us)", href: "/pages/about" },
  { label: "Mô hình M2C từ xưởng", href: "/pages/about#m2c-model" },
  { label: "Giá trị cốt lõi (Our Values)", href: "/#brand-manifesto" },
  { label: "Hồ sơ 4 nhà máy (Our Factories)", href: "/factories" },
  { label: "Minh bạch chi phí 4 tầng", href: "/products" },
  { label: "Bền vững & Xanh (Sustainability)", href: "/pages/about#sustainability" },
  { label: "Tiêu chuẩn kiểm định QC 12 bước", href: "/factories" },
  { label: "Kiến thức vải sợi (Fabrics 101)", href: "/products" },
];

const CUSTOMER_SERVICE_LINKS = [
  { label: "Tài khoản của tôi (My Account)", href: "/profile" },
  { label: "Câu hỏi thường gặp (FAQ)", href: "/pages/faq" },
  { label: "Tra cứu đơn hàng (My Orders)", href: "/profile/orders" },
  { label: "Cổng tự đổi trả 30 ngày (Start a Return)", href: "/returns" },
  { label: "Vận chuyển & Giao nhận", href: "/pages/information" },
  { label: "Chính sách bảo hành trọn đời", href: "/pages/faq" },
  { label: "Bảo mật & An toàn thanh toán", href: "/pages/information" },
  { label: "Liên hệ xưởng (Contact Us)", href: "/pages/contact-us" },
];

const BUSINESS_LINKS = [
  { label: "Giải pháp đồng phục B2B", href: "/b2b" },
  { label: "Quà tặng doanh nghiệp (Corporate Gifting)", href: "/b2b" },
  { label: "Gom đơn lô nhỏ MOQ (Group Buy)", href: "/group-buy" },
  { label: "Đăng ký đối tác xưởng may", href: "/b2b" },
];

export default function NullFooter() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Cảm ơn bạn đã đăng ký nhận thông báo lô xuất xưởng từ UNLO!");
    setEmail("");
  };

  return (
    <footer className="w-full bg-[#1C1F26] text-white border-t border-[#2B303C] mt-20">
      <div className="max-w-[1760px] mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#2B303C]/70">
          {/* Column 1: Newsletter Signup (Quince Style - No QR Code) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Offers, new arrivals, restocks and more.
            </h3>
            <p className="text-xs text-[#9DA4B4] leading-relaxed">
              Nhận thông báo các đợt mở lô MOQ giá xưởng và bộ sưu tập đồ cơ bản mới nhất.
            </p>

            <form onSubmit={handleSubscribe} className="relative max-w-sm pt-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ADDRESS"
                aria-label="Địa chỉ email nhận thông tin"
                className="w-full h-11 pl-4 pr-11 bg-transparent border border-[#3E4554] text-xs text-white placeholder:text-[#8E97A8] outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                aria-label="Đăng ký nhận tin"
                className="absolute right-0 top-1 h-11 w-11 text-white hover:text-[#DCE0E7] grid place-items-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Column 2: PRODUCTS */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-white">
              PRODUCTS
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9DA4B4]">
              {PRODUCTS_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: UNLO */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-white">
              UNLO
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9DA4B4]">
              {UNLO_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: CUSTOMER SERVICE */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-white">
              CUSTOMER SERVICE
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9DA4B4]">
              {CUSTOMER_SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: UNLO BUSINESS & REGION / FOLLOW */}
          <div className="lg:col-span-3 space-y-7">
            {/* Business Links */}
            <div className="space-y-3.5">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                UNLO BUSINESS
              </h4>
              <ul className="space-y-2.5 text-xs text-[#9DA4B4]">
                {BUSINESS_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Country / Region Selector (Quince Style) */}
            <div className="space-y-2 pt-2 border-t border-[#2B303C]/70">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                COUNTRY/REGION
              </h4>
              <button
                type="button"
                onClick={() => toast.info("UNLO hiện giao hàng toàn quốc tại Việt Nam.")}
                className="inline-flex items-center gap-2 text-xs text-[#9DA4B4] hover:text-white transition-colors cursor-pointer"
              >
                <span>🇻🇳</span>
                <span>Việt Nam ($VND)</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8E97A8]" />
              </button>
            </div>

            {/* Social Follow Icons */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                FOLLOW US
              </h4>
              <div className="flex items-center gap-4 text-white">
                <a
                  href="#facebook"
                  aria-label="Facebook UNLO"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("Theo dõi UNLO trên Facebook");
                  }}
                  className="hover:opacity-80 transition-opacity"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href="#instagram"
                  aria-label="Instagram UNLO"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("Theo dõi UNLO trên Instagram");
                  }}
                  className="hover:opacity-80 transition-opacity"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#tiktok"
                  aria-label="TikTok UNLO"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("Theo dõi UNLO trên TikTok");
                  }}
                  className="hover:opacity-80 transition-opacity"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7B8394]">
          <p>© {year} UNLO, Inc. Toàn bộ bản quyền được bảo lưu. Sản xuất trực tiếp tại Việt Nam.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/pages/information" className="hover:text-white transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="/pages/information" className="hover:text-white transition-colors">
              Điều khoản dịch vụ
            </Link>
            <Link href="/factories" className="hover:text-white transition-colors">
              Minh bạch chuỗi cung ứng (Supply Chain)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
