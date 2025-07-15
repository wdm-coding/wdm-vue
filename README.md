# 项目创建
1. npm create vite@latest wdm-vue
  + 选择vue
  + 选择typescript
2. node 版本 22.12.x
3. 安装依赖 npm install

# 项目结构

## ts配置文件
针对不同的构建目标或环境进行分离配置
1. tsconfig.json (基础配置)​
  + 定义项目共享的编译器选项（如 target、module 等）
  + 通常不直接用于构建，而是被其他配置继承
2. tsconfig.node.json (Node.js 环境配置)​
  + 用于​​服务端脚本​​（如 Vite 配置、脚本工具等）
  + 继承自 tsconfig.json，但调整 Node.js 相关设置。
3. tsconfig.app.json (应用配置)
  + 专为​​浏览器端应用​​设计的配置。
  + 通常继承自 tsconfig.json。
::: tip 各自的应用场景
1. tsconfig.json 定义基础配置，不直接用于构建
2. Vite 配置文件​​（vite.config.ts）默认使用 Node.js 环境，因此vite --config vite.config.ts 自动应用 tsconfig.node.json 规则
3. 浏览器端代码​src下的所有ts相关带阿米使用 tsconfig.app.json 配置。
:::

## vite.config 配置 开发服务
1. vite.config.ts 是在 ​​Node.js 环境​​中运行的
2. import.meta.env 是 Vite 提供给​​客户端代码​​的全局变量
3. ​​vite.config.ts 中确实无法直接使用 import.meta.env​​，这是因为配置文件的执行环境和服务端渲染/客户端环境不同。
4. 使用 loadEnv 函数来加载vite.config.ts​​环境变量​​
```ts
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig(({mode})=>{
  const env = loadEnv(mode, process.cwd(), '')
  return {}
})
```
5. 解决process类型报错
  + 安装@types/node  `npm install --save-dev @types/node`

## 配置别名
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  resolve:{
    alias:{
      '@':path.resolve(__dirname, './src'),
      'assets':path.resolve(__dirname, './src/assets'),
      'api':path.resolve(__dirname, './src/api'),
      'utils':path.resolve(__dirname, './src/utils')
    }
  },
})
//  使用别名路径（例如@/）导入Vue单文件组件（SFC）时，TypeScript无法解析模块，因此需要配置模块解析
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
## 配置sass

