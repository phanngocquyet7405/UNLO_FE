"use client";

import Link from "next/link";
import { ArrowRight, Award, Eye, HeartHandshake } from "lucide-react";
import NullHeader from "@/components/null/NullHeader";
import NullFooter from "@/components/null/NullFooter";
import AboutPriceComparisonChart from "@/components/null/AboutPriceComparisonChart";
import { useLanguage } from "@/i18n/useLanguage";

/**
 * DOC-03: Trang About Us (Khi bấm Discover Now / Khám Phá Ngay)
 * Tham chiếu Quince (https://www.quince.com/about-us):
 * 1) Hero Manifesto: "Giá trị không cần gọi tên"
 * 2) Triết lý gỡ bỏ logo & Trích đoạn nguồn gốc UNLO
 * 3) Giá trị cốt lõi (3 trụ cột: Chất lượng, Minh bạch, Giá cả xứng đáng)
 * 4) Sứ mệnh (2 khối so le so với ảnh thợ may/xưởng)
 * 5) Cách UNLO tối ưu chi phí & Biểu đồ so sánh giá tại xưởng
 * Thống nhất ngôn ngữ: 100% Tiếng Việt khi ở chế độ VI, 100% Tiếng Anh khi ở chế độ EN.
 */
export default function AboutPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15095D]">
      <NullHeader />

      <main className="flex-1 space-y-20 sm:space-y-28 pb-24">
        {/* ================================================================
            1. HERO: BIG IDEA & KEY MESSAGE (Quince Style)
            ================================================================ */}
        <section className="relative overflow-hidden bg-[#15095D] text-white py-20 sm:py-32 lg:py-40">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1F0C85]/30 via-transparent to-black/30 pointer-events-none" />
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#EB6D48]/10 blur-3xl pointer-events-none" />

          <div className="relative max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-6 sm:space-y-8">
            <h1 className="font-display uppercase text-4xl sm:text-6xl lg:text-7xl leading-[1.08] text-white">
              {t("Giá Trị", "Authentic Value")} <br className="sm:hidden" />
              <span className="text-[#F4C9D6]">
                {t("Không Cần Gọi Tên", "Does Not Need A Name")}
              </span>
            </h1>

            <div className="max-w-3xl mx-auto pt-4 border-t border-white/20">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#BBC2DD] mb-3">
                {t("THÔNG ĐIỆP CỐT LÕI", "KEY MESSAGE")}
              </p>
              <blockquote className="font-serif italic text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed text-[#FCFDF1]">
                &ldquo;
                {t(
                  "Với UNLO, giá trị không nằm ở cái tên mà hiện diện trong từng thớ vải, từng đường kim mũi chỉ và trong mỗi lựa chọn xứng đáng mỗi ngày.",
                  "At UNLO, authentic value does not reside in brand logos, but in every fiber, every precision stitch, and in thoughtful everyday choices."
                )}
                &rdquo;
              </blockquote>
            </div>
          </div>
        </section>

        {/* ================================================================
            2. TRIẾT LÝ GỠ BỎ LOGO & NGUỒN CẢM HỨNG (FOOTNOTE DOCX)
            ================================================================ */}
        <section className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="rounded-3xl bg-[#F7F4EE] border border-[#E8E2D5] p-8 sm:p-14 lg:p-16 space-y-6 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#625FBC]">
              {t("NGUỒN CẢM HỨNG KHỞI NGUYÊN", "THE FOUNDING INSPIRATION")}
            </span>

            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#15095D] leading-snug sm:leading-tight">
              {t(
                "Có những giá trị chẳng cần gọi tên vẫn luôn được trân trọng: đôi tay mẹ khâu lại chiếc cúc áo, tấm lưng áo bạc màu của bố, hay những đường kim mũi chỉ của người thợ vô danh.",
                "Some values never need to be named to be cherished: a mother's hands sewing a button, a father's sun-faded shirt, or the diligent stitches of an unsung artisan."
              )}
            </p>

            <p className="text-sm sm:text-base text-[#4E567A] leading-relaxed sm:leading-8 pt-4 border-t border-[#DCE0E7]">
              {t(
                "UNLO ra đời với niềm tin rằng giá trị thật không nằm ở nhãn mác, mà ở chất lượng bên trong. Chúng tôi gỡ bỏ logo để tập trung vào form dáng chuẩn, đường may chỉn chu và mức giá minh bạch. Bởi một chiếc áo không cần tên tuổi lớn để xứng đáng được lựa chọn, cũng như giá trị mỗi người không nằm ở cái tên họ mang trên mình.",
                "UNLO was born from the belief that authentic value lies in intrinsic quality rather than brand prestige. We strip away logo markups to focus entirely on precision tailoring, premium mills, and transparent pricing. Because a garment doesn't need a luxury name to be worthy of your everyday life, just as a person's worth is never defined by the label on their chest."
              )}
            </p>
          </div>
        </section>

        {/* ================================================================
            3. GIÁ TRỊ CỐT LÕI (3 Trụ Cột: Chất Lượng - Minh Bạch - Giá Cả Xứng Đáng)
            ================================================================ */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#625FBC]">
              {t("GIÁ TRỊ CỐT LÕI", "OUR CORE VALUES")}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[#15095D]">
              {t("Ba Trụ Cột Của UNLO", "The Three Pillars of UNLO")}
            </h2>
            <p className="text-xs sm:text-sm text-[#4E567A]">
              {t(
                "Định hình từng mũi may, từng đối tác và mọi quyết định của chúng tôi.",
                "Guiding every seam, every factory partnership, and every decision."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* 01. CHẤT LƯỢNG */}
            <div className="rounded-3xl bg-white border border-[#DCE0E7] p-8 space-y-4 hover:border-[#32259B] transition-all hover:shadow-md group">
              <div className="flex items-center justify-between">
                <span className="font-serif font-black text-4xl text-[#15095D]/20 group-hover:text-[#32259B] transition-colors">
                  01
                </span>
                <div className="w-10 h-10 rounded-2xl bg-[#EFF2F9] text-[#15095D] grid place-items-center group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5 text-[#32259B]" />
                </div>
              </div>
              <h3 className="font-sans font-bold text-lg sm:text-xl text-[#15095D] tracking-wide uppercase">
                {t("CHẤT LƯỢNG THỰC CHẤT", "UNCOMPROMISING QUALITY")}
              </h3>
              <p className="text-xs sm:text-sm text-[#4E567A] leading-relaxed">
                {t(
                  "Chất lượng không nên là đặc quyền của những thương hiệu xa xỉ. UNLO tập trung vào chất liệu sợi dài, định lượng cao và từng đường may chỉn chu để tạo nên những món đồ bền bỉ.",
                  "Quality should not be an exclusive luxury privilege. We prioritize long-staple cotton, heavyweight fabrics, and clean tailoring to create timeless wardrobe staples."
                )}
              </p>
            </div>

            {/* 02. MINH BẠCH */}
            <div className="rounded-3xl bg-white border border-[#DCE0E7] p-8 space-y-4 hover:border-[#32259B] transition-all hover:shadow-md group">
              <div className="flex items-center justify-between">
                <span className="font-serif font-black text-4xl text-[#15095D]/20 group-hover:text-[#32259B] transition-colors">
                  02
                </span>
                <div className="w-10 h-10 rounded-2xl bg-[#EFF2F9] text-[#15095D] grid place-items-center group-hover:scale-110 transition-transform">
                  <Eye className="w-5 h-5 text-[#32259B]" />
                </div>
              </div>
              <h3 className="font-sans font-bold text-lg sm:text-xl text-[#15095D] tracking-wide uppercase">
                {t("MINH BẠCH NGUỒN GỐC", "RADICAL TRANSPARENCY")}
              </h3>
              <p className="text-xs sm:text-sm text-[#4E567A] leading-relaxed">
                {t(
                  "Giá trị cần được nhìn thấy rõ ràng. UNLO công khai thông tin xưởng sản xuất, định lượng vải và các yếu tố bóc tách chi phí để bạn luôn an tâm với lựa chọn của mình.",
                  "True value must be clearly visible. UNLO openly discloses partner factories, fabric GSMs, and exact cost breakdowns so you always know what you pay for."
                )}
              </p>
            </div>

            {/* 03. GIÁ CẢ XỨNG ĐÁNG */}
            <div className="rounded-3xl bg-white border border-[#DCE0E7] p-8 space-y-4 hover:border-[#32259B] transition-all hover:shadow-md group">
              <div className="flex items-center justify-between">
                <span className="font-serif font-black text-4xl text-[#15095D]/20 group-hover:text-[#32259B] transition-colors">
                  03
                </span>
                <div className="w-10 h-10 rounded-2xl bg-[#EFF2F9] text-[#15095D] grid place-items-center group-hover:scale-110 transition-transform">
                  <HeartHandshake className="w-5 h-5 text-[#32259B]" />
                </div>
              </div>
              <h3 className="font-sans font-bold text-lg sm:text-xl text-[#15095D] tracking-wide uppercase">
                {t("GIÁ CẢ XỨNG ĐÁNG", "HONEST FACTORY PRICING")}
              </h3>
              <p className="text-xs sm:text-sm text-[#4E567A] leading-relaxed">
                {t(
                  "Ai cũng xứng đáng được tiếp cận sản phẩm chất lượng cao với mức giá công bằng. Bằng mô hình M2C loại bỏ khâu trung gian, chúng tôi đưa giá xuất xưởng đến tận tay bạn.",
                  "Everyone deserves access to premium essentials at a fair price. By connecting directly with mills, we cut out middleman markups to deliver true factory pricing."
                )}
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================
            4. SỨ MỆNH (2 Khối So Le Kèm Ảnh Xưởng Chuẩn Quince)
            ================================================================ */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#625FBC]">
              {t("SỨ MỆNH CỦA CHÚNG TÔI", "OUR MISSION")}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[#15095D]">
              {t("Kiến Tạo Thời Trang Tử Tế", "Crafting Responsible Fashion")}
            </h2>
          </div>

          <div className="space-y-16">
            {/* Block 1: Trân Trọng Người Lao Động */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#EB6D48]">
                  {t("SỨ MỆNH 01", "MISSION 01")}
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-[#15095D] leading-tight">
                  {t("Kiến Tạo Giá Trị Từ Sự Tử Tế", "Creating Value Through Care")}
                </h3>
                <p className="text-sm sm:text-base text-[#4E567A] leading-relaxed sm:leading-8">
                  {t(
                    "UNLO tin rằng một sản phẩm chất lượng với mức giá hợp lý không nên được tạo nên từ sự đánh đổi quyền lợi của người lao động. Đằng sau mỗi chiếc áo là công sức của những người thợ xứng đáng được trân trọng. Vì vậy, chúng tôi chỉ hợp tác với các xưởng sản xuất có trách nhiệm, đảm bảo điều kiện làm việc an toàn và công bằng.",
                    "We believe fair pricing should never come at the expense of factory workers' rights. Behind every garment are skilled craftspeople who deserve dignified working conditions, fair wages, and ethical environments."
                  )}
                </p>
              </div>

              <div className="rounded-3xl overflow-hidden border border-[#DCE0E7] shadow-sm bg-[#EFF2F9]">
                <img
                  src="/assets/img/quince-sustainability.jpg"
                  alt="Thợ may lành nghề tại xưởng đối tác UNLO"
                  className="w-full h-72 sm:h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Block 2: So Le - Minh Bạch */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              <div className="rounded-3xl overflow-hidden border border-[#DCE0E7] shadow-sm bg-[#EFF2F9] order-last lg:order-first">
                <img
                  src="/assets/img/quince-transparency.jpg"
                  alt="Đôi tay người thợ may tỉ mỉ khâu từng thớ vải"
                  className="w-full h-72 sm:h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#32259B]">
                  {t("SỨ MỆNH 02", "MISSION 02")}
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-[#15095D] leading-tight">
                  {t("Minh Bạch Trong Từng Giá Trị", "Transparency in Every Detail")}
                </h3>
                <p className="text-sm sm:text-base text-[#4E567A] leading-relaxed sm:leading-8">
                  {t(
                    "Khách hàng có quyền biết rõ chiếc áo mình mặc đến từ đâu, làm từ sợi vải gì và từng đồng tiền bỏ ra được cấu thành như thế nào. Chúng tôi không muốn bạn trả tiền cho sự hào nhoáng vô nghĩa, mà muốn bạn trân trọng những giá trị bền vững và thiết thực.",
                    "You have the right to know where your garments come from, what yarns are woven into them, and how every cent is accounted for. We never want you paying for inflated marketing, but for real lasting craft."
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            5. BIỂU ĐỒ SO SÁNH GIÁ (DẠNG CHART CHUẨN QUINCE)
            ================================================================ */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#625FBC]">
              {t("TỐI ƯU CHI PHÍ", "COST OPTIMIZATION")}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[#15095D]">
              {t("Cách UNLO Giữ Mức Giá Thực Tại Xưởng", "How UNLO Keeps Factory Direct Pricing")}
            </h2>
            <p className="text-xs sm:text-base text-[#4E567A] leading-relaxed">
              {t(
                "Biểu đồ đối chiếu thực tế chi phí xuất xưởng của UNLO so với các thương hiệu bán lẻ truyền thống.",
                "Real comparative breakdown of UNLO factory direct pricing versus traditional retail brands."
              )}
            </p>
          </div>

          <div className="rounded-3xl border border-[#DCE0E7] bg-white p-6 sm:p-10 shadow-xs">
            <AboutPriceComparisonChart />
          </div>

          <div className="text-center pt-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#15095D] hover:bg-[#1F0C85] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              <span>{t("Khám Phá Toàn Bộ Sản Phẩm", "Explore All Products")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <NullFooter />
    </div>
  );
}
