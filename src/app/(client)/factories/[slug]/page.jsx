import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Factory,
  Users,
  Gauge,
  Globe2,
  Quote,
} from "lucide-react";
import NullHeader from "@/components/null/NullHeader";
import NullFooter from "@/components/null/NullFooter";
import NullProductCard from "@/components/null/NullProductCard";
import { UNLO_FACTORIES, findFactoryBySlug } from "@/lib/unloFactories";
import { getProductsByFactorySlug } from "@/lib/unloCatalog";

export async function generateStaticParams() {
  return UNLO_FACTORIES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params: paramsPromise }) {
  const params = await paramsPromise;
  const factory = findFactoryBySlug(params?.slug);
  if (!factory) return { title: "Hồ Sơ Nhà Máy | UNLO" };
  return {
    title: `${factory.name} — Factory Passport | UNLO`,
    description: factory.ndaTrackRecord,
  };
}

export default async function FactoryPassportDetailPage({ params: paramsPromise }) {
  const params = await paramsPromise;
  const factory = findFactoryBySlug(params?.slug);
  if (!factory) notFound();

  const factoryProducts = getProductsByFactorySlug(factory.slug);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15095D]">
      <NullHeader />

      <main className="flex-1 max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-10 pt-7 sm:pt-10 pb-16 space-y-14 sm:space-y-18">
        {/* Breadcrumb */}
        <nav
          aria-label="Đường dẫn"
          className="flex items-center flex-wrap gap-1.5 text-xs text-[#4E567A]"
        >
          <Link href="/" className="hover:text-[#15095D]">
            Trang chủ
          </Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <Link href="/factories" className="hover:text-[#15095D]">
            Hồ Sơ Nhà Máy
          </Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="text-[#15095D] font-semibold">{factory.code}</span>
        </nav>

        {/* ================================================================
            1. KHU VỰC ĐỊNH DANH & XÁC THỰC (FACTORY HEADER + 4 KEY STATS)
            ================================================================ */}
        <section className="rounded-3xl overflow-hidden border border-[#DCE0E7] bg-white">
          <div className="relative h-[260px] sm:h-[360px] bg-[#15095D]">
            <img
              src={factory.coverImage}
              alt={factory.name}
              className="w-full h-full object-cover opacity-80"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#15095D] via-[#15095D]/40 to-transparent"
            />
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-9 sm:left-10 sm:right-10 text-[#FCFDF1] space-y-2">
              <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#BBC2DD]">
                FACTORY PASSPORT · VERIFIED TIER-1 OEM
              </p>
              <h1 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight">
                {factory.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#EFF2F9]/90 inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#BBC2DD]" aria-hidden="true" />
                {factory.location} · Chuyên môn: {factory.specialty}
              </p>
            </div>
          </div>

          {/* 4 Core Capacity Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#DCE0E7] bg-[#EFF2F9]">
            <div className="p-5 sm:p-6 space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#4E567A] inline-flex items-center gap-1.5">
                <Factory className="w-3.5 h-3.5 text-[#32259B]" /> Thành lập
              </p>
              <p className="font-serif text-xl sm:text-2xl font-bold text-[#15095D]">
                Năm {factory.yearEstablished}
              </p>
              <p className="text-xs text-[#4E567A]">{factory.yearsExperience} năm kinh nghiệm</p>
            </div>

            <div className="p-5 sm:p-6 space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#4E567A] inline-flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#32259B]" /> Quy mô nhân sự
              </p>
              <p className="font-serif text-xl sm:text-2xl font-bold text-[#15095D]">
                {factory.staffCount.split(" ")[0]} nghệ nhân
              </p>
              <p className="text-xs text-[#4E567A]">{factory.staffCount}</p>
            </div>

            <div className="p-5 sm:p-6 space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#4E567A] inline-flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-[#32259B]" /> Công suất tối đa
              </p>
              <p className="font-serif text-xl sm:text-2xl font-bold text-[#15095D] tabular-nums">
                {factory.monthlyCapacity}
              </p>
              <p className="text-xs text-[#4E567A]">Tỷ lệ đạt QC: {factory.qcPassRate}%</p>
            </div>

            <div className="p-5 sm:p-6 space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#4E567A] inline-flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-[#32259B]" /> Xuất khẩu chính
              </p>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {factory.exportMarkets.map((m) => (
                  <span
                    key={m.country}
                    className="px-2.5 py-0.5 rounded-full bg-white border border-[#DCE0E7] text-[11px] font-bold text-[#15095D] tabular-nums"
                  >
                    {m.country} ({m.share}%)
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            2. LỊCH SỬ GIA CÔNG & CHỨNG CHỈ QUỐC TẾ (TRACK RECORD)
            ================================================================ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
          <div className="lg:col-span-6 rounded-3xl bg-[#FCFDF1] border border-[#DCE0E7] p-7 sm:p-9 space-y-4">
            <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#625FBC]">
              TIER-1 OEM TRACK RECORD
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#15095D]">
              Hồ Sơ Đối Tác Toàn Cầu (Tuân Thủ NDA)
            </h2>
            <p className="text-sm sm:text-base text-[#15095D]/85 leading-relaxed">
              “{factory.ndaTrackRecord}”
            </p>
            <p className="text-xs text-[#4E567A] leading-relaxed pt-2 border-t border-[#DCE0E7]">
              Lưu ý bảo mật: UNLO sử dụng mã định danh xưởng kết hợp địa danh cụm công nghiệp thực tế để bảo vệ hợp đồng NDA với các tập đoàn quốc tế, nhưng luôn minh bạch 100% quy trình và chứng chỉ kiểm định.
            </p>
          </div>

          <div className="lg:col-span-6 rounded-3xl bg-[#EFF2F9] border border-[#DCE0E7] p-7 sm:p-9 space-y-4">
            <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#625FBC]">
              CERTIFICATIONS
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#15095D]">
              Hệ Thống Chứng Chỉ &amp; Tiêu Chuẩn Kiểm Định
            </h2>
            <div className="space-y-3">
              {factory.certifications.map((cert) => (
                <div
                  key={cert.code}
                  className="rounded-2xl bg-white border border-[#DCE0E7] p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#EFF2F9] text-[#32259B] grid place-items-center shrink-0">
                      <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#15095D]">{cert.code}</p>
                      <p className="text-xs text-[#4E567A]">{cert.label}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#FCFDF1] border border-[#DCE0E7] font-mono text-[10px] font-bold text-[#32259B] shrink-0">
                    #{cert.verifyId}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            3. BÊN TRONG DÂY CHUYỀN SẢN XUẤT (4 BƯỚC INSIDE THE FACTORY)
            ================================================================ */}
        <section className="space-y-7">
          <div className="space-y-1">
            <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#625FBC]">
              INSIDE THE FACTORY
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#15095D]">
              Bên Trong Dây Chuyền Sản Xuất (4 Công Đoạn)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {factory.productionSteps.map((st) => (
              <article
                key={st.step}
                className="rounded-3xl border border-[#DCE0E7] bg-white overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] bg-[#EFF2F9] relative overflow-hidden">
                  <img
                    src={st.image}
                    alt={st.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#15095D] text-[#FCFDF1] font-mono text-xs font-bold">
                    Bước {st.step}
                  </span>
                </div>
                <div className="p-5 space-y-2 flex-1">
                  <h3 className="font-serif text-lg font-semibold text-[#15095D] leading-snug">
                    {st.title}
                  </h3>
                  <p className="text-xs text-[#4E567A] leading-relaxed">{st.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================================================================
            4. GẶP GỠ NGƯỜI ĐỨNG ĐẦU KỸ THUẬT (THE MAKER'S STORY)
            ================================================================ */}
        <section className="rounded-3xl bg-gradient-to-br from-[#15095D] via-[#1F0C85] to-[#0B2056] text-[#FCFDF1] p-7 sm:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-[#9EA1D2]/50 shadow-2xl">
              <img
                src={factory.maker.avatar}
                alt={factory.maker.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-8 space-y-4">
            <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#BBC2DD]">
              THE MAKER&apos;S STORY
            </p>
            <Quote className="w-8 h-8 text-[#9EA1D2]/60" aria-hidden="true" />
            <blockquote className="font-serif italic text-xl sm:text-2xl leading-relaxed text-[#FCFDF1]">
              “{factory.maker.quote}”
            </blockquote>
            <div className="pt-2">
              <p className="text-sm font-bold text-[#FCFDF1]">{factory.maker.name}</p>
              <p className="text-xs text-[#BBC2DD]">{factory.maker.role}</p>
            </div>
          </div>
        </section>

        {/* ================================================================
            5. DANH MỤC SẢN PHẨM TỪ XƯỞNG NÀY (SHOP BY FACTORY)
            ================================================================ */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#625FBC]">
                SHOP BY FACTORY
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#15095D]">
                Sản Phẩm Sản Xuất Tại {factory.code}
              </h2>
              <p className="text-sm text-[#4E567A]">
                Mua gộp nhiều sản phẩm cùng xưởng trong một đơn hàng để đóng chung một kiện và tiết kiệm tối đa phí vận chuyển.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#EFF2F9] text-xs font-bold text-[#32259B]">
              <CheckCircle2 className="w-4 h-4" />
              {factoryProducts.length} sản phẩm xuất trực tiếp từ xưởng này
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {factoryProducts.map((product) => (
              <NullProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <NullFooter />
    </div>
  );
}
