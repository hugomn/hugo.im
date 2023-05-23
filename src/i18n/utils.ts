import { languages, defaultLang } from "./config";
import translations from "./translations";

export function localizeUrl(lang: string, url: string) {
  const isFullUrl = url.startsWith("http://") || url.startsWith("https://");
  let urlObj: URL;
  if (isFullUrl) {
    urlObj = new URL(url);
  } else {
    urlObj = new URL("http://example.com" + url);
  }
  const pathSegments = urlObj.pathname.split("/").filter(Boolean);
  if (pathSegments[0] in languages) {
    pathSegments.splice(0, 1);
  }

  if (lang !== defaultLang) {
    pathSegments.unshift(lang);
  }

  urlObj.pathname = "/" + pathSegments.join("/");
  return isFullUrl ? urlObj.toString() : urlObj.pathname;
}

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in languages) return lang as keyof typeof languages;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof languages) {
  return function t(key: keyof (typeof translations)[typeof defaultLang]) {
    return translations[lang][key] || translations[defaultLang][key];
  };
}
