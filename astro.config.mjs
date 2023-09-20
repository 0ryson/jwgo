import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";
//import netlify from '@astrojs/netlify/functions'; <<< Instalar

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'server',
  //adapter: netlify(), <<< Instalar y configurar
});