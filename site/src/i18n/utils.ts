import { ui, defaultLang, type Lang } from './translations';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function getLangFromUrl(url: URL): Lang {
  const pathWithoutBase = url.pathname.replace(base, '') || '/';
  const [, lang] = pathWithoutBase.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLocalePath(lang: Lang, path: string): string {
  if (lang === defaultLang) return `${base}${path}`;
  return `${base}/${lang}${path}`;
}

export function getAlternateLinks(currentPath: string): { lang: Lang; href: string }[] {
  const pathWithoutBase = currentPath.replace(base, '') || '/';
  const basePath = pathWithoutBase.replace(/^\/(en|zh)/, '') || '/';
  return [
    { lang: 'it', href: `${base}${basePath}` },
    { lang: 'en', href: `${base}/en${basePath === '/' ? '/' : basePath}` },
    { lang: 'zh', href: `${base}/zh${basePath === '/' ? '/' : basePath}` },
  ];
}
