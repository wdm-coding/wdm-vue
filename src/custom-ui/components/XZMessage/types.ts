import type { ComponentInternalInstance, VNode } from 'vue'
type ColorType = 'success' | 'warning' | 'danger' | 'info' 
export interface MessageProps {
  message: string | VNode; // 消息内容
  type?: ColorType; // 消息类型
  duration?: number; // 持续时间，单位为毫秒
  showClose?: boolean; // 是否显示关闭按钮
  offset?: number; // 与前一个元素的margin量，单位为像素
  id: string; // 消息的唯一标识符
  onDestory: () => void; // 关闭时的回调函数
  zIndex?: number; // 消息的z-index值
  transitionName?: string; // 过渡动画的名称
}
// 忽略onDestory属性，其余的属性都保留下来
export type CreateMessageProps = Omit<MessageProps, 'onDestory' | 'id' | 'zIndex'>;
// 实例对象，包含id、vnode和props属性
export interface MessageContext {
  id:string; // 消息的唯一标识符
  vnode: VNode; // 消息的虚拟节点
  props:MessageProps; // 消息的属性
  vm:ComponentInternalInstance; // 消息的组件实例
  destory:() => void; // 消息的销毁函数
}
