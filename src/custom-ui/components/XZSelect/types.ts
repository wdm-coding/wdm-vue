import type { VNode } from 'vue'

// 选项属性
export interface SelectOption {
  label: string,
  value: string | number,
  disabled?: boolean
}
// 组件属性
export interface SelectProps{
  value: string | number,
  options: SelectOption[],
  placeholder?: string,
  disabled?: boolean,
  clearable?: boolean,
  renderLabel?: (option: SelectOption) => VNode,
  filterable?: boolean,
  filterMethod?: (query: string, option: SelectOption) => boolean,
  remoteMethod?: (query: string) => Promise<SelectOption[]>
}

export interface SelectEmits{
  (e: 'change', value: string | number): void,
  (e: 'clear'): void,
  (e:'visible-change', visible: boolean): void,
}

export interface SelectStates {
  inputValue: string | null,
  selectOption:null | SelectOption
}