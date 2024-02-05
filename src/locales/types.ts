import { lang } from "./en";

type Path<T> = T extends string | number
  ? `${T}`
  : {
      [K in Extract<keyof T, string>]: `${K}` | `${K}.${Path<T[K]>}`;
    }[Extract<keyof T, string>];
type LocalePath = Path<(typeof lang)>;
type LocaleKeys = keyof typeof lang;
export type {
  LocalePath,
  LocaleKeys
}