1. 安装sass-embedded (基于Dart Sass的嵌入式编译器)
npm install -D sass-embedded
2. 配置vite
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [vue()],
  css:{
    preprocessorOptions:{
      scss:{
        additionalData:`@import "./src/styles/variables.scss";`
      }
    }
  }
})
```
3. 安装Normalize.css 修复浏览器差异
```bash
npm install normalize.css -S
# 在styles/index.scss中引入
@import 'normalize.css/normalize.css';
```
::: warning 注意
1. Sass官方已经废弃了@import规则，并将在Dart Sass 3.0.0中移除。官方推荐使用@use和@forward规则来代替。因此，我们需要将项目中的@import替换为@use或@forward。
2. 对于导入CSS文件（如normalize.css）不能使用@use，因为@use只适用于Sass文件（.scss或.sass）。所以对于CSS文件，我们可以继续使用@import
3. 对于Sass模块（如variables.scss），使用@use代替@import, 改为`@use "@/styles/variables" as *;`
:::

## 配置eslint
1. npx eslint --init 初始化eslint配置文件
2. 配置package.json
```json
"scripts": {
	"lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --fix"
},
```
3. 项目根目录下创建.vscode文件夹，创建settings.json
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.formatOnSave": false,
  "eslint.format.enable": true,
  "eslint.validate": ["javascript", "typescript", "vue"]
}
```
4. 关闭tsconfig.json中的noUnusedLocals和noUnusedParameters
5. 配置eslint.config.js
```js
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
		plugins: {
			js
		},
		extends: ['js/recommended']
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
		languageOptions: {
			globals: globals.browser
		}
	},
	tseslint.configs.recommended,
	pluginVue.configs['flat/essential'],
	{
		files: ['**/*.vue'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser
			}
		}
	},
	{
		rules: {
			// 未使用的变量不报错
			'@typescript-eslint/no-unused-vars': 'warn',
			// 允许使用any类型
			'@typescript-eslint/no-explicit-any': 'off',
			// 配置单引号
			quotes: ['error', 'single'],
			// 关闭缩进规则，使用自定义的缩进规则
			indent: 'off',
			// 对于Vue模板的缩进规则
			'vue/html-indent': [
				'error',
				2,
				{
					attribute: 1, // 属性的缩进级别（基于baseIndent），1表示在元素的基础上再缩进一级
					baseIndent: 1, // 基础缩进，1表示第一级缩进（即元素本身相对于模板根的位置）
					closeBracket: 0, // 闭合括号的缩进（0表示与元素对齐）
					alignAttributesVertically: true, // 垂直对齐属性
					ignores: []
				}
			],
			// 对于vue-script标签的缩进规则
			'vue/script-indent': [
				'error',
				2,
				{
					baseIndent: 1, // 对于<script>标签，整体内容相对于标签缩进1级（2空格）
					switchCase: 1,
					ignores: []
				}
			],
			// 配置箭头函数参数只有一个时不加括号
			'arrow-parens': ['error', 'as-needed'],
			// 配置逗号风格
			'comma-dangle': ['error', 'never'],
			// 配置分号风格
			semi: ['error', 'never'],
			// 对象属性换行规则
			'object-curly-newline': [
				'error',
				{
					// 对象字面量配置
					ObjectExpression: {
						minProperties: 2, // 1个属性就换行
						consistent: true, // 属性风格一致
						multiline: true // 多行格式
					},
					// 解构对象配置
					ObjectPattern: {
						minProperties: 2, // 2个以上属性换行
						consistent: true
					},
					// 导入配置
					ImportDeclaration: {
						minProperties: 3, // 3个以上属性换行
						consistent: true
					},
					// 导出配置
					ExportDeclaration: {
						minProperties: 3, // 3个以上属性换行
						consistent: true
					}
				}
			],
			// 强制每行只有一个属性
			'object-property-newline': [
				'error',
				{
					allowAllPropertiesOnSameLine: false // 禁止所有属性在同一行
				}
			],
			// 大括号内的空格
			'object-curly-spacing': ['error', 'always'],
			// 冒号后的空格
			'key-spacing': [
				'error',
				{
					beforeColon: false, // 冒号前不加空格
					afterColon: true // 冒号后加一个空格
				}
			],
			// 箭头函数参数的空格
			'arrow-spacing': [
				'error',
				{
					before: true, // 箭头前加一个空格
					after: true // 箭头后加空格
				}
			],
			// 配置标签属性的换行规则
      'vue/max-attributes-per-line': ['error', {
        'singleline': 3,  // 单行最多3个属性
        'multiline': 1    // 多行模式下每行1个属性
      }],
      // 配置第一个属性换行规则
      'vue/first-attribute-linebreak': ['error', {
        'singleline': 'beside', // 单行模式下，属性紧跟在标签名后面
        'multiline': 'below' // 多行模式下，属性换到下一行
      }],
      // 标签无内容闭合为单标签
			'vue/html-self-closing': 2,
      // 单标签闭合前必须有一个空格
			'vue/html-closing-bracket-spacing': 2,
      // 开始标签的右箭头的位置控制
			'vue/html-closing-bracket-newline': [ 
				'error',
				{
					singleline: 'never', // 单行模式下不允许换行
					multiline: 'always', // 多行模式下必须换行
					selfClosingTag: { // 自闭合标签的换行规则
						singleline: 'never', // 单行模式下不允许换行
						multiline: 'always' // 多行模式下必须换行
					}
				}
			],
      // 配置多行HTML元素的内容换行规则
      'vue/multiline-html-element-content-newline': ['error', {
        'ignoreWhenEmpty': true,   // 忽略空元素
        'allowEmptyLines': false   // 不允许空行
      }],
      // 配置特殊符号的空格
      'space-infix-ops': ['error', { 'int32Hint': false }]
		}
	}
])
```
## 配置vite可视化包分析插件`rollup-plugin-visualizer`
1. 安装 `npm install rollup-plugin-visualizer -D`
2. 配置vite.config.ts
```ts
import { visualizer } from 'rollup-plugin-visualizer';
export default defineConfig({
  plugins: [
    // 放在插件数组的最后
    visualizer({
      open: true,         // 自动打开
      filename: 'stats.html', // 输出文件名
      template: 'treemap', // 图表类型：sunburst|treemap|network
      gzipSize: true,     // 显示gzip大小
      brotliSize: true,   // 显示brotli大小
    })
  ]
});
```

## 配置vue-router
1. 安装 `npm install vue-router`
2. ​创建路由文件结构​​:
src/
├── router/
│   ├── index.ts
│   └── routes.ts
3. ​配置路由(routes.ts)​​
```ts
import type { RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue')
  }
]
export default routes
```
4. ​创建路由实例(index.ts)​​:
```ts
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router
```
5. ​在main.ts中挂载路由​​
```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(router)
app.mount('#app')
```
6. ​在App.vue中添加入口router-view

## vite 配置 `unplugin-vue-components、unplugin-auto-import` 插件实现自动导入组件
1. 安装  `npm install unplugin-vue-components unplugin-auto-import -D`
2. 配置vite.config.ts
```ts
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
	// 解决ESLint报错
	eslintrc: {
		enabled: true, // 此处为true运行后会生成.eslintrc-auto-import.json
		filepath: './.eslintrc-auto-import.json',
		globalsPropValue: true // 自动导入的全局变量配置
	}
}),
Components({ // 自动导入组件
	resolvers: [ // 解析器：用于 自动导入 UI 库组件
		NaiveUiResolver()
	]
})
```
## vite 配置 svg 图标 `vite-plugin-svg-icons` 插件实现本地svg图标处理
1. 安装 `npm install vite-plugin-svg-icons -D`
2. 配置vite.config.ts
```ts
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 自动导入图标组件
createSvgIconsPlugin({
	iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],// 指定图标存放的目录
	symbolId: 'icon-[dir]-[name]' // 生成的symbolId格式 icon-[文件夹名]-[文件名]
})
```
3. `main.ts` 引入 `virtual:svg-icons-register`
4. .d.ts 声明文件 加入`declare module 'virtual:svg-icons-register'`
5. 封装一个全局组件`cus-icon.vue`

## 配置 git 提交规范
1. 安装 `npm install @commitlint/cli @commitlint/config-conventional -D`
2. 根目录下创建 `commitlint.config.js`
3. 配置 `commitlint.config.js`
4. 