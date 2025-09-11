import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
export default defineConfig({
  title: 'My Awesome Project',
  description: 'A VitePress Site',
  srcDir: 'src',
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url))
      }
    }
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/button' }
    ],
    sidebar: [
      {
        text: 'Basic',
        items: [
          { text: 'Button', link: '/components/button' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
