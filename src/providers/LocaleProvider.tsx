"use client";
import { langs as Lang } from "@prisma/client";
import { ReactNode, createContext, useContext, useState } from "react";

import { locales } from "@/locales";
import { LocalePath } from "@/locales/types";

type LocaleContextType = {
  lang: Lang;
  t: (key: LocalePath) => string;
  setLang: (lang: Lang) => void;
};

const defaultValue: LocaleContextType = {
  lang: "pt",
  t: (key: LocalePath) => {
    throw new Error("LocaleProvider not found");
  },
  setLang: (lang: Lang) => {
    throw new Error("LocaleProvider not found");
  },
};

const LocaleContext = createContext<LocaleContextType>(defaultValue);

const useLocaleCtx = () => useContext(LocaleContext);

const LocaleProvider = ({
  children,
  defaultLang = "pt",
}: {
  children: ReactNode;
  defaultLang?: Lang;
}) => {
  const [lang, setLang] = useState<Lang>(defaultLang ?? defaultValue.lang);
  const t = (path: LocalePath) => {
    const keys = path.split(".");
    let result: any = locales[lang];
    for (const key of keys) {
      result = result[key];
    }
    return result;
  };

  return (
    <LocaleContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export { LocaleProvider, LocaleContext, useLocaleCtx };
