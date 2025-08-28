import type { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome'

export interface XZIconProps extends FontAwesomeIconProps {
  fontSize?: string | number
  styleType?:'solid' | 'regular'
  color?: string;
  type?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger',
  customStyle?: object;
}