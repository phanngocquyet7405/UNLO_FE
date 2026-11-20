"use client";

import { useState, useMemo, useEffect, useRef, startTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useCart } from "@/app/context/CartContext";
import { useLanguage } from "@/i18n/useLanguage";

/* ═══════════════════════════════════════════════════════════════════════════
   1. DATA CATALOGS & CONSTANTS (MATCHING GOOGLE DRIVE & DOC-05 4 PRODUCTS)
   ═══════════════════════════════════════════════════════════════════════════ */
const PRODUCTS = [
  {
    id: "tshirt",
    vi: "Áo T-shirt / Áo Phông",
    en: "T-Shirt / Tee",
    basePrice: 179000,
    oldPrice: 250000,
    thumb: "/assets/img/custom-drive/tshirt/249ac94577c278789d9ccfb256e2ecd6.jpg",
    badge: "Bán chạy"
  },
  {
    id: "sweater",
    vi: "Áo Sweater",
    en: "Sweater",
    basePrice: 299000,
    oldPrice: 399000,
    thumb: "/assets/img/custom-drive/sweater/20ee0452084491f94b9ca0edb964a6ea.jpg",
    badge: "Thu Đông"
  },
  {
    id: "hoodie",
    vi: "Áo Hoodie",
    en: "Hoodie",
    basePrice: 349000,
    oldPrice: 450000,
    thumb: "/assets/img/custom-drive/hoodie/7b276452f7868be8c685df6b34748efc.jpg",
    badge: "Hot Deal"
  },
  {
    id: "jacket",
    vi: "Áo Khoác Nỉ Bông",
    en: "Fleece Jacket",
    basePrice: 429000,
    oldPrice: 549000,
    thumb: "/assets/img/custom-drive/jacket/04909581d11f1f23ef8c803b9e27f349.jpg",
    badge: "Cao cấp"
  }
];

const FABRICS = [
  { id: "cotton", vi: "Cotton 100%", en: "100% Cotton", extra: 0, tag: "Dệt Compact 250gsm siêu mịn" },
  { id: "linen",  vi: "Linen",       en: "Linen",       extra: 30000, tag: "Sợi lanh tự nhiên thoáng khí" },
  { id: "wool",   vi: "Len cao cấp", en: "Fine Wool",   extra: 50000, tag: "Nỉ bông chân cua giữ ấm" }
];

const GARMENT_COLORS = [
  { id: "white", vi: "Trắng",     en: "White",    hex: "#FFFFFF", stroke: "#D1D5DB", shade: "#F1F3F6" },
  { id: "beige", vi: "Be",        en: "Beige",    hex: "#E8DFD1", stroke: "#CBBFA9", shade: "#DACFBE" },
  { id: "gray",  vi: "Xám",       en: "Gray",     hex: "#B8BCC2", stroke: "#959AA3", shade: "#A4A9B0" },
  { id: "navy",  vi: "Xanh than", en: "Navy",     hex: "#1B243B", stroke: "#0F1524", shade: "#131A2C" },
  { id: "black", vi: "Đen",       en: "Black",    hex: "#202126", stroke: "#111215", shade: "#15161A" }
];

const THREAD_COLORS = [
  { id: "indigo",   vi: "Chàm",      en: "Navy",      hex: "#1B245B" },
  { id: "ivory",    vi: "Trắng ngà", en: "Ivory",     hex: "#F4F1E6" },
  { id: "lavender", vi: "Oải hương", en: "Lavender",  hex: "#9B8EDB" },
  { id: "silver",   vi: "Bạc",       en: "Silver",    hex: "#B0B5BD" },
  { id: "black",    vi: "Đen",       en: "Black",     hex: "#18181B" }
];

const POSITIONS = [
  { id: "left_chest",   vi: "Ngực trái", en: "Left Chest",   view: "front",  top: "37%", left: "61%" },
  { id: "center_chest", vi: "Giữa ngực", en: "Center Chest", view: "front",  top: "40%", left: "50%" },
  { id: "hem",          vi: "Gấu áo",    en: "Bottom Hem",   view: "front",  top: "76%", left: "63%" },
  { id: "cuff",         vi: "Bo tay",    en: "Sleeve Cuff",  view: "sleeve", top: "64%", left: "50%" },
  { id: "back",         vi: "Mặt sau",   en: "Upper Back",   view: "back",   top: "34%", left: "50%" }
];

const SIZES = ["S", "M", "L", "XL"];
const VIEWS_ORDER = ["front", "back", "sleeve", "model"];

/* Preset SVG emblems as data URIs */
const PRESET_LOGOS = {
  star: `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 6 L61 39 L94 50 L61 61 L50 94 L39 61 L6 50 L39 39 Z" fill="#16115B"/><circle cx="50" cy="50" r="9" fill="#E85D2A"/></svg>')}`,
  crest: `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 8 L86 22 V52 C86 74 68 88 50 94 C32 88 14 74 14 52 V22 Z" fill="none" stroke="#16115B" stroke-width="6"/><text x="50" y="59" text-anchor="middle" font-family="Georgia,serif" font-weight="bold" font-size="24" fill="#16115B">UNLO</text></svg>')}`,
  wave: `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60"><path d="M8 35 Q 25 10, 42 35 T 76 35 T 112 35" fill="none" stroke="#16115B" stroke-width="7" stroke-linecap="round"/><path d="M18 47 Q 35 22, 52 47 T 86 47 T 106 47" fill="none" stroke="#E85D2A" stroke-width="5" stroke-linecap="round"/></svg>')}`
};

/* Real Photographic Assets Downloaded from Google Drive Folder */
const REAL_PHOTOS = {
  tshirt: {
    flat: {
      front: "/assets/img/custom-drive/tshirt/249ac94577c278789d9ccfb256e2ecd6.jpg",
      back: "/assets/img/custom-drive/tshirt/0d4ee66169da6c43f8249f5b072d9aab.jpg",
      sleeve: "/assets/img/custom-drive/tshirt/249ac94577c278789d9ccfb256e2ecd6.jpg",
    },
    model_female: {
      front: "/assets/img/custom-drive/tshirt/cdedd590c8e9eba1c92f43da8057ad29.jpg",
      back: "/assets/img/custom-drive/sweater/f273f193b44c2a491ba538281dc25cf7.jpg",
      sleeve: "/assets/img/custom-drive/tshirt/cdedd590c8e9eba1c92f43da8057ad29.jpg",
    },
    model_male: {
      front: "/assets/img/custom-drive/tshirt/cn-11134207-820l4-mfnpe9emig3wbf.webp",
      back: "/assets/img/custom-drive/tshirt/f0583cfe23a0df3a6a2db9c33af41de2.jpg",
      sleeve: "/assets/img/custom-drive/tshirt/cn-11134207-820l4-mfnqp8iu2ln043.webp",
    }
  },
  sweater: {
    flat: {
      front: "/assets/img/custom-drive/sweater/20ee0452084491f94b9ca0edb964a6ea.jpg",
      back: "/assets/img/custom-drive/sweater/cf7a96a808e432edf9e30c819de0205e.jpg",
      sleeve: "/assets/img/custom-drive/sweater/20ee0452084491f94b9ca0edb964a6ea.jpg",
    },
    model_female: {
      front: "/assets/img/custom-drive/sweater/20ee0452084491f94b9ca0edb964a6ea.jpg",
      back: "/assets/img/custom-drive/sweater/cf7a96a808e432edf9e30c819de0205e.jpg",
      sleeve: "/assets/img/custom-drive/sweater/20ee0452084491f94b9ca0edb964a6ea.jpg",
    },
    model_male: {
      front: "/assets/img/custom-drive/sweater/20ee0452084491f94b9ca0edb964a6ea.jpg",
      back: "/assets/img/custom-drive/sweater/f273f193b44c2a491ba538281dc25cf7.jpg",
      sleeve: "/assets/img/custom-drive/sweater/20ee0452084491f94b9ca0edb964a6ea.jpg",
    }
  },
  jacket: {
    flat: {
      front: "/assets/img/custom-drive/jacket/04909581d11f1f23ef8c803b9e27f349.jpg",
      back: "/assets/img/custom-drive/jacket/04909581d11f1f23ef8c803b9e27f349.jpg",
      sleeve: "/assets/img/custom-drive/jacket/8f1609fbe7c88eb8b5e1a848e02ea8dc.jpg",
    },
    model_female: {
      front: "/assets/img/custom-drive/jacket/907279857cdfd47807459960bb7c15ca.jpg",
      back: "/assets/img/custom-drive/jacket/907279857cdfd47807459960bb7c15ca.jpg",
      sleeve: "/assets/img/custom-drive/jacket/907279857cdfd47807459960bb7c15ca.jpg",
    },
    model_male: {
      front: "/assets/img/custom-drive/jacket/8f1609fbe7c88eb8b5e1a848e02ea8dc.jpg",
      back: "/assets/img/custom-drive/jacket/8f1609fbe7c88eb8b5e1a848e02ea8dc.jpg",
      sleeve: "/assets/img/custom-drive/jacket/8f1609fbe7c88eb8b5e1a848e02ea8dc.jpg",
    }
  },
  hoodie: {
    flat: {
      front: "/assets/img/custom/autumn-flat.webp",
      back: "/assets/img/custom-drive/hoodie/893d1ca65c498d3607fb746f8c1fa327.jpg",
      sleeve: "/assets/img/custom/autumn-flat.webp",
    },
    model_female: {
      front: "/assets/img/custom-drive/model_layer_lookbook.jpg",
      back: "/assets/img/custom-drive/hoodie/893d1ca65c498d3607fb746f8c1fa327.jpg",
      sleeve: "/assets/img/custom-drive/model_layer_lookbook.jpg",
    },
    model_male: {
      front: "/assets/img/custom-drive/hoodie/7b276452f7868be8c685df6b34748efc.jpg",
      back: "/assets/img/custom-drive/hoodie/893d1ca65c498d3607fb746f8c1fa327.jpg",
      sleeve: "/assets/img/custom-drive/hoodie/7b276452f7868be8c685df6b34748efc.jpg",
    }
  }
};

