# QR Generator — TeamCellMania
### Documentación del proyecto

---

## Mapa de archivos

```
qr-generator/
│
├── amplify.yml                  Deploy y reglas de redirección para AWS Amplify
│                                Incluye customRules: /es→/es/, /en→/en/, /<*>→404-200
├── astro.config.mjs             Configuración de Astro (integraciones, trailingSlash: 'always')
├── tailwind.config.mjs          Paleta brand (violeta), fuentes Syne/DM Sans, animaciones
├── tsconfig.json                TypeScript estricto + include src/types para imports .css
├── package.json                 Dependencias del proyecto
├── .env.example                 Plantilla de variables de entorno — copiar como .env
├── .gitignore                   Excluye node_modules, dist, .env, .astro/
├── SETUP.ps1                    Script PowerShell de instalación desde cero
│
├── public/
│   ├── robots.txt               Permite indexación total, apunta al sitemap
│   ├── sitemap.xml              URLs /es/ y /en/ con hreflang — actualizar <lastmod> en cada release
│   ├── site.webmanifest         PWA: nombre, colores, iconos web-app-manifest-192/512.png
│   ├── og-image.png             ⚠️ Crear manualmente — 1200×630px con branding TeamCellMania
│   └── models/                  ⚠️ Carpeta a crear manualmente con imágenes de estilos
│       ├── square.png           Preview estilo "Cuadrado"
│       ├── rounded.png          Preview estilo "Redondeado"
│       ├── dots.png             Preview estilo "Puntos"
│       ├── extra-rounded.png    Preview estilo "Extra Redondo"
│       ├── classy.png           Preview estilo "Estrella"
│       └── classy-rounded.png   Preview estilo "Estrella Redonda"
│
└── src/
    │
    ├── middleware.ts             Detecta idioma del navegador (Accept-Language header)
    │                            y redirige a /es/ o /en/ si la URL no tiene idioma.
    │                            Solo activo en modo SSR — en static lo maneja index.astro
    │
    ├── styles/
    │   └── global.css           @tailwind base/components/utilities
    │                            + reset visual de input[type=color] (cross-browser)
    │                            + .scrollbar-hide para el ModelPicker horizontal
    │
    ├── types/
    │   └── css.d.ts             Declara módulo '*.css' para TypeScript
    │                            (requerido por react-image-crop/dist/ReactCrop.css)
    │
    ├── i18n/                    ◀ FUENTE DE VERDAD de todos los textos de UI
    │   ├── index.ts             getTranslations(lang), tipo Locale, array LOCALES
    │   ├── es.json              Strings en español: meta, header, qr_types, form,
    │   │                        wifi, models, preview, download, tour
    │   └── en.json              Misma estructura en inglés
    │                            Para agregar idioma: crear pt.json + añadir 'pt' a LOCALES
    │
    ├── layouts/
    │   └── BaseLayout.astro     ◀ FUENTE DE VERDAD del SEO
    │                            Props: title, description, lang, canonicalUrl,
    │                                   ogImage, ogImageAlt, alternateLangs
    │                            Contiene: <title>, <meta description/keywords/robots>,
    │                            canonical, hreflang (self + alternates + x-default),
    │                            Open Graph completo (locale + locale:alternate),
    │                            Twitter Card, JSON-LD @graph (WebApplication +
    │                            WebSite + FAQPage con 6 preguntas), iconos,
    │                            manifest, theme-color, preconnect fuentes Google
    │
    ├── pages/
    │   ├── index.astro          Página raíz / — detecta idioma con navigator.language
    │   │                        y redirige client-side a /es/ o /en/.
    │   │                        Fallback sin JS: <meta http-equiv="refresh">
    │   │                        Amplify también tiene regla / → /es/ como respaldo servidor
    │   └── [lang]/
    │       └── index.astro      Página dinámica — getStaticPaths() genera /es/ y /en/
    │                            en build time. Carga traducciones, pasa t + lang a
    │                            QrGenerator. Monta AdTop, AdSidebar y AdBottom
    │                            (solo visibles en producción — import.meta.env.PROD)
    │
    └── components/
        │
        ├── QrGenerator.tsx      ◀ ORQUESTADOR PRINCIPAL (React island)
        │                        Conecta useQrGenerator con todos los componentes.
        │                        Contiene: SVG flags (FlagES/FlagEN, cross-browser),
        │                        selector de idioma, botón "¿Cómo funciona?".
        │                        Montado con client:only="react" (necesita window/DOM)
        │
        ├── ads/                 Módulo de publicidad — solo renderiza si PROD=true.
        │   │                    Scripts inyectados dinámicamente vía JS para garantizar
        │   │                    orden del DOM y evitar colisión de window.atOptions.
        │   │
        │   ├── AdTop.astro      Banner superior — 728×90 desktop / 320×50 mobile.
        │   │                    Detecta viewport con window.innerWidth en runtime.
        │   │                    Carga inmediata (primer banner en el DOM).
        │   │
        │   ├── AdSidebar.astro  Banner 300×250 — solo desktop (hidden lg:block).
        │   │                    Inyecta div contenedor antes del script (effectivecpmnetwork).
        │   │
        │   ├── AdRect300.astro  Banner 300×250 visible en cualquier ancho de pantalla.
        │   │                    Variante de AdSidebar sin restricción de breakpoint.
        │   │                    Útil dentro del formulario o en posiciones mobile.
        │   │
        │   ├── AdBottom.astro   Banner inferior — 728×90 desktop / 320×50 mobile.
        │   │                    setTimeout(800ms) para cargar después de AdTop y
        │   │                    evitar que atOptions del segundo sobreescriba al primero.
        │   │
        │   ├── index.ts         Re-exports: AdSidebar, AdBottom
        │   │
        │   └── ad-scripts/      Archivos de REFERENCIA — no se importan directamente.
        │       │                 Documentan el código original del proveedor.
        │       ├── AdEffective.astro    Código original effectivecpmnetwork 300×250
        │       ├── AdLeaderboard.astro  Código original highperformanceformat 728×90
        │       └── AdMobile.astro       Código original highperformanceformat 320×50
        │
        └── qr/
            │
            ├── types.ts         Interfaces y constantes compartidas:
            │                    - QrType: 'url' | 'text' | 'wifi'
            │                    - QrFormValues, WifiValues, QR_DEFAULTS
            │                    - DownloadFormat: 'png' | 'svg' | 'jpeg' | 'webp'
            │                    - DownloadOptions, DownloadSize, DOWNLOAD_DEFAULTS
            │                    - DOWNLOAD_FORMATS, DOWNLOAD_SIZES (256/512/1024/2048px)
            │
            ├── hooks/
            │   ├── useQrGenerator.ts   Lógica completa del QR:
            │   │                       - Estado: form, dlOptions, previewUrl, croppedImage
            │   │                       - buildQrData(): URL | texto | WIFI:T:WPA;S:...;;
            │   │                       - buildConfig(): DrawType 'svg' para SVG output,
            │   │                         'canvas' para PNG/JPEG/WebP
            │   │                       - Doble instancia QRCodeStyling:
            │   │                           previewQrRef  → 300px PNG (vista previa rápida)
            │   │                           downloadQrRef → tamaño y formato elegido
            │   │                       - downloadQr(): SVG usa .download(), resto blob + <a>
            │   │                       - applyImage() / removeImage() para el logo central
            │   │
            │   └── useImageCrop.ts     Lógica de carga y recorte:
            │                           - Carga File como base64 con FileReader
            │                           - Gestiona estado de react-image-crop
            │                           - applyCrop(): canvas API → dataURL PNG
            │                           - centerAspectCrop() inicializa crop centrado 1:1
            │
            ├── QrForm.tsx       Formulario completo. Compone:
            │                    TypeTabs → WifiForm | input url | textarea texto
            │                    → ModelPicker → tarjeta Colores → tarjeta Márgenes
            │                    → ImageUploader
            │
            ├── QrPreview.tsx    Panel sticky derecho en desktop (lg:sticky lg:top-6).
            │                    Preview 220px + botón Generar + DownloadPanel
            │                    + resumen de config activa
            │
            ├── TypeTabs.tsx     Tabs URL / Texto / WiFi con SVG icons inline.
            │                    Hint del tipo activo debajo de la barra.
            │
            ├── WifiForm.tsx     Formulario WiFi:
            │                    SSID + contraseña (toggle ver/ocultar)
            │                    + seguridad (WPA/WEP/sin contraseña)
            │                    + toggle red oculta (role="switch" accesible)
            │                    + preview del string WIFI:T:...;; en tiempo real
            │
            ├── ModelPicker.tsx  Selector de estilo en fila scrolleable horizontal.
            │                    public/models/{key}.png — fallback a inicial si no existe.
            │
            ├── ImageUploader.tsx  Drag & drop + react-image-crop (altura fija 208px)
            │                      + preview imagen aplicada. Consume useImageCrop.
            │
            ├── DownloadPanel.tsx  Select formato + select tamaño + botón descarga.
            │                      Badge de color por formato, hint de uso por tamaño.
            │
            └── ui/              Átomos sin estado propio
                ├── Field.tsx    Label (min-h-[2rem]) + Tooltip? + children + hint (min-h-[1rem])
                │                Doble min-h garantiza alineación en grids sin importar
                │                cuántas líneas tenga el label ni si hay hint o no
                ├── ColorPicker.tsx   input[type=color] + valor hex en texto
                ├── Tooltip.tsx  Botón ? con tooltip al hover/focus (Tab-accesible)
                ├── Hint.tsx     Texto gris siempre visible bajo un campo
                ├── Row.tsx      Fila label/valor para resumen en QrPreview
                ├── PageHeader.tsx   Badge + h1 + subtítulo (textos desde t)
                └── GuidedTour.tsx   Modal 5 pasos: barra de progreso, dots navegables,
                                     btn Siguiente/Anterior/Saltar/Empezar.
                                     Estado en localStorage('qr_tour_done').
                                     key prop en QrGenerator fuerza remontaje al reabrir.
```

