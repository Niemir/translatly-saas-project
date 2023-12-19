import { LanguageSupported, LanguageSupportedMap } from "@/types/Language";
import { create } from "zustand";

type LanguageState = {
  language: LanguageSupported;
  setLanguage: (language: LanguageSupported) => void;
  getLanguages: (isPro: boolean) => LanguageSupported[];
  getNotSupportedLanguages: (isPro: boolean) => LanguageSupported[];
};

const FREE_LANGUAGES: LanguageSupported[] = ["pl", "en", "es"];

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: "en",
  setLanguage: (language: LanguageSupported) => set({ language }),
  getLanguages: (isPro: boolean) => {
    if (isPro) {
      return Object.keys(LanguageSupportedMap) as LanguageSupported[];
    }
    return Object.keys(LanguageSupportedMap).filter((supportedLanguage) =>
      FREE_LANGUAGES.includes(supportedLanguage as LanguageSupported)
    ) as LanguageSupported[];
  },
  getNotSupportedLanguages: (isPro: boolean) => {
    if (isPro) {
      return [] as LanguageSupported[];
    }
    return Object.keys(LanguageSupportedMap).filter(
      (supportedLanguage) =>
        !FREE_LANGUAGES.includes(supportedLanguage as LanguageSupported)
    ) as LanguageSupported[];
  },
}));
