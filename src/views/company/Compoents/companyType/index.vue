<template>
  <el-button type="primary" class="mb-4">添加类型</el-button>
  <com-table
    v-loading="loading"
    border
    align="center"
    :columns="columns"
    :data="tableData"
    :pagination="{
      position: 'center',
      currentPage: pageInfo.currentIndex,
      total: pageInfo.total,
      onCurrentChange: handleCurrentChange
    }"
  >
    <template #name2="scope">
      {{ scope.row.name2 === '0' ? '显示' : '隐藏' }}
    </template>
    <template #action="scope">
      <el-button type="primary" size="mini" @click="open(scope.row)">编辑</el-button>
    </template>
  </com-table>
  <com-dialog v-model="openDialog.visible">
    <div> 弹窗 </div>
    <template #footer>
      <el-button @click="openDialog.visible = false">取消</el-button>
      <el-button type="primary" @click="openDialog.visible = false">确定</el-button>
    </template>
  </com-dialog>
</template>
<script setup lang="ts">
import {
  loading,
  columns,
  tableData,
  pageInfo,
  handleCurrentChange,
  getList,
  openDialog
} from './index'

import { onMounted } from 'vue'

onMounted(() => {
  getList()
})

const open = (row: IObj) => {
  console.log(row)
  openDialog.visible = true
}
</script>
<style lang="less" scoped>
.mb-4 {
  margin-bottom: 1rem;
}
</style>
