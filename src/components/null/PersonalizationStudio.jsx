"use client";

import { useState, useRef } from "react";
import {
  Sparkles,
  Upload,
  X,
  Shirt,
  Image as ImageIcon,
  Type,
  ShoppingBag,
  ArrowRight,
  Check,
} from "lucide-react";
import { formatVnd } from "@/app/services/api/nullCommerceService";
import {
  REALISTIC_PLACEMENTS,
} from "./RealisticEmbroideryOverlay";
import {
  autoRemoveBackground,
  EMBROIDERY_SAMPLE_LOGOS,
} from "@/lib/embroideryUtils";

export const EMBROIDERY_PLACEMENTS = [
  {
    id: "chest_pocket",
    label: "Ngực trái",
    sublabel: "Kinh điển, tinh tế",
    coords: REALISTIC_PLACEMENTS.chest_pocket.coords,
  },
  {
    id: "left_cuff",
    label: "Bo tay áo",
    sublabel: "Kín đáo khi cử động",
    coords: REALISTIC_PLACEMENTS.left_cuff.coords,
  },
  {
    id: "hem",
    label: "Góc tà áo",
    sublabel: "Tối giản vạt áo",
    coords: REALISTIC_PLACEMENTS.hem.coords,
  },
  {
    id: "inner_neck",
    label: "Gáy cổ áo",
    sublabel: "Sau gáy cổ trong",
    coords: REALISTIC_PLACEMENTS.inner_neck.coords,
  },
];

export const EMBROIDERY_FONTS = [
  {
    id: "serif_minimal",
    label: "Cổ điển",
    sublabel: "Bodoni",
    previewClass: "font-serif font-bold tracking-widest",
  },
  {
    id: "italic_atelier",
    label: "Viết tay",
    sublabel: "Italic",
    previewClass: "font-serif italic font-semibold tracking-wider",
  },
  {
    id: "sans_architect",
    label: "Hiện đại",
    sublabel: "Sans",
    previewClass: "font-sans font-bold uppercase tracking-widest text-[0.88em]",
  },
];

export const DEFAULT_INKS = [
  { name: "Chàm Indigo", hex: "#15095D" },
  { name: "Trắng sữa", hex: "#FCFDF1" },
  { name: "Vàng đồng", hex: "#C59B27" },
  { name: "Xanh khói", hex: "#8D8DC7" },
  { name: "Đỏ rượu", hex: "#8B1E2D" },
  { name: "Đen tuyền", hex: "#1A1A1A" },
];

export const GIFT_BOXES = [
  { id: "none", label: "Túi vải/giấy sinh học xưởng (Tiêu chuẩn)", fee: 0 },
  { id: "minimal_kraft", label: "Hộp quà Periwinkle & nơ lụa", fee: 29000 },
  { id: "atelier_linen", label: "Hộp cứng Midnight Foil cao cấp", fee: 59000 },
];

export function computePersonalizationFee(value, config = {}) {
  if (!value?.enabled) return 0;
  let total = 0;
  const isLogo = value?.customType === "logo" && Boolean(value?.logoUrl || value?.logoSvg);
  if (isLogo) {
    total += config?.logoFee ?? 45000;
  } else if (value.monogramText?.trim()) {
    total += config?.monogramFee ?? 35000;
  }
  if (value.innerLabelText?.trim()) total += config?.innerLabelFee ?? 20000;
  const box = GIFT_BOXES.find((b) => b.id === value.giftBoxType);
  if (box) total += box.fee;
  return total;
}

