import { Subscription } from "@/types/Subscription";
import { create } from "zustand";
export type LanguageSupported = "en" | "fr" | "pl" | "be" | "ru" | "es" | "de";

export const LanguageSupportedMap: Record<LanguageSupported, string> = {
  pl: "Polish",
  en: "English",
  de: "German",
  es: "Spanish",
  be: "Belarusian",
  fr: "French",
  ru: "Russian",
};

interface SubscriptionState {
  subscription?: Subscription | null;
  setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));
