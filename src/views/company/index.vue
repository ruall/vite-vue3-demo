<script setup lang="ts">
import companyEnter from './Compoents/companyEnter/index.vue'
import companyType from './Compoents/companyType/index.vue'
</script>
<template>
  <el-tabs type="border-card">
    <el-tab-pane label="入驻企业管理"><companyEnter /></el-tab-pane>
    <el-tab-pane label="企业类型管理"><companyType /></el-tab-pane>
  </el-tabs>
</template>
