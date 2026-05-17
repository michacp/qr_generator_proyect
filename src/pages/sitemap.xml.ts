// src/pages/sitemap.xml.ts
// Genera sitemap.xml en build time con Content-Type: application/xml correcto.
// Amplify no setea ese header en archivos de public/, por eso Google lo veía
// como texto plano. Con este endpoint Astro lo genera con los headers correctos.
//
// export const prerender = true → se genera como archivo estático en el build,
// no necesita output: 'hybrid' ni adaptador de servidor.
import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async () => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD automático en cada build

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <url>
    <loc>https://gqr.teamcellmania.com/es/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="es"        href="https://gqr.teamcellmania.com/es/"/>
    <xhtml:link rel="alternate" hreflang="en"        href="https://gqr.teamcellmania.com/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://gqr.teamcellmania.com/es/"/>
  </url>

  <url>
    <loc>https://gqr.teamcellmania.com/en/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="es"        href="https://gqr.teamcellmania.com/es/"/>
    <xhtml:link rel="alternate" hreflang="en"        href="https://gqr.teamcellmania.com/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://gqr.teamcellmania.com/es/"/>
  </url>

</urlset>`;

    return new Response(xml, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
};