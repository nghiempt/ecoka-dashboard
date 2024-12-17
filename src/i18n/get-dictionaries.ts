import type { Locale } from "./setting";

const dictionaries: any = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  vi: () => import("./dictionaries/vi.json").then((module) => module.default),
  jp: () => import("./dictionaries/jp.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.vi();
