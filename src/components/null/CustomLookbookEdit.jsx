"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/i18n/useLanguage";

const LOOKBOOK_SETS = [
  {
    id: "polo",
    tabVi: "POLO",
    tabEn: "POLO",
    captionVi: "Thanh lịch nơi công sở, tự do cuối tuần.",
    captionEn: "Refined office casual, effortless weekend.",
    link: "/custom?type=polo",
    cards: [
      { img: "/assets/categories/ao-polo.png", label: "UNLO / THU ĐÔNG / 01" },
      { img: "/assets/img/ed-beige-tee.jpg", label: "UNLO / THU ĐÔNG / 02" },
      { img: "/assets/img/cut-cream.webp", label: "UNLO / THU ĐÔNG / 03" },
    ],
  },
  {
    id: "sweater",
    tabVi: "SWEATER",
    tabEn: "SWEATER",
    captionVi: "Ấm êm và mềm mại cho ngày trở gió.",
    captionEn: "Soft warmth for chilly morning breeze.",
    link: "/custom?type=sweater",
    cards: [
      { img: "/assets/categories/ao-ni-len.png", label: "UNLO / THU ĐÔNG / 01" },
      { img: "/assets/img/p-sweat-hong.jpg", label: "UNLO / THU ĐÔNG / 02" },
      { img: "/assets/img/p-sweat.jpg", label: "UNLO / THU ĐÔNG / 03" },
    ],
  },
  {
    id: "hoodie",
    tabVi: "HOODIE",
    tabEn: "HOODIE",
    captionVi: "Free Weekend, cùng nhau dạo phố.",
    captionEn: "Free Weekend, layered together.",
    link: "/custom?type=hoodie",
    cards: [
      { img: "/assets/img/p-so-mi-denim.jpg", label: "UNLO / THU ĐÔNG / 01" },
      { img: "/assets/img/p-hoodie.jpg", label: "UNLO / THU ĐÔNG / 02" },
      { img: "/assets/img/custom/autumn-model.webp", label: "UNLO / THU ĐÔNG / 03" },
    ],
  },
  {
    id: "ao-khoac",
    tabVi: "ÁO KHOÁC",
    tabEn: "JACKET",
    captionVi: "Thêm lớp chắn gió, trọn vẹn phong cách.",
    captionEn: "Extra wind layer, complete confident style.",
    link: "/custom?type=jacket",
    cards: [
      { img: "/assets/categories/ao-khoac.png", label: "UNLO / THU ĐÔNG / 01" },
      { img: "/assets/img/ed-trench.jpg", label: "UNLO / THU ĐÔNG / 02" },
      { img: "/assets/img/custom/winter-model.webp", label: "UNLO / THU ĐÔNG / 03" },
    ],
  },
];

