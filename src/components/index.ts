// 将components目录下的所有组件批量注册为全局组件

import type { App, DefineComponent } from 'vue'

// 全局组件的type声明
type ComponentModule = {
  [key: string]: DefineComponent;
}

// install函数
const install = (app:App) => {
  const components = import.meta.glob<ComponentModule>('./**/*.vue', { eager: true })
  const AntdComponents = import.meta.glob<ComponentModule>('../antd-view/components/**/*.vue', { eager: true })
  // 合并Antd组件
  const all =  Object.assign(components, AntdComponents)
  Object.keys(all).forEach(key => {
    const component = components[key].default
    const componentName = component.name
    if(!componentName) {
      console.warn(`组件${key}没有name属性，无法注册为全局组件`)
      return
    }
    app.component(componentName, component)
  })
}

// 导出install函数
export default {
  install
}