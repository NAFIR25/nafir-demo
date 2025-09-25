// src/contexts/I18nProvider.tsx
"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "ar" | "en";

const messages = {
  ar: {
    language: "اللغة",
    arabic: "العربية",
    english: "English",
  },
  en: {
    language: "Language",
    arabic: "العربية",
    english: "English",
  },
} as const;

type Ctx = {
  t: (k: keyof typeof messages["ar"]) => string;
  locale: Locale;
  setLocale: (l: Locale) => void;
};

const I18nContext = createContext<Ctx | null>(null);

// Hook للاستخدام داخل المكوّنات
export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}

// ✅ تصدير افتراضي
export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("ar");

  // استرجاع اللغة المحفوظة
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("nafir:locale")) as Locale | null;
    if (saved) setLocale(saved);
  }, []);

  // ضبط lang/dir + حفظ الاختيار
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", locale);
      document.documentElement.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("nafir:locale", locale);
    }
  }, [locale]);

  const t = useMemo(() => {
    const dict = messages[locale];
    return (k: keyof typeof messages["ar"]) => dict[k];
  }, [locale]);

  const value = useMemo(() => ({ t, locale, setLocale }), [t, locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
