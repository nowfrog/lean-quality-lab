import { ui, defaultLang, type Lang } from './translations';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLocalePath(lang: Lang, path: string): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}

export function getAlternateLinks(currentPath: string): { lang: Lang; href: string }[] {
  // Remove lang prefix to get base path
  const basePath = currentPath.replace(/^\/(en|zh)/, '') || '/';
  return [
    { lang: 'it', href: basePath },
    { lang: 'en', href: `/en${basePath === '/' ? '/' : basePath}` },
    { lang: 'zh', href: `/zh${basePath === '/' ? '/' : basePath}` },
  ];
}
