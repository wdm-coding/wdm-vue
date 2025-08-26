/// <reference types="vite/client" />
declare module 'virtual:svg-icons-register'
declare const APP_HOME_TITLE: string
declare module '@babel/standalone'
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, any>
  export default component
}