---

## Flujo de datos

```
Usuario entra a gqr.teamcellmania.com/
  → index.astro: navigator.language → replace(/es/ o /en/)
  → Amplify: regla / → /es/ como respaldo servidor

[lang]/index.astro
  │  getTranslations(lang) → carga es.json o en.json
  │  getStaticPaths() → Astro genera /es/ y /en/ en build time
  │  monta AdTop (solo producción)
  ▼
QrGenerator.tsx  (client:only="react")
  │  useQrGenerator() → { form, dlOptions, previewUrl, croppedImage, ... }
  │  selector idioma  → window.location.href = /en/ | /es/
  │  botón ayuda      → localStorage.removeItem + setTourKey(k+1)
  │
  ├──▶ GuidedTour     t.tour.steps → modal 5 pasos
  ├──▶ PageHeader     t.header → badge, h1, subtítulo
  │
  ├──▶ QrForm         { form, croppedImage, t, onChange, ... }
  │     ├── TypeTabs          onChange({ qrType })
  │     ├── WifiForm          onChange({ wifi: {...} })
  │     │    └── WIFI:T:{security};S:{ssid};P:{password};H:{hidden};;
  │     ├── ModelPicker       onChange({ model })
  │     ├── ColorPicker ×2    onChange({ dotsColor | backgroundColor })
  │     ├── inputs número     onChange({ qrMargin | imageMargin })
  │     └── ImageUploader → useImageCrop → applyCrop() → applyImage(dataUrl)
  │
  └──▶ QrPreview      { previewUrl, dlOptions, t, ... }
        ├── <img> 220px (previewQrRef: 300px PNG interno)
        ├── botón Generar → generateQr() → regenera ambas instancias
        └── DownloadPanel
              ├── formato/tamaño → setDlOptions → regenera downloadQrRef
              └── Descargar → downloadQr()
                    SVG:  .download({ extension: 'svg' })
                    resto: getRawData() → blob → <a download> temporal

[lang]/index.astro (después del app)
  ├── AdSidebar  (300×250, desktop, effectivecpmnetwork)
  └── AdBottom   (728×90 desktop / 320×50 mobile, setTimeout 800ms)
```