/* Fabric Close-up Photos from Subfolder */
const FABRIC_CLOSEUPS = [
  {
    id: "embroidery_stack",
    title: "Cận Cảnh Xấp Áo Thêu & Bo Vải",
    desc: "Đường kim mũi thêu sắc nét mật độ cao trên nền áo gập nỉ bông & cotton tiêu chuẩn OEM.",
    src: "/assets/img/custom-drive/macro_stack_detail.jpg"
  },
  {
    id: "cotton",
    title: "100% Cotton Chải Kỹ 250 GSM",
    desc: "Mặt vải dệt compact mịn màng, sợi dài chống xù lông, thấm hút mồ hôi tối ưu.",
    src: "/assets/img/custom-drive/fabrics/40acc0b309f6e1530f05b20fe4570e17.jpg"
  },
  {
    id: "fleece",
    title: "Nỉ Bông Chân Cua 420 GSM",
    desc: "Mặt trong cào bông êm ái, định lượng dày dặn đứng phom, giữ ấm vượt trội ngày lạnh.",
    src: "/assets/img/custom-drive/fabrics/67f58ed333cc030cdf166929dcbc9557.jpg"
  },
  {
    id: "rib",
    title: "Bo Cổ & Bo Cổ Tay Dệt Đôi",
    desc: "Bo viền cuốn sườn co giãn đàn hồi cao, chống bai dão qua 50+ lần giặt máy.",
    src: "/assets/img/custom-drive/fabrics/e7c7d6f0124310648837d5eaf15ae7d6.jpg"
  },
  {
    id: "oem",
    title: "Tiêu Chuẩn Hoàn Thiện Xuất Xưởng",
    desc: "Kiểm định đường may giấu chỉ, đường cắt la-de sắc nét, gắn tag mác chứng nhận không trung gian.",
    src: "/assets/img/custom-drive/fabrics/ec42e3952aadd2850fd2b0c171a3899f.jpg"
  }
];

const I18N = {
  vi: {
    backHome: "Quay lại Trang chủ",
    studioBadge: "Studio Cá Nhân Hóa",
    step1Nav: "Chọn sản phẩm",
    step2Nav: "Thiết kế riêng",
    step3Nav: "Đặt hàng",
    viewFront: "Mặt trước",
    viewBack: "Mặt sau",
    viewSleeve: "Ống tay áo",
    viewModel: "Người mẫu mặc",
    livePreview: "Xem trước trực tiếp",
    colorLabel: "Màu áo:",
    trust1: "Cam kết hình ảnh giống mô tả",
    trust2: "Hỗ trợ đổi trả 7 ngày",
    trust3: "Ưu đãi giảm giá xưởng",
    trust4: "Đội ngũ tư vấn 24/7",
    panelKicker: "THIẾT KẾ BẢN PHỐI CỦA BẠN",
    reviewCount: "128 đánh giá từ khách hàng",
    factoryPriceTag: "Giá trực tiếp từ xưởng",
    step1Title: "Chọn sản phẩm & chất liệu",
    productTypeLabel: "Dòng sản phẩm",
    formLabel: "Phom dáng (Unisex)",
    formOversized: "Form Rộng",
    formBoxy: "Form Boxy",
    fabricLabel: "Chất liệu vải",
    sizeLabel: "Kích cỡ",
    findSizeLink: "Tìm kích cỡ phù hợp / Bảng quy đổi",
    step2Title: "Nội dung cá nhân hóa",
    optATitle: "Thêu chữ cá nhân",
    optBTitle: "Tải thiết kế / Logo",
    embroideryTextLabel: "Nội dung thêu (Tối đa 12 ký tự)",
    fontLabel: "Kiểu chữ thêu",
    fontClassic: "Cổ điển",
    fontHandwriting: "Viết tay",
    fontModern: "Hiện đại",
    threadLabel: "Màu chỉ thêu",
    uploadBtnTitle: "Tải ảnh từ Máy / Google Drive / Thư viện",
    uploadBtnSub: "Hỗ trợ PNG tách nền, JPG, SVG (Tối đa 10MB)",
    sampleLibraryLabel: "Hoặc thử nhanh biểu tượng từ Thư viện UNLO:",
    presetStar: "Ngôi sao",
    presetCrest: "Huy hiệu",
    presetWave: "Sóng tối giản",
    logoSizeLabel: "Kích thước hình:",
    step3Title: "Vị trí cá nhân hóa",
    autoAngleHint: "Tự động xoay góc áo",
    step4Title: "Số lượng & tổng chi phí",
    bulkNote: "✦ Chiết khấu giá xưởng (-15%) cho đơn từ 10 sản phẩm (CLB & Doanh nghiệp)",
    bulkDiscountLabel: "Chiết khấu giá xưởng (-15%)",
    totalLabel: "Tổng thanh toán",
    btnAddToCart: "THÊM VÀO GIỎ HÀNG",
    btnBuyNow: "MUA NGAY",
    footerDesc: "UNLO tập trung vào phom dáng chuẩn, đường may chỉn chu và mức giá minh bạch trực tiếp từ xưởng sản xuất.",
    toastBackHome: "Đang quay lại trang chủ UNLO...",
    toastAdded: "Đã thêm bản phối cá nhân hóa vào giỏ hàng!"
  },
  en: {
    backHome: "Back to Home",
    studioBadge: "Custom Studio",
    step1Nav: "Select Item",
    step2Nav: "Customize",
    step3Nav: "Order",
    viewFront: "Front View",
    viewBack: "Back View",
    viewSleeve: "Sleeve Cuff",
    viewModel: "On Model",
    livePreview: "Live Preview",
    colorLabel: "Color:",
    trust1: "True-to-preview quality",
    trust2: "7-day easy returns",
    trust3: "Factory-direct pricing",
    trust4: "24/7 styling support",
    panelKicker: "CREATE YOUR CUSTOM PIECE",
    reviewCount: "128 verified reviews",
    factoryPriceTag: "Factory-direct price",
    step1Title: "Select Apparel & Fabric",
    productTypeLabel: "Apparel Type",
    formLabel: "Unisex Fit",
    formOversized: "Oversized",
    formBoxy: "Boxy Fit",
    fabricLabel: "Fabric Material",
    sizeLabel: "Size",
    findSizeLink: "Find My Size / Size Guide",
    step2Title: "Personalization Details",
    optATitle: "Custom Embroidery",
    optBTitle: "Upload Design / Logo",
    embroideryTextLabel: "Embroidery Text (Max 12 chars)",
    fontLabel: "Typography Style",
    fontClassic: "Classic",
    fontHandwriting: "Script",
    fontModern: "Modern",
    threadLabel: "Thread Color",
    uploadBtnTitle: "Upload from Device / Google Drive / Library",
    uploadBtnSub: "Supports transparent PNG, JPG, SVG (Max 10MB)",
    sampleLibraryLabel: "Or try a preset emblem from UNLO Library:",
    presetStar: "Minimal Star",
    presetCrest: "Crest Badge",
    presetWave: "Soft Wave",
    logoSizeLabel: "Graphic Size:",
    step3Title: "Placement Zone",
    autoAngleHint: "Auto-switches camera angle",
    step4Title: "Quantity & Price Summary",
    bulkNote: "✦ 15% factory discount automatically applied for 10+ items (Clubs & Teams)",
    bulkDiscountLabel: "Factory Bulk Discount (-15%)",
    totalLabel: "Total Estimated",
    btnAddToCart: "ADD TO CART",
    btnBuyNow: "BUY NOW",
    footerDesc: "UNLO focuses on tailored silhouettes, meticulous stitching, and transparent factory-direct pricing.",
    toastBackHome: "Returning to UNLO Homepage...",
    toastAdded: "Added your custom design to cart!"
  }
};

