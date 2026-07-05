// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// NOTE FOR MAINTAINERS:
// If this site is deployed to a GitHub Pages *project* page
// (https://<user>.github.io/<repo>/), set `base` to '/<repo>/' and
// `site` to 'https://<user>.github.io'. For a custom domain or a
// user/organization page, leave `base` as '/'.
export default defineConfig({
  site: 'https://igemtoronto.ca',
  base: '/',
  vite: {
    plugins: [tailwindcss()],
  },
});
