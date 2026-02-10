import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const staticPagePath = fileURLToPath(new URL("./static_page.html", import.meta.url));

export default defineConfig({
  base: "/jowna/",
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        static_page: staticPagePath,
      },
      output: {
        entryFileNames: "assets/static-page-[hash].js",
        assetFileNames: "assets/static-page-[hash][extname]",
        inlineDynamicImports: true,
        manualChunks: undefined,
      },
    },
  },
});