---

## Dónde tocar cada cosa en el futuro

### Textos visibles en la UI
**`src/i18n/es.json`** y **`src/i18n/en.json`** — ningún componente tiene texto hardcodeado.

### SEO
```
Título / description            → i18n/es.json + en.json  →  sección meta
Keywords                        → BaseLayout.astro  →  constante keywordsMap
Preguntas FAQ (rich results)    → BaseLayout.astro  →  JSON-LD FAQPage.mainEntity
Features del app (Schema)       → BaseLayout.astro  →  WebApplication.featureList
Google Tag Manager / Analytics  → BaseLayout.astro  →  antes de </head>
Google Search Console verify    → BaseLayout.astro  →  <meta name="google-site-verification">
Imagen Open Graph               → public/og-image.png  (1200×630px)
```

### Añadir un nuevo idioma
1. Crear `src/i18n/pt.json` copiando `en.json` y traduciendo
2. Añadir `'pt'` al array `LOCALES` en `src/i18n/index.ts`
3. Añadir `pt: FlagPT` y `pt: 'PT'` en `QrGenerator.tsx`
4. Añadir `pt: 'pt_BR'` en `localeMap` de `BaseLayout.astro`
5. Añadir URL `/pt/` al `public/sitemap.xml`

### Añadir un nuevo tipo de QR
1. Añadir la clave a `QrType` en `src/components/qr/types.ts`
2. Añadir strings en `i18n/es.json` y `en.json` → sección `qr_types`
3. Añadir el caso en `buildQrData()` en `useQrGenerator.ts`
4. Crear su formulario específico (ej: `VCardForm.tsx`)
5. Añadir la tab con SVG icon en `TypeTabs.tsx`
6. Montar el formulario en `QrForm.tsx`

