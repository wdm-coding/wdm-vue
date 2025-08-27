import type { Ref,InjectionKey } from 'vue'

// 折叠面板组件的唯一标识类型，可以是字符串或数字。
export type NameType = string | number;
// 折叠面板父组件的上下文接口
export interface CollapseContext {
  activeNames: Ref<NameType[]>; // 当前激活的折叠项 name 数组，默认为 []
  handleItemClick: (name: NameType) => void; // 处理折叠项点击事件的方法
}
// 折叠面板父组件的属性接口
export interface CollapseProps {
  accordion?: boolean; // 是否手风琴模式，默认为 false
}
// 折叠面板父组件的注入键，用于在子组件中通过 provide/inject 获取上下文信息。
export const collapseContextKey:InjectionKey<CollapseContext> = Symbol('collapseContextKey')
// 折叠面板子组件的属性接口
export interface CollapseItemProps {
  name: NameType; // 折叠项唯一标识
  title?: string; // 折叠项标题
  disabled?: boolean; // 是否禁用折叠项，默认为 false
}
// change事件
export interface CollapseEmits {
  (e: 'change', value: NameType[]): void;
}