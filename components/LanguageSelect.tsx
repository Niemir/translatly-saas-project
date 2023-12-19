"use client";
import { useLanguageStore } from "@/stores/language";
import { useSubscriptionStore } from "@/stores/subscription";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { LanguageSupported, LanguageSupportedMap } from "@/types/Language";
import LoadingSpinner from "./LoadingSpinner";
import Link from "next/link";
import { isProUser } from "@/lib/utils";

export default function LanguageSelect() {
  const { language, setLanguage, getLanguages, getNotSupportedLanguages } =
    useLanguageStore((state) => state);
  const subscription = useSubscriptionStore((state) => state.subscription);

  const isPro = isProUser(subscription);

  const pathName = usePathname();

  const isChatPage = pathName.includes("/chat");

  return (
    isChatPage && (
      <div>
        <Select
          value={language}
          onValueChange={(value: LanguageSupported) => setLanguage(value)}
        >
          <SelectTrigger className="w-[150px] text-black dark:text-white">
            <SelectValue placeholder={LanguageSupportedMap[language]} />
          </SelectTrigger>
          <SelectContent>
            {subscription === undefined ? (
              <LoadingSpinner />
            ) : (
              <>
                {getLanguages(isPro).map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {LanguageSupportedMap[lang]}
                  </SelectItem>
                ))}
                {getNotSupportedLanguages(isPro).map((lang) => (
                  <Link href={"/register"} key={lang}>
                    <SelectItem
                      key={lang}
                      value={lang}
                      disabled
                      className="bg-gray-300/50 text-gray-500 dark:text-white py-2 my-1"
                    >
                      {LanguageSupportedMap[lang]} (PRO)
                    </SelectItem>
                  </Link>
                ))}
              </>
            )}
          </SelectContent>
        </Select>
      </div>
    )
  );

  return <div>LanguageSelect</div>;
}
