import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import UnoCSS from 'unocss/vite';

const pathSrc = resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig({
  plugins: [UnoCSS(), react()],
  resolve: {
    alias: {
      "@": pathSrc,
      "~/": `${pathSrc}/`,
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        // 这里可以添加 Less 特定的选项
        javascriptEnabled: true, // 允许在 .less 文件中使用 JS 代码
      },
    },
  },
});
