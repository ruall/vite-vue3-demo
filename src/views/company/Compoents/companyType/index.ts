import { reactive, ref } from 'vue'

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
    label: '类型名称',
    showOverflowTooltip: true
  },
  {
    field: 'name2',
    label: '状态'
  },
  {
    field: 'action',
    label: '操作',
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
        name1: '印花厂',
        name2: 0
      },
      {
        sort: 1,
        name1: '服装厂',
        name2: 1
      }
    ]
    loading.value = false
  }, 3000)
}

export const openDialog = reactive({
  visible: false
})
