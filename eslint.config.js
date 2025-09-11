import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import {
 defineConfig 
} from 'eslint/config'
export default defineConfig([
	{
		ignores: [
			'dist',
			'node_modules',
			'.vscode',
			'auto-imports.d.ts',
			'components.d.ts',
			'docs'
		]
	},
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
			'no-undef': 'off',
			// 未使用的变量不报错
			'@typescript-eslint/no-unused-vars': 'off',
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
			'semi': ['error', 'never'],
			// 对象属性换行规则
			'object-curly-newline': [
				'error',
				{
					// 对象字面量配置
					ObjectExpression: {
						minProperties: 3, // 1个属性就换行
						consistent: true, // 属性风格一致
						multiline: true // 多行格式
					},
					// 解构对象配置
					ObjectPattern: {
						minProperties: 3, // 2个以上属性换行
						consistent: true
					},
					// 导入配置
					ImportDeclaration: {
						multiline: true, // 多行格式
						minProperties: 3, // 1个以上属性换行
						consistent: true // 属性风格一致
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
					allowAllPropertiesOnSameLine: true // 禁止所有属性在同一行
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
      // 配置特殊符号的空格
      'space-infix-ops': ['error', { 'int32Hint': false }],
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
			// 组件name必须为多个单词
			'vue/multi-word-component-names': [
				'error',
				{
					'ignores': [ 'Home' ]
				}
			],
			// 不允许未使用的表达式
			'@typescript-eslint/no-unused-expressions': 'off'
		}
	}
])
