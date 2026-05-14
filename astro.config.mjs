import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [tailwind(), react()],
  trailingSlash: 'always',
  // Sin redirects aquí — el index.astro hace la detección de idioma client-side
});
