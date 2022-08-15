import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'

// 指定解析路径
import { resolve } from "path"
const pathResolve = (dir) => resolve(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue(), DefineOptions()],
  // 反向代理
  server: {
    port: 4000, // 本地端口默认3000
    host: '0.0.0.0', // 本地local地址
    cors: true, // 为开发服务器配置 CORS，配置为允许跨域
    proxy: {
      "/api": {
        target: "http://172.16.100.120:8070/health", // 后台服务地址
        changeOrigin: true, // 是否允许不同源
        secure: true, // 支持https
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": pathResolve("./src"), // 设置 `@` 指向 `src` 目录
      views: pathResolve("./src/view"),
      components: pathResolve("./src/components"),
      assets: pathResolve("./src/assets"),
    },
    build: {
      outDir: "dist", // 指定打包路径，默认为项目根目录下的 dist 目录
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: false, // 生产环境去除 console
          drop_debugger: true, // 生产环境去除 debugger
        },
      },
      chunkSizeWarningLimit: 1500, // chunk 大小警告的限制（以 kbs 为单位）
    },
  },
  define: {
    "process.env": {
      VUE_APP_BASE_URL: 'http://172.16.100.120:8070/health',
      VUE_APP_DIST_URL: "",
      VUE_APP_PIC_ROOT: process.env.VUE_APP_BASE_URL || 'http://172.16.100.120:8070/health',
    },
  },
})
