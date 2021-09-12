import { IForm } from '@/base-ui/form/types';

export const searchFormConfig: IForm = {
  labelWidth: '100px',
  itemStyle: {
    padding: '5px 10px'
  },
  colLayout: {
    span: 8
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '商品名称',
      rules: [],
      placeholder: '请输入商品名称'
    },
    {
      field: 'address',
      type: 'input',
      label: '商品地址',
      placeholder: '请输入商品地址'
    },
    {
      field: 'enable',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态 ',
      options: [
        {
          title: '启用',
          value: '1'
        },
        {
          title: '禁用',
          value: '0'
        }
      ]
    },
    {
      field: 'createAt',
      type: 'datePicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
};
