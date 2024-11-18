import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@config";
import translations from "./translations";

type Translations = typeof translations;
type Language = keyof Translations;
type TranslationKey = keyof Translations[Language];

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (SUPPORTED_LANGUAGES.includes(lang)) return lang;
  return DEFAULT_LANGUAGE;
}

export function getTranslator(
  lang: string | undefined,
  defaultLang: Language = "en"
) {
  const selectedLang: Language = (
    lang && lang in translations ? lang : defaultLang
  ) as Language;

  return function t(key: TranslationKey): string {
    return (
      translations[selectedLang][key] ??
      translations[defaultLang][key] ??
      `Missing translation for key "${key}"`
    );
  };
}

export function localizeUrl(lang: string | undefined, url: string) {
  const isFullUrl = url.startsWith("http://") || url.startsWith("https://");
  let urlObj: URL;
  if (isFullUrl) {
    urlObj = new URL(url);
  } else {
    urlObj = new URL("http://example.com" + url);
  }
  const pathSegments = urlObj.pathname.split("/").filter(Boolean);

  if (SUPPORTED_LANGUAGES.includes(pathSegments[0])) {
    pathSegments.splice(0, 1);
  }

  if (lang && lang !== DEFAULT_LANGUAGE) {
    pathSegments.unshift(lang);
  }

  urlObj.pathname = "/" + pathSegments.join("/");
  return isFullUrl ? urlObj.toString() : urlObj.pathname;
}
