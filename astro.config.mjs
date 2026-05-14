import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [tailwind(), react()],

  trailingSlash: 'always',        // Recomendado porque usas /es/ y /en/

  redirects: {
    '/': '/es/',                  // Root siempre a español
  },

  // Opcional: Prefijo base si en el futuro quieres cambiar
  // site: 'https://gqr.teamcellmania.com',
});