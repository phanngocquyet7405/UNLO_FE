"use client";

import { useState, useRef } from "react";
import {
  Sparkles,
  Package,
  Palette,
  Upload,
  X,
  ZoomIn,
  ZoomOut,
  Shirt,
  Image as ImageIcon,
  Type,
} from "lucide-react";
import { formatVnd } from "@/app/services/api/nullCommerceService";
import RealisticEmbroideryOverlay, {
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
    sublabel: "Vị trí kinh điển, tinh tế",
    coords: REALISTIC_PLACEMENTS.chest_pocket.coords,
  },
  {
    id: "left_cuff",
    label: "Bo tay áo",
    sublabel: "Đường viền bo gấu tay áo",
    coords: REALISTIC_PLACEMENTS.left_cuff.coords,
  },
  {
    id: "hem",
    label: "Góc tà áo",
    sublabel: "Mép gấu áo tối giản",
    coords: REALISTIC_PLACEMENTS.hem.coords,
  },
  {
    id: "inner_neck",
    label: "Gáy cổ áo",
    sublabel: "Bo viền cổ trong",
    coords: REALISTIC_PLACEMENTS.inner_neck.coords,
  },
];

export const EMBROIDERY_FONTS = [
  {
    id: "serif_minimal",
    label: "Cổ điển",
    sublabel: "Libre Bodoni",
    previewClass: "font-serif font-bold tracking-widest",
  },
  {
    id: "italic_atelier",
    label: "Viết tay",
    sublabel: "Bodoni Italic",
    previewClass: "font-serif italic font-semibold tracking-wider",
  },
  {
    id: "sans_architect",
    label: "Hiện đại",
    sublabel: "Climate Sans",
    previewClass: "font-sans font-bold uppercase tracking-widest text-[0.88em]",
  },
];

export const DEFAULT_INKS = [
  { name: "Chàm Midnight Indigo", hex: "#15095D" },
  { name: "Trắng sữa Milky Ivory", hex: "#FCFDF1" },
  { name: "Vàng đồng Amber Gold", hex: "#C59B27" },
  { name: "Xanh khói Periwinkle", hex: "#8D8DC7" },
  { name: "Đỏ rượu Burgundy", hex: "#8B1E2D" },
  { name: "Đen tuyền Carbon", hex: "#1A1A1A" },
];

export const GIFT_BOXES = [
  { id: "none", label: "Túi vải/giấy sinh học xưởng (Tiêu chuẩn)", fee: 0 },
  { id: "minimal_kraft", label: "Hộp quà Periwinkle & nơ lụa", fee: 29000 },
  { id: "atelier_linen", label: "Hộp cứng Midnight Foil cao cấp", fee: 59000 },
];

const SAMPLE_LOGOS = [
  {
    id: "sample_unlo",
    label: "Seal Xưởng UNLO",
    url: "/assets/logo.png",
  },
];