### Añadir un nuevo tamaño de descarga
1. Editar `DOWNLOAD_SIZES` en `src/components/qr/types.ts`
2. Añadir el hint en `i18n/es.json` y `en.json` → `download.hints.{px}`

### Añadir un nuevo estilo de puntos
1. Añadir imagen en `public/models/{key}.png`
2. Añadir clave al array `MODEL_KEYS` en `ModelPicker.tsx`
3. Añadir nombre en `i18n/es.json` y `en.json` → sección `models`

### Publicidad
```
Desactivar un banner           → comentar <AdTop/>, <AdSidebar/> o <AdBottom/>
                                  en src/pages/[lang]/index.astro
Cambiar key de Adsterra        → src/components/ads/AdTop.astro (o AdBottom/AdSidebar)
Agregar nueva red publicitaria → crear src/components/ads/ad-scripts/AdNueva.astro
                                  y usarla en la molécula correspondiente
Forzar anuncios en dev         → ver comentario en .env.example
```

### Sitemap
**`public/sitemap.xml`** → campo `<lastmod>` con fecha del deploy (YYYY-MM-DD).

---

## Dependencias clave

| Paquete | Para qué |
|---|---|
| `astro` | Framework — genera páginas estáticas en build time |
| `@astrojs/react` | Islands hidratados con React |
| `@astrojs/tailwind` | Integra Tailwind en Astro |
| `qr-code-styling` | Genera QR con estilos. DrawType: 'svg'\|'canvas'. FileExtension: 'png'\|'svg'\|'jpeg'\|'webp' |
| `react-image-crop` | Editor de recorte 1:1 en browser, aplica vía canvas API |
| `tailwindcss` | Utility-first CSS — CSS manual solo para reset color picker y scrollbar-hide |

---

## Notas de deploy (AWS Amplify)

- `amplify.yml` en la raíz define el build y `customRules`. No tocar las reglas del panel de Amplify excepto el fallback `/<*> → /index.html → 404-200`.
- `public/models/*.png` deben estar en el repositorio antes del deploy.
- `public/og-image.png` (1200×630px) — crear con branding TeamCellMania.
- Los anuncios **no cargan en `npm run dev`** (`PROD = false`). Solo activos tras `npm run build`.
- Actualizar `<lastmod>` en `public/sitemap.xml` en cada release.

---

## Variables de entorno de Astro

No requieren configuración manual:

| Variable | `npm run dev` | `npm run build` |
|---|---|---|
| `import.meta.env.DEV` | `true` | `false` |
| `import.meta.env.PROD` | `false` | `true` |
| `import.meta.env.MODE` | `"development"` | `"production"` |

Los componentes de ads usan `import.meta.env.PROD` para decidir si renderizan.