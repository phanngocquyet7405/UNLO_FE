"use client";

import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";
import { useLanguage } from "@/i18n/useLanguage";

export default function CategoryTrustBar() {
  const { t } = useLanguage();

  const POLICIES = [
    {
      id: "shipping",
      icon: Truck,
      title: t("Miễn phí giao hàng", "Free Shipping"),
      subtitle: t("Cho đơn từ 499.000đ", "Orders over 499,000₫"),
    },
    {
      id: "returns",
      icon: RotateCcw,
      title: t("Đổi trả trong 7 ngày", "7-Day Easy Returns"),
      subtitle: t("Đổi size, đổi mẫu dễ dàng", "Fast exchange for size & fit"),
    },
    {
      id: "genuine",
      icon: ShieldCheck,
      title: t("Chính hãng 100%", "100% Direct From Mills"),
      subtitle: t("Cam kết bởi UNLO Official", "Certified Tier-1 OEM Standard"),
    },
    {
      id: "support",
      icon: Headphones,
      title: t("Hỗ trợ 24/7", "24/7 Priority Support"),
      subtitle: t("Tư vấn size & phối đồ", "Expert sizing & styling help"),
    },
  ];

  return (
    <div className="mt-8 sm:mt-10 pt-6 border-t border-[#DCE0E7]">
      {/* 4 Feature Cards Row (Ref: NOAM/UNLO Ref Image 3) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 py-4 px-2 sm:px-4">
        {POLICIES.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.id}
              className="flex items-center gap-3.5 group"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#EFF2F9] text-[#15095D] flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#15095D] group-hover:text-white transition-colors duration-300">
                <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[1.8]" />
              </div>
              <div className="min-w-0">
                <h4 className="font-sans font-bold text-xs sm:text-sm text-[#15095D] leading-tight truncate">
                  {p.title}
                </h4>
                <p className="font-sans text-[11px] sm:text-xs text-[#4E567A] mt-0.5 truncate">
                  {p.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sub-ticker subtle strip (Exact layout from Ref Image 3) */}
      <div className="mt-4 pt-3 border-t border-[#DCE0E7]/60 overflow-hidden whitespace-nowrap text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-[#4E567A]">
        <div className="flex items-center justify-between gap-6 py-1 px-2">
          <span>UNLO OFFICIAL</span>
          <span className="text-[#BBC2DD]">·</span>
          <span>FREESHIP ĐƠN TỪ 499K</span>
          <span className="text-[#BBC2DD]">·</span>
          <span>ĐỔI TRẢ 7 NGÀY</span>
          <span className="text-[#BBC2DD]">·</span>
          <span>100% SỢI TỰ NHIÊN</span>
          <span className="text-[#BBC2DD]">·</span>
          <span>UNISEX FOR EVERYONE</span>
          <span className="text-[#BBC2DD]">·</span>
          <span className="hidden md:inline">MẶC SAO CŨNG ĐƯỢC, MIỄN THOẢI MÁI</span>
          <span className="text-[#BBC2DD] hidden md:inline">·</span>
          <span className="hidden lg:inline">GIÁ TRỊ KHÔNG CẦN GỌI TÊN</span>
        </div>
      </div>
    </div>
  );
}
