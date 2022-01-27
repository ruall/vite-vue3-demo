<template>
  <div class="search">
    <com-search :schema="classicData" @search-submit="searchSubmit" @reset-submit="resetSubmit" />
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
        {{ getType(merchantTypeList, scope.row.name2) }}
      </template>
      <template #name8="scope">
        {{ scope.row.name8 === 0 ? '经营中' : '封禁中' }}
      </template>
      <template #action="scope">
        <el-button type="primary" size="mini" @click="open(scope.row, 'InfoWrite')">编辑</el-button>
        <el-button :type="scope.row.name8 === 0 ? 'danger' : 'success'" size="mini">{{
          scope.row.name8 === 0 ? '禁用' : '启用'
        }}</el-button>
        <el-button type="warning" size="mini">解散</el-button>
      </template>
    </com-table>

    <com-dialog v-model="dialogVisible" :title="dialogTitle">
      <div>
        <DialogInfo ref="dialogRef" />
      </div>
      <template #footer>
        <el-button @click="toggleVisible()">取消</el-button>
        <el-button type="primary" @click="refreshTable()">确定</el-button>
      </template>
    </com-dialog>
  </div>
</template>
<script setup lang="ts">
import {
  data as classicData,
  searchSubmit,
  resetSubmit,
  loading,
  columns,
  tableData,
  pageInfo,
  handleCurrentChange,
  getList,
  merchantTypeList
} from './index'

import { getType } from '@/utils'
import { useWork } from '@/hooks/work/useWork'
import { onMounted, ref, nextTick } from 'vue'
import DialogInfo from './dialog/index.vue'

const { open, dialogVisible, dialogTitle } = useWork({
  listFun: getList
})
const dialogRef = ref<HTMLElement | null>(null)

onMounted(() => {
  getList()
})

const toggleVisible = () => {
  nextTick(() => {
    const dialogDom = dialogRef.value as any
    dialogDom.reset()
  })
}
const refreshTable = () => {
  nextTick(() => {
    const dialogDom = dialogRef.value as any
    dialogDom.submit()
  })
}
</script>
