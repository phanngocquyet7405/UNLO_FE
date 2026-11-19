"use client";

import Link from "next/link";
import { Award, Eye, HeartHandshake, ArrowRight } from "lucide-react";

export const CORE_VALUES = [
  {
    number: "01",
    title: "Chất Lượng Vượt Trội",
    sub: "QUALITY FIRST",
    icon: Award,
    desc: "Chất lượng không nên là đặc quyền của những thương hiệu đắt tiền. UNLO tập trung vào chất liệu chuẩn xuất khẩu, form dáng chuẩn và từng đường kim mũi chỉ chỉn chu.",
  },
  {
    number: "02",
    title: "Minh Bạch Tuyệt Đối",
    sub: "RADICAL TRANSPARENCY",
    icon: Eye,
    desc: "Giá trị cần được nhìn thấy, không chỉ được quảng cáo. UNLO minh bạch thông tin sản phẩm, nguồn gốc xưởng sản xuất và 4 tầng cấu thành giá bán thực tế.",
  },
  {
    number: "03",
    title: "Giá Cả Xứng Đáng",
    sub: "TRUE AFFORDABILITY",
    icon: HeartHandshake,
    desc: "Ai cũng xứng đáng tiếp cận sản phẩm chất lượng cao với mức giá gốc tại xưởng. Cắt bỏ khâu trung gian, mặt bằng TTTM và chi phí marketing ảo.",
  },
];

export default function HomeCoreValues() {
  return (
    <section
      aria-label="Giá trị cốt lõi UNLO"
      className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 space-y-10"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF2F9] border border-[#BBC2DD]/60 text-[11px] font-bold uppercase tracking-[0.16em] text-[#32259B]">
            CORE VALUES · GIÁ TRỊ CỐT LÕI
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#15095D]">
            Ba Trụ Cột Định Hình Mọi Sản Phẩm
          </h2>
          <p className="text-sm sm:text-base text-[#4E567A] leading-relaxed">
            Không chạy theo hào nhoáng nhãn mác, UNLO tập trung vào những giá trị thực chất bên trong từng thớ vải và mối quan hệ đối tác bền vững với xưởng may.
          </p>
        </div>

        <Link
          href="/pages/about-us#values"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#32259B] hover:text-[#15095D] transition-colors shrink-0 group"
        >
          <span>Tìm hiểu triết lý hoàn chỉnh</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
        {CORE_VALUES.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.number}
              className="relative rounded-3xl bg-[#EFF2F9]/50 border border-[#DCE0E7] p-7 sm:p-8 space-y-4 hover:border-[#32259B] hover:bg-white transition-all duration-300 hover:shadow-[0_16px_40px_rgba(21,9,93,0.08)] group"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif font-black text-4xl sm:text-5xl text-[#15095D]/20 group-hover:text-[#32259B] transition-colors tabular-nums">
                  {item.number}
                </span>
                <div className="w-11 h-11 rounded-2xl bg-white border border-[#DCE0E7] text-[#32259B] grid place-items-center group-hover:scale-110 group-hover:bg-[#32259B] group-hover:text-white transition-all shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#625FBC]">
                  {item.sub}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#15095D] leading-tight">
                  {item.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#4E567A] leading-relaxed pt-1">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
