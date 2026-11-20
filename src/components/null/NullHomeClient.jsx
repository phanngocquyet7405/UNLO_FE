"use client";

import { useState } from "react";
import NullHeader from "./NullHeader";
import NullFooter from "./NullFooter";
import SeasonalHeroVideoCarousel, {
  getSeasonIndexByCurrentMonth,
} from "./SeasonalHeroVideoCarousel";
import BrandMarquee from "./BrandMarquee";
import CategoryBrowser from "./CategoryBrowser";
import BlackFridayCountdown from "./BlackFridayCountdown";
import BestSellersSection from "./BestSellersSection";
import SeasonalCollectionsSection from "./SeasonalCollectionsSection";
import CustomLookbookEdit from "./CustomLookbookEdit";
import CustomerTestimonials from "./CustomerTestimonials";
import SupportChatbotDrawer from "./SupportChatbotDrawer";

/**
 * NullHomeClient:
 * Triển khai thứ tự trang chủ dưới cover chuẩn 100% theo yêu cầu DOC-04 trong FB_FLOW_WEB.docx:
 * 1) Cover 4 Mùa tràn viền tự chuyển cảnh (DOC-02)
 * 2) Thanh chạy chữ xanh sát đáy cover (DOC-02)
 * 3) Thanh tìm theo DANH MỤC SẢN PHẨM (CategoryBrowser - lưới 6x2 ảnh từ docx)
 * 4) BLACK FRIDAY (BlackFridayCountdown - 1 hàng tinh gọn kèm đếm ngược)
 * 5) BEST SELLING (HÀNG BÁN CHẠY: 3 mục NAM - NỮ - TRẺ EM, 4 ảnh/hàng x 2 hàng) + Nút "XEM TẤT CẢ DANH MỤC SẢN PHẨM"
 * 6) BỘ SƯU TẬP XUÂN - HẠ - THU - ĐÔNG (SeasonalCollectionsSection - lưới 2x2, font Climate Crisis)
 * 7) Khối Custom: UNLO EDIT — THÊM LỚP THÊM CHẤT — TÌM BẢN PHỐI (CustomLookbookEdit)
 * 8) ĐÁNH GIÁ SẢN PHẨM: "Được đánh giá ★ 4.5 bởi 1.000+ khách hàng/doanh nghiệp" (CustomerTestimonials)
 * 9) Footer: Logo UNLO + Đoạn giá trị triết lý + Hotline 0948586486 (NullFooter)
 */
export default function NullHomeClient() {
  const [currentSeasonIdx, setCurrentSeasonIdx] = useState(() =>
    getSeasonIndexByCurrentMonth()
  );

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen flex flex-col bg-[#FCFDF1] text-[#15095D]"
    >
      {/* Header chuẩn Opts 2: Overlay trong suốt trên cover, chuyển nền trắng khi cuộn */}
      <NullHeader
        overlay
        opts2
        showSeasonNav
        currentSeasonIdx={currentSeasonIdx}
        onSelectSeason={(idx) => setCurrentSeasonIdx(idx)}
      />

      <main className="flex-1 bg-[#FCFDF1]">
        {/* ================================================================
            1. HERO COVER 4 MÙA (Tự chuyển cảnh Xuân -> Hạ -> Thu -> Đông)
            ================================================================ */}
        <SeasonalHeroVideoCarousel
          currentSeasonIdx={currentSeasonIdx}
          onSeasonChange={(idx) => setCurrentSeasonIdx(idx)}
        />

        {/* ================================================================
            2. THANH CHẠY CHỮ XANH SÁT COVER (DOC-02)
            ================================================================ */}
        <BrandMarquee />

        {/* ================================================================
            3. THANH TÌM THEO DANH MỤC SẢN PHẨM (DOC-04 Mục 2: 12 danh mục 6x2)
            ================================================================ */}
        <CategoryBrowser />

        {/* ================================================================
            4. BLACK FRIDAY FLASH SALE (DOC-04 Mục 3: Thu về 1 hàng tinh gọn)
            ================================================================ */}
        <BlackFridayCountdown />

        {/* ================================================================
            5. BEST SELLING (HÀNG BÁN CHẠY: 3 Tab NAM - NỮ - TRẺ EM + Nút Xem tất cả)
            ================================================================ */}
        <BestSellersSection />

        {/* ================================================================
            6. BỘ SƯU TẬP XUÂN - HẠ - THU - ĐÔNG (DOC-04 Mục 6: Lưới 2x2, font Climate Crisis)
            ================================================================ */}
        <SeasonalCollectionsSection />

        {/* ================================================================
            7. KHỐI CUSTOM: THÊM LỚP THÊM CHẤT (DOC-04 Mục 7: Polaroid fan + Tìm bản phối)
            ================================================================ */}
        <CustomLookbookEdit />

        {/* ================================================================
            8. ĐÁNH GIÁ SẢN PHẨM (DOC-04 Mục 8: Quote viết thường theo docx)
            ================================================================ */}
        <CustomerTestimonials />
      </main>

      {/* ================================================================
          9. FOOTER UNLO (DOC-04 Mục 9: Logo + Đoạn giá trị + Hotline 0948586486)
          ================================================================ */}
      <NullFooter />

      {/* Chatbot hỗ trợ */}
      <SupportChatbotDrawer />
    </div>
  );
}
