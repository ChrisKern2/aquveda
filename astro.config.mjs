// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Static output deploys to Vercel with zero config (serves /dist).
export default defineConfig({
  site: 'https://wellbrookwater.com',
  output: 'static',
  trailingSlash: 'ignore',
  // /thank-you is a post-conversion page: keep it out of the sitemap so it
  // never gets indexed or surfaced as an entry point (it also fires the Meta
  // Lead event, which should only happen after a real submission).
  integrations: [sitemap({ filter: (page) => !page.includes('/thank-you') })],
  vite: {
    plugins: [tailwindcss()],
  },
});
