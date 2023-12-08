import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    // 解決 ReferenceError: global is not defined socket.io
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    "global": {},
  },
  plugins: [
    vue(),
    VitePWA({
      devOptions: {
        enabled: true
      },
      registerType: 'autoUpdate',
      // 註冊 SW
      injectRegister: 'auto',
      // 下載檔案供離線使用
      workbox: {
        globDirectory: '**/dev-dist',
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      // 描述檔
      includeAssets: ['discord512x512.png', 'favicon.png', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Vue Discord',
        short_name: 'Discord',
        description: 'A Discord Clone built by Vue + PWA',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'discord192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'discord512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'discord512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'discord512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api/v1': 'http://localhost:8888',
      '/socket.io': 'http://localhost:5555'
    }
  },
  build:{
    target: 'esnext' // or "es2019",
  }
})
