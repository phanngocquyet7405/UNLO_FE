"use client";

import { useId } from "react";

/**
 * Official UNLO Double-Outlined Wordmark — faithful vector rendering of LOGO.jpg
 * Supports light (default white/meteor header) and dark (midnight galaxy footer) surfaces.
 */
export function UnloLogo({ className = "h-8 w-auto", variant = "light" }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `unlo-fill-${uid}`;
  const isDark = variant === "dark";

  return (
    <svg
      viewBox="0 0 214 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="UNLO"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? "#9EA1D2" : "#5653BA"} />
          <stop offset="52%" stopColor={isDark ? "#625FBC" : "#443EB1"} />
          <stop offset="100%" stopColor={isDark ? "#443EB1" : "#1F147A"} />
        </linearGradient>
      </defs>

      {/* Layer 1: Outer Deep Indigo Outline (#15095D) */}
      <text
        x="107"
        y="46"
        textAnchor="middle"
        fontFamily="var(--font-serif), 'Libre Bodoni', Georgia, serif"
        fontWeight="700"
        fontSize="46"
        letterSpacing="2.5"
        fill="none"
        stroke={isDark ? "#FCFDF1" : "#15095D"}
        strokeWidth="9.5"
        strokeLinejoin="round"
        paintOrder="stroke"
      >
        UNLO
      </text>

      {/* Layer 2: Crisp White / Deep Gap Ring */}
      <text
        x="107"
        y="46"
        textAnchor="middle"
        fontFamily="var(--font-serif), 'Libre Bodoni', Georgia, serif"
        fontWeight="700"
        fontSize="46"
        letterSpacing="2.5"
        fill="none"
        stroke={isDark ? "#15095D" : "#FFFFFF"}
        strokeWidth="5.4"
        strokeLinejoin="round"
        paintOrder="stroke"
      >
        UNLO
      </text>

      {/* Layer 3: Inner Dark Rim + Royal Indigo Gradient Fill */}
      <text
        x="107"
        y="46"
        textAnchor="middle"
        fontFamily="var(--font-serif), 'Libre Bodoni', Georgia, serif"
        fontWeight="700"
        fontSize="46"
        letterSpacing="2.5"
        fill={`url(#${gradId})`}
        stroke={isDark ? "#DCE0E7" : "#15095D"}
        strokeWidth="1.5"
        strokeLinejoin="round"
        paintOrder="stroke"
      >
        UNLO
      </text>
    </svg>
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
