"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Award, Eye, HeartHandshake, ShieldCheck } from "lucide-react";

/**
 * BrandManifestoSection — Mục giới thiệu chung từ Big Idea & Brand Manifesto
 * "Giá trị không cần gọi tên" theo tài liệu FB WEB.docx
 */
export default function BrandManifestoSection() {
  return (
    <section
      id="brand-manifesto"
      aria-label="Giới thiệu chung — Triết lý UNLO"
      className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 scroll-mt-24 space-y-8"
    >
      <div className="relative overflow-hidden rounded-3xl bg-[#FCFDF1] border border-[#DDE0EC] shadow-[0_4px_24px_rgba(21,9,93,0.04)] p-8 sm:p-12 lg:p-16">
        {/* Subtle decorative background watermark */}
        <div
          aria-hidden="true"
          className="absolute -right-8 -bottom-10 text-[120px] sm:text-[180px] font-serif font-black text-[#15095D]/[0.03] select-none pointer-events-none leading-none"
        >
          UNLO
        </div>

        <div className="relative z-10 max-w-4xl space-y-8">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#BBC2DD] text-[#32259B] text-[11px] font-bold uppercase tracking-[0.16em]">
            <Sparkles className="w-3.5 h-3.5 text-[#EB6D48]" />
            <span>TRIẾT LÝ M2C · BIG IDEA</span>
          </div>

          {/* Big Idea Headline */}
          <div className="space-y-2">
            <h2 className="font-unlo-title font-bold text-3xl sm:text-5xl lg:text-6xl text-[#15095D] tracking-tight leading-[1.1]">
              Giá Trị <span className="text-[#EB6D48]">Không Cần Gọi Tên</span>
            </h2>
          </div>

          {/* Key Message Quote Block */}
          <div className="relative pl-5 sm:pl-6 border-l-3 border-[#EB6D48] py-2 bg-white/80 rounded-r-2xl p-4 shadow-xs">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#625FBC] mb-1">
              KEY MESSAGE
            </p>
            <blockquote className="font-serif italic text-base sm:text-xl text-[#15095D] leading-snug">
              &ldquo;Với UNLO, giá trị không nằm ở cái tên mà hiện diện trong từng thớ vải,
              từng đường kim mũi chỉ và trong mỗi lựa chọn xứng đáng mỗi ngày.&rdquo;
            </blockquote>
          </div>

          {/* Main Manifesto Story */}
          <p className="text-sm sm:text-base text-[#4E567A] leading-relaxed sm:leading-8">
            Có những giá trị chẳng cần gọi tên vẫn luôn được trân trọng: đôi tay mẹ khâu lại chiếc cúc áo,
            tấm lưng áo bạc màu của bố, hay những đường kim mũi chỉ của người thợ vô danh. UNLO ra đời với
            niềm tin rằng giá trị thật không nằm ở nhãn mác, mà ở chất lượng bên trong. Chúng tôi gỡ bỏ logo
            để tập trung vào form dáng chuẩn, đường may chỉn chu và mức giá minh bạch. Bởi một chiếc áo không cần
            tên tuổi lớn để xứng đáng được lựa chọn, cũng như giá trị mỗi người không nằm ở cái tên họ mang trên mình.
          </p>

          {/* 3 Core Values Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="rounded-2xl bg-white border border-[#DCE0E7] p-5 space-y-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#32259B]" />
                <h4 className="font-serif font-bold text-sm text-[#15095D]">01. Chất Lượng</h4>
              </div>
              <p className="text-xs text-[#5E607E] leading-relaxed">
                Tập trung vào chất liệu sợi dài chuẩn xuất khẩu, form dáng chuẩn và đường may chỉn chu.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-[#DCE0E7] p-5 space-y-2">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#32259B]" />
                <h4 className="font-serif font-bold text-sm text-[#15095D]">02. Minh Bạch</h4>
              </div>
              <p className="text-xs text-[#5E607E] leading-relaxed">
                Công khai nguồn gốc 4 xưởng may và biểu đồ bóc tách 4 tầng cấu thành giá bán.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-[#DCE0E7] p-5 space-y-2">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#32259B]" />
                <h4 className="font-serif font-bold text-sm text-[#15095D]">03. Giá Cả Xứng Đáng</h4>
              </div>
              <p className="text-xs text-[#5E607E] leading-relaxed">
                Kết nối trực tiếp xưởng tới tay người tiêu dùng, tinh giản tối đa chi phí trung gian.
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/pages/about-us"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#15095D] text-white text-xs font-bold uppercase tracking-[0.12em] hover:bg-[#1F0C85] transition-colors"
            >
              <span>Về câu chuyện UNLO (About Us)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/pages/about-us#price-chart"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#15095D] text-[#15095D] bg-white text-xs font-bold uppercase tracking-[0.12em] hover:bg-[#15095D] hover:text-white transition-colors"
            >
              <span>Xem biểu đồ so sánh giá mục tiêu</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
