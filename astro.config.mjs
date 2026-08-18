// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// NOTE FOR MAINTAINERS:
// `base` must stay '/' on Vercel (and for a custom domain), because the site is
// served from the domain root. It only needs changing for a GitHub Pages
// *project* page (https://<user>.github.io/<repo>/), where it becomes '/<repo>/'.
//
// TODO (human): once the Vercel deployment exists, set `site` to the live URL
// (e.g. 'https://igem-toronto.vercel.app' or the custom domain). It is only
// used to build absolute URLs, so it does not affect local development.
// See docs/DEPLOYMENT.md.
export default defineConfig({
  site: 'https://igemtoronto.ca',
  base: '/',
  vite: {
    plugins: [tailwindcss()],
  },
});
