"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, HeartHandshake, CheckCircle2 } from "lucide-react";

export default function HomeMissionSection() {
  return (
    <section
      aria-label="Sứ mệnh UNLO M2C"
      className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 space-y-12"
    >
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#15095D]/5 border border-[#15095D]/15 text-[11px] font-bold uppercase tracking-[0.2em] text-[#625FBC]">
          OUR MISSION · SỨ MỆNH UNLO
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#15095D]">
          Kiến Tạo Từ Sự Tử Tế, Minh Bạch Từng Đường Kim
        </h2>
        <p className="text-sm sm:text-base text-[#4E567A] leading-relaxed">
          Chúng tôi xóa bỏ ranh giới giữa xưởng sản xuất và người tiêu dùng — bảo vệ quyền lợi người thợ may đồng thời trao gửi sản phẩm cao cấp với chi phí hợp lý nhất.
        </p>
      </div>

      <div className="space-y-12 lg:space-y-16">
        {/* Sứ mệnh 01 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#EB6D48]">
              <span className="w-6 h-0.5 bg-[#EB6D48]" />
              <span>SỨ MỆNH 01</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#15095D] leading-tight">
              1. Kiến Tạo Giá Trị Từ Sự Tử Tế
            </h3>

            <p className="text-sm sm:text-base text-[#4E567A] leading-relaxed sm:leading-8">
              UNLO tin rằng một sản phẩm chất lượng với mức giá hợp lý không nên được tạo nên từ sự đánh đổi quyền lợi của người lao động. Đằng sau mỗi chiếc áo là công sức của những người thợ xứng đáng được trân trọng.
            </p>

            <ul className="space-y-2.5 pt-1 text-xs sm:text-sm text-[#15095D] font-medium">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1D7A5F] shrink-0" />
                <span>Liên kết các xưởng may đạt chuẩn OEKO-TEX Standard 100 &amp; LWG</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1D7A5F] shrink-0" />
                <span>Môi trường làm việc an toàn, lương thưởng công bằng cho thợ lành nghề</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1D7A5F] shrink-0" />
                <span>Tôn vinh bàn tay người thợ vô danh đứng sau các thương hiệu quốc tế</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/pages/about-us"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#15095D] text-white text-xs sm:text-sm font-bold tracking-wide hover:bg-[#32259B] transition-colors shadow-sm"
              >
                <span>Đọc câu chuyện người thợ</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-[#DCE0E7] shadow-[0_12px_36px_rgba(21,9,93,0.06)] bg-[#EFF2F9] group">
            <img
              src="/assets/img/quince-craft-1.jpg"
              alt="Người thợ may tỉ mỉ khâu từng đường kim mũi chỉ tại xưởng đối tác UNLO"
              loading="lazy"
              className="w-full h-80 sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#15095D]/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#EB6D48]">
                XƯỞNG DỆT KIM HƯNG YÊN
              </span>
              <p className="font-serif italic text-base sm:text-lg">
                &ldquo;Đôi tay người thợ may cẩn trọng trên từng đường kim mũi chỉ.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Quince-style subtle separator line */}
        <div className="w-full border-t border-[#DCE0E7]/80 my-2" />

        {/* Sứ mệnh 02 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div className="relative rounded-3xl overflow-hidden border border-[#DCE0E7] shadow-[0_12px_36px_rgba(21,9,93,0.06)] bg-[#EFF2F9] order-last lg:order-first group">
            <img
              src="/assets/img/quince-craft-2.jpg"
              alt="Đôi tay người thợ may tỉ mỉ khâu từng thớ vải"
              loading="lazy"
              className="w-full h-80 sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#15095D]/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#32259B] bg-white/90 px-2 py-0.5 rounded-full inline-block">
                TIÊU CHUẨN AQL 2.5
              </span>
              <p className="font-serif italic text-base sm:text-lg">
                &ldquo;Minh bạch từng thành phần chi phí — Bạn trả tiền cho chất lượng thực sự.&rdquo;
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#32259B]">
              <span className="w-6 h-0.5 bg-[#32259B]" />
              <span>SỨ MỆNH 02</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#15095D] leading-tight">
              2. Minh Bạch Trong Từng Giá Trị
            </h3>

            <p className="text-sm sm:text-base text-[#4E567A] leading-relaxed sm:leading-8">
              Với UNLO, khách hàng có quyền biết rõ giá trị thực sự đằng sau chiếc áo mình lựa chọn. Từ chất liệu sợi, định lượng GSM, form dáng đến quy trình bóc tách 4 tầng chi phí xuất xưởng — mọi thông tin đều được công khai.
            </p>

            <ul className="space-y-2.5 pt-1 text-xs sm:text-sm text-[#15095D] font-medium">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#32259B] shrink-0" />
                <span>Không đội giá 200–300% cho logo thương hiệu hay cửa hàng mặt tiền</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#32259B] shrink-0" />
                <span>Bóc tách công khai: Nguyên liệu, Gia công, Đóng gói và QC kiểm định</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#32259B] shrink-0" />
                <span>Tự đổi trả miễn phí trong vòng 30 ngày nếu không hài lòng chất lượng</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/pages/about-us#price-chart"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#15095D] text-[#15095D] text-xs sm:text-sm font-bold tracking-wide hover:bg-[#15095D] hover:text-white transition-colors"
              >
                <span>Xem biểu đồ so sánh giá</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
