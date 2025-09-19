import type {
 RuleItem,ValidateError,ValidateFieldsError 
} from 'async-validator'
export interface FormInstance {
  validate: () => Promise<any>;
  clearValidate: () => void;
  resetFields: (key?:string | string[]) => void;
}
export interface FormItemProps {
  label: string;
  prop?: string;
}
export interface FormItemRule extends RuleItem{
  trigger?: string;
}
export type FormRules = Record<string, FormItemRule[]>
export interface FormProps {
  model: Record<string, any>;
  rules: FormRules;
}
export interface FormValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError | null;
}
export interface FormContext extends FormProps{
  addField: (field: FormItemContext) => void;
  removeField: (field: FormItemContext) => void;
}
export interface FormItemContext{
  prop?: string;
  validate?: (trigger?: string) => void;
  clearValidate?: () => void;
  resetField?: () => void;
}

// 表单组件的注入键，用于在子组件中通过 provide/inject 获取上下文信息。
export const formContextKey: InjectionKey<FormContext> = Symbol('formContext')
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContext')
export interface FormEmits {
  (e: 'submit'): void;
}