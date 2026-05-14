import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [tailwind(), react()],
  trailingSlash: 'always',
  build: {
    format: 'directory'   // Opcional, ayuda con trailingSlash
  }
});
