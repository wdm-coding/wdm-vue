export type SwitchValueType = boolean | string | number;
export interface SwitchProps {
  value: SwitchValueType;
  disabled?: boolean;
  activeText?: string;
  inactiveText?: string;
  activeColor?: string;
  inactiveColor?: string;
  activeValue?: SwitchValueType;
  inactiveValue?: SwitchValueType;
  name?: string;
  id?: string;
  size?: 'large' | 'small';
}

export interface SwitchEmits {
  (e: 'change', value: boolean): void;
}