import type { Plugin } from "vite";

import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Avoids random type error due to
// https://github.com/aleclarson/vite-tsconfig-paths/issues/176
const fixedTsConfigPaths = tsconfigPaths() as unknown as Plugin;

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        browser: "./index.html",
      },
    },
  },
  plugins: [
    fixedTsConfigPaths,
    tanstackRouter({
      autoCodeSplitting: true,
      generatedRouteTree: "./src/routeTree.gen.ts",
      routesDirectory: "./src/routes",
    }),
    react(),
    tailwindcss(),
  ],
  root: "./",
  server: {
    port: 3000,
  },
});