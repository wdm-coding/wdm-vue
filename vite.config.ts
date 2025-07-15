import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  NaiveUiResolver,ElementPlusResolver,AntDesignVueResolver  
} from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 获取环境变量
export default defineConfig(({ mode }) => {
  const { VITE_PORT } = loadEnv(mode, process.cwd(), '')
  return {
    // 配置全局scss变量
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/variables.scss" as *;'
        }
      }
    },
    resolve: {
      // 配置别名路径
      alias: {
        '@': path.resolve(__dirname, './src')
      },
      // 配置忽略的文件后缀
      extensions: ['.mjs','.js','.ts','.jsx','.tsx','.json','.vue']
    },
    plugins: [
      vue(),
      VueDevTools(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          }
        ],
        resolvers: [ElementPlusResolver(),AntDesignVueResolver()],
        // 解决ESLint报错
        eslintrc: {
          enabled: true, // 此处为true运行后会生成.eslintrc-auto-import.json
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true // 自动导入的全局变量配置
        }
      }),
      Components({ // 自动导入组件
        resolvers: [ // 解析器：用于 自动导入 UI 库组件
          NaiveUiResolver(),
          ElementPlusResolver(),
          AntDesignVueResolver({
            importStyle: false // 禁用自动导入样式
          })
        ]
      }),
      // 自动导入图标组件
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],// 指定图标存放的目录
        symbolId: 'icon-[dir]-[name]' // 生成的symbol id格式
      }),
      // 放在插件数组的最后
      visualizer({
        open: true,         // 自动打开
        filename: 'stats.html', // 输出文件名
        template: 'treemap', // 图表类型：sunburst|treemap|network
        gzipSize: true,     // 显示gzip大小
        brotliSize: true   // 显示brotli大小
      })
    ],
    server: {
      port: Number(VITE_PORT),
      hmr: {
        overlay: false // 关闭错误蒙板提示
      }
    }
  }
})

