import { reactive, ref } from 'vue'

/**
 * 搜索栏数据配置
 */
export const data: FormSchemaConfig[] = reactive([
  {
    field: 'name0',
    value: '',
    component: 'DatePicker',
    componentProps: {
      type: 'datetimerange',
      'range-separator': '-',
      'start-placeholder': '开始时间',
      'end-placeholder': '结束时间'
    }
  },
  {
    field: 'name1',
    component: 'Input',
    onChange: () => {
      // console.log(item)
    },
    componentProps: {
      placeholder: '请输入企业名称'
    }
  },
  {
    field: 'name2',
    component: 'Select',
    componentProps: {
      placeholder: '请选择企业类型'
    },
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
    componentProps: {
      placeholder: '请选择主营类目'
    },
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
    componentProps: {
      placeholder: '请选择状态'
    },
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
])

/**
 *
 * @param val 搜索按钮方法 返回 搜索栏选择数据信息
 */
export const searchSubmit = (val: IObj) => {
  console.log(val)
}

/**
 *
 * @param val 重置按钮方法 返回 搜索栏选择数据信息
 */
export const resetSubmit = (val: IObj) => {
  console.log(val)
}

/**
 * 数据表内容
 */
export const tableData = ref<IObj>([])

/**
 * 数据表配置参数
 */
export const columns = reactive([
  {
    field: 'sort',
    label: '排序',
    width: '50px'
  },
  {
    field: 'name1',
    label: '企业名称',
    width: '200px',
    showOverflowTooltip: true
  },
  {
    field: 'name2',
    label: '企业类型',
    width: '100px'
  },
  {
    field: 'name3',
    label: '主营类目',
    width: '100px'
  },
  {
    field: 'name4',
    label: '企业所在城市',
    width: '100px'
  },
  {
    field: 'name5',
    label: '企业管理员',
    width: '100px'
  },
  {
    field: 'name6',
    label: '入驻时间',
    width: '200px'
  },
  {
    field: 'name7',
    label: '联系电话',
    width: '200px'
  },
  {
    field: 'name8',
    label: '状态',
    width: '100px'
  },
  {
    field: 'action',
    label: '操作',
    width: '220px',
    fixed: 'right'
  }
])

/**
 * 分页参数
 */
export const pageInfo = reactive({
  currentIndex: 1,
  total: 30
})

/**
 * 请求数据加载loading
 */
export const loading = ref<boolean>(true)

/**
 *
 * @param val 点击页码触发，返回当前页数
 */
export const handleCurrentChange = (val: number) => {
  console.log(val)
}

/**
 * 获取列表信息
 */
export const getList = () => {
  loading.value = true
  setTimeout(() => {
    tableData.value = [
      {
        sort: 0,
        name1: 'xxxx公司xxxx公司xxxx公司xxxx公司',
        name2: 0,
        name3: 0,
        name4: 'xxx市',
        name5: '张三',
        name6: '2022/2/13 19:49',
        name7: '0039 18641930459',
        name8: 0
      },
      {
        sort: 1,
        name1: 'xxxx公司xxxx公司xxxx公司xxxx公司',
        name2: 2,
        name3: 0,
        name4: 'xxx市',
        name5: '张三',
        name6: '2022/2/13 19:49',
        name7: '0039 18641930459',
        name8: 0
      },
      {
        sort: 2,
        name1: 'xxxx公司xxxx公司xxxx公司xxxx公司',
        name2: 0,
        name3: 0,
        name4: 'xxx市',
        name5: '张三',
        name6: '2022/2/13 19:49',
        name7: '0039 18641930459',
        name8: 1
      },
      {
        sort: 3,
        name1: 'xxxx公司xxxx公司xxxx公司xxxx公司',
        name2: 1,
        name3: 0,
        name4: 'xxx市',
        name5: '张三',
        name6: '2022/2/13 19:49',
        name7: '0039 18641930459',
        name8: 0
      },
      {
        sort: 4,
        name1: 'xxxx公司xxxx公司xxxx公司xxxx公司',
        name2: 3,
        name3: 0,
        name4: 'xxx市',
        name5: '张三',
        name6: '2022/2/13 19:49',
        name7: '0039 18641930459',
        name8: 1
      }
    ]
    loading.value = false
  }, 3000)
}

/**
 * 状态列表
 */
export const merchantTypeList = reactive<IObj>([
  {
    label: '印花厂',
    value: 0
  },
  {
    label: '注胶厂',
    value: 1
  },
  {
    label: '造纸厂',
    value: 2
  },
  {
    label: '制衣厂',
    value: 3
  }
])
