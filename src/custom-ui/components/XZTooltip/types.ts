import type { Placement } from '@popperjs/core/lib/enums'
import type { Options } from '@popperjs/core/lib/popper-lite.js'
export interface TooltipProps {
  content?: string;
  placement?: Placement;
  trigger?: 'hover' | 'click';
  manual?: boolean; // 手动控制显示隐藏
  popperOptions?: Partial<Options>; // 传递给popper的配置项
  transtion?: string; // 过渡动画类名
  delay?: number; // 显示延迟时间，单位毫秒
  duration?: number; // 隐藏延迟时间，单位毫秒
  showArrow?: boolean; // 是否显示箭头
}

export interface TooltipEmits { 
  (e: 'change', visible: boolean): void;
}

export interface TooltipInstance {
  show: () => void;
  hide: () => void;
  toggle: () => void;
}