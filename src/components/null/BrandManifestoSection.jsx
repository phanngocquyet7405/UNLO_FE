"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * BrandManifestoSection — Mục giới thiệu chung từ Big Idea & Brand Manifesto
 * "Giá trị không cần gọi tên"
 */
export default function BrandManifestoSection() {
  return (
    <section
      aria-label="Giới thiệu chung — Triết lý UNLO"
      className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14"
    >
      <div className="relative overflow-hidden rounded-3xl bg-[#FCFDF1] border border-[#DDE0EC] shadow-[0_4px_24px_rgba(21,9,93,0.04)] p-8 sm:p-12 lg:p-16">
        {/* Subtle decorative background watermark */}
        <div
          aria-hidden="true"
          className="absolute -right-8 -bottom-10 text-[120px] sm:text-[180px] font-serif font-black text-[#15095D]/[0.03] select-none pointer-events-none leading-none"
        >
          UNLO
        </div>

        <div className="relative z-10 max-w-3xl space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF2F9] text-[#443EB1] text-[11px] font-bold uppercase tracking-[0.16em]">
            <Sparkles className="w-3.5 h-3.5 text-[#625FBC]" />
            <span>UNLO · GIỚI THIỆU CHUNG</span>
          </div>

          {/* Big Idea Headline */}
          <div className="space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#15095D] tracking-tight leading-tight">
              Giá Trị Không Cần Gọi Tên
            </h2>
          </div>

          {/* Main Manifesto Story */}
          <p className="text-sm sm:text-base text-[#4E567A] leading-relaxed sm:leading-8">
            Có những giá trị chẳng cần gọi tên vẫn luôn được trân trọng: đôi tay mẹ khâu lại chiếc cúc áo, tấm lưng áo bạc màu của bố, hay những đường kim mũi chỉ của người thợ vô danh. UNLO ra đời với niềm tin rằng giá trị thật không nằm ở nhãn mác, mà ở chất lượng bên trong. Chúng tôi gỡ bỏ logo để tập trung vào form dáng chuẩn, đường may chỉn chu và mức giá minh bạch. Bởi một chiếc áo không cần tên tuổi lớn để xứng đáng được lựa chọn, cũng như giá trị mỗi người không nằm ở cái tên họ mang trên mình.
          </p>

          {/* Key Message Quote Block */}
          <div className="relative pl-5 sm:pl-6 border-l-2 border-[#32259B] py-1 bg-white/70 rounded-r-2xl p-4">
            <blockquote className="font-serif italic text-base sm:text-lg text-[#15095D] leading-snug">
              &ldquo;Với UNLO, giá trị không nằm ở cái tên mà hiện diện trong từng thớ vải, từng đường kim mũi chỉ và trong mỗi lựa chọn xứng đáng mỗi ngày.&rdquo;
            </blockquote>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#15095D] text-white text-xs font-bold uppercase tracking-[0.12em] hover:bg-[#1F0C85] transition-colors"
            >
              <span>Khám phá đồ cơ bản</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/factories"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#15095D] text-[#15095D] bg-transparent text-xs font-bold uppercase tracking-[0.12em] hover:bg-[#15095D] hover:text-white transition-colors"
            >
              <span>Xem hồ sơ các xưởng đối tác</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