export default function PersonalizationStudio({
  config = {},
  value = {},
  onChange,
  garmentColorHex = "#FCFDF1",
  isEmbeddedInProductPage = false,
  product = null,
  factory = null,
  totalUnitPrice = 0,
  comparePrice = 0,
  savingsPct = 0,
  onAddToCart,
  onOpenSizeChart,
  season = null, // áo theo mùa (object từ lib/seasonalGarments) hoặc null
}) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  if (!config?.enabled && config?.enabled !== undefined) return null;

  const inks = DEFAULT_INKS;
  const maxChars = 5; // Image 2: "Tối đa 5 ký tự viết tắt"
  const currentPlacement =
    EMBROIDERY_PLACEMENTS.find((p) => p.id === value.placement) ||
    EMBROIDERY_PLACEMENTS.find((p) => p.id === "left_cuff") ||
    EMBROIDERY_PLACEMENTS[0];
  const currentFee = computePersonalizationFee(value, config);

  // Áo theo mùa: bỏ "Gáy cổ áo" (không thấy trên ảnh mặt trước), thêm "Giữa ngực / Túi áo"
  const placementOptions = season
    ? [
        EMBROIDERY_PLACEMENTS.find((p) => p.id === "chest_pocket"),
        {
          id: "center",
          label: season.centerLabel,
          sublabel: "Điểm nhấn giữa thân",
        },
        EMBROIDERY_PLACEMENTS.find((p) => p.id === "hem"),
        EMBROIDERY_PLACEMENTS.find((p) => p.id === "left_cuff"),
      ].filter(Boolean)
    : EMBROIDERY_PLACEMENTS;

  const isLightGarment =
    garmentColorHex?.toLowerCase() === "#fcfdf1" ||
    garmentColorHex?.toLowerCase() === "#eff2f9" ||
    garmentColorHex?.toLowerCase() === "#dce0e7" ||
    garmentColorHex?.toLowerCase() === "#bbc2dd" ||
    garmentColorHex?.toLowerCase() === "#ffffff";

  const previewThreadColor =
    value.threadColor || (isLightGarment ? "#15095D" : "#FCFDF1");

  const isLogoMode = value.customType === "logo";

  const patch = (next) => {
    onChange({ ...value, ...next });
  };

  const handleFileUpload = (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Dung lượng file tối đa là 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      const rawDataUrl = e.target?.result;
      const cleanDataUrl = await autoRemoveBackground(rawDataUrl);
      patch({
        enabled: true,
        customType: "logo",
        logoUrl: cleanDataUrl,
        logoSvg: null,
        logoName: file.name,
        monogramText: "LOGO",
        threadColor: previewThreadColor,
        placement: value.placement || "left_cuff",
      });
    };
    reader.readAsDataURL(file);
  };

  const clearLogo = () => {
    patch({
      customType: "text",
      logoUrl: "",
      logoSvg: null,
      logoName: "",
      monogramText: "H.L",
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div
      id="studio"
      className="rounded-3xl bg-white border border-[#DCE0E7] p-5 sm:p-7 space-y-6 scroll-mt-24 shadow-sm"
    >
      {/* Header Banner & Switch */}
      <div className="flex items-start justify-between gap-4 pb-2 border-b border-[#EFF2F9]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#15095D] text-white grid place-items-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-[#BBC2DD]" aria-hidden="true" />
            </span>
            <h3 className="font-serif text-base sm:text-lg font-semibold text-[#15095D]">
              Xưởng Cá Nhân Hóa — Thêu Tên &amp; Logo Lên Áo
            </h3>
          </div>
          <p className="text-xs text-[#4E567A] leading-relaxed max-w-xl">
            Thêu chữ viết tắt (Monogram) hoặc tải logo công ty/nhóm thêu vi tính 14 mũi/inch trực tiếp tại xưởng dệt may, không qua trung gian.
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={Boolean(value.enabled)}
          onClick={() =>
            patch({
              enabled: !value.enabled,
              customType: value.customType || "text",
              placement:
                !value.placement || value.placement === "none"
                  ? "left_cuff"
                  : value.placement,
              threadColor: previewThreadColor,
              monogramText: value.monogramText || "H.L",
              font: value.font || "serif_minimal",
            })
          }
          className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
            value.enabled ? "bg-[#32259B]" : "bg-[#BBC2DD]"
          }`}
          aria-label="Bật tắt xưởng cá nhân hóa"
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition-transform ${
              value.enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {value.enabled && (
        <div className="space-y-6 animate-fade-in">
          {/* Subtle Mode Switcher (Thêu tên vs Tải logo) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => patch({ customType: "text" })}
              className={`h-9 px-4 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-all cursor-pointer border ${
                !isLogoMode
                  ? "bg-[#15095D] text-white border-[#15095D] shadow-xs"
                  : "bg-[#F6F7FC] text-[#4E567A] border-[#DCE0E7] hover:text-[#15095D]"
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>1. Thêu Tên / Monogram</span>
            </button>

            <button
              type="button"
              onClick={() => patch({ customType: "logo" })}
              className={`h-9 px-4 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-all cursor-pointer border ${
                isLogoMode
                  ? "bg-[#15095D] text-white border-[#15095D] shadow-xs"
                  : "bg-[#F6F7FC] text-[#4E567A] border-[#DCE0E7] hover:text-[#15095D]"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>2. Thêu / Tải Logo</span>
            </button>
          </div>

          {/* ============================================================
              PHẦN 1: NỘI DUNG THÊU HOẶC TẢI LOGO (CHÍNH XÁC MOCKUP IMAGE 2)
              ============================================================ */}
          {!isLogoMode ? (
            <div className="space-y-2">
              <label
                htmlFor="pdp-monogram-text"
                className="block text-xs font-bold uppercase tracking-[0.14em] text-[#15095D]"
              >
                NỘI DUNG THÊU
              </label>
              <input
                id="pdp-monogram-text"
                type="text"
                maxLength={maxChars}
                value={value.monogramText ?? "H.L"}
                onChange={(e) =>
                  patch({ monogramText: e.target.value.slice(0, maxChars) })
                }
                placeholder="H.L"
                className="w-full h-12 px-4 rounded-xl border border-[#BBC2DD] bg-[#F6F7FC] text-base font-bold text-[#15095D] placeholder:text-[#8D8DC7] outline-none focus:border-[#32259B] focus:bg-white tracking-widest uppercase transition-all"
              />
              <p className="text-xs text-[#5E607E]">
                Hiển thị ngay trên áo bên trái. Tối đa 5 ký tự viết tắt.
              </p>
            </div>
          ) : (
            <div className="space-y-3 bg-[#F6F7FC] p-4 rounded-2xl border border-[#DCE0E7]">
              <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#15095D]">
                TẢI FILE LOGO ĐỂ THÊU
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/svg+xml, image/webp"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                }}
              />
              {value.logoUrl ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#BBC2DD]">
                  <div className="flex items-center gap-3">
                    <img
                      src={value.logoUrl}
                      alt="Logo đã tải lên"
                      className="w-10 h-10 object-contain rounded-lg border border-[#DCE0E7] bg-white p-1"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#15095D] truncate max-w-[180px]">
                        {value.logoName || "Logo thêu"}
                      </p>
                      <p className="text-[10px] text-[#1D7A5F] font-semibold">
                        ✓ Đã tự động tách nền vải
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={clearLogo}
                    className="p-1.5 rounded-lg text-[#8D8DC7] hover:text-[#15095D] hover:bg-[#F6F7FC] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    if (e.dataTransfer?.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
                  }}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                    dragActive
                      ? "border-[#32259B] bg-[#EFF2F9]"
                      : "border-[#BBC2DD] hover:border-[#625FBC] bg-white"
                  }`}
                >
                  <Upload className="w-6 h-6 mx-auto text-[#625FBC] mb-1.5" />
                  <p className="text-xs font-bold text-[#15095D]">
                    Nhấn để tải file hoặc kéo thả logo vào đây
                  </p>
                  <p className="text-[10px] text-[#4E567A] mt-0.5">
                    Hỗ trợ PNG trong suốt, JPG, SVG (Tối đa 5MB)
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ============================================================
              PHẦN 2: KIỂU CHỮ (3 NÚT NGANG CHÍNH XÁC MOCKUP IMAGE 2)
              ============================================================ */}
          {!isLogoMode && (
            <div className="space-y-2">
              <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#15095D]">
                KIỂU CHỮ
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {EMBROIDERY_FONTS.map((f) => {
                  const active = (value.font || "serif_minimal") === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => patch({ font: f.id })}
                      className={`h-12 px-3 rounded-2xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                        active
                          ? "bg-[#15095D] text-white border-[#15095D] shadow-sm"
                          : "bg-white text-[#15095D] border-[#BBC2DD] hover:border-[#15095D]"
                      }`}
                    >
                      <span className="text-xs font-bold leading-tight">{f.label}</span>
                      <span
                        className={`text-[10px] ${
                          active ? "text-[#BBC2DD]" : "text-[#4E567A]"
                        }`}
                      >
                        {f.sublabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================
              PHẦN 3: MÀU CHỈ THÊU (6 NÚT CHẤM MÀU CHÍNH XÁC MOCKUP IMAGE 2)
              ============================================================ */}
          <div className="space-y-2">
            <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#15095D]">
              MÀU CHỈ THÊU
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {inks.map((ink) => {
                const active = previewThreadColor?.toLowerCase() === ink.hex.toLowerCase();
                return (
                  <button
                    key={ink.name}
                    type="button"
                    onClick={() => patch({ threadColor: ink.hex })}
                    className={`h-11 px-3 rounded-2xl border flex items-center gap-2.5 transition-all cursor-pointer text-left ${
                      active
                        ? "bg-[#15095D] text-white border-[#15095D] shadow-sm"
                        : "bg-white text-[#15095D] border-[#BBC2DD] hover:border-[#15095D]"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/10"
                      style={{ backgroundColor: ink.hex }}
                    />
                    <span className="text-xs font-bold truncate">{ink.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ============================================================
              PHẦN 4: VỊ TRÍ THÊU (4 Ô CARD CHÍNH XÁC MOCKUP IMAGE 2)
              ============================================================ */}
          <div className="space-y-2">
            <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#15095D]">
              VỊ TRÍ THÊU
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {placementOptions.map((p) => {
                const active = (value.placement || "left_cuff") === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => patch({ placement: p.id })}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-center transition-all cursor-pointer ${
                      active
                        ? "bg-[#15095D] text-white border-[#15095D] shadow-sm"
                        : "bg-white text-[#15095D] border-[#BBC2DD] hover:border-[#15095D]"
                    }`}
                  >
                    <span className="text-xs font-bold leading-tight">{p.label}</span>
                    <span
                      className={`text-[10px] mt-0.5 line-clamp-1 ${
                        active ? "text-[#BBC2DD]" : "text-[#5E607E]"
                      }`}
                    >
                      {p.sublabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ============================================================
              PHẦN 5: TÓM TẮT GIÁ & NÚT MUA HÀNG (CHÍNH XÁC MOCKUP IMAGE 2)
              ============================================================ */}
          {product && (
            <div className="rounded-2xl bg-[#FCFDF1] border border-[#E3E5F3] p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-bold uppercase tracking-[0.1em] text-[#15095D] truncate">
                  {product.name?.split("—")[0] || "ÁO THUN SUPIMA COTTON 260 GSM"} + THÊU RIÊNG
                </span>
                <span className="text-[#5E607E] font-semibold shrink-0">
                  {factory?.shortName || "Xưởng Dệt Kim Số 04"}
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#15095D] tabular-nums font-mono">
                  {formatVnd(totalUnitPrice || 280000)}
                </span>
                {comparePrice > 0 && (
                  <span className="text-sm text-[#8D8DC7] line-through tabular-nums font-mono">
                    {formatVnd(comparePrice || 690000)}
                  </span>
                )}
                {savingsPct > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E5F5EC] text-[#1D7A5F] text-xs font-bold">
                    Tiết kiệm -{savingsPct}%
                  </span>
                )}
              </div>

              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={onAddToCart}
                  className="w-full h-12 rounded-full bg-[#15095D] text-white hover:bg-[#1F0C85] text-xs sm:text-sm font-bold uppercase tracking-[0.08em] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                  <span>Chọn áo để thêu ngay</span>
                </button>

                {onOpenSizeChart && (
                  <button
                    type="button"
                    onClick={onOpenSizeChart}
                    className="w-full h-11 rounded-full border border-[#BBC2DD] bg-white text-[#15095D] hover:bg-[#F6F7FC] text-xs font-bold uppercase tracking-[0.08em] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Xem bảng size chi tiết</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
