import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "/", // Указывает базовый путь для проекта
  build: {
    outDir: "dist", // Каталог сборки
  },
  server: {
    port: 5173, // Локальный порт разработки
  },
});
