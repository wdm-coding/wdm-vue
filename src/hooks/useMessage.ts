import { message } from 'ant-design-vue'

declare global {
  interface Window {
    $message: typeof message;
  }
}

export function useAntdMessage() {
  window.$message = message
}