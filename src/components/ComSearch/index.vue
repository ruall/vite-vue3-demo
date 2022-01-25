<template>
  <div>
    <el-row :gutter="layout === 'right' ? 20 : 0">
      <el-col :span="layout === 'right' ? 22 : 24">
        <com-form
          :schema="schema"
          label-width="auto"
          :is-col="false"
          inline
          hide-required-asterisk
          @register="register"
        >
          <template v-if="layout === 'classic'">
            <el-button type="primary" icon="el-icon-search" @click="submitForm">查询</el-button>
            <el-button v-if="showReset" icon="el-icon-refresh-right" @click="resetForm">
              重置
            </el-button>
          </template>
        </com-form>
        <div v-if="layout === 'bottom'" style="text-align: center">
          <el-button type="primary" icon="el-icon-search" @click="submitForm">查询</el-button>
          <el-button v-if="showReset" icon="el-icon-refresh-right" @click="resetForm">
            重置
          </el-button>
        </div>
      </el-col>
      <el-col v-if="layout === 'right'" :span="2">
        <el-form style="text-align: center">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="submitForm">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button v-if="showReset" icon="el-icon-refresh-right" @click="resetForm">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="ComSearch">
import { PropType, unref } from 'vue'
import { useForm } from '@/hooks/web/useForm'
const { register, formRef, formData } = useForm()
const emit = defineEmits(['search-submit', 'reset-submit'])
defineProps({
  // 风格
  layout: {
    type: String,
    default: 'classic'
  },
  // 是否显示重置按钮
  showReset: {
    type: Boolean,
    default: true
  },
  // 布局展示的数据
  schema: {
    type: Array as PropType<FormSchemaConfig[]>,
    required: true,
    default: (): FormSchemaConfig[] => []
  }
})
function submitForm() {
  unref(formRef).validate((valid: boolean) => {
    if (valid) {
      emit('search-submit', formData.value)
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
function resetForm() {
  unref(formRef).resetFields()
  emit('reset-submit', formData.value)
}
</script>

<style></style>
