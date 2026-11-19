"use client";

import {
  ShieldCheck,
  RotateCcw,
  Receipt,
  Lock,
  ArrowRight,
} from "lucide-react";

/**
 * TrustBar — 4 Trụ Cột Cam Kết Vàng M2C Chuẩn UNLO
 * 1. QC Tiêu chuẩn xuất khẩu
 * 2. Minh bạch giá thực tại xưởng
 * 3. Đổi trả 30 ngày miễn phí
 * 4. Thanh toán an toàn giữ tạm
 */
export const TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    tag: "TIÊU CHUẨN XUẤT KHẨU",
    title: "QC Chuẩn Quốc Tế",
    desc: "Xưởng Tier-1 đạt chuẩn OEKO-TEX Standard 100, kiểm định 12 bước AQL 2.5 trước khi xuất kho.",
    accent: "#32259B",
  },
  {
    icon: Receipt,
    tag: "GIÁ THỰC TẠI XƯỞNG",
    title: "Minh Bạch Chi Phí",
    desc: "Không đội giá thương hiệu. Bóc tách 4 tầng chi phí xuất xưởng từ nguyên liệu tới công may.",
    accent: "#EB6D48",
  },
  {
    icon: RotateCcw,
    tag: "AN TÂM TUYỆT ĐỐI",
    title: "Đổi Trả Miễn Phí 30 Ngày",
    desc: "Tự đổi trả tận nơi miễn phí nếu không hài lòng chất lượng, form dáng hay kích cỡ.",
    accent: "#1D7A5F",
  },
  {
    icon: Lock,
    tag: "BẢO VỆ NGƯỜI TIÊU DÙNG",
    title: "Thanh Toán Giữ Tạm",
    desc: "Xưởng chỉ nhận tiền khi bạn đã nhận hàng và ưng ý. Cam kết bảo hành đường may trọn đời.",
    accent: "#15095D",
  },
];

export default function TrustBar() {
  return (
    <section
      aria-label="Cam kết chất lượng & Niềm tin M2C UNLO"
      className="w-full bg-[#FCFDF1] border-y border-[#DCE0E7] py-12 sm:py-16"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#625FBC]">
            UNLO GUARANTEE · 4 CAM KẾT VÀNG
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#15095D]">
            Mua Sắm An Tâm Trực Tiếp Từ Xưởng
          </h2>
          <p className="text-xs sm:text-sm text-[#4E567A]">
            Bảo vệ quyền lợi tối đa cho người tiêu dùng với quy trình minh bạch từ xưởng tới tay bạn.
          </p>
        </div>

        {/* 4 Trust Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {TRUST_PILLARS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative rounded-2xl bg-white border border-[#DCE0E7] p-6 space-y-3.5 hover:border-[#32259B] transition-all hover:shadow-[0_12px_32px_rgba(21,9,93,0.06)] hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs"
                    style={{ backgroundColor: `${item.accent}12` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.accent }} />
                  </div>
                  <span
                    className="text-[9px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${item.accent}10`,
                      color: item.accent,
                    }}
                  >
                    {item.tag}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#15095D] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#4E567A] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
