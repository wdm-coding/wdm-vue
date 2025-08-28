/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig({
  plugins: [vue(), vueJsx()],
  test: {
    globals: true, // 使用全局测试函数
    environment: 'jsdom' // 使用 jsdom 模拟浏览器环境
  }
})