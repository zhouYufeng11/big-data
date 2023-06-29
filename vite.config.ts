const path = require("path");
import { defineConfig, loadEnv, UserConfig } from 'vite'
import vue from "@vitejs/plugin-vue";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig(({ mode }: UserConfig): UserConfig => {
  return {
    base: './',
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ArcoResolver()],
      }),
      Components({
        resolvers: [ArcoResolver({
          sideEffect: true
        })],
      }),
    ],
    server: {
      open: true,
      port: 6600,
      hmr: true, //开启热更新
      cors: true, //默认启用并允许任何源
      proxy: {
        '/api': {
          // target: loadEnv(mode, process.cwd().VITE_APP_API) || 'http://localhost:3000/',
          target: 'http://218.205.43.119:8089/sys/',
          changeOrigin: true,
          rewrite: (pathStr) => pathStr.replace(/^\/api/, '')
        }
      },
    },
    resolve: {
      // 配置路径别名
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      //css预处理
      preprocessorOptions: {
        scss: {
          /*
          引入var.scss全局预定义变量，
          如果引入多个文件，
          可以使用
          '@import "@/assets/scss/globalVariable1.scss";@import "@/assets/scss/globalVariable2.scss";'
          这种格式
           */
          additionalData: '@import "@/assets/css/variable.scss";'
        }
      }
    }
  }
});
