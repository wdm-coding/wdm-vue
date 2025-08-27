// 按钮类型
export type ButtonType = 'default'| 'primary' | 'success' | 'warning' | 'danger' | 'info' 
// 按钮尺寸
export type ButtonSize = 'default' | 'large' | 'small' | 'mini'
// 按钮原生type
export type NativeType = 'button' | 'submit' | 'reset'
// 按钮属性
export interface ButtonProps {
  type?: ButtonType  // 按钮类型，默认为 'primary'
  size?: ButtonSize // 按钮尺寸，默认为 'medium'
  plain?: boolean // 是否为朴素按钮，默认为 false
  round?: boolean // 是否为圆角按钮，默认为 false
  circle?: boolean // 是否为圆形按钮，默认为 false
  disabled?: boolean // 是否禁用按钮，默认为 false
  loading?: boolean // 是否显示加载状态，默认为 false
  icon?: string // 按钮图标类名 默认为 ''
  nativeType?: NativeType // 原生 type 属性，默认为 'button'
  autofocus?: boolean // 是否默认聚焦，默认为 false
}