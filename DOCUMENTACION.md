# QR Generator — TeamCellMania
### Documentación del proyecto

---

## Mapa de archivos

```
qr-generator/
│
├── amplify.yml                  Deploy y reglas de redirección para AWS Amplify
├── astro.config.mjs             Configuración de Astro (integraciones, trailingSlash)
├── tailwind.config.mjs          Paleta de colores brand, fuentes, animaciones
├── tsconfig.json                Configuración TypeScript + soporte imports .css
├── package.json                 Dependencias del proyecto
├── SETUP.ps1                    Script PowerShell de instalación desde cero
│
├── public/
│   ├── robots.txt               Permite indexación total, apunta al sitemap
│   ├── sitemap.xml              URLs indexables con hreflang es/en — actualizar lastmod en cada release
│   ├── site.webmanifest         Configuración PWA (nombre, colores, iconos)
│   └── models/                  ⚠️ Carpeta a crear manualmente
│       ├── square.png           Imagen de preview del estilo "Cuadrado"
│       ├── rounded.png          Imagen de preview del estilo "Redondeado"
│       ├── dots.png             Imagen de preview del estilo "Puntos"
│       ├── extra-rounded.png    Imagen de preview del estilo "Extra Redondo"
│       ├── classy.png           Imagen de preview del estilo "Estrella"
│       └── classy-rounded.png   Imagen de preview del estilo "Estrella Redonda"
│
└── src/
    │
    ├── middleware.ts             Detecta idioma del navegador (Accept-Language)
    │                            y redirige a /es/ o /en/ si la URL no tiene idioma
    │
    ├── styles/
    │   └── global.css           @tailwind base/components/utilities
    │                            + reset de input[type=color]
    │                            + .scrollbar-hide para el ModelPicker
    │
    ├── types/
    │   └── css.d.ts             Declaración TypeScript para imports de .css
    │                            (necesario para react-image-crop/dist/ReactCrop.css)
    │
    ├── i18n/                    ◀ FUENTE DE VERDAD de todos los textos
    │   ├── index.ts             Helper getTranslations(lang), tipo Locale, LOCALES[]
    │   ├── es.json              Todos los strings en español
    │   └── en.json              Todos los strings en inglés
    │                            Para agregar idioma: crear pt.json + añadir 'pt' a LOCALES
    │
    ├── layouts/
    │   └── BaseLayout.astro     ◀ FUENTE DE VERDAD del SEO
    │                            Contiene: <title>, <meta>, Open Graph, Twitter Card,
    │                            hreflang, JSON-LD Schema (WebApplication + FAQ),
    │                            iconos, manifest y preconnect de fuentes
    │
    ├── pages/
    │   ├── index.astro          Página raíz — detecta idioma con navigator.language
    │   │                        y redirige a /es/ o /en/ (fallback client-side)
    │   └── [lang]/
    │       └── index.astro      Página dinámica por idioma — getStaticPaths() genera
    │                            /es/ y /en/ en build time. Carga las traducciones y
    │                            pasa t + lang a QrGenerator
    │
    └── components/
        │
        ├── QrGenerator.tsx      ◀ ORQUESTADOR PRINCIPAL (React island)
        │                        Conecta el hook con todos los componentes.
        │                        Contiene el selector de idioma (SVG flags) y
        │                        el botón "¿Cómo funciona?" que reabre el tour.
        │                        Se monta con client:only="react" (necesita window)
        │
        └── qr/
            │
            ├── types.ts         Interfaces y constantes compartidas:
            │                    QrType, QrFormValues, WifiValues,
            │                    DownloadFormat, DownloadOptions, DownloadSize,
            │                    QR_DEFAULTS, DOWNLOAD_DEFAULTS,
            │                    DOWNLOAD_FORMATS, DOWNLOAD_SIZES
            │
            ├── hooks/
            │   ├── useQrGenerator.ts   Toda la lógica del QR:
            │   │                       - Estado del formulario y opciones de descarga
            │   │                       - buildQrData() construye el string según tipo
            │   │                         (URL directa / texto libre / WIFI:T:WPA;S:...;;)
            │   │                       - Doble instancia QRCodeStyling:
            │   │                         previewQrRef  → siempre 300px PNG (rápido)
            │   │                         downloadQrRef → tamaño y formato elegido
            │   │                       - downloadQr() fuerza descarga con <a> temporal
            │   │
            │   └── useImageCrop.ts     Lógica de carga y recorte de imagen:
            │                           - Carga File como base64 con FileReader
            │                           - Gestiona estado de react-image-crop
            │                           - applyCrop() dibuja en <canvas> y devuelve dataURL
            │
            ├── QrForm.tsx       Formulario completo. Orquesta:
            │                    TypeTabs + contenido según tipo (input/textarea/WifiForm)
            │                    + ModelPicker + tarjeta de Colores + tarjeta de Márgenes
            │                    + ImageUploader
            │
            ├── QrPreview.tsx    Panel derecho sticky en desktop. Contiene:
            │                    imagen de preview 220px + botón Generar +
            │                    DownloadPanel + resumen de configuración activa
            │
            ├── TypeTabs.tsx     Tabs horizontales URL / Texto / WiFi con SVG icons inline.
            │                    Muestra hint del tipo activo debajo de los tabs.
            │
            ├── WifiForm.tsx     Formulario específico para QR WiFi:
            │                    SSID + contraseña (toggle ver/ocultar) +
            │                    tipo de seguridad (WPA/WEP/sin contraseña) +
            │                    toggle red oculta + preview del string WIFI:T:...;;
            │
            ├── ModelPicker.tsx  Selector de estilo de puntos en fila horizontal scrolleable.
            │                    Carga imágenes desde public/models/{key}.png.
            │                    Si la imagen no existe muestra la inicial como placeholder.
            │
            ├── ImageUploader.tsx  Zona de drag & drop + editor de recorte (react-image-crop)
            │                      con altura fija 208px + preview de imagen aplicada.
            │                      Consume useImageCrop internamente.
            │
            ├── DownloadPanel.tsx  Dos selects (formato + tamaño) con badges informativos
            │                      + botón de descarga que resume la selección activa.
            │                      Formatos: PNG, SVG, JPEG, WebP
            │                      Tamaños: 256 / 512 / 1024 / 2048 px
            │
            └── ui/              Átomos de UI sin estado propio
                ├── Field.tsx    Label + tooltip opcional + children + hint opcional.
                │                min-h en label y hint para alineación perfecta en grids.
                ├── ColorPicker.tsx   input[type=color] + hex en texto
                ├── Tooltip.tsx  Ícono ? con tooltip al hover/focus (accesible con Tab)
                ├── Hint.tsx     Texto de ayuda gris siempre visible bajo un campo
                ├── Row.tsx      Fila label/valor para el resumen de configuración
                ├── PageHeader.tsx   Encabezado con badge, h1 y subtítulo
                └── GuidedTour.tsx   Modal de 5 pasos que aparece la primera vez.
                                     Guarda estado en localStorage ('qr_tour_done').
                                     Reabierto desde QrGenerator con localStorage.removeItem.
```

