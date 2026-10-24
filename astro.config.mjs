import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://leonardolazza.github.io',
  base: process.env.BASE_PATH || (process.env.GITHUB_ACTIONS ? '/rite_of_passage/' : '/'),
  output: 'static',
  build: {
    format: 'directory'
  }
});