export function computePersonalizationFee(value, config = {}) {
  if (!value?.enabled) return 0;
  let total = 0;
  const isLogo = value?.customType === "logo" && Boolean(value?.logoUrl);
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
}) {
  const [zoomCloseUp, setZoomCloseUp] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  if (!config?.enabled && config?.enabled !== undefined) return null;

  const inks =
    Array.isArray(config.allowedThreadColors) && config.allowedThreadColors.length
      ? config.allowedThreadColors
      : DEFAULT_INKS;
  const maxChars = Math.min(config.maxMonogramChars || 18, 24);
  const currentPlacement =
    EMBROIDERY_PLACEMENTS.find((p) => p.id === value.placement) ||
    EMBROIDERY_PLACEMENTS[0];
  const currentFee = computePersonalizationFee(value, config);

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
      // Tách nền thông minh giúp logo thêu hòa quyện hoàn hảo vào thớ vải
      const cleanDataUrl = await autoRemoveBackground(rawDataUrl);
      patch({
        enabled: true,
        customType: "logo",
        logoUrl: cleanDataUrl,
        logoSvg: null,
        logoName: file.name,
        monogramText: "LOGO",
        innerLabelText: `Logo: ${file.name.slice(0, 20)}`,
        threadColor: previewThreadColor,
        placement: value.placement || "chest_pocket",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer?.files?.[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const clearLogo = () => {
    patch({
      customType: "text",
      logoUrl: "",
      logoSvg: null,
      logoName: "",
      monogramText: config.defaultHeadline || "H.L",
      innerLabelText: "",
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div
      id="studio"
      className="rounded-3xl bg-[#EFF2F9] border border-[#DCE0E7] p-5 sm:p-6 space-y-5 scroll-mt-24 shadow-sm"
    >
      {/* Header Banner & Switch */}
      <div className="flex items-start justify-between gap-4 pb-1">
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
                  ? "chest_pocket"
                  : value.placement,
              threadColor: previewThreadColor,
              monogramText: value.monogramText || config.defaultHeadline || "H.L",
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
        <div className="pt-4 border-t border-[#DCE0E7] space-y-6 animate-fade-in">
          {/* Main 2-Column: Live Shirt Preview on Left, Controls on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* ============================================================
                LEFT: Interactive T-Shirt Preview Canvas
                ============================================================ */}
            <div className="lg:col-span-5 space-y-2">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#BBC2DD] bg-[#F6F7FC] shadow-inner select-none">
                {/* T-Shirt Base Photo with Zoom Focus */}
                <div
                  className="w-full h-full relative transition-transform duration-500 ease-out"
                  style={
                    zoomCloseUp
                      ? {
                          transform: "scale(2.2)",
                          transformOrigin: `${currentPlacement.coords.left} ${currentPlacement.coords.top}`,
                        }
                      : { transform: "scale(1)" }
                  }
                >
                  <img
                    src="/assets/tshirt-model.jpg"
                    alt="Xem trước hình thêu trên áo thun cơ bản"
                    className="w-full h-full object-cover object-top"
                  />

                  {/* Garment Color Tint (if not default ivory) */}
                  {!isLightGarment && (
                    <div
                      className="absolute inset-0 mix-blend-multiply opacity-75 pointer-events-none"
                      style={{ backgroundColor: garmentColorHex }}
                    />
                  )}

                  {/* Realistic Embroidery / Logo Overlay with Interactive Direct-on-Shirt Touchpoints */}
                  <RealisticEmbroideryOverlay
                    customization={value}
                    garmentColorHex={garmentColorHex}
                    interactiveHotspots={true}
                    onSelectPlacement={(placement) => patch({ placement })}
                  />
                </div>

                {/* Viewport Zoom Controls & Badge Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 text-[#15095D] text-[10px] font-bold shadow-xs border border-[#DCE0E7]">
                    <Shirt className="w-3 h-3 text-[#32259B]" />
                    {currentPlacement.label}
                  </span>

                  <button
                    type="button"
                    onClick={() => setZoomCloseUp(!zoomCloseUp)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 hover:bg-white text-[#15095D] text-[10px] font-bold shadow-xs border border-[#DCE0E7] cursor-pointer transition-colors"
                  >
                    {zoomCloseUp ? (
                      <>
                        <ZoomOut className="w-3 h-3" /> Toàn cảnh
                      </>
                    ) : (
                      <>
                        <ZoomIn className="w-3 h-3" /> Cận cảnh thớ chỉ
                      </>
                    )}
                  </button>
                </div>

                <div className="absolute bottom-3 inset-x-3 text-center pointer-events-none">
                  <p className="inline-block px-3 py-1 rounded-full bg-[#15095D]/90 text-[#FCFDF1] text-[10px] backdrop-blur-xs shadow-sm">
                    Chạm các điểm tròn trên áo để đổi vị trí · Phóng to xem sợi thêu
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#4E567A] px-1">
                <span>Thời gian thêu: +{config.extraLeadDays ?? 1}–2 ngày</span>
                <span className="font-semibold text-[#32259B]">
                  Phụ phí: +{formatVnd(currentFee)}
                </span>
              </div>
            </div>

            {/* ============================================================
                RIGHT: Tab Switcher (Monogram / Logo) & Configurations
                ============================================================ */}
            <div className="lg:col-span-7 space-y-4">
              {/* Mode Switcher Tabs */}
              <div className="grid grid-cols-2 p-1 bg-white rounded-2xl border border-[#BBC2DD]">
                <button
                  type="button"
                  onClick={() => patch({ customType: "text" })}
                  className={`h-10 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    !isLogoMode
                      ? "bg-[#15095D] text-white shadow-xs"
                      : "text-[#4E567A] hover:text-[#15095D]"
                  }`}
                >
                  <Type className="w-4 h-4" />
                  <span>1. Thêu Tên / Monogram</span>
                </button>

                <button
                  type="button"
                  onClick={() => patch({ customType: "logo" })}
                  className={`h-10 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isLogoMode
                      ? "bg-[#15095D] text-white shadow-xs"
                      : "text-[#4E567A] hover:text-[#15095D]"
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>2. Thêu / Tải Logo</span>
                </button>
              </div>

              {/* MODE A: TEXT MONOGRAM */}
              {!isLogoMode ? (
                <div className="space-y-4 bg-white p-4 rounded-2xl border border-[#DCE0E7]">
                  <div>
                    <label
                      htmlFor="pdp-monogram-text"
                      className="block text-xs font-bold text-[#15095D] mb-1.5"
                    >
                      Nội dung thêu (Tên / Chữ cái viết tắt)
                    </label>
                    <input
                      id="pdp-monogram-text"
                      type="text"
                      maxLength={maxChars}
                      value={value.monogramText || ""}
                      onChange={(e) =>
                        patch({ monogramText: e.target.value.slice(0, maxChars) })
                      }
                      placeholder={config.defaultHeadline || "VD: H.L hoặc MINH"}
                      className="w-full h-11 px-4 rounded-xl border border-[#BBC2DD] bg-[#F6F7FC] text-sm font-bold text-[#15095D] placeholder:text-[#8D8DC7] outline-none focus:border-[#32259B] focus:bg-white tracking-wider"
                    />
                    <p className="text-[10px] text-[#4E567A] mt-1">
                      Tối đa {maxChars} ký tự. Gợi ý: Chữ cái đầu họ tên (VD: H.L, N.Q, NAM)
                    </p>
                  </div>

                  <div>
                    <span className="block text-xs font-bold text-[#15095D] mb-1.5">
                      Kiểu font chữ thêu
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {EMBROIDERY_FONTS.map((f) => {
                        const active = (value.font || "serif_minimal") === f.id;
                        return (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => patch({ font: f.id })}
                            className={`h-12 px-2 rounded-xl text-left border flex flex-col justify-center transition-all cursor-pointer ${
                              active
                                ? "bg-[#15095D] text-white border-[#15095D] shadow-xs"
                                : "bg-[#F6F7FC] text-[#15095D] border-[#DCE0E7] hover:border-[#625FBC]"
                            }`}
                          >
                            <span className="text-xs font-bold">{f.label}</span>
                            <span
                              className={`text-[10px] opacity-80 line-clamp-1 ${
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
                </div>
              ) : (
                /* MODE B: LOGO UPLOAD */
                <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#DCE0E7]">
                  <div>
                    <span className="block text-xs font-bold text-[#15095D] mb-1.5">
                      Tải file Logo để thêu (PNG trong suốt, JPG, SVG)
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
                      <div className="flex items-center justify-between p-3 rounded-xl border border-[#32259B] bg-[#EFF2F9]/70">
                        <div className="flex items-center gap-3">
                          <img
                            src={value.logoUrl}
                            alt="Logo preview"
                            className="w-10 h-10 object-contain rounded-lg bg-white border border-[#BBC2DD] p-1 shadow-xs"
                          />
                          <div>
                            <p className="text-xs font-bold text-[#15095D] line-clamp-1">
                              {value.logoName || "Logo đã tải lên"}
                            </p>
                            <p className="text-[10px] text-[#1D7A5F] font-semibold">
                              ✓ Đã gắn vào thớ vải áo phông xem trước
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-xs font-semibold text-[#32259B] hover:underline cursor-pointer"
                          >
                            Đổi logo
                          </button>
                          <button
                            type="button"
                            onClick={clearLogo}
                            className="w-7 h-7 rounded-full bg-white text-[#8D8DC7] hover:text-[#A52735] grid place-items-center border border-[#DCE0E7] cursor-pointer"
                            title="Xóa logo"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragActive(true);
                        }}
                        onDragLeave={() => setDragActive(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${
                          dragActive
                            ? "border-[#32259B] bg-[#EFF2F9]"
                            : "border-[#BBC2DD] hover:border-[#32259B] bg-[#F6F7FC]"
                        }`}
                      >
                        <Upload className="w-6 h-6 text-[#32259B] mx-auto mb-1.5" />
                        <p className="text-xs font-bold text-[#15095D]">
                          Kéo thả hoặc click để chọn ảnh Logo
                        </p>
                        <p className="text-[10px] text-[#4E567A] mt-0.5">
                          Khuyên dùng ảnh PNG nền trong suốt để thêu sắc nét nhất (Max 5MB)
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Preset Sample Logos */}
                  <div className="pt-1 space-y-1.5">
                    <span className="text-[10px] font-bold text-[#4E567A] uppercase tracking-wider">
                      Hoặc chọn nhanh logo mẫu xưởng dệt:
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {EMBROIDERY_SAMPLE_LOGOS.map((sample) => {
                        const active = value.logoSvg === sample.svg;
                        return (
                          <button
                            key={sample.id}
                            type="button"
                            onClick={() =>
                              patch({
                                customType: "logo",
                                logoUrl: null,
                                logoSvg: sample.svg,
                                logoName: sample.label,
                                monogramText: "LOGO",
                                innerLabelText: `Logo: ${sample.label}`,
                              })
                            }
                            className={`px-3 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer ${
                              active
                                ? "bg-[#15095D] text-white border-[#15095D] shadow-xs"
                                : "bg-[#EFF2F9] text-[#32259B] border-[#BBC2DD] hover:bg-[#15095D] hover:text-white hover:border-[#15095D]"
                            }`}
                          >
                            + {sample.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Logo Thread Tone Switcher */}
                  {(value.logoUrl || value.logoSvg) && (
                    <div className="pt-2 flex items-center justify-between border-t border-[#DCE0E7] text-xs">
                      <span className="font-bold text-[#15095D]">
                        Kiểu màu thêu Logo:
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => patch({ logoMonochrome: false })}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                            !value.logoMonochrome
                              ? "bg-[#15095D] text-white border-[#15095D]"
                              : "bg-[#F6F7FC] text-[#4E567A] border-[#DCE0E7]"
                          }`}
                        >
                          Màu gốc của ảnh
                        </button>
                        <button
                          type="button"
                          onClick={() => patch({ logoMonochrome: true })}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                            value.logoMonochrome
                              ? "bg-[#15095D] text-white border-[#15095D]"
                              : "bg-[#F6F7FC] text-[#4E567A] border-[#DCE0E7]"
                          }`}
                        >
                          Đồng màu chỉ thêu
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Thread Color & Placement (Common Controls) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4 rounded-2xl border border-[#DCE0E7]">
                {/* Thread Colors */}
                <div>
                  <span className="block text-xs font-bold text-[#15095D] mb-2">
                    Màu chỉ thêu
                  </span>
                  <div className="flex flex-wrap items-center gap-2.5">
                    {inks.map((ink) => {
                      const active = (value.threadColor || previewThreadColor) === ink.hex;
                      return (
                        <button
                          key={ink.name}
                          type="button"
                          title={ink.name}
                          aria-label={`Màu chỉ ${ink.name}`}
                          onClick={() => patch({ threadColor: ink.hex })}
                          className={`w-7 h-7 rounded-full border transition-transform cursor-pointer ${
                            active
                              ? "ring-2 ring-[#15095D] ring-offset-2 scale-110 border-[#15095D]"
                              : "border-[#15095D]/20 hover:scale-105"
                          }`}
                          style={{ backgroundColor: ink.hex }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Placements */}
                <div>
                  <label
                    htmlFor="pdp-placement"
                    className="block text-xs font-bold text-[#15095D] mb-1.5"
                  >
                    Vị trí thêu trên áo
                  </label>
                  <select
                    id="pdp-placement"
                    value={value.placement || "chest_pocket"}
                    onChange={(e) => patch({ placement: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-[#BBC2DD] bg-[#F6F7FC] text-xs font-bold text-[#15095D] outline-none focus:border-[#32259B]"
                  >
                    {EMBROIDERY_PLACEMENTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label} — {p.sublabel}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Inner Collar Label & Gift Box Packaging */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="pdp-inner-label"
                    className="block text-xs font-bold text-[#15095D] mb-1"
                  >
                    Thêu nhãn trong / Gáy áo (+20.000đ)
                  </label>
                  <input
                    id="pdp-inner-label"
                    type="text"
                    maxLength={30}
                    value={value.innerLabelText || ""}
                    onChange={(e) =>
                      patch({ innerLabelText: e.target.value.slice(0, 30) })
                    }
                    placeholder="VD: Minh & Lan · 2026"
                    className="w-full h-10 px-3 rounded-xl border border-[#BBC2DD] bg-white text-xs text-[#15095D] placeholder:text-[#8D8DC7] outline-none focus:border-[#32259B]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="pdp-gift-box"
                    className="block text-xs font-bold text-[#15095D] mb-1"
                  >
                    <span className="inline-flex items-center gap-1">
                      <Package className="w-3.5 h-3.5 text-[#443EB1]" />
                      Đóng gói hộp quà
                    </span>
                  </label>
                  <select
                    id="pdp-gift-box"
                    value={value.giftBoxType || "none"}
                    onChange={(e) => patch({ giftBoxType: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-[#BBC2DD] bg-white text-xs font-semibold text-[#15095D] outline-none focus:border-[#32259B]"
                  >
                    {GIFT_BOXES.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.label} {b.fee > 0 ? `(+${formatVnd(b.fee)})` : "(Miễn phí)"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Note */}
              <div>
                <label
                  htmlFor="pdp-gift-note"
                  className="block text-xs font-bold text-[#15095D] mb-1"
                >
                  Ghi chú cho thợ thêu tại xưởng (miễn phí)
                </label>
                <textarea
                  id="pdp-gift-note"
                  rows={2}
                  maxLength={200}
                  value={value.giftNote || ""}
                  onChange={(e) => patch({ giftNote: e.target.value.slice(0, 200) })}
                  placeholder="Ghi chú thêm về kích thước hình thêu, canh lề ngực áo hoặc lời chúc..."
                  className="w-full px-3 py-2 rounded-xl border border-[#BBC2DD] bg-white text-xs text-[#15095D] placeholder:text-[#8D8DC7] outline-none focus:border-[#32259B] resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
