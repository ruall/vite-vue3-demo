const requiredRule: {
  required: boolean
  message: string
} = {
  required: true,
  message: '该项为必填项'
}
export const data: FormSchemaConfig[] = [
  {
    field: 'name0',
    value: '',
    component: 'DatePicker',
    componentProps: {
      type: 'datetimerange'
    }
  },
  {
    field: 'name1',
    component: 'Input',
    onChange: (item) => {
      console.log(item)
    },
    formItemProps: {
      rules: [requiredRule],
      placeholder: '请输入企业名称'
    }
  },
  {
    field: 'name2',
    component: 'Select',
    // formItemProps: {
    //   placeholder: '请选择企业类型'
    // },
    options: [
      {
        label: '类型1',
        value: '1'
      },
      {
        label: '类型2',
        value: '2'
      }
    ]
  },
  {
    field: 'name3',
    component: 'Select',
    // formItemProps: {
    //   placeholder: '请选择主营类目'
    // },
    options: [
      {
        label: '类型1',
        value: '1'
      },
      {
        label: '类型2',
        value: '2'
      }
    ]
  },
  {
    field: 'name4',
    component: 'Select',
    // formItemProps: {
    //   placeholder: '请选择状态'
    // },
    options: [
      {
        label: '类型1',
        value: '1'
      },
      {
        label: '类型2',
        value: '2'
      }
    ]
  }
]

export const searchSubmit = () => {
  console.log('查询按钮')
}

export const resetSubmit = () => {
  console.log('重置按钮')
}
