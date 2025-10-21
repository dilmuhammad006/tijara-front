import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 4000,
    host: true, 
    allowedHosts: [
      "harmonix.uz",
      "api.harmonix.uz",
      "www.harmonix.uz",
      "www.api.harmonix.uz",
      ".harmonix.uz",
    ],
  },
});
