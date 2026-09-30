"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { en } from "./translations/en";
import { hi } from "./translations/hi";
import { te } from "./translations/te";
import { ta } from "./translations/ta";
import { bn } from "./translations/bn";
import { mr } from "./translations/mr";
import { gu } from "./translations/gu";
import { kn } from "./translations/kn";

export type SupportedLanguage = "en" | "hi" | "te" | "ta" | "bn" | "mr" | "gu" | "kn";

export const LANGUAGES: { code: SupportedLanguage; label: string; script: string }[] = [
  { code: "en", label: "English", script: "English" },
  { code: "hi", label: "हिंदी", script: "Hindi" },
  { code: "te", label: "తెలుగు", script: "Telugu" },
  { code: "ta", label: "தமிழ்", script: "Tamil" },
  { code: "bn", label: "বাংলা", script: "Bengali" },
  { code: "mr", label: "मराठी", script: "Marathi" },
  { code: "gu", label: "ગુજરાતી", script: "Gujarati" },
  { code: "kn", label: "ಕನ್ನಡ", script: "Kannada" },
];

const TRANSLATIONS = { en, hi, te, ta, bn, mr, gu, kn };
export type TranslationDict = typeof en;

interface I18nContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDict;
}

const I18nContext = createContext<I18nContextType>({
  language: "en",
  setLanguage: () => {},
  t: en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("standardsync_lang") as SupportedLanguage;
    if (saved && TRANSLATIONS[saved]) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem("standardsync_lang", lang);
  };

  // Prevent hydration mismatch by using English initially on the server
  const t = mounted ? TRANSLATIONS[language] : en;

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
