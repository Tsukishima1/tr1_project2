import { defineConfig } from 'vite'
import {resolve} from "path"
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: "src/auto-import.d.ts",
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
  resolve: {
    alias: [
      {
        find:'@',
        replacement: resolve(__dirname, './src'),
      }
    ]
  },
  server: {
    proxy: {
      '/user': 'http://pve.lycoris.site:9780',
      '/passage': 'http://pve.lycoris.site:9780',
      '/notice': 'http://pve.lycoris.site:9780',
      '/hallComment': 'http://pve.lycoris.site:9780',
      '/comment': 'http://pve.lycoris.site:9780',
      '/admin': 'http://pve.lycoris.site:9780',
    }
  }
})
