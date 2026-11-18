"use client";

import Link from "next/link";
import { User, Users, Factory, ArrowRight, Sparkles } from "lucide-react";

export const AUDIENCE_PATHS = [
  {
    id: "consumer",
    title: "Người mua lẻ",
    desc: "Đồ cơ bản không logo phô trương, thông số vải minh bạch, thêu tên & monogram tinh tế.",
    cta: "Khám phá tủ đồ cơ bản",
    href: "/products",
    icon: User,
    peekImgs: [
      "/assets/img/p-tee-250.jpg",
      "/assets/img/p-hoodie.jpg",
      "/assets/img/p-tote.jpg",
    ],
  },
  {
    id: "business",
    title: "CLB & Doanh nghiệp",
    desc: "Gom size online, chiết khấu giá xưởng từ 10 sản phẩm (-15% đến -30%), thêu vi tính 14 mũi/inch, QC trước khi giao.",
    cta: "Nhận báo giá B2B",
    href: "/b2b",
    icon: Users,
    peekImgs: [
      "/assets/img/p-oxford.jpg",
      "/assets/img/p-hoodie.jpg",
      "/assets/img/p-tee-den.jpg",
    ],
  },
  {
    id: "factory",
    title: "Xưởng sản xuất",
    desc: "Bán trực tiếp các lô nhỏ đã được gom đơn, không tốn chi phí trung gian và marketing, đối soát 18% phí sàn minh bạch.",
    cta: "Xem hồ sơ xưởng",
    href: "/factories",
    icon: Factory,
    peekImgs: [
      "/assets/img/x-tho-may.jpg",
      "/assets/img/x-gia-treo.jpg",
      "/assets/img/x-ke-len.jpg",
    ],
  },
];

export default function AudienceGateways() {
  return (
    <section className="pt-10 sm:pt-14 pb-8 space-y-12">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <p className="text-xs sm:text-[13px] tracking-[0.2em] text-[#625FBC]">
            Bạn là ai
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#15095D] tracking-tight">
            Chọn đúng ô, UNLO dẫn đường
          </h2>
          <p className="text-xs sm:text-sm text-[#4E567A]">
            Tối ưu trải nghiệm phù hợp cho từng nhu cầu mua sắm và sản xuất
          </p>
        </div>

        {/* 3 Gateway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AUDIENCE_PATHS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group relative bg-white rounded-3xl p-7 border border-[#DCE0E7] shadow-sm hover:shadow-xl hover:border-[#32259B] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#EFF2F9] text-[#15095D] grid place-items-center group-hover:bg-[#15095D] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#15095D] group-hover:text-[#32259B] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4E567A] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 space-y-4">
                  {/* Hover Peek Thumbnails */}
                  <div className="flex items-center gap-2 pt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    {item.peekImgs.map((imgSrc, i) => (
                      <div
                        key={i}
                        className="w-16 h-20 rounded-xl overflow-hidden bg-[#EFF2F9] border border-[#BBC2DD]/40 shrink-0 transform group-hover:-translate-y-1 transition-transform"
                        style={{ transitionDelay: `${i * 60}ms` }}
                      >
                        <img
                          src={imgSrc}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#15095D] group-hover:text-[#32259B] pt-2">
                    <span>{item.cta}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Infinite Marquee Strip */}
      <div className="w-full overflow-hidden bg-[#15095D] text-[#EFF2F9] py-3.5 select-none border-y border-white/10">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-6 text-xs sm:text-sm font-semibold tracking-widest uppercase px-6"
              >
                <span>UNLO ÁO THUN</span>
                <span className="text-[#9EA1D2]">✦</span>
                <span>MADE IN VIETNAM SƠ MI</span>
                <span className="text-[#9EA1D2]">✦</span>
                <span>HONEST BASICS HOODIE</span>
                <span className="text-[#9EA1D2]">✦</span>
                <span>FACTORY DIRECT QUẦN KAKI</span>
                <span className="text-[#9EA1D2]">✦</span>
                <span>SIMPLY YOURS TÚI CANVAS</span>
                <span className="text-[#9EA1D2]">✦</span>
              </span>
            ))}
        </div>
      </div>
    </section>
  );
}
