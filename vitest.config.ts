/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue','vue-router']
    })
  ],
  test: {
    globals: true, // 使用全局测试函数
    environment: 'jsdom' // 使用 jsdom 模拟浏览器环境
  }
})