export default function CustomLookbookEdit() {
  const { lang, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(2); // Mặc định mở Hoodie (Set 3) như mẫu ref

  const currentDate = new Date().toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const activeSet = LOOKBOOK_SETS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : LOOKBOOK_SETS.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < LOOKBOOK_SETS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      aria-label="UNLO Edit - Phối đồ và cá nhân hóa"
      className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16"
    >
      {/* Khung thẻ chính chuẩn tỉ lệ và tông màu ấm từ mẫu tham chiếu */}
      <div className="relative rounded-3xl bg-[#F7F4EE] border border-[#E8E2D5] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        {/* NỬA TRÊN: Nội dung biên tập bên trái & Quạt ảnh Polaroid bên phải */}
        <div className="p-6 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Cột trái: Tích nhỏ, Tiêu đề đôi, Phụ đề, Nút CTA */}
            <div className="lg:col-span-5 space-y-5">
              {/* Tích nhỏ góc trái theo ref (Image 2): UNLO EDIT | THU / 2026 */}
              <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#15095D]">
                <span>UNLO EDIT</span>
                <span className="text-[#8C93A8]">|</span>
                <span>THU / 2026</span>
              </div>

              {/* Title kép chuẩn ref: Thêm lớp. (đậm), Thêm chất. (viền rỗng) */}
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#15095D] leading-[1.05]">
                {t("Thêm lớp.", "More layers.")} <br />
                <span
                  className="font-light text-transparent"
                  style={{
                    WebkitTextStroke: "1.5px #15095D",
                  }}
                >
                  {t("Thêm chất.", "More texture.")}
                </span>
              </h2>

              {/* Subtitle chuẩn ref (Image 2) */}
              <p className="text-sm sm:text-base text-[#4E567A] leading-relaxed max-w-sm">
                {t(
                  "Một chiếc hoodie quen. Một lớp gió nhẹ. Một dáng denim mình thích. Mùa thu, cứ mặc theo cách bạn.",
                  "A familiar hoodie. A crisp breeze. The denim fit you love. In autumn, layer your style with quiet confidence."
                )}
              </p>

              {/* Nút Tìm bản phối của bạn & Dòng nhỏ Khám phá sản phẩm */}
              <div className="space-y-3 pt-2">
                <Link
                  href={activeSet.link}
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#15095D] hover:bg-[#1F0C85] text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <span>{t("TÌM BẢN PHỐI CỦA BẠN", "FIND YOUR LOOK")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15095D]/80 hover:text-[#15095D] transition-colors"
                  >
                    <span>{t("Khám phá sản phẩm", "Explore products")}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Cột phải: 3 Polaroid fanned photos + Thanh điều khiển trượt (Không bị che lấp) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              {/* VÙNG QUẠT ẢNH POLAROID: Giới hạn chiều cao an toàn để không đè xuống dưới */}
              <div className="relative h-[230px] sm:h-[280px] w-full max-w-[480px] mx-auto flex items-center justify-center">
                {activeSet.cards.map((card, i) => {
                  // Cấu hình xoay và vị trí so le 3 thẻ polaroid chuẩn ref
                  const configs = [
                    {
                      rot: "-rotate-8 -translate-x-14 sm:-translate-x-24 translate-y-3",
                      z: "z-10",
                      scale: "scale-90",
                    },
                    {
                      rot: "-rotate-1 translate-y-0",
                      z: "z-20",
                      scale: "scale-100 shadow-2xl",
                    },
                    {
                      rot: "rotate-8 translate-x-14 sm:translate-x-24 translate-y-3",
                      z: "z-10",
                      scale: "scale-90",
                    },
                  ];
                  const cfg = configs[i] || configs[1];

                  return (
                    <div
                      key={`${activeSet.id}-${i}`}
                      className={`absolute bg-white p-2.5 sm:p-3 pb-6 sm:pb-7 rounded-xl border border-black/5 transition-all duration-300 ${cfg.rot} ${cfg.z} ${cfg.scale}`}
                      style={{
                        width: "165px",
                        maxWidth: "44vw",
                      }}
                    >
                      <div className="aspect-[4/5] overflow-hidden rounded-lg bg-[#EFF2F9]">
                        <img
                          src={card.img}
                          alt={card.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[8px] sm:text-[9px] font-bold tracking-widest text-[#8C93A8]">
                        <span>{card.label}</span>
                        <span>0{i + 1}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* THANH ĐIỀU KHIỂN CHUẨN REF: 01 / 04 [Caption] + Progress Bar + 2 Nút Mũi Tên Tròn */}
              <div className="mt-6 pt-4 flex items-center justify-between gap-4 border-t border-[#E8E2D5]/60">
                {/* Số thứ tự đỏ + Tên outfit */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-bold text-xs sm:text-sm text-[#C52222] tabular-nums shrink-0">
                    0{activeIndex + 1} <span className="text-[#8C93A8] font-normal">/ 0{LOOKBOOK_SETS.length}</span>
                  </span>
                  <span className="text-xs text-[#15095D] font-medium truncate">
                    {lang === "en" ? activeSet.captionEn : activeSet.captionVi}
                  </span>
                </div>

                {/* Thanh tiến trình + 2 nút tròn mũi tên */}
                <div className="flex items-center gap-3 shrink-0">
                  {/* Progress dashes */}
                  <div className="hidden sm:flex items-center gap-1 w-20">
                    {LOOKBOOK_SETS.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-0.5 rounded-full transition-all duration-300 ${
                          idx === activeIndex
                            ? "bg-[#15095D] w-8"
                            : "bg-[#DCE0E7] w-3"
                        }`}
                      />
                    ))}
                  </div>

                  {/* 2 Nút mũi tên tròn chuẩn ref */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Xem bản phối trước"
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#DCE0E7] bg-white hover:bg-[#15095D] hover:text-white text-[#15095D] flex items-center justify-center transition-colors shadow-xs active:scale-95"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Xem bản phối tiếp theo"
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#DCE0E7] bg-white hover:bg-[#15095D] hover:text-white text-[#15095D] flex items-center justify-center transition-colors shadow-xs active:scale-95"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DÒNG CUỐI CHUẨN REF: BẢN PHỐI CỦA BẠN → POLO → SWEATER → HOODIE → ÁO KHOÁC */}
        {/* Thiết kế các cột chia vạch dọc sát mép đáy y chang mẫu tham chiếu (Desktop dàn đều, Mobile cuộn ngang mượt) */}
        <div className="border-t border-[#E8E2D5] bg-[#F2EDE5]/50 flex items-stretch divide-x divide-[#E8E2D5] overflow-x-auto no-scrollbar">
          {/* Cột 1: Nhãn Bản Phối Của Bạn */}
          <div className="shrink-0 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-center sm:justify-start bg-transparent">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-[#15095D]/70 whitespace-nowrap">
              {t("BẢN PHỐI CỦA BẠN", "SIGNATURE LAYERS")}
            </span>
          </div>

          {/* Các cột lựa chọn: POLO, SWEATER, HOODIE, ÁO KHOÁC */}
          {LOOKBOOK_SETS.map((item, idx) => {
            const isSelected = idx === activeIndex;
            const label = lang === "en" ? item.tabEn : item.tabVi;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`flex-1 min-w-[120px] sm:min-w-0 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-3 transition-all group whitespace-nowrap shrink-0 sm:shrink ${
                  isSelected
                    ? "bg-[#15095D] text-white"
                    : "bg-transparent text-[#15095D] hover:bg-black/5"
                }`}
              >
                <span className="text-xs sm:text-sm font-bold tracking-wider uppercase">
                  {label}
                </span>
                <ArrowRight
                  className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${
                    isSelected ? "text-white" : "text-[#15095D]/60"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}