// src/middleware.ts
import { defineMiddleware } from 'astro:middleware';

const SUPPORTED_LANGS = ['es', 'en'];
const DEFAULT_LANG = 'es';

export const onRequest = defineMiddleware((context, next) => {
    const url = new URL(context.request.url);
    const pathname = url.pathname;

    // Si ya tiene idioma válido en la URL → dejar pasar
    if (SUPPORTED_LANGS.some(lang => pathname.startsWith(`/${lang}`))) {
        return next();
    }

    // Detectar idioma preferido del navegador desde Accept-Language
    // Ej: "es-EC,es;q=0.9,en;q=0.8" → "es"
    const acceptLanguage = context.request.headers.get('accept-language') ?? '';
    const detected = acceptLanguage
        .split(',')
        .map(entry => entry.trim().split(';')[0].trim().slice(0, 2).toLowerCase())
        .find(lang => SUPPORTED_LANGS.includes(lang));

    const lang = detected ?? DEFAULT_LANG;
    const newPath = (pathname === '/' || pathname === '')
        ? `/${lang}/`
        : `/${lang}${pathname}`;

    return context.redirect(newPath, 302);
});