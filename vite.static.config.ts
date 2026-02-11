import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const staticPagePath = fileURLToPath(new URL("./static_page.html", import.meta.url));
const packageJsonPath = fileURLToPath(new URL("./package.json", import.meta.url));
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8")) as {
  version?: string;
};
const jownaVersion = packageJson.version ?? "0.0.0-dev";

export default defineConfig({
  base: "/jowna/",
  plugins: [react()],
  define: {
    __JOWNA_VERSION__: JSON.stringify(jownaVersion),
  },
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
