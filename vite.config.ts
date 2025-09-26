import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Rick-and-Morty/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@Components": path.resolve(__dirname, "./src/Components"),
      "@Pages": path.resolve(__dirname, "./src/Pages"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@Widget": path.resolve(__dirname, "./src/Widget"),
      "@shared": path.resolve(__dirname, "./src/shared"),
    },
  },
});
