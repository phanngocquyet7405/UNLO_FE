"use client";

import { Camera, RefreshCw, Tag, Headphones, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/i18n/useLanguage";

export default function ProductPurchasePolicies() {
  const { t } = useLanguage();

  const POLICIES = [
    {
      id: "exact_photo",
      icon: Camera,
      title: t("Cam kết hình ảnh giống mô tả", "True-to-Life Photos"),
      desc: t(
        "Ảnh chụp thực tế từ xưởng may, không chỉnh sửa lệch màu chất liệu.",
        "100% authentic studio shots, exact fabric texture & color."
      ),
    },
    {
      id: "easy_return",
      icon: RefreshCw,
      title: t("Hỗ trợ đổi trả", "7-Day Easy Exchange"),
      desc: t(
        "Đổi size, đổi màu trong vòng 7 ngày khi chưa qua giặt ủi.",
        "Fast exchange for size & color within 7 days."
      ),
    },
    {
      id: "factory_pricing",
      icon: Tag,
      title: t("Ưu đãi giảm giá", "Volume Factory Pricing"),
      desc: t(
        "Giá thực xuất xưởng M2C, chiết khấu lũy tiến từ 10 sản phẩm.",
        "Direct-from-mill pricing, bulk discount starting at 10 items."
      ),
    },
    {
      id: "support_247",
      icon: Headphones,
      title: t("Đội ngũ tư vấn 24/7", "24/7 Dedicated Fit Advisors"),
      desc: t(
        "Hỗ trợ tư vấn thông số đo vóc dáng và giải đáp chi tiết.",
        "Master patternmakers ready to guide your measurements anytime."
      ),
    },
  ];

  return (
    <div className="rounded-2xl border border-[#DCE0E7] bg-white p-4 sm:p-5 shadow-2xs space-y-4 my-6">
      {/* Title */}
      <div className="flex items-center gap-2 border-b border-[#DCE0E7]/60 pb-3">
        <ShieldCheck className="w-4 h-4 text-[#32259B]" />
        <h3 className="font-sans font-bold text-xs sm:text-sm tracking-wider uppercase text-[#15095D]">
          {t("Chính sách mua hàng", "Purchase Policies & Guarantees")}
        </h3>
      </div>

      {/* 4 Cards Grid (Ref: Image 5 in user request) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {POLICIES.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 p-3 rounded-xl bg-[#EFF2F9]/50 border border-[#DCE0E7]/80 hover:bg-[#EFF2F9] transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-white text-[#15095D] flex items-center justify-center shrink-0 border border-[#DCE0E7] shadow-2xs">
                <Icon className="w-4 h-4 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <h4 className="font-sans font-bold text-xs text-[#15095D] leading-tight">
                  {item.title}
                </h4>
                <p className="font-sans text-[11px] text-[#4E567A] mt-1 leading-snug">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
