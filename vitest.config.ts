/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import path from 'path'
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
  resolve: {
    // 配置别名路径
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    // 配置忽略的文件后缀
    extensions: ['.mjs','.js','.ts','.jsx','.tsx','.json','.vue']
  },
  test: {
    globals: true, // 使用全局测试函数
    environment: 'jsdom' // 使用 jsdom 模拟浏览器环境
  }
})