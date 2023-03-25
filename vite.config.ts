import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/assets/style/global.less";',
      },
    },
  },
  server: {
    host: true,
		port: 5173,
		https: false,
    proxy: {'/api':'http://pve.lycoris.site:9780',}
    /* {
      '/api': {
        target: 'http://pve.lycoris.site:9780',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    } */
  }
})
