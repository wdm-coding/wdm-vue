import type { Placement } from '@popperjs/core/lib/enums'
import type { OptionsGeneric, Modifier } from '@popperjs/core/lib/types'
export interface TooltipProps {
  content?: string;
  placement?: Placement;
  trigger?: 'hover' | 'click';
  manual?: boolean; // 手动控制显示隐藏
  popperOptions?: Partial<OptionsGeneric<Modifier<any, any>>>; // 传递给popper的配置项
  transtion?: string; // 过渡动画类名
}

export interface TooltipEmits { 
  (e: 'change', visible: boolean): void;
}

export interface TooltipInstance {
  show: () => void;
  hide: () => void;
  toggle: () => void;
}