"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Eye,
  Award,
  Factory,
} from "lucide-react";
import NullHeader from "@/components/null/NullHeader";
import NullFooter from "@/components/null/NullFooter";
import AboutPriceComparisonChart from "@/components/null/AboutPriceComparisonChart";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15095D]">
      <NullHeader />

      <main className="flex-1 space-y-20 sm:space-y-28 pb-24">
        {/* ================================================================
            TRANG ĐẦU: HERO — BIG IDEA & KEY MESSAGE (Quince Style)
            ================================================================ */}
        <section className="relative overflow-hidden bg-[#15095D] text-white py-20 sm:py-32 lg:py-40">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1F0C85]/30 via-transparent to-black/30 pointer-events-none" />
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#EB6D48]/10 blur-3xl pointer-events-none" />

          <div className="relative max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-6 sm:space-y-8">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white">
              Giá Trị Không Cần <br />
              <span className="italic font-normal text-[#E2E6FF]">Gọi Tên</span>
            </h1>

            <div className="max-w-3xl mx-auto pt-4 border-t border-white/20">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A8B2D8] mb-3">
                KEY MESSAGE
              </p>
              <blockquote className="font-serif italic text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed text-[#FCFDF1]">
                &ldquo;Với UNLO, giá trị không nằm ở cái tên mà hiện diện trong
                từng thớ vải, từng đường kim mũi chỉ và trong mỗi lựa chọn xứng
                đáng mỗi ngày.&rdquo;
              </blockquote>
            </div>
          </div>
        </section>

        {/* ================================================================
            TRANG TIẾP THEO: TRIẾT LÝ GỠ BỎ LOGO & NGUỒN CẢM HỨNG
            ================================================================ */}
        <section className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="rounded-3xl bg-[#FCFDF1] border border-[#DCE0E7] p-8 sm:p-14 lg:p-16 space-y-6 shadow-[0_4px_30px_rgba(21,9,93,0.03)]">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#625FBC]">
              NGUỒN CẢM HỨNG KHỞI NGUYÊN
            </span>

            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#15095D] leading-snug sm:leading-tight">
              Có những giá trị chẳng cần gọi tên vẫn luôn được trân trọng: đôi
              tay mẹ khâu lại chiếc cúc áo, tấm lưng áo bạc màu của bố, hay
              những đường kim mũi chỉ của người thợ vô danh.
            </p>

            <p className="text-sm sm:text-base text-[#4E567A] leading-relaxed sm:leading-8 pt-2 border-t border-[#DCE0E7]/60">
              UNLO ra đời với niềm tin rằng giá trị thật không nằm ở nhãn mác,
              mà ở chất lượng bên trong. Chúng tôi gỡ bỏ logo để tập trung vào
              form dáng chuẩn, đường may chỉn chu và mức giá minh bạch. Bởi một
              chiếc áo không cần tên tuổi lớn để xứng đáng được lựa chọn, cũng
              như giá trị mỗi người không nằm ở cái tên họ mang trên mình.
            </p>
          </div>
        </section>

        {/* ================================================================
            TRANG TIẾP THEO: TIÊU ĐỀ: GIÁ TRỊ CỐT LÕI (CORE VALUES)
            ================================================================ */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#625FBC]">
              OUR VALUES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[#15095D]">
              Giá Trị Cốt Lõi
            </h2>
            <p className="text-xs sm:text-sm text-[#4E567A]">
              Ba trụ cột định hình từng mũi may, từng đối tác và mọi quyết định
              của UNLO.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* 01. CHẤT LƯỢNG – QUALITY */}
            <div className="rounded-3xl bg-white border border-[#DCE0E7] p-8 space-y-4 hover:border-[#32259B] transition-all hover:shadow-[0_16px_40px_rgba(21,9,93,0.08)] group">
              <div className="flex items-center justify-between">
                <span className="font-serif font-black text-4xl text-[#15095D]/20 group-hover:text-[#32259B] transition-colors">
                  01
                </span>
                <div className="w-10 h-10 rounded-2xl bg-[#EFF2F9] text-[#15095D] grid place-items-center group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5 text-[#32259B]" />
                </div>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#15095D]">
                CHẤT LƯỢNG – QUALITY
              </h3>
              <p className="text-xs sm:text-sm text-[#4E567A] leading-relaxed">
                Chất lượng không nên là đặc quyền của những thương hiệu đắt
                tiền. UNLO tập trung vào chất liệu, form dáng và từng đường may
                chỉn chu để tạo nên những sản phẩm cơ bản đáng tin cậy.
              </p>
            </div>

            {/* 02. MINH BẠCH – TRANSPARENCY */}
            <div className="rounded-3xl bg-white border border-[#DCE0E7] p-8 space-y-4 hover:border-[#32259B] transition-all hover:shadow-[0_16px_40px_rgba(21,9,93,0.08)] group">
              <div className="flex items-center justify-between">
                <span className="font-serif font-black text-4xl text-[#15095D]/20 group-hover:text-[#32259B] transition-colors">
                  02
                </span>
                <div className="w-10 h-10 rounded-2xl bg-[#EFF2F9] text-[#15095D] grid place-items-center group-hover:scale-110 transition-transform">
                  <Eye className="w-5 h-5 text-[#32259B]" />
                </div>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#15095D]">
                MINH BẠCH – TRANSPARENCY
              </h3>
              <p className="text-xs sm:text-sm text-[#4E567A] leading-relaxed">
                Giá trị cần được nhìn thấy, không chỉ được quảng cáo. UNLO minh
                bạch thông tin sản phẩm, nguồn gốc xưởng sản xuất và các yếu tố
                cấu thành giá bán, giúp khách hàng hiểu rõ mình đang lựa chọn
                điều gì.
              </p>
            </div>

            {/* 03. GIÁ CẢ XỨNG ĐÁNG – AFFORDABILITY */}
            <div className="rounded-3xl bg-white border border-[#DCE0E7] p-8 space-y-4 hover:border-[#32259B] transition-all hover:shadow-[0_16px_40px_rgba(21,9,93,0.08)] group">
              <div className="flex items-center justify-between">
                <span className="font-serif font-black text-4xl text-[#15095D]/20 group-hover:text-[#32259B] transition-colors">
                  03
                </span>
                <div className="w-10 h-10 rounded-2xl bg-[#EFF2F9] text-[#15095D] grid place-items-center group-hover:scale-110 transition-transform">
                  <HeartHandshake className="w-5 h-5 text-[#32259B]" />
                </div>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#15095D]">
                GIÁ CẢ XỨNG ĐÁNG – AFFORDABILITY
              </h3>
              <p className="text-xs sm:text-sm text-[#4E567A] leading-relaxed">
                Ai cũng xứng đáng được tiếp cận sản phẩm chất lượng với mức giá
                hợp lý. Thông qua mô hình kết nối trực tiếp với nhà sản xuất,
                UNLO hướng đến tinh giản khâu trung gian và tối ưu chi phí cho
                người tiêu dùng.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================
            TRANG TIẾP THEO: TIÊU ĐỀ: SỨ MỆNH (MISSION) — Layout 2 khối kèm ảnh Quince
            ================================================================ */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#625FBC]">
              OUR MISSION
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[#15095D]">
              Sứ Mệnh
            </h2>
          </div>

          <div className="space-y-12">
            {/* Block 1: KIẾN TẠO GIÁ TRỊ TỪ SỰ TỬ TẾ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#EB6D48]">
                  SỨ MỆNH 01
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-[#15095D] leading-tight">
                  1. Kiến Tạo Giá Trị Từ Sự Tử Tế
                </h3>
                <p className="text-sm sm:text-base text-[#4E567A] leading-relaxed sm:leading-8">
                  UNLO tin rằng một sản phẩm chất lượng với mức giá hợp lý không
                  nên được tạo nên từ sự đánh đổi quyền lợi của người lao động.
                  Đằng sau mỗi chiếc áo là công sức của những người thợ xứng
                  đáng được trân trọng. Vì vậy, chúng tôi hướng đến việc hợp tác
                  với các xưởng sản xuất có trách nhiệm, đề cao điều kiện làm
                  việc an toàn và sự công bằng trong lao động.
                </p>
              </div>

              <div className="rounded-3xl overflow-hidden border border-[#DCE0E7] shadow-lg bg-[#EFF2F9]">
                <img
                  src="/assets/img/about-image1.png"
                  alt="Người thợ may cẩn thận may từng đường kim mũi chỉ tại xưởng đối tác"
                  className="w-full h-72 sm:h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Block 2: MINH BẠCH TRONG TỪNG GIÁ TRỊ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              <div className="rounded-3xl overflow-hidden border border-[#DCE0E7] shadow-lg bg-[#EFF2F9] order-last lg:order-first">
                <img
                  src="/assets/img/x-tho-may.jpg"
                  alt="Kiểm tra chi tiết từng đường may mũi chỉ theo tiêu chuẩn AQL 2.5"
                  className="w-full h-72 sm:h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#32259B]">
                  SỨ MỆNH 02
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-[#15095D] leading-tight">
                  2. Minh Bạch Trong Từng Giá Trị
                </h3>
                <p className="text-sm sm:text-base text-[#4E567A] leading-relaxed sm:leading-8">
                  Với UNLO, khách hàng có quyền biết rõ giá trị thực sự đằng sau
                  chiếc áo mình lựa chọn. Từ chất liệu, form dáng, đường may đến
                  quy trình sản xuất và giá bán, mọi thông tin đều cần được thể
                  hiện rõ ràng. Chúng tôi không muốn khách hàng trả tiền cho một
                  cái tên, mà muốn họ hiểu và tin tưởng vào những giá trị thực
                  chất mình nhận được.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            TRANG TIẾP THEO: CÁCH UNLO GIỮ MỨC GIÁ THẤP & BIỂU ĐỒ SO SÁNH GIÁ (DẠNG CHART)
            ================================================================ */}
        <section
          id="price-chart"
          className="max-w-6xl mx-auto px-5 sm:px-8 space-y-10 scroll-mt-24"
        >
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#625FBC]">
              HOW WE KEEP PRICES LOW
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[#15095D]">
              Cách UNLO Giữ Mức Giá Thực Tại Xưởng
            </h2>
            <p className="text-xs sm:text-base text-[#4E567A] leading-relaxed">
              Chúng tôi loại bỏ các chi phí trung gian không cần thiết: đại lý,
              mặt bằng đắt đỏ và ngân sách marketing thổi phồng. Dưới đây là
              biểu đồ đối chiếu thực tế mức giá mục tiêu tại xưởng của UNLO so
              với hàng trôi nổi và các thương hiệu bán lẻ.
            </p>
          </div>

          {/* Interactive Comparison Chart Component */}
          <AboutPriceComparisonChart />
        </section>

        {/* ================================================================
            TRANG TIẾP THEO: THÔNG ĐIỆP TỔNG KẾT (Chỉ trích mỗi câu thông điệp)
            ================================================================ */}
        <section className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#EFF2F9] via-[#F4F5FB] to-[#FCFDF1] border-2 border-[#15095D] p-10 sm:p-16 text-center space-y-6 shadow-md">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#625FBC]">
              THÔNG ĐIỆP TỔNG KẾT
            </span>
            <blockquote className="font-serif text-2xl sm:text-4xl lg:text-4xl font-semibold text-[#15095D] leading-snug sm:leading-tight">
              &ldquo;UNLO tin rằng giá trị của một chiếc áo không nằm ở cái tên
              trên nhãn mác, mà được tạo nên từ chất lượng thực chất, sự minh
              bạch và mức giá xứng đáng.&rdquo;
            </blockquote>
          </div>
        </section>

        {/* ================================================================
            TRANG CUỐI: CALL TO ACTION
            ================================================================ */}
        <section className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="rounded-3xl bg-[#15095D] text-white p-8 sm:p-14 text-center space-y-6 shadow-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Sẵn Sàng Trải Nghiệm Hàng Thiết Yếu Trực Tiếp Từ Xưởng?
            </h2>
            <p className="text-sm sm:text-base text-[#D0D4EE] max-w-xl mx-auto leading-relaxed">
              Khám phá toàn bộ 25 sản phẩm cơ bản chuẩn xuất khẩu hoặc tìm hiểu
              hồ sơ 4 nhà máy đối tác đã thẩm định của UNLO.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#15095D] text-xs sm:text-sm font-bold tracking-wide hover:bg-[#FCFDF1] transition-transform hover:scale-105"
              >
                <span>Xem tất cả sản phẩm M2C</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/factories"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/60 bg-white/10 hover:bg-white hover:text-[#15095D] text-white text-xs sm:text-sm font-bold tracking-wide backdrop-blur-md transition-all"
              >
                <Factory className="w-4 h-4" />
                <span>Hồ sơ 4 nhà máy</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <NullFooter />
    </div>
  );
}
