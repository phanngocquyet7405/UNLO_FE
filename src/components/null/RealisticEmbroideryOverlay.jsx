"use client";

import React from "react";

export const REALISTIC_PLACEMENTS = {
  chest_pocket: {
    id: "chest_pocket",
    label: "Ngực trái",
    sublabel: "Vị trí kinh điển, tinh tế",
    coords: { left: "61%", top: "34%" },
    transform: "translate(-50%, -50%) rotate(-0.5deg)",
    textSize: "text-[17px] sm:text-[21px] md:text-[23px]",
    logoMaxHeight: "max-h-[44px] sm:max-h-[52px]",
    logoMaxWidth: "max-w-[60px] sm:max-w-[74px]",
  },
  left_cuff: {
    id: "left_cuff",
    label: "Bo tay áo",
    sublabel: "Đường viền bo gấu tay áo",
    coords: { left: "82.5%", top: "38.5%" },
    transform: "translate(-50%, -50%) rotate(14deg)", // Nghiêng theo gấu ống tay áo thật
    textSize: "text-[11px] sm:text-[13px] md:text-[14px]",
    logoMaxHeight: "max-h-[28px] sm:max-h-[34px]",
    logoMaxWidth: "max-w-[40px] sm:max-w-[48px]",
  },
  hem: {
    id: "hem",
    label: "Góc tà áo",
    sublabel: "Mép gấu áo tối giản",
    coords: { left: "64.5%", top: "91.5%" },
    transform: "translate(-50%, -50%) rotate(-3deg)", // Nghiêng theo đường may gấu áo
    textSize: "text-[12px] sm:text-[14px] md:text-[15px]",
    logoMaxHeight: "max-h-[32px] sm:max-h-[38px]",
    logoMaxWidth: "max-w-[46px] sm:max-w-[56px]",
  },
  inner_neck: {
    id: "inner_neck",
    label: "Gáy cổ áo",
    sublabel: "Bo viền cổ trong",
    coords: { left: "50%", top: "13%" },
    transform: "translate(-50%, -50%) rotate(0deg)",
    textSize: "text-[11px] sm:text-[13px] md:text-[14px]",
    logoMaxHeight: "max-h-[26px] sm:max-h-[30px]",
    logoMaxWidth: "max-w-[36px] sm:max-w-[44px]",
  },
};

export default function RealisticEmbroideryOverlay({
  customization = {},
  garmentColorHex = "#FCFDF1",
  className = "",
  showCrosshair = false,
}) {
  if (!customization?.enabled) return null;

  const placementKey = customization.placement || "chest_pocket";
  const placementSpec =
    REALISTIC_PLACEMENTS[placementKey] || REALISTIC_PLACEMENTS.chest_pocket;

  const isLogo =
    customization.customType === "logo" && Boolean(customization.logoUrl);

  const isLightGarment =
    !garmentColorHex ||
    garmentColorHex.toLowerCase() === "#fcfdf1" ||
    garmentColorHex.toLowerCase() === "#ffffff" ||
    garmentColorHex.toLowerCase() === "#eff2f9" ||
    garmentColorHex.toLowerCase() === "#bbc2dd";

  const threadColor =
    customization.threadColor || (isLightGarment ? "#15095D" : "#FCFDF1");

  const fontClass =
    customization.font === "italic_atelier"
      ? "font-serif italic font-bold tracking-wider"
      : customization.font === "sans_architect"
      ? "font-sans font-extrabold uppercase tracking-widest text-[0.88em]"
      : "font-serif font-black tracking-widest";

  // Hiệu ứng đa tầng bóng đổ 3D sợi chỉ thêu satin dập chìm trên thớ vải cotton
  const realisticTextShadow = isLightGarment
    ? `
      0.6px 0.6px 0px rgba(255,255,255,0.7),
      -0.5px -0.5px 0px rgba(0,0,0,0.38),
      0px 1px 1px rgba(0,0,0,0.48),
      0px 2px 3.5px rgba(21,9,93,0.22)
    `
    : `
      0.6px 0.6px 0px rgba(255,255,255,0.45),
      -0.5px -0.5px 0px rgba(0,0,0,0.65),
      0px 1px 1.5px rgba(0,0,0,0.8),
      0px 2px 4px rgba(0,0,0,0.45)
    `;

  return (
    <div
      className={`absolute transition-all duration-300 pointer-events-none select-none z-20 ${className}`}
      style={{
        left: placementSpec.coords.left,
        top: placementSpec.coords.top,
        transform: placementSpec.transform,
      }}
    >
      {/* Vòng định vị mờ chỉ hiện khi rê chuột hoặc chuyển vị trí (tùy chọn) */}
      {showCrosshair && (
        <span
          className="absolute -inset-2 rounded-full border border-dashed border-[#32259B]/40 animate-pulse pointer-events-none"
          aria-hidden="true"
        />
      )}

      {isLogo ? (
        <div
          className="relative flex items-center justify-center transition-transform duration-300 group"
          style={{
            filter: isLightGarment
              ? "drop-shadow(0 0.6px 0px rgba(255,255,255,0.65)) drop-shadow(0 1px 1.2px rgba(0,0,0,0.4)) drop-shadow(0 2px 3.5px rgba(0,0,0,0.18))"
              : "drop-shadow(0 0.6px 0px rgba(255,255,255,0.35)) drop-shadow(0 1.2px 2px rgba(0,0,0,0.75))",
          }}
        >
          <img
            src={customization.logoUrl}
            alt="Logo thêu trên áo"
            className={`${placementSpec.logoMaxHeight} ${placementSpec.logoMaxWidth} object-contain transition-all duration-300`}
            style={{
              mixBlendMode: isLightGarment ? "multiply" : "normal",
              opacity: 0.94,
            }}
          />
        </div>
      ) : (
        <div
          className="relative flex items-center justify-center transition-transform duration-300"
          style={{
            // Multiply giúp vân vải áo cotton supima lọt nhẹ qua chữ thêu, tạo cảm giác thêu chỉ thật
            mixBlendMode: isLightGarment ? "multiply" : "normal",
          }}
        >
          <span
            className={`leading-none select-none transition-all duration-300 ${fontClass} ${placementSpec.textSize}`}
            style={{
              color: threadColor,
              textShadow: realisticTextShadow,
              letterSpacing: "0.14em",
            }}
          >
            {customization.monogramText || "H.L"}
          </span>
        </div>
      )}
    </div>
  );
}
