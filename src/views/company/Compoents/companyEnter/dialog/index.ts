import { reactive, unref } from 'vue'
import { useForm } from '@/hooks/web/useForm'

export const getDatas = () => {
  const requiredRule: {
    required: boolean
    message: string
  } = {
    required: true,
    message: '该项为必填项'
  }
  const formSchema: FormSchemaConfig[] = reactive([
    {
      field: 'name1',
      label: '企业名称',
      component: 'Input',
      value: '',
      formItemProps: {
        rules: [requiredRule]
      },
      colProps: {
        span: 24
      },
      componentProps: {
        placeholder: '请输入企业名称',
        clearable: true
      }
    },
    {
      field: 'name2',
      label: '企业logo',
      component: 'Input',
      value: '',
      formItemProps: {
        rules: [requiredRule]
      }
    },
    {
      field: 'name3',
      label: '企业类型',
      value: '',
      formItemProps: {
        rules: [requiredRule]
      },
      colProps: {
        span: 24
      },
      componentProps: {
        placeholder: '请输入企业类型',
        clearable: true
      },
      component: 'Select',
      options: [
        {
          label: '类型1',
          value: 0
        },
        {
          label: '类型2',
          value: 1
        }
      ],
      onChange: (item) => {
        console.log(item)
      }
    },
    {
      field: 'name4',
      label: '主营类目',
      value: [],
      formItemProps: {
        rules: [requiredRule]
      },
      componentProps: {
        placeholder: '请选择主营类目',
        clearable: true
      },
      colProps: {
        span: 24
      },
      component: 'Cascader',
      options: [
        {
          value: '0',
          label: '一级类目',
          children: [
            {
              value: '01',
              label: '二级类目1',
              children: [
                {
                  value: '001',
                  label: '三级类目1'
                },
                {
                  value: '002',
                  label: '三级类目2'
                },
                {
                  value: '003',
                  label: '三级类目3'
                }
              ]
            },
            {
              value: '02',
              label: '二级类目2',
              children: [
                {
                  value: '021',
                  label: '三级类目1'
                },
                {
                  value: '022',
                  label: '三级类目2'
                },
                {
                  value: '023',
                  label: '三级类目3'
                }
              ]
            }
          ]
        },
        {
          value: '1',
          label: '一级类目1',
          children: [
            {
              value: '11',
              label: '二级类目1',
              children: [
                {
                  value: '111',
                  label: '三级类目1'
                },
                {
                  value: '112',
                  label: '三级类目2'
                },
                {
                  value: '113',
                  label: '三级类目3'
                }
              ]
            },
            {
              value: '12',
              label: '二级类目2',
              children: [
                {
                  value: '121',
                  label: '三级类目1'
                },
                {
                  value: '122',
                  label: '三级类目2'
                },
                {
                  value: '123',
                  label: '三级类目3'
                }
              ]
            }
          ]
        },
        {
          value: '2',
          label: '一级类目2',
          children: [
            {
              value: '21',
              label: '二级类目1',
              children: [
                {
                  value: '211',
                  label: '三级类目1'
                },
                {
                  value: '212',
                  label: '三级类目2'
                },
                {
                  value: '213',
                  label: '三级类目3'
                }
              ]
            },
            {
              value: '22',
              label: '二级类目2',
              children: [
                {
                  value: '221',
                  label: '三级类目1'
                },
                {
                  value: '222',
                  label: '三级类目2'
                },
                {
                  value: '223',
                  label: '三级类目3'
                }
              ]
            }
          ]
        }
      ],
      onChange: (item) => {
        console.log(item)
      }
    },
    {
      field: 'name5',
      label: '企业所在地',
      value: '',
      formItemProps: {
        rules: [requiredRule]
      },
      componentProps: {
        placeholder: '请输入企业类型',
        clearable: true
      },
      colProps: {
        span: 24
      },
      component: 'Select',
      options: [
        {
          label: '类型1',
          value: 0
        },
        {
          label: '类型2',
          value: 1
        }
      ],
      onChange: (item) => {
        console.log(item)
      }
    },
    {
      field: 'name6',
      label: '企业地址',
      component: 'Input',
      value: '',
      colProps: {
        span: 24
      },
      formItemProps: {
        rules: [requiredRule]
      },
      componentProps: {
        placeholder: '请输入企业地址',
        clearable: true
      }
    },
    {
      field: 'name7',
      label: '企业介绍',
      component: 'Input',
      value: '',
      colProps: {
        span: 24
      },
      formItemProps: {
        rules: [requiredRule]
      },
      componentProps: {
        type: 'textarea',
        rows: 5,
        placeholder: '请输入企业介绍',
        clearable: true
      }
    },
    {
      field: 'name8',
      label: '企业相册',
      component: 'Input',
      value: '',
      colProps: {
        span: 24
      }
    },
    {
      field: 'name9',
      label: '企业印章',
      component: 'Input',
      value: '',
      colProps: {
        span: 24
      }
    },
    {
      field: 'name10',
      label: '企业视频',
      component: 'Input',
      value: '',
      colProps: {
        span: 24
      }
    }
  ])
  let logoUrlList: IObj[] = []
  const onFileChange = (logoUrl: IObj[]) => {
    const filemap = logoUrl.map((v) => v.url)[0]
    logoUrlList = filemap
  }

  const { formRef, formData, register } = useForm()
  const submit = () => {
    console.log('submit')
    unref(formRef).validate((valid: boolean) => {
      if (valid) {
        console.log(formData.value)
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }
  const reset = () => {
    unref(formRef).resetFields()
    console.log('reset')
  }

  return { formSchema, onFileChange, logoUrlList, register, submit, reset }
}