---

## Flujo de datos

```
[lang]/index.astro
  │  carga es.json / en.json con getTranslations(lang)
  │  pasa { t, lang } como props
  ▼
QrGenerator.tsx  (client:only="react")
  │  useQrGenerator() → { form, dlOptions, previewUrl, ... }
  │  selector de idioma → window.location.href = /en/ | /es/
  │  botón ayuda → localStorage.removeItem + setTourKey
  ├──▶ GuidedTour     recibe t → muestra pasos en el idioma correcto
  ├──▶ PageHeader     recibe t → renderiza h1 y subtítulo
  ├──▶ QrForm         recibe { form, t, onChange, ... }
  │     ├── TypeTabs          → onChange({ qrType })
  │     ├── WifiForm          → onChange({ wifi: {...} })
  │     ├── ModelPicker       → onChange({ model })
  │     ├── ColorPicker ×2    → onChange({ dotsColor / backgroundColor })
  │     ├── inputs numéricos  → onChange({ qrMargin / imageMargin })
  │     └── ImageUploader     → useImageCrop → applyImage(dataUrl)
  │
  └──▶ QrPreview      recibe { previewUrl, dlOptions, t, ... }
        ├── img preview (siempre 300px PNG)
        ├── botón Generar → generateQr()
        └── DownloadPanel → setDlOptions + downloadQr()
```

