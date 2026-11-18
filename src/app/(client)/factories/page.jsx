"use client";

import Link from "next/link";
import { MapPin, ShieldCheck, CheckCircle2, ArrowRight, Factory } from "lucide-react";
import NullHeader from "@/components/null/NullHeader";
import NullFooter from "@/components/null/NullFooter";
import { UNLO_FACTORIES } from "@/lib/unloFactories";
import { getProductsByFactorySlug } from "@/lib/unloCatalog";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Chuẩn hóa Tech Pack",
    desc: "Công khai thành phần sợi/da, định lượng GSM, độ dày và dung sai kích thước.",
  },
  {
    step: "02",
    title: "Tuyển chọn Xưởng Tier-1 OEM",
    desc: "Chỉ hợp tác nhà máy có chứng chỉ xuất khẩu Nhật Bản, Đức, Bắc Âu (LWG, OEKO-TEX, ISO).",
  },
  {
    step: "03",
    title: "Kiểm định QC Lab 12 bước",
    desc: "Nghiệm thu đường may, độ bền kéo, khóa YKK & bền màu theo chuẩn AQL 2.5 trước xuất kho.",
  },
  {
    step: "04",
    title: "Đẩy đơn trực tiếp về xưởng",
    desc: "Khách đặt hàng → xưởng đóng gói và giao thẳng, cắt bỏ hoàn toàn chi phí mặt bằng & đại lý.",
  },
];

export default function FactoriesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15095D]">
      <NullHeader />

      <main className="flex-1 max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 space-y-14">
        {/* Hero Band — Celestial Indigo */}
        <section className="rounded-3xl bg-gradient-to-br from-[#15095D] via-[#1F0C85] to-[#0B2056] text-[#FCFDF1] p-8 sm:p-14 space-y-4 relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#625FBC]/35 blur-3xl"
          />
          <p className="unlo-display-en text-[11px] sm:text-xs tracking-[0.14em] text-[#BBC2DD] relative">
            FACTORY PASSPORT · DIRECT M2C
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight max-w-3xl text-[#FCFDF1] relative">
            Hộ Chiếu Nhà Máy — Minh Bạch Nguồn Gốc Thay Cho Logo
          </h1>
          <p className="text-sm sm:text-base text-[#DCE0E7]/90 max-w-2xl leading-relaxed relative">
            Mỗi sản phẩm tại UNLO đều gắn liền với một nhà máy đối tác cấp 1 (Tier-1 OEM) tại Việt Nam. Xem năng lực dây chuyền, chứng chỉ quốc tế và mua gộp cùng xưởng để tiết kiệm phí vận chuyển.
          </p>
        </section>

        {/* 4-Step Verification Process */}
        <section className="space-y-6">
          <div className="space-y-1">
            <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#625FBC]">
              TRUST-TECH STANDARD
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#15095D]">
              Quy Trình Xác Thực &amp; Kiểm Định Tại Nguồn
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS_STEPS.map((p) => (
              <div
                key={p.step}
                className="rounded-2xl bg-[#EFF2F9] border border-[#DCE0E7] p-6 space-y-2.5"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#15095D] text-[#FCFDF1] font-mono text-xs font-bold">
                  {p.step}
                </span>
                <h3 className="text-sm font-bold text-[#15095D]">{p.title}</h3>
                <p className="text-xs text-[#4E567A] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Factory Directory Grid */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-1">
              <p className="unlo-display-en text-[11px] tracking-[0.14em] text-[#625FBC]">
                VERIFIED PARTNERS
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#15095D]">
                Hồ Sơ {UNLO_FACTORIES.length} Nhà Máy Đối Tác Đã Xác Thực
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {UNLO_FACTORIES.map((factory) => {
              const count = getProductsByFactorySlug(factory.slug).length;
              return (
                <article
                  key={factory._id}
                  className="rounded-3xl border border-[#DCE0E7] bg-white overflow-hidden flex flex-col shadow-xs hover:border-[#9EA1D2] transition-colors"
                >
                  <div className="aspect-[16/9] bg-[#EFF2F9] relative overflow-hidden">
                    <img
                      src={factory.coverImage}
                      alt={factory.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#15095D]/90 text-[#FCFDF1] text-xs font-semibold backdrop-blur-sm">
                      <Factory className="w-3.5 h-3.5 text-[#BBC2DD]" aria-hidden="true" />
                      {factory.code}
                    </span>
                    <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#FCFDF1]/95 text-[#15095D] text-xs font-bold tabular-nums">
                      QC {factory.qcPassRate}%
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
                    <div className="space-y-3">
                      <p className="text-xs text-[#4E567A] inline-flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#443EB1]" aria-hidden="true" />
                        <span>{factory.location}</span>
                        <span>· Thành lập {factory.yearEstablished}</span>
                      </p>

                      <h3 className="font-serif text-2xl font-semibold text-[#15095D] leading-snug">
                        {factory.name}
                      </h3>

                      <p className="text-xs font-bold text-[#32259B] uppercase tracking-wide">
                        {factory.specialty}
                      </p>

                      <p className="text-sm text-[#4E567A] leading-relaxed">
                        {factory.ndaTrackRecord}
                      </p>

                      {/* Key Stats */}
                      <div className="grid grid-cols-3 gap-2.5 pt-1">
                        <div className="rounded-2xl bg-[#EFF2F9] p-3 text-center">
                          <p className="font-mono text-base font-bold text-[#15095D] tabular-nums">
                            {factory.yearsExperience} năm
                          </p>
                          <p className="text-[11px] text-[#4E567A]">Kinh nghiệm</p>
                        </div>
                        <div className="rounded-2xl bg-[#EFF2F9] p-3 text-center">
                          <p className="font-mono text-base font-bold text-[#15095D] tabular-nums">
                            {factory.monthlyCapacity.split(" ")[0]}
                          </p>
                          <p className="text-[11px] text-[#4E567A]">SP / tháng</p>
                        </div>
                        <div className="rounded-2xl bg-[#FCFDF1] border border-[#DCE0E7] p-3 text-center">
                          <p className="font-mono text-base font-bold text-[#32259B] tabular-nums">
                            {count} mẫu
                          </p>
                          <p className="text-[11px] text-[#4E567A]">Đang mở bán</p>
                        </div>
                      </div>

                      {/* Certifications */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {factory.certifications.map((c) => (
                          <span
                            key={c.code}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EFF2F9] border border-[#DCE0E7] text-[11px] font-semibold text-[#15095D]"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[#32259B]" aria-hidden="true" />
                            {c.code}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#EFF2F9]">
                      <span className="text-xs text-[#4E567A] inline-flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#32259B]" />
                        Đã kiểm định thực tế tại xưởng
                      </span>
                      <Link
                        href={`/factories/${factory.slug}`}
                        className="inline-flex items-center gap-2 h-10 px-5 rounded-full unlo-pill-primary text-xs font-bold uppercase tracking-[0.08em]"
                      >
                        Xem Hộ Chiếu Xưởng
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <NullFooter />
    </div>
  );
}
