import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// `npm run build` -> normal multi-file build for Vercel.
// `npm run build:single` -> one self-contained index.html (handy for sharing a preview).
export default defineConfig(({ mode }) => ({
  plugins: mode === "single" ? [react(), viteSingleFile()] : [react()],
  build: { outDir: mode === "single" ? "dist-single" : "dist" },
}));
