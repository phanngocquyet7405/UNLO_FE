"use client";

import React from "react";

/**
 * Tọa độ giải phẫu học thực tế đo đạc trực tiếp từ ảnh người mẫu áo thun (900x900px)
 * Đảm bảo hình thêu nằm chuẩn xác tại các đường may (seams), gấu tay và ngực áo.
 */
export const REALISTIC_PLACEMENTS = {
  chest_pocket: {
    id: "chest_pocket",
    label: "Ngực trái",
    sublabel: "Vị trí kinh điển, ngang tầm mắt",
    coords: { left: "63%", top: "35%" },
    transform: "translate(-50%, -50%) rotate(-0.5deg)",
    textSize: "text-[16px] sm:text-[20px] md:text-[22px]",
    logoMaxHeight: "max-h-[46px] sm:max-h-[54px]",
    logoMaxWidth: "max-w-[64px] sm:max-w-[78px]",
  },
  left_cuff: {
    id: "left_cuff",
    label: "Bo tay áo",
    sublabel: "Đường viền bo gấu tay áo bên trái",
    // Đo đạc chính xác: mép gấu tay áo chạy từ x=675 (y=41.4%) đến x=750 (y=38.8%), góc nghiêng -17 độ
    coords: { left: "79%", top: "37%" },
    transform: "translate(-50%, -50%) rotate(-17deg)",
    textSize: "text-[11px] sm:text-[13px] md:text-[14px]",
    logoMaxHeight: "max-h-[30px] sm:max-h-[36px]",
    logoMaxWidth: "max-w-[42px] sm:max-w-[50px]",
  },
  hem: {
    id: "hem",
    label: "Góc tà áo",
    sublabel: "Phía trên đường vắt sổ gấu áo",
    // Ngay trên đường may viền gấu áo (y=84%), góc rũ tự nhiên của vạt áo -2.5 độ
    coords: { left: "62%", top: "84%" },
    transform: "translate(-50%, -50%) rotate(-2.5deg)",
    textSize: "text-[12px] sm:text-[14px] md:text-[15px]",
    logoMaxHeight: "max-h-[34px] sm:max-h-[40px]",
    logoMaxWidth: "max-w-[48px] sm:max-w-[58px]",
  },
  inner_neck: {
    id: "inner_neck",
    label: "Gáy cổ áo",
    sublabel: "Đường dệt rib bo viền cổ áo",
    coords: { left: "50%", top: "14%" },
    transform: "translate(-50%, -50%) rotate(0deg)",
    textSize: "text-[10px] sm:text-[12px] md:text-[13px]",
    logoMaxHeight: "max-h-[26px] sm:max-h-[30px]",
    logoMaxWidth: "max-w-[36px] sm:max-w-[44px]",
  },
};