---

## Dónde tocar cada cosa en el futuro

### Textos visibles (UI)
Editar **`src/i18n/es.json`** y **`src/i18n/en.json`**.
Ningún componente tiene texto hardcodeado — todo viene de `t`.

### SEO (títulos, descriptions, JSON-LD, keywords)
Editar **`src/layouts/BaseLayout.astro`** y la sección `meta` de los JSON de i18n.

```
Cambiar título / description   → i18n/es.json + en.json  →  meta.title / meta.description
Cambiar keywords               → BaseLayout.astro  →  constante keywordsMap
Editar preguntas FAQ           → BaseLayout.astro  →  bloque JSON-LD FAQPage
Agregar feature al Schema      → BaseLayout.astro  →  featureList en WebApplication
Google Tag Manager / Analytics → BaseLayout.astro  →  antes de </head>
Google Search Console verify   → BaseLayout.astro  →  <meta name="google-site-verification">
og-image                       → public/og-image.png  (1200×630px)
```

### Añadir un nuevo idioma
1. Crear `src/i18n/pt.json` copiando `en.json` y traduciendo
2. Añadir `'pt'` al array `LOCALES` en `src/i18n/index.ts`
3. Añadir `pt: FlagPT` y `pt: 'PT'` en `QrGenerator.tsx`
4. Añadir `pt: 'pt_BR'` en `localeMap` de `BaseLayout.astro`
5. Añadir URL `/pt/` al `sitemap.xml`

### Añadir un nuevo tipo de QR (PDF, vCard, Email…)
1. Añadir la clave a `QrType` en `types.ts`
2. Añadir strings en `i18n/es.json` y `en.json` → sección `qr_types`
3. Añadir el caso en `buildQrData()` en `useQrGenerator.ts`
4. Crear su formulario específico (ej: `VCardForm.tsx`)
5. Añadir la tab en `TypeTabs.tsx` con su SVG icon
6. Montar el formulario en `QrForm.tsx`

### Añadir un nuevo tamaño de descarga
Editar **`src/components/qr/types.ts`** → array `DOWNLOAD_SIZES`.
Añadir el hint en `i18n/es.json` y `en.json` → `download.hints`.

### Añadir un nuevo estilo de puntos
1. Añadir la imagen en `public/models/{key}.png`
2. Añadir la clave al array `MODEL_KEYS` en `ModelPicker.tsx`
3. Añadir el nombre traducido en `i18n/es.json` y `en.json` → sección `models`

### Sitemap — actualizar en cada release
Editar **`public/sitemap.xml`** → campo `<lastmod>` con la fecha del deploy.

---

## Dependencias clave

| Paquete | Para qué |
|---|---|
| `astro` | Framework principal — genera páginas estáticas |
| `@astrojs/react` | Permite usar componentes React como islands |
| `@astrojs/tailwind` | Integra Tailwind CSS en Astro |
| `qr-code-styling` | Genera el QR con estilos personalizados |
| `react-image-crop` | Editor de recorte de imagen en el navegador |
| `tailwindcss` | Utility-first CSS framework |

---

## Notas de deploy (AWS Amplify)

- El archivo `amplify.yml` en la raíz configura el build y las reglas de redirección.
- Las imágenes de estilos `public/models/*.png` deben subirse al repositorio.
- La imagen `public/og-image.png` (1200×630px) debe crearse manualmente con el branding de TeamCellMania.
- Actualizar `<lastmod>` en `public/sitemap.xml` en cada release importante.
