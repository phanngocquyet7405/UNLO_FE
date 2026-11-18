"use client";

import { useId } from "react";

/**
 * Official UNLO Double-Outlined Wordmark — faithful vector rendering of LOGO.jpg
 * Supports light (default white/meteor header) and dark (midnight galaxy footer) surfaces.
 */
export function UnloLogo({ className = "h-8 w-auto", variant = "light" }) {
  const isDark = variant === "dark";
  const logoSrc = isDark ? "/assets/logo/unlo-footer.png" : "/assets/logo/unlo-header.png";

  return (
    <img
      src={logoSrc}
      alt="UNLO — Brandless M2C"
      className={`${className} object-contain select-none`}
      loading="eager"
    />
  );
}

/**
 * Rounded-square Deep Indigo "U" App Icon from the UNLO Moodboard
 */
export function UnloAppIcon({ className = "w-10 h-10" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="UNLO App Icon"
    >
      <rect width="64" height="64" rx="16" fill="#15095D" />
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="14"
        stroke="#625FBC"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      <text
        x="32"
        y="45"
        textAnchor="middle"
        fontFamily="var(--font-serif), 'Libre Bodoni', Georgia, serif"
        fontWeight="700"
        fontSize="36"
        fill="#FFFFFF"
        stroke="#BBC2DD"
        strokeWidth="0.9"
      >
        U
      </text>
    </svg>
  );
}