function formatVND(amount) {
  return amount.toLocaleString("vi-VN") + "đ";
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. HIGH-CLARITY SVG GARMENT FALLBACK COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
function GarmentSvg({ product, color, view }) {
  const col = GARMENT_COLORS.find((c) => c.id === color) || GARMENT_COLORS[0];
  const fill = col.hex;
  const stroke = col.stroke;
  const shade = col.shade;
  const isDark = color === "black" || color === "navy";
  const detailStroke = isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.14)";

  if (view === "sleeve") {
    return (
      <svg viewBox="0 0 400 400" className="w-full h-full select-none" aria-label="Sleeve close-up view">
        <defs>
          <linearGradient id="sleeveGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={shade} />
            <stop offset="35%" stopColor={fill} />
            <stop offset="70%" stopColor={fill} />
            <stop offset="100%" stopColor={shade} />
          </linearGradient>
        </defs>
        <path
          d="M125 35 L275 35 L258 290 C258 302 248 310 235 310 L165 310 C152 310 142 302 142 290 Z"
          fill="url(#sleeveGrad)"
          stroke={stroke}
          strokeWidth="2.5"
        />
        <path
          d="M144 268 L256 268 L252 316 C252 326 244 334 232 334 L168 334 C156 334 148 326 148 316 Z"
          fill={shade}
          stroke={stroke}
          strokeWidth="2"
        />
        <g stroke={detailStroke} strokeWidth="1.2">
          <line x1="162" y1="270" x2="162" y2="332" />
          <line x1="176" y1="270" x2="176" y2="332" />
          <line x1="190" y1="270" x2="190" y2="332" />
          <line x1="204" y1="270" x2="204" y2="332" />
          <line x1="218" y1="270" x2="218" y2="332" />
          <line x1="232" y1="270" x2="232" y2="332" />
          <line x1="244" y1="270" x2="244" y2="332" />
        </g>
        <line x1="146" y1="262" x2="254" y2="262" stroke={detailStroke} strokeWidth="1.2" strokeDasharray="4 3" />
      </svg>
    );
  }

  const isBack = view === "back";
  const isShortSleeve = product === "tshirt";

  const bodyPath = isShortSleeve
    ? "M145 78 L95 96 L52 162 L92 188 L114 152 L114 334 C114 342 120 348 128 348 L272 348 C280 348 286 342 286 334 L286 152 L308 188 L348 162 L305 96 L255 78 Z"
    : "M145 78 L96 96 L48 292 L82 302 L114 166 L114 332 C114 340 120 346 128 346 L272 346 C280 346 286 340 286 332 L286 166 L318 302 L352 292 L304 96 L255 78 Z";

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full select-none" aria-label="Garment mockup visualizer">
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="0.15">
          <stop offset="0%" stopColor={shade} />
          <stop offset="18%" stopColor={fill} />
          <stop offset="82%" stopColor={fill} />
          <stop offset="100%" stopColor={shade} />
        </linearGradient>
      </defs>

      <g>
        <path d={bodyPath} fill="url(#bodyGrad)" stroke={stroke} strokeWidth="2.4" strokeLinejoin="round" />
        {!isShortSleeve ? (
          <rect x="115" y="324" width="170" height="22" rx="4" fill={shade} fillOpacity="0.55" stroke={detailStroke} strokeWidth="1.2" />
        ) : (
          <line x1="116" y1="334" x2="284" y2="334" stroke={detailStroke} strokeWidth="1.2" strokeDasharray="4 3" />
        )}

        {product === "hoodie" && (
          isBack ? (
            <>
              <path d="M142 78 C140 36 165 26 200 26 C235 26 260 36 258 78 C240 108 160 108 142 78 Z" fill={shade} stroke={stroke} strokeWidth="2" />
              <line x1="200" y1="26" x2="200" y2="98" stroke={detailStroke} strokeWidth="1.5" />
            </>
          ) : (
            <>
              <path d="M145 78 C142 38 168 30 200 30 C232 30 258 38 255 78 C236 100 164 100 145 78 Z" fill={shade} stroke={stroke} strokeWidth="2" />
              <path d="M156 80 C172 102 228 102 244 80" fill="none" stroke={stroke} strokeWidth="2" />
              <line x1="184" y1="92" x2="181" y2="146" stroke={isDark ? "#D1D5DB" : "#6B7280"} strokeWidth="2.5" strokeLinecap="round" />
              <line x1="216" y1="92" x2="219" y2="146" stroke={isDark ? "#D1D5DB" : "#6B7280"} strokeWidth="2.5" strokeLinecap="round" />
              <path d="M144 242 L256 242 L268 308 L132 308 Z" fill={shade} fillOpacity="0.45" stroke={detailStroke} strokeWidth="1.8" strokeLinejoin="round" />
            </>
          )
        )}

        {product === "polo" && (
          isBack ? (
            <path d="M148 76 C168 92 232 92 252 76 L246 62 C226 74 174 74 154 62 Z" fill={shade} stroke={stroke} strokeWidth="2" />
          ) : (
            <>
              <path d="M152 72 L182 104 L200 84 L218 104 L248 72 C230 62 170 62 152 72 Z" fill={shade} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
              <rect x="193" y="88" width="14" height="58" rx="3" fill={shade} fillOpacity="0.5" stroke={detailStroke} strokeWidth="1.5" />
              <circle cx="200" cy="105" r="2.5" fill={detailStroke} />
              <circle cx="200" cy="126" r="2.5" fill={detailStroke} />
            </>
          )
        )}

        {product === "jacket" && (
          isBack ? (
            <>
              <path d="M148 76 C168 90 232 90 252 76 L248 60 C226 70 174 70 152 60 Z" fill={shade} stroke={stroke} strokeWidth="2" />
              <line x1="114" y1="146" x2="286" y2="146" stroke={detailStroke} strokeWidth="1.5" />
            </>
          ) : (
            <>
              <path d="M152 64 L248 64 L254 84 L146 84 Z" fill={shade} stroke={stroke} strokeWidth="2" />
              <line x1="200" y1="84" x2="200" y2="346" stroke={detailStroke} strokeWidth="2.5" />
              <line x1="200" y1="84" x2="200" y2="346" stroke={isDark ? "#9CA3AF" : "#4B5563"} strokeWidth="1.2" strokeDasharray="3 3" />
              <line x1="138" y1="248" x2="152" y2="296" stroke={detailStroke} strokeWidth="2.2" strokeLinecap="round" />
              <line x1="262" y1="248" x2="248" y2="296" stroke={detailStroke} strokeWidth="2.2" strokeLinecap="round" />
            </>
          )
        )}

        {(product === "tshirt" || product === "sweater") && (
          <>
            <path d="M154 78 C172 104 228 104 246 78" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M158 78 C174 96 226 96 242 78" fill={shade} fillOpacity="0.6" stroke={detailStroke} strokeWidth="1.5" />
          </>
        )}

        <path d="M118 156 Q 124 235 120 322" fill="none" stroke={detailStroke} strokeWidth="1.2" opacity="0.6" />
        <path d="M282 156 Q 276 235 280 322" fill="none" stroke={detailStroke} strokeWidth="1.2" opacity="0.6" />
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. MAIN UNLO CUSTOM STUDIO CLIENT COMPONENT (DOC-05)
   ═══════════════════════════════════════════════════════════════════════════ */
export default function CustomStudioClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang, setLang } = useLanguage();
  const { addToCart, setIsCartOpen } = useCart() || {};

  // Studio Application State
  const initialType = searchParams?.get("type");
  const [product, setProduct] = useState(() => {
    if (initialType && PRODUCTS.some((p) => p.id === initialType)) {
      return initialType;
    }
    if (initialType === "polo") return "tshirt";
    return "hoodie";
  });
  const [form, setForm] = useState("oversized");
  const [fabric, setFabric] = useState("cotton");
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("white");
  const [view, setView] = useState("front");

  // Visual Display Mode: "photo_flat" | "photo_female" | "photo_male" | "vector"
  const [displayMode, setDisplayMode] = useState("photo_flat");

  const [customMode, setCustomMode] = useState("text"); // "text" | "image"
  const [text, setText] = useState("UNLO_26");
  const [font, setFont] = useState("classic");
  const [thread, setThread] = useState("indigo");
  const [uploadedImage, setUploadedImage] = useState(PRESET_LOGOS.crest);
  const [logoSize, setLogoSize] = useState(58);
  const [position, setPosition] = useState("left_chest");
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(246);

  // Modals & Drawers
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isFabricModalOpen, setIsFabricModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Size Calculator
  const [calcHeight, setCalcHeight] = useState(168);
  const [calcWeight, setCalcWeight] = useState(60);

  const fileInputRef = useRef(null);

  // Sync type from URL query (gracefully alias legacy types like polo -> tshirt)
  useEffect(() => {
    const typeParam = searchParams?.get("type");
    if (typeParam) {
      if (PRODUCTS.some((p) => p.id === typeParam)) {
        startTransition(() => {
          setProduct(typeParam);
        });
      } else if (typeParam === "polo") {
        startTransition(() => {
          setProduct("tshirt");
        });
      }
    }
  }, [searchParams]);

  // Helper translation lookup
  const t = (key) => I18N[lang]?.[key] || I18N.vi[key] || key;

  // Selected Objects
  const prodObj = PRODUCTS.find((p) => p.id === product) || PRODUCTS[2];
  const fabObj = FABRICS.find((f) => f.id === fabric) || FABRICS[0];
  const colObj = GARMENT_COLORS.find((c) => c.id === color) || GARMENT_COLORS[0];
  const threadObj = THREAD_COLORS.find((c) => c.id === thread) || THREAD_COLORS[0];
  const posObj = POSITIONS.find((p) => p.id === position) || POSITIONS[0];

  // Pricing Calculations
  const customFeePerItem = customMode === "text" ? 15000 : 35000;
  const unitBase = prodObj.basePrice + fabObj.extra;
  const unitTotal = unitBase + customFeePerItem;
  const unitOldPrice = prodObj.oldPrice + fabObj.extra + customFeePerItem;

  const subtotalBase = unitBase * qty;
  const subtotalCustom = customFeePerItem * qty;
  const rawTotal = subtotalBase + subtotalCustom;
  const hasDiscount = qty >= 10;
  const discountAmount = hasDiscount ? Math.round(rawTotal * 0.15) : 0;
  const finalTotal = rawTotal - discountAmount;

  // Dynamic Product Title
  const formLabel = form === "oversized" ? t("formOversized") : t("formBoxy");
  const dynamicTitle =
    lang === "vi"
      ? `${prodObj.vi} Unisex UNLO ${formLabel} — Vải ${fabObj.vi} Cao Cấp`
      : `UNLO Unisex ${prodObj.en} (${formLabel}) — Premium ${fabObj.en}`;

  // Smart Size Recommender Calculation
  const recommendedSize = useMemo(() => {
    const h = Number(calcHeight) || 168;
    const w = Number(calcWeight) || 60;
    if (w < 54 && h < 163) return "S";
    if (w <= 65 && h <= 173) return "M";
    if (w <= 77 && h <= 181) return "L";
    return "XL";
  }, [calcHeight, calcWeight]);

  // Active Real Image based on product, displayMode, and camera view
  const activePhotoSrc = useMemo(() => {
    if (displayMode === "vector") return null;
    const prodSet = REAL_PHOTOS[product] || REAL_PHOTOS.tshirt;
    const angleKey = view === "back" ? "back" : view === "sleeve" ? "sleeve" : "front";

    if (displayMode === "photo_female") {
      return prodSet.model_female?.[angleKey] || prodSet.flat?.[angleKey];
    }
    if (displayMode === "photo_male") {
      return prodSet.model_male?.[angleKey] || prodSet.flat?.[angleKey];
    }
    // Default: photo_flat
    return prodSet.flat?.[angleKey];
  }, [product, displayMode, view]);

  // View Cycling
  const cycleView = (dir) => {
    const idx = VIEWS_ORDER.indexOf(view);
    const next = (idx + dir + VIEWS_ORDER.length) % VIEWS_ORDER.length;
    setView(VIEWS_ORDER[next]);
  };

  // Position select with auto-angle camera rotation
  const handleSelectPosition = (posId) => {
    setPosition(posId);
    const target = POSITIONS.find((p) => p.id === posId);
    if (target) {
      setView(target.view);
    }
  };

  // Reset Studio Customization
  const handleReset = () => {
    setText("UNLO_26");
    setFont("classic");
    setThread("indigo");
    setPosition("left_chest");
    setView("front");
    setDisplayMode("photo_flat");
    setCustomMode("text");
    toast.success(lang === "vi" ? "Đã đặt lại thiết kế mặc định" : "Reset to default design");
  };

  // Wishlist Toggle
  const handleToggleWishlist = () => {
    setLiked(!liked);
    setWishlistCount((c) => (liked ? c - 1 : c + 1));
  };

  // File Upload Handling
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result);
      setCustomMode("image");
      setIsUploadModalOpen(false);
      toast.success(
        lang === "vi" ? `Đã tải lên "${file.name}"` : `Uploaded "${file.name}"`
      );
    };
    reader.readAsDataURL(file);
  };

  // Simulate Google Drive Upload
  const handleSimulateDrive = () => {
    setUploadedImage(PRESET_LOGOS.star);
    setCustomMode("image");
    setIsUploadModalOpen(false);
    toast.success(
      lang === "vi"
        ? "Đã nhập thiết kế từ Google Drive!"
        : "Imported design from Google Drive!"
    );
  };

  // Add To Cart
  const handleAddToCart = (proceedToCheckout = false) => {
    const item = {
      _id: `custom-${product}-${color}-${size}-${Date.now()}`,
      name: `${prodObj[lang]} (${colObj[lang]} · ${size})`,
      price: Math.round(finalTotal / qty),
      originalPrice: unitOldPrice,
      image: activePhotoSrc || "/assets/img/custom/autumn-flat.webp",
      size,
      color: colObj[lang],
      isCustomized: true,
      customDetails: {
        product: prodObj[lang],
        form: formLabel,
        fabric: fabObj[lang],
        placement: posObj[lang],
        type: customMode === "text" ? `Thêu "${text}"` : "Logo tải lên",
        font,
        thread: threadObj[lang]
      }
    };

    addToCart?.(item, qty);

    setCartItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: `${prodObj[lang]} (${colObj[lang]} · ${size})`,
        detail: `${fabObj[lang]} · ${posObj[lang]} · ${
          customMode === "text" ? `Thêu "${text}"` : "Logo tải lên"
        }`,
        qty,
        total: finalTotal
      }
    ]);

    if (proceedToCheckout) {
      router.push("/checkout");
    } else {
      setIsCartDrawerOpen(true);
      toast.success(t("toastAdded"));
    }
  };

  // Dynamic Coordinates calibrated for Flat, Female Model, Male Model, and Vector
  const overlayCoords = useMemo(() => {
    if (displayMode === "photo_female") {
      switch (position) {
        case "left_chest":
          return { top: "42%", left: "58%" };
        case "center_chest":
          return { top: "46%", left: "50%" };
        case "back":
          return { top: "37%", left: "50%" };
        case "cuff":
          return { top: "58%", left: "74%" };
        case "hem":
          return { top: "74%", left: "58%" };
        default:
          return { top: "42%", left: "58%" };
      }
    }
    if (displayMode === "photo_male") {
      switch (position) {
        case "left_chest":
          return { top: "40%", left: "58%" };
        case "center_chest":
          return { top: "43%", left: "50%" };
        case "back":
          return { top: "36%", left: "50%" };
        case "cuff":
          return { top: "54%", left: "76%" };
        case "hem":
          return { top: "72%", left: "58%" };
        default:
          return { top: "40%", left: "58%" };
      }
    }
    // Default: photo_flat or vector
    switch (position) {
      case "left_chest":
        return { top: "36%", left: "62%" };
      case "center_chest":
        return { top: "40%", left: "50%" };
      case "back":
        return { top: "33%", left: "50%" };
      case "cuff":
        return { top: "64%", left: "50%" };
      case "hem":
        return { top: "74%", left: "62%" };
      default:
        return { top: "36%", left: "62%" };
    }
  }, [position, displayMode]);

  const isOverlayVisible =
    view === posObj.view ||
    (view === "model" && posObj.view === "front") ||
    (displayMode.startsWith("photo_") && posObj.view === "front" && view === "front") ||
    (displayMode.startsWith("photo_") && posObj.view === "back" && view === "back") ||
    (displayMode.startsWith("photo_") && posObj.view === "sleeve" && view === "sleeve");

  return (
    <div className="bg-white text-[#14151A] font-sans antialiased selection:bg-[#16115B] selection:text-white min-h-screen flex flex-col">
      {/* ========================================================= */}
      {/* 1. COMPACT MINIMALIST HEADER                              */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Back to Home + Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600 hover:text-[#16115B] transition-colors py-2 px-2.5 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <span className="hidden sm:inline">{t("backHome")}</span>
            </Link>

            <div className="h-5 w-px bg-gray-200 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <Link href="/" className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#16115B] leading-none">
                UNLO
              </Link>
              <span className="hidden sm:inline-block text-[11px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#EEF0FA] text-[#16115B] whitespace-nowrap">
                {t("studioBadge")}
              </span>
            </div>
          </div>

          {/* Center: Step Progress Indicator (Desktop) */}
          <nav aria-label="Tiến trình thiết kế" className="hidden lg:flex items-center gap-2 text-xs font-semibold">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#16115B] text-white transition-all">
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
              <span>{t("step1Nav")}</span>
            </div>
            <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF0FA] text-[#16115B] transition-all">
              <span className="w-4 h-4 rounded-full bg-[#16115B]/15 flex items-center justify-center text-[10px]">2</span>
              <span>{t("step2Nav")}</span>
            </div>
            <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-400 transition-all">
              <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[10px]">3</span>
              <span>{t("step3Nav")}</span>
            </div>
          </nav>

          {/* Right: Language Switcher (VN / EN) + Cart Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="inline-flex items-center bg-gray-100 rounded-full p-0.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => setLang("vi")}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  lang === "vi" ? "bg-[#16115B] text-white" : "text-gray-600 hover:text-[#16115B]"
                }`}
              >
                VN
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  lang === "en" ? "bg-[#16115B] text-white" : "text-gray-600 hover:text-[#16115B]"
                }`}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:border-[#16115B] text-gray-700 hover:text-[#16115B] transition-all cursor-pointer"
              aria-label="Giỏ hàng"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-[#E85D2A] text-white text-[11px] font-bold flex items-center justify-center">
                {cartItems.reduce((sum, item) => sum + item.qty, 0)}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Step Progress Bar */}
        <div className="lg:hidden border-t border-gray-100 bg-gray-50/80 px-4 py-2 flex items-center justify-center gap-2 text-[11px] font-semibold text-gray-500">
          <span className="text-[#16115B] font-bold">{t("step1Nav")}</span>
          <span>→</span>
          <span className="text-[#16115B] font-bold">{t("step2Nav")}</span>
          <span>→</span>
          <span>{t("step3Nav")}</span>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. SPLIT-SCREEN WORKSPACE (MAIN STUDIO)                   */}
      {/* ========================================================= */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ===================================================== */}
          {/* LEFT SIDE: REAL-TIME PRODUCT CANVAS VISUALIZER        */}
          {/* ===================================================== */}
          <section className="lg:col-span-7 lg:sticky lg:top-24 space-y-5">
            <div className="relative bg-[#F2F4F8] rounded-3xl border border-gray-200/80 overflow-hidden shadow-sm fabric-texture">
              {/* Top Bar: Angle Switcher + Live Badge */}
              <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 relative z-20">
                <div className="inline-flex flex-wrap items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-2xl border border-gray-200/80 shadow-sm">
                  {VIEWS_ORDER.map((vId) => {
                    const active = view === vId;
                    const labelKey = vId === "front" ? "viewFront" : vId === "back" ? "viewBack" : vId === "sleeve" ? "viewSleeve" : "viewModel";
                    return (
                      <button
                        key={vId}
                        type="button"
                        onClick={() => setView(vId)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          active
                            ? "bg-[#16115B] text-white shadow-sm"
                            : "text-gray-600 hover:text-[#16115B]"
                        }`}
                      >
                        {t(labelKey)}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-gray-200/80 text-[11px] font-bold text-emerald-700 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{t("livePreview")}</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleReset}
                    title="Đặt lại thiết kế"
                    className="p-2 rounded-xl bg-white/90 border border-gray-200/80 text-gray-500 hover:text-[#16115B] hover:border-[#16115B] transition-all shadow-sm cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Sub-bar: Real Photography Display Mode Selector */}
              <div className="px-4 sm:px-5 pb-2 flex flex-wrap items-center gap-1.5 relative z-20">
                <span className="text-[11px] font-bold text-gray-500 mr-1">Chế độ xem ảnh:</span>
                <button
                  type="button"
                  onClick={() => setDisplayMode("photo_flat")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    displayMode === "photo_flat"
                      ? "bg-[#16115B] text-white shadow-xs"
                      : "bg-white/80 text-gray-600 hover:text-[#16115B] border border-gray-200/70"
                  }`}
                >
                  👕 Áo phẳng xưởng
                </button>
                <button
                  type="button"
                  onClick={() => setDisplayMode("photo_female")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    displayMode === "photo_female"
                      ? "bg-[#16115B] text-white shadow-xs"
                      : "bg-white/80 text-gray-600 hover:text-[#16115B] border border-gray-200/70"
                  }`}
                >
                  👩 Mẫu Nữ
                </button>
                <button
                  type="button"
                  onClick={() => setDisplayMode("photo_male")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    displayMode === "photo_male"
                      ? "bg-[#16115B] text-white shadow-xs"
                      : "bg-white/80 text-gray-600 hover:text-[#16115B] border border-gray-200/70"
                  }`}
                >
                  👨 Mẫu Nam
                </button>
                <button
                  type="button"
                  onClick={() => setDisplayMode("vector")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    displayMode === "vector"
                      ? "bg-[#16115B] text-white shadow-xs"
                      : "bg-white/80 text-gray-600 hover:text-[#16115B] border border-gray-200/70"
                  }`}
                >
                  📐 Phác họa đổi màu
                </button>
              </div>

              {/* Interactive Mockup Stage - Tối ưu tỉ lệ mobile & desktop gọn gàng */}
              <div className="relative w-full aspect-[4/3.6] sm:aspect-[4/3.8] max-h-[420px] sm:max-h-none flex items-center justify-center px-4 sm:px-6 pb-12 sm:pb-20 pt-2 select-none">
                {/* Pedestal Shadow */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 h-8 bg-black/5 rounded-full blur-xl pointer-events-none" />

                {/* Garment Wrapper */}
                <div className="relative w-full max-w-[440px] aspect-square flex items-center justify-center transition-all duration-300">
                  {/* Dynamic Rendering: Real Photographic Image or SVG Vector */}
                  <div className="w-full h-full flex items-center justify-center drop-shadow-xl transition-transform duration-300 relative overflow-hidden rounded-2xl">
                    {activePhotoSrc ? (
                      <img
                        src={activePhotoSrc}
                        alt={`${prodObj.vi} thực tế`}
                        className="w-full h-full object-contain transition-opacity duration-300"
                      />
                    ) : (
                      <GarmentSvg product={product} color={color} view={view} />
                    )}
                  </div>

                  {/* Live Design Overlay - Tọa độ tính toán chuẩn xác cho Flat và Model, không đè lên mặt */}
                  <div
                    className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 flex items-center justify-center ${
                      isOverlayVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                    }`}
                    style={overlayCoords}
                  >
                    <div className="relative px-2 py-1 rounded border border-dashed border-[#16115B]/30 bg-white/10 backdrop-blur-[0.5px]">
                      {customMode === "text" ? (
                        <span
                          className={`embroidery-stitch block whitespace-nowrap font-bold ${
                            font === "classic"
                              ? "font-classic text-sm"
                              : font === "handwriting"
                              ? "font-handwriting text-lg"
                              : "font-modern text-sm"
                          }`}
                          style={{ color: threadObj.hex }}
                        >
                          {text.trim() || "UNLO"}
                        </span>
                      ) : (
                        <img
                          src={uploadedImage}
                          alt="Custom design"
                          className="object-contain drop-shadow-sm"
                          style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Left/Right Prev/Next Arrows */}
                <button
                  type="button"
                  onClick={() => cycleView(-1)}
                  aria-label="Góc trước"
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#16115B] shadow-sm transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => cycleView(1)}
                  aria-label="Góc tiếp theo"
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#16115B] shadow-sm transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>

                {/* Polaroid Inset Badge: Cận cảnh thớ vải & chi tiết thêu (Theo Lookbook Ref 1 & 2 "Layer by layer") */}
                <button
                  type="button"
                  onClick={() => setIsFabricModalOpen(true)}
                  title="Nhấp để xem cận cảnh xấp vải & thêu vi tính chuẩn xuất xưởng"
                  className="absolute bottom-14 sm:bottom-16 right-3 sm:right-6 z-25 group cursor-pointer text-left transition-all duration-300 hover:scale-105"
                >
                  <div className="bg-white p-1 sm:p-1.5 pb-2 sm:pb-2.5 rounded-xl shadow-xl border border-gray-200/90 rotate-2 group-hover:rotate-0 transition-transform duration-300">
                    <div className="relative w-20 sm:w-28 aspect-[4/5] rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src="/assets/img/custom-drive/macro_stack_detail.jpg"
                        alt="Cận cảnh xấp áo thêu"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1.5">
                        <span className="text-[9px] text-white font-semibold flex items-center gap-1">
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                          </svg>
                          Phóng to
                        </span>
                      </div>
                    </div>
                    <div className="mt-1 px-1 flex items-center justify-between">
                      <span className="text-[9px] sm:text-[10px] font-bold text-[#16115B] tracking-tight flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Chi tiết thêu
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-semibold text-gray-400 group-hover:text-[#16115B]">Zoom</span>
                    </div>
                  </div>
                </button>
              </div>

              {/* Floating Bottom Bar: Status + Garment Colors */}
              <div className="absolute bottom-4 inset-x-4 sm:inset-x-5 flex flex-wrap items-center justify-between gap-3 z-20">
                <div className="px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-200/80 shadow-sm text-xs font-semibold text-gray-700 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: colObj.hex }} />
                  <span>
                    {prodObj[lang]} · {colObj[lang]} · {posObj[lang]}
                  </span>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-200/80 shadow-sm">
                  <span className="text-[11px] font-bold text-gray-500 mr-1 hidden sm:inline">{t("colorLabel")}</span>
                  <div className="flex items-center gap-2">
                    {GARMENT_COLORS.map((c) => {
                      const active = color === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            setColor(c.id);
                            // If switching color away from white, automatically enable vector color preview
                            if (c.id !== "white" && displayMode !== "vector") {
                              setDisplayMode("vector");
                              toast.info(lang === "vi" ? `Đã chuyển sang phác họa màu ${c.vi}` : `Switched to ${c.en} preview`);
                            }
                          }}
                          title={c[lang]}
                          className={`w-6 h-6 rounded-full transition-all flex items-center justify-center cursor-pointer ${
                            active
                              ? "ring-2 ring-offset-2 ring-[#16115B] scale-110"
                              : "hover:scale-110 border border-gray-300"
                          }`}
                          style={{ backgroundColor: c.hex }}
                        >
                          {active && (
                            <span
                              className={`text-[10px] font-bold ${
                                c.id === "white" || c.id === "beige" ? "text-[#16115B]" : "text-white"
                              }`}
                            >
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Trust Policy Cards */}
            <div className="hidden sm:grid grid-cols-4 gap-3">
              <div className="bg-[#F8F7F4]/80 border border-gray-200/70 rounded-2xl p-3.5 text-center space-y-1.5">
                <div className="w-8 h-8 mx-auto rounded-full bg-[#EEF0FA] text-[#16115B] flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <p className="text-[11px] font-bold text-gray-800 leading-snug">{t("trust1")}</p>
              </div>

              <div className="bg-[#F8F7F4]/80 border border-gray-200/70 rounded-2xl p-3.5 text-center space-y-1.5">
                <div className="w-8 h-8 mx-auto rounded-full bg-[#EEF0FA] text-[#16115B] flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
                <p className="text-[11px] font-bold text-gray-800 leading-snug">{t("trust2")}</p>
              </div>

              <div className="bg-[#F8F7F4]/80 border border-gray-200/70 rounded-2xl p-3.5 text-center space-y-1.5">
                <div className="w-8 h-8 mx-auto rounded-full bg-[#EEF0FA] text-[#16115B] flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                  </svg>
                </div>
                <p className="text-[11px] font-bold text-gray-800 leading-snug">{t("trust3")}</p>
              </div>

              <div className="bg-[#F8F7F4]/80 border border-gray-200/70 rounded-2xl p-3.5 text-center space-y-1.5">
                <div className="w-8 h-8 mx-auto rounded-full bg-[#EEF0FA] text-[#16115B] flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <p className="text-[11px] font-bold text-gray-800 leading-snug">{t("trust4")}</p>
              </div>
            </div>
          </section>

          {/* ===================================================== */}
          {/* RIGHT SIDE: CUSTOMIZATION CONTROL PANEL               */}
          {/* ===================================================== */}
          <section className="lg:col-span-5 space-y-6">
            {/* Panel Header & Dynamic Title */}
            <div className="border-b border-gray-200 pb-5 space-y-2.5">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#E85D2A]">
                {t("panelKicker")}
              </p>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#16115B] leading-snug">
                {dynamicTitle}
              </h1>

              {/* Rating & Wishlist Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center text-amber-400">
                    <span>★★★★★</span>
                  </div>
                  <span className="font-bold text-gray-800">4.9</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-500 underline decoration-gray-300">{t("reviewCount")}</span>
                </div>

                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-rose-500 transition-colors cursor-pointer"
                >
                  <svg
                    className="w-4 h-4 transition-transform"
                    fill={liked ? "#F43F5E" : "none"}
                    stroke={liked ? "#F43F5E" : "currentColor"}
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  <span>
                    {wishlistCount} {lang === "vi" ? "yêu thích" : "likes"}
                  </span>
                </button>
              </div>

              {/* Unit Price Display */}
              <div className="flex items-baseline gap-2.5 pt-1">
                <span className="text-2xl font-extrabold text-[#14151A]">{formatVND(unitTotal)}</span>
                <span className="text-sm text-gray-400 line-through">{formatVND(unitOldPrice)}</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
                  {t("factoryPriceTag")}
                </span>
              </div>
            </div>

            {/* =================================================== */}
            {/* STEP 1: CHỌN SẢN PHẨM & CHẤT LIỆU                   */}
            {/* =================================================== */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#16115B] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="text-sm font-extrabold uppercase tracking-wide text-[#16115B]">
                  {t("step1Title")}
                </h2>
              </div>

              {/* Product Tabs (4 Dòng Sản Phẩm Đồng Bộ 100% Google Drive) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {t("productTypeLabel")}
                  </label>
                  <span className="text-[11px] font-semibold text-[#16115B] hidden sm:inline">4 dòng sản phẩm chuẩn xưởng</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {PRODUCTS.map((p) => {
                    const active = product === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setProduct(p.id)}
                        className={`p-2 sm:p-2.5 rounded-2xl text-left transition-all border cursor-pointer relative group flex items-center gap-2.5 ${
                          active
                            ? "bg-[#16115B] text-white border-[#16115B] shadow-md ring-2 ring-[#16115B]/20"
                            : "bg-white hover:bg-gray-50 border-gray-200 text-gray-700 hover:border-[#16115B]/40"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-black/5">
                          <img src={p.thumb} alt={p.vi} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] sm:text-xs font-bold truncate block">{p[lang]}</span>
                          </div>
                          <div className={`text-[10px] font-medium mt-0.5 ${active ? "text-white/80" : "text-gray-500"}`}>
                            từ {p.basePrice.toLocaleString("vi-VN")}đ
                          </div>
                        </div>
                        {active && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 absolute top-2 right-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form & Fabric Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Form Selector */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">{t("formLabel")}</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setForm("oversized")}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        form === "oversized"
                          ? "border-2 border-[#16115B] bg-[#EEF0FA] text-[#16115B]"
                          : "border border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {t("formOversized")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm("boxy")}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        form === "boxy"
                          ? "border-2 border-[#16115B] bg-[#EEF0FA] text-[#16115B]"
                          : "border border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {t("formBoxy")}
                    </button>
                  </div>
                </div>

                {/* Fabric Selector */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-gray-500">{t("fabricLabel")}</label>
                    <button
                      type="button"
                      onClick={() => setIsFabricModalOpen(true)}
                      className="text-[11px] font-bold text-[#16115B] hover:text-[#E85D2A] flex items-center gap-1 cursor-pointer underline"
                    >
                      <span>🔍</span> <span>Cận cảnh 4 loại vải</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {FABRICS.map((f) => {
                      const active = fabric === f.id;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setFabric(f.id)}
                          className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all text-center cursor-pointer ${
                            active
                              ? "border-2 border-[#16115B] bg-[#EEF0FA] text-[#16115B]"
                              : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                          }`}
                        >
                          {f[lang]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Size Selector + Size Guide Link */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-500">{t("sizeLabel")}</label>
                  <button
                    type="button"
                    onClick={() => setIsSizeModalOpen(true)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#16115B] hover:text-[#E85D2A] underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                    <span>{t("findSizeLink")}</span>
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {SIZES.map((s) => {
                    const active = size === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        className={`py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                          active
                            ? "border-2 border-[#16115B] bg-[#16115B] text-white shadow-sm"
                            : "border border-gray-200 bg-white text-gray-700 hover:border-[#16115B]"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* =================================================== */}
            {/* STEP 2: NỘI DUNG CÁ NHÂN HÓA                        */}
            {/* =================================================== */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#16115B] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="text-sm font-extrabold uppercase tracking-wide text-[#16115B]">
                    {t("step2Title")}
                  </h2>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EEF0FA] text-[#16115B]">
                  +{formatVND(customFeePerItem)}/sp
                </span>
              </div>

              {/* Mode Tabs (Text vs Image) */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setCustomMode("text")}
                  className={`p-3 rounded-2xl text-left transition-all cursor-pointer ${
                    customMode === "text"
                      ? "border-2 border-[#16115B] bg-[#EEF0FA]/60"
                      : "border border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#16115B]">{t("optATitle")}</span>
                    <span className="w-4 h-4 rounded-full bg-[#16115B] text-white flex items-center justify-center text-[10px]">
                      ✓
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-gray-500 mt-0.5">+15.000đ / sản phẩm</p>
                </button>

                <button
                  type="button"
                  onClick={() => setCustomMode("image")}
                  className={`p-3 rounded-2xl text-left transition-all cursor-pointer ${
                    customMode === "image"
                      ? "border-2 border-[#16115B] bg-[#EEF0FA]/60"
                      : "border border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-gray-800">{t("optBTitle")}</span>
                    <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[10px] text-transparent">
                      ✓
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-gray-500 mt-0.5">+35.000đ / sản phẩm</p>
                </button>
              </div>

              {/* OPTION A: TEXT EMBROIDERY */}
              {customMode === "text" && (
                <div className="space-y-4 bg-[#F8F7F4]/70 p-4 rounded-2xl border border-gray-200/70">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="embroidery-input" className="text-xs font-bold text-gray-700">
                        {t("embroideryTextLabel")}
                      </label>
                      <span className="text-[11px] font-semibold text-gray-400">
                        {text.length}/12 {lang === "vi" ? "ký tự" : "chars"}
                      </span>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        id="embroidery-input"
                        type="text"
                        maxLength={12}
                        value={text}
                        onChange={(e) => setText(e.target.value.slice(0, 12))}
                        placeholder="Nhập tên, ký hiệu..."
                        className="w-full pl-3.5 pr-12 py-2.5 rounded-xl bg-white border border-gray-300 focus:border-[#16115B] focus:ring-2 focus:ring-[#16115B]/15 outline-none text-sm font-semibold text-[#14151A] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setIsUploadModalOpen(true)}
                        title="Tải ảnh / logo riêng từ Máy, Google Drive hoặc Thư viện"
                        className="absolute right-2 p-1.5 rounded-lg text-gray-500 hover:text-[#16115B] hover:bg-[#EEF0FA] transition-colors cursor-pointer"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Font Style */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">{t("fontLabel")}</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setFont("classic")}
                        className={`py-2 px-3 rounded-xl border text-xs font-classic font-bold transition-all cursor-pointer ${
                          font === "classic"
                            ? "border-2 border-[#16115B] bg-[#16115B] text-white"
                            : "border-gray-200 bg-white text-gray-700 hover:border-[#16115B]"
                        }`}
                      >
                        {t("fontClassic")}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFont("handwriting")}
                        className={`py-2 px-3 rounded-xl border text-sm font-handwriting font-bold transition-all cursor-pointer ${
                          font === "handwriting"
                            ? "border-2 border-[#16115B] bg-[#16115B] text-white"
                            : "border-gray-200 bg-white text-gray-700 hover:border-[#16115B]"
                        }`}
                      >
                        {t("fontHandwriting")}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFont("modern")}
                        className={`py-2 px-3 rounded-xl border text-xs font-modern font-bold transition-all cursor-pointer ${
                          font === "modern"
                            ? "border-2 border-[#16115B] bg-[#16115B] text-white"
                            : "border-gray-200 bg-white text-gray-700 hover:border-[#16115B]"
                        }`}
                      >
                        {t("fontModern")}
                      </button>
                    </div>
                  </div>

                  {/* Thread Colors */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">{t("threadLabel")}</label>
                    <div className="grid grid-cols-5 gap-2">
                      {THREAD_COLORS.map((tc) => {
                        const active = thread === tc.id;
                        return (
                          <button
                            key={tc.id}
                            type="button"
                            onClick={() => setThread(tc.id)}
                            className={`p-2 rounded-xl border transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                              active
                                ? "border-2 border-[#16115B] bg-white shadow-xs"
                                : "border-gray-200 bg-white/70 hover:border-gray-300"
                            }`}
                          >
                            <span
                              className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center"
                              style={{ backgroundColor: tc.hex }}
                            >
                              {active && (
                                <span
                                  className={`text-[9px] font-bold ${
                                    tc.id === "ivory" || tc.id === "silver" ? "text-[#16115B]" : "text-white"
                                  }`}
                                >
                                  ✓
                                </span>
                              )}
                            </span>
                            <span className="text-[10px] font-bold text-gray-700 truncate max-w-full">
                              {tc[lang]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* OPTION B: UPLOAD IMAGE / LOGO */}
              {customMode === "image" && (
                <div className="space-y-4 bg-[#F8F7F4]/70 p-4 rounded-2xl border border-gray-200/70">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(true)}
                    className="w-full py-5 px-4 rounded-2xl border-2 border-dashed border-[#16115B]/35 bg-white hover:bg-[#EEF0FA]/40 hover:border-[#16115B] transition-all flex flex-col items-center justify-center gap-2 text-center group cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#EEF0FA] text-[#16115B] group-hover:scale-105 transition-transform flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-[#16115B]">{t("uploadBtnTitle")}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{t("uploadBtnSub")}</p>
                    </div>
                  </button>

                  {/* Preset Logos */}
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 mb-2">{t("sampleLibraryLabel")}</p>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setUploadedImage(PRESET_LOGOS.star);
                          toast.success(lang === "vi" ? "Đã áp dụng biểu tượng ngôi sao!" : "Applied star emblem!");
                        }}
                        className="py-2 px-2.5 rounded-xl bg-white border border-gray-200 hover:border-[#16115B] text-xs font-semibold text-gray-700 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <span>✦</span> <span>{t("presetStar")}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUploadedImage(PRESET_LOGOS.crest);
                          toast.success(lang === "vi" ? "Đã áp dụng huy hiệu UNLO!" : "Applied UNLO crest!");
                        }}
                        className="py-2 px-2.5 rounded-xl bg-white border border-gray-200 hover:border-[#16115B] text-xs font-semibold text-gray-700 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <span>◈</span> <span>{t("presetCrest")}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUploadedImage(PRESET_LOGOS.wave);
                          toast.success(lang === "vi" ? "Đã áp dụng sóng tối giản!" : "Applied soft wave!");
                        }}
                        className="py-2 px-2.5 rounded-xl bg-white border border-gray-200 hover:border-[#16115B] text-xs font-semibold text-gray-700 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <span>〰</span> <span>{t("presetWave")}</span>
                      </button>
                    </div>
                  </div>

                  {/* Size Slider */}
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <label htmlFor="logo-size-slider" className="text-xs font-bold text-gray-600 whitespace-nowrap">
                      {t("logoSizeLabel")}
                    </label>
                    <input
                      id="logo-size-slider"
                      type="range"
                      min="36"
                      max="96"
                      value={logoSize}
                      onChange={(e) => setLogoSize(Number(e.target.value))}
                      className="w-full accent-[#16115B] cursor-pointer"
                    />
                    <span className="text-xs font-bold text-[#16115B] w-10 text-right">{logoSize}px</span>
                  </div>
                </div>
              )}
            </div>

            <hr className="border-gray-100" />

            {/* =================================================== */}
            {/* STEP 3: VỊ TRÍ CÁ NHÂN HÓA                          */}
            {/* =================================================== */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#16115B] text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h2 className="text-sm font-extrabold uppercase tracking-wide text-[#16115B]">
                    {t("step3Title")}
                  </h2>
                </div>
                <span className="text-[11px] font-semibold text-gray-400">{t("autoAngleHint")}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {POSITIONS.map((p) => {
                  const active = position === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectPosition(p.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        active
                          ? "bg-[#16115B] text-white shadow-sm"
                          : "bg-white border border-gray-200 text-gray-700 hover:border-[#16115B] hover:text-[#16115B]"
                      }`}
                    >
                      {p[lang]}
                    </button>
                  );
                })}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* =================================================== */}
            {/* STEP 4: SỐ LƯỢNG & TỔNG CHI PHÍ                     */}
            {/* =================================================== */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#16115B] text-white text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h2 className="text-sm font-extrabold uppercase tracking-wide text-[#16115B]">
                  {t("step4Title")}
                </h2>
              </div>

              {/* Quantity Stepper + Bulk Notice */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center rounded-xl border border-gray-300 bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, Math.min(500, parseInt(e.target.value, 10) || 1)))}
                    className="w-14 h-10 text-center text-sm font-extrabold text-[#14151A] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(500, q + 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setQty(10)}
                  className="flex-1 min-w-[200px] text-left px-3.5 py-2 rounded-xl bg-amber-50/90 border border-amber-200/80 hover:bg-amber-100/70 transition-colors cursor-pointer"
                >
                  <p className="text-[11px] font-bold text-amber-900 leading-snug">{t("bulkNote")}</p>
                </button>
              </div>

              {/* Real-Time Price Breakdown Card */}
              <div className="bg-[#F8F7F4] rounded-2xl p-4 border border-gray-200/80 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>
                    {prodObj[lang]} ({fabObj[lang]}) × {qty}
                  </span>
                  <span className="font-semibold text-gray-900">{formatVND(subtotalBase)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>
                    {customMode === "text"
                      ? lang === "vi"
                        ? "Phí thêu chữ cá nhân"
                        : "Custom embroidery fee"
                      : lang === "vi"
                      ? "Phí in/thêu logo riêng"
                      : "Custom design upload fee"}{" "}
                    × {qty}
                  </span>
                  <span className="font-semibold text-gray-900">+{formatVND(subtotalCustom)}</span>
                </div>
                {hasDiscount && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>{t("bulkDiscountLabel")}</span>
                    <span>-{formatVND(discountAmount)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2.5 mt-2 flex items-baseline justify-between">
                  <span className="font-extrabold text-[#16115B]">{t("totalLabel")}</span>
                  <span className="text-xl font-extrabold text-[#16115B]">{formatVND(finalTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => handleAddToCart(false)}
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#16115B] hover:bg-[#1F187A] text-white font-extrabold text-xs sm:text-sm tracking-wide uppercase shadow-md shadow-[#16115B]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                  </svg>
                  <span>{t("btnAddToCart")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddToCart(true)}
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#E85D2A] hover:bg-[#D14B1A] text-white font-extrabold text-xs sm:text-sm tracking-wide uppercase shadow-md shadow-[#E85D2A]/25 transition-all active:scale-[0.98] cursor-pointer"
                >
                  {t("btnBuyNow")}
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ========================================================= */}
      {/* 3. FOOTER TRUST BADGES BANNER & COMPACT BRAND FOOTER      */}
      {/* ========================================================= */}
      <footer className="mt-12">
        {/* Horizontal Marquee Trust Banner */}
        <div className="bg-[#16115B] text-white py-3.5 overflow-hidden">
          <div className="animate-marquee flex items-center gap-8 text-xs font-bold tracking-wider uppercase whitespace-nowrap">
            <span>Cam kết hình ảnh giống mô tả</span>
            <span className="text-[#E85D2A]">✦</span>
            <span>Hỗ trợ đổi trả 7 ngày</span>
            <span className="text-[#E85D2A]">✦</span>
            <span>Ưu đãi giảm giá xưởng</span>
            <span className="text-[#E85D2A]">✦</span>
            <span>Tư vấn 24/7</span>
            <span className="text-[#E85D2A]">✦</span>
            <span>Thêu vi tính sắc nét 14 mũi/inch</span>
            <span className="text-[#E85D2A]">✦</span>
            <span>Cam kết hình ảnh giống mô tả</span>
            <span className="text-[#E85D2A]">✦</span>
            <span>Hỗ trợ đổi trả 7 ngày</span>
            <span className="text-[#E85D2A]">✦</span>
            <span>Ưu đãi giảm giá xưởng</span>
            <span className="text-[#E85D2A]">✦</span>
            <span>Tư vấn 24/7</span>
            <span className="text-[#E85D2A]">✦</span>
            <span>Thêu vi tính sắc nét 14 mũi/inch</span>
            <span className="text-[#E85D2A]">✦</span>
          </div>
        </div>

        {/* Compact Brand Footer */}
        <div className="bg-[#F8F7F4] border-t border-gray-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="text-xl font-extrabold text-[#16115B] tracking-tight">UNLO</span>
                <span className="text-xs font-bold text-gray-500">— Giá trị không cần gọi tên</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{t("footerDesc")}</p>
            </div>

            <div className="text-xs text-gray-600 space-y-1 md:text-right">
              <p className="font-bold text-[#16115B]">Liên hệ UNLO Studio</p>
              <p>
                Hotline: <span className="font-bold text-gray-900">0948 586 486</span> · Hà Nội, Việt Nam
              </p>
              <p className="text-[11px] text-gray-400">© 2026 UNLO Vietnam. Bảo lưu mọi quyền.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* MODAL 1: FIND MY SIZE / BẢNG QUY ĐỔI KÍCH CỠ              */}
      {/* ========================================================= */}
      {isSizeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-[#16115B]">{t("findSizeLink")}</h3>
              <button
                type="button"
                onClick={() => setIsSizeModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Smart Size Calculator */}
            <div className="bg-[#F8F7F4] rounded-2xl p-4 space-y-3 border border-gray-200/80">
              <p className="text-xs font-bold text-[#16115B]">Gợi ý nhanh theo số đo của bạn:</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="calc-height" className="block text-[11px] font-semibold text-gray-500 mb-1">
                    Chiều cao (cm)
                  </label>
                  <input
                    id="calc-height"
                    type="number"
                    value={calcHeight}
                    min="140"
                    max="205"
                    onChange={(e) => setCalcHeight(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-bold text-[#14151A] bg-white outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="calc-weight" className="block text-[11px] font-semibold text-gray-500 mb-1">
                    Cân nặng (kg)
                  </label>
                  <input
                    id="calc-weight"
                    type="number"
                    value={calcWeight}
                    min="35"
                    max="120"
                    onChange={(e) => setCalcWeight(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-bold text-[#14151A] bg-white outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-gray-600">Kích cỡ gợi ý cho bạn:</span>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-[#16115B] text-white text-sm font-extrabold">
                    {recommendedSize}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setSize(recommendedSize);
                      setIsSizeModalOpen(false);
                      toast.success(
                        lang === "vi" ? `Đã chọn kích cỡ ${recommendedSize}` : `Selected size ${recommendedSize}`
                      );
                    }}
                    className="text-xs font-bold text-[#E85D2A] hover:underline cursor-pointer"
                  >
                    Áp dụng ngay
                  </button>
                </div>
              </div>
            </div>

            {/* Size Chart Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#EEF0FA] text-[#16115B]">
                    <th className="p-2.5 rounded-l-xl font-bold">Cỡ</th>
                    <th className="p-2.5 font-bold">Chiều cao</th>
                    <th className="p-2.5 font-bold">Cân nặng</th>
                    <th className="p-2.5 rounded-r-xl font-bold">Rộng ngực (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                  <tr>
                    <td className="p-2.5 font-bold">S</td>
                    <td className="p-2.5">1m50 – 1m62</td>
                    <td className="p-2.5">45 – 55 kg</td>
                    <td className="p-2.5">54 cm</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">M</td>
                    <td className="p-2.5">1m62 – 1m72</td>
                    <td className="p-2.5">55 – 65 kg</td>
                    <td className="p-2.5">57 cm</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">L</td>
                    <td className="p-2.5">1m72 – 1m80</td>
                    <td className="p-2.5">65 – 76 kg</td>
                    <td className="p-2.5">60 cm</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">XL</td>
                    <td className="p-2.5">1m80 – 1m88</td>
                    <td className="p-2.5">76 – 90 kg</td>
                    <td className="p-2.5">63 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: UPLOAD IMAGE / LOGO SOURCE PICKER                */}
      {/* ========================================================= */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[#16115B]">Tải lên thiết kế / Logo riêng</h3>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Chọn nguồn ảnh bạn muốn in/thêu lên sản phẩm (+35.000đ/sản phẩm):
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full p-3.5 rounded-2xl border border-gray-200 hover:border-[#16115B] hover:bg-[#EEF0FA]/40 flex items-center gap-3.5 transition-all text-left cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EEF0FA] text-[#16115B] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Tải ảnh từ thiết bị</p>
                  <p className="text-[11px] text-gray-500">Chọn tệp PNG, JPG hoặc SVG từ máy tính / điện thoại</p>
                </div>
              </button>

              <button
                type="button"
                onClick={handleSimulateDrive}
                className="w-full p-3.5 rounded-2xl border border-gray-200 hover:border-[#16115B] hover:bg-[#EEF0FA]/40 flex items-center gap-3.5 transition-all text-left cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Chọn từ Google Drive</p>
                  <p className="text-[11px] text-gray-500">Nhập nhanh tệp thiết kế lưu sẵn trên Drive của bạn</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setUploadedImage(PRESET_LOGOS.crest);
                  setCustomMode("image");
                  setIsUploadModalOpen(false);
                  toast.success(lang === "vi" ? "Đã áp dụng huy hiệu UNLO!" : "Applied UNLO crest emblem!");
                }}
                className="w-full p-3.5 rounded-2xl border border-gray-200 hover:border-[#16115B] hover:bg-[#EEF0FA]/40 flex items-center gap-3.5 transition-all text-left cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Thư viện biểu tượng UNLO</p>
                  <p className="text-[11px] text-gray-500">Sử dụng ngay bộ huy hiệu tối giản thiết kế độc quyền</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: FABRIC MACRO INSPECTOR (ẢNH CẬN VẢI XƯỞNG)      */}
      {/* ========================================================= */}
      {isFabricModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-lg font-extrabold text-[#16115B]">Cận cảnh chất liệu vải xưởng UNLO</h3>
                <p className="text-xs text-gray-500">Chụp cận cảnh thực tế tại xưởng đối tác trước công đoạn hoàn thiện</p>
              </div>
              <button
                type="button"
                onClick={() => setIsFabricModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FABRIC_CLOSEUPS.map((fc) => (
                <div key={fc.id} className="rounded-2xl border border-gray-200 overflow-hidden bg-[#F8F7F4] flex flex-col">
                  <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img src={fc.src} alt={fc.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-3.5 space-y-1 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#16115B] leading-tight">{fc.title}</h4>
                      <p className="text-[11px] text-gray-500 leading-snug mt-1">{fc.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setIsFabricModalOpen(false)}
                className="px-6 py-2.5 rounded-full bg-[#16115B] text-white text-xs font-bold hover:bg-[#1F187A] transition-colors cursor-pointer"
              >
                Đã hiểu, quay lại thiết kế
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SLIDE-OVER CART DRAWER                                    */}
      {/* ========================================================= */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl">
            <div className="p-5 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[#16115B]">Giỏ hàng thiết kế của bạn</h3>
              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cartItems.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-12">Giỏ hàng thiết kế đang trống.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="p-3.5 rounded-2xl border border-gray-200 bg-white flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-xs font-extrabold text-[#16115B]">{item.title}</p>
                      <p className="text-[11px] text-gray-500">{item.detail}</p>
                      <p className="text-xs font-bold text-gray-800">
                        SL: {item.qty} · {formatVND(item.total)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCartItems((prev) => prev.filter((i) => i.id !== item.id))}
                      className="text-xs text-gray-400 hover:text-rose-500 p-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-5 border-t border-gray-200 bg-[#F8F7F4] space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-gray-600">Tạm tính</span>
                <span className="text-lg font-extrabold text-[#16115B]">
                  {formatVND(cartItems.reduce((sum, item) => sum + item.total, 0))}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  router.push("/checkout");
                }}
                className="w-full py-3.5 rounded-2xl bg-[#E85D2A] hover:bg-[#D14B1A] text-white font-extrabold text-sm uppercase tracking-wide transition-all cursor-pointer shadow-md"
              >
                Tiến hành đặt hàng →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
