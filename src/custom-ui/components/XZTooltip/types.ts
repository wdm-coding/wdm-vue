import type { Placement } from '@popperjs/core/lib/enums'
export interface TooltipProps {
  content?: string;
  placement?: Placement;
  trigger?: 'hover' | 'click';
  manual?: boolean; // 手动控制显示隐藏
}

export interface TooltipEmits { 
  (e: 'change', visible: boolean): void;
}

export interface TooltipInstance {
  show: () => void;
  hide: () => void;
  toggle: () => void;
}