export default function RealisticEmbroideryOverlay({
  customization = {},
  garmentColorHex = "#FCFDF1",
  className = "",
  interactiveHotspots = false,
  onSelectPlacement,
}) {
  if (!customization?.enabled) return null;

  const placementKey = customization.placement || "chest_pocket";
  const placementSpec =
    REALISTIC_PLACEMENTS[placementKey] || REALISTIC_PLACEMENTS.chest_pocket;

  const isLogo =
    customization.customType === "logo" &&
    Boolean(customization.logoUrl || customization.logoSvg);

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

  // Hiệu ứng đa tầng bóng đổ sợi chỉ dập nổi 3D (Satin stitch relief)
  // Tạo độ bóng viền trên bắt sáng studio và bóng đổ chìm ăn vào thớ vải cotton 260 GSM
  const realisticTextShadow = isLightGarment
    ? `
      0.7px 0.7px 0px rgba(255, 255, 255, 0.8),
      -0.6px -0.6px 0px rgba(0, 0, 0, 0.35),
      0px 1px 1px rgba(0, 0, 0, 0.45),
      0px 2px 3.5px rgba(21, 9, 93, 0.22)
    `
    : `
      0.7px 0.7px 0px rgba(255, 255, 255, 0.45),
      -0.6px -0.6px 0px rgba(0, 0, 0, 0.65),
      0px 1px 1.5px rgba(0, 0, 0, 0.85),
      0px 2.5px 5px rgba(0, 0, 0, 0.5)
    `;

  return (
    <>
      {/* SVG Filter dùng chung tạo texture viền chỉ thêu vi tính */}
      <svg
        className="absolute w-0 h-0 pointer-events-none -z-10"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="unlo-satin-thread" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.95 0.15"
              numOctaves="2"
              result="grain"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="grain"
              scale="0.8"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feMerge>
              <feMergeNode in="displaced" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Interactive Placement Hotspots (Tùy chọn: chạm trực tiếp lên áo để đổi vị trí) */}
      {interactiveHotspots && onSelectPlacement && (
        <div className="absolute inset-0 pointer-events-auto z-10">
          {Object.entries(REALISTIC_PLACEMENTS).map(([key, item]) => {
            const isCurrent = key === placementKey;
            return (
              <button
                key={key}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPlacement(key);
                }}
                className={`group absolute -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer transition-all ${
                  isCurrent ? "scale-110" : "opacity-40 hover:opacity-100 hover:scale-105"
                }`}
                style={{
                  left: item.coords.left,
                  top: item.coords.top,
                }}
                title={`Chọn vị trí: ${item.label}`}
                aria-label={`Chọn vị trí thêu: ${item.label}`}
              >
                <span className="relative flex h-6 w-6 items-center justify-center">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full transition-opacity ${
                      isCurrent
                        ? "bg-[#32259B]/40 animate-ping"
                        : "bg-white/60 group-hover:bg-[#32259B]/30"
                    }`}
                  />
                  <span
                    className={`relative inline-flex h-3 w-3 rounded-full border border-white shadow-sm transition-colors ${
                      isCurrent
                        ? "bg-[#15095D] ring-2 ring-[#BBC2DD]"
                        : "bg-white/80 group-hover:bg-[#15095D]"
                    }`}
                  />
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Embroidery Container */}
      <div
        className={`absolute transition-all duration-300 pointer-events-none select-none z-20 ${className}`}
        style={{
          left: placementSpec.coords.left,
          top: placementSpec.coords.top,
          transform: placementSpec.transform,
        }}
      >
        {isLogo ? (
          <div
            className="relative flex items-center justify-center transition-transform duration-300 group"
            style={{
              filter: isLightGarment
                ? "drop-shadow(0.5px 0.5px 0px rgba(255,255,255,0.75)) drop-shadow(-0.5px -0.5px 0px rgba(0,0,0,0.3)) drop-shadow(0 1.2px 1.8px rgba(0,0,0,0.42))"
                : "drop-shadow(0.5px 0.5px 0px rgba(255,255,255,0.4)) drop-shadow(0 1.5px 2.5px rgba(0,0,0,0.75))",
            }}
          >
            {customization.logoSvg ? (
              <div
                className={`${placementSpec.logoMaxHeight} ${placementSpec.logoMaxWidth} flex items-center justify-center transition-all duration-300`}
                style={{
                  color: threadColor,
                  filter: "url(#unlo-satin-thread)",
                  mixBlendMode: isLightGarment ? "multiply" : "normal",
                }}
                dangerouslySetInnerHTML={{ __html: customization.logoSvg }}
              />
            ) : (
              <div className="relative">
                <img
                  src={customization.logoUrl}
                  alt="Logo thêu trên áo"
                  className={`${placementSpec.logoMaxHeight} ${placementSpec.logoMaxWidth} object-contain transition-all duration-300`}
                  style={{
                    filter: customization.logoMonochrome
                      ? "grayscale(100%) contrast(150%) drop-shadow(0 0 0 " + threadColor + ")"
                      : "url(#unlo-satin-thread)",
                    mixBlendMode: isLightGarment ? "multiply" : "normal",
                    opacity: 0.95,
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <div
            className="relative flex items-center justify-center transition-transform duration-300"
            style={{
              // Multiply giúp vân vải Supima cotton lọt nhẹ qua các kẽ chỉ thêu, tạo cảm giác sợi chỉ thật
              mixBlendMode: isLightGarment ? "multiply" : "normal",
              filter: "url(#unlo-satin-thread)",
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
    </>
  );
}
