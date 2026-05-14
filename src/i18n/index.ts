// src/i18n/index.ts
import es from './es.json';
import en from './en.json';

export const LOCALES = ['es', 'en'] as const;
export type Locale = typeof LOCALES[number];
export const DEFAULT_LOCALE: Locale = 'es';

const translations = { es, en } as const;

/** Devuelve el objeto de traducciones para el idioma dado */
export function getTranslations(lang: string): typeof es {
    const locale = LOCALES.includes(lang as Locale) ? (lang as Locale) : DEFAULT_LOCALE;
    return translations[locale];
}

/** Tipo exportable para pasar `t` como prop a los componentes React */
export type Translations = typeof es;