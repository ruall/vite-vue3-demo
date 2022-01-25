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
  getList
} from './index'

import { getType } from '@/utils'
import { useWork } from '@/hooks/work/useWork'
import { onMounted } from 'vue'

const { open, dialogVisible, dialogTitle, rowData, toggleVisible, refreshTable } = useWork({
  listFun: getList
})

const merchantTypeList = [
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
]
onMounted(() => {
  getList()
})
</script>
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
        <el-button
          :type="scope.row.name8 === 0 ? 'danger' : 'success'"
          size="mini"
          @click="open(scope.row, 'InfoWrite')"
          >{{ scope.row.name8 === 0 ? '禁用' : '启用' }}</el-button
        >
        <el-button type="warning" size="mini" @click="open(scope.row, 'Detail')">解散</el-button>
      </template>
    </com-table>

    <com-dialog v-model="dialogVisible" :title="dialogTitle">
      <div style="height: 1000px" :info="rowData"> 我是弹窗内容 </div>
      <template #footer>
        <el-button @click="toggleVisible()">取消</el-button>
        <el-button type="primary" @click="refreshTable('add')">确定</el-button>
      </template>
    </com-dialog>
  </div>
</template>
