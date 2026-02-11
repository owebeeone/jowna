import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
});
