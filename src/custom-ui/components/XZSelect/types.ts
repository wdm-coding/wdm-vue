import type { VNode } from 'vue'

// 选项属性
export interface SelectOption {
  label: string,
  value: string | number,
  disabled?: boolean
}
// 渲染标签的函数类型
export type RenderLabelFunc = (option:SelectOption) => VNode;
export type FilterFunc = (query: string,options:SelectOption[]) => SelectOption[];
export type RemoteFunc = (query: string) => Promise<SelectOption[]>
// 组件属性
export interface SelectProps{
  value: string | number,
  options: SelectOption[],
  placeholder?: string,
  disabled?: boolean,
  clearable?: boolean,
  renderLabel?: RenderLabelFunc,
  filterable?: boolean,
  filterMethod?: FilterFunc,
  remote?: boolean,
  remoteMethod?: RemoteFunc
}

export interface SelectEmits{
  (e: 'change', value: string | number): void,
  (e: 'clear'): void,
  (e:'visible-change', visible: boolean): void,
}

export interface SelectStates {
  inputValue: string | null,
  selectOption:null | SelectOption,
  mouseHover: boolean,
  empty: boolean,
  loading: boolean,
  highlightIndex: number,
}
