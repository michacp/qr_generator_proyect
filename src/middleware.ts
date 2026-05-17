// src/middleware.ts
import { defineMiddleware } from 'astro:middleware';

const SUPPORTED_LANGS = ['es', 'en'];
const DEFAULT_LANG = 'es';

export const onRequest = defineMiddleware((context, next) => {
    const url = new URL(context.request.url);
    const pathname = url.pathname;

    // === RUTAS QUE DEBEN IGNORAR EL MIDDLEWARE ===
    const ignoredPaths = [
        '/sitemap.xml',
        '/robots.txt',
        '/favicon.ico',
        '/_astro/',      // assets de Astro
        '/api/',          // si tienes APIs
    ];

    if (ignoredPaths.some(path => pathname.startsWith(path))) {
        return next();
    }

    // Si ya tiene idioma válido → dejar pasar
    if (SUPPORTED_LANGS.some(lang => pathname.startsWith(`/${lang}`))) {
        return next();
    }

    // Detectar idioma
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