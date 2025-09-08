import type { VNode } from 'vue'
type ColorType = 'success' | 'warning' | 'danger' | 'info' 
export interface MessageProps {
  message: string | VNode; // 消息内容
  type?: ColorType; // 消息类型
  duration?: number; // 持续时间，单位为毫秒
  showClose?: boolean; // 是否显示关闭按钮
}