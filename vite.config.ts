import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@src": "/src",
      "@components": "/src/components",
      "@utils": "/src/utils",
      "@hooks": "/src/hooks",
      "@api": "/src/api",
      "@layouts": "/src/layouts",
      "@pages": "/src/pages",
      "@contexts": "/src/contexts",
    },
  },
});
