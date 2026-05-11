// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://nowfrog.github.io',
  base: '/lean-quality-lab',
  vite: {
    plugins: [tailwindcss()]
  }
});