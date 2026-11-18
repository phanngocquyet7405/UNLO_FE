"use client";

import { useState } from "react";
import { Sparkles, Package, Clock, Palette } from "lucide-react";
import { formatVnd } from "@/app/services/api/nullCommerceService";

// Keys strictly match cartLine.mjs allowed values while UI labels reflect UNLO custom print studio
const PLACEMENTS = [
  { id: "left_cuff", label: "Chính giữa mặt trước" },
  { id: "hem", label: "Góc dưới tinh tế" },
  { id: "inner_neck", label: "Mặt trong lời chúc" },
  { id: "chest_pocket", label: "Mặt sau / Phong bì" },
];

const FONTS = [
  { id: "serif_minimal", label: "Libre Bodoni", previewClass: "font-serif font-bold tracking-tight" },
  { id: "italic_atelier", label: "Bodoni Italic", previewClass: "font-serif italic font-semibold" },
  { id: "sans_architect", label: "Climate Display", previewClass: "unlo-display-en tracking-wide" },
];

const DEFAULT_INKS = [
  { name: "Midnight Indigo", hex: "#15095D" },
  { name: "Milky Ivory", hex: "#FCFDF1" },
  { name: "Royal Iris", hex: "#443EB1" },
  { name: "Periwinkle Mist", hex: "#9EA1D2" },
  { name: "Planetary Blue", hex: "#334EAB" },
];

const GIFT_BOXES = [
  { id: "none", label: "Bao bì tiêu chuẩn UNLO (Kèm phong bì)", fee: 0 },
  { id: "minimal_kraft", label: "Hộp quà Periwinkle & ruy băng lụa", fee: 29000 },
  { id: "atelier_linen", label: "Hộp cứng Midnight Foil cao cấp", fee: 59000 },
];

export function computePersonalizationFee(value, config = {}) {
  if (!value?.enabled) return 0;
  let total = 0;
  if (value.monogramText?.trim()) total += config?.monogramFee ?? 35000;
  if (value.innerLabelText?.trim()) total += config?.innerLabelFee ?? 25000;
  const box = GIFT_BOXES.find((b) => b.id === value.giftBoxType);
  if (box) total += box.fee;
  return total;
}

