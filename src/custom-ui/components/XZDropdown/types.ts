import type { VNode } from 'vue'
import type { TooltipProps } from '../XZTooltip/types'

export interface menuOption {
  key: number | string;
  label: string | VNode;
  disabled?: boolean;
  divided?: boolean;
}
export interface DropdownProps extends TooltipProps {
  menuOptions?: menuOption[]
  hideAfterClick?: boolean;
}

export interface DropdownEmits { 
  (e: 'select', key: number | string): void;
  (e: 'visible-change', visible: boolean): void;
}

export interface DropdownInstance {
  show: () => void;
  hide: () => void;
}
