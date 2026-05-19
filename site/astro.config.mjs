// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// DEPLOY_TARGET=github-pages -> nowfrog.github.io/lean-quality-lab
// otherwise -> https://lqsolutionslab.unime.it (UniME web space, root domain)
const isGithubPages = process.env.DEPLOY_TARGET === 'github-pages';

// https://astro.build/config
export default defineConfig({
  site: isGithubPages ? 'https://nowfrog.github.io' : 'https://lqsolutionslab.unime.it',
  base: isGithubPages ? '/lean-quality-lab' : '/',
  vite: {
    plugins: [tailwindcss()]
  }
});