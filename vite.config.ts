import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes("node_modules")) return undefined;
          if (/framer-motion|motion-dom|motion-utils/.test(id)) return "vendor-motion";
          if (/@supabase/.test(id)) return "vendor-supabase";
          if (/node_modules\/zod/.test(id)) return "vendor-zod";
          if (/react-dom|node_modules\/react\/|scheduler|react-router|@remix-run/.test(id)) return "vendor-react";
          return undefined;
        },
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
