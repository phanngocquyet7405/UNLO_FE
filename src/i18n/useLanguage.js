"use client";

import { useState, useEffect, useCallback } from "react";
import { setLocale as setServerLocale } from "@/app/actions/setLocale";

const LANGUAGE_EVENT = "unlo:language-changed";
const STORAGE_KEY = "unlo_language";

function getInitialLanguage() {
  if (typeof window === "undefined") return "vi";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "vi") return saved;
  } catch {}
  return "vi";
}

/**
 * useLanguage hook:
 * Đảm bảo tính nhất quán ngôn ngữ 100%:
 * - Khi ở chế độ VI: Mọi nội dung hiển thị thuần tiếng Việt.
 * - Khi chuyển sang EN: Mọi nội dung hiển thị thuần tiếng Anh.
 * - Tuyệt đối không đan xen Anh / Việt trên cùng một giao diện.
 */
export function useLanguage() {
  const [lang, setLangState] = useState(getInitialLanguage);

  useEffect(() => {
    // Sync initial state asynchronously to avoid cascading renders
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && (saved === "en" || saved === "vi") && saved !== lang) {
          setLangState(saved);
        }
      } catch {}
    }, 0);

    const handleLanguageChange = (e) => {
      const next = e.detail;
      if (next === "vi" || next === "en") {
        setLangState(next);
      }
    };

    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY && (e.newValue === "vi" || e.newValue === "en")) {
        setLangState(e.newValue);
      }
    };

    window.addEventListener(LANGUAGE_EVENT, handleLanguageChange);
    window.addEventListener("storage", handleStorage);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(LANGUAGE_EVENT, handleLanguageChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, [lang]);

  const switchLanguage = useCallback(
    async (target) => {
      const next = target || (lang === "vi" ? "en" : "vi");
      setLangState(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {}
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(LANGUAGE_EVENT, { detail: next }));
      }
      try {
        await setServerLocale(next);
      } catch {}
    },
    [lang]
  );

  const t = useCallback(
    (vi, en) => {
      return lang === "vi" ? vi : en;
    },
    [lang]
  );

  return {
    lang,
    switchLanguage,
    t,
    isVi: lang === "vi",
    isEn: lang === "en",
  };
}
