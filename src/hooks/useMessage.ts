import { message } from 'ant-design-vue'

declare global {
  interface Window {
    $message: any;
  }
}

export function useAntdMessage() {
  window.$message = {
    success: (msg:string) => {
      message.destroy()
      message.success(msg)
    },
    error: (msg:string) => {
      message.destroy()
      message.error(msg)
    },
    warning: (msg:string) => {
      message.destroy()
      message.warning(msg)
    },
    info: (msg:string) => {
      message.destroy()
      message.info(msg)
    }
  }
}