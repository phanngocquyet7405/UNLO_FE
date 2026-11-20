"use client";

import { Star, CheckCircle } from "lucide-react";
import { useLanguage } from "@/i18n/useLanguage";

const TESTIMONIALS = [
  {
    id: "rev-1",
    author: "Thu Trang (CLB FTU)",
    verified: true,
    rating: 5,
    titleVi: "Chất nỉ bông dày dặn, form boxy cực chuẩn",
    titleEn: "Heavyweight fleece, flawless boxy fit",
    quoteVi:
      "Đặt 60 áo hoodie cho ban đối ngoại, vải cầm rất đầm tay, hình thêu vi tính sắc nét từng đường chỉ. Mức giá xuất xưởng tốt hơn hẳn các xưởng lẻ ngoài.",
    quoteEn:
      "Ordered 60 hoodies for our student union. The fabric feels substantial, and the monogram embroidery is pin-sharp. Direct factory pricing was unbeatable.",
    itemVi: "Hoodie Nỉ Bông 360 GSM",
    itemEn: "360 GSM Fleece Hoodie",
    img: "/assets/img/p-hoodie.jpg",
  },
  {
    id: "rev-2",
    author: "Hoàng Nam (Tech Lead)",
    verified: true,
    rating: 5,
    titleVi: "Áo thun cơ bản tốt nhất từng mặc",
    titleEn: "Best basic tee I have owned",
    quoteVi:
      "Vải Cotton Supima 250gsm dệt kim nguyên khối không đường may sườn. Giặt máy hơn 15 lần cổ áo vẫn phẳng phiu không bị bai dão.",
    quoteEn:
      "Supima Cotton 250gsm with seamless knit. After 15+ machine washes, the collar remains crisp without any stretching.",
    itemVi: "Áo Thun Cotton Supima 250 GSM",
    itemEn: "Supima Cotton 250 GSM Tee",
    img: "/assets/img/p-tee-250.jpg",
  },
  {
    id: "rev-3",
    author: "Minh Châu (Designer)",
    verified: true,
    rating: 5,
    titleVi: "Minh bạch chi phí, form tối giản đúng gu",
    titleEn: "Transparent pricing, clean minimalist aesthetic",
    quoteVi:
      "Không logo phô trương, chỉ có sự chỉn chu của chất liệu Linen mộc. Nhìn vào bảng bóc tách chi phí thấy UNLO rất đàng hoàng và tử tế.",
    quoteEn:
      "No loud logos, just pure linen craft. Seeing the transparent cost breakdown makes UNLO truly trustworthy.",
    itemVi: "Sơ Mi 100% European Linen",
    itemEn: "100% European Linen Shirt",
    img: "/assets/img/p-so-mi-denim.jpg",
  },
  {
    id: "rev-4",
    author: "Khánh Linh",
    verified: true,
    rating: 5,
    titleVi: "Đóng gói gọn gàng, thêu tên cá nhân rất đẹp",
    titleEn: "Thoughtful packaging, exquisite monogram",
    quoteVi:
      "Túi tote vải Canvas 16oz siêu chắc, khóa kéo YKK kéo êm ru. Phần thêu tên cá nhân hóa làm quà tặng đồng nghiệp ai cũng khen.",
    quoteEn:
      "Heavyweight 16oz canvas tote with butter-smooth YKK zipper. The personalized embroidery made the perfect team gift.",
    itemVi: "Túi Tote Canvas 16oz Khóa Kéo YKK",
    itemEn: "16oz Canvas Tote with YKK Zipper",
    img: "/assets/img/p-tote.jpg",
  },
];

export default function CustomerTestimonials() {
  const { lang, t } = useLanguage();

  return (
    <section
      aria-label="Đánh giá từ khách hàng"
      className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-20 space-y-10"
    >
      {/* Title & Subtitle theo đúng yêu cầu DOCX (viết thường quote) */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[#15095D]">
          {t("ĐÁNH GIÁ SẢN PHẨM", "CUSTOMER REVIEWS")}
        </h2>
        {/* Câu quote nhỏ theo đúng văn bản docx: viết thường */}
        <p className="text-xs sm:text-base text-[#4E567A]">
          {t(
            "Được đánh giá ★ 4.5 bởi 1.000+ khách hàng/doanh nghiệp",
            "Rated ★ 4.5 by 1,000+ individual and corporate clients"
          )}
        </p>
      </div>

      {/* 4 Review Cards (Layout Ersa Nails) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {TESTIMONIALS.map((rev) => {
          const title = lang === "en" ? rev.titleEn : rev.titleVi;
          const quote = lang === "en" ? rev.quoteEn : rev.quoteVi;
          const item = lang === "en" ? rev.itemEn : rev.itemVi;

          return (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-[#DCE0E7] p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                {/* Product thumbnail strip */}
                <div className="w-full h-44 rounded-xl overflow-hidden bg-[#EFF2F9]">
                  <img
                    src={rev.img}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 text-[#EB6D48] pt-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Author & Verified */}
                <div className="flex items-center gap-1.5 text-xs text-[#15095D] font-bold">
                  <span>{rev.author}</span>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#1D7A5F] bg-[#E8F5E9] px-1.5 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      <span>{t("Đã xác thực", "Verified")}</span>
                    </span>
                  )}
                </div>

                {/* Title & Quote */}
                <h3 className="font-sans font-bold text-xs sm:text-sm text-[#15095D] leading-snug">
                  {title}
                </h3>
                <p className="text-xs text-[#4E567A] leading-relaxed line-clamp-4">
                  &ldquo;{quote}&rdquo;
                </p>
              </div>

              {/* Tagged product */}
              <div className="pt-3 border-t border-[#DCE0E7]/60 text-[11px] font-semibold text-[#625FBC] truncate">
                {item}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
