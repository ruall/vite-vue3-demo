<template>
  <com-form :schema="formSchema" @register="register">
    <template #name2>
      <com-upload
        ref="logoRef"
        file-type="image"
        :file-list="logoUrlList"
        @file-change="onFileChange"
      />
    </template>
    <template #name8>
      <com-upload
        ref="logoRef"
        file-type="image"
        :file-list="logoUrlList"
        @file-change="onFileChange"
      />
    </template>
    <template #name9>
      <com-upload
        ref="logoRef"
        file-type="file"
        placeholder="仅支持PDF格式文件"
        :file-list="logoUrlList"
        @file-change="onFileChange"
      />
    </template>
    <template #name10>
      <com-upload
        ref="logoRef"
        file-type="video"
        placeholder="仅支持mp4格式文件"
        :file-list="logoUrlList"
        @file-change="onFileChange"
      />
    </template>
  </com-form>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { getDatas } from './index'

const { formSchema, onFileChange, logoUrlList, register, submit, reset } = getDatas()

defineProps({
  // 表头
  columns: {
    type: Array as PropType<IObj[]>,
    default: () => []
  }
})
defineExpose({
  submit,
  reset
})
</script>