export default function PersonalizationStudio({
  config = {},
  value,
  onChange,
  garmentColorHex = "#15095D",
}) {
  const [morphing, setMorphing] = useState(false);

  if (!config?.enabled) return null;

  const inks =
    Array.isArray(config.allowedThreadColors) && config.allowedThreadColors.length
      ? config.allowedThreadColors
      : DEFAULT_INKS;
  const maxChars = Math.min(config.maxMonogramChars || 18, 24);
  const currentFont = FONTS.find((f) => f.id === value.font) || FONTS[0];
  const currentPlacement = PLACEMENTS.find((p) => p.id === value.placement) || PLACEMENTS[0];
  const currentFee = computePersonalizationFee(value, config);

  const isLightSurface =
    garmentColorHex?.toLowerCase() === "#fcfdf1" ||
    garmentColorHex?.toLowerCase() === "#eff2f9" ||
    garmentColorHex?.toLowerCase() === "#dce0e7" ||
    garmentColorHex?.toLowerCase() === "#bbc2dd" ||
    garmentColorHex?.toLowerCase() === "#d4e4f7" ||
    garmentColorHex?.toLowerCase() === "#c2d9f0";

  const previewInk =
    value.threadColor || (isLightSurface ? "#15095D" : "#FCFDF1");

  const patch = (next, animatePreview = false) => {
    if (animatePreview) {
      setMorphing(true);
      setTimeout(() => setMorphing(false), 140);
    }
    onChange({ ...value, ...next });
  };

  return (
    <div
      id="studio"
      className="rounded-3xl bg-[#EFF2F9] border border-[#DCE0E7] p-5 sm:p-6 space-y-4 scroll-mt-24"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#32259B]" aria-hidden="true" />
            <h3 className="font-serif text-base font-semibold text-[#15095D]">
              Tùy Biến Cá Nhân Hóa Không Logo (Subtle Customization)
            </h3>
          </div>
          <p className="text-xs text-[#4E567A]">
            Thêu chữ viết tắt kín đáo, dập chìm trên đồ da hoặc chọn ghi chú độ dài ống ngay tại xưởng với chi phí tối thiểu.
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={Boolean(value.enabled)}
          onClick={() =>
            patch({
              enabled: !value.enabled,
              placement: value.placement === "none" ? "left_cuff" : value.placement,
              threadColor:
                value.threadColor || (isLightSurface ? "#15095D" : "#FCFDF1"),
            })
          }
          className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
            value.enabled ? "bg-[#32259B]" : "bg-[#BBC2DD]"
          }`}
          aria-label="Bật tắt studio cá nhân hóa"
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition-transform ${
              value.enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {value.enabled && (
        <div className="pt-4 border-t border-[#DCE0E7] space-y-5 animate-fade-in">
          {/* Live Card / Product Print Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center bg-white rounded-2xl p-4 border border-[#DCE0E7]">
            <div
              className="sm:col-span-2 aspect-[4/3] rounded-xl flex flex-col items-center justify-center p-4 text-center relative border border-[#DCE0E7] transition-[background-color] duration-200"
              style={{ backgroundColor: garmentColorHex || "#15095D" }}
            >
              <span className="absolute top-2 left-2.5 text-[10px] px-2.5 py-0.5 rounded-full bg-white/92 text-[#15095D] font-semibold shadow-xs">
                {currentPlacement.label}
              </span>
              <span
                className={`text-lg sm:text-xl leading-tight select-none null-morph-text break-words max-w-full ${currentFont.previewClass}`}
                style={{
                  color: previewInk,
                  filter: morphing ? "blur(1.5px)" : "blur(0px)",
                  opacity: morphing ? 0.65 : 1,
                }}
              >
                {value.monogramText?.trim() || config.defaultHeadline || "UNLO STUDIO"}
              </span>
              {(value.innerLabelText?.trim() || config.defaultSubline) && (
                <span
                  className="mt-2 font-serif italic text-[11px] leading-snug opacity-90"
                  style={{ color: previewInk }}
                >
                  {value.innerLabelText?.trim() || config.defaultSubline}
                </span>
              )}
            </div>

            <div className="sm:col-span-3 space-y-2 text-sm">
              <p className="font-semibold text-[#15095D] inline-flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#443EB1]" aria-hidden="true" />
                Xem trước bản in cá nhân hóa
              </p>
              <p className="text-xs text-[#4E567A] leading-relaxed">
                Đội ngũ thiết kế UNLO sẽ cân chỉnh bố cục chuẩn in ấn trước khi xuất xưởng. Cam kết in lại 100% miễn phí nếu sai nội dung duyệt.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#4E567A]">
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#443EB1]" aria-hidden="true" />
                  Thời gian in: +{config.extraLeadDays ?? 2} ngày
                </span>
                <span className="font-mono font-semibold text-[#32259B] tabular-nums">
                  Phụ phí tùy chỉnh: +{formatVnd(currentFee)}
                </span>
              </div>
            </div>
          </div>

          {/* Headline + Font Picker */}
          {config.allowMonogram !== false && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="pdp-monogram-text"
                  className="block text-xs font-semibold text-[#15095D] mb-1.5"
                >
                  Tiêu đề / Chữ in chính (+{formatVnd(config.monogramFee ?? 35000)})
                </label>
                <input
                  id="pdp-monogram-text"
                  type="text"
                  maxLength={maxChars}
                  value={value.monogramText || ""}
                  onChange={(e) => patch({ monogramText: e.target.value.slice(0, maxChars) })}
                  placeholder={config.defaultHeadline || "VD: MERRY CHRISTMAS"}
                  className="w-full h-11 px-4 rounded-xl border border-[#BBC2DD] bg-white text-sm text-[#15095D] placeholder:text-[#8D8DC7] outline-none focus:border-[#32259B]"
                />
              </div>

              <div>
                <span className="block text-xs font-semibold text-[#15095D] mb-1.5">
                  Kiểu chữ hiển thị
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {FONTS.map((f) => {
                    const active = value.font === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => patch({ font: f.id }, true)}
                        className={`h-11 px-2 rounded-xl text-[11px] font-semibold border transition-colors cursor-pointer ${
                          active
                            ? "bg-[#15095D] text-[#FCFDF1] border-[#15095D]"
                            : "bg-white text-[#15095D] border-[#DCE0E7] hover:border-[#625FBC]"
                        }`}
                      >
                        {f.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Ink / Foil Color + Placement */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="block text-xs font-semibold text-[#15095D] mb-2">
                Màu mực in / Ép kim Foil
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {inks.map((ink) => {
                  const active = (value.threadColor || previewInk) === ink.hex;
                  return (
                    <button
                      key={ink.name}
                      type="button"
                      title={ink.name}
                      aria-label={`Màu mực ${ink.name}`}
                      data-active={active ? "true" : "false"}
                      onClick={() => patch({ threadColor: ink.hex }, true)}
                      className="null-swatch w-7 h-7 border border-[#15095D]/25 cursor-pointer"
                      style={{ backgroundColor: ink.hex }}
                    />
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="pdp-placement"
                className="block text-xs font-semibold text-[#15095D] mb-1.5"
              >
                Vị trí in ấn
              </label>
              <select
                id="pdp-placement"
                value={value.placement || "left_cuff"}
                onChange={(e) => patch({ placement: e.target.value })}
                className="w-full h-11 px-3.5 rounded-xl border border-[#BBC2DD] bg-white text-xs font-semibold text-[#15095D] outline-none focus:border-[#32259B]"
              >
                {PLACEMENTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subline / Recipient Name + Gift Packaging */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="pdp-inner-label"
                className="block text-xs font-semibold text-[#15095D] mb-1.5"
              >
                Tên người nhận / Ngày sự kiện (+{formatVnd(config.innerLabelFee ?? 25000)})
              </label>
              <input
                id="pdp-inner-label"
                type="text"
                maxLength={30}
                value={value.innerLabelText || ""}
                onChange={(e) => patch({ innerLabelText: e.target.value.slice(0, 30) })}
                placeholder={config.defaultSubline || "VD: Minh & Lan · 2026"}
                className="w-full h-11 px-4 rounded-xl border border-[#BBC2DD] bg-white text-sm text-[#15095D] placeholder:text-[#8D8DC7] outline-none focus:border-[#32259B]"
              />
            </div>

            <div>
              <label
                htmlFor="pdp-gift-box"
                className="block text-xs font-semibold text-[#15095D] mb-1.5"
              >
                <span className="inline-flex items-center gap-1">
                  <Package className="w-3.5 h-3.5 text-[#443EB1]" aria-hidden="true" />
                  Đóng gói quà tặng
                </span>
              </label>
              <select
                id="pdp-gift-box"
                value={value.giftBoxType || "none"}
                onChange={(e) => patch({ giftBoxType: e.target.value })}
                className="w-full h-11 px-3.5 rounded-xl border border-[#BBC2DD] bg-white text-xs font-semibold text-[#15095D] outline-none focus:border-[#32259B]"
              >
                {GIFT_BOXES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label} {b.fee > 0 ? `(+${formatVnd(b.fee)})` : "(Miễn phí)"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Personal Note */}
          <div>
            <label
              htmlFor="pdp-gift-note"
              className="block text-xs font-semibold text-[#15095D] mb-1.5"
            >
              Ghi chú thiết kế / Lời chúc đính kèm (miễn phí)
            </label>
            <textarea
              id="pdp-gift-note"
              rows={2}
              maxLength={200}
              value={value.giftNote || ""}
              onChange={(e) => patch({ giftNote: e.target.value.slice(0, 200) })}
              placeholder="Ghi chú thêm về bố cục, hình ảnh muốn gửi hoặc lời chúc viết tay kèm hộp quà..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#BBC2DD] bg-white text-sm text-[#15095D] placeholder:text-[#8D8DC7] outline-none focus:border-[#32259B] resize-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
