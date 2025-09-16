// 定义组件的 props 
export type InputType = 'text' | 'password' | 'textarea' | 'number' | 'email' | 'tel' | 'url' | 'search';
export interface InputProps {
  value: string | null;
  type?: InputType;
  size?: 'default' | 'large' | 'small' | 'mini';
  disabled?: boolean;
  clearable?: boolean;
  showPassword?: boolean;
  placeholder?: string;
  readonly?: boolean;
  autocomplete?: any;
  autofocus?: boolean;
  form?: string;
  prefixIcon?: string;
  suffixIcon?: string;
}
// 定义组件的 emit
export interface InputEmits {
  (e: 'clear'): void;
  (e: 'input', value: string): void;
  (e: 'change', value: string): void;
  (e: 'focus',value: string): void;
  (e: 'blur',value: string): void;
}
// 定义组件的实例类型
export interface InputInstance {
  ref: HTMLInputElement | HTMLTextAreaElement,
  focus: () => void;
}