import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import UnoCSS from "unocss/vite";
import svgr from "vite-plugin-svgr";

const pathSrc = resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig({
  base: '/shark-canvas/',
  plugins: [
    UnoCSS(),
    svgr({
      svgrOptions: {
        plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
        svgoConfig: {
          floatPrecision: 2,
        },
      },
      include: "**/*.svg",
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": pathSrc,
      "~/": `${pathSrc}/`,
    },
  },
  server: {
    host: "0.0.0.0",
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "~/styles/variables.less";`,
        // 这里可以添加 Less 特定的选项
        javascriptEnabled: true, // 允许在 .less 文件中使用 JS 代码
      },
    },
  },
  build: {
    outDir: "docs",
    chunkSizeWarningLimit: 500,
    minify: "terser", // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
    terserOptions: {
      compress: {
        keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
        drop_console: true, // 生产环境去除 console
        drop_debugger: true, // 生产环境去除 debugger
      },
      format: {
        comments: false, // 删除注释
      },
    },
    rollupOptions: {
      output: {
        // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        entryFileNames: "js/[name].[hash].js",
        // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: "js/[name].[hash].js",
        // 用于输出静态资源的命名，[ext]表示文件扩展名
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        assetFileNames: (assetInfo: any) => {
          const info = assetInfo.name.split(".");
          let extType = info[info.length - 1];
          if (
            /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)
          ) {
            extType = "media";
          } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
            extType = "img";
          } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            extType = "fonts";
          }
          return `${extType}/[name].[hash].[ext]`;
        },
      },
    },
  },
});
