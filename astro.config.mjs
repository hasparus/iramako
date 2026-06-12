import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://iramako.pl",
  integrations: [],
  vite: {
    plugins: [tailwindcss()],
  },
});
