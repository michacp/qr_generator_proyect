import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [tailwind(), react()],
  trailingSlash: 'always',
  build: {
    format: 'directory', // genera /es/index.html en vez de /es.html — necesario para trailingSlash
  },
});
