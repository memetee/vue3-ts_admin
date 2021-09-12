type IFormType = 'input' | 'password' | 'datePicker' | 'select';

export interface IFormItem {
  type: IFormType;
  label: string;
  rules?: any[];
  field: string;
  placeholder?: any;
  options?: any[string];
  otherOptions?: any;
  isHidden?: boolean;
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  colLayout?: any;
  itemStyle?: any;
}
